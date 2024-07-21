import Container from "@/app/components/Container";
import ProductDetail from "@/app/product/[productId]/ProductDetail";
import { products } from "@/utils/products";
import ListRating from "./ListRating";
interface IParams {
  productId: string;
}
const Product = ({ params }: { params: IParams }) => {
  const product = products.find((item) => item.id === params.productId);
  return (
    <div>
      <Container>
        <ProductDetail product={product} />
        {product && product.reviews.length > 0 && (
          <div className="flex flex-col">
            <ListRating product={product} />
          </div>
        )}
      </Container>
    </div>
  );
};

export default Product;
