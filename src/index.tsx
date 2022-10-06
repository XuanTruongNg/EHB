import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';

import App from './App';
import { store } from './core/store';
import './index.css';
import { ThemeProvider } from '@mui/material';
import theme from './core/config/MUI/index';
import { injectStore } from 'core/api';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

injectStore(store);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <App />
          </Provider>
        </QueryClientProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
