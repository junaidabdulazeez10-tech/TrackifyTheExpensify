import Link from "next/link";

export default function Navbar() {
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
          <button className="border p-2">+ Add</button>
          <button className="border p-2">Mode</button>
          <button className="border p-2">Sign out</button>
        </div>
      </div>
      <hr className="mb-10" />
    </>
  )
}