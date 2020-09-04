const { generateErrorMessageHandler } = require("./utils");

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
      throw new Error(`category ${property} to contain ${expectedValue}`);
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
      `${property}.${childProperty} to be ${expected[property][childProperty]}`
    );
  }
}

module.exports = function toHavePropertyAsFirstChildAndMatchValueMatcher(
  received,
  childProperty,
  expected,
  context
) {
  try {
    for (const property in expected) {
      if (!(property in received)) {
        throw new Error(`missing property ${property}`);
      }

      if (!(childProperty in received[property])) {
        throw new Error(`missing childProperty ${childProperty} for property ${property}`);
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
      message: generateErrorMessageHandler({
        context,
        matcherName: "toHavePropertyAsFirstChildAndMatchValue",
        comment: `Value for property is not matching`,
        expectedMessage: err.toString(),
      }),
      pass: false,
    };
  }

  return {
    actual: received,
    message: generateErrorMessageHandler({
      context,
      matcherName: "toHavePropertyAsFirstChildAndMatchValue",
      comment: `Value not expected to match`,
    }),
    pass: true,
    expected: expected,
  };
};
