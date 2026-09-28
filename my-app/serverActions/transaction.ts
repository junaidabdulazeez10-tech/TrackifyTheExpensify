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
