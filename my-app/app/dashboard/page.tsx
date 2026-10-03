import AccountStatement from "@/components/accountStatement";
import { getTransactions } from "@/serverActions/transaction";
import { BarsChart, PiesChart } from "@/components/charts";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { calculateSavingsRate, formatCurrency, calculateTotalByType, calculateMonthlyTotalByType } from "@/lib/calculations";

export default async function Dashboard() {

  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/login")
  }

  const transactions = await getTransactions();

  const date = new Date();
  const thisMonthAndYear = date.toLocaleDateString("en-US", { month: "short", year: "numeric" });

  const incomeFromThisMonth = calculateMonthlyTotalByType(transactions, "Income", thisMonthAndYear)

  const expenseFromThisMonth = calculateMonthlyTotalByType(transactions, "Expense", thisMonthAndYear)

  const income = calculateTotalByType(transactions, "Income");
  const expense = calculateTotalByType(transactions, "Expense");
  const balance = income - expense;


  return (
    <div className="mx-3 sm:mx-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-10">
        <div className="border rounded w-full p-5 hover:scale-105 transition-transform duration-300">
          <p className="text-[#00ffea] text-2xl font-semibold">Total Balance</p>
          <p className="text-2xl">{formatCurrency(balance)}</p>
          <p>Overall</p>
        </div>
        <div className="border rounded w-full p-5 hover:scale-105 transition-transform duration-300">
          <p className="text-[#00ffb3] text-2xl font-semibold">Income</p>
          <p className="text-2xl">{formatCurrency(incomeFromThisMonth)}</p>
          <p>{thisMonthAndYear}</p>
        </div>
        <div className="border rounded w-full p-5 hover:scale-105 transition-transform duration-300">
          <p className="text-[#ff036c] text-2xl font-semibold">Expenses</p>
          <p className="text-2xl">{formatCurrency(expenseFromThisMonth)}</p>
          <p>{thisMonthAndYear}</p>
        </div>
        <div className="border rounded w-full p-5 hover:scale-105 transition-transform duration-300">
          <p className="text-[#00ff15] text-2xl font-semibold">Savings Rate</p>
          <p className="text-2xl">{calculateSavingsRate(incomeFromThisMonth, expenseFromThisMonth).toFixed(2)}%</p>
          <p>{thisMonthAndYear}</p>
        </div>
      </div>
      <div className="flex flex-col xl:flex-row gap-5 lg:gap-10 mt-6">
        <div className="border xl:flex-2 p-5 hover:scale-102 transition-transform duration-300 overflow-hidden">
          {transactions.length === 0 ?
            <p className="text-xl sm:text-2xl lg:text-4xl mt-10">No data available yet.</p>
            : (
              <>
                <p className="text-2xl">Income vs Expenses</p>
                <div className="w-full"><BarsChart transactions={transactions} /></div>
              </>
            )}
        </div>
        <div className="border xl:flex-1 p-5 hover:scale-102 transition-transform duration-300 overflow-hidden">
          {expenseFromThisMonth === 0
            ? <p className="text-xl sm:text-2xl lg:text-4xl mt-10">No expense data for {thisMonthAndYear}.</p>
            :
            <>
              <p className="text-2xl">By Category</p>
              <div className="w-full"><PiesChart transactions={transactions} /></div>
            </>
          }
        </div>
      </div>

      {transactions.length === 0 ? (
        <p className="text-xl sm:text-2xl lg:text-4xl mt-10 text-center">No transactions yet. Add your first transaction to get started.</p>
      ) : (
        <div className="border mt-10 p-5 hover:scale-101 transition-transform duration-300">
          <div className="text-2xl">Recent Transactions</div>
          <AccountStatement transactions={transactions.slice(0, 5)} showStatus={false} />
        </div>
      )}
    </div>
  )
}