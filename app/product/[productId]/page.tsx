import Container from "@/app/components/Container";
import ProductDetail from "@/app/product/[productId]/ProductDetail";
import getProductById from "@/actions/getProductById";
import AddRating from "./AddRating";
import { getUser } from "@/actions/getUser";
import Heading from "@/app/components/Heading";

interface IParams {
  productId: string;
}
const Product = async ({ params }: { params: IParams }) => {
  const {productId} = params;
  const product = await getProductById(productId);
  const user = await getUser();

  return (
    <div>
      <Container>
        <ProductDetail product={product} />
        {product && user && (
          <div className="flex flex-col w-[400px]">
            <Heading title="Write a review and rate" />
            <AddRating product={product} user={user} />
        
          </div>
         )} 
      </Container>
    </div>
  );
};

export default Product;
