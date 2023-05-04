import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { setupStore } from "./store/store";
import "./styles/index.scss";
import "@fontsource/russo-one";
import "@fontsource/montserrat";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const store = setupStore();
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);