class ExpensesReporter {
  constructor(categories, expenses) {
    this.expenses = expenses;
    this.categories = categories;
    this.report = {
      total: 0,
      expenses: {},
    };
  }

  exec() {
    return Boolean(this.expenses) && this.expenses.length
      ? this.expenses.reduce(this.#expensesReducer(), this.report)
      : this.report;
  }

  #expensesReducer = () => {
    const categoriesKeys = this.#mapCategoriesToPropertyKeys(this.categories);
    return (report, { description, date, amount, category }) => {
      const categoryKey = categoriesKeys[category];
      return {
        total: this.#add(report.total, amount),
        expenses: {
          ...report.expenses,
          [categoryKey]: {
            name: this.categories[category],
            total: this.#add(report.expenses[categoryKey]?.total || 0, amount),
            detailedExpenses: (
              report.expenses[categoryKey]?.detailedExpenses || []
            ).concat({ description, date, amount }),
          },
        },
      };
    };
  };

  #mapCategoriesToPropertyKeys = () => {
    return Boolean(this.categories) && Object.keys(this.categories)
      ? Object.entries(this.categories).reduce(
          (acc, [key, value]) => ({
            ...acc,
            [key]: value.toLowerCase().replace(" ", "_"),
          }),
          {}
        )
      : this.categories;
  };

  #add = (...numsToSum) => {
    return numsToSum.reduce((acc, n) => Number((acc + n).toFixed(2)), 0);
  };
}

module.exports = { ExpensesReporter };
