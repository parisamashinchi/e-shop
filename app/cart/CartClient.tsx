"use client";
import Link from "next/link";
import { useContext } from "react";
import { MdArrowBack } from "react-icons/md";
import { CartContext } from "@/context/CartContext";
import Heading from "../components/products/Heading";
import { CartProductType } from "../product/[productId]/ProductDetail";
import Button from "../components/Button";
import ItemContent from "./ItemContent";
import { formatPrice } from "../../utils/formatPrice";

const CartClient = () => {
  const { cartProducts, handleClearCart, cartTotalAmount } =
    useContext(CartContext);

  if (!cartProducts && cartProducts?.length === 0) {
    return (
      <div className="flex flex-col gap-2">
        <div>
          <p className="text-2xl">Your cart is empty</p>
        </div>
        <Link href="/" className="flex items-center gap-1">
          <MdArrowBack />
          <span>shop something</span>
        </Link>
      </div>
    );
  }
  return (
    <>
      <Heading title="Shopping cart" />
      <div className="grid grid-cols-5 gap-2 mt-5">
        <div className="col-span-2 justify-start">PRODUCT</div>
        <div className="justify-center">PRICE</div>
        <div className="justify-center">QUANTITY</div>
        <div className="justify-end">TOTAL</div>
      </div>
      {cartProducts &&
        cartProducts.map((product: CartProductType) => {
          return <ItemContent key={product.id} item={product} />;
        })}
      <div className="border-t-[1px] border-slate-300 pb-2 flex justify-between gap2 mt-2">
        <div className="mt-10">
          <Button outline label="clear cart" onClick={handleClearCart} />
        </div>
        <div className="text-sm flex flex-col items-start gap1 mt-10">
          <div className="flex justify-between w-full font-semibold">
            <span>Subtotal</span>
            <span>{formatPrice(cartTotalAmount)}</span>
          </div>
          <p className="text-slate-500 mb-2">
            Tax and Shipping calculate at checkout
          </p>
          <Button label="Checkout" onClick={() => {}} />
          <Link href="/" className="flex items-center gap-1">
            <MdArrowBack />
            <span className="text-slate-400 mt-2">continue shopping </span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CartClient;
