export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: 'fertilizer' | 'cotton_seed';
  type: string;
  price: number;
  compare_at_price: number | null;
  unit: string;
  stock_quantity: number;
  images: string[];
  specifications: Record<string, unknown>;
  is_active: boolean;
  is_featured: boolean;
  total_sold: number;
  average_rating: number;
  total_reviews: number;
  created_at: string;
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price_asc' | 'price_desc' | 'newest' | 'popular' | 'rating';
  search?: string;
}