import Container from "@/app/components/Container";
import FormWrap from "@/app/components/FormWrap";
import AddProductForm from "./AddProductForm";
import { getUser } from "@/actions/getUser";

const DashboardAddProduct = async() => {
    const user = await getUser();
    if(!user || (user && user.role !== 'ADMIN')){
        return (<p>Access denied</p>)
    }
    return (  <div className="p-10">
    <Container>
        <FormWrap>
            <AddProductForm />
        </FormWrap>
    </Container>
    </div>);
}
 
export default DashboardAddProduct;