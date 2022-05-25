import { Handler, NextFunction, Request, Response } from "express";

// eslint-disable-next-line no-unused-vars
function AuthenticationRequired(isAuthenticated: (req: Request) => boolean) {
  return function (OriginalClass) {
    const originalHandler = OriginalClass.handle;
    return class ProtectedClass extends OriginalClass {
      static get handle(): Handler[] {
        return [
          (req: Request, res: Response, next: NextFunction) => {
            if (isAuthenticated(req)) return next();
            else return res.status(401).json({ message: "Unauthorized" });
          },
          ...originalHandler
        ];
      }
    };
  };
}

export = AuthenticationRequired;
