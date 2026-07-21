"use client"
import Link from "next/link";
import { useState } from "react"
import AddTransactionForm from "./addTransactionForm";
import { useThemeContext } from "@/context/theme-context";
import {Moon, Sun} from "lucide-react"


export default function Navbar() {

  const [open, setOpen] = useState(false)
  const {setTheme, theme} = useThemeContext()
  
  return (
    <>
      <div className="grid grid-cols-3 items-center p-8 text-xl">
        <div className="flex gap-20 mr-auto">
          <Link className="hover:scale-110 transition-transform duration-300" href="/transactions">Transactions</Link>
          <Link className="hover:scale-110 transition-transform duration-300" href="/budgets">Budgets</Link>
          <Link className="hover:scale-110 transition-transform duration-300" href="/dashboard">Dashboard</Link>
        </div>
        <Link  href="/" className="text-6xl text-center hover:scale-110 transition-transform duration-300">TrackifyTheExpensify</Link>
        <div className="flex gap-20 ml-auto">
          <button className="border p-2 hover:scale-110 transition-transform duration-300 cursor-pointer" onClick={() => { setOpen(true) }}>+ Add</button>
          <button className="border p-2 hover:scale-110 transition-transform duration-300 cursor-pointer" onClick={() => {setTheme(prev => prev === "light" ?  "dark" : "light")}} >{theme === "light" ? <Moon size={35} /> : <Sun size={35} />}</button>
          <button className="border p-2 hover:scale-110 transition-transform duration-300 cursor-pointer" >Sign out</button>
        </div>
      </div>
      <hr className="mb-10" />

      {open && (<AddTransactionForm setOpen={setOpen} />)}
    </>
  )
}