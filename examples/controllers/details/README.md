# Details Controller

Details controller is used to get a single object.
By default this object will be fetched by id and will use `req.params.id` to fetch the object from database.

```javascript
class UserDetailsController extends ApiDetailsController {
  model = userModel;
}
```

To control the parameter used to fetch object from database you can override `idParam`.

```javascript
class UserDetailsController extends ApiDetailsController {
  model = userModel;
  // this will use req.params.userId to fetch object from database
  idParam = "userId";
}
```

To controller how the id is validated you can override `validateIdParam()` and return a boolean indicating if the id is valid or not.

If the id is not valid the controller will return 404.

```javascript
class UserDetailsController extends ApiDetailsController {
  ...
  validateIdParam() {
    const id = this.req.params[this.idParam];
    return Number.isInteger(parseInt(id));
  }
}
```

To get a single object by filter, you can set `findOne` to true and override `getQueryFilter()` to return the filter used to get the object.

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
  async getQueryResult() {
    const queryFilter = this.getQueryFilter();
    const user = await this.model.findOne({
      ...queryFilter,
      isActive: { $eq: true }
    });
    return user;
  }
}
```

To return any additional data with the response you can override `getContextObject()`.

```javascript
class UserDetailsController extends ApiListController {
  ...
  async getContextObject() {
    const context = await super.getContextObject();
    // get any data you want
    const additionalData = await getAdditionalData();
    return {
      ...context,
      ...additionalData
    };
  }
}
```
