import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/images/logo.png';
import '../css/tela_login/login.css';

export default function Login() {
  const [activeTab, setActiveTab] = useState('login'); // 'login' ou 'cadastro'
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  // Mudar aba e limpar campos
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setNomeUsuario('');
    setSenha('');
    setEmail('');
    setNomeCompleto('');
    setConfirmarSenha('');
    setErro('');
  };

  // Fazer login
  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      const res = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nomeUsuario,
          senha
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setErro(data.mensagem || 'Erro ao fazer login');
        setCarregando(false);
        return;
      }

      // Salvar usuário no localStorage
      localStorage.setItem('user', JSON.stringify(data));
      
      // Redirecionar para home
      navigate('/');
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      setErro('Erro ao conectar com o servidor. Verifique se o backend está rodando em http://localhost:8080');
      setCarregando(false);
    }
  };

  // Fazer cadastro
  const handleRegister = async (e) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      const res = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nomeUsuario,
          email,
          nomeCompleto,
          senha,
          confirmarSenha
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setErro(data.mensagem || 'Erro ao registrar');
        setCarregando(false);
        return;
      }

      // Salvar usuário no localStorage
      localStorage.setItem('user', JSON.stringify(data));
      
      // Redirecionar para home
      navigate('/');
    } catch (err) {
      console.error('Erro ao registrar:', err);
      setErro('Erro ao conectar com o servidor. Verifique se o backend está rodando em http://localhost:8080');
      setCarregando(false);
    }
  };

  return (
    <section className="container secao-login">
      <div className="login-wrapper">
        <div className="login-container">
          {/* Logo */}
          <div className="login-logo">
            <img src={Logo} alt="Logo Cérebro" />
          </div>

          {/* Tabs */}
          <div className="login-tabs">
            <button
              className={`tab ${activeTab === 'login' ? 'ativo' : ''}`}
              onClick={() => handleTabChange('login')}
            >
              Login
            </button>
            <button
              className={`tab ${activeTab === 'cadastro' ? 'ativo' : ''}`}
              onClick={() => handleTabChange('cadastro')}
            >
              Cadastro
            </button>
          </div>

          {/* Mensagem de erro */}
          {erro && <div className="login-erro">{erro}</div>}

          {/* Formulário de Login */}
          {activeTab === 'login' && (
            <form className="login-form" onSubmit={handleLogin}>
              <h2>Bem-vindo ao Cérebro</h2>
              <p className="login-subtitulo">Sistema de Controle do Instituto Xavier</p>

              <div className="form-group">
                <label htmlFor="username">Nome de Usuário</label>
                <input
                  id="username"
                  type="text"
                  placeholder="Nome de usuário"
                  value={nomeUsuario}
                  onChange={(e) => setNomeUsuario(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Senha</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Sua senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="botao-login" disabled={carregando}>
                {carregando ? 'Entrando...' : 'Entrar'}
              </button>

              <p className="login-dica">
                Teste com: professor_x / professor123<br/>
                ou ciclope / scott123
              </p>
            </form>
          )}

          {/* Formulário de Cadastro */}
          {activeTab === 'cadastro' && (
            <form className="login-form" onSubmit={handleRegister}>
              <h2>Cadastre-se no Cérebro</h2>
              <p className="login-subtitulo">Crie sua conta para acessar o sistema</p>

              <div className="form-group">
                <label htmlFor="nome-completo">Nome Completo</label>
                <input
                  id="nome-completo"
                  type="text"
                  placeholder="Seu nome completo"
                  value={nomeCompleto}
                  onChange={(e) => setNomeCompleto(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="username-cadastro">Nome de Usuário</label>
                <input
                  id="username-cadastro"
                  type="text"
                  placeholder="Nome de usuário único"
                  value={nomeUsuario}
                  onChange={(e) => setNomeUsuario(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password-cadastro">Senha</label>
                <input
                  id="password-cadastro"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirm-password">Confirmar Senha</label>
                <input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirme sua senha"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="botao-login" disabled={carregando}>
                {carregando ? 'Cadastrando...' : 'Cadastrar'}
              </button>

              <p className="login-info">
                Após se cadastrar, você terá permissão de usuário comum.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
