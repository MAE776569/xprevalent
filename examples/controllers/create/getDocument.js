const { ApiCreateController } = require("xprevalent");
const { ValidationSchema } = require("xprevalent/validator");
const userModel = require("models/user");
const { createUserSchema } = require("schemas/user");

class UserCreateController extends ApiCreateController {
  model = userModel;
  validationSchema = new ValidationSchema(createUserSchema);

  getDocument() {
    const user = this.validationResult.getValue("body");
    return {
      ...user,
      role: "default"
    };
  }
}

module.exports = UserCreateController;
