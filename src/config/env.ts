interface EnvConfig {
  supabase: {
    url: string;
    anonKey: string;
  };
  razorpay: {
    keyId: string;
  };
  app: {
    name: string;
    url: string;
    apiUrl: string;
  };
  features: {
    enableWishlist: boolean;
    enableReviews: boolean;
  };
}

class EnvironmentValidator {
  private static requiredVars = [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY',
    'VITE_RAZORPAY_KEY_ID'
  ];

  static validate(): void {
    const missing = this.requiredVars.filter(
      (varName) => !import.meta.env[varName]
    );
    
    if (missing.length > 0) {
      throw new Error(
        `Missing required environment variables: ${missing.join(', ')}`
      );
    }
  }

  static getConfig(): EnvConfig {
    this.validate();
    
    return {
      supabase: {
        url: import.meta.env.VITE_SUPABASE_URL,
        anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
      },
      razorpay: {
        keyId: import.meta.env.VITE_RAZORPAY_KEY_ID,
      },
      app: {
        name: import.meta.env.VITE_APP_NAME || 'AgriEcommerce',
        url: import.meta.env.VITE_APP_URL || 'http://localhost:5173',
        apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5173/api',
      },
      features: {
        enableWishlist: import.meta.env.VITE_ENABLE_WISHLIST === 'true',
        enableReviews: import.meta.env.VITE_ENABLE_REVIEWS === 'true',
      },
    };
  }
}

export const env = EnvironmentValidator.getConfig();