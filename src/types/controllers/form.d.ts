import BaseCreateController from "../../controllers/create/BaseCreateController";
import BaseDeleteController from "../../controllers/delete/BaseDeleteController";
import BaseEditController from "../../controllers/edit/BaseEditController";
import FormControllerMixin from "../../mixins/form/FormControllerMixin";

export type ViewFormControllerType = (
  | BaseCreateController
  | BaseEditController
  | BaseDeleteController
) &
  ReturnType<typeof FormControllerMixin>;
