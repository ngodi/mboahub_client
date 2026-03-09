/* eslint-disable  */
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router';
import { SIGNIN_PATH } from './frontend';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return user ? <Outlet /> : <Navigate to={SIGNIN_PATH} />;
};

export default ProtectedRoutes;
