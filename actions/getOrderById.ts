import { prisma } from "@/lib/prismadb";
interface Params {
    orderId: string
}
export async function getOrderById(params: Params) {
    try {
        const order  = await prisma.order.findUnique({
            where:{
                id: params.orderId
            },
            
        })
        if(!order) return null;
        return order
    } catch (error: any){
        throw new Error(error)
    }
}