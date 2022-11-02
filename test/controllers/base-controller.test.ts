import { NextFunction } from "express";
import BaseController from "../../src/controllers/generic/BaseController";
import mockRequest from "../mocks/mock-request";
import mockResponse from "../mocks/mock-response";
import mockModel from "../mocks/mock-model";

const req = mockRequest();
const res = mockResponse();
const next: NextFunction = jest.fn();
const genericController: any = new BaseController(req, res, next);

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
    const cxtObject = genericController.getContextObject();
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
    const cxtObject = controllerObject.getContextObject();
    expect(cxtObject).resolves.toHaveProperty("title", title);
  });
});

describe("Base controller should have query method", () => {
  it("Should return empty array", () => {
    const queryResult = genericController.getQueryResult();
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
    const queryResult = controllerObject.getQueryResult();
    expect(queryResult).resolves.toHaveLength(1);
  });
});

describe("Base controller should have handler", () => {
  it("Should be array of one element", () => {
    expect(BaseController.handle).toHaveLength(1);
  });

  it("Should be array of function callback", () => {
    expect(typeof BaseController.handle[0]).toBe("function");
  });
});

describe("Base controller should handle request", () => {
  it("Should call handleRequest", async () => {
    const handlerSpy = jest.spyOn(genericController, "handleRequest");
    await genericController.handleRequest();
    expect(handlerSpy).toHaveBeenCalledTimes(1);
  });

  it("Should call getContextObject in handleRequest", async () => {
    const ctxSpy = jest.spyOn(genericController, "getContextObject");
    await genericController.handleRequest();
    expect(ctxSpy).toHaveBeenCalledTimes(1);
  });

  it("Should call getQueryResult in handleRequest", async () => {
    class Controller extends BaseController {
      model = mockModel();
    }
    const controllerObject: any = new Controller(req, res, next);

    const querySpy = jest.spyOn(controllerObject, "getQueryResult");
    await controllerObject.handleRequest();
    expect(querySpy).toHaveBeenCalledTimes(1);
  });

  it("Should call res.send", async () => {
    await genericController.handleRequest();
    expect(res.send).toHaveBeenCalled();
  });
});

describe("Base controller should call next", () => {
  it("Should call next with getContextObject error", async () => {
    class Controller extends BaseController {
      getContextObject() {
        return Promise.reject();
      }
    }
    const controllerObject: any = new Controller(req, res, next);
    await controllerObject.handleRequest();
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("Should call next with getQueryResult error", async () => {
    class Controller extends BaseController {
      getQueryResult() {
        return Promise.reject();
      }
    }
    const nextFn: NextFunction = jest.fn();
    const controllerObject: any = new Controller(req, res, nextFn);
    await controllerObject.handleRequest();
    expect(nextFn).toHaveBeenCalledTimes(1);
  });
});

describe("Base controller should have query filter", () => {
  it("Should return empty filter object", () => {
    expect(genericController.getQueryFilter()).toEqual({});
  });

  it("Should override filter object", () => {
    const filter = {
      $and: [{ title: { $ne: null } }, { description: { $ne: null } }]
    };
    class Controller extends BaseController {
      getQueryFilter() {
        return filter;
      }
    }
    const controllerObject = new Controller(req, res, next);
    const queryFilter = controllerObject.getQueryFilter();
    expect(queryFilter).toEqual(filter);
  });
});

describe("Should send response with valid body", () => {
  it("Should send response with default json", async () => {
    genericController.sendResponse({});
    expect(res.json).toHaveBeenLastCalledWith({
      success: true,
      error: null
    });
  });

  it("Should call res.send with empty data array", async () => {
    await BaseController.handle[0](req, res, next);
    expect(res.send).toHaveBeenCalledWith({
      data: [],
      error: null,
      success: true
    });
  });
});
