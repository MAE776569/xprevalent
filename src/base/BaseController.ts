import { Request, Response, NextFunction, Handler } from "express";
import { Model, Document } from "mongoose";
import { FillableObject, SortObject } from "../types/base";
import ValidationSchema from "../validators/ValidationSchema";

class BaseController {
  // Request Handler fields
  protected readonly req: Request;
  protected readonly res: Response;
  protected readonly next: NextFunction;

  // Model and query result object name
  protected readonly model?: Model<Document>;
  protected queryObjectName?: string = "data";

  // Query fields
  protected selectedFields?: string[];
  protected excludedFields?: string[];
  protected sortBy?: SortObject;
  protected populatedFields?: string[];

  // View template
  protected viewTemplate?: string;

  // Validation
  protected validationSchema?: ValidationSchema;

  // Express route handler
  static get handle(): Handler[] {
    return [
      (req: Request, res: Response, next: NextFunction) =>
        new this(req, res, next).handleRequest()
    ];
  }

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
  }

  protected getQueryFilter?(): FillableObject {
    return {};
  }

  protected getContextObject(): Promise<FillableObject> {
    return Promise.resolve({});
  }

  protected getQueryResult(): Promise<Document[] | Document | null> {
    return Promise.resolve([]);
  }

  protected async handleRequest(): Promise<Response | void> {
    try {
      const contextObject = await this.getContextObject();
      const resObject = { ...contextObject };
      if (this.model) {
        const queryResult = await this.getQueryResult();
        resObject[this.queryObjectName!] = queryResult;
      }
      return this.res.send(resObject);
    } catch (err) {
      return this.next(err);
    }
  }
}

export = BaseController;
