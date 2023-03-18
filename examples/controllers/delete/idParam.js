const { ApiDeleteController } = require("xprevalent");
const userModel = require("models/user");

class UserDeleteController extends ApiDeleteController {
  model = userModel;
  // this will use req.params.userId to fetch the document from database
  idParam = "userId";

  idParamIsInvalid() {
    const id = this.req.params[this.idParam];
    return !Number.isInteger(parseInt(id));
  }
}

module.exports = UserDeleteController;
