"use client"
import { useState } from "react"
import { createTransaction } from "../serverActions/transaction";
import { TransactionType } from "@prisma/client";
import { LoaderCircle } from "lucide-react";

type AddTransactionFormProps = {
  setOpen: (value: boolean) => void;
}

export default function AddTransactionForm({ setOpen }: AddTransactionFormProps) {
  const [type, setType] = useState<TransactionType>("Expense")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    setError("")
    if (!amount.trim() || !category.trim() || !description.trim()) {
      setError("Please fill in all fields");
      return;
    } else if (Number(amount) <= 0 || Number.isNaN(Number(amount))) {
      setError("Amount must be a positive number");
      return;
    }
    try {
      setLoading(true)
      await createTransaction({ amount: Number(amount), category, description, type })
      setOpen(false)
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong.");
      }
    } finally{
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <form className="w-full max-w-[320px] p-5 sm:p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/20 shadow-2xl flex flex-col gap-4">
        <h1 className="text-white text-2xl font-semibold text-center">
          Add Transaction
        </h1>
        <div className="flex justify-center gap-8">
          <button type="button" className={`p-3 rounded-lg ${type === "Income" ? "bg-[#00ffb3] text-white" : "bg-white/20 text-white"}  hover:opacity-70 `} onClick={() => { setType("Income"); setCategory("Income"), setError("") }}>Income</button>
          <button type="button" className={`p-3 rounded-lg ${type === "Expense" ? "bg-[#ff036c] text-white" : "bg-white/20 text-white"}  hover:opacity-70 `} onClick={() => { setType("Expense"); setCategory(""), setError("") }}>Expense</button>
        </div>
        <input placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} className="p-3 rounded-lg bg-white/20 text-white hover:opacity-70" />
        <input placeholder="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="p-3 rounded-lg bg-white/20 text-white hover:opacity-70" />
        {type === "Expense" && (
          <select className="p-3 rounded-lg bg-white/20 text-white hover:opacity-70" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option className="p-3 rounded-lg bg-black/70 text-white" value="">Select Category</option>
            <option className="p-3 rounded-lg bg-black/70 text-white" value="Food">Food</option>
            <option className="p-3 rounded-lg bg-black/70 text-white" value="Housing">Housing</option>
            <option className="p-3 rounded-lg bg-black/70 text-white" value="Shopping">Shopping</option>
            <option className="p-3 rounded-lg bg-black/70 text-white" value="Transportation">Transportation</option>
            <option className="p-3 rounded-lg bg-black/70 text-white" value="Entertainment">Entertainment</option>
            <option className="p-3 rounded-lg bg-black/70 text-white" value="Utilities">Utilities</option>
            <option className="p-3 rounded-lg bg-black/70 text-white" value="Others">Others</option>
          </select>
        )}
        <button type="button" onClick={handleSubmit} className="p-3 rounded-lg bg-[#00ffb3] text-white hover:opacity-50 duration-200">
           {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <LoaderCircle className="h-5 w-5 animate-spin" />
                  Creating Transaction...
                </span>) : ("Send")}
        </button>
        <button type="button" onClick={() => setOpen(false)} className="p-3 rounded-lg bg-[#ff036c] text-white hover:opacity-50 duration-200">
          Close
        </button>
        {error && <p className="text-[#ff036c] text-center">{error}</p>}
      </form>
    </div>
  )
}