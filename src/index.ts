import BaseController from "./controllers/generic/BaseController";
import BaseListController from "./controllers/list/BaseListController";
import ApiControllerMixin from "./mixins/generic/ApiControllerMixin";
import ApiDetailsController from "./controllers/details/ApiDetailsController";
import ApiCreateController from "./controllers/create/ApiCreateController";
import ApiEditController from "./controllers/edit/ApiEditController";
import ApiDeleteController from "./controllers/delete/ApiDeleteController";

export const ApiController = ApiControllerMixin(BaseController);
export const ApiListController = ApiControllerMixin(BaseListController);

export {
  ApiDetailsController,
  ApiCreateController,
  ApiEditController,
  ApiDeleteController
};
