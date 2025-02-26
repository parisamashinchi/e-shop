import { prisma } from "@/lib/prismadb";

export default async function getProductById(productId: string) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        reviews: {
          include: {
            user: true,
          },
        },
      },
    });
    if (!product) return null;
    return product;
  } catch (error) {
    throw new Error(String(error));
  }
}
