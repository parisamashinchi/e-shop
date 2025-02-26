import { prisma } from "@/lib/prismadb"

interface IParams {
    userId: string
}

export default async function getOrderByUser(params:IParams) {
    
    try {
        const orders = await prisma.order.findMany({
            include:{
                user: true
            },
            where:{
                userId: params.userId
            }
        })
        if(!orders) return null
        return orders
    } catch (error) {
        throw new Error(String(error))
    }
}