const { ApiDeleteController } = require("xprevalent");
const userModel = require("models/user");

class UserDeleteController extends ApiDeleteController {
  model = userModel;
}

module.exports = UserDeleteController;
