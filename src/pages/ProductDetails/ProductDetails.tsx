import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productsService } from '../../services/supabase/products';
import { Product } from '../../types/product.types';
import { useCartStore } from '../../stores/cartStore';
import { useWishlistStore } from '../../stores/wishlistStore';
import { ShoppingCart, Heart, Star, Truck, Shield, RefreshCw, Minus, Plus, Check } from 'lucide-react';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  const { addItem } = useCartStore();
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlistStore();

  const loadProduct = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productsService.getProductById(id!);
      if (data) {
        setProduct(data);
      } else {
        setError('Product not found');
      }
    } catch (err) {
      console.error('Error loading product:', err);
      setError('Failed to load product details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id, loadProduct]);

  const handleQuantityChange = (newQuantity: number) => {
    if (product) {
      const maxStock = product.stock_quantity ?? product.stock ?? 0;
      if (newQuantity >= 1 && newQuantity <= maxStock) {
        setQuantity(newQuantity);
      }
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        images: product.images,
        stock: product.stock_quantity ?? product.stock ?? 0,
        unit: product.unit
      });
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const handleWishlistToggle = () => {
    if (product) {
      if (isInWishlist(product.id)) {
        removeFromWishlist(product.id);
      } else {
        addToWishlist(product);
      }
    }
  };

  const getRating = () => {
    return product?.average_rating ?? product?.rating ?? 0;
  };

  const getReviewsCount = () => {
    return product?.total_reviews ?? product?.reviews_count ?? 0;
  };

  const getStock = () => {
    return product?.stock_quantity ?? product?.stock ?? 0;
  };

  const getComparePrice = () => {
    return product?.compare_at_price ?? product?.original_price ?? 0;
  };

  const getDiscount = () => {
    const comparePrice = getComparePrice();
    if (comparePrice > (product?.price ?? 0)) {
      return Math.round(((comparePrice - (product?.price ?? 0)) / comparePrice) * 100);
    }
    return 0;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 text-xl mb-4">{error || 'Product not found'}</p>
          <button
            onClick={() => navigate('/shop')}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const stock = getStock();
  const rating = getRating();
  const reviewsCount = getReviewsCount();
  const discount = getDiscount();
  const comparePrice = getComparePrice();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-gray-600">
        <button onClick={() => navigate('/')} className="hover:text-green-600">Home</button>
        <span className="mx-2">/</span>
        <button onClick={() => navigate('/shop')} className="hover:text-green-600">Shop</button>
        <span className="mx-2">/</span>
        <span className="text-gray-800">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          <div className="bg-gray-100 rounded-lg overflow-hidden mb-4">
            <img
              src={product.images?.[selectedImage] || '/api/placeholder/600/600'}
              alt={product.name}
              className="w-full h-96 object-cover"
            />
          </div>
          {product.images && product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-green-600' : 'border-gray-200'
                  }`}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
          
          {/* Rating */}
          {rating > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold ml-1">{rating.toFixed(1)}</span>
              </div>
              <span className="text-gray-500">•</span>
              <span className="text-gray-600">{reviewsCount} reviews</span>
              {product.total_sold && (
                <>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-600">{product.total_sold}+ sold</span>
                </>
              )}
            </div>
          )}

          {/* Price */}
          <div className="mb-4">
            {comparePrice > product.price ? (
              <div>
                <span className="text-3xl font-bold text-green-600">
                  ₹{product.price.toLocaleString()}
                </span>
                <span className="text-xl text-gray-500 line-through ml-3">
                  ₹{comparePrice.toLocaleString()}
                </span>
                <span className="ml-3 bg-red-500 text-white px-2 py-1 rounded text-sm">
                  Save {discount}%
                </span>
              </div>
            ) : (
              <span className="text-3xl font-bold text-green-600">
                ₹{product.price.toLocaleString()}
              </span>
            )}
            <span className="text-gray-500 ml-2">/{product.unit}</span>
          </div>

          {/* Stock Status */}
          <div className="mb-4">
            {stock > 0 ? (
              <div className="flex items-center text-green-600">
                <Check className="w-5 h-5 mr-1" />
                <span>In Stock ({stock} {product.unit} available)</span>
              </div>
            ) : (
              <div className="text-red-600">
                <span>Out of Stock</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
            <p className="text-gray-600">{product.description}</p>
          </div>

          {/* Specifications */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Specifications</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-600 capitalize">{key}:</span>
                      <span className="font-medium text-gray-800">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          {stock > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-2">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="px-3 py-2 hover:bg-gray-100 disabled:opacity-50"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 min-w-[60px] text-center">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= stock}
                    className="px-3 py-2 hover:bg-gray-100 disabled:opacity-50"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-gray-600">{stock} {product.unit} available</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={handleAddToCart}
              disabled={stock === 0}
              className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 ${
                stock > 0
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
            </button>
            <button
              onClick={handleBuyNow}
              disabled={stock === 0}
              className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 ${
                stock > 0
                  ? 'bg-orange-600 text-white hover:bg-orange-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Buy Now
            </button>
            <button
              onClick={handleWishlistToggle}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center"
            >
              <Heart
                className={`w-5 h-5 ${
                  isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
                }`}
              />
            </button>
          </div>

          {/* Shipping Info */}
          <div className="border-t border-gray-200 pt-6 space-y-3">
            <div className="flex items-center gap-3 text-gray-600">
              <Truck className="w-5 h-5" />
              <span>Free delivery on orders over ₹500</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Shield className="w-5 h-5" />
              <span>100% secure payment</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <RefreshCw className="w-5 h-5" />
              <span>7 days return policy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};