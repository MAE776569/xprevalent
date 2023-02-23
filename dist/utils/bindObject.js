"use strict";
const bindObject = (object) => {
    const protoKeys = Object.getOwnPropertyNames(Object.getPrototypeOf(object));
    protoKeys.forEach((key) => {
        const value = object[key];
        if (typeof value === "function" && key !== "constructor") {
            object[key] = value.bind(object);
        }
    });
    return object;
};
module.exports = bindObject;
