import { ApiListController } from "xprevalent";
import UserModel from "models/user";

class UsersListController extends ApiListController {
  model = UserModel;
}
