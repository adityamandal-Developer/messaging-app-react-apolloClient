import { Link } from "react-router-dom";
import { Link as MUILink } from "@mui/material";
import Auth from "./Auth";
import { CreateUserDocument } from "../../config/gql/generated";
import { useMutation } from "@apollo/client";

const Signup = () => {
  const [CreateUser, { loading, data }] = useMutation(CreateUserDocument);
  return (
    <Auth
      submitLabel="Signup"
      onSubmit={async ({ email, password }) => {
        const { data, errors } = await CreateUser({
          variables: {
            createUserInput: {
              email,
              password,
            },
          },
        });
      }}
    >
      <Link to={"/login"} style={{ alignSelf: "center" }}>
        <MUILink>Login</MUILink>
      </Link>
    </Auth>
  );
};

export default Signup;
