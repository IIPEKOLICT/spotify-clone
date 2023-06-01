import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { setupStore } from "../../store/store";
import { ThemeProvider } from "@mui/material";
import { theme } from "../../constants";
import { AuthForm } from "./AuthForm";

describe("AuthForm", () => {
    it("render component", () => {
        const store = setupStore();
        render(
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <BrowserRouter>
                        <AuthForm />
                    </BrowserRouter>
                </ThemeProvider>
            </Provider>
        );
        expect(screen.getByPlaceholderText(/First name/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Last name/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    })
});