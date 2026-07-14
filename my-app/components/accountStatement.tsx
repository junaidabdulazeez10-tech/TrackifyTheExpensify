import { getUsers } from "@/serverActions/user";
import { getTransaction } from "@/serverActions/transaction";

export default async function AccountStatement() {
  const transactions = await getTransaction();

  return (
    <>
      {transactions.map((value) => {
        return (
          <div key={value.id} className="flex justify-between border mt-2 p-5">
            <div className="flex gap-2">
              <div>Logo</div>
              <div className="flex flex-col">
                <div>{value.description}</div>
                <div><span>{value.category}</span> <span>Jun 1</span></div>
              </div>
            </div>
            <div className="flex flex-col">
              <div>+${value.amount}</div>
              <div>{value.status}</div>
            </div>
          </div>
        )
      })}
    </>
  )
}