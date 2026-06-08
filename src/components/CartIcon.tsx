import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import { Link } from 'react-router-dom';

export const CartIcon: React.FC = () => {
  const totalItems = useCartStore((state) => state.totalItems);

  return (
    <Link to="/cart" className="relative">
      <ShoppingCart className="w-6 h-6 text-gray-700" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </Link>
  );
};