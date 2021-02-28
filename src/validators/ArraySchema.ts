import { Request } from "express";
import { BaseValidation, SchemaObject } from "../types/validation/schema";
import { ValidationLocation } from "../types/validator";
import _ from "lodash";
import ValidationResult from "./ValidationResult";

// TODO: Validate for array length and othe options

class ArraySchema implements BaseValidation {
  private readonly schema: SchemaObject;
  private readonly location: ValidationLocation;
  private readonly message: string;
  private keys!: string[];
  private value!: any[];
  private req!: Request;
  private validationResult!: ValidationResult;

  constructor(
    location: ValidationLocation,
    schema: SchemaObject,
    message: string
  ) {
    this.location = location;
    this.schema = schema;
    this.message = message;
  }

  public validate({ req, keys, validationResult }): void {
    this.req = req;
    this.keys = keys;
    this.validationResult = validationResult;
    this.value = _.get(this.req[this.location], this.keys);

    if (Array.isArray(this.value)) {
      this.value.forEach((_item, index) => {
        this.runValidation(_.cloneDeep(this.schema), this.req, [
          ...this.keys,
          index.toString()
        ]);
      });
    } else {
      const errorObject = _.setWith({}, this.keys, this.message, Object);
      this.validationResult.addError(errorObject);
    }
  }

  private runValidation(
    deepSchema: SchemaObject | ArraySchema,
    req: Request,
    keys: string[] = []
  ): void {
    const validationKeys = Object.keys(deepSchema);
    validationKeys.forEach((item) => {
      const validationFunc = deepSchema[item];

      // if array schema run its own validation
      if (validationFunc instanceof ArraySchema) {
        validationFunc.validate({
          req,
          keys: [...keys, item],
          validationResult: this.validationResult
        });
      }

      // if object but not array
      else if (typeof validationFunc === "object") {
        this.runValidation(validationFunc, req, [...keys, item]);
      }

      // else if array of one object
      else {
        validationFunc({
          req,
          keys: [...keys, item],
          validationResult: this.validationResult
        });
      }
    });
  }
}

export = ArraySchema;
