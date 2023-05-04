import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { Routes } from "./routes";
import { theme } from "./constants";

function App() {
  return (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes></Routes>
        </ThemeProvider>
      </BrowserRouter>
  );
};

export default App;
