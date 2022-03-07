import { NextFunction } from "express";
import BaseDetailsController from "../../src/controllers/details/BaseDetailsController";
import mockRequest from "../mocks/mock-request";
import mockResponse from "../mocks/mock-response";
import mockModel from "../mocks/mock-model";

const req = mockRequest({ params: { id: "621e0fdb1ccef535b1503175" } });
const res = mockResponse();
const next: NextFunction = jest.fn();
const detailsController: any = new BaseDetailsController(req, res, next);
detailsController.model = mockModel();

describe("Should get query result", () => {
  it("Should find document by id", async () => {
    await detailsController.getQueryResult();
    expect(detailsController.model.findById).toBeCalled();
    expect(detailsController.model.findOne).not.toBeCalled();
    expect(detailsController.model.populate).not.toBeCalled();
    expect(detailsController.model.sort).not.toBeCalled();
    expect(detailsController.model.select).not.toBeCalled();
    expect(detailsController.model.exec).toBeCalled();
  });

  it("Should find one document", async () => {
    const findOneDetailsController: any = new BaseDetailsController(
      req,
      res,
      next
    );
    findOneDetailsController.model = mockModel();
    findOneDetailsController.findOne = true;

    await findOneDetailsController.getQueryResult();
    expect(findOneDetailsController.model.findOne).toBeCalled();
    expect(findOneDetailsController.model.findById).not.toBeCalled();
    expect(findOneDetailsController.model.populate).not.toBeCalled();
    expect(findOneDetailsController.model.sort).not.toBeCalled();
    expect(findOneDetailsController.model.select).not.toBeCalled();
    expect(findOneDetailsController.model.exec).toBeCalled();
  });

  it("Should call getQueryResult with populated fields", async () => {
    detailsController.populatedFields = [];

    await detailsController.getQueryResult();
    expect(detailsController.model.findById).toBeCalled();
    expect(detailsController.model.findOne).not.toBeCalled();
    expect(detailsController.model.populate).toBeCalled();
    expect(detailsController.model.sort).not.toBeCalled();
    expect(detailsController.model.select).not.toBeCalled();
    expect(detailsController.model.exec).toBeCalled();
  });

  it("Should call getQueryResult with selected fields", async () => {
    const selectedFields = ["name", "description"];
    detailsController.selectedFields = selectedFields;

    await detailsController.getQueryResult();
    expect(detailsController.model.findById).toBeCalled();
    expect(detailsController.model.findOne).not.toBeCalled();
    expect(detailsController.model.populate).toBeCalled();
    expect(detailsController.model.sort).not.toBeCalled();
    expect(detailsController.model.select).toBeCalled();
    expect(detailsController.model.select).toHaveBeenLastCalledWith(
      selectedFields
    );
    expect(detailsController.model.exec).toBeCalled();
  });

  it("Should call getQueryResult with excluded fields", async () => {
    const excludedFields = ["name", "description"];
    detailsController.selectedFields = undefined;
    detailsController.excludedFields = excludedFields;

    await detailsController.getQueryResult();
    expect(detailsController.model.findById).toBeCalled();
    expect(detailsController.model.findOne).not.toBeCalled();
    expect(detailsController.model.populate).toBeCalled();
    expect(detailsController.model.sort).not.toBeCalled();
    expect(detailsController.model.select).toBeCalled();
    expect(detailsController.model.select).toHaveBeenLastCalledWith(
      expect.stringMatching(
        excludedFields.map((field) => `-${field}`).join(" ")
      )
    );
    expect(detailsController.model.exec).toBeCalled();
  });

  it("Should call getQueryResult with sort object", async () => {
    detailsController.sortBy = {};

    await detailsController.getQueryResult();
    expect(detailsController.model.findById).toBeCalled();
    expect(detailsController.model.findOne).not.toBeCalled();
    expect(detailsController.model.populate).toBeCalled();
    expect(detailsController.model.sort).toBeCalled();
    expect(detailsController.model.select).toBeCalled();
    expect(detailsController.model.exec).toBeCalled();
  });
});
