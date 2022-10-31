const { ValidationSchema, schema } = require("xprevalent/validator");

const updateUserSchema = {
  body: schema.object({
    email: schema.string().email().required(),
    name: schema.string().required()
  })
};

const validationSchema = new ValidationSchema(updateUserSchema);
const validationResult = validationSchema.validate({
  body: {
    email: "",
    name: "Mohamed"
  }
});

// will return true as email is invalid
console.log(validationResult.hasError());
// will return true as body[email] is invalid
console.log(validationResult.hasError({ location: "body" }));
// will return true as email is invalid
console.log(validationResult.hasError({ location: "body", name: "email" }));
// will return false as body[name] is valid
console.log(validationResult.hasError({ location: "body", name: "name" }));

// will return { body: { name: "Mohamed" } }
console.log(validationResult.getValue());
// will return { name: "Mohamed" }
console.log(validationResult.getValue({ location: "body" }));
// will return undefined as email is invalid
console.log(validationResult.getValue({ location: "body", name: "email" }));
// will return Mohamed
console.log(validationResult.getValue({ location: "body", name: "name" }));

// will return { body: { email: "Invalid email" } }
console.log(validationResult.getErrors());
// will return { email: "Invalid email" }
console.log(validationResult.getErrors({ location: "body" }));
// will return "Invalid email"
console.log(validationResult.getErrors({ location: "body", name: "email" }));
// will return undefined as name is valid
console.log(validationResult.getErrors({ location: "body", name: "name" }));
