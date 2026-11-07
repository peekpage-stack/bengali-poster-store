import { createContext, useContext, useEffect, useState } from 'react';

const Ctx = createContext(null);

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('bc_admin'));
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (admin) {
      localStorage.setItem('bc_admin', JSON.stringify(admin));
    } else {
      localStorage.removeItem('bc_admin');
    }
  }, [admin]);

  const login = async ({ email }) => {
    const adminUser = {
      email: email || 'admin@peekpage.com',
      name: 'Arunangshu Roy',
      role: 'Studio Owner & Master Curator',
    };
    setAdmin(adminUser);
    return adminUser;
  };

  const logout = () => {
    setAdmin(null);
    try {
      localStorage.removeItem('bc_admin');
    } catch {
      // ignore
    }
  };

  return (
    <Ctx.Provider value={{ admin, login, logout }}>
      {children}
    </Ctx.Provider>
  );
}

export const useAdminAuth = () => useContext(Ctx);
