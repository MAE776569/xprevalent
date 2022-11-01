# Create Controller

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
