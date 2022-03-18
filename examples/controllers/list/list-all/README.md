# List All

A controller returning a list of objects.

---
To list all documents just set model variable.

```javascript
import { ApiListController } from "xprevalent";
import UserModel from "models/user";

class UsersListController extends ApiListController {
  model = UserModel;
}
```
