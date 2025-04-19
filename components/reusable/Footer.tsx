"use client";

import Link from "next/link";
import { Facebook, Instagram, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-white text-black px-6 py-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        
        {/* Brand & Social */}
        <div>
          <h2 className="text-lg font-bold mb-4">THOBEMARKET</h2>
          <div className="flex space-x-4">
            <Link href="#" aria-label="Facebook">
              <Facebook className="w-5 h-5 hover:text-gray-600 transition-colors" />
            </Link>
            <Link href="#" aria-label="Instagram">
              <Instagram className="w-5 h-5 hover:text-gray-600 transition-colors" />
            </Link>
            <Link href="#" aria-label="Twitter">
              <X className="w-5 h-5 hover:text-gray-600 transition-colors" />
            </Link>
          </div>
        </div>

        {/* Company */}
        <nav aria-labelledby="footer-company" className="space-y-2">
          <h4 id="footer-company" className="font-semibold">Company</h4>
          <Link href="/about-us" className="block hover:underline">About Us</Link>
          <Link href="/careers" className="block hover:underline">Careers</Link>
          <Link href="/press" className="block hover:underline">Press</Link>
          <Link href="/blog" className="block hover:underline">Blog</Link>
        </nav>

        {/* Support */}
        <nav aria-labelledby="footer-support" className="space-y-2">
          <h4 id="footer-support" className="font-semibold">Support</h4>
          <Link href="/contact" className="block hover:underline">Contact Us</Link>
          <Link href="/faqs" className="block hover:underline">FAQs</Link>
          <Link href="/shipping" className="block hover:underline">Shipping & Returns</Link>
          <Link href="/privacy" className="block hover:underline">Privacy Policy</Link>
        </nav>

        {/* Newsletter */}
        <div>
          <h4 className="font-semibold mb-2">Subscribe to our newsletter</h4>
          <p className="text-sm text-gray-500 mb-3">
            Stay updated with the latest store updates.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // 🔒 Backend handling later
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <Input
              id="newsletter-email"
              type="email"
              name="email"
              placeholder="Email address"
              className="flex-1"
              required
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </div>
    </footer>
  );
}