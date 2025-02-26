import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import ClientCheckOut from "./clientCheckout";

const Checkout = () => {
    return ( 
        <div>
            <Container>
                <FormWrap>
                    <ClientCheckOut />
                </FormWrap>
            </Container>
        </div>
     );
}
 
export default Checkout;