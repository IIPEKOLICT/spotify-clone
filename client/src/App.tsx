import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { Routes } from "./routes";
import { theme } from "./constants";
import { authAPI } from "./services/AuthServices";
import { useEffect } from "react";

function App() {
  const [refresh, { isSuccess }] = authAPI.useRefreshTokenMutation();
  useEffect(() => {
    const refreshToken = async () => {
      await refresh();
    };
    refreshToken();
  }, [refresh]);
  return (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes isAuth={isSuccess}></Routes>
        </ThemeProvider>
      </BrowserRouter>
  );
};

export default App;
