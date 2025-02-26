import FormWrap from "../components/FormWrap";
import Container from "../components/Container";
import RegisterForm from "./RegisterForm";
import { getUser } from "@/actions/getUser";

const Register = async () => {
  const user = await getUser();
  return (
    <Container>
      <FormWrap>
        <RegisterForm user={user} />
      </FormWrap>
    </Container>
  );
};

export default Register;
