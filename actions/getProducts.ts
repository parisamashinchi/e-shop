import { prisma } from "@/lib/prismadb";

export interface ProductParams {
  searchTerm?: string | null;
  category?: string | null;
}
export default async function getProducts(params: ProductParams) {
  try {
    const { searchTerm, category } = params;

    let query: any = {};

    if (category && category !== "All") {
      query.category = category;
    }

    if (searchTerm) {
      query.OR = [
        {
          name: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
      ];
    }

    const products = await prisma.product.findMany({
      where: query,
      include: {
        reviews: {
          include: {
            user: true,
          },
        },
      }
    });
    return products;
  } catch (error: any) {
    throw new Error(error);
  }
}
