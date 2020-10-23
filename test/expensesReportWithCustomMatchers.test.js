const { ExpensesReporter } = require("../src/ExpensesReporter");
const fixtures = require("./fixtures");
const addCustomMatchers = require("./matchers");

const customExpect = addCustomMatchers(expect);

describe("Expense report should", () => {
  it("return total cost and expenses", () => {
    const report = new ExpensesReporter([]).exec();

    customExpect(report).toHaveProperties("total", "expenses");
  });

  it("compute total expenses", () => {
    const { categories, expenses, sample } = fixtures.fewExpenses;
    const report = new ExpensesReporter(categories, expenses).exec();

    customExpect(report.total).toBe(sample.total);
  });

  it("compute total expenses for each category", () => {
    const { categories, expenses, sample } = fixtures.fewExpenses;
    const report = new ExpensesReporter(categories, expenses).exec();

    customExpect(report).toHavePropertyAndMatchValue("total", sample);
  });

  it("contain all detailed expenses by category", () => {
    const { categories, expenses, sample } = fixtures.fewExpenses;
    const report = new ExpensesReporter(categories, expenses).exec();

    customExpect(report).toHavePropertyAndMatchValue(
      "detailedExpenses",
      sample
    );
  });
});
