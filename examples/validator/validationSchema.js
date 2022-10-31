const { ValidationSchema, schema } = require("xprevalent/validator");

const userSchema = {
  params: schema.object({
    id: schema.number().integer().positive().required()
  }),
  query: schema.object({
    name: schema.string().required()
  }),
  body: schema.object({
    email: schema.string().email().required()
  })
};

const validationSchema = new ValidationSchema(userSchema);

module.exports = validationSchema;
