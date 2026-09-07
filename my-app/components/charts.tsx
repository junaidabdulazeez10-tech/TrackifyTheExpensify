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
  const data = [
    categoryAmount("Shopping"),
    categoryAmount("Others"),
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
    <BarChart width={700} height={300} data={data}>
      <CartesianGrid />
      <XAxis dataKey="category" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="amount" fill="#00ffb3" />
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
      <Pie data={data} dataKey="amount" nameKey="category" shape={CustomPieShape} />
      <Legend />
    </PieChart>
  )
}