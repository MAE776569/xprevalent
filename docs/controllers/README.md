# Controller

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
| `getContextObject` |                                                                                                                                              | an object                            | used to return any additional data with response body                                                           |
| `getQueryResult`   |                                                                                                                                              | object or array of objects           | used to fetch/change data in database and returns the query result that will be returned in the response body   |
| `sendResponse`     | type = "json" or "generic", success = boolean, status = status code, message = string, error = object, body = object represent response body | an express response                  | a response based on the given input                                                                             |
| `handleRequest`    |                                                                                                                                              | a response or calls the next handler | used to handle the request and returns a response or either uses `next()` to pass the error to the next handler |

## How to use with express router

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
