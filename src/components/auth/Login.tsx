import { Link } from "react-router-dom";
import { Link as MUILink } from "@mui/material";
import Auth from "./Auth";
import { useLogin } from "../../hooks/userLogin";

const Login = () => {
  const { login, error } = useLogin();
  return (
    <>
      <Auth
        submitLabel="Login"
        onSubmit={(request) => login(request)}
        error={error ? "Invalid credentials" : ""}
      >
        <Link to={"/signup"} style={{ alignSelf: "center" }}>
          <MUILink>Signup</MUILink>
        </Link>
      </Auth>
    </>
  );
};

export default Login;
