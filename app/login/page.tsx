import { getUser } from "@/actions/getUser";
import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import LoginForm from "./LoginForm";

const Login = async () => {
  const user = await getUser();
  return (
    <Container>
      <FormWrap>
        <LoginForm user={user} />
      </FormWrap>
    </Container>
  );
};

export default Login;
