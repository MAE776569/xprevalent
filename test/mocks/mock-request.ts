import { Request } from "express";
import { Params } from "express-serve-static-core";
import { ParsedQs } from "qs";

interface RequestInput {
  query?: ParsedQs;
  params?: Params;
  body?: Object;
}

function mockRequest(
  { query = {}, params = {}, body = {} }: RequestInput = {
    query: {},
    params: {},
    body: {}
  }
): Request {
  const request = { query, params, body } as Request;
  return request;
}

export = mockRequest;
