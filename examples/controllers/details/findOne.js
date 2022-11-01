const { ApiDetailsController } = require("xprevalent");
const userModel = require("models/user");

class UserDetailsController extends ApiDetailsController {
  model = userModel;
  findOne = true;

  // query filter will be used only when finding one document
  getQueryFilter() {
    return {
      name: { $regex: /Mohamed/, $options: "i" }
    };
  }
}

module.exports = UserDetailsController;
