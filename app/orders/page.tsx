import { getUser } from "@/actions/getUser";
import  getOrderByUser  from "@/actions/getOrderByUser";
import OrdersTable from "./OrdersTable";

const Orders = async () => {
  const user = await getUser();
  if (!user) {
    return <p>Access denied</p>;
  }
  const userId = user.id;
  const orders = await getOrderByUser({ userId });

  if(!orders){
    return <p>No order</p>
  }

  return (
    <>
      <OrdersTable orders={orders} />
    </>
  );
};

export default Orders;
