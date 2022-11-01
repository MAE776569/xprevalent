const { ApiDetailsController } = require("xprevalent");
const userModel = require("models/user");

class UserDetailsController extends ApiDetailsController {
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

module.exports = UserDetailsController;
