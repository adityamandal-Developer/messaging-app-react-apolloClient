import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { API_URL, WS_URL } from "../constants/urls";
import { onError } from "@apollo/client/link/error";
import excludedRoutes from "../constants/excluded-routes";
import router from "../components/Routes";
import { onLogout } from "../utils/logout";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

// Error handling link
const logoutLink = onError((error: any) => {
  if (
    error.graphQLErrors?.length &&
    (error.graphQLErrors[0]?.extensions?.originalError as any)?.statusCode ===
      401
  ) {
    if (!excludedRoutes.includes(window.location.pathname)) {
      onLogout();
    }
  }
});

// HTTP link with credentials included
const httpLink = new HttpLink({
  uri: `${API_URL}/graphql`,
  credentials: "include",
});

// WebSocket link with cookies included
const wsLink = new GraphQLWsLink(
  createClient({
    url: `ws://${WS_URL}/graphql`,
    // connectionParams: () => {
    //   return {
    //     cookie: document.cookie, // Pass cookies here
    //   };
    // },
  })
);

// Split link for handling subscriptions and queries/mutations
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

// Apollo Client setup
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: logoutLink.concat(splitLink),
});

export default client;
