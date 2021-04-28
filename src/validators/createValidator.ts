import bindObject from "../utils/bindObject";
import ValidationChain from "./ValidationChain";
import ValidationPipeline from "./ValidationPipeline";
import {
  Chain,
  ValidationInput,
  ValidationLocation
} from "../types/validation/schema";

function createValidator(
  location: ValidationLocation,
  message?: string
): Chain {
  const pipeline = new ValidationPipeline(location);
  if (message) pipeline.setMessage(message);
  const pipelineRunner = function ({
    req,
    keys,
    validationResult
  }: ValidationInput) {
    pipeline.setRequst(req).setKeys(keys).setValidationResult(validationResult);
    pipeline.run();
  };
  const validator = new ValidationChain(pipeline, pipelineRunner);
  return Object.assign(pipelineRunner, bindObject(validator));
}

export = createValidator;
