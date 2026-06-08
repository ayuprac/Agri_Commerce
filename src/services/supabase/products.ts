import { supabase } from '../../lib/supabase/client';
import type { Product, ProductFilters } from '../../types/product.types';

export const productService = {
  async getProducts(filters?: ProductFilters) {
    let query = supabase
      .from('products')
      .select('*')
      .eq('is_active', true);

    if (filters?.category) {
      query = query.eq('category', filters.category);
    }

    if (filters?.minPrice) {
      query = query.gte('price', filters.minPrice);
    }

    if (filters?.maxPrice) {
      query = query.lte('price', filters.maxPrice);
    }

    if (filters?.search) {
      query = query.ilike('name', `%${filters.search}%`);
    }

    // Sorting
    if (filters?.sortBy) {
      switch (filters.sortBy) {
        case 'price_asc':
          query = query.order('price', { ascending: true });
          break;
        case 'price_desc':
          query = query.order('price', { ascending: false });
          break;
        case 'newest':
          query = query.order('created_at', { ascending: false });
          break;
        case 'popular':
          query = query.order('total_sold', { ascending: false });
          break;
        case 'rating':
          query = query.order('average_rating', { ascending: false });
          break;
      }
    } else {
      query = query.order('created_at', { ascending: false });
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as Product[];
  },

  async getProductBySlug(slug: string) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return data as Product;
  },

  async getFeaturedProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_featured', true)
      .eq('is_active', true)
      .limit(8);

    if (error) throw error;
    return data as Product[];
  },

  async getRelatedProducts(category: string, currentProductId: string) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .eq('is_active', true)
      .neq('id', currentProductId)
      .limit(4);

    if (error) throw error;
    return data as Product[];
  }
};