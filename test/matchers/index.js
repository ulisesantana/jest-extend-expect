const toHavePropertiesMatcher = require("./toHaveProperties");
const toHavePropertyAsFirstChildAndMatchValueMatcher = require("./toHavePropertyAsFirstChildAndMatchValue");

module.exports = function addCustomMatchers(expect) {
  expect.extend({
    toHaveProperties(received, ...expected) {
      return toHavePropertiesMatcher(received, expected, this);
    },
    toHavePropertyAsFirstChildAndMatchValue(received, property, expected) {
      return toHavePropertyAsFirstChildAndMatchValueMatcher(
        received,
        property,
        expected,
        this
      );
    },
  });
  return expect;
};
