import {
  CartProductType,
  SelectedImgType,
} from "../../product/[productId]/ProductDetail";
import Image from "next/image";

interface ProductImageProps {
  cartProduct: CartProductType;
  product: any;
  handleColorSelect: (value: SelectedImgType) => void;
}
const ProductImage:React.FC<ProductImageProps> = ({ cartProduct, product, handleColorSelect }) => {
  return (
    <div className="grid grid-cols-6 shadow-md border-slate-500 p-5">
      <div className="flex flex-col items-center justify-center  gap-4 h-full max-h-[500] min-h-[300] ">
        {product.images.map((image: SelectedImgType) => {
          return (
            <div
              key={image.color}
              onClick={() => handleColorSelect(image)}
              className={`w-[70%] aspect-square relative cursor-pointer  
                ${
                  cartProduct.selectedImg.color === image.color
                    ? "shadow-md border-slate-500"
                    : "border-none"
                }
                `}
            >
              <Image
                className="object-contain p-2"
                fill
                src={image.image}
                alt={image.color}
              />
            </div>
          );
        })}
      </div>
      <div className="aspect-square relative col-span-5">
        <Image
          src={cartProduct.selectedImg.image}
          alt={cartProduct.name}
          fill
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  );
};

export default ProductImage;
