const toHavePropertiesMatcher = require("./toHaveProperties");
const toHavePropertyAndMatchValueMatcher = require("./toHavePropertyAndMatchValue");

module.exports = function addCustomMatchers(expect) {
  expect.extend({
    toHaveProperties(received, ...expected) {
      return toHavePropertiesMatcher(received, expected, this);
    },
    toHavePropertyAndMatchValue(received, property, expected) {
      return toHavePropertyAndMatchValueMatcher(
        received,
        property,
        expected,
        this
      );
    },
  });
  return expect;
};
