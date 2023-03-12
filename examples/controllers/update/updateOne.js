const { ApiUpdateController, ValidationSchema } = require("xprevalent");
const userModel = require("models/user");
const { updateUserSchema } = require("schemas/user");

class UserUpdateController extends ApiUpdateController {
  model = userModel;
  validationSchema = new ValidationSchema(updateUserSchema);
  updateOne = true;

  getQueryFilter() {
    return {
      name: { $regex: /Mohamed/, $options: "i" }
    };
  }
}

module.exports = UserUpdateController;
