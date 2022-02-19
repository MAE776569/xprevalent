/* eslint-disable no-unused-vars */
import { Response } from "express";

function mockResponse() {
  const response = ({
    status: jest.fn((_code: number) => response),
    sendStatus: jest.fn((_code: number) => response),
    send: jest.fn((_body: string | Buffer | Object) => response),
    json: jest.fn((_obj: any) => response),
    end: jest.fn(() => response),
    render: jest.fn(
      (
        _view: string,
        _locals?: { [local: string]: any },
        _callback?: Function
      ) => response
    )
  } as unknown) as Response;

  return response;
}

export = mockResponse;
