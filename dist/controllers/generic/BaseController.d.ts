import { Request, Response, NextFunction, Handler } from "express";
import { Model, Document } from "mongoose";
import { FillableObject, SendResponseInput, SortObject } from "../../types/controllers/generic";
import ValidationSchema from "../../validator/ValidationSchema";
/**
 * Generic controller that returns a response
 *
 * @class BaseController
 */
declare class BaseController {
    /**
     * Request object
     *
     * @protected
     * @type {Request}
     * @memberof BaseController
     */
    protected readonly req: Request;
    /**
     * Response object
     *
     * @protected
     * @type {Response}
     * @memberof BaseController
     */
    protected readonly res: Response;
    /**
     * Next function which, when invoked, executes the middleware succeeding the current middleware
     *
     * @protected
     * @type {NextFunction}
     * @memberof BaseController
     */
    protected readonly next: NextFunction;
    /**
     * Mongoose model
     *
     * @protected
     * @type {Model<Document>}
     * @memberof BaseController
     */
    protected readonly model?: Model<Document>;
    /**
     * The name of the object returned by querying database
     *
     * @protected
     * @type {string}
     * @memberof BaseController
     */
    protected queryObjectName: string;
    /**
     * Specifies which document fields to include
     *
     * @protected
     * @type {string[]}
     * @memberof BaseController
     */
    protected selectedFields?: string[];
    /**
     * Specifies which document fields to exclude
     *
     * @protected
     * @type {string[]}
     * @memberof BaseController
     */
    protected excludedFields?: string[];
    /**
     * Sets the sort order of documents
     *
     * @protected
     * @type {SortObject}
     * @memberof BaseController
     */
    protected sortBy?: SortObject;
    /**
     * Populates document references
     *
     * @protected
     * @type {string[]}
     * @memberof BaseController
     */
    protected populatedFields?: string[];
    /**
     * Validation schema
     *
     * @protected
     * @type {ValidationSchema}
     * @memberof BaseController
     */
    protected validationSchema?: ValidationSchema;
    /**
     * The controller handler for handling the request
     *
     * @readonly
     * @static
     * @type {Handler[]}
     * @memberof BaseController
     */
    static get handle(): Handler[];
    /**
     * Creates an instance of BaseController
     * @param {Request} req - The request object
     * @param {Response} res - The response object
     * @param {NextFunction} next - next function
     * @memberof BaseController
     */
    constructor(req: Request, res: Response, next: NextFunction);
    /**
     * Returns the query filter object used for filtering database
     *
     * @protected
     * @returns {FillableObject} the object used to filter database query
     * @memberof BaseController
     */
    protected getQueryFilter?(): FillableObject;
    /**
     * Returns a promise of an object that contains the local variables of the response
     *
     * @protected
     * @returns {Promise<FillableObject>} a promise of an object
     * @memberof BaseController
     */
    protected getContextObject(): Promise<FillableObject>;
    /**
     * Returns a promise of the result of querying the database
     *
     * @protected
     * @returns {(Promise<Document[] | Document | null>)} a promise of set of documents, document, or null
     * @memberof BaseController
     */
    protected getQueryResult(): Promise<Document[] | Document | null>;
    protected sendResponse({ type, success, status, message, error, body }: SendResponseInput): Response<any>;
    /**
     * Handles the request and returns a response
     *
     * @protected
     * @returns {(Promise<Response | void>)} a promise of a response or calls the next error handler
     * @memberof BaseController
     */
    protected handleRequest(): Promise<Response | void>;
}
export = BaseController;
