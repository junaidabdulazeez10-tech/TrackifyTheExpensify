import AccountStatement from "@/components/accountStatement";
import TransactionFilter from "@/components/TransactionFilter";
import { getTransaction } from "@/serverActions/transaction";


export default async function Transactions() {

  const transactions = await getTransaction();

  const totalOut = transactions.filter((value) => value.status === "Expense").reduce((sum, value) => sum + value.amount, 0);
  const totalIn = transactions.filter((value) => value.status === "Income").reduce((sum, value) => sum + value.amount, 0);
  return (
    <div className="p-5">
      <div className="flex justify-between gap-5">
        <div className=" border w-full p-5">
          <div>Total In</div>
          <div>+${totalIn}</div>
        </div>
        <div className=" border w-full p-5">
          <div>Total Out</div>
          <div>-${totalOut}</div>
        </div>
      </div>
      <TransactionFilter transactions={transactions} />
    </div>
  )
}