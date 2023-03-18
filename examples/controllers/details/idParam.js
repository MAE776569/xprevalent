const { ApiDetailsController } = require("xprevalent");
const userModel = require("models/user");

class UserDetailsController extends ApiDetailsController {
  model = userModel;
  // this will use req.params.userId to fetch the object from database
  idParam = "userId";

  idParamIsInvalid() {
    const id = this.req.params[this.idParam];
    return !Number.isInteger(parseInt(id));
  }
}

module.exports = UserDetailsController;
