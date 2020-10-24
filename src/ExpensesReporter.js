class ExpensesReporter {
  #expenses = [];
  #categories = {};
  #categoriesKeys = [];
  #emptyReport = {
    total: 0,
    expenses: {},
  };

  constructor(categories, expenses) {
    this.#expenses = expenses;
    this.#categories = categories;
    this.#categoriesKeys = this.#mapCategoriesToPropertyKeys(this.#categories);
  }

  exec() {
    return Boolean(this.#expenses) && this.#expenses.length
      ? this.#expenses.reduce(this.#expensesReducer, this.#emptyReport)
      : this.#emptyReport;
  }

  #expensesReducer = (report, { description, date, amount, category }) => {
    const categoryKey = this.#categoriesKeys[category];
    return {
      total: this.#sum(report.total, amount),
      expenses: {
        ...report.expenses,
        [categoryKey]: {
          name: this.#categories[category],
          total: this.#sum(report.expenses[categoryKey]?.total || 0, amount),
          detailedExpenses: (
            report.expenses[categoryKey]?.detailedExpenses || []
          ).concat({ description, date, amount }),
        },
      },
    };
  };

  #mapCategoriesToPropertyKeys = () => {
    return Boolean(this.#categories) && Object.keys(this.#categories)
      ? Object.entries(this.#categories).reduce(
          (acc, [key, value]) => ({
            ...acc,
            [key]: value.toLowerCase().replace(" ", "_"),
          }),
          {}
        )
      : this.#categories;
  };

  #sum = (...numsToSum) => {
    return numsToSum.reduce((acc, n) => Number((acc + n).toFixed(2)), 0);
  };
}

module.exports = { ExpensesReporter };
