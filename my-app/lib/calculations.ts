export function formatCurrency(amount: number) {
  const formatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "EUR", });
  return formatter.format(amount);
}

export function calculateSavingsRate(income: number, expenses: number): number {
  if (income === 0) {
    return 0;
  }
  return ((income - expenses) / income) * 100;
}


type Transaction = {
  id: string;
  amount: number;
  category: string;
  description: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

export function calculateTotalByType(transactions: Transaction[], type: string): number {
  return transactions.filter((v) => v.type === type)
    .reduce((sum, v) => sum + v.amount, 0);
}

export function calculateMonthlyTotalByType(transactions: Transaction[], type: string, thisMonthAndYear: string): number {
  return transactions
    .filter((v) => v.createdAt.toLocaleDateString("en-US", { month: "short", year: "numeric" }) === thisMonthAndYear)
    .filter((v) => v.type === type).reduce((sum, value) => sum + value.amount, 0)
}

export function calculateCategorySpending(transactions: Transaction[], type: string, category: string, thisMonthAndYear: string): number {
  return transactions.filter((v) => v.createdAt.toLocaleDateString("en-US", { month: "short", year: "numeric" }) === thisMonthAndYear)
    .filter((v) => v.type === type)
    .filter((v) => v.category === category)
    .reduce((sum, v) => sum + v.amount, 0)
}


export function calculatePercentage(spent: number, budget: number): number {
  if (budget === 0) {
    return 0;
  } else {
    return Math.floor((spent / budget) * 100);
  }
}

export function calculateRemaining(budget: number, spent: number): number {
  if (budget === 0) {
    return 0;
  } else {
    return budget - spent;
  }
}
