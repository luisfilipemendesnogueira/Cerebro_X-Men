const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const API_URL = {
  base: API_BASE,
  authLogin: `${API_BASE}/api/auth/login`,
  authRegister: `${API_BASE}/api/auth/register`,
  authRegisterAdmin: `${API_BASE}/api/auth/admin/register`,
  authAdmins: `${API_BASE}/api/auth/admins`,
  mutantes: `${API_BASE}/api/mutantes`,
  locais: `${API_BASE}/api/locais`,
  viloes: `${API_BASE}/api/viloes`,
  missoes: `${API_BASE}/api/missoes`,
  ranking: `${API_BASE}/api/herois/top`
};

export function getImageUrl(path) {
  return `${API_BASE}/images/${path}`;
}
