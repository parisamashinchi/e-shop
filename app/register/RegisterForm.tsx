"use client";
import { useState, useEffect } from "react";
import Input from "../components/inputs/Input";
import Heading from "../components/Heading";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { UserChangedProps } from "@/types";

interface RegisterProps {
  user: UserChangedProps | null;
}

const RegisterForm:React.FC<RegisterProps> = ({user}) => {
  const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
      if(user){
        router.push('/cart');
        router.refresh();
      }
    },[])
    
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
     axios.post("/api/register/", data)
      .then((response) => {
        toast.success("registered successfully");

        signIn("credential", {
          email: data.email,
          password: data.password,
          redirect: false,
        }).then((callback) => {
          if (callback?.ok) {
            router.push("/cart");
            router.refresh();
            toast.success("Logged in");
          }
          if (!callback?.ok) {
            toast.error("could not log in");
          }
        });
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if(user){
    return (
      <p className="text-center"> Your are registered</p>
    )
  }
  return (
    <>
      <Heading title="Sing up to E-Shop" />
      <Button
        label="Sing up with Google"
        icon={AiOutlineGoogle}
        onClick={() => {signIn('google')}}
      />
      <hr className="bg-slate-400 w-full h-px " />
      <Input
        id="name"
        label="name"
        type="text"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="email"
        label="Email"
        type="email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Button
        label={isLoading ? "loading" : "sign up"}
        onClick={handleSubmit(onSubmit)}
      />
      <p className="text-sm">
        Already have an account?
        <Link className="underline" href="/login">
          {" "}
          Log in
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
