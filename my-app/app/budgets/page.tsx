import AddBudgetForm from "@/components/addBudgetForm";
import { getBudgets } from "@/serverActions/budget";
import { getTransactions } from "@/serverActions/transaction";
import { Car, CircleEllipsis, Film, House, Lightbulb, ShoppingBag, Utensils } from "lucide-react";

export default async function Budgets() {

  const allBudgets = await getBudgets()
  const Transactions = await getTransactions()

  const date = new Date();
  const thisMonth = date.toLocaleDateString("en-Us", { month: "short" })

  const monthlySpending = Transactions.filter((v) => v.createdAt.toLocaleDateString("en-Us", { month: "short" }) === thisMonth)
    .filter((v) => v.type === "Expense").reduce((sum, v) => sum + v.amount, 0)
  const monthlybudget = allBudgets.find((v) => v.category === "Monthly Budget")
  let percentage;

  if (!monthlybudget) {
    percentage = 0;
  } else {
    percentage = Math.floor(monthlySpending / (monthlybudget.amount) * 100)
  }
  const remaining = (monthlybudget?.amount === undefined ? 0 : monthlybudget?.amount) - monthlySpending



  const COLORS = [
    "#00e1ff",
    "#d400ff",
    "#0051ff",
    "#fffb00",
    "#ff036c",
    "#ff6600",
    "#ff00008e",

  ];

  const categoryIcons = {
    Housing: House,
    Food: Utensils,
    Transportation: Car,
    Entertainment: Film,
    Shopping: ShoppingBag,
    Utilities: Lightbulb,
    Others: CircleEllipsis
  }



  return (
    <div className="mr-5 ml-5">
      <div className="border rounded p-5">
        <p>Monthly Budget</p>
        <div className="grid grid-cols-3 items-center">
          <div>
            <span className="text-4xl font-semibold">{monthlySpending}</span>/
            <span className="text-2xl">${monthlybudget?.amount}</span>
          </div>

          <div className="flex justify-center self-start">
            <AddBudgetForm category="Monthly Budget" hasAmount={monthlybudget?.amount} />
          </div>

          <div className="flex flex-col text-right">
            <div className="text-2xl">{remaining < 0 ? "$" + Math.abs(remaining) + " Over budget" : "$" + remaining }</div>
            <div>remaining</div>
          </div>
        </div>
        <div className="w-full bg-gray-400 rounded-full h-3 mt-2 mb-2">
          <div
            className="bg-[#00c43ba2] h-3 rounded-full"
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
        <p>{percentage}% of budget used</p>
      </div>

      <div className="grid grid-cols-4 gap-10 mt-5">
        {Object.entries(categoryIcons).map(([category, Icon], index) => {

          const budgets = allBudgets.find((v) => v.category === category)
          const monthlyCategorySpending = Transactions.filter((v) => v.createdAt.toLocaleDateString("en-Us", { month: "short" }) === thisMonth)
            .filter((v) => v.type === "Expense").filter((v) => v.category === category).reduce((sum, v) => sum + v.amount, 0)

          let percentage;
          if (!budgets) {
            percentage = 0;
          } else {
            percentage = Math.floor((monthlyCategorySpending / budgets.amount) * 100)
          }

          const remaining = (budgets?.amount ?? 0) - monthlyCategorySpending

          return (
            <div key={category} className={`border p-5 col-span-2 ${index === Object.entries(categoryIcons).length - 1 ? "col-start-2" : ""}`}>
              <div className="flex gap-1">
                <Icon color={COLORS[index % COLORS.length]} />
                <span>{category}</span>
                <div className="ml-auto">{percentage}%</div>
              </div>
              <div className="w-full bg-gray-400 rounded-full h-3 mt-2 mb-2">
                <div className="bg-green-700 h-3 rounded-full"
                  style={{ width: `${Math.min(percentage, 100)}%`, backgroundColor: COLORS[index % COLORS.length] }}
                />
              </div>
              <div className="flex items-center justify-between gap-2">
                <div>Spent: ${monthlyCategorySpending}</div>
                <AddBudgetForm category={category} hasAmount={budgets?.amount} />
                <div className="font-semibold">{remaining < 0 ? "$" + Math.abs(remaining) + " Over budget" : "Remaining: $" + remaining}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

