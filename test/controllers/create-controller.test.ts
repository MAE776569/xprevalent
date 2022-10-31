import { NextFunction } from "express";
import BaseCreateController from "../../src/controllers/create/BaseCreateController";
import mockRequest from "../mocks/mock-request";
import mockResponse from "../mocks/mock-response";
import mockModel from "../mocks/mock-model";
import { ValidationSchema, validator } from "../../src/validator";

const req = mockRequest({ body: {} });
const res = mockResponse();
const next: NextFunction = jest.fn();
const createController: any = new BaseCreateController(req, res, next);
const validatorSchema = {
  body: validator.object({
    name: validator.string().required(),
    email: validator.string().email().required()
  })
};
const userValidationSchema: ValidationSchema = new ValidationSchema(
  validatorSchema
);
createController.validationSchema = userValidationSchema;
const user = {
  name: "mohamed",
  email: "mohamed@mae.com"
};
createController.model = mockModel();

const successReq = mockRequest({ body: user });
const createControllerWithRes: any = new BaseCreateController(
  successReq,
  mockResponse(),
  next
);
createControllerWithRes.validationSchema = new ValidationSchema(
  validatorSchema
);
createControllerWithRes.model = mockModel();

describe("Should validate document before creation", () => {
  it("Should throw an error if body has errors", async () => {
    await createController.handleRequest();
    const validationResult = createController.validationResult;
    const errors = validationResult.getErrors();
    expect(errors).toHaveProperty("body");
    expect(errors.body).toHaveProperty("name");
    expect(errors.body).toHaveProperty("email");
  });

  it("Should return document if validation is successful", async () => {
    await createControllerWithRes.handleRequest();
    const validationResult = createControllerWithRes.validationResult;

    const userValidated = validationResult.getValue("body");
    const errors = validationResult.getErrors();
    expect(errors.body).toBeUndefined();
    expect(userValidated).toEqual(user);
  });
});

describe("Should get document", () => {
  it("Should get document if body is valid", async () => {
    const getDocumentSpy = jest.spyOn(createControllerWithRes, "getDocument");
    await createControllerWithRes.handleRequest();
    const validUser = createControllerWithRes.validationResult.getValue("body");
    expect(createControllerWithRes.model.create).toHaveBeenLastCalledWith(
      validUser
    );
    expect(getDocumentSpy).toHaveBeenCalled();
  });
});
