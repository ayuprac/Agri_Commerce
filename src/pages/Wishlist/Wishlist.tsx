import React from 'react';
import { useWishlistStore } from '../../stores/wishlistStore';
import { useCartStore } from '../../stores/cartStore';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Wishlist: React.FC = () => {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const { addItem } = useCartStore();

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      images: item.images,
      stock: item.stock,
      unit: item.unit
    });
  };

  const handleMoveAllToCart = () => {
    items.forEach(item => {
      addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        images: item.images,
        stock: item.stock,
        unit: item.unit
      });
    });
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          <Heart className="w-24 h-24 text-gray-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-8">Save your favorite items here to buy them later.</p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Explore Products
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Wishlist</h1>
        <div className="flex gap-3">
          <button
            onClick={handleMoveAllToCart}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Move All to Cart
          </button>
          <button
            onClick={clearWishlist}
            className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            {/* Product Image */}
            <div className="relative h-48 bg-gray-100">
              {product.images && product.images[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
              <button
                onClick={() => removeItem(product.id)}
                className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:shadow-lg"
              >
                <Trash2 className="w-5 h-5 text-red-500" />
              </button>
            </div>
            
            {/* Product Info */}
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-800 mb-1 line-clamp-2">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                {product.description}
              </p>
              
              <div className="flex items-center justify-between mb-3">
                <div>
                  {product.original_price ? (
                    <div>
                      <span className="text-xl font-bold text-green-600">
                        ₹{product.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500 line-through ml-2">
                        ₹{product.original_price.toLocaleString()}
                      </span>
                    </div>
                  ) : (
                    <span className="text-xl font-bold text-green-600">
                      ₹{product.price.toLocaleString()}
                    </span>
                  )}
                  <span className="text-sm text-gray-500">/{product.unit}</span>
                </div>
                
                {product.rating && (
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                  </div>
                )}
              </div>
              
              <button
                onClick={() => handleAddToCart(product)}
                disabled={product.stock === 0}
                className={`w-full py-2 rounded-lg flex items-center justify-center gap-2 ${
                  product.stock > 0
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};