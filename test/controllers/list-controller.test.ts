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
