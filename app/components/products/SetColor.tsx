import {
  CartProductType,
  SelectedImgType,
} from "../../product/[productId]/ProductDetail";

interface SetColorProps {
  images: SelectedImgType[];
  cartProduct: CartProductType;
  handleColorSelect: (value: SelectedImgType) => void;
}
const SetColor: React.FC<SetColorProps> = ({
  images,
  cartProduct,
  handleColorSelect,
}) => {
  return (
    <div className="flex gap-4 items-center">
      <span className="font-semibold">Color</span>
      <div className="flex gap-1">
        {images.map((image) => {
          return (
            <div
              key={image.color}
              onClick={() => handleColorSelect(image)}
              className={`h-5 w-5 rounded-full border-teal-300 ${
                cartProduct.selectedImg.color === image.color
                  ? "border-2"
                  : "border-none"
              }`}
            >
              <div
                style={{ background: image.colorCode }}
                className="h-4 w-4 rounded-full border-2 border-slate-300"
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SetColor;
