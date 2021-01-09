import { Request, Response, NextFunction } from "express";
import { Model, Document } from "mongoose";
import { FillableObject } from "../types/base";

class BaseController {
  // Request Handler fields
  protected readonly req: Request;
  protected readonly res: Response;
  protected readonly next: NextFunction;

  // Model and query result object name
  protected readonly model?: Model<Document>;
  protected queryObjectName?: string = "data";

  // Query fields
  protected queryFilter: FillableObject = {};
  protected selectedFields?: string[];
  protected excludedFields?: string[];
  protected sortBy?: FillableObject;
  protected populatedFields?: string[];

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
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
      return this.res.send(contextObject);
    } catch (err) {
      return this.next(err);
    }
  }
}

export = BaseController;
