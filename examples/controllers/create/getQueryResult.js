const { ApiCreateController } = require("xprevalent");
const { ValidationSchema } = require("xprevalent/validator");
const userModel = require("models/user");
const { createUserSchema } = require("schemas/user");

class UserCreateController extends ApiCreateController {
  model = userModel;
  validationSchema = new ValidationSchema(createUserSchema);

  getQueryResult() {
    const document = this.getDocument();
    return this.model.create(document);
  }
}

module.exports = UserCreateController;
