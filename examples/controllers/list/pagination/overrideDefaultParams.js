import { ApiListController } from "xprevalent";
import userModel from "models/user";

class UsersListController extends ApiListController {
  model = userModel;
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
