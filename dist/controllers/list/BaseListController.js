"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const BaseController_1 = __importDefault(require("../generic/BaseController"));
class BaseListController extends BaseController_1.default {
    constructor(req, res, next) {
        super(req, res, next);
        // Pagination data
        this.paginate = false;
        this.paginateBy = {};
        this.totalPages = 1;
        // Query fields
        this.queryFilter = {};
        this.queryFilter = this.getQueryFilter();
    }
    getDefaultPagination() {
        const { pageParam = "page", limitParam = "limit", defaultLimit = 25 } = this.paginateBy;
        return {
            pageParam,
            limitParam,
            defaultLimit
        };
    }
    getPaginationParams() {
        if (this.pagination) {
            return this.pagination;
        }
        const { pageParam, limitParam, defaultLimit } = this.getDefaultPagination();
        const page = parseInt(this.req.query[pageParam]) || 1;
        const limit = parseInt(this.req.query[limitParam]) || defaultLimit;
        return {
            page,
            limit
        };
    }
    getQueryFilter() {
        return {};
    }
    getDocumentsCount() {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield this.model.countDocuments(this.queryFilter);
            return count;
        });
    }
    getPaginationMeta() {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield this.getDocumentsCount();
            const { page, limit } = this.getPaginationParams();
            const lastPage = Math.ceil(count / limit);
            this.totalPages = lastPage > 0 ? lastPage : 1;
            const pagination = {
                count,
                totalPages: lastPage,
                page: page < lastPage ? page : this.totalPages,
                limit,
                nextPage: page < lastPage ? page + 1 : null,
                previousPage: page > 1 ? (page < lastPage ? page - 1 : lastPage - 1) : null
            };
            return pagination;
        });
    }
    getContextObject() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.paginate) {
                const pagination = yield this.getPaginationMeta();
                return { pagination };
            }
            else {
                return {};
            }
        });
    }
    getQueryResult() {
        let querySet;
        // eslint-disable-next-line prefer-const
        querySet = this.model.find(this.queryFilter);
        if (this.paginate) {
            const { page, limit } = this.getPaginationParams();
            const lastPage = this.totalPages;
            const currentPage = page > lastPage ? lastPage : page;
            querySet.skip((currentPage - 1) * limit).limit(limit);
        }
        if (this.populatedFields) {
            querySet.populate(this.populatedFields);
        }
        if (this.sortBy) {
            querySet.sort(this.sortBy);
        }
        if (this.selectedFields) {
            querySet.select(this.selectedFields);
        }
        else if (this.excludedFields) {
            const excludedPaths = this.excludedFields
                .map((item) => `-${item}`)
                .join(" ");
            querySet.select(excludedPaths);
        }
        return querySet;
    }
}
module.exports = BaseListController;
