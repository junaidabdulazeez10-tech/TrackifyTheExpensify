"use client"
import { Film, House, TrendingUp, Utensils, Car, Lightbulb, CircleEllipsis, ShoppingBag } from "lucide-react";

type Transaction = {
  id: string;
  amount: number;
  category: string;
  description: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

type TransactionsProp = {
  transactions: Transaction[];
  showStatus?: boolean;
}

const categoryIcons = {
  Income: {
    icon: TrendingUp,
    color: "#00ffb3"
  },

  Housing: {
    icon: House,
    color: "#ff036c"
  },

  Food: {
    icon: Utensils,
    color: "#00c43b"
  },

  Transportation: {
    icon: Car,
    color: "#0051ff"
  },
  Entertainment: {
    icon: Film,
    color: "#fffb00"
  },
  Shopping: {
    icon: ShoppingBag,
    color: "#d400ff"
  },
  Utilities: {
    icon: Lightbulb,
    color: "#ff6600"
  },
  Others: {
    icon: CircleEllipsis,
    color: "#ff00008e"
  }
}



export default function AccountStatement({ transactions, showStatus = true }: TransactionsProp) {

  return (
    <>
      {transactions.map((value) => {
        const { icon: Icon, color } = categoryIcons[value.category as keyof typeof categoryIcons]
        return (
          <div key={value.id} className="flex justify-between border mt-2 p-5">
            <div className="flex gap-2">
              <Icon color={color} />
              <div className="flex flex-col">
                <div>{value.description}</div>
                <div>
                  <span>{value.category}</span> · <span>{new Date(value.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              {value.type === "Income" ? <div className="text-[#00ffb3]">+${value.amount}</div> : <div className="text-[#ff036c]">-${value.amount}</div>}
              {showStatus && <div>{value.type}</div>}
            </div>
          </div>
        )
      })}
    </>
  )
}