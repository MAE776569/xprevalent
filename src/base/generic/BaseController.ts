import { Request, Response, NextFunction, Handler } from "express";
import { Model, Document } from "mongoose";
import { FillableObject, SortObject } from "../../types/controllers/generic";
import ValidationSchema from "../../validators/ValidationSchema";

/**
 * Generic controller that returns a response
 *
 * @class BaseController
 */
class BaseController {
  /**
   * Request object
   *
   * @protected
   * @type {Request}
   * @memberof BaseController
   */
  protected readonly req: Request;

  /**
   * Response object
   *
   * @protected
   * @type {Response}
   * @memberof BaseController
   */
  protected readonly res: Response;

  /**
   * Next function which, when invoked, executes the middleware succeeding the current middleware
   *
   * @protected
   * @type {NextFunction}
   * @memberof BaseController
   */
  protected readonly next: NextFunction;

  /**
   * Mongoose model
   *
   * @protected
   * @type {Model<Document>}
   * @memberof BaseController
   */
  protected readonly model?: Model<Document>;

  /**
   * The name of the object returned by querying database
   *
   * @protected
   * @type {string}
   * @memberof BaseController
   */
  protected queryObjectName: string = "data";

  // Query fields
  protected selectedFields?: string[];
  protected excludedFields?: string[];
  protected sortBy?: SortObject;
  protected populatedFields?: string[];

  /**
   * View template to be rendered
   *
   * @protected
   * @type {string}
   * @memberof BaseController
   */
  protected viewTemplate?: string;

  /**
   * Validation schema
   *
   * @protected
   * @type {ValidationSchema}
   * @memberof BaseController
   */
  protected validationSchema?: ValidationSchema;

  /**
   * The controller handler for handling the request
   *
   * @readonly
   * @static
   * @type {Handler[]}
   * @memberof BaseController
   */
  static get handle(): Handler[] {
    return [
      (req: Request, res: Response, next: NextFunction) =>
        new this(req, res, next).handleRequest()
    ];
  }

  /**
   * Creates an instance of BaseController.
   * @param {Request} req - The request object
   * @param {Response} res - The response object
   * @param {NextFunction} next - next function
   * @memberof BaseController
   */
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
