// schemas/users.schema.js
const { schema } = require("xprevalent/validator");

const updateUserSchema = {
  body: schema.object({
    email: schema.string().email().required()
  })
};

// controllers/users.update.controller.js
const { ValidationSchema } = require("xprevalent/validator");
const { ApiUpdateController } = require("xprevalent");
const userModel = require("models/user");

class UserUpdateController extends ApiUpdateController {
  model = userModel;
  validationSchema = new ValidationSchema(updateUserSchema);
}

module.exports = UserUpdateController;