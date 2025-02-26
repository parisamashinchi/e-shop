import Container from "@/app/components/Container";
import { getOrders} from "@/actions/getOrders";
import { getOrderById } from "@/actions/getOrderById";
import OrderDetail from "./OrderDetail";

interface IParams {
  orderId: string;
}
const Order = async ({ params }: { params: IParams }) => {
  const order = await getOrderById(params)
 
  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div>
      <Container>
        <OrderDetail order={order} />
      </Container>
    </div>
  );
};

export default Order;
