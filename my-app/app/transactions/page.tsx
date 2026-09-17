import AccountStatement from "@/components/accountStatement";
import TransactionFilter from "@/components/TransactionFilter";
import { getTransactions } from "@/serverActions/transaction";


export default async function Transactions() {

  const transactions = await getTransactions();


  const date = new Date();
  const thisMonth = date.toLocaleDateString("en-Us", { month: "short"})
  const thisYear = date.toLocaleDateString("en-Us", { year: "numeric" })

  const totalIn = transactions
    .filter((v) => v.createdAt.toLocaleDateString("en-Us", { month: "short" }) === thisMonth)
    .filter((v) => v.type === "Income").reduce((sum, value) => sum + value.amount, 0)

  const totalOut = transactions
    .filter((v) => v.createdAt.toLocaleDateString("en-Us", { month: "short" }) === thisMonth)
    .filter((v) => v.type === "Expense").reduce((sum, value) => sum + value.amount, 0)

  return (
    <div className="mr-5 ml-5">
      <div className="mb-5 ">{thisMonth} {thisYear}</div>
      <div className="flex justify-between gap-5">
        <div className=" border w-full p-5">
          <div className="text-[#00ffb3]" >Total In</div>
          <div className="text-2xl text-[#00ffb3]">+${totalIn}</div>
        </div>
        <div className=" border w-full p-5">
          <div className="text-[#00ffea]" >Remaining For This Month</div>
          <div className="text-2xl text-[#00ffea]">${totalIn - totalOut}</div>
        </div>
        <div className=" border w-full p-5">
          <div className="text-[#ff036c]" >Total Out</div>
          <div className="text-2xl text-[#ff036c]">-${totalOut}</div>
        </div>
      </div>
      <TransactionFilter transactions={transactions} />
    </div>
  )
}