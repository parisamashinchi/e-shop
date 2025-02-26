import getProducts from "@/actions/getProducts";
import ManageDashboardProduct from "./ManageDashboardProducts";
import { getUser } from "@/actions/getUser";

const DashboardProducts = async () => {
  const products = await getProducts({ category: null });
  const user = await getUser();
  if (!user || user.role !== "ADMIN") {
    return <p>Access denied</p>;
  }
  return (
    <>
      <ManageDashboardProduct products={products} />
    </>
  );
};

export default DashboardProducts;
