import { ApiListController } from "xprevalent";
import userModel from "models/user";

class UsersListController extends ApiListController {
  model = userModel;
}
