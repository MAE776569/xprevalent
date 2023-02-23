/// <reference types="express" />
import BaseDetailsController from "./BaseDetailsController";
declare class ApiDetailsController extends BaseDetailsController {
    protected handleRequest(): Promise<void | import("express").Response<any>>;
}
export = ApiDetailsController;
