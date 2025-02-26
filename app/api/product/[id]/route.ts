import { prisma } from "../../../../lib/prismadb";
import { NextResponse } from "next/server";
import { getUser } from "@/actions/getUser";

export async function DELETE(request: Request, { params }: { params: { id: string } }
) {
  const user = await getUser();
  if(!user) return NextResponse.error();
  if (user.role !== "ADMIN") {
    return NextResponse.error();
  }

  try {
    await prisma.review.deleteMany({
      where: { productId: params.id },
    });

    const updateProduct = await prisma.product.delete({
      where: { id: params.id },
    });
    return NextResponse.json(updateProduct);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
