const { ApiCreateController } = require("xprevalent");
const { ValidationSchema } = require("xprevalent/validator");
const userModel = require("models/user");
const { createUserSchema } = require("schemas/user");

class UserCreateController extends ApiCreateController {
  model = userModel;
  validationSchema = new ValidationSchema(createUserSchema);
}

module.exports = UserCreateController;
