# Delete Controller

Delete controller is used to delete document(s) from database.

To control the parameter used to fetch the document from database you can override `idParam`.

```javascript
class UserDeleteController extends ApiDeleteController {
  model = userModel;
  // this will use req.params.userId to fetch the document from database
  idParam = "userId";
}
```

To controller how the id is validated you can override `validateIdParam()` and return a boolean indicating if the id is valid or not.

If the id is not valid the controller will return `404`.

```javascript
class UserDeleteController extends ApiDeleteController {
  ...
  validateIdParam() {
    const id = this.req.params[this.idParam];
    return Number.isInteger(parseInt(id));
  }
}
```

To delete a single document using query filter, you can set `deleteOne` to true and override `getQueryFilter()` to return the filter used to get the document to be deleted.

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
