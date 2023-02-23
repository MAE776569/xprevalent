import { Request, Response, NextFunction } from "express";
import { Model, Document } from "mongoose";
import { PaginationMeta, PaginationObject, PaginationSettings } from "../../types/controllers/list";
import BaseController from "../generic/BaseController";
declare class BaseListController extends BaseController {
    protected readonly model: Model<Document>;
    protected paginate: boolean;
    protected paginateBy: PaginationSettings;
    protected totalPages: number;
    private pagination;
    private queryFilter;
    constructor(req: Request, res: Response, next: NextFunction);
    private getDefaultPagination;
    protected getPaginationParams(): PaginationObject;
    protected getQueryFilter(): {};
    protected getDocumentsCount(): Promise<number>;
    protected getPaginationMeta(): Promise<PaginationMeta>;
    protected getContextObject(): Promise<{
        pagination: PaginationMeta;
    } | {
        pagination?: undefined;
    }>;
    protected getQueryResult(): any;
}
export = BaseListController;
