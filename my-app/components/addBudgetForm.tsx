"use client"
import { createOrUpdateBudget } from "@/serverActions/budget"
import { Plus } from "lucide-react"
import { useState } from "react"

export default function AddBudgetForm({ category, hasAmount }: { category: string, hasAmount: number | undefined }) {
  const [showForm, setShowForm] = useState(false)
  const [amount, setAmount] = useState(hasAmount === undefined ? "" : String(hasAmount))
  const [error, setError] = useState("")

  async function handleSubmit() {

    setError("")
    if (!amount.trim() || !category.trim()) {
      setError("Please fill in all fields");
      return;
    } else if (Number(amount) <= 0 || Number.isNaN(Number(amount))) {
      setError("Amount must be a positive number");
      return;
    }

    try {
      await createOrUpdateBudget({ amount: Number(amount), category })
      setShowForm(false)
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong.");
      }
    }
  }

  return (
    <>
      <button onClick={() => setShowForm(true)} className="text-sm font-semibold flex items-center gap-2 
        border px-2 py-1 rounded-full hover:opacity-70 transition-opacity duration-200 cursor-pointer">
        {hasAmount === undefined ? "Set Budget " : "Update Budget"}  <Plus />
      </button>

      {showForm &&
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/70">
          <form className="w-[320px] p-8 rounded-2xl  bg-white/10 backdrop-blur-xl border border-white/20  shadow-2xl flex flex-col gap-4">
            <h1 className="text-white text-2xl font-semibold text-center">
              Assign Budgets
            </h1>
            <input placeholder="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="p-3 rounded-lg bg-white/20 text-white hover:opacity-70 transition-opacity duration-200" />
            <button type="button" onClick={handleSubmit} className="p-3 rounded-lg bg-green-500 text-white hover:bg-green-900 transition-colors duration-200">
              Send
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="p-3 rounded-lg bg-red-500 text-white hover:bg-red-900 transition-colors duration-200">
              Close
            </button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </form>
        </div>
      }
    </>
  )
}