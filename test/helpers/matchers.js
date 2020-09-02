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

function addCustomMatchers(expect) {
  expect.extend({
    toHaveProperties(received, ...expected) {
      for (const prop of expected) {
        try {
          expect(received).toHaveProperty(prop);
        } catch {
          return {
            message: generateErrorMessageHandler({
              context: this,
              matcherName: "toHaveProperties",
              comment: "Object is missing a required property",
              expectedMessage: `to have property ${prop}`,
              received,
            }),
            pass: false,
          };
        }
      }
      return {
        message: generateErrorMessageHandler({
          context: this,
          matcherName: "toHaveProperties",
          comment: "Object has not expected property",
          expectedMessage: `to not have this properties ${expected.join()}`,
          received,
        }),
        pass: true,
      };
    },
    toHaveTotalExpensesByCategory(received, expected) {
      for (const expenseCategory in expected.expenses) {
        try {
          expect(received.expenses[expenseCategory].total).toBe(
            expected.expenses[expenseCategory].total
          );
        } catch {
          return {
            message: generateErrorMessageHandler({
              context: this,
              matcherName: "toHaveTotalExpensesByCategory",
              comment: `Total expenses for ${expenseCategory} is not matching`,
              expectedMessage: expected.expenses[expenseCategory].total,
              received: received.expenses[expenseCategory].total,
            }),
            pass: false,
          };
        }
      }
      return {
        actual: received.expenses,
        message: generateErrorMessageHandler({
          context: this,
          matcherName: "toHaveTotalExpensesByCategory",
          comment: `Total expenses are not expected to match`,
        }),
        pass: true,
        expected: expected.expenses,
      };
    },
    toContainDetailedExpenses(received, expected) {
      try {
        for (const expenseCategory in expected.expenses) {
          expected.expenses[expenseCategory].detailedExpenses.forEach(
            (detailedExpense, index) => {
              try {
                expect(
                  received.expenses[expenseCategory].detailedExpenses[index]
                ).toStrictEqual(detailedExpense);
              } catch {
                throw new Error(
                  `category ${expenseCategory} to contain ${detailedExpense}`
                );
              }
            }
          );
        }
      } catch (err) {
        return {
          message: generateErrorMessageHandler({
            context: this,
            matcherName: "toContainDetailedExpenses",
            comment: `Detailed expense is not missing`,
            expectedMessage: err.toString(),
          }),
          pass: false,
        };
      }
      return {
        actual: received.expenses,
        message: generateErrorMessageHandler({
          context: this,
          matcherName: "toContainDetailedExpenses",
          comment: `Detailed expenses are not expected to be contained`,
        }),
        pass: true,
        expected: expected.expenses,
      };
    },
  });
  return expect;
}

module.exports = addCustomMatchers;
