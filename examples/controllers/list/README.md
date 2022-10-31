# List Controller

To list all documents:

```javascript
class UsersListController extends ApiListController {
  model = userModel;
}
```

To list documents with pagination; set paginate to true.

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

if you want to control what data is returned in this object you can override `getPaginationMeta()`.

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
