function expensesReport(categories, expenses) {
  const report = {
    total: 0,
    expenses: {},
  };
  return Boolean(expenses) && expenses.length
    ? expenses.reduce(expensesReducer(categories), report)
    : report;
}

function sum(...numsToSum) {
  return numsToSum.reduce((acc, n) => Number((acc + n).toFixed(2)), 0);
}

function expensesReducer(categories) {
  const categoriesKeys = mapCategoriesToPropertyKeys(categories);
  return (report, { description, date, amount, category }) => {
    const categoryKey = categoriesKeys[category];
    return {
      total: sum(report.total, amount),
      expenses: {
        ...report.expenses,
        [categoryKey]: {
          name: categories[category],
          total: sum(report.expenses[categoryKey]?.total || 0, amount),
          detailedExpenses: (
            report.expenses[categoryKey]?.detailedExpenses || []
          ).concat({ description, date, amount }),
        },
      },
    };
  };
}

function mapCategoriesToPropertyKeys(categories) {
  return Boolean(categories) && Object.keys(categories)
    ? Object.entries(categories).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: value.toLowerCase().replace(" ", "_"),
        }),
        {}
      )
    : categories;
}

module.exports = { expensesReport };
