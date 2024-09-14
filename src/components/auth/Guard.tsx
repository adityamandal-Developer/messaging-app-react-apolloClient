import { useEffect } from "react";
import excludedRoutes from "../../constants/excluded-routes";
import { useGetMe } from "../../hooks/useGetMe";
import { authenticatedVar } from "../../config/authenticated";
import { snackVar } from "../../utils/snack";
import { UNKNOWN_ERROR_SNACK_MESSAGE } from "../../constants/errors";
import { usePath } from "../../hooks/usePath";
interface GuardProps {
  children: JSX.Element;
}
const Guard = ({ children }: GuardProps) => {
  const { data: user, loading, error } = useGetMe();
  const { path } = usePath();

  console.log(user);

  useEffect(() => {
    if (user) authenticatedVar(true);
  }, [user]);

  useEffect(() => {
    if (error?.networkError) {
      snackVar(UNKNOWN_ERROR_SNACK_MESSAGE);
    }
  }, [error]);

  return <>{excludedRoutes.includes(path) ? children : user && children}</>;
};

export default Guard;
