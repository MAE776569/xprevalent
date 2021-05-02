import { Request, Response, NextFunction } from "express";
import { Model, Document } from "mongoose";
import { FillableObject } from "../../types/controllers/generic";
import {
  PaginationMeta,
  PaginationObject,
  PaginationSettings
} from "../../types/controllers/list";
import BaseController from "./BaseController";

class BaseListController extends BaseController {
  // Model
  protected readonly model!: Model<Document>;

  // Pagination data
  protected usePagination: boolean = false;
  protected paginateBy: PaginationSettings = {
    pageParam: "page",
    limitParam: "limit",
    defaultLimit: 10
  };
  private pagination!: PaginationObject;
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

  protected async getContextObject() {
    if (this.usePagination) {
      const meta = await this.getPaginationMeta();
      return { meta };
    } else {
      return {};
    }
  }

  protected getQueryResult() {
    const querySet = this.model.find(this.queryFilter);
    if (this.usePagination) {
      const { page, limit } = this.getPaginationParams();
      const lastPage = this.totalPages;
      const currentPage = page > lastPage ? lastPage : page;
      querySet.skip((currentPage - 1) * limit).limit(limit);
    }
    if (this.populatedFields) {
      const populatedPaths = this.populatedFields.join(" ");
      querySet.populate(populatedPaths);
    }
    if (this.sortBy) {
      querySet.sort(this.sortBy);
    }
    if (this.selectedFields) {
      querySet.select(this.selectedFields);
    } else if (this.excludedFields) {
      const excludedPaths = this.excludedFields
        .map((item) => `-${item}`)
        .join(" ");
      querySet.select(excludedPaths);
    }
    return querySet.exec();
  }
}

export = BaseListController;
