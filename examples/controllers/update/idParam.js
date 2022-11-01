const { ApiUpdateController } = require("xprevalent");
const { ValidationSchema } = require("xprevalent/validator");
const userModel = require("models/user");
const { updateUserSchema } = require("schemas/user");

class UserUpdateController extends ApiUpdateController {
  model = userModel;
  validationSchema = new ValidationSchema(updateUserSchema);
  // this will use req.params.userId to fetch the document from database
  idParam = "userId";

  validateIdParam() {
    const id = this.req.params[this.idParam];
    return Number.isInteger(parseInt(id));
  }
}

module.exports = UserUpdateController;
