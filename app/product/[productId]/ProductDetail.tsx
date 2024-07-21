"use client";
import { useState, useCallback, useContext, useEffect } from "react";
import { Rating } from "@mui/material";
import isEmpty from "lodash/isEmpty";
import SetColor from "../../components/products/SetColor";
import SetQuantity from "../../components/products/SetQuantity";
import Button from "../../components/Button";
import ProductImage from "../../components/products/ProductImage";
import { CartContext } from "@/context/CartContext";
import { MdCheck } from "react-icons/md";
import { useRouter } from "next/navigation";

interface ProductDetailProps {
  product: any;
}

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: SelectedImgType;
  quantity: number;
  price: number;
};

export type SelectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};

const Horizontal = () => {
  return <hr className="w-[40%] my-2" />;
};
const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const { cartProducts, handleAddProductToCart } = useContext(CartContext);
  const router = useRouter();
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: { ...product.images[0] },
    quantity: 1,
    price: product.price,
  });

  useEffect(() => {
    if (cartProduct) {
      const existingIndex = cartProducts?.findIndex(
        (item: CartProductType) => item.id === product.id
      );
      if (existingIndex > -1) {
        setIsProductInCart(true);
      }
    }
  }, [cartProducts]);

  let averageRate;
  if (isEmpty(product.reviews)) {
    averageRate = 0;
  } else {
    product.reviews.reduce((acc: number, currentItem: any) => {
      let sum = acc + currentItem.rating;
      averageRate = sum / product.reviews.length;
    }, 0);
  }

  const handleColorSelect = useCallback(
    (value: SelectedImgType) => {
      setCartProduct((prev) => {
        return { ...prev, selectedImg: value };
      });
    },
    [cartProduct.selectedImg]
  );

  const handleQtyIncrease = useCallback(() => {
    setCartProduct((prev: CartProductType) => {
      return { ...prev, quantity: ++prev.quantity };
    });
  }, [cartProduct]);

  const handleQtyDecrease = useCallback(() => {
    setCartProduct((prev: CartProductType) => {
      if (cartProduct.quantity === 0) {
        return;
      }
      return { ...prev, quantity: --prev.quantity };
    });
  }, [cartProduct]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <ProductImage
        cartProduct={cartProduct}
        product={product}
        handleColorSelect={handleColorSelect}
      />
      <div className="flex flex-col gap-1 text-slate-500 text-sm">
        <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
        <div className="flex gap-2 item-center">
          <Rating value={averageRate} readOnly />
          <div>{product.reviews.length}</div>
        </div>
        <Horizontal />
        <div className="text-justify">{product.description}</div>
        <Horizontal />
        <div>
          <span className="font-semibold">Category </span>
          {product.category}
        </div>
        <div>
          <span className="font-semibold">Brand </span>
          {product.brand}
        </div>
        <div className={product.inStock ? "text-teal-400" : "text-rose-400"}>
          {product.inStock ? "In Stock" : "Out of stock"}
        </div>
        <Horizontal />
        {isProductInCart ? (
          <>
            <p className="flex items-center gap-2 mb-2 text-slate-500">
              <MdCheck className="text-teal-400" size={20} />
              <span>Product added to cart</span>
            </p>
            <div className="w-[300]">
              <Button label="View Cart" onClick={() => router.push("/cart")} />
            </div>
          </>
        ) : (
          <>
            <SetColor
              images={product.images}
              cartProduct={cartProduct}
              handleColorSelect={handleColorSelect}
            />
            <Horizontal />
            <SetQuantity
              cartProduct={cartProduct}
              handleQtyDecrease={handleQtyDecrease}
              handleQtyIncrease={handleQtyIncrease}
            />
            <Horizontal />
            <div className="max-w-[250] ">
              <Button
                label="Add to Cart"
                onClick={() => handleAddProductToCart(cartProduct)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
