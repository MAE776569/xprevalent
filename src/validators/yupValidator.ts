import * as yup from "yup";
import validator from "validator";
import convertToString from "../utils/convertToString";
import validationMethods from "./validators";
import transformMethods from "./sanitizers";

validationMethods.forEach((method) => {
  yup.addMethod(yup[method.schema], method.name, function (...options: any[]) {
    return this.test(method.validatorName, undefined, function (value: any) {
      const isValid = validator[method.validatorName](
        convertToString(value),
        ...options
      );
      return isValid;
    });
  });
});

transformMethods.forEach((method) => {
  yup.addMethod(yup[method.schema], method.name, function (...options: any[]) {
    return this.transform(function (value: any) {
      return validator[method.validatorName](
        convertToString(value),
        ...options
      );
    });
  });
});

// it aborts early !!!
yup.addMethod(yup.mixed, "withMessage", function (message) {
  return this.typeError(message);
});

export = yup;
