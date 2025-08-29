'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { PRODUCT_CATEGORIES } from '@/lib/constants';

// Mock featured products for homepage
const FEATURED_PRODUCTS = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 199.99,
    originalPrice: 249.99,
    image: 'https://placehold.co/400x400?text=Premium+Wireless+Headphones+with+Noise+Cancellation',
    rating: 4.8,
    reviews: 1247,
    category: 'Electronics',
    badge: 'Best Seller'
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    price: 299.99,
    image: 'https://placehold.co/400x400?text=Smart+Fitness+Watch+with+Health+Monitoring',
    rating: 4.6,
    reviews: 892,
    category: 'Electronics',
    badge: 'New Arrival'
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    price: 29.99,
    originalPrice: 39.99,
    image: 'https://placehold.co/400x400?text=Premium+Organic+Cotton+T-Shirt+Sustainable+Fashion',
    rating: 4.7,
    reviews: 456,
    category: 'Clothing',
    badge: 'Eco-Friendly'
  },
  {
    id: '4',
    name: 'Modern Table Lamp',
    price: 89.99,
    image: 'https://placehold.co/400x400?text=Modern+Minimalist+Table+Lamp+Home+Decor',
    rating: 4.5,
    reviews: 234,
    category: 'Home & Garden',
    badge: 'Editor\'s Choice'
  }
];

export default function HomePage() {
  const { addToCart } = useCart();

  const handleAddToCart = async (productId: string) => {
    await addToCart(productId, 1);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
                  Your Ultimate
                  <span className="text-blue-600"> Shopping</span>
                  <br />
                  Destination
                </h1>
                <p className="text-xl text-slate-600 max-w-lg">
                  Discover millions of products from trusted sellers worldwide. 
                  From electronics to fashion, we've got everything you need.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products">
                  <Button size="lg" className="text-lg px-8 py-3">
                    Start Shopping
                  </Button>
                </Link>
                <Link href="/auth/seller-register">
                  <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                    Become a Seller
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-8 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  🚚 <span>Free shipping over $50</span>
                </div>
                <div className="flex items-center gap-2">
                  ↩️ <span>30-day returns</span>
                </div>
                <div className="flex items-center gap-2">
                  🔒 <span>Secure checkout</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3">
                <img
                  src="https://placehold.co/600x400?text=Online+Shopping+Experience+E-commerce+Platform"
                  alt="Online Shopping Experience"
                  className="w-full h-80 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-slate-600">
              Explore our wide range of product categories
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {PRODUCT_CATEGORIES.map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.id}`}
                className="group"
              >
                <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                      <span className="text-2xl">
                        {category.id === 'electronics' && '📱'}
                        {category.id === 'clothing' && '👕'}
                        {category.id === 'home' && '🏠'}
                        {category.id === 'health' && '💄'}
                        {category.id === 'sports' && '⚽'}
                        {category.id === 'books' && '📚'}
                      </span>
                    </div>
                    <h3 className="font-semibold text-slate-900 group-hover:text-blue-600">
                      {category.name}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-slate-600">
              Handpicked products just for you
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_PRODUCTS.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                <div className="relative overflow-hidden">
                  {product.badge && (
                    <Badge 
                      className="absolute top-3 left-3 z-10"
                      variant={product.badge === 'Best Seller' ? 'destructive' : 'secondary'}
                    >
                      {product.badge}
                    </Badge>
                  )}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg line-clamp-2">
                      {product.name}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-sm text-slate-500">
                    {product.category}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}
                          >
                            ⭐
                          </span>
                        ))}
                      </div>
                      <span className="text-sm text-slate-600">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-slate-900">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-slate-500 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    <Button
                      onClick={() => handleAddToCart(product.id)}
                      className="w-full"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/products">
              <Button variant="outline" size="lg">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Why Choose MarketPlace?
            </h2>
            <p className="text-lg text-slate-600">
              We're committed to providing the best shopping experience
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                🚚
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Shipping</h3>
              <p className="text-slate-600">Free shipping on orders over $50 with quick delivery options</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                🔒
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
              <p className="text-slate-600">Your transactions are protected with industry-standard encryption</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                ↩️
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
              <p className="text-slate-600">30-day hassle-free returns with full refund guarantee</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                🎧
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-slate-600">Our customer service team is always here to help you</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Selling?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of sellers and start your online business today
          </p>
          <Link href="/auth/seller-register">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              Become a Seller
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}