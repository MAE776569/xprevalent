import convertToString from "../../src/utils/convertToString";

describe("Should test converting objects to string", () => {
  it("Should convert array to string", () => {
    expect(convertToString([1])).toBe("1");
  });

  it("Should convert date to string", () => {
    const date = new Date();
    expect(convertToString(date)).toBe(date.toISOString());
  });

  it("Should convert object to string", () => {
    const object = { convertToString: true };
    expect(convertToString(object)).toBe(JSON.stringify(object));
  });

  it("Should convert null to string", () => {
    expect(convertToString(null)).toBe("");
  });

  it("Should convert NaN to string", () => {
    expect(convertToString(NaN)).toBe("");
  });

  it("Should convert functions to strings", () => {
    const genericFunction = () => {};
    expect(convertToString(genericFunction)).toBe(genericFunction.toString());
  });

  it("Should convert objects with generic toString to string", () => {
    function genericFunction() {}
    genericFunction.toString = "Functions are objects";
    expect(convertToString(genericFunction)).toBe(
      Object.getPrototypeOf(genericFunction).toString.call(genericFunction)
    );
  });

  it("Should convert undefined to string", () => {
    expect(convertToString(undefined)).toBe("");
  });
});
