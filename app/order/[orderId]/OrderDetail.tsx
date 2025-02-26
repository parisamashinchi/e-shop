"use client";
import { Order } from "@prisma/client";
import Heading from "@/app/components/Heading";
import { formatPrice } from "@/utils/formatPrice";
import moment from "moment";
import Image from "next/image";

interface OrderDetailProps {
  order: Order;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ order }) => {
  return (
    <div className="w-[1200px] flex flex-col m-auto gap-3">
      <Heading title="Order Detail" />
      <div><b>Order ID:</b> {order.id}</div>
      <div>
        <b>Total amount :{" "}</b>
        <span className="font-bold">{formatPrice(order.amount)}</span>
      </div>
      <div><b>Payment Status:</b> {order.status}</div>
      <div><b>Delivery Status:</b> {order.deliveryStatus}</div>
      <div><b>Date:</b> {moment(order.createdAt).fromNow()}</div>

      <div className="grid grid-cols-5  gap-2 items-center font-bold mt-5">
        <div className="col-span-2 justify-self-start">Product</div>
        <div className="justify-self-center">Price</div>
        <div className="justify-self-center">Qty</div>
        <div className="justify-self-end">Total</div>
      </div>
      {order.products.map((item) => {
        return (
          <div key={item.id} className="grid grid-cols-5  gap-2 items-center pt-5 border-t-gray-200 border-t-2">
            <div className="col-span-2 justify-self-start flex  gap-3 justify-between">
              <div className="w-[50px] relative aspect-square">
                <Image
                  src={item.selectedImg.image}
                  alt={item.name}
                  className="object-contain"
                  fill
                />
              </div>
              <div className="flex flex-col gap-2">
                <p>{item.name}</p>
                <p>{item.selectedImg.color}</p>
              </div>
            </div>
            <div className="justify-self-center">{formatPrice(item.price)}</div>
            <div className="justify-self-center">{item.quantity}</div>
            <div className="justify-self-end font-bold">
              {formatPrice(+(item.price * item.quantity).toFixed(2))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderDetail;
