// Funções utilitárias de autenticação

export const auth = {
  // Obter usuário atual do localStorage
  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Verificar se está logado
  isLoggedIn() {
    return this.getCurrentUser() !== null;
  },

  // Verificar se é admin
  isAdmin() {
    const user = this.getCurrentUser();
    return user?.tipoAcesso === 'admin';
  },

  // Verificar se é usuário comum
  isUsuario() {
    const user = this.getCurrentUser();
    return user?.tipoAcesso === 'usuario';
  },

  // Fazer logout
  logout() {
    localStorage.removeItem('user');
    window.location.href = '/login';
  },

  // Obter ID do usuário
  getUserId() {
    const user = this.getCurrentUser();
    return user?.idUsuario;
  },

  // Obter nome do usuário
  getUsername() {
    const user = this.getCurrentUser();
    return user?.nomeUsuario;
  },

  // Obter nome completo
  getNomeCompleto() {
    const user = this.getCurrentUser();
    return user?.nomeCompleto;
  },

  // Obter email
  getEmail() {
    const user = this.getCurrentUser();
    return user?.email;
  },

  // Obter foto de perfil
  getFotoPerfil() {
    const user = this.getCurrentUser();
    return user?.fotoPerfil;
  },

  // Atualizar usuário no localStorage
  updateUser(userData) {
    localStorage.setItem('user', JSON.stringify(userData));
  }
};
