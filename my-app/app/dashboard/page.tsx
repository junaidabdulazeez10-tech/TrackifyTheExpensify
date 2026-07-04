import AccountStatement from "@/components/accountStatement";

export default function Dashboard() {
  return (
    <div className="mr-5 ml-5">
      <div className="flex justify-between gap-10">
        <div className="border rounded w-full p-5">
          <p>Balance</p>
          <p>$3003</p>
          <p>this month</p>
        </div>
         <div className="border rounded w-full p-5">
          <p>Balance</p>
          <p>$3003</p>
          <p>this month</p>
        </div>
         <div className="border rounded w-full p-5">
          <p>Balance</p>
          <p>$3003</p>
          <p>this month</p>
        </div>
         <div className="border rounded w-full p-5">
          <p>Balance</p>
          <p>$3003</p>
          <p>this month</p>
        </div>
      </div>
      <div className="flex justify-between gap-10 mt-6">
        <div className="border w-full p-5 ">
          <p>Income vs Expensives</p>
          <div>chart</div>
        </div>
        <div className="border w-full p-5 ">
          <p>By Catergory</p>
          <div>chart</div>
        </div>
      </div>
      <div className="border mt-10 p-5">
        <div>Recent Transactions</div>
        <AccountStatement />
      </div>
    </div>
  )
}