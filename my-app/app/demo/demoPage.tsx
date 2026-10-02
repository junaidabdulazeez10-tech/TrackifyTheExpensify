"use client"

import AccountStatement from "@/components/accountStatement";
import { BarsChart, PiesChart } from "@/components/charts";
import TransactionFilter from "@/components/TransactionFilter";
import { formatCurrency } from "@/lib/calculations";
import { Car, CircleEllipsis, Film, House, Lightbulb, ShoppingBag, Utensils } from "lucide-react";
import { useState } from "react";

export default function DemoPage() {
  const [page, setPage] = useState("dashboard");

  const transactions = [
    {
      id: "1",
      description: "Salary",
      amount: 2000,
      category: "Income",
      type: "Income",
      createdAt: new Date("2026-10-30 12:46:32.618"),
      updatedAt: new Date("2026-10-30 12:46:32.618")
    },
    {
      id: "13",
      description: "Pizza",
      amount: 200,
      category: "Food",
      type: "Expense",
      createdAt: new Date("2026-10-30 12:46:32.618"),
      updatedAt: new Date("2026-10-30 12:46:32.618")
    },
    {
      id: "3",
      description: "Rent",
      amount: 500,
      category: "Housing",
      type: "Expense",
      createdAt: new Date("2026-10-30 12:46:32.618"),
      updatedAt: new Date("2026-10-30 12:46:32.618")
    },
    {
      id: "5",
      description: "Utilities",
      amount: 200,
      category: "Transportation",
      type: "Expense",
      createdAt: new Date("2026-10-30 12:46:32.618"),
      updatedAt: new Date("2026-10-30 12:46:32.618")
    },
    {
      id: "9",
      description: "Clothing",
      amount: 80,
      category: "Shopping",
      type: "Expense",
      createdAt: new Date("2026-10-30 12:46:32.618"),
      updatedAt: new Date("2026-10-30 12:46:32.618")
    },
    {
      id: "14",
      description: "Concert Tickets",
      amount: 150,
      category: "Entertainment",
      type: "Expense",
      createdAt: new Date("2026-10-30 12:46:32.618"),
      updatedAt: new Date("2026-10-30 12:46:32.618")
    },
    {
      id: "15",
      description: "Electricity Bill",
      amount: 170,
      category: "Utilities",
      type: "Expense",
      createdAt: new Date("2026-10-30 12:46:32.618"),
      updatedAt: new Date("2026-10-30 12:46:32.618")
    },
    {
      id: "16",
      description: "household Items",
      amount: 80,
      category: "Others",
      type: "Expense",
      createdAt: new Date("2026-10-30 12:46:32.618"),
      updatedAt: new Date("2026-10-30 12:46:32.618")
    },
    {
      id: "2",
      description: "Groceries",
      amount: 150,
      category: "Food",
      type: "Expense",
      createdAt: new Date("2026-11-30 12:46:32.618"),
      updatedAt: new Date("2026-11-30 12:46:32.618")
    },
    {
      id: "12",
      description: "Gym Membership",
      amount: 50,
      category: "Entertainment",
      type: "Expense",
      createdAt: new Date("2026-11-30 12:46:32.618"),
      updatedAt: new Date("2026-11-30 12:46:32.618")
    },
    {
      id: "4",
      description: "Freelance",
      amount: 1500,
      category: "Income",
      type: "Income",
      createdAt: new Date("2026-11-30 12:46:32.618"),
      updatedAt: new Date("2026-11-30 12:46:32.618")
    },
    {
      id: "6",
      description: "Dining Out",
      amount: 100,
      category: "Food",
      type: "Expense",
      createdAt: new Date("2026-11-30 12:46:32.618"),
      updatedAt: new Date("2026-11-30 12:46:32.618")
    },
    {
      id: "10",
      description: "Gift",
      amount: 100,
      category: "Others",
      type: "Expense",
      createdAt: new Date("2026-11-30 12:46:32.618"),
      updatedAt: new Date("2026-11-30 12:46:32.618")
    },
    {
      id: "7",
      description: "Car Payment",
      amount: 300,
      category: "Transportation",
      type: "Expense",
      createdAt: new Date("2026-12-30 12:46:32.618"),
      updatedAt: new Date("2026-12-30 12:46:32.618")
    },
    {
      id: "8",
      description: "Movie Tickets",
      amount: 50,
      category: "Entertainment",
      type: "Expense",
      createdAt: new Date("2026-12-30 12:46:32.618"),
      updatedAt: new Date("2026-12-30 12:46:32.618")
    },
    {
      id: "11",
      description: "Bonus",
      amount: 1100,
      category: "Income",
      type: "Income",
      createdAt: new Date("2026-12-30 12:46:32.618"),
      updatedAt: new Date("2026-12-30 12:46:32.618")
    },
  ];

  const categoryIcons = {
    Housing: House,
    Food: Utensils,
    Transportation: Car,
    Entertainment: Film,
    Shopping: ShoppingBag,
    Utilities: Lightbulb,
    Others: CircleEllipsis
  }

  const COLORS = [
    "#00e1ff",
    "#d400ff",
    "#0051ff",
    "#fffb00",
    "#ff036c",
    "#ff6600",
    "#ff00008e",

  ];

  const allBudgets = [
    { category: "Housing", amount: 500 },
    { category: "Food", amount: 400 },
    { category: "Transportation", amount: 300 },
    { category: "Entertainment", amount: 200 },
    { category: "Shopping", amount: 150 },
    { category: "Utilities", amount: 200 },
    { category: "Others", amount: 100 }
  ];

  return (
    <>
      <div className="flex gap-5 justify-left align-center p-5">
        <button onClick={() => { setPage("dashboard") }} className={`border rounded text-xl p-2 hover:bg-neutral-600 transition-colors duration-300 ${page === "dashboard" && "bg-neutral-700"}`}>Dashboard Page Overview</button>
        <button onClick={() => { setPage("transactions") }} className={`border rounded text-xl p-2 hover:bg-neutral-600 transition-colors duration-300 ${page === "transactions" && "bg-neutral-700"}`}>Transactions Page Overview</button>
        <button onClick={() => { setPage("budget") }} className={`border rounded text-xl p-2 hover:bg-neutral-600 transition-colors duration-300 ${page === "budget" && "bg-neutral-700"}`}>Budget Page Overview</button>
      </div>

      {page === "dashboard" && (
        <>
          <div className="text-center text-5xl mb-10">Dashboard Page Overview</div>
          <div className="mr-5 ml-5">
            <div className="flex justify-between gap-10">
              <div className="border rounded w-full p-5 hover:scale-105 transition-transform duration-300">
                <p>Total Balance</p>
                <p className="text-2xl">{formatCurrency(2000 - 1050)}</p>
                <p>Overall</p>
              </div>
              <div className="border rounded w-full p-5 hover:scale-105 transition-transform duration-300">
                <p className="text-[#00ffb3] text-2xl font-semibold">Income</p>
                <p className="text-2xl">{formatCurrency(2000)}</p>
                <p>{"Oct 2026"}</p>
              </div>
              <div className="border rounded w-full p-5 hover:scale-105 transition-transform duration-300">
                <p className="text-[#ff036c] text-2xl font-semibold">Expenses</p>
                <p className="text-2xl">{formatCurrency(1050)}</p>
                <p>{"Oct 2026"}</p>
              </div>
              <div className="border rounded w-full p-5 hover:scale-105 transition-transform duration-300">
                <p>Savings Rate</p>
                <p className="text-2xl">{((2000 - 1050) / 2000 * 100).toFixed(2)}%</p>
                <p>{"Oct 2026"}</p>
              </div>
            </div>
            <div className="flex gap-10 mt-6">
              <div className="border flex-2 p-5 hover:scale-102 transition-transform duration-300 ">
                <p className="text-2xl">Income vs Expenses</p>
                <div className="flex justify-center"><BarsChart transactions={transactions} /></div>
              </div>
              <div className="border flex-1 p-5 hover:scale-102 transition-transform duration-300 ">
                <p className="text-2xl">By Category</p>
                <div className="flex justify-center"><PiesChart transactions={transactions} /></div>
              </div>
            </div>
            <div className="border mt-10 p-5 hover:scale-101 transition-transform duration-300">
              <div className="text-2xl">Recent Transactions</div>
              <AccountStatement transactions={transactions.slice(0, 5)} showStatus={false} />
            </div>
          </div>
        </>)}
      {page === "transactions" && (
        <>
          <div className="text-center text-5xl">Transactions Page Overview</div>
          <div className="mr-5 ml-5">
            <div className="mb-5 ">{"Oct 2026"}</div>
            <div className="flex justify-between gap-5">
              <div className=" border w-full p-5">
                <div className="text-[#00ffb3]" >Total In</div>
                <div className="text-2xl text-[#00ffb3]">+{formatCurrency(4600)}</div>
              </div>
              <div className=" border w-full p-5">
                <div className="text-[#00ffea]" >Remaining For This Month</div>
                <div className="text-2xl text-[#00ffea]">{formatCurrency(4600 - 1800)}</div>
              </div>
              <div className=" border w-full p-5">
                <div className="text-[#ff036c]" >Total Out</div>
                <div className="text-2xl text-[#ff036c]">-{formatCurrency(1800)}</div>
              </div>
            </div>
            <TransactionFilter transactions={transactions} />
          </div>
        </>)}
      {page === "budget" && (
        <>
          <div className="text-center text-5xl mb-10">Budget Page Overview</div>
          <div className="mr-5 ml-5">
            <div className="border rounded p-5">
              <p>Monthly Budget</p>
              <div className="grid grid-cols-3 items-center">
                <div>
                  <span className="text-4xl font-semibold">{formatCurrency(1050)}</span>/
                  <span className="text-2xl">{formatCurrency(1500)}</span>
                </div>
                <div className="flex justify-center self-start">
                </div>
                <div className="flex flex-col text-right">
                  <div className="font-semibold">{formatCurrency(450)}</div>
                </div>
              </div>
              <div className="w-full bg-gray-400 rounded-full h-3 mt-2 mb-2">
                <div className="bg-[#00c43ba2] h-3 rounded-full" style={{ width: `${Math.min(70, 100)}%` }} />
              </div>
              <p>{`${70}% of budget used`}</p>
            </div>
            <div className="grid grid-cols-4 gap-10 mt-5">
              {Object.entries(categoryIcons).map(([category, Icon], index) => {
                const budgets = allBudgets.find((v) => v.category === category)
                const monthlyCategorySpending = transactions.filter((v) => v.createdAt.toLocaleDateString("en-US", { month: "short", year: "numeric" }) === "Oct 2026")
                  .filter((v) => v.type === "Expense").filter((v) => v.category === category).reduce((sum, v) => sum + v.amount, 0)
                let percentage;
                if (!budgets) {
                  percentage = 0;
                } else {
                  percentage = Math.floor((monthlyCategorySpending / budgets.amount) * 100)
                }
                const remaining = (budgets?.amount ?? 0) - monthlyCategorySpending
                return (
                  <div key={category} className={`border p-5 col-span-2 ${index === Object.entries(categoryIcons).length - 1 ? "col-start-2" : ""}`}>
                    <div className="flex gap-1">
                      <Icon color={COLORS[index % COLORS.length]} />
                      <span>{category}</span>
                      <div className="ml-auto">{!budgets ? "—" : `${percentage}%`}</div>
                    </div>
                    <div className="w-full bg-gray-400 rounded-full h-3 mt-2 mb-2">
                      <div className="bg-green-700 h-3 rounded-full"
                        style={{ width: `${Math.min(percentage, 100)}%`, backgroundColor: COLORS[index % COLORS.length] }}
                      />
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <div>Spent: {formatCurrency(monthlyCategorySpending)}</div>
                      <div className="font-semibold">{"remains: " + formatCurrency(remaining)}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>)}
    </>
  )
}