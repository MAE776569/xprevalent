# xprevalent

xprevalent is a library for creating express controllers. Define a controller and use with express router. Controllers are declarative and divides request handling into many stages.

## How to Install

```javascript
npm install xprevalent
```

## Docs

1. For a detailed explanation on how to use: [/docs](https://github.com/MAE776569/xprevalent/tree/main/docs)
2. For code examples: [/examples](https://github.com/MAE776569/xprevalent/tree/main/examples)

## Table of Contents

- [Generic Controller](#generic-controller)
- [How to Use with Express Router](#how-to-use-with-express-router)
- [Validator](#validator)
  - [How to Use in Controllers](#how-to-use-in-controllers)
  - [How to Validate Data](#how-to-validate-data)
- [List Controller](#list-controller)
- [Details Controller](#details-controller)
- [Create Controller](#create-controller)
- [Update Controller](#update-controller)
- [Delete Controller](#delete-controller)

## Generic Controller

Controller is a generic class that handles the request and returns a response.

There are four types of controllers:
type | description |
----- | ---- |
list | returns list of records (optionally paginated) |
details | returns single record |
create | create a new record in database |
update | update a record in database |
delete | deletes a record from database |

All the controllers share the following params:
name | type | description |
----- | ---- | ---- |
`req` | object | express req object |
`res` | object | express response object |
`next` | function | express next function |
`model` | object |mongoose model |
`queryObjectName` | string | the name of the field in response representing the data returned from controller |
`selectedFields` | array of strings | used by mongoose model to select certain fields |
`excludedFields` | array of strings | used by mongoose model to exclude certain fields |
`sortBy` | object | used by mongoose model to sort the result |
`populatedFields` | array | used by mongoose model to populate fields |

There are some common methods that is shared by all the controllers:

| name               | input                                                                                                                                        | returns                              | description                                                                                                     |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| `getContextObject` |                                                                                                                                              | object                               | used to return any additional data with response body                                                           |
| `getQueryResult`   |                                                                                                                                              | object or array of objects           | used to fetch/change data in database and returns the query result that will be returned in the response body   |
| `sendResponse`     | type = "json" or "generic", success = boolean, status = status code, message = string, error = object, body = object represent response body | express response                     | used to return a response based on the given input                                                              |
| `handleRequest`    |                                                                                                                                              | a response or calls the next handler | used to handle the request and returns a response or either uses `next()` to pass the error to the next handler |

## How to Use with Express Router

In order to use the controller with express router, all you have to do is to pass `Controller.handle` as the request handler.

```javascript
const { ApiListController } = require("xprevalent");
const userModel = require("models/user");

class UsersListController extends ApiListController {
  model = userModel;
  paginate = true;
}

module.exports = UsersListController;
```

```javascript
const router = require("express").Router();
const UsersListController = require("controllers/users.list.controller");

router.get("/users", UsersListController.handle);

module.exports = router;
```

## Validator

The validator is used to validate all the data passed to the controller.

To use the validator you must create a validation schema using `ValidationSchema` class and pass a `schema` to it.

```javascript
const { ValidationSchema, schema } = require("xprevalent");
const userSchema = {
  body: schema.object({
    email: schema.string().email().required()
  })
};
const validationSchema = new ValidationSchema(userSchema);
```

The schema is an object that consists of three different keys. each key represent a request location:

1. params
2. query
3. body

The value of params, query and body is based on [yup](https://github.com/jquense/yup) validator library.

```javascript
const { ValidationSchema, schema } = require("xprevalent");
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

### How to Use in Controllers

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
const { schema } = require("xprevalent");

const updateUserSchema = {
  body: schema.object({
    email: schema.string().email().required()
  })
};
```

```javascript
const { ValidationSchema } = require("xprevalent");
const { updateUserSchema } = require("schemas/users.schema");

class UserUpdateController extends ApiUpdateController {
  model = userModel;
  validationSchema = new ValidationSchema(updateUserSchema);
}
```

### How to Validate Data

Validation schema validates the input using `validate()` which takes in the request object and validates it based on the different locations used in the validation schema.

The `validationSchema.validate(req)` returns an object that contains three methods:

1. `hasError`: takes in an optional object consists of `{ name, location }` and returns boolean based on whether the request has an error or not.
   the location is one of three strings `params, query, body` if the location is specified it will check if the location has any error in one of its fields. and if the name is specified, it will check if `location[name]` has an error, if none of them is specified it will check if the schema has an error in any of the three locations.
2. `getValue`: takes in an optional parameter `name` and returns the validated value of that field specified by `req[name]`. if name is not specified it will return an object consists of the three locations `{ params, query, body }`.
3. `getErrors`: takes in an optional object consists of `{ name, location }` and returns error object. the location is one of three strings `params, query, body` if the location is specified it will return the location errors. and if the name is specified, it will return `location[name]` errors, if none of them is specified it will return all the errors in all of the three locations.

```javascript
// schemas/users.schema.js
const { ValidationSchema, schema } = require("xprevalent");

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

## List Controller

Used To list all documents optionally paginated.

```javascript
class UsersListController extends ApiListController {
  model = userModel;
}
```

To list documents with pagination; set paginate to `true`.

```javascript
class UsersListController extends ApiListController {
  model = userModel;
  paginate = true;
}
```

By default the controller will get the pagination parameters from request query `page`, `limit` and if neither of them is provided will use a default `page = 1` and `limit = 25`.

To override the default parameters, you can set `paginateBy` object.

```javascript
class UsersListController extends ApiListController {
  model = userModel;
  paginate = true;

  paginateBy = {
    // use req.query.cursor to get page number
    pageParam: "cursor",
    // use req.query.offset to get the limit
    limitParam: "offset",
    // use a default limit of 30 if limit is not provided
    defaultLimit: 30
  };
}
```

By default the controller will get the document count using `getDocumentsCount()` and will use `getQueryFilter()` as the filter used to count documents. you can override `getDocumentsCount()` to control how the documents is counted.

```javascript
class UsersListController extends ApiListController {
  ...
  async getDocumentsCount() {
    const count = await this.model.countDocuments({ deletedAt: { $eq: null } });
    return count;
  }
}
```

By default the controller will return a pagination object in the response with the following structure:

```javascript
return { count, totalPages, page, limit, nextPage, previousPage };
```

To control what data is returned in this object you can override `getPaginationMeta()`.

```javascript
class UsersListController extends ApiListController {
  ...
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
```

To control the filter that is used to count documents and to fetch data from database, you can override `getQueryFilter()`.

```javascript
class UsersListController extends ApiListController {
  ...
  async getQueryFilter() {
    return {
      isActive: { $eq: Boolean(this.req.query.isActive) }
    }
  }
}
```

To control how data is fetched from database you can override `getQueryResult()`.

```javascript
class UsersListController extends ApiListController {
  ...
  getQueryResult() {
    const { page, limit } = this.getPaginationParams();
    return this.model.aggregate([
      {
        $skip: (page - 1) * limit
      },
      {
        $limit: limit
      }
      ...
    ]);
  }
}
```

To return any additional data with the response you can override `getContextObject()`.

```javascript
class UsersListController extends ApiListController {
  ...
  async getContextObject() {
    const context = await super.getContextObject();
    // get any data you want to return in response
    const additionalData = this.getAdditionalData();
    return {
      ...context,
      ...additionalData
    };
  }
}
```

## Details Controller

Details controller is used to get a single object.
By default this object will be fetched by id and will use `req.params.id` to fetch the object from database.

```javascript
class UserDetailsController extends ApiDetailsController {
  model = userModel;
}
```

To control the parameter used to fetch the document from database you can override `idParam`.

```javascript
class UserDetailsController extends ApiDetailsController {
  model = userModel;
  // this will use req.params.userId to fetch the document from database
  idParam = "userId";
}
```

To controller how the id is validated you can override `idParamIsInvalid()` and return a boolean indicating if the id is valid or not.

If the id is not valid the controller will return `404`.

```javascript
class UserDetailsController extends ApiDetailsController {
  ...
  idParamIsInvalid() {
    const id = this.req.params[this.idParam];
    return Number.isInteger(parseInt(id));
  }
}
```

To get a single document using query filter, you can set `findOne` to true and override `getQueryFilter()` to return the filter used to get the document.

```javascript
class UserDetailsController extends ApiDetailsController {
  model = userModel;
  findOne = true;

  getQueryFilter() {
    return {
      name: { $regex: /Mohamed/, $options: "i" }
    };
  }
}
```

To control how data is fetched from database you can override `getQueryResult()`.

```javascript
class UserDetailsController extends ApiDetailsController {
  ...
  getQueryResult() {
    const id = this.req.params[this.idParam];
    return this.model.findById(id);
  }
}
```

To return any additional data with the response you can override `getContextObject()`.

```javascript
class UserDetailsController extends ApiDetailsController {
  ...
  async getContextObject() {
    const context = await super.getContextObject();
    // get any data you want to return in response
    const additionalData = this.getAdditionalData();
    return {
      ...context,
      ...additionalData
    };
  }
}
```

## Create Controller

Create controller is used to insert document(s) into database.

The controller will first validate the request before inserting new documents using validation schema.

```javascript
class UserCreateController extends ApiCreateController {
  model = userModel;
  validationSchema = new ValidationSchema(createUserSchema);
}
```

By default the inserted document will be the result of the validation returned from validating the request body.

If the data is not valid `422` status code will be returned with error object in the response.

To customize the inserted document or control the values of the document fields, you can override `getDocument()`.

```javascript
class UserCreateController extends ApiCreateController {
  ...
  getDocument() {
    const user = this.validationResult.getValue("body");
    return {
      ...user,
      role: "default"
    };
  }
}
```

To control how data is inserted into database you can override `getQueryResult()`.

```javascript
class UserCreateController extends ApiCreateController {
  ...
  getQueryResult() {
    const document = this.getDocument();
    return this.model.create(document);
  }
}
```

By default the created document will be returned in the response.

To return any additional data with the response you can override `getContextObject()`.

```javascript
class UserCreateController extends ApiCreateController {
  ...
  async getContextObject() {
    const context = await super.getContextObject();
    // get any data you want to return in response
    const additionalData = this.getAdditionalData();
    return {
      ...context,
      ...additionalData
    };
  }
}
```

## Update Controller

Update controller is used to update document(s) into database.

The controller will first validate the request before updating documents using validation schema.

```javascript
class UserUpdateController extends ApiUpdateController {
  model = userModel;
  validationSchema = new ValidationSchema(updateUserSchema);
}
```

To control the parameter used to fetch the document from database you can override `idParam`.

```javascript
class UserUpdateController extends ApiUpdateController {
  model = userModel;
  validationSchema = new ValidationSchema(updateUserSchema);
  // this will use req.params.userId to fetch the document from database
  idParam = "userId";
}
```

To controller how the id is validated you can override `idParamIsInvalid()` and return a boolean indicating if the id is valid or not.

If the id is not valid the controller will return `404`.

```javascript
class UserUpdateController extends ApiUpdateController {
  ...
  idParamIsInvalid() {
    const id = this.req.params[this.idParam];
    return Number.isInteger(parseInt(id));
  }
}
```

By default the updated document will be the result of the validation returned from validating the request body.

The controller only updates the values contained in the request body.

If the data is not valid `422` status code will be returned with error object in the response.

To customize the updated document or control the fields to be updated, you can override `getUpdateSet()`.

```javascript
class UserUpdateController extends ApiUpdateController {
  ...
  getUpdateSet() {
    const updateSet = this.validationResult.getValue("body");
    return {
      ...updateSet,
      role: "default"
    };
  }
}
```

To update a single document using query filter, you can set `updateOne` to true and override `getQueryFilter()` to return the filter used to get the document to be updated.

```javascript
class UserUpdateController extends ApiUpdateController {
  model = userModel;
  validationSchema = new ValidationSchema(updateUserSchema);
  updateOne = true;

  getQueryFilter() {
    return {
      name: { $regex: /Mohamed/, $options: "i" }
    };
  }
}
```

By setting `upsert` to `true` if the document is not found in database, it will be created.

```javascript
class UserUpdateController extends ApiUpdateController {
  model = userModel;
  validationSchema = new ValidationSchema(updateUserSchema);
  upsert = true;
}
```

To control how data is updated you can override `getQueryResult()`.

```javascript
class UserUpdateController extends ApiUpdateController {
  ...
  getQueryResult() {
    const updateSet = this.getUpdateSet();
    const id = this.req.params[this.idParam];
    return this.model.findByIdAndUpdate(id, updateSet, { new: true, upsert: true });
  }
}
```

By default the newly updated document will be returned in the response.

To return any additional data with the response you can override `getContextObject()`.

```javascript
class UserUpdateController extends ApiUpdateController {
  ...
  async getContextObject() {
    const context = await super.getContextObject();
    // get any data you want to return in response
    const additionalData = this.getAdditionalData();
    return {
      ...context,
      ...additionalData
    };
  }
}
```

## Delete Controller

Delete controller is used to delete document(s) from database.

To control the parameter used to fetch the document from database you can override `idParam`.

```javascript
class UserDeleteController extends ApiDeleteController {
  model = userModel;
  // this will use req.params.userId to fetch the document from database
  idParam = "userId";
}
```

To controller how the id is validated you can override `idParamIsInvalid()` and return a boolean indicating if the id is valid or not.

If the id is not valid the controller will return `404`.

```javascript
class UserDeleteController extends ApiDeleteController {
  ...
  idParamIsInvalid() {
    const id = this.req.params[this.idParam];
    return Number.isInteger(parseInt(id));
  }
}
```

To delete a single document using query filter, you can set `deleteOne` to `true` and override `getQueryFilter()` to return the filter used to get the document to be deleted.

```javascript
class UserDeleteController extends ApiDeleteController {
  model = userModel;
  deleteOne = true;

  getQueryFilter() {
    return {
      name: { $regex: /Mohamed/, $options: "i" }
    };
  }
}
```

To control how the document is deleted you can override `getQueryResult()`.

```javascript
class UserDeleteController extends ApiDeleteController {
  ...
  getQueryResult() {
     const id = this.req.params[this.idParam];
    return this.model.findByIdAndDelete(id);
  }
}
```

By default the deleted document will be returned in the response.

To return any additional data with the response you can override `getContextObject()`.

```javascript
class UserDeleteController extends ApiDeleteController {
  ...
  async getContextObject() {
    const context = await super.getContextObject();
    // get any data you want to return in response
    const additionalData = this.getAdditionalData();
    return {
      ...context,
      ...additionalData
    };
  }
}
```
