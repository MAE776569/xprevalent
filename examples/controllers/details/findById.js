const { ApiDetailsController } = require("xprevalent");
const userModel = require("models/user");

class UserDetailsController extends ApiDetailsController {
  model = userModel;
}

module.exports = UserDetailsController;
