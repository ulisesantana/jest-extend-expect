const { ExpensesReporter } = require("../src/ExpensesReporter");
const fixtures = require("./fixtures");

describe("Expenses report should", () => {
  it("return total cost and expenses", () => {
    const report = new ExpensesReporter([]).exec();

    expect(report).toHaveProperty("total");
    expect(report).toHaveProperty("expenses");
  });

  it("compute total expenses", () => {
    const { categories, expenses, sample } = fixtures.fewExpenses;
    const report = new ExpensesReporter(categories, expenses).exec();

    expect(report.total).toBe(sample.total);
  });

  it("compute total expenses for each category", () => {
    const { categories, expenses, sample } = fixtures.fewExpenses;
    const report = new ExpensesReporter(categories, expenses).exec();

    for (const expenseCategory in sample.expenses) {
      expect(report.expenses[expenseCategory].total).toBe(
        sample.expenses[expenseCategory].total
      );
    }
  });

  it("contain all detailed expenses by category", () => {
    const { categories, expenses, sample } = fixtures.fewExpenses;
    const report = new ExpensesReporter(categories, expenses).exec();

    for (const expenseCategory in sample.expenses) {
      sample.expenses[expenseCategory].detailedExpenses.forEach(
        (detailedExpense, index) => {
          expect(
            report.expenses[expenseCategory].detailedExpenses[index]
          ).toStrictEqual(detailedExpense);
        }
      );
    }
  });
});
