import { Container } from "@mui/material";
import CartClient from "./CartClient";
import { getUser } from "@/actions/getUser";

const Cart = async () => {
  const user = await getUser();
  return (
    <div>
      <Container>
        <CartClient user={user} />
      </Container>
    </div>
  );
};

export default Cart;
