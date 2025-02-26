import { authOptions } from "@/app/api/auth/[...nextauth]/authOption";
import { getServerSession } from "next-auth";
import {prisma} from '@/lib/prismadb';

export async function getSession() {
const session = await getServerSession(authOptions);
  return session;
}

export async function getUser() {
  const session = await getSession();
  try{
    if (!session?.user?.email) {
        return null;
      }
      const user = await prisma.user.findUnique({
        where: {email : session.user.email}
      })
      if(!user){
        return null
      }
      return {
        ...user,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
        emailVerified: user.emailVerified?.toDateString() || null,
      }
  } catch(e) {
    return null;
  }
 
}
