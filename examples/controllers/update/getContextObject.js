const { ApiUpdateController } = require("xprevalent");
const { ValidationSchema } = require("xprevalent/validator");
const userModel = require("models/user");
const { updateUserSchema } = require("schemas/user");

class UserUpdateController extends ApiUpdateController {
  model = userModel;
  validationSchema = new ValidationSchema(updateUserSchema);

  getAdditionalData() {
    return {
      app: "xprevalent"
    };
  }

  async getContextObject() {
    const context = await super.getContextObject();
    // get any data you want to return in response
    const additionalData = this.getAdditionalData();
    return {
      ...context,
      ...additionalData
    };
  }
}

module.exports = UserUpdateController;
