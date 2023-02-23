declare const bindObject: <T>(object: T) => { [K in keyof T]: T[K]; };
export = bindObject;
