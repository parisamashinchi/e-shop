"use client";
import { useContext } from "react";
import { formatPrice } from "@/utils/formatPrice";
import { CartProductType } from "../product/[productId]/ProductDetail";
import Link from "next/link";
import Image from "next/image";
import { truncate } from "../../utils/truncate";
import SetQuantity from "../components/products/SetQuantity";
import useCart from "@/hooks/useCart";

interface ItemContentProps {
  item: CartProductType;
}
const ItemContent: React.FC<ItemContentProps> = ({ item }) => {
  const {
    handleRemoveProductFromCart,
    handleCartQtyDecrease,
    handleCartQtyIncrease,
  } = useCart();
  return (
    <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200 items-center py-4">
      <div className="col-span-2 justify-self-start flex gap-2">
        <Link href={`/product/${item.id}`}>
          <div className="relative w-[60px] aspect-square">
            <Image fill src={item.selectedImg.image} alt={item.name} />
          </div>
        </Link>
        <div className="flex flex-col ">
          <Link href={`/product/${item.id}`}>{truncate(item.name)}</Link>
          <div>{item.selectedImg.color}</div>
          <div className="w-[60px]">
            <button
              className="underline"
              onClick={() => handleRemoveProductFromCart(item)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      <div>{formatPrice(item.price)}</div>
      <SetQuantity
        cartCounter={true}
        cartProduct={item}
        handleQtyDecrease={() => handleCartQtyDecrease(item)}
        handleQtyIncrease={() => handleCartQtyIncrease(item)}
      />

      <div>{formatPrice(item.price * item.quantity)}</div>
    </div>
  );
};

export default ItemContent;
