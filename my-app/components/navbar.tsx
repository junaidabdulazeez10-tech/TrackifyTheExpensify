"use client"
import Link from "next/link";
import { useState } from "react"
import AddTransactionForm from "./addTransactionForm";
import { useThemeContext } from "@/context/theme-context";
import { Star, Snowflake, Menu, X } from "lucide-react"
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";


export default function Navbar() {

  const [open, setOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

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

  const name = session?.user.name;

  const capitalizedName = name
    ? name.charAt(0).toUpperCase() + name.slice(1)
    : "";

  return (
    <>
      <div className="lg:hidden p-2 sm:p-4">
        <div className="flex items-center justify-between gap-2">
          <Link href="/" className="text-2xl sm:text-3xl hover:scale-110 hover:bg-white/10 transition-all duration-300 cursor-pointer">
            {session && `${capitalizedName}ify's`}TrackifyTheExpensify
          </Link>

          <div className="flex items-center gap-1 sm:gap-3 shrink-0">
            <button
              className="border p-1 sm:p-2 hover:scale-110 hover:bg-white/10 transition-all duration-300 cursor-pointer"
              onClick={() =>
                setTheme(prev => prev === "light" ? "dark" : "light")
              }
            >
              {theme === "light" ? <Star className="w-4 h-4 sm:w-6 sm:h-6" /> : <Snowflake className="w-4 h-4 sm:w-6 sm:h-6" />}
            </button>

            <button
              className="border p-1 sm:p-2 hover:scale-110 hover:bg-white/10 transition-all duration-300 cursor-pointer"
              onClick={() => setMenuOpen(prev => !prev)}
            >
              {menuOpen ? <X className="w-4 h-4 sm:w-6 sm:h-6" /> : <Menu className="w-4 h-4 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="flex flex-col gap-3 mt-4">
            {session ? (
              <>
                <Link href="/transactions" onClick={() => setMenuOpen(false)}>
                  Transactions
                </Link>

                <Link href="/budgets" onClick={() => setMenuOpen(false)}>
                  Budgets
                </Link>

                <Link href="/dashboard" onClick={() => setMenuOpen(false)}>
                  Dashboard
                </Link>

                <button
                  className="border p-2 text-left"
                  onClick={() => {
                    setOpen(true)
                    setMenuOpen(false)
                  }}
                >
                  + Add
                </button>

                <button
                  className="border p-2 text-left"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/" onClick={() => setMenuOpen(false)}>
                  Home
                </Link>
                <Link href="/demo" onClick={() => setMenuOpen(false)}>
                  Demo
                </Link>
                <Link href="/sign-up" onClick={() => setMenuOpen(false)}>
                  Sign up
                </Link>
                <Link href="/login" onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
              </>
            )}
          </div>
        )}
      </div>


      {session ? (<div className="hidden lg:grid grid-cols-[1fr_auto_1fr] items-center gap-3 xl:gap-6 p-4 xl:p-6 2xl:p-8 text-sm xl:text-base 2xl:text-xl">
        <div className="flex gap-2 xl:gap-6 2xl:gap-16 mr-auto items-center">
          <Link className="hover:scale-110 transition-transform duration-300 border p-1 xl:p-2" href="/transactions">Transactions</Link>
          <Link className="hover:scale-110 transition-transform duration-300 border p-1 xl:p-2" href="/budgets">Budgets</Link>
          <Link className="hover:scale-110 transition-transform duration-300 border p-1 xl:p-2" href="/dashboard">Dashboard</Link>
          <button className="border  p-1 xl:p-2 hover:scale-110 transition-transform duration-300 cursor-pointer" onClick={() => { setTheme(prev => prev === "light" ? "dark" : "light") }} >{theme === "light" ? <Star className="w-5 h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7" /> : <Snowflake className="w-5 h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7" />}</button>
        </div>
        <Link href="/" className="text-3xl xl:text-4xl 2xl:text-5xl text-center whitespace-nowrap hover:scale-105 transition-transform duration-300">
          {capitalizedName + "ify's"}TrackifyTheExpensify
        </Link>
        <div className="flex gap-2 xl:gap-6 2xl:gap-16 ml-auto items-center">
          <button
            className="border p-1 xl:p-2 whitespace-nowrap hover:scale-110 transition-transform duration-300 cursor-pointer hover:bg-[#00ffb3]"
            onClick={() => setOpen(true)} >
            + Add
          </button>
          <button
            className="border p-1 xl:p-2 hover:scale-110 transition-transform duration-300 cursor-pointer hover:bg-[#ff036c]"
            onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>) : (<div className="hidden lg:grid grid-cols-[1fr_auto_1fr] items-center gap-3 xl:gap-6 p-4 xl:p-6 2xl:p-8 text-sm xl:text-base 2xl:text-xl">
        <div className="flex items-center gap-2 xl:gap-6 2xl:gap-16 mr-auto">
          <Link className="hover:scale-110 transition-transform duration-300 border p-1 xl:p-2" href="/"> Home </Link>
          <Link className="hover:scale-110 transition-transform duration-300 border p-1 xl:p-2" href="/demo" >Demo</Link>
          <button className="border p-1 xl:p-2 hover:scale-110 transition-transform duration-300 cursor-pointer" onClick={() => setTheme(prev => prev === "light" ? "dark" : "light")} > {theme === "light" ? <Star className="w-5 h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7" /> : <Snowflake className="w-5 h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7" />} </button>
        </div>
        <Link href="/" className="text-3xl xl:text-4xl 2xl:text-5xl text-center whitespace-nowrap hover:scale-105 transition-transform duration-300" >TrackifyTheExpensify</Link>
        <div className="flex gap-2 xl:gap-6 2xl:gap-16 ml-auto">
          <Link className="border p-1 xl:p-2 hover:scale-110 transition-transform duration-300" href="/sign-up" >Sign up</Link>
          <Link className="border p-1 xl:p-2 hover:scale-110 transition-transform duration-300" href="/login"> Login</Link>
        </div>
      </div>)}

      <hr className="mb-10" />

      {open && (<AddTransactionForm setOpen={setOpen} />)}
    </>
  )
}