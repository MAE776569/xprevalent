import { NextFunction } from "express";
import BaseListController from "../../src/controllers/list/BaseListController";
import mockRequest from "../mocks/mock-request";
import mockResponse from "../mocks/mock-response";
import mockModel from "../mocks/mock-model";

const req = mockRequest();
const res = mockResponse();
const next: NextFunction = jest.fn();
const listController: any = new BaseListController(req, res, next);

describe("List controller should have pagination parameters", () => {
  it("Shouldn't use pagination by default", () => {
    expect(listController.usePagination).toBe(false);
  });

  it("Should have pagination object", () => {
    expect(listController.paginateBy).toEqual({});
  });
});

describe("Should get pagination object", () => {
  it("Should have default pagination", () => {
    expect(listController.pagination).toBeUndefined();
  });

  it("Should return already calculated pagination", () => {
    expect(listController.getPaginationParams()).toEqual({
      page: 1,
      limit: 10
    });
  });

  it("Should return pagination object if exists", () => {
    const pagination = {
      page: 1,
      limit: 10
    };
    listController.pagination = pagination;
    expect(listController.getPaginationParams()).toEqual(pagination);
  });
});

describe("Should get and set total pages", () => {
  const lastPage = 5;
  it("Should get totalPages", () => {
    expect(listController.totalPages).toEqual(1);
  });

  it("Should set totalPages", () => {
    listController.totalPages = lastPage;
    expect(listController.totalPages).toEqual(lastPage);
  });
});

describe("Should get context object", () => {
  it("Should get empty context object", () => {
    expect(listController.getContextObject()).resolves.toEqual({});
  });

  it("Should get context object with meta", async () => {
    const listControllerWithPagination: any = new BaseListController(
      req,
      res,
      next
    );
    listControllerWithPagination.model = mockModel({ count: 1 });
    listControllerWithPagination.usePagination = true;
    const ctx = await listControllerWithPagination.getContextObject();

    expect(ctx).toHaveProperty("meta", {
      totalDocs: 1,
      totalPages: 1,
      page: 1,
      limit: 10,
      hasNext: false,
      nextPage: null,
      hasPrevious: false,
      previousPage: null
    });
  });
});

describe("Should get pagination meta", () => {
  it("Should set total pages", async () => {
    const listControllerWithPagination: any = new BaseListController(
      req,
      res,
      next
    );
    listControllerWithPagination.model = mockModel({ count: 0 });

    await listControllerWithPagination.getPaginationMeta();
    expect(listControllerWithPagination.totalPages).toBe(1);
  });

  it("Should get pagination meta with default first page", async () => {
    const listControllerWithPagination: any = new BaseListController(
      req,
      res,
      next
    );

    const count = 20;
    listControllerWithPagination.model = mockModel({ count });

    const meta = await listControllerWithPagination.getPaginationMeta();
    expect(meta).toEqual({
      totalDocs: count,
      totalPages: 2,
      page: 1,
      limit: 10,
      hasNext: true,
      nextPage: 2,
      hasPrevious: false,
      previousPage: null
    });
  });

  const reqWithPage = mockRequest({ query: { page: "2" } });
  const listControllerWithQuery: any = new BaseListController(
    reqWithPage,
    res,
    next
  );

  it("Should get pagination meta with querying page", async () => {
    const count = 20;
    listControllerWithQuery.model = mockModel({ count });

    const meta = await listControllerWithQuery.getPaginationMeta();
    expect(meta).toEqual({
      totalDocs: count,
      totalPages: 2,
      page: 2,
      limit: 10,
      hasNext: false,
      nextPage: null,
      hasPrevious: true,
      previousPage: 1
    });
  });

  it("Should get pagination meta with previous page", async () => {
    const count = 30;
    listControllerWithQuery.model = mockModel({ count });

    const meta = await listControllerWithQuery.getPaginationMeta();
    expect(meta).toEqual({
      totalDocs: count,
      totalPages: 3,
      page: 2,
      limit: 10,
      hasNext: true,
      nextPage: 3,
      hasPrevious: true,
      previousPage: 1
    });
  });
});

describe("Should get query result", () => {
  const listControllerWithModel: any = new BaseListController(req, res, next);
  listControllerWithModel.model = mockModel();

  it("Should call getQueryResult without pagination", async () => {
    const spyOnPaginatinoParams = jest.spyOn(
      listControllerWithModel,
      "getPaginationParams"
    );

    await listControllerWithModel.getQueryResult();
    expect(listControllerWithModel.model.find).toBeCalledTimes(1);
    expect(listControllerWithModel.model.skip).not.toBeCalled();
    expect(listControllerWithModel.model.limit).not.toBeCalled();
    expect(listControllerWithModel.model.populate).not.toBeCalled();
    expect(listControllerWithModel.model.sort).not.toBeCalled();
    expect(listControllerWithModel.model.select).not.toBeCalled();
    expect(listControllerWithModel.model.exec).toBeCalledTimes(1);
    expect(spyOnPaginatinoParams).not.toBeCalled();
  });
});
