"use server"

import { prisma } from "@/lib/prisma"

type CreateUserProps = {
  name: string;
  email: string;
  password: string;
}

export async function createUser(createUserProps: CreateUserProps) {
  const user = await prisma.user.create({
    data: createUserProps
  })
  return user
}

export async function getUsers() {
  const user = await prisma.user.findMany()
  return user
}
