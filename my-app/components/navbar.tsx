"use client"
import Link from "next/link";
import { useState } from "react"
import AddTransactionForm from "./addTransactionForm";
import { useThemeContext } from "@/context/theme-context";
import { Moon, Sun } from "lucide-react"
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";


export default function Navbar() {

  const [open, setOpen] = useState(false)
  const { setTheme, theme } = useThemeContext()

  const router = useRouter();

  async function handleLogout() {

    const { error } = await authClient.signOut();

    if (error) {
      alert(`Error logging out: ${error.message}`);
      return;
    }

    router.push("/");
  }

  const { data: session } = authClient.useSession();

  return (
    <>
      {session ? (<div className="grid grid-cols-3 p-8 text-xl">
        <div className="flex gap-20 mr-auto items-center">
          <Link className="hover:scale-110 transition-transform duration-300" href="/transactions">Transactions</Link>
          <Link className="hover:scale-110 transition-transform duration-300" href="/budgets">Budgets</Link>
          <Link className="hover:scale-110 transition-transform duration-300" href="/dashboard">Dashboard</Link>
          <button className="border p-2 hover:scale-110 transition-transform duration-300 cursor-pointer" onClick={() => { setTheme(prev => prev === "light" ? "dark" : "light") }} >{theme === "light" ? <Moon size={35} /> : <Sun size={35} />}</button>
        </div>
        <Link href="/" className="text-6xl text-center hover:scale-110 transition-transform duration-300">TrackifyTheExpensify</Link>
        <div className="flex gap-20 ml-auto">
          <button className="border p-2 hover:scale-110 transition-transform duration-300 cursor-pointer" onClick={() => { setOpen(true) }}>+ Add</button>
          <button className="border p-2 hover:scale-110 transition-transform duration-300 cursor-pointer hover:bg-[#ff036c] transition-colors duration-200" onClick={handleLogout}>Logout</button>
        </div>
      </div>) : (<div className="grid grid-cols-3 items-center p-8 text-xl">
        <div className="flex items-center gap-20 mr-auto">
          <Link className="hover:scale-110 transition-transform duration-300" href="/">Home</Link>
          <Link className="hover:scale-110 transition-transform duration-300" href="/demo">Demo</Link>
          <button className="border p-2 hover:scale-110 transition-transform duration-300 cursor-pointer" onClick={() => { setTheme(prev => prev === "light" ? "dark" : "light") }} >{theme === "light" ? <Moon size={35} /> : <Sun size={35} />}</button>
        </div>
        <Link href="/" className="text-6xl text-center hover:scale-110 transition-transform duration-300">TrackifyTheExpensify</Link>
        <div className="flex gap-20 ml-auto">
          <Link className="border p-2 hover:scale-110 transition-transform duration-300 cursor-pointer hover:bg-[#00ffb3] transition-colors duration-200" href="/sign-up">Sign up</Link>
          <Link className="border p-2 hover:scale-110 transition-transform duration-300 cursor-pointer hover:bg-[#00ffb3] transition-colors duration-200" href="/login">Login</Link>
        </div>
      </div>)}

      <hr className="mb-10" />

      {open && (<AddTransactionForm setOpen={setOpen} />)}
    </>
  )
}