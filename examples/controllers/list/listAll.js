const { ApiListController } = require("xprevalent");
const userModel = require("models/user");

class UsersListController extends ApiListController {
  model = userModel;
}

module.exports = UsersListController;
