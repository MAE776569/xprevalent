const bindObject = <T>(object: T): { [K in keyof T]: T[K] } => {
  const protoKeys = Object.getOwnPropertyNames(
    Object.getPrototypeOf(object)
  ) as (keyof T)[];
  protoKeys.forEach((key) => {
    const value = object[key];
    if (typeof value === "function" && key !== "constructor") {
      object[key] = value.bind(object);
    }
  });

  return object;
};

export = bindObject;
