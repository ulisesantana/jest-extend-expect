const { expensesReport } = require("../src/expensesReport");
const fixtures = require("./fixtures");
const addCustomMatchers = require("./matchers");

const customExpect = addCustomMatchers(expect);

describe("Expense report should", () => {
  it("return total cost and expenses", () => {
    const report = expensesReport([]);

    customExpect(report).toHaveProperties("total", "expenses");
  });

  it("compute total expenses", () => {
    const { categories, expenses, sample } = fixtures.fewExpenses;
    const report = expensesReport(categories, expenses);

    customExpect(report.total).toBe(sample.total);
  });

  it("compute total expenses for each category", () => {
    const { categories, expenses, sample } = fixtures.fewExpenses;
    const report = expensesReport(categories, expenses);

    customExpect(report).toHavePropertyAndMatchValue("total", sample);
  });

  it("contain all detailed expenses by category", () => {
    const { categories, expenses, sample } = fixtures.fewExpenses;
    const report = expensesReport(categories, expenses);

    customExpect(report).toHavePropertyAndMatchValue(
      "detailedExpenses",
      sample
    );
  });
});
