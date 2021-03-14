import { Request, Response, NextFunction } from "express";
import { Model, Document } from "mongoose";
import { FillableObject } from "../types/base";
import {
  PaginationMeta,
  PaginationObject,
  PaginationSettings
} from "../types/base-list";
import BaseController from "./BaseController";

class BaseListController extends BaseController {
  // Model and query result object name
  protected readonly model!: Model<Document>;
  protected queryObjectName: string = "data";

  // Pagination data
  protected usePagination: boolean = false;
  protected paginateBy: PaginationSettings = {
    pageParam: "page",
    limitParam: "limit",
    defaultLimit: 10
  };
  protected pagination!: PaginationObject;
  private lastPage: number = 1;

  // Query fields
  private queryFilter: FillableObject = {};
}

export = BaseListController;
