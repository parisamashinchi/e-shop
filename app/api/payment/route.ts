import stripe from "stripe";
import { NextResponse } from "next/server";
import { CartProductType } from "@/app/product/[productId]/ProductDetail";
import { getUser } from "@/actions/getUser";
import { prisma } from "@/lib/prismadb";

const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-02-24.acacia",
});

const totalAmount = (cart: CartProductType[]) => {
  const total = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
  const price = Math.floor(total * 100);
  return price;
};

export async function POST(req: Request, res: Response) {
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 401 });
  }
  const body = await req.json();
  const { items, payment_intent_id } = body;
  const amount = totalAmount(items);

  const orderInfo = {
    user: { connect: { id: user.id } },
    amount,
    products: items,
    paymentIntentId: payment_intent_id,
    status: "pending",
    deliveryStatus: "pending",
    currency: "usd",
  };

  // if (payment_intent_id) {
  //   const currentIntent = await stripeInstance.paymentIntents.retrieve(
  //     payment_intent_id
  //   );
  //   if (currentIntent) {
  //     const updateIntent = await stripeInstance.paymentIntents.update(
  //       payment_intent_id,
  //       {
  //         amount: amount * 100,
  //       }
  //     );
  //     const [existingOrder, updateOrder] = await Promise.all([
  //       prisma.order.findFirst({
  //         where: {
  //           paymentIntentId: payment_intent_id,
  //         },
  //       }),
  //       prisma.order.updateMany({
  //         where: {
  //           paymentIntentId: payment_intent_id,
  //         },
  //         data: {
  //           amount: amount,
  //           products: items,
  //         },
  //       }),
  //     ]);

  //     if (!existingOrder) {
  //       return NextResponse.json({ error: "Invalid payment intent" }, { status: 404 });
  //     }

  //     return NextResponse.json({ paymentIntent: updateIntent });
  //   }
  // } else {
    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });
    const paymentIntentId = payment_intent_id ? payment_intent_id : paymentIntent.id;
    await prisma.order.create({
      data: orderInfo,
    });
    return NextResponse.json({ 
      paymentIntent: {
        id: paymentIntent.id,
        client_secret: paymentIntent.client_secret,
      } 
    });
    // return NextResponse.json({ paymentIntentId });
  // }

  return NextResponse.json(
    { error: "Payment intent not found" },
    { status: 404 }
  );
}
