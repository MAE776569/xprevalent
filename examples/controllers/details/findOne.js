const { ApiDetailsController } = require("xprevalent");
const userModel = require("models/user");

class UserDetailsController extends ApiDetailsController {
  model = userModel;
  findOne = true;

  getQueryFilter() {
    return {
      name: { $regex: /Mohamed/, $options: "i" }
    };
  }
}

module.exports = UserDetailsController;
