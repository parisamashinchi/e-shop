"use client";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import Checkbox from "@/app/components/inputs/Checkbox";
import Input from "@/app/components/inputs/Input";
import SelectColor from "@/app/components/inputs/SelectColor";
import Textarea from "@/app/components/inputs/Textarea";
import Heading from "@/app/components/Heading";
import { categories } from "@/utils/categories";
import { colors } from "@/utils/colors";
import { useCallback, useEffect, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Button from "@/app/components/Button";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

export type ImageType = {
  color: string;
  colorCode: string;
  image: File | null;
  publicId: string | null;
};

export type UploadedImageType = {
  color: string;
  colorCode: string;
  image: string | null;
  publicId: string | null;
};

const AddProductForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageType[] | null>(null);
  const [isProductCreated, setIsProductCreated] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      inStock: false,
      images: [],
    },
  });

  const router = useRouter();

  const category = watch("category");

  useEffect(() => {
    setValue("images", images);
  }, [images]);

  useEffect(() => {
    if (isProductCreated) {
      reset();
      setImages(null);
      setIsProductCreated(false);
    }
  }, [isProductCreated]);

  const handleAddImage = useCallback((image: ImageType) => {
    setImages((prev) => {
      if (!prev) {
        return [image];
      }
      return [...prev, image];
    });
  }, []);

  const handleRemoveImage = useCallback((image: ImageType) => {
    setImages((prev) => {
      if (prev) {
        return prev.filter((item) => item.color !== image.color);
      }
      return prev;
    });
  }, []);

  const handleImageUpload = async (data: FieldValues) => {
    toast("creating product");
    try {
      const uploadedImgs = await Promise.all(
        data.images.map(async (item: any) => {
          const formData = new FormData();
          formData.append("file", item.image);
          if (item.image) {
            const response = await axios.post("/api/upload/", formData);
            return { ...item, image: response.data.url, publicId: response.data.publicId };
          }
        })
      );

      toast.success("Images uploaded successfully");
      return uploadedImgs;
    } catch (error) {
      toast.error("Image upload failed");
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    if (!data.images || data.images.length === 0) {
      setIsLoading(false);
      toast.error("No image uploaded");
    }

    const uploadedImgs = await handleImageUpload(data);
    if (uploadedImgs.length > 0) {
      const productData = { ...data, images: uploadedImgs };

      await axios
        .post("/api/product", productData)
        .then(() => {
          toast.success("Product Created");
          setIsProductCreated(true);
          router.refresh();
        })
        .catch((error) => {
          toast.error("Could not create product");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <>
      <Heading title="Add new Product" />
      <Input
        id="name"
        label="Name"
        type="text"
        register={register}
        disabled={isLoading}
        errors={errors}
        required
      />
      <Input
        id="price"
        label="Price"
        type="number"
        register={register}
        disabled={isLoading}
        errors={errors}
        required
      />
      <Input
        id="brand"
        label="Brand"
        type="text"
        register={register}
        disabled={isLoading}
        errors={errors}
        required
      />
      <Textarea
        id="description"
        label="Description"
        register={register}
        disabled={isLoading}
        errors={errors}
        required
      />
      <Checkbox
        id="inStock"
        label="This product is in stock"
        register={register}
        disabled={isLoading}
      />
      <div className="w-full font-medium">
        <div className="mb-2 font-semibold"> Select a category </div>
        <div className="grid grid-cols-3 gap-2">
          {categories.map((item) => {
            if (item.label === "All") {
              return null;
            }
            return (
              <div key={item.label}>
                <CategoryInput
                  label={item.label}
                  icon={item.icon}
                  onClick={(category) => setValue("category", category)}
                  selected={item.label === category}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="mb-2 font-semibold">
          Select color and pick image for each Color
        </div>
        <div className="grid grid-cols-2 gap-2">
          {colors.map((item) => {
            return (
              <div key={item.color}>
                <SelectColor
                  item={item}
                  addImage={handleAddImage}
                  removeImage={handleRemoveImage}
                  isProductCreated={isProductCreated}
                />
              </div>
            );
          })}
        </div>
      </div>
      <Button
        label={isLoading ? "Is Loading..." : "Add Product"}
        onClick={handleSubmit(onSubmit)}
        type="submit"
      />
    </>
  );
};

export default AddProductForm;
