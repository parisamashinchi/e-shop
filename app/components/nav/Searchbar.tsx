"use client";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { MdOutlineImageSearch, MdSearch } from "react-icons/md";

const SearchBar = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      searchTerm: "",
    },
  });

  const onsubmit: SubmitHandler<FieldValues> = (data) => {
    if (data.searchTerm) {
      const query = { searchTerm: data.searchTerm };
      const url = queryString.stringifyUrl(
        { url: "/", query: query },
        { skipNull: true }
      );
      router.push(url);
      reset();
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex ">
      <input
        className="border-white w-80 h-10 px-2 rounded-tl-md  rounded-bl-md border-2 focus: outline-none"
        type="text"
        placeholder="Search"
        {...register("searchTerm")}
      />
      <button
        className="px-2 top-10 h-10 bg-[#f08806] text-white  rounded-r-md hover:bg-[#e8a553]"
        onClick={handleSubmit(onsubmit)}
      >
        <MdSearch size={20}/>
      </button>
    </div>
  );
};

export default SearchBar;
