import { ThemeProvider } from "@mui/material";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { injectStore } from "core/api";

import App from "./App";
import theme from "./core/config/MUI/index";
import { store } from "./core/store";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

injectStore(store);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

root.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <App />
        </Provider>
      </QueryClientProvider>
    </BrowserRouter>
  </ThemeProvider>
);
