import { ApiListController } from "xprevalent";
import UserModel from "models/user";

class ListController extends ApiListController {
  model = UserModel;
  paginate = true;
}
