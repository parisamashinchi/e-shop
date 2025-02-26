"use client";
import { CiShoppingCart } from "react-icons/ci";
import { CartContext } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import useCart from "@/hooks/useCart";

const CartCount = () => {
  const { cartTotalQty } = useCart();
  const router = useRouter();

  return (
    <div
      className="cursor-pointer top-2 relative"
      onClick={() => router.push("/cart")}
    >
      <CiShoppingCart size={40} className="text-white" />
      <div className=" relative top-[-35px] right-[-20px] z-50 rounded-full w-5 h-5  text-white bg-[#f08806] flex items-center justify-center text-sm ">
        {cartTotalQty}
      </div>
    </div>
  );
};

export default CartCount;
