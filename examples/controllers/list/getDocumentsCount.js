const { ApiListController } = require("xprevalent");
const userModel = require("models/user");

class UsersListController extends ApiListController {
  model = userModel;
  paginate = true;

  async getDocumentsCount() {
    /* by default getDocumentsCount will use the result of getQueryFilter()
      to filter the counted documents */
    const count = await this.model.countDocuments({ deletedAt: { $eq: null } });
    return count;
  }
}

module.exports = UsersListController;
