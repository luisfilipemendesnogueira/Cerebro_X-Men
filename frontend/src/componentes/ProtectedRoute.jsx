import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, requiredAccess = null }) {
  const user = JSON.parse(localStorage.getItem('user'));

  // Se não está logado, redireciona para login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Se requer um tipo de acesso específico (admin) e o usuário não tem
  if (requiredAccess && user.tipoAcesso !== requiredAccess) {
    return <Navigate to="/" replace />;
  }

  return children;
}
