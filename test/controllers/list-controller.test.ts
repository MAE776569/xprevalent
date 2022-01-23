import { NextFunction } from "express";
import { Model, Document } from "mongoose";
import BaseListController from "../../src/controllers/generic/BaseListController";
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
    expect((<any>listController).paginateBy).toEqual({
      pageParam: "page",
      limitParam: "limit",
      defaultLimit: 10
    });
  });
});

describe("Should get pagination object", () => {
  it("Should have default pagination", () => {
    expect((<any>listController).pagination).toEqual({
      page: 1,
      limit: 10
    });
  });

  it("Should return already calculated pagination", () => {
    expect((<any>listController).getPaginationParams()).toEqual({
      page: 1,
      limit: 10
    });
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
