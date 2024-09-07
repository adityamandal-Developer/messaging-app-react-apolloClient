import { ApolloClient, InMemoryCache } from "@apollo/client";
import { API_URL } from "../constants/urls";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: `${API_URL}/graphql`,
  credentials: "include",
});

export default client;
