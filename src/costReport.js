function costReport(categories, expenses) {
  const report = {
    total: 0,
    expenses: {},
  };
  return Boolean(expenses) && expenses.length
    ? expenses.reduce(expensesReducer(categories), report)
    : report;
}

function expensesReducer(categories) {
  const categoriesKeys = mapCategoriesToProperties(categories);
  return (report, { description, date, amount, category }) => {
    const categoryKey = categoriesKeys[category];
    return {
      total: report.total + amount,
      expenses: {
        ...report.expenses,
        [categoryKey]: {
          name: categories[category],
          total: (report.expenses[categoryKey]?.total || 0) + amount,
          detailedExpenses: (report.expenses[
            categoryKey
          ]?.detailedExpenses || []).concat({ description, date, amount }),
        },
      },
    };
  };
}

function mapCategoriesToProperties(categories) {
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

module.exports = { costReport };
