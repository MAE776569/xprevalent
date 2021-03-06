import { NextFunction } from "express";
import { Model, Document } from "mongoose";
import BaseController from "../../src/base/generic/BaseController";
import mockRequest from "../mocks/mock-request";
import mockResponse from "../mocks/mock-response";

const req = mockRequest();
const res = mockResponse();
const next: NextFunction = jest.fn();
const genericController = new BaseController(req, res, next);

describe("Base controller should have queryObjectName", () => {
  it("Should exist in base controller", () => {
    expect(genericController).toHaveProperty("queryObjectName");
  });

  it("Should have default value", () => {
    expect(genericController).toHaveProperty("queryObjectName", "data");
  });

  it("Should override default name", () => {
    const objectName = "result";
    class Controller extends BaseController {
      queryObjectName = objectName;
    }
    const controllerObject = new Controller(req, res, next);
    expect(controllerObject).toHaveProperty("queryObjectName", objectName);
  });
});
