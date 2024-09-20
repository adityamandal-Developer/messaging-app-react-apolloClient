import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { RouterProvider } from "react-router-dom";
import router from "./components/Routes";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apollo-client";
import Guard from "./components/auth/Guard";
import Header from "./components/header/Header";
import Snackbar from "./components/snackbar/Snackbar";
import ChatList from "./components/chat-list/ChatList";
import { usePath } from "./hooks/usePath";
import Grid from "@mui/material/Grid2";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  const { path } = usePath();
  const showChatList = path === "/" || path.startsWith("/chats/");
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header />
        <Guard>
          <Container maxWidth="xl" sx={{ height: "100%", marginTop: 2 }}>
            {showChatList ? (
              <Grid container spacing={5}>
                <Grid size={{ md: 5, xs: 12, lg: 4, xl: 3 }}>
                  <ChatList />
                </Grid>
                <Grid size={{ md: 7, xs: 12, lg: 8, xl: 9 }}>
                  <Routes />
                </Grid>
              </Grid>
            ) : (
              <Routes />
            )}
          </Container>
        </Guard>
        <Snackbar />
      </ThemeProvider>
    </ApolloProvider>
  );
};

const Routes = () => {
  return <RouterProvider router={router} />;
};
export default App;
