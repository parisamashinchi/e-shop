import { ImageType } from "@/app/dashboard/add/AddProductForm";
import { use, useCallback, useEffect, useState } from "react";
import SelectImage from "./SelectImage";
import Button from "../Button";

interface SelectColorProps {
  item: ImageType;
  addImage: (img: ImageType) => void;
  removeImage: (img: ImageType) => void;
  isProductCreated: Boolean;
}

const SelectColor: React.FC<SelectColorProps> = ({
  item,
  addImage,
  removeImage,
  isProductCreated,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (isProductCreated) {
      setFile(null);
      setIsSelected(false);
    }
  }, [isProductCreated]);

  const handleFileChange = useCallback((img: File) => {
    setFile(img);
    addImage({ ...item, image: img });
  }, []);

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSelected(event.target.checked);
    if (!event.target.checked) {
      setFile(null);
      removeImage(item);
    }
  };

  return (
    <div className="grid grid-cols-1 border-1 shadow-md items-center p-3 ">
      <div className="flex flex-row gap-2">
        <input
          type="checkbox"
          id={item.color}
          checked={isSelected}
          onChange={handleCheck}
          className="cursor-pointer"
        />
        <label htmlFor={item.color} className=" font-medium cursor-pointer">
          {item.color}
        </label>
      </div>
      {isSelected && !file && (
        <div className="col-span-2">
          <SelectImage item={item} handleFileChange={handleFileChange} />
        </div>
      )}
      {file && (
        <>
          <p>{file.name}</p>
          <Button
            label="Cancel"
            small
            outline
            onClick={() => {
              setFile(null), removeImage(item);
            }}
          />
        </>
      )}
    </div>
  );
};

export default SelectColor;
