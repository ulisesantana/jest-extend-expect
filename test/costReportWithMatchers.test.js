const { costReport } = require("../src/costReport");
const fixtures = require("./fixtures");
const { addCustomMatchers } = require("./helpers");

const customExpect = addCustomMatchers(expect);

describe("Cost report should", () => {
  it("return total cost and expenses", () => {
    const report = costReport([]);

    customExpect(report).toHaveProperties("total", "expenses");
  });

  it("compute total cost based in all expenses", () => {
    const { categories, expenses, sample } = fixtures.fewExpenses;
    const report = costReport(categories, expenses);

    customExpect(report.total).toBe(sample.total);
  });

  it("compute total expenses for each category", () => {
    const { categories, expenses, sample } = fixtures.fewExpenses;
    const report = costReport(categories, expenses);

    customExpect(report).toHaveTotalExpensesByCategory(sample);
  });

  it("contain all detailed expenses by category", () => {
    const { categories, expenses, sample } = fixtures.fewExpenses;
    const report = costReport(categories, expenses);

    customExpect(report).toContainDetailedExpenses(sample);
  });
});
