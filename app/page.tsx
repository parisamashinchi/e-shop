import HomeBanner from "./components/HomeBanner";
import Heading from "./components/Heading";
import ProductCard from "./components/products/ProductCard";
import getProducts, { ProductParams } from "@/actions/getProducts";
import Categories from "./components/nav/Categories";
import Container from "./components/Container";

interface SearchParams {
  searchParams: ProductParams;
}
export default async function Home({ searchParams }: SearchParams) {
  const products = await getProducts(searchParams);
  if (!products) return <p>No Product</p>;

  return (
    <div className="flex min-h-screen flex-col  justify-between  bg-[#f5f5f7] pb-10">
      <Categories />
      <HomeBanner />
      <Container>
        <div className="flex w-full">
          <Heading title="Popular Products" />
        </div>
        <div className="grid grid-cols-3  lg:grid-cols-4 gap-10 w-full p-10">
          {products.map((product: any) => {
            return <ProductCard product={product} key={product.id} />;
          })}
        </div>
      </Container>
    </div>
  );
}
