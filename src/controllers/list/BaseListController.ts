import { Request, Response, NextFunction } from "express";
import { Model, Document } from "mongoose";
import { FillableObject } from "../../types/controllers/generic";
import {
  PaginationMeta,
  PaginationObject,
  PaginationSettings
} from "../../types/controllers/list";
import BaseController from "../generic/BaseController";

class BaseListController extends BaseController {
  // Model
  protected readonly model!: Model<Document>;

  // Pagination data
  protected usePagination: boolean = false;
  protected paginateBy: PaginationSettings = {};
  protected totalPages: number = 1;
  private pagination!: PaginationObject;

  // Query fields
  private queryFilter: FillableObject = {};

  constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
    this.queryFilter = this.getQueryFilter();
  }

  private getDefaultPagination(): Required<PaginationSettings> {
    const {
      pageParam = "page",
      limitParam = "limit",
      defaultLimit = 10
    } = this.paginateBy;

    return {
      pageParam,
      limitParam,
      defaultLimit
    };
  }

  protected getPaginationParams(): PaginationObject {
    if (this.pagination) {
      return this.pagination;
    }

    const { pageParam, limitParam, defaultLimit } = this.getDefaultPagination();
    const page = parseInt(this.req.query[pageParam] as string) || 1;
    const limit =
      parseInt(this.req.query[limitParam] as string) || defaultLimit;

    return {
      page,
      limit
    };
  }

  protected getQueryFilter() {
    return {};
  }

  protected async getDocumentsCount(): Promise<number> {
    const count = await this.model.countDocuments(this.queryFilter);
    return count;
  }

  protected async getPaginationMeta(): Promise<PaginationMeta> {
    const count = await this.getDocumentsCount();
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
