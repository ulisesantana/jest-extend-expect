const { generateErrorMessageHandler } = require("./utils");

module.exports = function toHavePropertiesMatcher(received, expected, context) {
  for (const property of expected) {
    try {
      expect(received).toHaveProperty(property);
    } catch {
      return {
        message: generateErrorMessageHandler({
          context,
          matcherName: "toHaveProperties",
          comment: "Object is missing a required property",
          expectedMessage: `to have property ${property}`,
          received,
        }),
        pass: false,
      };
    }
  }
  return {
    message: generateErrorMessageHandler({
      context,
      matcherName: "toHaveProperties",
      comment: "Object has not expected property",
      expectedMessage: `to not have this properties ${expected.join()}`,
      received,
    }),
    pass: true,
  };
};
