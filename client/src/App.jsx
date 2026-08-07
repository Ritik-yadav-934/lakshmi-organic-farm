import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';

import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import Subscription from './pages/Subscription.jsx';
import OurFarm from './pages/OurFarm.jsx';
import DeliveryAreas from './pages/DeliveryAreas.jsx';
import NotFound from './pages/NotFound.jsx';

import AdminLogin from './pages/admin/AdminLogin.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminProducts from './pages/admin/AdminProducts.jsx';
import AdminInventory from './pages/admin/AdminInventory.jsx';
import AdminAnalytics from './pages/admin/AdminAnalytics.jsx';
import AdminSettings from './pages/admin/AdminSettings.jsx';

export default function App() {
  return (
    <Routes>
      {/* Public site */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/our-farm" element={<OurFarm />} />
        {/*
          NOTE: /delivery was not in the originally approved route list
          (only /, /products, /subscription, /our-farm, /admin/*).
          Added here per your Phase 1 flag — remove if you'd rather fold
          the delivery checker into Home's #delivery section instead.
        */}
        <Route path="/delivery" element={<DeliveryAreas />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Admin */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="inventory" element={<AdminInventory />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  );
}
