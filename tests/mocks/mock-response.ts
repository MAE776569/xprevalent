/* eslint-disable no-unused-vars */
import { Response } from "express";

function mockResponse() {
  const response = {} as Response;

  response.status = jest.fn((_code: number) => response);
  response.sendStatus = jest.fn((_code: number) => response);
  response.send = jest.fn((_body: string | Buffer | Object) => response);
  response.json = jest.fn((_obj: any) => response);
  response.end = jest.fn().mockReturnValue(response);
  response.render = jest.fn(
    (_view: string, _locals?: { [local: string]: any }, _callback?: Function) =>
      response
  );

  return response;
}

export = mockResponse;
