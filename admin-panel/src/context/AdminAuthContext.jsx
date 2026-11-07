import { createContext, useContext, useEffect, useState } from 'react';

const Ctx = createContext(null);

// Placeholder session. Later: POST to Django admin login and keep a token validated against MongoDB sessions.
export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    try { return JSON.parse(localStorage.getItem('bc_admin')); } catch { return null; }
  });
  useEffect(() => {
    if (admin) localStorage.setItem('bc_admin', JSON.stringify(admin));
    else localStorage.removeItem('bc_admin');
  }, [admin]);

  const login = async ({ email }) => setAdmin({ email, name: 'Arunangshu Roy', role: 'Studio owner' });
  return <Ctx.Provider value={{ admin, login, logout: () => setAdmin(null) }}>{children}</Ctx.Provider>;
}
export const useAdminAuth = () => useContext(Ctx);
