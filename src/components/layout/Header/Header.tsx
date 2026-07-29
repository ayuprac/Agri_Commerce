import { useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../features/auth/store/authStore';
import { useCartStore } from '../../../app/store/cartStore';
import { useWishlistStore } from '../../../app/store/wishlistStore';
import { 
  Sprout, 
  ShoppingCart, 
  Heart, 
  User, 
  Menu, 
  X,
  LogOut,
  Settings,
  Package,
  ChevronDown
} from 'lucide-react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const { totalItems } = useCartStore();
  const { totalItems: wishlistCount } = useWishlistStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
    setIsUserDropdownOpen(false);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Fertilizers', href: '/category/fertilizer' },
    { name: 'Cotton Seeds', href: '/category/cotton-seed' },
    { name: 'Shop All', href: '/shop' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-earth-200">
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Sprout className="h-8 w-8 text-primary-600 group-hover:scale-105 transition-transform" />
            <span className="text-xl font-display font-bold bg-gradient-to-r from-primary-700 to-primary-500 bg-clip-text text-transparent">
              AgriEcommerce
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-earth-700 hover:text-primary-600 font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/wishlist" className="relative p-2 text-earth-700 hover:text-primary-600 transition-colors">
              <Heart size={22} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative p-2 text-earth-700 hover:text-primary-600 transition-colors">
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-earth-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <User size={18} className="text-primary-600" />
                  </div>
                  <ChevronDown size={16} className="text-earth-600" />
                </button>

                {isUserDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40"
                      onClick={() => setIsUserDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-earth-200 py-2 z-50">
                      <div className="px-4 py-2 border-b border-earth-100">
                        <p className="text-sm font-medium text-earth-900">{user?.full_name}</p>
                        <p className="text-xs text-earth-500">{user?.email}</p>
                      </div>
                      <Link
                        to="/dashboard"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-earth-700 hover:bg-earth-50"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        <Settings size={16} />
                        <span>Dashboard</span>
                      </Link>
                      <Link
                        to="/orders"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-earth-700 hover:bg-earth-50"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        <Package size={16} />
                        <span>My Orders</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="btn-primary px-5 py-2 text-sm"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-earth-700"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="block py-2 text-earth-700 hover:text-primary-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-earth-200 space-y-3">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-earth-700">{user?.full_name}</span>
                    <button
                      onClick={handleLogout}
                      className="text-red-600"
                    >
                      Logout
                    </button>
                  </div>
                  <Link
                    to="/dashboard"
                    className="block py-2 text-earth-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                </>
              ) : (
                <Link
                  to="/login"
                  className="block btn-primary text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};