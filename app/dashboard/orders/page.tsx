import { getUser } from "@/actions/getUser";
import { getOrders } from "@/actions/getOrders";
import ManageDashboardOrders from "./ManageDashboardOrders";

const DashboardOrders = async () => {
  const orders = await getOrders();
  const user = await getUser();
  if (!user || user.role !== "ADMIN") {
    return <p>Access denied</p>;
  }
  return (
    <>
      <ManageDashboardOrders orders={orders} />
    </>
  );
};

export default DashboardOrders;
