import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Loader from './funcionalidades/Loader';
import Header from './tela_inicial/Header';
import Home from './tela_inicial/Home';
import Locais from './tela_inicial/Locais';
import Missoes from './tela_inicial/Missoes';
import Artigo from './tela_inicial/Artigo';
import Ranking from './tela_inicial/Ranking';
import CadastrarMissoes from './tela_inicial/CadastrarMissoes';
import Footer from './tela_inicial/Footer';
import Catalogo from './tela_catalogo/Catalogo';
import Login from './tela_login/Login';
import ProtectedRoute from './componentes/ProtectedRoute';
import EditarPerfil from './tela_perfil/EditarPerfil';
import GerenciarAdmins from './tela_admin/GerenciarAdmins';
import { auth } from './utils/auth';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(auth.isLoggedIn());

  // Monitorar mudanças de login
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(auth.isLoggedIn());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Rota de Login */}
        <Route path="/login" element={<Login />} />

        {/* Rotas Protegidas */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <>
                <Loader />
                <Header />
                <Home />
                <main>
                  <Locais />
                  <Missoes />
                  <Artigo />
                  <Ranking />
                  <CadastrarMissoes />
                </main>
                <Footer />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/catalogo"
          element={
            <ProtectedRoute>
              <>
                <Loader />
                <Header />
                <Catalogo />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/editar-perfil"
          element={
            <ProtectedRoute>
              <>
                <Loader />
                <Header />
                <EditarPerfil />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/gerenciar-admins"
          element={
            <ProtectedRoute requiredAccess="admin">
              <>
                <Loader />
                <Header />
                <GerenciarAdmins />
              </>
            </ProtectedRoute>
          }
        />

        {/* Redirecionar para login se acessar rota inexistente sem estar logado */}
        <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
