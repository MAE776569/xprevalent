/// <reference types="express" />
import BaseDeleteController from "./BaseDeleteController";
declare class ApiDeleteController extends BaseDeleteController {
    protected handleRequest(): Promise<void | import("express").Response<any>>;
}
export = ApiDeleteController;
