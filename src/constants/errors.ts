import { SnackMessage } from "../interfaces/snack-message.interface";

export const UNKNOWN_ERROR_MESSSAGE = "An unknown error has occured";

export const UNKNOWN_ERROR_SNACK_MESSAGE: SnackMessage = {
  message: "An unknown error has occured",
  type: "error",
};

export const INVALID_CREDENTIALS_ERROR_SNACK_MESSAGE: SnackMessage = {
  message: "Invalid Email or Password",
  type: "error",
};
