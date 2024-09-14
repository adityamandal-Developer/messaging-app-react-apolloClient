import { useQuery } from "@apollo/client";
import { MeDocument } from "../config/gql/generated";

const useGetMe = () => {
  const { loading, data, error } = useQuery(MeDocument);
  return { data, loading, error };
};

export { useGetMe };
