"use client"
import { useState } from "react"
import { createTransaction } from "../serverActions/transaction";

type AddTransactionFormProps = {
  setOpen: (value: boolean) => void;
}

export default function AddTransactionForm({ setOpen }: AddTransactionFormProps) {
  const [status, setStatus] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <form className="w-[320px] p-8 rounded-2xl 
              bg-white/10 backdrop-blur-xl 
              border border-white/20 
              shadow-2xl flex flex-col gap-4">
        <h1 className="text-white text-2xl font-semibold text-center">
          Add Transaction
        </h1>
        <div className="flex justify-center gap-8">
          <button type="button" className={`p-3 rounded-lg ${status === "Income" ? "bg-green-500 text-white" : "bg-white/20 text-white"}`} onClick={(e) => { setStatus("Income") }}>Income</button>
          <button type="button" className={`p-3 rounded-lg ${status === "Expense" ? "bg-green-500 text-white" : "bg-white/20 text-white"}`} onClick={(e) => { setStatus("Expense") }}>Expense</button>
        </div> 
        <input placeholder="amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="p-3 rounded-lg bg-white/20 text-white" />
        <select className="p-3 rounded-lg bg-white/20 text-white" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option className="p-3 rounded-lg bg-black/70 text-white" value="">Select Category</option>
          <option className="p-3 rounded-lg bg-black/70 text-white" value="Income">Income</option>
          <option className="p-3 rounded-lg bg-black/70 text-white" value="Expense">Expense</option>
          <option className="p-3 rounded-lg bg-black/70 text-white" value="Housing">Housing</option>
          <option className="p-3 rounded-lg bg-black/70 text-white" value="Shopping">Shopping</option>
          <option className="p-3 rounded-lg bg-black/70 text-white" value="Transportation">Transportation</option>
          <option className="p-3 rounded-lg bg-black/70 text-white" value="Entertainment">Entertainment</option>
          <option className="p-3 rounded-lg bg-black/70 text-white" value="Utilities">Utilities</option>
          <option className="p-3 rounded-lg bg-black/70 text-white" value="Others">Others</option>
        </select>
        <input placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} className="p-3 rounded-lg bg-white/20 text-white" />
        <button type="button" onClick={async () => { await createTransaction({ amount: Number(amount), category, description, status }), setOpen(false) }} className="p-3 rounded-lg bg-green-500 text-white">
          Send
        </button>
        <button type="button" onClick={() => setOpen(false)} className="p-3 rounded-lg bg-red-500 text-white">Close</button>
      </form>
    </div>
  )
}