import { Routes, Route } from 'react-router-dom';

import { Login } from '../pages/Auth/Login';
import { Register } from '../pages/Auth/Register';

import { Shop } from '../pages/Shop/Shop';
import { Cart } from '../pages/Cart/Cart';
import { Wishlist } from '../pages/Wishlist/Wishlist';

import { PrivateRoute } from './PrivateRoute';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Shop />} />

      <Route path="/shop" element={<Shop />} />

      <Route
        path="/cart"
        element={
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        }
      />

      <Route
        path="/wishlist"
        element={
          <PrivateRoute>
            <Wishlist />
          </PrivateRoute>
        }
      />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />
    </Routes>
  );
};