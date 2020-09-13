const {
  generateErrorMessageHandler,
  getAllKeysFromObject,
} = require("./utils");

function checkArrayContainExpectedValueForFirsChildProperty(
  received,
  expected,
  property,
  childProperty
) {
  expected[property][childProperty].forEach((expectedValue, index) => {
    try {
      expect(received[property][childProperty][index]).toStrictEqual(
        expectedValue
      );
    } catch {
      throw new Error(
        `${property}.${childProperty} to contain ${
          typeof expectedValue === "object"
            ? JSON.stringify(expectedValue, null, 2)
            : expectedValue
        }`
      );
    }
  });
}

function checkExpectedValueForFirsChildProperty(
  received,
  expected,
  property,
  childProperty
) {
  try {
    expect(received[property][childProperty]).toBe(
      expected[property][childProperty]
    );
  } catch {
    throw new Error(
      `${property}.${childProperty} to be ${expected[property][childProperty]}, but ${received[property][childProperty]} received.`
    );
  }
}

module.exports = function toHavePropertyAndMatchValueMatcher(
  received,
  childProperty,
  expected,
  context
) {
  try {
    const expectedProperties = getAllKeysFromObject(expected);
    if (!expectedProperties.includes(childProperty)) {
      throw new Error(`missing property ${childProperty}`);
    }

    for (const property in expected) {
      if (
        typeof expected[property] === "object" &&
        !(childProperty in expected[property])
      ) {
        return toHavePropertyAndMatchValueMatcher(
          received[property],
          childProperty,
          expected[property],
          context
        );
      }

      if (Array.isArray(expected[property][childProperty])) {
        checkArrayContainExpectedValueForFirsChildProperty(
          received,
          expected,
          property,
          childProperty
        );
      } else {
        checkExpectedValueForFirsChildProperty(
          received,
          expected,
          property,
          childProperty
        );
      }
    }
  } catch (err) {
    return {
      actual: received,
      expected,
      message: generateErrorMessageHandler({
        context,
        matcherName: "toHavePropertyAndMatchValue",
        comment: `Value for property is not matching`,
        expectedMessage: err.toString().replace("Error: ", ""),
      }),
      pass: false,
    };
  }

  return {
    actual: received,
    expected,
    message: generateErrorMessageHandler({
      context,
      matcherName: "toHavePropertyAndMatchValue",
      comment: `Value not expected to match is present and match with expected value`,
    }),
    pass: true,
  };
};
