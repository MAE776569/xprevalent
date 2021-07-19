import { NextFunction } from "express";
import { Model, Document } from "mongoose";
import BaseController from "../../src/base/generic/BaseController";
import mockRequest from "../mocks/mock-request";
import mockResponse from "../mocks/mock-response";

const req = mockRequest();
const res = mockResponse();
const next: NextFunction = jest.fn();
const genericController = new BaseController(req, res, next);
