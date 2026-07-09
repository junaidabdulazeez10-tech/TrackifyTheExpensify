"use server"

import { prisma } from "@/lib/prisma"

export async function createUser(name: string) {
  const user = await prisma.user.create({
    data: { name },
  })
  return user
}

export async function getUsers() {
  const user = await prisma.user.findMany()
  return user
}
