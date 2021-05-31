import Sanitizer from "./Sanitizer";
import Validator from "./Validator";
import { Request } from "express";
import ValidationResult from "./ValidationResult";
import * as _ from "lodash";
import { Optional } from "../types/validation/validators";
import {
  ArraySchemaOptions,
  SchemaObject,
  ValidationLocation
} from "../types/validation/schema";
import ArraySchema from "./ArraySchema";

class ValidationPipeline {
  private value: any;
  private queue: (Validator | Sanitizer)[] = [];
  private isValid: boolean = true;
  private req!: Request;
  private keys!: string[];
  private validationResult!: ValidationResult;
  private readonly location: ValidationLocation;
  private message: string = "Invalid value";
  private optional?: Optional;

  constructor(location: ValidationLocation) {
    this.location = location;
  }

  public setRequst(req: Request): this {
    this.req = req;
    return this;
  }

  public setKeys(keys: string[]): this {
    this.keys = keys;
    this.value = _.get(this.req[this.location], this.keys);
    return this;
  }

  public setValidationResult(validationResult: ValidationResult): this {
    this.validationResult = validationResult;
    return this;
  }

  public setMessage(message: string): void {
    this.message = message;
  }

  public setOptional(options: Optional): void {
    this.optional = options;
  }

  public push(item: Validator | Sanitizer): void {
    this.queue.push(item);
  }

  public createArraySchema(
    schema: SchemaObject,
    options?: ArraySchemaOptions
  ): ArraySchema {
    return new ArraySchema(this.location, schema, this.message, options);
  }

  private isOptional(): boolean {
    const { nullable, checkFalsy } = this.optional!;

    const checks = [
      (value) => value === undefined,
      (value) => nullable && value == null,
      (value) => checkFalsy && !value
    ];

    return checks.some((check) => check(this.value));
  }

  public run(): void {
    this.queue.forEach((item) => {
      if (item instanceof Sanitizer) {
        this.value = item.run(this.value);
      } else {
        this.isValid = this.isValid && item.run(this.value, this.req);
      }
    });

    if (this.optional) {
      const isOptionalValue = this.isOptional();
      if (isOptionalValue) {
        this.isValid = true;
      }
    }

    if (!this.isValid) {
      const errorObject = _.setWith({}, this.keys, this.message, Object);
      this.validationResult.addError(errorObject);
    } else {
      const sanitizedObject = _.setWith({}, this.keys, this.value, Object);
      this.validationResult.addSanitizedValue(sanitizedObject);
    }
  }
}

export = ValidationPipeline;
