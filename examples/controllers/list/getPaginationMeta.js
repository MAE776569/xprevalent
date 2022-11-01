const { ApiListController } = require("xprevalent");
const userModel = require("models/user");

class UsersListController extends ApiListController {
  model = userModel;
  paginate = true;

  async getPaginationMeta() {
    const count = await this.getDocumentsCount();
    const { page, limit } = this.getPaginationParams();
    const lastPage = Math.ceil(count / limit);
    // need to set this.totalPages as it will be used in getQueryResult
    this.totalPages = lastPage > 0 ? lastPage : 1;

    const meta = {
      count,
      totalPages: lastPage,
      page: page < lastPage ? page : this.totalPages,
      limit,
      nextPage: page < lastPage ? page + 1 : null,
      previousPage:
        page > 1 ? (page < lastPage ? page - 1 : lastPage - 1) : null
    };

    return meta;
  }
}

module.exports = UsersListController;
