const { ApiDeleteController } = require("xprevalent");
const userModel = require("models/user");

class UserDeleteController extends ApiDeleteController {
  model = userModel;

  getQueryResult() {
    const id = this.req.params[this.idParam];
    return this.model.findByIdAndDelete(id);
  }
}

module.exports = UserDeleteController;
