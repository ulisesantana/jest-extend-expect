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

module.exports = { generateErrorMessageHandler };
