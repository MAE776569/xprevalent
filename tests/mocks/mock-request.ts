import { Request } from "express";
import { Params } from "express-serve-static-core";
import { ParsedQs } from "qs";

function mockRequest(
  query: ParsedQs = {},
  params: Params = {},
  body = {}
): Request {
  const request = { query, params, body } as Request;
  return request;
}

export = mockRequest;
