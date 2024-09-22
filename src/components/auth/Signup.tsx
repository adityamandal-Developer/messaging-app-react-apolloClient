import { Link } from "react-router-dom";
import { Link as MUILink, TextField } from "@mui/material";
import Auth from "./Auth";
import { CreateUserDocument } from "../../config/gql/generated";
import { useMutation } from "@apollo/client";
import { extractErrorMessage } from "../../hooks/errors";
import { useState } from "react";
import { useLogin } from "../../hooks/userLogin";

const Signup = () => {
  const [CreateUser] = useMutation(CreateUserDocument);
  const [username, setUserName] = useState("");
  const [error, setError] = useState<string>();
  const { login } = useLogin();
  return (
    <Auth
      submitLabel="Signup"
      error={error}
      extraFields={[
        <TextField
          type="text"
          label="UserName"
          variant="outlined"
          value={username}
          onChange={(event) => setUserName(event.target.value)}
          error={!!error}
          helperText={error}
        />,
      ]}
      onSubmit={async ({ email, password }) => {
        try {
          await CreateUser({
            variables: {
              createUserInput: {
                email,
                password,
                username,
              },
            },
          });
          login({ email, password });
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
