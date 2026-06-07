import { Routes, Route } from 'react-router-dom';
import { Login } from '../pages/Auth/Login';
import { Register } from '../pages/Auth/Register';
import { PrivateRoute } from './PrivateRoute';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Home</div>} />
      <Route path="/shop" element={<div>Shop</div>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<PrivateRoute><div>Cart</div></PrivateRoute>} />
      <Route path="/wishlist" element={<PrivateRoute><div>Wishlist</div></PrivateRoute>} />
    </Routes>
  );
};