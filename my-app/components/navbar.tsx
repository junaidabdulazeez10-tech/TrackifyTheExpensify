"use client"
import Link from "next/link";
import { useState } from "react"
import { createTransaction } from "./transaction";

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("")


  return (
    <>
      <div className="grid grid-cols-3 items-center p-8 text-xl">
        <div className="flex gap-20 mr-auto">
          <Link href="/transactions">Transactions</Link>
          <Link href="/budgets">Budgets</Link>
          <Link href="/dashboard">Dashboard</Link>
        </div>
        <Link href="/" className="text-6xl text-center">TrackifyTheExpensify</Link>
        <div className="flex gap-20 ml-auto">
          <button className="border p-2" onClick={() => { setOpen(true) }}>+ Add</button>
          <button className="border p-2">Mode</button>
          <button className="border p-2">Sign out</button>
        </div>
      </div>
      <hr className="mb-10" />

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <form className="w-[320px] p-8 rounded-2xl 
              bg-white/10 backdrop-blur-xl 
              border border-white/20 
              shadow-2xl flex flex-col gap-4">
            <h1 className="text-white text-2xl font-semibold text-center">
              Create User
            </h1>
            <input placeholder="amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="p-3 rounded-lg bg-white/20 text-white"/>
            <input placeholder="category" value={category} onChange={(e) => setCategory(e.target.value)} className="p-3 rounded-lg bg-white/20 text-white"/>
            <input placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} className="p-3 rounded-lg bg-white/20 text-white"/>
            <input placeholder="status" value={status} onChange={(e) => setStatus(e.target.value)} className="p-3 rounded-lg bg-white/20 text-white"/>
            <button type="button" onClick={async () => { await createTransaction({amount: Number(amount), category, description, status}), setOpen(false)}} className="p-3 rounded-lg bg-green-500 text-white"> 
              Send </button>
            <button type="button" onClick={() => setOpen(false)} className="p-3 rounded-lg bg-red-500 text-white">Close</button>
          </form>
        </div>
      )}
    </>
  )
}