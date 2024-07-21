import HomeBanner from "./components/HomeBanner";
import { products } from "@/utils/products";
import Heading from "./components/products/Heading";
import ProductCard from "./components/products/ProductCard";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <HomeBanner />
      <div className="flex w-full">
        <Heading title="Popular Products" />
      </div>
      <div className="grid grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-10 bg-rose-50 w-full p-10">
        {products.map((product: any) => {
          return <ProductCard product={product} key={product.id} />;
        })}
      </div>
    </div>
  );
}
