import BaseCreateController from "../../base/form/BaseCreateController";
import BaseDeleteController from "../../base/form/BaseDeleteController";
import BaseEditController from "../../base/form/BaseEditController";
import FormControllerMixin from "../../mixins/form/FormControllerMixin";

export type ViewFormControllerType = (
  | BaseCreateController
  | BaseEditController
  | BaseDeleteController
) &
  ReturnType<typeof FormControllerMixin>;
