import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../utils/auth';
import { API_URL } from '../config/api';
import '../css/tela_perfil/editar_perfil.css';

export default function EditarPerfil() {
  const navigate = useNavigate();
  const currentUser = auth.getCurrentUser();
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [email, setEmail] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState('');
  const [arquivoFoto, setArquivoFoto] = useState(null);
  const [previewFoto, setPreviewFoto] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (!currentUser?.idUsuario) return;

    const carregarUsuario = async () => {
      try {
        const res = await fetch(`${API_URL.base}/api/auth/usuario/${currentUser.idUsuario}`);
        if (!res.ok) throw new Error('Erro ao carregar perfil');
        const data = await res.json();
        setNomeCompleto(data.nomeCompleto || '');
        setEmail(data.email || '');
        setFotoPerfil(data.fotoPerfil || '');
      } catch (e) {
        setErro('Não foi possível carregar seus dados.');
      }
    };

    carregarUsuario();
  }, [currentUser?.idUsuario]);

  const srcFoto = previewFoto || (fotoPerfil ? `${API_URL.base}${fotoPerfil}` : '');

  const handleArquivoFoto = (e) => {
    const file = e.target.files?.[0];
    setArquivoFoto(file || null);
    setPreviewFoto(file ? URL.createObjectURL(file) : '');
  };

  const handleSalvar = async (e) => {
    e.preventDefault();
    if (!currentUser?.idUsuario) return;

    setSalvando(true);
    setErro('');
    setMensagem('');

    try {
      let fotoAtualizada = fotoPerfil;

      if (arquivoFoto) {
        const formData = new FormData();
        formData.append('foto', arquivoFoto);
        const resUpload = await fetch(`${API_URL.base}/api/auth/usuario/${currentUser.idUsuario}/foto`, {
          method: 'POST',
          body: formData
        });
        const dataUpload = await resUpload.json();
        if (!resUpload.ok) {
          throw new Error(dataUpload.mensagem || 'Falha ao enviar foto');
        }
        fotoAtualizada = dataUpload.fotoPerfil || '';
      }

      const resUpdate = await fetch(`${API_URL.base}/api/auth/usuario/${currentUser.idUsuario}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nomeCompleto,
          email,
          fotoPerfil: fotoAtualizada
        })
      });

      const dataUpdate = await resUpdate.json();
      if (!resUpdate.ok) {
        throw new Error(dataUpdate.mensagem || 'Erro ao atualizar perfil');
      }

      auth.updateUser(dataUpdate);
      setFotoPerfil(dataUpdate.fotoPerfil || '');
      setArquivoFoto(null);
      setPreviewFoto('');
      setMensagem('Perfil atualizado com sucesso.');
    } catch (e) {
      setErro(e.message || 'Erro ao salvar perfil');
    } finally {
      setSalvando(false);
    }
  };

  return (
    <section className="container secao-editar-perfil">
      <div className="editar-perfil-card">
        <div className="editar-perfil-header">
          <h2>Editar Perfil</h2>
          <div className="editar-perfil-acoes-topo">
            <Link to="/" className="botao-voltar">Voltar</Link>
            {currentUser?.tipoAcesso === 'admin' && (
              <button
                type="button"
                className="botao-voltar botao-voltar--primario"
                onClick={() => navigate('/gerenciar-admins')}
              >
                Gerenciar Administradores
              </button>
            )}
          </div>
        </div>

        <form className="editar-perfil-form" onSubmit={handleSalvar}>
          <div className="foto-preview-wrapper">
            {srcFoto ? (
              <img src={srcFoto} alt="Foto de perfil" className="foto-preview" />
            ) : (
              <div className="foto-placeholder">
                {(nomeCompleto || currentUser?.nomeUsuario || 'U').charAt(0).toUpperCase()}
              </div>
            )}
            <label className="botao-selecionar-foto">
              Alterar foto
              <input type="file" accept="image/*" onChange={handleArquivoFoto} />
            </label>
          </div>

          <label>
            Nome de usuário
            <input type="text" value={currentUser?.nomeUsuario || ''} disabled />
          </label>

          <label>
            Nome completo
            <input
              type="text"
              value={nomeCompleto}
              onChange={(e) => setNomeCompleto(e.target.value)}
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          {mensagem && <p className="perfil-mensagem sucesso">{mensagem}</p>}
          {erro && <p className="perfil-mensagem erro">{erro}</p>}

          <button type="submit" className="botao-salvar-perfil" disabled={salvando}>
            {salvando ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </form>
      </div>
    </section>
  );
}
