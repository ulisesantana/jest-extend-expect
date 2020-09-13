const {
  generateErrorMessageHandler,
  getAllKeysFromObject,
} = require("./utils");

module.exports = function toHavePropertiesMatcher(received, expected, context) {
  const allProperties = getAllKeysFromObject(received);
  for (const property of expected) {
    if (!allProperties.includes(property)) {
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
