const { ApiCreateController, ValidationSchema } = require("xprevalent");
const userModel = require("models/user");
const { createUserSchema } = require("schemas/user");

class UserCreateController extends ApiCreateController {
  model = userModel;
  validationSchema = new ValidationSchema(createUserSchema);
}

module.exports = UserCreateController;
