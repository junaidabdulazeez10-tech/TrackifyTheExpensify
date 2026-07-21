"use client"
import { Film, House, TrendingDown, TrendingUp, Utensils, Car, Lightbulb, CircleEllipsis, ShoppingBag } from "lucide-react";

type Transaction = {
  id: string;
  amount: number;
  category: string;
  description: string;
  status: string;
}

type TransactionsProp = {
  transactions: Transaction[];
}

const categoryIcons = {
  Income: TrendingUp,
  Housing: House,
  Food: Utensils,
  Transportation: Car,
  Entertainment: Film,
  Shopping: ShoppingBag,
  Utilities: Lightbulb,
  Others: CircleEllipsis
}

export default function AccountStatement({transactions} : TransactionsProp) {

  return (
    <>
      {transactions.map((value) => {
        const Icon = categoryIcons[value.category as keyof typeof categoryIcons]
        return (
          <div key={value.id} className="flex justify-between border mt-2 p-5">
            <div className="flex gap-2">
              <Icon />
              <div className="flex flex-col">
                <div>{value.description}</div>
                <div><span>{value.category}</span> · <span>Jun 1</span></div>
              </div>
            </div>
            <div className="flex flex-col">
              {value.status === "Income" ? <div>+${value.amount}</div> : <div>-${value.amount}</div> }
              <div>{value.status}</div>
            </div>
          </div>
        )
      })}
    </>
  )
}