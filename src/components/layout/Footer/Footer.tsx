import { Link } from 'react-router-dom';
import {   Mail, Phone, MapPin } from 'lucide-react';
import { Sprout } from 'lucide-react';


export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Shipping Policy', href: '/shipping' },
    { name: 'Return Policy', href: '/returns' },
  ];

  const categories = [
    { name: 'Fertilizers', href: '/category/fertilizer' },
    { name: 'Cotton Seeds', href: '/category/cotton-seed' },
    { name: 'Organic Fertilizers', href: '/category/organic-fertilizer' },
    { name: 'Hybrid Seeds', href: '/category/hybrid-seeds' },
  ];

  return (
    <footer className="bg-earth-900 text-earth-300">
      {/* Main Footer */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Sprout className="h-8 w-8 text-primary-500" />
              <span className="text-xl font-display font-bold text-white">
                AgriEcommerce
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Your trusted partner for high-quality agricultural fertilizers and cotton seeds. 
              Empowering farmers with premium products since 2024.
            </p>
            <div className="flex space-x-4 mt-4">
              
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm hover:text-primary-500 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Shop by Category</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link to={category.href} className="text-sm hover:text-primary-500 transition-colors">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-primary-500 mt-0.5" />
                <span className="text-sm">123 Agriculture Street, Farm District, Delhi - 110001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-primary-500" />
                <span className="text-sm">+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-primary-500" />
                <span className="text-sm">support@agriecommerce.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 pt-8 border-t border-earth-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="text-sm">✓ 100% Authentic Products</div>
            <div className="text-sm">✓ Free Shipping on Orders ₹1000+</div>
            <div className="text-sm">✓ Secure Payments</div>
            <div className="text-sm">✓ 24/7 Customer Support</div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-earth-950 py-4">
        <div className="container-custom text-center text-sm">
          © {currentYear} AgriEcommerce. All rights reserved. Designed for Indian Farmers.
        </div>
      </div>
    </footer>
  );
};