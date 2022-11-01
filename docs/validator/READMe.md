# Validator

The validator is used to validate all the data passed to the controller.

To use the validator you must create a validation schema using `ValidationSchema` class and pass a `schema` to it.

```javascript
const { ValidationSchema } = require("xprevalent/validator");
const validationSchema = new ValidationSchema(schema);
```

The schema is an object that consists of three different keys. each key represent a request location:

1. params
2. query
3. body

The value of params, query and body is based on [yup](https://github.com/jquense/yup) validator library.

```javascript
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
```

## How to use in controllers

In order to use validator in controllers, all you have to do is to set validation schema. and the controller will handle the validation automatically.

```javascript
class UserUpdateController extends ApiUpdateController {
  model = userModel;
  validationSchema = new ValidationSchema({
    body: schema.object({
      email: schema.string().email().required()
    })
  });
}
```

It is better to create schemas into its own separate files and export it into controller.

```javascript
// schemas/users.schema.js
const { schema } = require("xprevalent/validator");

const updateUserSchema = {
  body: schema.object({
    email: schema.string().email().required()
  })
};
```

```javascript
const { ValidationSchema } = require("xprevalent/validator");
const { updateUserSchema } = require("schema/users.schema");

class UserUpdateController extends ApiUpdateController {
  model = userModel;
  validationSchema = new ValidationSchema(updateUserSchema);
}
```

## How to validate data

Validation schema validates the input using `validate()` which takes in the request object and validates it based on the different locations used in the validation schema.

The `validationSchema.validate(req)` returns an object that contains three methods:

1. `hasError`: takes in an optional object consists of `{ name, location }` and returns boolean based on whether the request has an error or not.
   the location is one of three strings `params, query, body` if the location is specified it will check if the location has any error in one of its fields. and if the name is specified, it will check if `location[name]` has an error, if none of them is specified it will check if the schema has an error in any of the three locations.
2. `getValue`: takes in an optional parameter `name` and returns the validated value of that field specified by `req[name]`. if name is not specified it will return an object consists of the three locations `{ params, query, body }`.
3. `getErrors`: takes in an optional object consists of `{ name, location }` and returns error object. the location is one of three strings `params, query, body` if the location is specified it will return the location errors. and if the name is specified, it will return `location[name]` errors, if none of them is specified it will return all the errors in all of the three locations.

```javascript
// schemas/users.schema.js
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

// will return {} as body is invalid
console.log(validationResult.getValue());
// will return undefined as body is invalid
console.log(validationResult.getValue("body"));

// will return { body: { email: "email is a required field" } }
console.log(validationResult.getErrors());
// will return { email: "email is a required field" }
console.log(validationResult.getErrors({ location: "body" }));
// will return "email is a required field"
console.log(validationResult.getErrors({ location: "body", name: "email" }));
// will return undefined as name is valid
console.log(validationResult.getErrors({ location: "body", name: "name" }));
```
