import AddBudgetForm from "@/components/addBudgetForm";
import { createBudget, getBudgets } from "@/serverActions/budget";
import { TransactionType } from "@prisma/client";
import { Car, CircleEllipsis, Film, House, Lightbulb, ShoppingBag, Utensils } from "lucide-react";

export default async function Budgets() {

  const hi = await getBudgets()

  const spent = 2500
  const budget = 3000
  const percentage = Math.floor((spent / budget) * 100)
  console.log(hi.map((v) => {
    const data = { category: v.category, amount: v.amount }
    return data
  }))

  async function createBudgetData(category: TransactionType, amount: number) {
    await createBudget({ category, amount })
  }

  const budgets = [
    { category: "Food", budget: 500 },
    { category: "Shopping", budget: 300 },
    { category: "Transportation", budget: 200 },
    { category: "Entertainment", budget: 150 },
    { category: "Housing", budget: 1000 },
    { category: "Utilities", budget: 250 },
    { category: "Others", budget: 600 },
  ]

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
        <div className="flex justify-between">
          <div><span className="text-4xl font-semibold">$2,500</span>/<span className="text-2xl">$3,000</span></div>
          <AddBudgetForm category="Monthly Budget"></AddBudgetForm>
          <div className="flex flex-col text-right">
            <div className="text-2xl">${budget - spent}</div>
            <div>remaining</div>
          </div>
        </div>
        <div className="w-full bg-gray-400 rounded-full h-3 mt-2 mb-2">
          <div
            className="bg-[#00c43ba2] h-3 rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p>{percentage}% of budget used</p>
      </div>

      <div className="grid grid-cols-4 gap-10 mt-5">
        {budgets.map((budget, index) => {
          const Icon = categoryIcons[budget.category as keyof typeof categoryIcons] || CircleEllipsis;

          return (
            <div key={budget.category} className={`border p-5 col-span-2 ${index === budgets.length - 1 ? "col-start-2" : ""
              }`}>
              <div className="flex gap-1">
                <Icon color={COLORS[index % COLORS.length]} />
                <span>{budget.category}</span>
                <div className="ml-auto">{percentage}%</div> {/*here you put the percentage this is wrong right now*/}
              </div>
              <div className="w-full bg-gray-400 rounded-full h-3 mt-2 mb-2">
                <div
                  className="bg-green-700 h-3 rounded-full"
                  style={{ width: `${percentage}%`, backgroundColor: COLORS[index % COLORS.length] }}
                />
              </div>
              <div className="flex items-center justify-between gap-2">
                <div>$2000 spent</div> {/*here you put the what you spent this is wrong right now*/}
                <AddBudgetForm category={budget.category} />
                <div className="font-semibold">${budget.budget}</div> {/*here you put the what left so you do the budget minus waht you spent this is wrong right now*/}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}