import { NextFunction } from "express";
import { Model, Document } from "mongoose";
import BaseListController from "../../src/controllers/list/BaseListController";
import mockRequest from "../mocks/mock-request";
import mockResponse from "../mocks/mock-response";

const req = mockRequest();
const res = mockResponse();
const next: NextFunction = jest.fn();
const listController = new BaseListController(req, res, next);

describe("List controller should have pagination parameters", () => {
  it("Shouldn't use pagination by default", () => {
    expect((<any>listController).usePagination).toBe(false);
  });

  it("Should have pagination object", () => {
    expect((<any>listController).paginateBy).toEqual({});
  });
});

describe("Should get pagination object", () => {
  it("Should have default pagination", () => {
    expect((<any>listController).pagination).toBeUndefined();
  });

  it("Should return already calculated pagination", () => {
    expect((<any>listController).getPaginationParams()).toEqual({
      page: 1,
      limit: 10
    });
  });

  it("Should return pagination object if exists", () => {
    const pagination = {
      page: 1,
      limit: 10
    };
    (<any>listController).pagination = pagination;
    expect((<any>listController).getPaginationParams()).toEqual(pagination);
  });
});

describe("Should get and set total pages", () => {
  const lastPage = 5;
  it("Should get totalPages", () => {
    expect((<any>listController).totalPages).toEqual(1);
  });

  it("Should set totalPages", () => {
    (<any>listController).totalPages = lastPage;
    expect((<any>listController).totalPages).toEqual(lastPage);
  });
});

describe("Should get context object", () => {
  it("Should get empty context object", () => {
    expect((<any>listController).getContextObject()).resolves.toEqual({});
  });

  it("Should get context object with meta", async () => {
    const listControllerWithPagination = new BaseListController(req, res, next);
    (<any>listControllerWithPagination).model = ({
      // eslint-disable-next-line no-empty-pattern
      countDocuments({}) {
        return Promise.resolve(1);
      }
    } as unknown) as Model<Document>;
    (<any>listControllerWithPagination).usePagination = true;
    const ctx = await (<any>listControllerWithPagination).getContextObject();

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
    const listControllerWithPagination = new BaseListController(req, res, next);
    (<any>listControllerWithPagination).model = ({
      // eslint-disable-next-line no-empty-pattern
      countDocuments({}) {
        return Promise.resolve(0);
      }
    } as unknown) as Model<Document>;

    await (<any>listControllerWithPagination).getPaginationMeta();
    expect((<any>listControllerWithPagination).totalPages).toBe(1);
  });

  it("Should get pagination meta with default first page", async () => {
    const listControllerWithPagination = new BaseListController(req, res, next);

    const count = 20;
    (<any>listControllerWithPagination).model = ({
      // eslint-disable-next-line no-empty-pattern
      countDocuments({}) {
        return Promise.resolve(count);
      }
    } as unknown) as Model<Document>;

    const meta = await (<any>listControllerWithPagination).getPaginationMeta();
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
  const listControllerWithQuery = new BaseListController(
    reqWithPage,
    res,
    next
  );

  it("Should get pagination meta with querying page", async () => {
    const count = 20;
    (<any>listControllerWithQuery).model = ({
      // eslint-disable-next-line no-empty-pattern
      countDocuments({}) {
        return Promise.resolve(count);
      }
    } as unknown) as Model<Document>;

    const meta = await (<any>listControllerWithQuery).getPaginationMeta();
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
    (<any>listControllerWithQuery).model = ({
      // eslint-disable-next-line no-empty-pattern
      countDocuments({}) {
        return Promise.resolve(count);
      }
    } as unknown) as Model<Document>;

    const meta = await (<any>listControllerWithQuery).getPaginationMeta();
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
