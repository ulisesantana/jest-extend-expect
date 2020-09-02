const { costReport } = require("../src/costReport");
const fixtures = require("./fixtures");

describe("Cost report should", () => {
  it("return total cost and expenses", () => {
    const report = costReport([]);

    expect(report).toHaveProperty("total");
    expect(report).toHaveProperty("expenses");
  });

  it("compute total cost based in all expenses", () => {
    const { categories, expenses, sample } = fixtures.fewExpenses;
    const report = costReport(categories, expenses);

    expect(report.total).toBe(sample.total);
  });

  it("compute total cost for each category", () => {
    const { categories, expenses, sample } = fixtures.fewExpenses;
    const report = costReport(categories, expenses);

    for (const expenseCategory in sample.expenses) {
      expect(report.expenses[expenseCategory].total).toBe(
        sample.expenses[expenseCategory].total
      );
    }
  });

  it("contain all detailed expenses by category", () => {
    const { categories, expenses, sample } = fixtures.fewExpenses;
    const report = costReport(categories, expenses);

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
