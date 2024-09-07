import { Link } from "react-router-dom";
import { Link as MUILink } from "@mui/material";
import Auth from "./Auth";
import { CreateUserDocument } from "../../config/gql/generated";
import { useMutation } from "@apollo/client";
import { extractErrorMessage } from "../../hooks/errors";
import { useState } from "react";

const Signup = () => {
  const [CreateUser] = useMutation(CreateUserDocument);
  const [error, setError] = useState<string>();
  return (
    <Auth
      submitLabel="Signup"
      error={error}
      onSubmit={async ({ email, password }) => {
        try {
          await CreateUser({
            variables: {
              createUserInput: {
                email,
                password,
              },
            },
          });
          setError("");
        } catch (error: any) {
          const errorMessage = extractErrorMessage(error);
          if (errorMessage) {
            setError(errorMessage);
            return;
          }
          setError("Ops! Something went wrong");
        }
      }}
    >
      <Link to={"/login"} style={{ alignSelf: "center" }}>
        <MUILink>Login</MUILink>
      </Link>
    </Auth>
  );
};

export default Signup;
