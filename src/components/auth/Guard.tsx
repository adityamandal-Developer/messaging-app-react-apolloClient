import { useGetMe } from "../../hooks/useGetMe";
interface GuardProps {
  children: JSX.Element;
}
const Guard = ({ children }: GuardProps) => {
  const user = useGetMe();
  console.log(user);

  return children;
};

export default Guard;
