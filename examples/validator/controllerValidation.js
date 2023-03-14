// schemas/users.schema.js
const { schema } = require("xprevalent");

const updateUserSchema = {
  body: schema.object({
    email: schema.string().email().required()
  })
};

// controllers/users.update.controller.js
const { ApiUpdateController, ValidationSchema } = require("xprevalent");
const userModel = require("models/user");

class UserUpdateController extends ApiUpdateController {
  model = userModel;
  validationSchema = new ValidationSchema(updateUserSchema);
}

module.exports = UserUpdateController;
