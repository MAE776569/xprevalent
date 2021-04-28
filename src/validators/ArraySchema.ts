import { Request } from "express";
import {
  BaseValidation,
  SchemaObject,
  ArraySchemaOptions,
  ValidationLocation
} from "../types/validation/schema";
import * as _ from "lodash";
import ValidationResult from "./ValidationResult";

class ArraySchema implements BaseValidation {
  private readonly schema: SchemaObject;
  private readonly location: ValidationLocation;
  private readonly message: string;
  private keys!: string[];
  private value!: any[];
  private req!: Request;
  private validationResult!: ValidationResult;
  private options: ArraySchemaOptions;

  constructor(
    location: ValidationLocation,
    schema: SchemaObject,
    message: string,
    options: ArraySchemaOptions = {}
  ) {
    this.location = location;
    this.schema = schema;
    this.message = message;
    this.options = options;
  }

  public validate({ req, keys, validationResult }): void {
    this.req = req;
    this.keys = keys;
    this.validationResult = validationResult;
    this.value = _.get(this.req[this.location], this.keys);

    if (Array.isArray(this.value)) {
      const { length, minLength, maxLength } = this.options;
      let optionsError: string | undefined;

      if (length && this.value.length !== length)
        optionsError = `Array length must be equal ${length}`;
      if (minLength && this.value.length < minLength)
        optionsError = `Array length must be greater than or equal ${minLength}`;
      if (maxLength && this.value.length > maxLength)
        optionsError = `Array length must be less than or equal ${maxLength}`;

      if (optionsError) {
        const errorObject = _.setWith({}, this.keys, optionsError, Object);
        this.validationResult.addError(errorObject);
        return;
      }

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

      // else run validation function
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
