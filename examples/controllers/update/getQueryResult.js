const { ApiUpdateController, ValidationSchema } = require("xprevalent");
const userModel = require("models/user");
const { updateUserSchema } = require("schemas/user");

class UserUpdateController extends ApiUpdateController {
  model = userModel;
  validationSchema = new ValidationSchema(updateUserSchema);

  getQueryResult() {
    const updateSet = this.getUpdateSet();
    const id = this.req.params[this.idParam];
    return this.model.findByIdAndUpdate(id, updateSet, {
      new: true,
      upsert: true
    });
  }
}

module.exports = UserUpdateController;
