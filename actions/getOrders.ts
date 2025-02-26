import { prisma } from "@/lib/prismadb";

export async function getOrders() {
    try {
        const orders  = await prisma.order.findMany({
            include:{
                user: true
            },
            orderBy:{
                createdAt: 'desc'
            }
            
        })
        return orders
    } catch (error: any){
        throw new Error(error)
    }
}