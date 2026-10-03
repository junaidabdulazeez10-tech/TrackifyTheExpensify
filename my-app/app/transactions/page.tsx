import TransactionFilter from "@/components/TransactionFilter";
import { getTransactions } from "@/serverActions/transaction";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { formatCurrency } from "@/lib/calculations";


export default async function Transactions() {

  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/login")
  }

  const transactions = await getTransactions();


  const date = new Date();
  const thisMonthAndYear = date.toLocaleDateString("en-Us", { month: "short", year: "numeric" })


  const totalIn = transactions
    .filter((v) => v.createdAt.toLocaleDateString("en-Us", { month: "short", year: "numeric" }) === thisMonthAndYear)
    .filter((v) => v.type === "Income").reduce((sum, value) => sum + value.amount, 0)

  const totalOut = transactions
    .filter((v) => v.createdAt.toLocaleDateString("en-Us", { month: "short", year: "numeric" }) === thisMonthAndYear)
    .filter((v) => v.type === "Expense").reduce((sum, value) => sum + value.amount, 0)

  return (
    <div className="mx-3 sm:mx-5">
      <div className="mb-5 ">{thisMonthAndYear}</div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className=" border w-full p-5">
          <div className="text-[#00ffb3]" >Total In</div>
          <div className="text-2xl text-[#00ffb3]">+{formatCurrency(totalIn)}</div>
        </div>
        <div className=" border w-full p-5">
          <div className="text-[#00ffea]" >Remaining For This Month</div>
          <div className="text-2xl text-[#00ffea]">{formatCurrency(totalIn - totalOut)}</div>
        </div>
        <div className=" border w-full p-5">
          <div className="text-[#ff036c]" >Total Out</div>
          <div className="text-2xl text-[#ff036c]">-{formatCurrency(totalOut)}</div>
        </div>
      </div>
      {transactions.length === 0
        ? <p className="text-center text-xl sm:text-2xl lg:text-4xl mt-20">
          No transactions yet. Add your first transaction to get started.
        </p>
        : <TransactionFilter transactions={transactions} />
      }
    </div>
  )
}