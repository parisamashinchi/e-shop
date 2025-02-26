"use client";
import { truncate } from "@/utils/truncate";
import Image from "next/image";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/utils/formatPrice";

interface ProductProps {
  product: any;
}

const ProductCard: React.FC<ProductProps> = ({ product }) => {
  const router = useRouter();

  let averageRate;
  if (product.reviews && product.reviews.length === 0) {
    averageRate = 0;
  } else {
    product.reviews?.reduce((acc: number, currentItem: any) => {
      let sum = acc + currentItem.rating;
      averageRate = sum / product.reviews.length;
    }, 0);
  }

  return (
    <div
      onClick={() => router.push(`/product/${product.id}`)}
      className="bg-slate-50 shadow-md rounded-lg border-slate-50  text-sm text-center cursor-pointer transition hover:scale-100"
    >
      <div className="flex flex-col item-center p-5  gap-1">
        <div className="h-[250px] relative ">
          <Image
            src={product.images[0].image}
            fill
            className="rounded-md object-fit object-center"
            alt={product.name}
          />
        </div>
        <div className="font-bold mt-5">{truncate(product.name)}</div>
        <Rating value={averageRate} className="m-auto" />
        <div className="text-slate-800 font-semibold text-lg">
          {formatPrice(product.price)}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
