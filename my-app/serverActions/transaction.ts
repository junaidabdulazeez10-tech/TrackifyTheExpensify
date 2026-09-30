"use server"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache";
import { TransactionType } from "@prisma/client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

type CreateTransactionProps = {
  amount: number;
  category: string;
  description: string;
  type: TransactionType;
}



export async function createTransaction(createTransactionProps: CreateTransactionProps) {

  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const { amount, category, description, type } = createTransactionProps;
  const allowedCategories = ["Income", "Food", "Housing", "Shopping", "Transportation", "Entertainment", "Utilities", "Others"];

  if (!category.trim() || !description.trim()) {
      throw new Error("Please fill in all fields");
    } else if (amount <= 0 || Number.isNaN(amount)) {
      throw new Error("Amount must be a positive number");
    } else if (type !== "Income" && type !== "Expense") {
      throw new Error("Invalid transaction type");
    } else if (!allowedCategories.includes(category)) {
      throw new Error("Invalid category");
    } else if (type === "Income" && category !== "Income") {
      throw new Error("Income transactions must have the category 'Income'");
    } else if (type === "Expense" && category === "Income") {
      throw new Error("Expense transactions cannot have the category 'Income'");
    } 

  const transaction = await prisma.transaction.create({
    data: {
      ...createTransactionProps,
      userId: session.user.id
    }
  })
  revalidatePath("/transactions")
  revalidatePath("/dashboard")
  return transaction
}

export async function getTransactions() {

  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  return (await prisma.transaction.findMany(
    {
      where: {
        userId: session.user.id
      },
      orderBy: {
        createdAt: "desc"
      }
    }
  ))
}
