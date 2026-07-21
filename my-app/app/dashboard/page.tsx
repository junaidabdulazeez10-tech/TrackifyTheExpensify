import AccountStatement from "@/components/accountStatement";
import { getTransaction } from "@/serverActions/transaction";

export default async function Dashboard() {
   const transactions = await getTransaction();
   const income = transactions.filter((value) => value.status === "Income").reduce((sum, value) => sum + value.amount, 0)
   const expense = transactions.filter((value) => value.status === "Expense").reduce((sum, v) => sum + v.amount, 0)
   const balance = income - expense;
  return (
    <div className="mr-5 ml-5">
      <div className="flex justify-between gap-10">
        <div className="border rounded w-full p-5">
          <p>Balance</p>
          <p>${balance}</p>
          <p>this month</p>
        </div>
         <div className="border rounded w-full p-5">
          <p>Income</p>
          <p>${income}</p>
          <p>this month</p>
        </div>
         <div className="border rounded w-full p-5">
          <p>Expenses</p>
          <p>${expense}</p>
          <p>this month</p>
        </div>
         <div className="border rounded w-full p-5">
          <p>Savings Rate</p>
          <p>$3003</p>
          <p>this month</p>
        </div>
      </div>
      <div className="flex justify-between gap-10 mt-6">
        <div className="border w-full p-5 ">
          <p>Income vs Expenses</p>
          <div>chart</div>
        </div>
        <div className="border w-full p-5 ">
          <p>By Catergory</p>
          <div>chart</div>
        </div>
      </div>
      <div className="border mt-10 p-5">
        <div>Recent Transactions</div>
        <AccountStatement transactions={transactions} />
      </div>
    </div>
  )
}