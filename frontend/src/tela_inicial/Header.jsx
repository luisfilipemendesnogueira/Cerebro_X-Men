import React, { useState } from 'react';
import Logo from '../assets/images/logo2.png';
import { auth } from '../utils/auth';
import '../css/tela_inicial/header.css';

function Header() {
  const [menuAtivo, setMenuAtivo] = useState(false);
  const [perfilMenuAtivo, setPerfilMenuAtivo] = useState(false);
  const [showGerenciarAdmin, setShowGerenciarAdmin] = useState(false);
  const [novoAdminData, setNovoAdminData] = useState({
    nomeUsuario: '',
    email: '',
    nomeCompleto: '',
    senha: '',
    confirmarSenha: ''
  });
  const [mensagemAdmin, setMensagemAdmin] = useState('');

  const user = auth.getCurrentUser();

  const toggleMenu = () => {
    setMenuAtivo(prev => !prev);
    setPerfilMenuAtivo(false);
  };

  const togglePerfilMenu = (e) => {
    e.stopPropagation();
    setPerfilMenuAtivo(prev => !prev);
    setMenuAtivo(false);
  };

  const closes =() => {
    setPerfilMenuAtivo(false);
  };

  const scrollToSection = (id) => (event) => {
    event.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuAtivo(false);
  };

  const handleLogout = () => {
    auth.logout();
  };

  const handleCadastrarAdmin = async (e) => {
    e.preventDefault();
    setMensagemAdmin('');

    if (!novoAdminData.nomeUsuario || !novoAdminData.email || !novoAdminData.nomeCompleto || !novoAdminData.senha) {
      setMensagemAdmin('Todos os campos são obrigatórios');
      return;
    }

    if (novoAdminData.senha !== novoAdminData.confirmarSenha) {
      setMensagemAdmin('As senhas não coincidem');
      return;
    }

    try {
      const res = await fetch('http://localhost:8080/api/auth/admin/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nomeUsuario: novoAdminData.nomeUsuario,
          email: novoAdminData.email,
          nomeCompleto: novoAdminData.nomeCompleto,
          senha: novoAdminData.senha,
          confirmarSenha: novoAdminData.confirmarSenha
        })
      });

      const data = await res.json();

      if (res.ok) {
        setMensagemAdmin('✓ Admin cadastrado com sucesso!');
        setNovoAdminData({
          nomeUsuario: '',
          email: '',
          nomeCompleto: '',
          senha: '',
          confirmarSenha: ''
        });
        setTimeout(() => setShowGerenciarAdmin(false), 1500);
      } else {
        setMensagemAdmin(data.mensagem || 'Erro ao cadastrar admin');
      }
    } catch (err) {
      setMensagemAdmin('Erro ao conectar com o servidor');
    }
  };

  return (
    <header className="cabecalho-fixo" onClick={closes}>
      <div className="cabecalho-fixo__container">
        <a href="/">
          <img
            className="cabecalho-fixo__logo"
            src={Logo}
            alt="Logo dos X-Men"
          />
        </a>
        <div className="cabecalho-fixo__acoes">
          <nav className={`cabecalho-fixo__nav ${menuAtivo ? 'ativo' : ''}`}>
            <ul className="cabecalho-fixo__nav-lista" id="menu-lista">
              <li><a href="#cabecalho" onClick={scrollToSection('cabecalho')}>Início</a></li>
              <li><a href="/catalogo" onClick={() => setMenuAtivo(false)}>Cérebro</a></li>
              <li><a href="#locais" onClick={scrollToSection('locais')}>Locais</a></li>
              <li><a href="#missoes" onClick={scrollToSection('missoes')}>Missões</a></li>
              <li><a href="#artigo" onClick={scrollToSection('artigo')}>Artigo</a></li>
              <li><a href="#ranking" onClick={scrollToSection('ranking')}>Ranking</a></li>
              <li><a href="#cadastro-missao" onClick={scrollToSection('cadastro-missao')}>Cadastro</a></li>
            </ul>
          </nav>

          {/* Perfil do usuário */}
          {user && (
            <div className="perfil-usuario" onClick={togglePerfilMenu}>
              <div className="perfil-avatar">
                {user.fotoPerfil ? (
                  <img src={user.fotoPerfil} alt={user.nomeUsuario} />
                ) : (
                  <div className="avatar-placeholder">
                    {user.nomeCompleto.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <span className="perfil-nome">{user.nomeUsuario}</span>

              {/* Menu Dropdown */}
              {perfilMenuAtivo && (
                <div className="perfil-dropdown" onClick={(e) => e.stopPropagation()}>
                  <div className="dropdown-header">
                    <h4>{user.nomeCompleto}</h4>
                    <p className="dropdown-email">{user.email}</p>
                  </div>

                  <div className="dropdown-divider"></div>

                  <a href="#editar-perfil" className="dropdown-item">
                    ⚙️ Editar Perfil
                  </a>

                  {user.tipoAcesso === 'admin' && (
                    <button
                      className="dropdown-item"
                      onClick={() => setShowGerenciarAdmin(!showGerenciarAdmin)}
                    >
                      👑 Gerenciar Admins
                    </button>
                  )}

                  <div className="dropdown-divider"></div>

                  <button
                    className="dropdown-item logout"
                    onClick={handleLogout}
                  >
                    🚪 Logout
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

      {/* Modal Gerenciar Admins */}
      {showGerenciarAdmin && user?.tipoAcesso === 'admin' && (
        <div className="modal-overlay" onClick={() => setShowGerenciarAdmin(false)}>
          <div className="modal-cadastro-admin" onClick={(e) => e.stopPropagation()}>
            <h3>Cadastrar Novo Admin</h3>
            
            {mensagemAdmin && (
              <div className={`admin-mensagem ${mensagemAdmin.includes('✓') ? 'sucesso' : 'erro'}`}>
                {mensagemAdmin}
              </div>
            )}

            <form onSubmit={handleCadastrarAdmin}>
              <input
                type="text"
                placeholder="Nome de usuário"
                value={novoAdminData.nomeUsuario}
                onChange={(e) => setNovoAdminData({...novoAdminData, nomeUsuario: e.target.value})}
              />
              <input
                type="email"
                placeholder="Email"
                value={novoAdminData.email}
                onChange={(e) => setNovoAdminData({...novoAdminData, email: e.target.value})}
              />
              <input
                type="text"
                placeholder="Nome completo"
                value={novoAdminData.nomeCompleto}
                onChange={(e) => setNovoAdminData({...novoAdminData, nomeCompleto: e.target.value})}
              />
              <input
                type="password"
                placeholder="Senha"
                value={novoAdminData.senha}
                onChange={(e) => setNovoAdminData({...novoAdminData, senha: e.target.value})}
              />
              <input
                type="password"
                placeholder="Confirmar Senha"
                value={novoAdminData.confirmarSenha}
                onChange={(e) => setNovoAdminData({...novoAdminData, confirmarSenha: e.target.value})}
              />

              <div className="modal-botoes">
                <button type="submit" className="botao-admin-salvar">Cadastrar</button>
                <button
                  type="button"
                  className="botao-admin-cancelar"
                  onClick={() => setShowGerenciarAdmin(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
