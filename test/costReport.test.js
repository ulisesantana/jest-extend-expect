const { costReport } = require("../src/costReport");
const fixtures = require("./fixtures");

describe("Cost report should", () => {
  it("return total cost and expenses", () => {
    const report = costReport([]);

    // add matcher toHaveProperties("total", "expenses")
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

    // add matcher toContainTotalComputed(report.expenses, sample.expenses)
    expect(report.expenses.groceries.total).toBe(
      sample.expenses.groceries.total
    );
    expect(report.expenses.transportation_expenses.total).toBe(
      sample.expenses.transportation_expenses.total
    );
  });

  xit("contain all detailed expenses by category", () => {
    const { categories, expenses, sample } = fixtures.fewExpenses;
    const report = costReport(categories, expenses);

    // add matcher toContainDetailedExpenses??
    expect(report.expenses.groceries.total).toBe(
      sample.expenses.groceries.total
    );
    expect(report.expenses.transportation_expenses.total).toBe(
      sample.expenses.transportation_expenses.total
    );
  });
});
