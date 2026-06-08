import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  Star, 
  Truck, 
  Shield, 
  RotateCcw,
  Minus,
  Plus,
  Check,
  AlertCircle
} from 'lucide-react';
import { productService } from '../../services/supabase/products';
import { useCartStore } from '../../app/store/cartStore';
import { useWishlistStore } from '../../app/store/wishlistStore';
import { ProductCard } from '../../components/products/ProductCard/ProductCard';
import toast from 'react-hot-toast';
import type { Product } from '../../types/product.types';

export const ProductDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description');
  
  const addToCart = useCartStore((state) => state.addItem);
  const { addItem: addToWishlist, isInWishlist, removeItem } = useWishlistStore();
  
  const isWishlisted = product ? isInWishlist(product.id) : false;
const loadProduct = async () => {
    setLoading(true);
    try {
      const data = await productService.getProductBySlug(slug!);
      setProduct(data);
      
      // Load related products
      const related = await productService.getRelatedProducts(data.category, data.id);
      setRelatedProducts(related);
    } catch (error) {
      console.error('Error loading product:', error);
      toast.error('Product not found');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      loadProduct();
    }
  }, [slug]);

  

  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.images?.[0] || '/placeholder.jpg',
    });
    
    toast.success(`${quantity} × ${product.name} added to cart`);
  };

  const handleWishlist = () => {
    if (!product) return;
    
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

  const updateQuantity = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= (product?.stock_quantity || 10)) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <div className="container-custom py-12">
        <div className="animate-pulse">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-200 rounded-lg" />
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-12 bg-gray-200 rounded w-1/3" />
              <div className="h-24 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-custom py-12 text-center">
        <h1 className="text-2xl font-bold text-earth-900">Product Not Found</h1>
        <Link to="/shop" className="btn-primary mt-4 inline-block">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const discount = product.compare_at_price 
    ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
    : 0;

  const images = product.images?.length ? product.images : [
    `https://picsum.photos/600/600?random=${product.id}`
  ];

  return (
    <div className="bg-earth-50 min-h-screen">
      <div className="container-custom py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-earth-500 mb-6">
          <Link to="/" className="hover:text-primary-600">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-primary-600">Shop</Link>
          <span>/</span>
          <Link to={`/category/${product.category}`} className="hover:text-primary-600 capitalize">
            {product.category === 'fertilizer' ? 'Fertilizers' : 'Cotton Seeds'}
          </Link>
          <span>/</span>
          <span className="text-earth-900">{product.name}</span>
        </div>

        {/* Product Main Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-auto object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === idx ? 'border-primary-600' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-primary-600 font-medium uppercase">
                  {product.category === 'fertilizer' ? 'Fertilizer' : 'Cotton Seed'}
                </span>
                {product.stock_quantity > 0 ? (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1">
                    <Check size={12} /> In Stock
                  </span>
                ) : (
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full flex items-center gap-1">
                    <AlertCircle size={12} /> Out of Stock
                  </span>
                )}
              </div>
              <h1 className="text-3xl lg:text-4xl font-display font-bold text-earth-900 mb-3">
                {product.name}
              </h1>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{product.average_rating || 0}</span>
                  <span className="text-earth-500">({product.total_reviews} reviews)</span>
                </div>
                <span className="text-earth-300">|</span>
                <span className="text-earth-600">{product.total_sold} sold</span>
              </div>
            </div>

            <div className="border-t border-b border-earth-200 py-6">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-primary-600">₹{product.price}</span>
                {product.compare_at_price && (
                  <>
                    <span className="text-xl text-earth-400 line-through">
                      ₹{product.compare_at_price}
                    </span>
                    <span className="text-green-600 font-semibold">{discount}% OFF</span>
                  </>
                )}
              </div>
              <div className="text-sm text-earth-500 mt-2">
                {product.unit} unit
              </div>
            </div>

            <div>
              <p className="text-earth-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-earth-700 font-medium">Quantity:</span>
                <div className="flex items-center gap-3 border border-earth-300 rounded-lg">
                  <button
                    onClick={() => updateQuantity(-1)}
                    disabled={quantity <= 1}
                    className="p-2 hover:bg-earth-100 disabled:opacity-50"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(1)}
                    disabled={quantity >= product.stock_quantity}
                    className="p-2 hover:bg-earth-100 disabled:opacity-50"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <span className="text-sm text-earth-500">
                  {product.stock_quantity} units available
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock_quantity === 0}
                  className="flex-1 btn-primary flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button
                  onClick={handleWishlist}
                  className="btn-secondary flex items-center justify-center gap-2"
                >
                  <Heart className={isWishlisted ? 'fill-red-500 text-red-500' : ''} size={20} />
                  Wishlist
                </button>
                <button className="btn-secondary flex items-center justify-center gap-2">
                  <Share2 size={20} />
                  Share
                </button>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-earth-100 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-primary-600" />
                <div>
                  <p className="text-sm font-medium">Free Delivery</p>
                  <p className="text-xs text-earth-600">On orders above ₹1000</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-primary-600" />
                <div>
                  <p className="text-sm font-medium">100% Authentic</p>
                  <p className="text-xs text-earth-600">Quality guaranteed products</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="w-5 h-5 text-primary-600" />
                <div>
                  <p className="text-sm font-medium">Easy Returns</p>
                  <p className="text-xs text-earth-600">7 days return policy</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-12">
          <div className="flex border-b border-earth-200">
            {(['description', 'specifications', 'reviews'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-earth-600 hover:text-primary-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-earth-700 leading-relaxed">
                  {product.description || 'No description available.'}
                </p>
              </div>
            )}

            {activeTab === 'specifications' && product.specifications && (
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex border-b border-earth-100 py-2">
                    <span className="w-1/3 font-medium capitalize text-earth-900">
                      {key.replace(/_/g, ' ')}:
                    </span>
                    <span className="w-2/3 text-earth-600">{String(value)}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="text-center py-8">
                <p className="text-earth-500">Reviews coming soon in Phase 16</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-display font-bold text-earth-900 mb-6">
              You May Also Like
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;