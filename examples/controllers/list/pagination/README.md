# List with pagination

To list documents with pagination set paginate to true.

```javascript
import { ApiListController } from "xprevalent";
import userModel from "models/user";

class UsersListController extends ApiListController {
  model = userModel;
  paginate = true;
}
```

By default the controller will get the pagination parameters from request query `page`, `limit` and if neither of them is provided will use a default `page = 1` and `limit = 25`.

To override the default parameters, you can set `paginateBy` object.

```javascript
class UsersListController extends ApiListController {
  ...
  paginateBy = {
    // use req.query.cursor to get page number
    pageParam: "cursor",
    // use req.query.offset to get the limit
    limitParam: "offset",
    // use a default limit of 30 if limit is not provided
    defaultLimit: 30
  }
}
```
