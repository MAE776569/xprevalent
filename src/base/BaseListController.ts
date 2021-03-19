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

  constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
    this.queryFilter = this.getQueryFilter();
    this.pagination = this.getPaginationParams();
  }

  protected getPaginationParams(): PaginationObject {
    if (this.pagination) return this.pagination;

    const {
      pageParam = "page",
      limitParam = "limit",
      defaultLimit = 10
    } = this.paginateBy;

    const page = +(this.req.query[pageParam] as string) || 1;
    const limit =
      +(this.req.query[limitParam] as string) || +defaultLimit || 10;

    return {
      page,
      limit
    };
  }

  protected getQueryFilter() {
    return {};
  }

  protected set totalPages(lastPage: number) {
    this.lastPage = lastPage;
  }

  protected get totalPages(): number {
    return this.lastPage;
  }

  protected async getPaginationMeta(): Promise<PaginationMeta> {
    const count = await this.model.countDocuments(this.queryFilter);
    const { page, limit } = this.getPaginationParams();
    const lastPage = Math.ceil(count / limit);
    this.totalPages = lastPage;
    const meta = {
      totalDocs: count,
      totalPages: lastPage,
      page: page < lastPage ? page : lastPage,
      limit,
      hasNext: page < lastPage,
      nextPage: page < lastPage ? page + 1 : null,
      hasPrevious: page > 1,
      previousPage:
        page > 1 ? (page < lastPage ? page - 1 : lastPage - 1) : null
    };
    return meta;
  }
}

export = BaseListController;
