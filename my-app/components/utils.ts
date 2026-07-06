"use server"

import { prisma } from "@/lib/prisma"

export async function createUser(name: string) {
  const user = await prisma.user.create({
    data: { name },
  })

  return user
}
