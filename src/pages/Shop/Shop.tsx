import { useState, useEffect } from 'react';
import { ProductCard } from '../../components/products/ProductCard/ProductCard';
import { productService } from '../../services/supabase/products';
import type { Product, ProductFilters } from '../../types/product.types';
import { Search, Filter, X } from 'lucide-react';

export const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ProductFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  const [categories] = useState(['all', 'fertilizer', 'cotton_seed']);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  

useEffect(() => {
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await productService.getProducts(filters);
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  fetchProducts();
}, [filters]); // Runs when filters change

  const handleCategoryChange = (category: string) => {
    setFilters({
      ...filters,
      category: category === 'all' ? undefined : category,
    });
  };

  const handleSortChange = (sortBy: string) => {
    setFilters({ ...filters, sortBy: sortBy as 'price_asc' | 'price_desc' | 'newest' | 'popular' | 'rating' });
  };

  const handlePriceFilter = () => {
    setFilters({
      ...filters,
      minPrice: priceRange.min ? Number(priceRange.min) : undefined,
      maxPrice: priceRange.max ? Number(priceRange.max) : undefined,
    });
  };

  const handleSearch = (search: string) => {
    setFilters({ ...filters, search });
  };

  const clearFilters = () => {
    setFilters({});
    setPriceRange({ min: '', max: '' });
  };

  return (
    <div className="bg-earth-50 min-h-screen">
      <div className="container-custom py-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-display font-bold text-earth-900 mb-4">
            Shop Agricultural Products
          </h1>
          <p className="text-earth-600">
            Premium fertilizers and cotton seeds for better yield
          </p>
        </div>

        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-earth-400" />
            <input
              type="text"
              placeholder="Search products..."
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-earth-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        <div className="flex gap-6">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-xl p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-earth-900">Filters</h3>
                <button onClick={clearFilters} className="text-sm text-primary-600 hover:text-primary-700">
                  Clear All
                </button>
              </div>

              <div className="mb-6">
                <h4 className="font-medium mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={filters.category === (cat === 'all' ? undefined : cat)}
                        onChange={() => handleCategoryChange(cat)}
                        className="text-primary-600"
                      />
                      <span className="text-sm capitalize">{cat === 'all' ? 'All Products' : cat.replace('_', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium mb-3">Price Range</h4>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                    className="w-full px-3 py-1 border border-earth-300 rounded text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                    className="w-full px-3 py-1 border border-earth-300 rounded text-sm"
                  />
                </div>
                <button onClick={handlePriceFilter} className="w-full mt-2 btn-primary py-1 text-sm">
                  Apply
                </button>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-earth-600">{products.length} products found</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden btn-secondary py-2 px-4 text-sm"
                >
                  <Filter size={16} className="inline mr-1" />
                  Filters
                </button>
                <select
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="px-3 py-2 border border-earth-300 rounded-lg text-sm"
                >
                  <option value="">Sort by: Latest</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-lg mb-4" />
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-earth-500">No products found</p>
                <button onClick={clearFilters} className="btn-primary mt-4">
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilters(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-xl p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Filters</h3>
              <button onClick={() => setShowFilters(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="mb-6">
              <h4 className="font-medium mb-3">Category</h4>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category-mobile"
                      checked={filters.category === (cat === 'all' ? undefined : cat)}
                      onChange={() => {
                        handleCategoryChange(cat);
                        setShowFilters(false);
                      }}
                      className="text-primary-600"
                    />
                    <span className="text-sm capitalize">{cat === 'all' ? 'All Products' : cat.replace('_', ' ')}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <h4 className="font-medium mb-3">Price Range</h4>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                  className="w-full px-3 py-1 border border-earth-300 rounded"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                  className="w-full px-3 py-1 border border-earth-300 rounded"
                />
              </div>
              <button
                onClick={() => {
                  handlePriceFilter();
                  setShowFilters(false);
                }}
                className="w-full mt-2 btn-primary py-2"
              >
                Apply Price
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;