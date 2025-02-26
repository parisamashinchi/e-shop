'use client'
import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import { Rating } from "@mui/material";
import { Product, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

interface AddRatingProps {
  product: Product;
  user: User;
}

const AddRating: React.FC<AddRatingProps> = ({ product, user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    setValue,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
    const updateData = {
        ...data, product, userId: user?.id
    }
     axios.post('/api/rating', updateData)
    .then(()=>{
        toast.success('rating successfully');
        router.refresh();
        reset();
    }).catch((err)=>{
        toast.error('error rating ');
    }).finally(()=>{
        setIsLoading(false)
    }     
    )
  };

  return (
    <div className="flex flex-col gap-2 mb-5">
      <Rating
        onChange={(e, value) => {
          setCustomValue("rating", value?.toString());
        }}
      />
      <Input
        type="text"
        id="comment"
        label="Comment"
        register={register}
        disabled={isLoading}
        errors={errors}
        required
      />
      <Button label={isLoading ? 'Loading...' : 'Rate Product'} onClick={handleSubmit(onSubmit)} disabled={isLoading} />
    </div>
  );
};

export default AddRating;
