import BaseCreateController from "../../controllers/form/BaseCreateController";
import BaseDeleteController from "../../controllers/form/BaseDeleteController";
import BaseEditController from "../../controllers/form/BaseEditController";
import FormControllerMixin from "../../mixins/form/FormControllerMixin";

export type ViewFormControllerType = (
  | BaseCreateController
  | BaseEditController
  | BaseDeleteController
) &
  ReturnType<typeof FormControllerMixin>;
