import BaseController from "./controllers/generic/BaseController";
import BaseListController from "./controllers/list/BaseListController";
import ApiControllerMixin from "./mixins/generic/ApiControllerMixin";
import ViewControllerMixin from "./mixins/generic/ViewControllerMixin";
import ApiDetailsController from "./controllers/details/ApiDetailsController";
import ViewDetailsController from "./controllers/details/ViewDetailsController";
import ApiCreateController from "./controllers/create/ApiCreateController";
import ViewCreateController from "./controllers/create/ViewCreateController";
import ApiEditController from "./controllers/edit/ApiEditController";
import ViewEditController from "./controllers/edit/ViewEditController";
import ApiDeleteController from "./controllers/delete/ApiDeleteController";
import ViewDeleteController from "./controllers/delete/ViewDeleteController";
import FormViewController from "./controllers/form/FormViewController";

export const ApiController = ApiControllerMixin(BaseController);
export const ViewController = ViewControllerMixin(BaseController);
export const ApiListController = ApiControllerMixin(BaseListController);
export const ViewListController = ViewControllerMixin(BaseListController);

export {
  ApiDetailsController,
  ViewDetailsController,
  ApiCreateController,
  ViewCreateController,
  ApiEditController,
  ViewEditController,
  ApiDeleteController,
  ViewDeleteController,
  FormViewController
};
