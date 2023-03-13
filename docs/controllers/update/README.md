# Update Controller

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
    return !Number.isInteger(parseInt(id));
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
