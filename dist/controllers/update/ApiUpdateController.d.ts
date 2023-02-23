/// <reference types="express" />
import BaseUpdateController from "./BaseUpdateController";
declare class ApiUpdateController extends BaseUpdateController {
    protected handleRequest(): Promise<void | import("express").Response<any>>;
}
export = ApiUpdateController;
