'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-auto">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-xl">
              🛍️ <span>MarketPlace</span>
            </div>
            <p className="text-slate-300 text-sm">
              Your trusted online marketplace connecting buyers and sellers worldwide. 
              Discover quality products at competitive prices.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white p-2">
                📘 Facebook
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white p-2">
                🐦 Twitter
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white p-2">
                📸 Instagram
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/products" className="block text-slate-300 hover:text-white text-sm">
                All Products
              </Link>
              <Link href="/products?category=electronics" className="block text-slate-300 hover:text-white text-sm">
                Electronics
              </Link>
              <Link href="/products?category=clothing" className="block text-slate-300 hover:text-white text-sm">
                Fashion
              </Link>
              <Link href="/products?category=home" className="block text-slate-300 hover:text-white text-sm">
                Home & Garden
              </Link>
              <Link href="/auth/seller-register" className="block text-slate-300 hover:text-white text-sm">
                Become a Seller
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Customer Service</h3>
            <div className="space-y-2">
              <Link href="/support" className="block text-slate-300 hover:text-white text-sm">
                Help Center
              </Link>
              <Link href="/contact" className="block text-slate-300 hover:text-white text-sm">
                Contact Us
              </Link>
              <Link href="/shipping" className="block text-slate-300 hover:text-white text-sm">
                Shipping Info
              </Link>
              <Link href="/returns" className="block text-slate-300 hover:text-white text-sm">
                Returns & Refunds
              </Link>
              <Link href="/track-order" className="block text-slate-300 hover:text-white text-sm">
                Track Your Order
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Stay Updated</h3>
            <p className="text-slate-300 text-sm">
              Subscribe to get special offers, free giveaways, and deals.
            </p>
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
              />
              <Button className="w-full">Subscribe</Button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-300">
                📞 <span>1-800-SHOP-NOW</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                📧 <span>help@marketplace.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                📍 <span>123 Commerce St, New York, NY</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-slate-700" />

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-4 text-sm text-slate-300">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-white">
              Cookie Policy
            </Link>
            <Link href="/accessibility" className="hover:text-white">
              Accessibility
            </Link>
          </div>
          <div className="text-sm text-slate-300">
            © 2024 MarketPlace. All rights reserved.
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-slate-800 border-t border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-center items-center gap-8 flex-wrap">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              🔒 <span>Secure Checkout</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              🚚 <span>Fast Shipping</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              ↩️ <span>Easy Returns</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              🎧 <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}