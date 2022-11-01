const { ApiDeleteController } = require("xprevalent");
const userModel = require("models/user");

class UserDeleteController extends ApiDeleteController {
  model = userModel;

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

module.exports = UserDeleteController;
