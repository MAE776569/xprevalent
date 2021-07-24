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

describe("Base controller should have context object", () => {
  it("Should have empty context object", () => {
    const cxtObject = (<any>genericController).getContextObject();
    expect(cxtObject).resolves.toEqual({});
  });

  it("Should return context object", () => {
    const title = "testing xprevalent";
    class Controller extends BaseController {
      async getContextObject() {
        return { title };
      }
    }
    const controllerObject = new Controller(req, res, next);
    const cxtObject = (<any>controllerObject).getContextObject();
    expect(cxtObject).resolves.toHaveProperty("title", title);
  });
});

describe("Base controller should have query method", () => {
  it("Should return empty array", () => {
    const queryResult = (<any>genericController).getQueryResult();
    expect(queryResult).resolves.toEqual([]);
    expect(queryResult).resolves.toHaveLength(0);
  });

  it("Should return query object", () => {
    const title = "testing xprevalent";
    const docs: any = [{ title }];
    class Controller extends BaseController {
      async getQueryResult() {
        return docs;
      }
    }
    const controllerObject = new Controller(req, res, next);
    const queryResult = (<any>controllerObject).getQueryResult();
    expect(queryResult).resolves.toHaveLength(1);
  });
});
