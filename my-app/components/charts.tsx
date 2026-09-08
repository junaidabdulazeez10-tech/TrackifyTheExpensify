"use client"
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, PieSectorShapeProps, Sector, Legend } from "recharts";

const COLORS = [
  "#00ffb3",
  "#ff6384",
  "#36a2eb",
  "#ffce56",
  "#9966ff",
  "#ff9f40",
  "#4bc0c0",
];

type Transaction = {
  id: string;
  amount: number;
  category: string;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

type TransactionsProp = {
  transactions: Transaction[];
}

export function BarsChart(transactions: TransactionsProp) {

  const data = categoryAmount()

  function categoryAmount() {
    const map = new Map()

    transactions.transactions.forEach((v: Transaction) => {
      let month = v.createdAt.toLocaleDateString("en-Us", { month: "short" })
      if (map.has(month)) {
        const existing = map.get(month)
        if (v.status === "Income") {
          map.set(month, { ...existing, income: existing.income + v.amount })
        } else {
          map.set(month, { ...existing, expense: existing.expense + v.amount })
        }
      } else {
        map.set(month, { month, income: v.status === "Income" ? v.amount : 0, expense: v.status === "Expense" ? v.amount : 0 })
      }
    })

    return Array.from(map.values())
  }



  return (
    <BarChart width={1000} height={400} data={data}>
      <CartesianGrid />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="income" fill="#00ffb3"  barSize={50} />
      <Bar dataKey="expense" fill="#ff036c"  barSize={50} />
    </BarChart>
  )
}


function CustomPieShape(props: PieSectorShapeProps) {
  const { index, ...rest } = props;

  return (
    <Sector
      {...rest}
      fill={COLORS[index % COLORS.length]}
    />
  );
}

export function PiesChart(transactions: TransactionsProp) {
  const data = [
    categoryAmount("Others"),
    categoryAmount("Shopping"),
    categoryAmount("Transportation"),
    categoryAmount("Entertainment"),
    categoryAmount("Housing"),
    categoryAmount("Utilities"),
    categoryAmount("Food"),
  ]

  function categoryAmount(category: string) {
    const data = transactions.transactions.filter((v: Transaction) => v.category === category).reduce((sum, v) => sum + v.amount, 0)
    return {
      category,
      amount: data
    }
  }
  return (
    <PieChart width={500} height={300} >
      <Tooltip />
      <Pie data={data} dataKey="amount" nameKey="category" innerRadius={60}
        outerRadius={100} shape={CustomPieShape} />
      <Legend />
    </PieChart>
  )
}