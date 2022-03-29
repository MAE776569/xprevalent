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
    expect(listController.paginate).toBe(false);
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
      limit: 25
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
    listControllerWithPagination.paginate = true;
    const ctx = await listControllerWithPagination.getContextObject();

    expect(ctx).toEqual({
      count: 1,
      totalPages: 1,
      page: 1,
      limit: 25,
      nextPage: null,
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

    const count = 50;
    listControllerWithPagination.model = mockModel({ count });

    const meta = await listControllerWithPagination.getPaginationMeta();
    expect(meta).toEqual({
      count,
      totalPages: 2,
      page: 1,
      limit: 25,
      nextPage: 2,
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
    const count = 50;
    listControllerWithQuery.model = mockModel({ count });

    const meta = await listControllerWithQuery.getPaginationMeta();
    expect(meta).toEqual({
      count,
      totalPages: 2,
      page: 2,
      limit: 25,
      nextPage: null,
      previousPage: 1
    });
  });

  it("Should get pagination meta with previous page", async () => {
    const count = 75;
    listControllerWithQuery.model = mockModel({ count });

    const meta = await listControllerWithQuery.getPaginationMeta();
    expect(meta).toEqual({
      count,
      totalPages: 3,
      page: 2,
      limit: 25,
      nextPage: 3,
      previousPage: 1
    });
  });
});

describe("Should get query result", () => {
  const listControllerWithModel: any = new BaseListController(req, res, next);
  listControllerWithModel.model = mockModel();

  const listControllerWithModelAndPagination: any = new BaseListController(
    mockRequest({ query: { page: "10" } }),
    res,
    next
  );
  listControllerWithModelAndPagination.paginate = true;
  listControllerWithModelAndPagination.model = mockModel({
    count: 10
  });

  it("Should call getQueryResult without pagination", async () => {
    const spyOnPaginationParams = jest.spyOn(
      listControllerWithModel,
      "getPaginationParams"
    );

    await listControllerWithModel.getQueryResult();
    expect(listControllerWithModel.model.find).toBeCalled();
    expect(listControllerWithModel.model.skip).not.toBeCalled();
    expect(listControllerWithModel.model.limit).not.toBeCalled();
    expect(listControllerWithModel.model.populate).not.toBeCalled();
    expect(listControllerWithModel.model.sort).not.toBeCalled();
    expect(listControllerWithModel.model.select).not.toBeCalled();
    expect(listControllerWithModel.model.exec).toBeCalled();
    expect(spyOnPaginationParams).not.toBeCalled();
  });

  it("Should call getQueryResult with pagination", async () => {
    const spyOnPaginationParams = jest.spyOn(
      listControllerWithModelAndPagination,
      "getPaginationParams"
    );

    await listControllerWithModelAndPagination.getQueryResult();
    expect(listControllerWithModelAndPagination.model.find).toBeCalled();
    expect(listControllerWithModelAndPagination.model.skip).toBeCalledWith(0);
    expect(listControllerWithModelAndPagination.model.limit).toBeCalled();
    expect(
      listControllerWithModelAndPagination.model.populate
    ).not.toBeCalled();
    expect(listControllerWithModelAndPagination.model.sort).not.toBeCalled();
    expect(listControllerWithModelAndPagination.model.select).not.toBeCalled();
    expect(listControllerWithModelAndPagination.model.exec).toBeCalled();
    expect(spyOnPaginationParams).toBeCalled();
  });

  it("Should call getQueryResult with populated fields", async () => {
    listControllerWithModelAndPagination.populatedFields = [];
    const spyOnPaginationParams = jest.spyOn(
      listControllerWithModelAndPagination,
      "getPaginationParams"
    );

    await listControllerWithModelAndPagination.getQueryResult();
    expect(listControllerWithModelAndPagination.model.find).toBeCalled();
    expect(listControllerWithModelAndPagination.model.skip).toBeCalled();
    expect(listControllerWithModelAndPagination.model.limit).toBeCalled();
    expect(listControllerWithModelAndPagination.model.populate).toBeCalled();
    expect(listControllerWithModelAndPagination.model.sort).not.toBeCalled();
    expect(listControllerWithModelAndPagination.model.select).not.toBeCalled();
    expect(listControllerWithModelAndPagination.model.exec).toBeCalled();
    expect(spyOnPaginationParams).toBeCalled();
  });

  it("Should call getQueryResult with selected fields", async () => {
    listControllerWithModelAndPagination.selectedFields = [];
    const spyOnPaginationParams = jest.spyOn(
      listControllerWithModelAndPagination,
      "getPaginationParams"
    );

    await listControllerWithModelAndPagination.getQueryResult();
    expect(listControllerWithModelAndPagination.model.find).toBeCalled();
    expect(listControllerWithModelAndPagination.model.skip).toBeCalled();
    expect(listControllerWithModelAndPagination.model.limit).toBeCalled();
    expect(listControllerWithModelAndPagination.model.populate).toBeCalled();
    expect(listControllerWithModelAndPagination.model.sort).not.toBeCalled();
    expect(listControllerWithModelAndPagination.model.select).toBeCalled();
    expect(listControllerWithModelAndPagination.model.exec).toBeCalled();
    expect(spyOnPaginationParams).toBeCalled();
  });

  it("Should call getQueryResult with excluded fields", async () => {
    const controller: any = new BaseListController(req, res, next);
    controller.paginate = true;
    controller.model = mockModel();
    const excludedFields = ["name", "description"];
    controller.excludedFields = excludedFields;
    const spyOnPaginationParams = jest.spyOn(controller, "getPaginationParams");

    await controller.getQueryResult();
    expect(controller.model.find).toBeCalled();
    expect(controller.model.skip).toBeCalled();
    expect(controller.model.limit).toBeCalled();
    expect(controller.model.populate).not.toBeCalled();
    expect(controller.model.sort).not.toBeCalled();
    expect(controller.model.select).toHaveBeenLastCalledWith(
      expect.stringMatching(
        excludedFields.map((field) => `-${field}`).join(" ")
      )
    );
    expect(controller.model.exec).toBeCalled();
    expect(spyOnPaginationParams).toBeCalled();
  });

  it("Should call getQueryResult with sort object", async () => {
    listControllerWithModelAndPagination.sortBy = {};
    const spyOnPaginationParams = jest.spyOn(
      listControllerWithModelAndPagination,
      "getPaginationParams"
    );

    await listControllerWithModelAndPagination.getQueryResult();
    expect(listControllerWithModelAndPagination.model.find).toBeCalled();
    expect(listControllerWithModelAndPagination.model.skip).toBeCalled();
    expect(listControllerWithModelAndPagination.model.limit).toBeCalled();
    expect(listControllerWithModelAndPagination.model.populate).toBeCalled();
    expect(listControllerWithModelAndPagination.model.select).toBeCalled();
    expect(listControllerWithModelAndPagination.model.sort).toBeCalled();
    expect(listControllerWithModelAndPagination.model.exec).toBeCalled();
    expect(spyOnPaginationParams).toBeCalled();
  });
});
