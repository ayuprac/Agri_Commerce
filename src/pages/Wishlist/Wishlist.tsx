import React from 'react';
import { useWishlistStore } from '../../stores/wishlistStore';
import { useCartStore } from '../../stores/cartStore';
import { Heart, ShoppingCart, Trash2, ArrowRight, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Wishlist: React.FC = () => {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const { addItem } = useCartStore();
  const [addedItems, setAddedItems] = React.useState<Set<string>>(new Set());

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
    
    // Show feedback
    setAddedItems(prev => new Set(prev).add(item.id));
    setTimeout(() => {
      setAddedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(item.id);
        return newSet;
      });
    }, 2000);
  };

  const handleMoveAllToCart = () => {
    items.forEach(item => {
      if (item.stock > 0) {
        addItem({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
          images: item.images,
          stock: item.stock,
          unit: item.unit
        });
      }
    });
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Save your favorite agricultural products here to buy them later or quickly add to cart.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Browse Products
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  const inStockItems = items.filter(item => item.stock > 0);
  const outOfStockItems = items.filter(item => item.stock === 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Wishlist</h1>
          <p className="text-gray-600 mt-1">{items.length} items saved</p>
        </div>
        
        {items.length > 0 && (
          <div className="flex gap-3">
            <button
              onClick={handleMoveAllToCart}
              disabled={inStockItems.length === 0}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                inStockItems.length > 0
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              Move All to Cart ({inStockItems.length})
            </button>
            <button
              onClick={clearWishlist}
              className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* In Stock Items */}
      {inStockItems.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">In Stock ({inStockItems.length})</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {inStockItems.map((product) => (
              <WishlistCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onRemove={removeItem}
                isAdded={addedItems.has(product.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Out of Stock Items */}
      {outOfStockItems.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Out of Stock ({outOfStockItems.length})</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {outOfStockItems.map((product) => (
              <WishlistCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onRemove={removeItem}
                isAdded={addedItems.has(product.id)}
                outOfStock
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Separate component for wishlist card to keep code organized
interface WishlistCardProps {
  product: any;
  onAddToCart: (product: any) => void;
  onRemove: (id: string) => void;
  isAdded: boolean;
  outOfStock?: boolean;
}

const WishlistCard: React.FC<WishlistCardProps> = ({ 
  product, 
  onAddToCart, 
  onRemove, 
  isAdded,
  outOfStock = false 
}) => {
  const discount = product.original_price 
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow relative">
      {/* Discount Badge */}
      {discount > 0 && !outOfStock && (
        <div className="absolute top-2 left-2 z-10 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
          -{discount}%
        </div>
      )}
      
      {/* Out of Stock Overlay */}
      {outOfStock && (
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center">
          <div className="bg-white px-4 py-2 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="font-semibold text-gray-800">Out of Stock</span>
          </div>
        </div>
      )}
      
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
            <Heart className="w-12 h-12" />
          </div>
        )}
        
        {/* Remove Button */}
        <button
          onClick={() => onRemove(product.id)}
          className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow z-20"
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </button>
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-lg text-gray-800 mb-1 hover:text-green-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
          {product.description}
        </p>
        
        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          {product.original_price ? (
            <>
              <span className="text-xl font-bold text-green-600">
                ₹{product.price.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500 line-through">
                ₹{product.original_price.toLocaleString()}
              </span>
            </>
          ) : (
            <span className="text-xl font-bold text-green-600">
              ₹{product.price.toLocaleString()}
            </span>
          )}
          <span className="text-sm text-gray-500">/{product.unit}</span>
        </div>
        
        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1 mb-3">
            <span className="text-yellow-400">★</span>
            <span className="text-sm font-medium text-gray-700">{product.rating}</span>
            {product.reviews_count && (
              <span className="text-xs text-gray-500">({product.reviews_count})</span>
            )}
          </div>
        )}
        
        {/* Stock Status & Add to Cart Button */}
        <div className="flex items-center justify-between">
          <span className={`text-xs ${!outOfStock ? 'text-green-600' : 'text-red-600'}`}>
            {!outOfStock ? `In Stock (${product.stock} ${product.unit})` : 'Currently Unavailable'}
          </span>
          
          <button
            onClick={() => onAddToCart(product)}
            disabled={outOfStock}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              !outOfStock
                ? isAdded
                  ? 'bg-green-700 text-white'
                  : 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            {isAdded ? 'Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};