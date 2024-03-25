import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
import ScrollToTop from 'react-scroll-to-top';
import { MdArrowDropUp } from 'react-icons/md';

import { Home } from './pages/home/home';
import SignInSignUp from './pages/Auth/SignInSignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import PropertyDetail from './components/PropertyDetail/PropertyDetail';
import NewListing from './pages/Dashboard/NewListing/NewListing';
import MyProfile from './pages/Dashboard/MyProfile/MyProfile';
import AllMyListings from './pages/Dashboard/MyListings/AllMyListings';
import PropertyDetails from './pages/Dashboard/MyListings/PropertyDetails';
import Properties from './pages/Properties/Properties';
import Navbar from './components/layouts/navbar/navbar';
import BottomNav from './components/layouts/BottomNav/BottomNav';
import { ADMIN_DASHBOARD_URL, HOME_URL, SIGNIN_PATH } from './routes/frontend';
import NotFound from './pages/NotFound/NotFound';
import ProtectedRoutes from './routes/ProtectedRoutes';
import { AnonymousRoute } from './routes/AnonymousRoute';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path={HOME_URL} element={<Home />} />
        <Route element={<AnonymousRoute />}>
          <Route path={SIGNIN_PATH} element={<SignInSignUp />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path={ADMIN_DASHBOARD_URL} element={<Dashboard />}>
            <Route path="" element={<AllMyListings />} />
            <Route path="my_listings" element={<AllMyListings />} />
            <Route path="new_listing" element={<NewListing />} />
            <Route path=":house_id" element={<PropertyDetails />} />
            <Route path="edit_profile" element={<MyProfile />} />
          </Route>
        </Route>
        <Route path="properties/:listingName?/:location?/:businessType?" element={<Properties />} />
        <Route path="houses/:house_id" element={<PropertyDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <BottomNav />
      <ScrollToTop
        smooth
        component={<MdArrowDropUp color="#fff" />}
        style={{
          padding: '5px', background: '#3270FC', borderRadius: '2px', boxShadow: '0 4px 2px -2px gray',
        }}
      />
    </div>
  );
}

export default App;
