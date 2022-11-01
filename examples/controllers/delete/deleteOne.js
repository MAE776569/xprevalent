const { ApiDeleteController } = require("xprevalent");
const userModel = require("models/user");

class UserDeleteController extends ApiDeleteController {
  model = userModel;
  deleteOne = true;

  getQueryFilter() {
    return {
      name: { $regex: /Mohamed/, $options: "i" }
    };
  }
}

module.exports = UserDeleteController;
