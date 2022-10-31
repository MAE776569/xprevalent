const { ApiUpdateController } = require("xprevalent");
const { ValidationSchema } = require("xprevalent/validator");
const userModel = require("models/user");
const { updateUserSchema } = require("schemas/user");

class UserUpdateController extends ApiUpdateController {
  model = userModel;
  validationSchema = new ValidationSchema(updateUserSchema);

  getUpdateSet() {
    const updateSet = this.validationResult.getValue("body");
    return {
      ...updateSet,
      role: "default"
    };
  }
}

module.exports = UserUpdateController;
