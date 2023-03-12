import BaseController from "./controllers/generic/BaseController";
import BaseListController from "./controllers/list/BaseListController";
import ApiControllerMixin from "./mixins/ApiControllerMixin";
import ApiDetailsController from "./controllers/details/ApiDetailsController";
import ApiCreateController from "./controllers/create/ApiCreateController";
import ApiUpdateController from "./controllers/update/ApiUpdateController";
import ApiDeleteController from "./controllers/delete/ApiDeleteController";
import { ValidationSchema, schema } from "./validator";

export const ApiController = ApiControllerMixin(BaseController);
export const ApiListController = ApiControllerMixin(BaseListController);

export {
  ApiDetailsController,
  ApiCreateController,
  ApiUpdateController,
  ApiDeleteController,
  ValidationSchema,
  schema
};
