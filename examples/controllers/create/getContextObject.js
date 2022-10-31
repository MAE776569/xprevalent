const { ApiCreateController } = require("xprevalent");
const { ValidationSchema } = require("xprevalent/validators");
const userModel = require("models/user");
const { createUserSchema } = require("schemas/user");

class UserCreateController extends ApiCreateController {
  model = userModel;
  validationSchema = new ValidationSchema(createUserSchema);

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

module.exports = UserCreateController;
