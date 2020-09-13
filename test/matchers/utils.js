function generateErrorMessageHandler({
  context,
  matcherName,
  comment,
  expectedMessage = "",
  received = "",
}) {
  return () =>
    context.utils.matcherHint(matcherName, undefined, undefined, {
      comment,
      isNot: context.isNot,
      promise: context.promise,
    }) +
    "\n\n" +
    (expectedMessage ? `Expected: ${expectedMessage}\n` : expectedMessage) +
    (received
      ? `Received: ${context.utils.printReceived(received)}`
      : received);
}

function getAllKeysFromObject(obj) {
  return Object.keys(obj)
    .reduce(
      (acc, key) =>
        typeof obj[key] === "object" && !Array.isArray(obj[key])
          ? acc.concat(getAllKeysFromObject(obj[key]), key)
          : acc.concat(key),
      []
    )
    .flat()
    .reduce((acc, key) => (acc.includes(key) ? acc : acc.concat(key)), []);
}

module.exports = { generateErrorMessageHandler, getAllKeysFromObject };
