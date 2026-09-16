"use server"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache";

type createBudgetProps = {
  category: string;
  amount: number;
}


export async function createBudget(createBudgetProps: createBudgetProps) {
  const budget = prisma.budget.create({
    data: createBudgetProps
  })
  revalidatePath("/budgets")

  return budget
}

export async function getBudgets() {
  return await prisma.budget.findMany()
}