import BaseCreateController from "../../base/form/BaseCreateController";
import BaseEditController from "../../base/form/BaseEditController";
import FormControllerMixin from "../../mixins/form/FormControllerMixin";

export type ViewFormControllerType = (
  | BaseCreateController
  | BaseEditController
) &
  ReturnType<typeof FormControllerMixin>;
