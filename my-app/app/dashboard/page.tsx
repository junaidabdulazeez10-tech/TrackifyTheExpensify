import AccountStatement from "@/components/accountStatement";
import { getTransaction } from "@/serverActions/transaction";
import {BarsChart, PiesChart} from "@/components/charts";

export default async function Dashboard() {
   const transactions = await getTransaction();

   const date = new Date();
   const thisMonth = date.toLocaleDateString("en-Us", { month: "short" })

    const incomeFromThisMonth = transactions
   .filter((v) => v.createdAt.toLocaleDateString("en-Us", {month: "short"}) === thisMonth)
   .filter((v) => v.status === "Income").reduce((sum, value) => sum + value.amount, 0)
   
   const expenseFromThisMonth = transactions
   .filter((v) => v.createdAt.toLocaleDateString("en-Us", {month: "short"}) === thisMonth)
   .filter((v) => v.status === "Expense").reduce((sum, value) => sum + value.amount, 0)

   const income = transactions.filter((value) => value.status === "Income").reduce((sum, value) => sum + value.amount, 0)
   const expense = transactions.filter((value) => value.status === "Expense").reduce((sum, v) => sum + v.amount, 0)
   const balance = income - expense;


   
  
  return (
    <div className="mr-5 ml-5">
      <div className="flex justify-between gap-10">
        <div className="border rounded w-full p-5 hover:scale-105 transition-transform duration-300">
          <p>Total Balance</p>
          <p className="text-2xl">${balance}</p>
          <p>{thisMonth}</p>
        </div>
         <div className="border rounded w-full p-5 hover:scale-105 transition-transform duration-300">
          <p className="text-[#00ffb3] text-2xl font-semibold">Income</p>
          <p className="text-2xl">${incomeFromThisMonth}</p>
          <p>{thisMonth}</p>
        </div>
         <div className="border rounded w-full p-5 hover:scale-105 transition-transform duration-300">
          <p className="text-[#ff036c] text-2xl font-semibold">Expenses</p>
          <p className="text-2xl">${expenseFromThisMonth}</p>
          <p>{thisMonth}</p>
        </div>
         <div className="border rounded w-full p-5 hover:scale-105 transition-transform duration-300">
          <p>Savings Rate</p>
          <p className="text-2xl">$3003</p>
          <p>{thisMonth}</p>
        </div>
      </div>
      <div className="flex gap-10 mt-6">
        <div className="border flex-2 p-5 hover:scale-102 transition-transform duration-300 ">
          <p className="text-2xl">Income vs Expenses</p>
          <div className="flex justify-center"><BarsChart transactions={transactions} /></div>
        </div>
        <div className="border flex-1 p-5 hover:scale-102 transition-transform duration-300 ">
          <p className="text-2xl">By Catergory</p>
          <div className="flex justify-center"><PiesChart transactions={transactions}  /></div>
        </div>
      </div>
      <div className="border mt-10 p-5 hover:scale-101 transition-transform duration-300">
        <div className="text-2xl">Recent Transactions</div>
        <AccountStatement transactions={transactions.slice(0, 5)} />
      </div>
    </div>
  )
}