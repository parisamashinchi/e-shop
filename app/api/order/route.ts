import { prisma } from "../../../lib/prismadb";
import { NextResponse } from "next/server";
import { getUser } from "@/actions/getUser";



export async function PUT(request: Request) {
  const user = await getUser();
  if(!user) return NextResponse.error();
  if ( user.role !== "ADMIN") {
    return NextResponse.error();
  }
  try {
    const body = await request.json();
    const { id, deliveryStatus } = body;

    const order = await prisma.order.update({
      where: {
        id: id,
      },
      data: { deliveryStatus },
    });
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
    );
  }
}
