import { prisma } from "@/lib/prismadb";

export async function getUsers() {
  try {
    const users = await prisma.user.findMany({});
    return users;
  } catch (error: any) {
    throw new Error(error);
  }
}
