module.exports = {
  categories: {
    1: "Groceries",
    2: "Transportation expenses",
  },
  expenses: [
    {
      description: "Weekly shopping",
      date: "2020/08/28",
      amount: 42.24,
      category: 1,
    },
    {
      description: "Extra fruit",
      date: "2020/08/30",
      amount: 6.81,
      category: 1,
    },
    {
      description: "Monthly voucher",
      date: "2020/08/02",
      amount: 40,
      category: 2,
    },
    {
      description: "Taxi to Airport",
      date: "2020/08/25",
      amount: 36.1,
      category: 2,
    },
  ],
  sample: {
    total: 125.15,
    expenses: {
      groceries: {
        name: "Groceries",
        total: 49.05,
        detailedExpenses: [
          { description: "Weekly shopping", date: "2020/08/28", amount: 42.24 },
          { description: "Extra fruit", date: "2020/08/30", amount: 6.81 },
        ],
      },
      transportation_expenses: {
        name: "Transportation expenses",
        total: 76.1,
        detailedExpenses: [
          { description: "Monthly voucher", date: "2020/08/02", amount: 40 },
          { description: "Taxi to Airport", date: "2020/08/25", amount: 36.1 },
        ],
      },
    },
  },
};
