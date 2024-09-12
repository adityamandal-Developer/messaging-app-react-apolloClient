import { useEffect } from "react";
import excludedRoutes from "../../constants/excluded-routes";
import { useGetMe } from "../../hooks/useGetMe";
import { authenticatedVar } from "../../config/authenticated";
interface GuardProps {
  children: JSX.Element;
}
const Guard = ({ children }: GuardProps) => {
  const user = useGetMe();
  console.log(user);

  useEffect(() => {
    if (user) authenticatedVar(true);
  }, [user]);

  return (
    <>
      {excludedRoutes.includes(window.location.pathname)
        ? children
        : user && children}
    </>
  );
};

export default Guard;
