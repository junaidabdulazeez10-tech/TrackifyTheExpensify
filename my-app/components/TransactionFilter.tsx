"use client"

import { useState } from "react"
import AccountStatement from "./accountStatement";

type Transaction = {
  id: string;
  amount: number;
  category: string;
  description: string;
  status: string;
}

type TransactionsProp = {
  transactions: Transaction[]
}

export default function TransactionFilter({ transactions }: TransactionsProp) {
  const [filter, setFilter] = useState("All")
  const filteredTransactions = filter === "All" ? transactions : transactions.filter((value) => value.status === filter)
  return (
    <>
      <div className="flex gap-4 mt-5 ">
        <button className={`border p-3 hover:scale-110 transition-transform duration-300 cursor-pointer 
          ${filter === "All" && "bg-neutral-500"}`} onClick={() => { setFilter("All") }}>All</button>
        <button className={`border p-3 hover:scale-110 transition-transform duration-300 cursor-pointer 
          ${filter === "Income" && "bg-neutral-500"}`} onClick={() => { setFilter("Income") }}>Income</button>
        <button className={`border p-3 hover:scale-110 transition-transform duration-300 cursor-pointer 
          ${filter === "Expense" && "bg-neutral-500"}`} onClick={() => { setFilter("Expense") }}>Expense</button>
      </div>
      <div className="border mt-5 p-5">
        <div>Transactions: </div>
        <AccountStatement transactions={filteredTransactions} />
      </div>
    </>

  )
}