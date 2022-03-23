import { ApiListController } from "xprevalent";
import UserModel from "models/user";

// List controller with default pagination parameters
class ListController extends ApiListController {
  model = UserModel;
  paginate = true;
}

// Overriding default pagination parameters
class ListControllerWithParams {
  model = UserModel;
  paginate = true;

  paginateBy = {
    // use req.query.cursor to get page number
    pageParam: "cursor",
    // use req.query.offset to get the limit
    limitParam: "offset",
    // use a default limit of 30 if limit is not provided
    defaultLimit: 30
  };
}
