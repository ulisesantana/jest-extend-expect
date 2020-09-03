const { expensesReport } = require("../src/expensesReport");
const fixtures = require("./fixtures");

describe("Expenses report should", () => {
  it("return total cost and expenses", () => {
    const report = expensesReport([]);

    expect(report).toHaveProperty("total");
    expect(report).toHaveProperty("expenses");
  });

  it("compute total expenses", () => {
    const { categories, expenses, sample } = fixtures.fewExpenses;
    const report = expensesReport(categories, expenses);

    expect(report.total).toBe(sample.total);
  });

  it("compute total expenses for each category", () => {
    const { categories, expenses, sample } = fixtures.fewExpenses;
    const report = expensesReport(categories, expenses);

    for (const expenseCategory in sample.expenses) {
      expect(report.expenses[expenseCategory].total).toBe(
        sample.expenses[expenseCategory].total
      );
    }
  });

  it("contain all detailed expenses by category", () => {
    const { categories, expenses, sample } = fixtures.fewExpenses;
    const report = expensesReport(categories, expenses);

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
