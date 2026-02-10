/* eslint-disable import/prefer-default-export */
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { HOME_URL } from './frontend';
import { useAuth } from '../contexts/AuthContext';

export const AnonymousRoute = () => {
  const { user } = useAuth();

  return user ? <Navigate to={HOME_URL} replace /> : <Outlet />;
};
