import { describe, expect, it } from "vitest";
import { formatCurrency, calculateSavingsRate, calculateTotalByType, calculateMonthlyTotalByType, calculateCategorySpending, calculatePercentage, calculateRemaining } from "./calculations";



describe("formatCurrency", () => {

  it("formats a number as currency", () => {
    const result = formatCurrency(1234.56);
    expect(result).toBe("€1,234.56");
  });

  it("formats a negative number as currency", () => {
    const result = formatCurrency(-1234.56);
    expect(result).toBe("-€1,234.56");
  });

  it("formats zero as currency", () => {
    const result = formatCurrency(0);
    expect(result).toBe("€0.00");
  });
});

describe("calculateSavingsRate", () => {

  it("calculates savings rate in a month", () => {
    const result = calculateSavingsRate(100, 50);
    expect(result).toBe(50)
  });

  it("calculates savings rate in a month but the income is 0", () => {
    const result = calculateSavingsRate(0, 500);
    expect(result).toBe(0);
  });
});


describe("calculateTotalByType", () => {

  it("returns the total amount for a given type", () => {
    const result = calculateTotalByType([
      { id: "1", amount: 100, category: "food", description: "groceries", type: "Expense", createdAt: new Date(), updatedAt: new Date() },
      { id: "2", amount: 200, category: "salary", description: "monthly salary", type: "Income", createdAt: new Date(), updatedAt: new Date() },
    ], "Income");
    expect(result).toBe(200);
  });

  it("returns 0 when there are no transactions of the given type", () => {
    const result = calculateTotalByType([
      { id: "1", amount: 100, category: "food", description: "groceries", type: "Expense", createdAt: new Date(), updatedAt: new Date() },
      { id: "2", amount: 200, category: "salary", description: "monthly salary", type: "Expense", createdAt: new Date(), updatedAt: new Date() },
    ], "Income");
    expect(result).toBe(0);
  });

});


describe("calculateMonthlyTotalByType", () => {

  it("calculates monthly total by type", () => {
    const result = calculateMonthlyTotalByType([
      { id: "1", amount: 100, category: "food", description: "groceries", type: "Expense", createdAt: new Date("2026-10-30 12:46:32.618"), updatedAt: new Date() },
      { id: "2", amount: 200, category: "salary", description: "Airpods", type: "Income", createdAt: new Date("2026-09-30 12:46:32.618"), updatedAt: new Date() },
      { id: "3", amount: 350, category: "salary", description: "Uber", type: "Expense", createdAt: new Date("2026-10-30 12:46:32.618"), updatedAt: new Date() }
    ], "Expense", "Oct 2026")
    expect(result).toBe(450)
  })

  it("returns 0 when there are no transactions of the specified type", () => {
    const result = calculateMonthlyTotalByType([
      { id: "1", amount: 100, category: "food", description: "groceries", type: "Income", createdAt: new Date("2026-10-30 12:46:32.618"), updatedAt: new Date() },
      { id: "2", amount: 200, category: "salary", description: "Airpods", type: "Income", createdAt: new Date("2026-09-30 12:46:32.618"), updatedAt: new Date() },
      { id: "3", amount: 350, category: "salary", description: "Uber", type: "Income", createdAt: new Date("2026-10-30 12:46:32.618"), updatedAt: new Date() }
    ], "Expense", "Oct 2026")
    expect(result).toBe(0)
  })
})

describe("calculateCategorySpending", () => {

  it("calculates category spending for a given month and year", () => {
    const result = calculateCategorySpending([
      { id: "1", amount: 100, category: "Food", description: "Groceries", type: "Expense", createdAt: new Date("2026-10-30 12:46:32.618"), updatedAt: new Date() },
      { id: "2", amount: 200, category: "Salary", description: "Airpods", type: "Income", createdAt: new Date("2026-09-30 12:46:32.618"), updatedAt: new Date() },
      { id: "3", amount: 350, category: "Food", description: "Uber", type: "Expense", createdAt: new Date("2026-10-30 12:46:32.618"), updatedAt: new Date() }
    ], "Expense", "Food", "Oct 2026")
    expect(result).toBe(450)
  });

  it("returns 0 when there are no transactions of the specified category", () => {
    const result = calculateCategorySpending([
      { id: "1", amount: 100, category: "food", description: "Groceries", type: "Expense", createdAt: new Date("2026-10-30 12:46:32.618"), updatedAt: new Date() },
      { id: "2", amount: 200, category: "salary", description: "Airpods", type: "Income", createdAt: new Date("2026-09-30 12:46:32.618"), updatedAt: new Date() },
      { id: "3", amount: 350, category: "food", description: "Uber", type: "Expense", createdAt: new Date("2026-10-30 12:46:32.618"), updatedAt: new Date() }
    ], "Expense", "Transportation", "Oct 2026")
    expect(result).toBe(0);
  });
});

describe("calculatePercentage", () => {

  it("calculates percentage spent of budget", () => {
    const result = calculatePercentage(50, 100);
    expect(result).toBe(50);
  });

  it("returns 0 when budget is 0", () => {
    const result = calculatePercentage(50, 0);
    expect(result).toBe(0);
  });

  it("returns rounded percentage", () => {
    const result = calculatePercentage(75, 200);
    expect(result).toBe(37);
  });
});


describe("calculateRemaining", () => {

  it("calculates remaining budget after spending", () => {
    const result = calculateRemaining(100, 50);
    expect(result).toBe(50);
  });

  it("returns 0 when budget is 0", () => {
    const result = calculateRemaining(0, 50);
    expect(result).toBe(0);
  });

  it("returns negative remaining when spending exceeds budget", () => {
    const result = calculateRemaining(50, 100);
    expect(result).toBe(-50);
  });
});