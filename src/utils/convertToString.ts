function convertToString(value: any, deep = true): string {
  if (Array.isArray(value) && value.length && deep) {
    return convertToString(value[0], false);
  } else if (value instanceof Date) {
    return value.toISOString();
  } else if (value && typeof value === "object" && value !== null) {
    return JSON.stringify(value);
  } else if (value && value.toString) {
    if (typeof value.toString !== "function") {
      return Object.getPrototypeOf(value).toString.call(value);
    }
    return value.toString();
  } else if (value == null || (isNaN(value) && !value.length)) {
    return "";
  }

  return String(value);
}

export = convertToString;
