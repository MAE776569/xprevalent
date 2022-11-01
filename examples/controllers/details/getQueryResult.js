const { ApiDetailsController } = require("xprevalent");
const userModel = require("models/user");

class UserDetailsController extends ApiDetailsController {
  model = userModel;

  getQueryResult() {
    const id = this.req.params[this.idParam];
    return this.model.findById(id);
  }
}

module.exports = UserDetailsController;
