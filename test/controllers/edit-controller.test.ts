import { NextFunction } from "express";
import BaseEditController from "../../src/controllers/edit/BaseEditController";
import mockRequest from "../mocks/mock-request";
import mockResponse from "../mocks/mock-response";
import mockModel from "../mocks/mock-model";
import { ValidationSchema, validator } from "../../src/validators";

const req = mockRequest({ body: {} });
const res = mockResponse();
const next: NextFunction = jest.fn();
const editController: any = new BaseEditController(req, res, next);
const validatorSchema = {
  body: validator.object({
    name: validator.string().required(),
    email: validator.string().email().required()
  })
};
const userValidationSchema: ValidationSchema = new ValidationSchema(
  validatorSchema
);
editController.validationSchema = userValidationSchema;
const user = {
  name: "mohamed",
  email: "mohamed@mae.com"
};
editController.model = mockModel();

const paramId = "621e0fdb1ccef535b1503175";
const successReq = mockRequest({
  body: user,
  params: { id: paramId }
});
const editControllerWithRes: any = new BaseEditController(
  successReq,
  mockResponse(),
  next
);
editControllerWithRes.validationSchema = new ValidationSchema(validatorSchema);
editControllerWithRes.model = mockModel();

describe("Should validate document before updating", () => {
  it("Should throw an error if body has errors", async () => {
    await editController.handleRequest();
    const validationResult = editController.validationResult;
    const bodyErrors = validationResult.getErrors({ location: "body" });
    const nameError = validationResult.getErrors({
      location: "body",
      name: "name"
    });
    expect(validationResult.hasError()).toBe(true);
    expect(nameError).toBeDefined();
    expect(bodyErrors).toHaveProperty("email");
  });

  it("Should return document if validation is successful", async () => {
    await editControllerWithRes.handleRequest();
    const validationResult = editControllerWithRes.validationResult;
    const userValidated = validationResult.getValue();
    const errors = validationResult.getErrors();
    expect(errors.body).toBeUndefined();
    expect(userValidated.body).toEqual(user);
  });
});

describe("Should get query set", () => {
  it("Should get document if body is valid", async () => {
    const getUpdateSetSpy = jest.spyOn(editControllerWithRes, "getUpdateSet");
    await editControllerWithRes.handleRequest();
    const validUser = editControllerWithRes.validationResult.getValue("body");
    expect(
      editControllerWithRes.model.findByIdAndUpdate
    ).toHaveBeenLastCalledWith(paramId, validUser, { new: true });
    expect(editControllerWithRes.model.findOneAndUpdate).not.toBeCalled();
    expect(editControllerWithRes.model.populate).not.toBeCalled();
    expect(editControllerWithRes.model.sort).not.toBeCalled();
    expect(editControllerWithRes.model.select).not.toBeCalled();
    expect(getUpdateSetSpy).toHaveBeenCalled();
  });

  it("Should insert or update document if exists", async () => {
    editControllerWithRes.upsert = true;
    await editControllerWithRes.handleRequest();
    const validUser = editControllerWithRes.validationResult.getValue("body");
    expect(
      editControllerWithRes.model.findByIdAndUpdate
    ).toHaveBeenLastCalledWith(paramId, validUser, { new: true, upsert: true });
    expect(editControllerWithRes.model.findOneAndUpdate).not.toBeCalled();
    expect(editControllerWithRes.model.populate).not.toBeCalled();
    expect(editControllerWithRes.model.sort).not.toBeCalled();
    expect(editControllerWithRes.model.select).not.toBeCalled();
  });

  it("Should update one document", async () => {
    const getUpdateSetSpy = jest.spyOn(editControllerWithRes, "getQueryFilter");
    editControllerWithRes.updateOne = true;
    await editControllerWithRes.handleRequest();
    const validUser = editControllerWithRes.validationResult.getValue("body");
    expect(
      editControllerWithRes.model.findOneAndUpdate
    ).toHaveBeenLastCalledWith({}, validUser, { new: true, upsert: true });
    expect(editControllerWithRes.model.populate).not.toBeCalled();
    expect(editControllerWithRes.model.sort).not.toBeCalled();
    expect(editControllerWithRes.model.select).not.toBeCalled();
    expect(getUpdateSetSpy).toHaveBeenCalled();
  });

  it("Should select document fields", async () => {
    editControllerWithRes.upsert = false;
    editControllerWithRes.updateOne = false;
    editControllerWithRes.selectedFields = ["name", "email"];
    await editControllerWithRes.handleRequest();
    const validUser = editControllerWithRes.validationResult.getValue("body");
    expect(
      editControllerWithRes.model.findByIdAndUpdate
    ).toHaveBeenLastCalledWith(paramId, validUser, { new: true });
    expect(editControllerWithRes.model.populate).not.toBeCalled();
    expect(editControllerWithRes.model.sort).not.toBeCalled();
    expect(editControllerWithRes.model.select).toHaveBeenLastCalledWith(
      editControllerWithRes.selectedFields
    );
  });

  it("Should exclude document fields", async () => {
    editControllerWithRes.selectedFields = undefined;
    editControllerWithRes.excludedFields = ["name", "email"];
    await editControllerWithRes.handleRequest();
    const validUser = editControllerWithRes.validationResult.getValue("body");
    expect(
      editControllerWithRes.model.findByIdAndUpdate
    ).toHaveBeenLastCalledWith(paramId, validUser, { new: true });
    expect(editControllerWithRes.model.populate).not.toBeCalled();
    expect(editControllerWithRes.model.sort).not.toBeCalled();
    expect(editControllerWithRes.model.select).toHaveBeenLastCalledWith(
      editControllerWithRes.excludedFields.map((item) => `-${item}`).join(" ")
    );
  });

  it("Should populate document fields", async () => {
    editControllerWithRes.excludedFields = undefined;
    editControllerWithRes.populatedFields = ["products"];
    await editControllerWithRes.handleRequest();
    const validUser = editControllerWithRes.validationResult.getValue("body");
    expect(
      editControllerWithRes.model.findByIdAndUpdate
    ).toHaveBeenLastCalledWith(paramId, validUser, { new: true });
    expect(editControllerWithRes.model.populate).toHaveBeenLastCalledWith(
      editControllerWithRes.populatedFields
    );
    expect(editControllerWithRes.model.sort).not.toBeCalled();
  });

  it("Should sort documents", async () => {
    editControllerWithRes.populatedFields = undefined;
    editControllerWithRes.sortBy = { createdAt: -1 };
    await editControllerWithRes.handleRequest();
    const validUser = editControllerWithRes.validationResult.getValue("body");
    expect(
      editControllerWithRes.model.findByIdAndUpdate
    ).toHaveBeenLastCalledWith(paramId, validUser, { new: true });
    expect(editControllerWithRes.model.sort).toBeCalled();
  });
});
