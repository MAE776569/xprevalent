/// <reference types="express" />
import BaseCreateController from "./BaseCreateController";
declare class ApiCreateController extends BaseCreateController {
    protected handleRequest(): Promise<void | import("express").Response<any>>;
}
export = ApiCreateController;
