"use client";
import { categories } from "@/utils/categories";
import Container from "../Container";
import Category from "./Category";
import { usePathname, useSearchParams } from "next/navigation";

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");

  const path = usePathname();
  if (path !== "/") return null;

  return (
    <>
      <div className="bg-white">
        <Container>
          <div className="flex justify-between  py-2">
            {categories.map((item) => {
              return (
                <Category
                  key={item.label}
                  label={item.label}
                  icon={item.icon}
                  selected={
                    item.label === category ||
                    (category === null && item.label === "All")
                  }
                />
              );
            })}
          </div>
        </Container>
      </div>
    </>
  );
};

export default Categories;
