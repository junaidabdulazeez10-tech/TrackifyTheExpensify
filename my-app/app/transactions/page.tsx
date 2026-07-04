import AccountStatement from "@/components/accountStatement";

export default function Transactions() {
  return (
    <div className="p-5">
      <div className="flex justify-between gap-5">
        <div className=" border w-full p-5">
          <div>Total In</div>
          <div>+$232</div>
        </div>
        <div className=" border w-full p-5">
          <div>Total In</div>
          <div>+$232</div>
        </div>
      </div>
      <div className="flex gap-4 mt-5">
        <button className="border p-3">All</button>
        <button className="border p-3">Income</button>
        <button className="border p-3">Expense</button>
      </div>
      <div className="border mt-5 p-5">
        <div>Transactions: </div>
        <AccountStatement />
      </div>
    </div>
  )
}