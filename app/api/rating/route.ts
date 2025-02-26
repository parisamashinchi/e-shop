import { NextResponse } from "next/server";
import { getUser } from "@/actions/getUser";
import { prisma } from "@/lib/prismadb";

export  async function POST(req: Request) {
  const user = await getUser();

  if (!user) {
    return NextResponse.error();
  }
  const body = await req.json();
  const { rating : rating, comment, product, userId } = body;

  try {
    const review = await prisma.review.create({
      data: {
        rating,
        comment,
        userId,
        productId: product.id
      },
    });
   
    return NextResponse.json(review);
  } catch (error) {
    return NextResponse.json(error);
  }
}
