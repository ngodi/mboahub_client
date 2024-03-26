/* eslint-disable import/no-named-as-default */
/* eslint-disable react/no-deprecated */
import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router } from 'react-router-dom';
import FallBack from './components/FallBack';
import { SearchInputContextProvider } from './contexts/SearchInputContext';
import { UserProvider } from './contexts/UserContext';
import { MenuProvider } from './contexts/MenuContext';

const App = lazy(() => import('./App'));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback={<FallBack />}>
      <Router>
        <SearchInputContextProvider>
          <UserProvider>
            <MenuProvider>
              <App />
            </MenuProvider>
          </UserProvider>
        </SearchInputContextProvider>
      </Router>
    </Suspense>
  </React.StrictMode>,
);
