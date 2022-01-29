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
