const { ApiUpdateController, ValidationSchema } = require("xprevalent");
const userModel = require("models/user");
const { updateUserSchema } = require("schemas/user");

class UserUpdateController extends ApiUpdateController {
  model = userModel;
  validationSchema = new ValidationSchema(updateUserSchema);
}

module.exports = UserUpdateController;
