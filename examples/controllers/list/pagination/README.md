# List with pagination

To list all documents with pagination set paginate to true.

```javascript
import { ApiListController } from "xprevalent";
import UserModel from "models/user";

class UsersListController extends ApiListController {
  model = UserModel;
  paginate = true;
}
```
