"use server"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

type createBudgetProps = {
  category: string;
  amount: number;
}


export async function createOrUpdateBudget({category, amount}: createBudgetProps) {

  const session = await auth.api.getSession({
    headers: await headers()
  });

  if(!session) {
    throw new Error("Unauthorized");
  }

  const validCategorys = ["Monthly Budget", "Food", "Housing", "Shopping", "Transportation", "Entertainment", "Utilities", "Others"]
  if(!validCategorys.includes(category)) {
    throw new Error("Invalid category");
  } else if(amount <= 0 || Number.isNaN(amount)) {
    throw new Error("Amount must be a positive number");
  }

  const budget = await prisma.budget.upsert({
    create: {
      category, 
      amount,
      userId: session.user.id
    },
    update: {
      amount,
    }, 
    where: {
      userId_category: {
        category,
        userId: session.user.id
      }
    }
  })
  revalidatePath("/budgets")

  return budget
}

export async function getBudgets() {

  const session = await auth.api.getSession({
    headers: await headers()
  });

  if(!session) {
    throw new Error("Unauthorized");
  }

  return await prisma.budget.findMany({
    where: {
      userId: session.user.id
    }
  })
}