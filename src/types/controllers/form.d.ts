import BaseCreateController from "../../controllers/create/BaseCreateController";
import BaseDeleteController from "../../controllers/delete/BaseDeleteController";
import BaseEditController from "../../controllers/edit/BaseEditController";
import FormViewControllerMixin from "../../mixins/form/FormViewControllerMixin";

export type ViewFormControllerType = (
  | BaseCreateController
  | BaseEditController
  | BaseDeleteController
) &
  ReturnType<typeof FormViewControllerMixin>;
