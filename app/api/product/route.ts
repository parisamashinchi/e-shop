import { prisma } from "../../../lib/prismadb";
import { NextResponse } from "next/server";
import { getUser } from "@/actions/getUser";

export async function POST(request: Request) {
  const user = await getUser();
  if(!user) return NextResponse.error();
  if (user.role !== "ADMIN") {
    return NextResponse.error();
  }

  try {
    const body = await request.json();
    const { name, description, price, brand, category, inStock, images } = body;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        brand,
        category,
        images,
        inStock,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const user = await getUser();
  if(!user) return NextResponse.error();
  if (user.role !== "ADMIN") {
    return NextResponse.error();
  }
  try {
    const body = await request.json();
    const { id, inStock } = body;

    const updateProduct = await prisma.product.update({
      where: {
        id: id,
      },
      data: { inStock },
    });
    return NextResponse.json(updateProduct);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
    );
  }
}
