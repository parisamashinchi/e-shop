"use client";

import { CartProductType } from "../../product/[productId]/ProductDetail";

interface SetQtyProps {
  cartCounter?: Boolean;
  cartProduct: CartProductType;
  handleQtyIncrease: () => void;
  handleQtyDecrease: () => void;
}

const SetQuantity: React.FC<SetQtyProps> = ({
  cartCounter,
  cartProduct,
  handleQtyDecrease,
  handleQtyIncrease,
}) => {
  return (
    <div className="flex gap-10 items-center">
      {cartCounter ? null : <div className="font-semibold">Quantity:</div>}
      <div className="flex gap-4 items-center text-base">
        <button
          onClick={handleQtyDecrease}
          className="border-2 border-slate-300 px-2 rounded"
        >
          -
        </button>
        <div>{cartProduct.quantity}</div>
        <button
          onClick={handleQtyIncrease}
          className="border-2 border-slate-300 px-2 rounded"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default SetQuantity;
