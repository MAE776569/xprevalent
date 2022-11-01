const { ApiListController } = require("xprevalent");
const userModel = require("models/user");

class UsersListController extends ApiListController {
  model = userModel;
  paginate = true;

  // query filter will be used in both:
  // 1. getDocumentsCount()
  // 2. getQueryResult()
  async getQueryFilter() {
    return {
      isActive: { $eq: Boolean(this.req.query.isActive) }
    };
  }
}

module.exports = UsersListController;
