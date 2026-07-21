"use server"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache";

type CreateTransactionProps = {
  amount: number;
  category: string;
  description: string;
  status: string;
}

export async function createTransaction(createTransactionProps: CreateTransactionProps) {
  const transaction = prisma.transaction.create({
    data: createTransactionProps
  })
  revalidatePath("/transactions")
  revalidatePath("/dashboard")
  return transaction
}

export async function getTransaction() {
  return await prisma.transaction.findMany()
}
