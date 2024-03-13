import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { FinanceContextProvider } from './context/FinanceContext.tsx';
import './index.css';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FinanceContextProvider>
      <Toaster position="bottom-right" reverseOrder={false} />
      <App />
    </FinanceContextProvider>
  </React.StrictMode>
);
