"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Generic controller that returns a response
 *
 * @class BaseController
 */
class BaseController {
    /**
     * Creates an instance of BaseController
     * @param {Request} req - The request object
     * @param {Response} res - The response object
     * @param {NextFunction} next - next function
     * @memberof BaseController
     */
    constructor(req, res, next) {
        /**
         * The name of the object returned by querying database
         *
         * @protected
         * @type {string}
         * @memberof BaseController
         */
        this.queryObjectName = "data";
        this.req = req;
        this.res = res;
        this.next = next;
    }
    /**
     * The controller handler for handling the request
     *
     * @readonly
     * @static
     * @type {Handler[]}
     * @memberof BaseController
     */
    static get handle() {
        return [
            (req, res, next) => new this(req, res, next).handleRequest()
        ];
    }
    /**
     * Returns the query filter object used for filtering database
     *
     * @protected
     * @returns {FillableObject} the object used to filter database query
     * @memberof BaseController
     */
    getQueryFilter() {
        return {};
    }
    /**
     * Returns a promise of an object that contains the local variables of the response
     *
     * @protected
     * @returns {Promise<FillableObject>} a promise of an object
     * @memberof BaseController
     */
    getContextObject() {
        return Promise.resolve({});
    }
    /**
     * Returns a promise of the result of querying the database
     *
     * @protected
     * @returns {(Promise<Document[] | Document | null>)} a promise of set of documents, document, or null
     * @memberof BaseController
     */
    getQueryResult() {
        return Promise.resolve([]);
    }
    sendResponse({ type = "json", success = true, status = 200, message, error = null, body = {} }) {
        const response = Object.assign({ success: !error && success, message,
            error }, body);
        this.res.status(status);
        if (type === "json") {
            return this.res.json(response);
        }
        else {
            return this.res.send(response);
        }
    }
    /**
     * Handles the request and returns a response
     *
     * @protected
     * @returns {(Promise<Response | void>)} a promise of a response or calls the next error handler
     * @memberof BaseController
     */
    handleRequest() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contextObject = yield this.getContextObject();
                const resObject = Object.assign({}, contextObject);
                const queryResult = yield this.getQueryResult();
                resObject[this.queryObjectName] = queryResult;
                return this.sendResponse({ type: "generic", body: resObject });
            }
            catch (err) {
                return this.next(err);
            }
        });
    }
}
module.exports = BaseController;
