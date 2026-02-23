import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../utils/auth';
import { API_URL } from '../config/api';
import '../css/tela_admin/gerenciar_admins.css';

export default function GerenciarAdmins() {
  const user = auth.getCurrentUser();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [formData, setFormData] = useState({
    nomeUsuario: '',
    email: '',
    nomeCompleto: '',
    senha: '',
    confirmarSenha: ''
  });

  const carregarAdmins = async () => {
    setLoading(true);
    setErro('');
    try {
      const res = await fetch(API_URL.authAdmins);
      if (!res.ok) throw new Error('Erro ao listar administradores');
      const data = await res.json();
      setAdmins(data);
    } catch (e) {
      setErro('Não foi possível carregar os administradores.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarAdmins();
  }, []);

  const handleCadastrarAdmin = async (e) => {
    e.preventDefault();
    setMensagem('');
    setErro('');

    if (formData.senha !== formData.confirmarSenha) {
      setErro('As senhas não coincidem.');
      return;
    }

    try {
      const res = await fetch(API_URL.authRegisterAdmin, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.mensagem || 'Erro ao cadastrar administrador');

      setMensagem('Administrador cadastrado com sucesso.');
      setFormData({
        nomeUsuario: '',
        email: '',
        nomeCompleto: '',
        senha: '',
        confirmarSenha: ''
      });
      carregarAdmins();
    } catch (e) {
      setErro(e.message || 'Falha ao cadastrar admin');
    }
  };

  const handleRemoverAdmin = async (idAdmin) => {
    setMensagem('');
    setErro('');

    if (idAdmin === user?.idUsuario) {
      setErro('Você não pode remover seu próprio usuário.');
      return;
    }

    try {
      const res = await fetch(`${API_URL.base}/api/auth/admin/${idAdmin}?requesterId=${user?.idUsuario}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.mensagem || 'Erro ao remover administrador');

      setMensagem('Administrador removido com sucesso.');
      carregarAdmins();
    } catch (e) {
      setErro(e.message || 'Falha ao remover administrador');
    }
  };

  return (
    <section className="container secao-gerenciar-admins">
      <div className="gerenciar-admins-card">
        <div className="gerenciar-admins-header">
          <h2>Gerenciar Administradores</h2>
          <div className="gerenciar-admins-acoes-topo">
            <Link to="/" className="botao-voltar-admin">Voltar</Link>
            <Link to="/editar-perfil" className="botao-voltar-admin">Editar Perfil</Link>
          </div>
        </div>

        <div className="admin-grid">
          <div className="admin-coluna">
            <h3>Administradores cadastrados</h3>
            {loading ? (
              <p>Carregando...</p>
            ) : (
              <ul className="admin-lista">
                {admins.map((admin) => (
                  <li key={admin.idUsuario} className="admin-item">
                    <div>
                      <strong>{admin.nomeUsuario}</strong>
                      <p>{admin.nomeCompleto}</p>
                      <small>{admin.email}</small>
                    </div>
                    <button
                      type="button"
                      className="botao-remover-admin"
                      disabled={admin.idUsuario === user?.idUsuario}
                      onClick={() => handleRemoverAdmin(admin.idUsuario)}
                    >
                      Remover
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="admin-coluna">
            <h3>Cadastrar novo administrador</h3>
            <form className="admin-form" onSubmit={handleCadastrarAdmin}>
              <input
                type="text"
                placeholder="Nome de usuário"
                value={formData.nomeUsuario}
                onChange={(e) => setFormData({ ...formData, nomeUsuario: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Nome completo"
                value={formData.nomeCompleto}
                onChange={(e) => setFormData({ ...formData, nomeCompleto: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Senha"
                value={formData.senha}
                onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Confirmar senha"
                value={formData.confirmarSenha}
                onChange={(e) => setFormData({ ...formData, confirmarSenha: e.target.value })}
                required
              />

              <button type="submit" className="botao-cadastrar-admin">Cadastrar Administrador</button>
            </form>
          </div>
        </div>

        {mensagem && <p className="admin-feedback sucesso">{mensagem}</p>}
        {erro && <p className="admin-feedback erro">{erro}</p>}
      </div>
    </section>
  );
}
