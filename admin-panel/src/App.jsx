import { useState } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { useAdminAuth } from './context/AdminAuthContext';
import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ProductManager from './pages/ProductManager.jsx';
import OrderFulfillment from './pages/OrderFulfillment.jsx';

function Protected() {
  const { admin } = useAdminAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  if (!admin) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[260px_1fr]">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="flex min-w-0 flex-col">
        <Header onMenu={() => setMenuOpen(true)} />
        <main className="flex-1 px-5 py-8 md:px-8"><Outlet /></main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
      <Route element={<Protected />}>
        <Route index element={<Dashboard />} />
        <Route path="/products" element={<ProductManager />} />
        <Route path="/orders" element={<OrderFulfillment />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
