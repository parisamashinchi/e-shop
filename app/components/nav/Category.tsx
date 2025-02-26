import { useRouter, useSearchParams } from "next/navigation";
import { IconType } from "react-icons";
import queryString from "query-string";
import { useCallback } from "react";

interface CategoryProps {
  label: string;
  icon: IconType;
  selected: boolean;
}

const Category: React.FC<CategoryProps> = ({ label, icon: Icon, selected }) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClickCategory = useCallback(() => {

    if (label === "ALL") {
      router.push("/");
    } else {
      let query = {};

      if (params) {
        query = queryString.parse(params.toString());
      }
      const updateQuery ={
        ...query,
        category : label
      }

      const url = queryString.stringifyUrl({ url: "/", query: updateQuery });

      router.push(url);
    }

  }, [params, label, router]);
  
  return (
    <div
      onClick={handleClickCategory}
      className={`flex gap-2 justify-center items-center border-b-2 
         hover:text-slate-800 transition cursor-pointer
    ${
      selected
        ? "text-slate-800 border-b-slate-800"
        : "border-transparent text-slate-500"
    }`}
    >
      <Icon size={18} />
      <p className="font-medium text-lg">{label}</p>
    </div>
  );
};

export default Category;
