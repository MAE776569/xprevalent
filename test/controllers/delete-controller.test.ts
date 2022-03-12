import { NextFunction } from "express";
import BaseDeleteController from "../../src/controllers/delete/BaseDeleteController";
import mockRequest from "../mocks/mock-request";
import mockResponse from "../mocks/mock-response";
import mockModel from "../mocks/mock-model";

const req = mockRequest({ params: { id: "621e0fdb1ccef535b1503175" } });
const res = mockResponse();
const next: NextFunction = jest.fn();
const deleteController: any = new BaseDeleteController(req, res, next);
deleteController.model = mockModel();

describe("Should get query result", () => {
  it("Should delete document by id", async () => {
    await deleteController.getQueryResult();
    expect(deleteController.model.findByIdAndDelete).toBeCalled();
    expect(deleteController.model.findOneAndDelete).not.toBeCalled();
    expect(deleteController.model.populate).not.toBeCalled();
    expect(deleteController.model.sort).not.toBeCalled();
    expect(deleteController.model.select).not.toBeCalled();
    expect(deleteController.model.exec).toBeCalled();
  });

  it("Should delete one document", async () => {
    const deleteOneDetailsController: any = new BaseDeleteController(
      req,
      res,
      next
    );
    deleteOneDetailsController.model = mockModel();
    deleteOneDetailsController.deleteOne = true;

    await deleteOneDetailsController.getQueryResult();
    expect(deleteOneDetailsController.model.findOneAndDelete).toBeCalled();
    expect(deleteOneDetailsController.model.findByIdAndDelete).not.toBeCalled();
    expect(deleteOneDetailsController.model.populate).not.toBeCalled();
    expect(deleteOneDetailsController.model.sort).not.toBeCalled();
    expect(deleteOneDetailsController.model.select).not.toBeCalled();
    expect(deleteOneDetailsController.model.exec).toBeCalled();
  });

  it("Should call getQueryResult with populated fields", async () => {
    deleteController.populatedFields = [];

    await deleteController.getQueryResult();
    expect(deleteController.model.findByIdAndDelete).toBeCalled();
    expect(deleteController.model.findOneAndDelete).not.toBeCalled();
    expect(deleteController.model.populate).toBeCalled();
    expect(deleteController.model.sort).not.toBeCalled();
    expect(deleteController.model.select).not.toBeCalled();
    expect(deleteController.model.exec).toBeCalled();
  });

  it("Should call getQueryResult with selected fields", async () => {
    const selectedFields = ["name", "description"];
    deleteController.selectedFields = selectedFields;

    await deleteController.getQueryResult();
    expect(deleteController.model.findByIdAndDelete).toBeCalled();
    expect(deleteController.model.findOneAndDelete).not.toBeCalled();
    expect(deleteController.model.populate).toBeCalled();
    expect(deleteController.model.sort).not.toBeCalled();
    expect(deleteController.model.select).toHaveBeenLastCalledWith(
      selectedFields
    );
    expect(deleteController.model.exec).toBeCalled();
  });

  it("Should call getQueryResult with excluded fields", async () => {
    const excludedFields = ["name", "description"];
    deleteController.selectedFields = undefined;
    deleteController.excludedFields = excludedFields;

    await deleteController.getQueryResult();
    expect(deleteController.model.findByIdAndDelete).toBeCalled();
    expect(deleteController.model.findOneAndDelete).not.toBeCalled();
    expect(deleteController.model.populate).toBeCalled();
    expect(deleteController.model.sort).not.toBeCalled();
    expect(deleteController.model.select).toHaveBeenLastCalledWith(
      expect.stringMatching(
        excludedFields.map((field) => `-${field}`).join(" ")
      )
    );
    expect(deleteController.model.exec).toBeCalled();
  });

  it("Should call getQueryResult with sort object", async () => {
    deleteController.sortBy = { createdAt: -1 };

    await deleteController.getQueryResult();
    expect(deleteController.model.findByIdAndDelete).toBeCalled();
    expect(deleteController.model.findOneAndDelete).not.toBeCalled();
    expect(deleteController.model.populate).toBeCalled();
    expect(deleteController.model.sort).toBeCalled();
    expect(deleteController.model.select).toBeCalled();
    expect(deleteController.model.exec).toBeCalled();
  });
});
