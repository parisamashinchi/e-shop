import getProducts from "@/actions/getProducts";
import Container from "../components/Container";
import Summary from "./Summary";
import { getOrders } from "@/actions/getOrders";
import { getUsers } from "@/actions/getUsers";

const Dashboard = async () => {
    const products = await getProducts({category: null});
    const orders = await getOrders();
    const users = await getUsers();
    
  return (
    <div>
      <Container>
        <Summary products={products} orders={orders} users={users} />
      </Container>
    </div>
  );
};

export default Dashboard;
