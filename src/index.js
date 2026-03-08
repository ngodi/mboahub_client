/* eslint-disable react/no-deprecated */
import React, { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router } from 'react-router-dom';
import FallBack from './components/FallBack';
import { SearchInputContextProvider } from './contexts/SearchInputContext';
import { MenuProvider } from './contexts/MenuContext';
import { AuthProvider } from './contexts/AuthContext';
import { OtpResendTimerProvider } from './contexts/OtpResendTimerContext';

const App = lazy(() => import('./App'));

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback={<FallBack />}>
      <Router>
        <SearchInputContextProvider>
          <AuthProvider>
            <MenuProvider>
              <OtpResendTimerProvider>
                <App />
              </OtpResendTimerProvider>
            </MenuProvider>
          </AuthProvider>
        </SearchInputContextProvider>
      </Router>
    </Suspense>
  </React.StrictMode>,
);
