"use client";
import { useContext } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { CartContext } from "@/context/CartContext";
import { useRouter } from "next/navigation";

const CartCount = () => {
  const { cartTotalQty } = useContext(CartContext);
  const router = useRouter();

  return (
    <div>
      <div className="cursor-pointer" onClick={() => router.push("/cart")}>
        <CiShoppingCart size={40} />
        <div className=" relative top-[-35px] right-[-20px] z-50 rounded-full w-5 h-5  text-white bg-slate-700 flex items-center justify-center text-sm ">
          {cartTotalQty}
        </div>
      </div>
    </div>
  );
};

export default CartCount;
