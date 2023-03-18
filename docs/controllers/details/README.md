# Details Controller

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
    return !Number.isInteger(parseInt(id));
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
