import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { API_URL } from "../constants/urls";
import { onError } from "@apollo/client/link/error";
import excludedRoutes from "../constants/excluded-routes";
import router from "../components/Routes";
import { onLogout } from "../utils/logout";

const logoutLink = onError((error: any) => {
  if (
    error.graphQLErrors?.length &&
    (error.graphQLErrors[0]?.extensions.originalError as any).statusCode === 401
  ) {
    if (!excludedRoutes.includes(window.location.pathname)) {
      onLogout();
    }
  }
});

const httpLink = new HttpLink({
  uri: `${API_URL}/graphql`,
  credentials: "include",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: logoutLink.concat(httpLink),
  credentials: "include",
});

export default client;
