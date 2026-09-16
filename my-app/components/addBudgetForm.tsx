"use client"
import { createBudget } from "@/serverActions/budget"
import { Plus } from "lucide-react"
import { useState } from "react"

export default function AddBudgetForm({ category }: { category: string }) {
  const [showForm, setShowForm] = useState(false)
  const [amount, setAmount] = useState("")
  

  return (
    <>
      <div className="flex gap-2 border px-2 py-1 rounded-full">
        <button onClick={() => setShowForm(true)} className="text-sm font-semibold text-white">
          Assign Budgets
        </button>
        <Plus />
      </div>

      {showForm &&
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/70">
          <form className="w-[320px] p-8 rounded-2xl  bg-white/10 backdrop-blur-xl border border-white/20  shadow-2xl flex flex-col gap-4">
            <h1 className="text-white text-2xl font-semibold text-center">
              Assign Budgets
            </h1>
            <input placeholder="amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="p-3 rounded-lg bg-white/20 text-white hover:opacity-70" />
            <button type="button" onClick={async () => { await createBudget({ amount: Number(amount), category }), setShowForm(false) }} className="p-3 rounded-lg bg-green-500 text-white hover:bg-green-900 transition-colors duration-200">
              Send
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="p-3 rounded-lg bg-red-500 text-white hover:bg-red-900 transition-colors duration-200">
              Close
            </button>
          </form>
        </div>
      }
    </>
  )
}