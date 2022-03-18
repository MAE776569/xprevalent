# List all

To list all documents just set model variable.

```javascript
import { ApiListController } from "xprevalent";
import UserModel from "models/user";

class ListController extends ApiListController {
  model = UserModel;
}
```
