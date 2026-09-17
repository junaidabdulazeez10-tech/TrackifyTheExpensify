"use server"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache";

type createBudgetProps = {
  category: string;
  amount: number;
}


export async function createOrUpdateBudget({category, amount}: createBudgetProps) {
  const budget = await prisma.budget.upsert({
    create: {
      category, 
      amount
    },
    update: {
      amount
    }, 
    where: {
      category
    }
  })
  revalidatePath("/budgets")

  return budget
}

export async function getBudgets() {
  return await prisma.budget.findMany()
}