"use client";
import { useState, useEffect } from "react";
import Input from "../components/inputs/Input";
import Heading from "../components/Heading";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import { signIn } from "next-auth/react";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import { UserChangedProps } from "@/types";

interface LoginProps {
  user: UserChangedProps | null;
}


const LoginForm:React.FC<LoginProps> = ({user}) => {
  const [isLoading, setILoading] = useState(false);
  const router = useRouter()

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
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setILoading(true);
    signIn('credentials', {
      ...data,
      redirect: false,
    }).then((callback) =>{
      setILoading(false);
      if(callback?.ok){
        router.push('/cart');
        router.refresh();
        toast.success('Logged in successfully')
      } 
      if(callback?.error){
        toast.error('Could not log in')
      }
    })   
  };
  if(user){
    return (
      <p className="text-center"> Your are logged in</p>
    )
  }
  return (
    <>
      <Heading title="Sing in to E-Shop" />
      <Button
        label="Sing in with Google"
        icon={AiOutlineGoogle}
        onClick={() => {signIn('google')}}
      />
      <hr className="bg-slate-400 w-full h-px " />
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
        label={isLoading ? "loading" : "sign in"}
        onClick={handleSubmit(onSubmit)}
      />
      <p className="text-sm">
        Do you have an account?
        <Link className="underline" href="/register">
          {" "}
          Sing up
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
