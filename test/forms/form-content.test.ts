import { FormContent } from "../../src/forms";
import mockRequest from "../mocks/mock-request";

const req = mockRequest();
const formContent: any = new FormContent();
const initials = {
  name: "Mohamed"
};
const helperText = {
  name: "Name should be at least 3 characters"
};

describe("Should create form content", () => {
  it("Should have empty initials and empty helper text", () => {
    const { initials, helperText } = formContent.getFormData(req);
    expect(initials).toEqual({});
    expect(helperText).toEqual({});
  });

  it("Should override initials and helper text", () => {
    formContent.initials = initials;
    formContent.helperText = helperText;
    expect(formContent.initials).toEqual(initials);
    expect(formContent.helperText).toEqual(helperText);
  });
});
