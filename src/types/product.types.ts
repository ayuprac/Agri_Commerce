export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  compare_at_price?: number;
  category: string;
  subcategory?: string;
  images: string[];
  stock: number;
  stock_quantity?: number;
  unit: string;
  rating?: number;
  average_rating?: number;
  reviews_count?: number;
  total_reviews?: number;
  is_featured?: boolean;
  is_on_sale?: boolean;
  discount_percent?: number;
  seller_id?: string;
  seller_name?: string;
  created_at?: string;
  updated_at?: string;
  total_sold?: number;
  specifications?: {
    brand?: string;
    model?: string;
    weight?: string;
    dimensions?: string;
    material?: string;
    [key: string]: any;
  };
}

export interface CartItem extends Product {
  quantity: number;
  selected?: boolean;
}

export interface WishlistItem extends Product {
  added_at?: string;
}

export interface ProductFilters {
  category?: string;
  subcategory?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price_asc' | 'price_desc' | 'rating_desc' | 'newest';
  search?: string;
  inStock?: boolean;
  onSale?: boolean;
}