const { ApiListController } = require("xprevalent");
const userModel = require("models/user");

class UsersListController extends ApiListController {
  model = userModel;
  paginate = true;

  getQueryResult() {
    const { page, limit } = this.getPaginationParams();
    return this.model.aggregate([
      {
        $skip: (page - 1) * limit
      },
      {
        $limit: limit
      }
      // ...
    ]);
  }
}

module.exports = UsersListController;
