// src/components/ProtectedRoute.tsx
import type React from 'react';
import type { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import type { RootState } from './redux/store';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    alert('로그인이 필요한 서비스입니다.');
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};
