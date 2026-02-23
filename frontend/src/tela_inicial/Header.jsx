import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../assets/images/logo2.png';
import { auth } from '../utils/auth';
import { API_URL } from '../config/api';
import '../css/tela_inicial/header.css';
import exit from '../assets/icons/exit-svgrepo-com.svg';
import pencilSquare from '../assets/icons/pencil-square-svgrepo-com.svg';
import settings from '../assets/icons/settings-svgrepo-com.svg';

function Header() {
  const [menuAtivo, setMenuAtivo] = useState(false);
  const [perfilMenuAtivo, setPerfilMenuAtivo] = useState(false);
  const user = auth.getCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setMenuAtivo((prev) => !prev);
    setPerfilMenuAtivo(false);
  };

  const togglePerfilMenu = (e) => {
    e.stopPropagation();
    setPerfilMenuAtivo((prev) => !prev);
    setMenuAtivo(false);
  };

  const closeMenus = () => {
    setPerfilMenuAtivo(false);
  };

  const goToSection = (id) => (event) => {
    event.preventDefault();
    setMenuAtivo(false);

    if (location.pathname !== '/') {
      sessionStorage.setItem('scrollToSection', id);
      navigate('/');
      return;
    }

    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogout = () => {
    auth.logout();
  };

  return (
    <header className="cabecalho-fixo" onClick={closeMenus}>
      <div className="cabecalho-fixo__container">
        <Link to="/">
          <img
            className="cabecalho-fixo__logo"
            src={Logo}
            alt="Logo dos X-Men"
          />
        </Link>

        <div className="cabecalho-fixo__acoes">
          <nav className={`cabecalho-fixo__nav ${menuAtivo ? 'ativo' : ''}`}>
            <ul className="cabecalho-fixo__nav-lista" id="menu-lista">
              <li><a href="#cabecalho" onClick={goToSection('cabecalho')}>Início</a></li>
              <li><Link to="/catalogo" onClick={() => setMenuAtivo(false)}>Cérebro</Link></li>
              <li><a href="#locais" onClick={goToSection('locais')}>Locais</a></li>
              <li><a href="#missoes" onClick={goToSection('missoes')}>Missões</a></li>
              <li><a href="#artigo" onClick={goToSection('artigo')}>Artigo</a></li>
              <li><a href="#ranking" onClick={goToSection('ranking')}>Ranking</a></li>
              <li><a href="#cadastro-missao" onClick={goToSection('cadastro-missao')}>Cadastro</a></li>
            </ul>
          </nav>

          {user && (
            <div className="perfil-usuario" onClick={togglePerfilMenu}>
              <div className="perfil-avatar">
                {user.fotoPerfil ? (
                  <img src={`${API_URL.base}${user.fotoPerfil}`} alt={user.nomeUsuario} />
                ) : (
                  <div className="avatar-placeholder">
                    {user.nomeCompleto.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <span className="perfil-nome">{user.nomeUsuario}</span>

              {perfilMenuAtivo && (
                <div className="perfil-dropdown" onClick={(e) => e.stopPropagation()}>
                  <div className="dropdown-header">
                    <h4>{user.nomeCompleto}</h4>
                    <p className="dropdown-email">{user.email}</p>
                  </div>

                  <div className="dropdown-divider"></div>

                  <Link
                    to="/editar-perfil"
                    className="dropdown-item dropdown-item-with-icon"
                    onClick={() => setPerfilMenuAtivo(false)}
                  >
                    <img className="dropdown-item-icon" src={pencilSquare} alt="Ícone de editar perfil" />
                    <span>Editar Perfil</span>
                  </Link>

                  {user.tipoAcesso === 'admin' && (
                    <Link
                      to="/gerenciar-admins"
                      className="dropdown-item dropdown-item-with-icon"
                      onClick={() => setPerfilMenuAtivo(false)}
                    >
                      <img className="dropdown-item-icon" src={settings} alt="Ícone de gerenciar administradores" />
                      <span>Gerenciar Administradores</span>
                    </Link>
                  )}

                  <div className="dropdown-divider"></div>

                  <button className="dropdown-item logout" onClick={handleLogout}>
                    <img className="dropdown-item-icon" src={exit} alt="Ícone de sair" />
                    <span>Sair</span>
                  </button>
                </div>
              )}
            </div>
          )}

          <button
            className={`cabecalho-fixo__menu-hamburguer ${menuAtivo ? 'ativo' : ''}`}
            aria-label="Abrir menu"
            aria-expanded={menuAtivo}
            aria-controls="menu-lista"
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
