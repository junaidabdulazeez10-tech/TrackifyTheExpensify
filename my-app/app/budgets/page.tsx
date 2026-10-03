import AddBudgetForm from "@/components/addBudgetForm";
import { getBudgets } from "@/serverActions/budget";
import { getTransactions } from "@/serverActions/transaction";
import { Car, CircleEllipsis, Film, House, Lightbulb, ShoppingBag, Utensils } from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { formatCurrency, calculateMonthlyTotalByType, calculateCategorySpending, calculatePercentage, calculateRemaining } from "@/lib/calculations";

export default async function Budgets() {

  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/login")
  }

  const allBudgets = await getBudgets()
  const transactions = await getTransactions()

  const date = new Date();
  const thisMonthAndYear = date.toLocaleDateString("en-US", { month: "short", year: "numeric" });

  const monthlySpending = calculateMonthlyTotalByType(transactions, "Expense", thisMonthAndYear)
  const monthlyBudget = allBudgets.find((v) => v.category === "Monthly Budget")

  const percentage = calculatePercentage(monthlySpending, monthlyBudget?.amount ?? 0);
  const remaining = calculateRemaining(monthlyBudget?.amount ?? 0, monthlySpending)



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
    <div className="mx-3 sm:mx-5">
      <div className="border rounded p-5">
        <p>Monthly Budget</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div>
            <span className="text-2xl sm:text-3xl lg:text-4xl font-semibold">{formatCurrency(monthlySpending)}</span>/
            <span className="text-lg sm:text-xl lg:text-2xl">{formatCurrency(monthlyBudget?.amount ?? 0)}</span>
          </div>

          <div className="flex justify-start md:justify-center self-start">
            <AddBudgetForm category="Monthly Budget" hasAmount={monthlyBudget?.amount} />
          </div>

          <div className="flex flex-col text-left md:text-right">
            <div className="font-semibold">{!monthlyBudget ? "No Budget Set" : remaining < 0 ? formatCurrency(Math.abs(remaining)) + " Over budget" : "Remaining: " + formatCurrency(remaining)}</div>
          </div>
        </div>
        <div className="w-full bg-gray-400 rounded-full h-3 mt-2 mb-2">
          <div
            className="bg-[#00c43ba2] h-3 rounded-full"
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
        <p>{!monthlyBudget ? "No Budget Set" : `${percentage}% of budget used`}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-10 mt-5">
        {Object.entries(categoryIcons).map(([category, Icon], index) => {

          const budgets = allBudgets.find((v) => v.category === category)
          const monthlyCategorySpending = calculateCategorySpending(transactions, "Expense", category, thisMonthAndYear)

          const percentage = calculatePercentage(monthlyCategorySpending, budgets?.amount ?? 0);

          const remaining = calculateRemaining(budgets?.amount ?? 0, monthlyCategorySpending)

          return (
            <div key={category} className="border p-5">
              <div className="flex gap-1">
                <Icon color={COLORS[index % COLORS.length]} />
                <span>{category}</span>
                <div className="ml-auto">{!budgets ? "—" : `${percentage}%`}</div>
              </div>
              <div className="w-full bg-gray-400 rounded-full h-3 mt-2 mb-2">
                <div className="bg-green-700 h-3 rounded-full"
                  style={{ width: `${Math.min(percentage, 100)}%`, backgroundColor: COLORS[index % COLORS.length] }}
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>Spent: {formatCurrency(monthlyCategorySpending)}</div>
                <AddBudgetForm category={category} hasAmount={budgets?.amount} />
                <div className="font-semibold">{!budgets ? "No Budget Set"
                  : remaining < 0 ? formatCurrency(Math.abs(remaining)) + " Over budget" : "Remaining: " + formatCurrency(remaining)}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

