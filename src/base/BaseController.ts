import { Request, Response, NextFunction } from "express";
import { Model, Document } from "mongoose";

export abstract class BaseController {
  // Request Handler fields
  protected abstract readonly req: Request;
  protected abstract readonly res: Response;
  protected abstract readonly next: NextFunction;

  // Model and query Fields
  protected abstract queryObjectName: string;
  protected abstract readonly model: Model<Document>;

  protected abstract getContextObject(): Promise<FillableObject>;

  protected abstract getQueryResult(): Promise<Document[] | Document | null>;

  protected abstract handleRequest(): Promise<Response | void>;
}
