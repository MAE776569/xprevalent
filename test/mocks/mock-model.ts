/* eslint-disable no-unused-vars */
import { Model, Document } from "mongoose";

interface ModelInput {
  count?: number;
  data?: Array<any> | Object;
}

function mockModel({ count, data }: ModelInput = {}): Model<Document> {
  const model = ({
    countDocuments: jest.fn((_filter) => {
      if (typeof count === "number") return Promise.resolve(count);
      return model;
    }),
    find: jest.fn((_filter) => model),
    skip: jest.fn((_number) => model),
    limit: jest.fn((_number) => model),
    populate: jest.fn((_populateObject) => model),
    sort: jest.fn((_sortObject) => model),
    select: jest.fn((_selectOptions) => model),
    exec: jest.fn(() => Promise.resolve(data || []))
  } as unknown) as Model<Document>;

  return model;
}

export = mockModel;