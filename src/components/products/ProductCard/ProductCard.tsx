import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { useCartStore } from '../../../app/store/cartStore';
import { useWishlistStore } from '../../../app/store/wishlistStore';
import toast from 'react-hot-toast';
import type { Product } from '../../../types/product.types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const { addItem: addToWishlist, isInWishlist, removeItem } = useWishlistStore();
  
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images?.[0] || '/placeholder.jpg',
    });
    toast.success('Added to cart');
  };

  const handleWishlist = () => {
    if (isWishlisted) {
      removeItem(product.id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist({
        id: product.id,
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0] || '/placeholder.jpg',
      });
      toast.success('Added to wishlist');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <Link to={`/product/${product.slug}`} className="block relative h-48 overflow-hidden">
        <img
          src={product.images?.[0] || `https://picsum.photos/300/300?random=${product.id}`}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {product.compare_at_price && product.compare_at_price > product.price && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
            Sale
          </span>
        )}
        {product.stock_quantity < 10 && product.stock_quantity > 0 && (
          <span className="absolute bottom-3 left-3 bg-orange-500 text-white text-xs px-2 py-1 rounded">
            Only {product.stock_quantity} left
          </span>
        )}
        {product.stock_quantity === 0 && (
          <span className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-semibold">
            Out of Stock
          </span>
        )}
      </Link>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-primary-600 font-medium uppercase">
            {product.category === 'fertilizer' ? 'Fertilizer' : 'Cotton Seed'}
          </span>
          <button
            onClick={handleWishlist}
            className="p-1.5 rounded-full hover:bg-red-50 transition-colors"
          >
            <Heart
              size={18}
              className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'}
            />
          </button>
        </div>

        <Link to={`/product/${product.slug}`}>
          <h3 className="font-semibold text-earth-900 mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium ml-1">{product.average_rating || 0}</span>
          </div>
          <span className="text-xs text-earth-500">({product.total_reviews} reviews)</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-primary-600">₹{product.price}</span>
            {product.compare_at_price && (
              <span className="ml-2 text-sm text-earth-400 line-through">
                ₹{product.compare_at_price}
              </span>
            )}
            <div className="text-xs text-earth-500">{product.unit}</div>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={product.stock_quantity === 0}
            className="btn-primary p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};