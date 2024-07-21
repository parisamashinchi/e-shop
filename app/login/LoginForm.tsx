"use client";
import { useState } from "react";
import Input from "../components/inputs/Input";
import Heading from "../components/products/Heading";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";

const LoginForm = () => {
  const [isLoading, setILoading] = useState(false);
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
  };
  return (
    <>
      <Heading title="Sing in to E-Shop" />
      <Button
        label="Sing in with Google"
        icon={AiOutlineGoogle}
        onClick={() => {}}
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
