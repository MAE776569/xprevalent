import { NextFunction } from "express";
import SingleObjectController from "../../src/controllers/generic/SingleObjectController";
import { ValidationSchema, validator } from "../../src/validators";
import mockRequest from "../mocks/mock-request";
import mockResponse from "../mocks/mock-response";

const req = mockRequest();
const res = mockResponse();
const next: NextFunction = jest.fn();
const singleObjectController: any = new SingleObjectController(req, res, next);
const idParam = "userId";
const queryFilter = { name: "Mohamed" };
class SingleObjectControllerWithQuery extends SingleObjectController {
  protected getQueryFilter() {
    return queryFilter;
  }
}
const singleObjectControllerWithQuery: any = new SingleObjectControllerWithQuery(
  mockRequest({ params: { id: "621e0fdb1ccef535b1503175" } }),
  res,
  next
);

describe("Should have id param", () => {
  it("Should have default id param", () => {
    expect(singleObjectController.idParam).toBe("id");
  });

  it("Should override id param", () => {
    singleObjectController.idParam = idParam;
    expect(singleObjectController.idParam).toBe(idParam);
  });
});

describe("Should have query filter", () => {
  it("Should have empty query filter", () => {
    expect(singleObjectController.getQueryFilter()).toEqual({});
  });

  it("Should override getQueryFilter", () => {
    expect(singleObjectControllerWithQuery.getQueryFilter()).toEqual(
      queryFilter
    );
  });
});

describe("Should validate id param", () => {
  it("Should return validation error if id param is not valid", () => {
    expect(singleObjectController.validateIdParam()).toBe(true);
  });

  it("Should pass id param validation", () => {
    expect(singleObjectControllerWithQuery.validateIdParam()).toBe(false);
  });
});

describe("Should get validation result", () => {
  it("Should first initialize validation result", () => {
    singleObjectController.validationSchema = new ValidationSchema({
      query: validator.object({
        name: validator.string().notRequired()
      })
    });
    expect(singleObjectController.validationResult).toBeDefined();
  });

  it("Should get already initialized validatin result", () => {
    expect(singleObjectController.validationResult).toBeDefined();
  });
});
