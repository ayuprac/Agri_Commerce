import { useEffect } from 'react';
import { motion } from 'framer-motion';

import { Link } from 'react-router-dom';
import { 
  Sprout, 
  Truck, 
  Shield, 
  Leaf, 
  Star, 
  ChevronRight,
  Droplets,
  TrendingUp,
  Award
} from 'lucide-react';

// Components
const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-earth-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-400 rounded-full filter blur-3xl" />
      </div>
      
      <div className="container-custom relative py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary-700/50 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Sprout className="w-4 h-4 text-primary-300" />
              <span className="text-sm font-medium">Trusted by 10,000+ Farmers</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-display font-bold leading-tight mb-6">
              Grow More with 
              <span className="text-primary-300"> Premium Agricultural</span> Products
            </h1>
            
            <p className="text-lg text-primary-100 mb-8 leading-relaxed">
              India's most trusted platform for high-quality fertilizers and cotton seeds. 
              Boost your crop yield with scientifically formulated products.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/shop" className="btn-primary bg-white text-primary-700 hover:bg-primary-50 text-center">
                Shop Now
                <ChevronRight className="inline ml-2 w-4 h-4" />
              </Link>
              <Link to="/category/fertilizer" className="btn-secondary bg-primary-700 text-white hover:bg-primary-600">
                Explore Products
              </Link>
            </div>
            
            <div className="flex gap-8 mt-8 pt-8 border-t border-primary-700">
              <div>
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm text-primary-200">Products</div>
              </div>
              <div>
                <div className="text-2xl font-bold">50k+</div>
                <div className="text-sm text-primary-200">Happy Farmers</div>
              </div>
              <div>
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm text-primary-200">Authentic</div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://picsum.photos/600/500?random=1"
                alt="Farmer with crops"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 to-transparent" />
            </div>
            
            {/* Floating badges */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute -top-5 -right-5 bg-white rounded-lg shadow-lg p-3"
            >
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-primary-600" />
                <span className="text-sm font-semibold text-earth-900">Free Shipping</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  const features = [
    { icon: Leaf, title: "100% Organic", description: "Eco-friendly products safe for soil" },
    { icon: Truck, title: "Fast Delivery", description: "Pan-India delivery within 3-5 days" },
    { icon: Shield, title: "Quality Assured", description: "Lab-tested premium products" },
    { icon: Award, title: "Best Prices", description: "Direct from manufacturers" },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow"
            >
              <div className="inline-flex p-3 bg-primary-100 rounded-full mb-4">
                <feature.icon className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-earth-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "NPK 19:19:19 Fertilizer",
      category: "Fertilizer",
      price: 450,
      image: "https://images.unsplash.com/photo-1585336261022-680e9ce1f5b0?w=300&h=300&fit=crop",
      rating: 4.8,
      reviews: 124
    },
    {
      id: 2,
      name: "Bt Cotton Seeds - RCH 776",
      category: "Cotton Seeds",
      price: 950,
      image: "https://images.unsplash.com/photo-1592982537447-6f2a6a0a5c14?w=300&h=300&fit=crop",
      rating: 4.9,
      reviews: 89
    },
    {
      id: 3,
      name: "Urea 46% Nitrogen",
      category: "Fertilizer",
      price: 350,
      image: "https://images.unsplash.com/photo-1585336261022-680e9ce1f5b0?w=300&h=300&fit=crop",
      rating: 4.7,
      reviews: 203
    },
    {
      id: 4,
      name: "Organic Cotton Seeds K-1",
      category: "Cotton Seeds",
      price: 650,
      image: "https://images.unsplash.com/photo-1592982537447-6f2a6a0a5c14?w=300&h=300&fit=crop",
      rating: 4.6,
      reviews: 67
    },
  ];

  return (
    <section className="py-20 bg-earth-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-earth-900 mb-4">
            Featured Products
          </h2>
          <p className="text-earth-600 max-w-2xl mx-auto">
            Discover our most popular agricultural products trusted by farmers across India
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-primary-600 text-white text-xs px-2 py-1 rounded">
                  {product.category}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-earth-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium ml-1">{product.rating}</span>
                  </div>
                  <span className="text-xs text-earth-500">({product.reviews} reviews)</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary-600">₹{product.price}</span>
                  <button className="btn-primary px-4 py-2 text-sm">
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/shop" className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:gap-3 transition-all">
            View All Products
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

const CategoriesSection = () => {
  const categories = [
    { name: "Fertilizers", icon: Droplets, color: "bg-green-100", count: 245, href: "/category/fertilizer" },
    { name: "Cotton Seeds", icon: Sprout, color: "bg-blue-100", count: 128, href: "/category/cotton-seed" },
    { name: "Organic Products", icon: Leaf, color: "bg-emerald-100", count: 89, href: "/category/organic" },
    { name: "Growth Boosters", icon: TrendingUp, color: "bg-amber-100", count: 76, href: "/category/boosters" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-earth-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-earth-600">Find exactly what you need for your farm</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <Link to={category.href} className="block">
                <div className={`${category.color} rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-lg`}>
                  <div className="inline-flex p-4 bg-white rounded-full mb-4">
                    <category.icon className="w-10 h-10 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                  <p className="text-earth-600">{category.count} Products</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Rajesh Kumar",
      location: "Punjab",
      text: "The NPK fertilizer from AgriEcommerce increased my wheat yield by 30%. Highly recommended!",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      name: "Suman Devi",
      location: "Gujarat",
      text: "Bt cotton seeds are excellent quality. Germination rate is amazing. Will buy again.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      name: "Amit Patel",
      location: "Maharashtra",
      text: "Fast delivery and authentic products. Their customer support is very helpful.",
      rating: 4,
      image: "https://randomuser.me/api/portraits/men/2.jpg"
    },
  ];

  return (
    <section className="py-20 bg-primary-900 text-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
            What Farmers Say
          </h2>
          <p className="text-primary-200">Trusted by thousands of farmers across India</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full border-2 border-primary-400"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-primary-200">{testimonial.location}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
                ))}
              </div>
              <p className="text-primary-100 leading-relaxed">"{testimonial.text}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
      <div className="container-custom text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">
            Ready to Boost Your Farm Yield?
          </h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful farmers who trust AgriEcommerce for their agricultural needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop" className="btn-primary bg-white text-primary-700 hover:bg-primary-50">
              Start Shopping
            </Link>
            <Link to="/contact" className="btn-secondary bg-primary-500 text-white hover:bg-primary-400">
              Contact an Expert
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Main Home Component
export const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="overflow-hidden">
      <HeroSection />
      <FeaturesSection />
      <FeaturedProducts />
      <CategoriesSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
};

export default Home;