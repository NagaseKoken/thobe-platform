"use client";

import React from "react";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer: React.FC = () => (
  <footer className="bg-gray-900 text-gray-300 py-12">
    <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-serif">THOBE</h2>
        <div className="flex space-x-4 text-xl">
          <a href="#" aria-label="Facebook" className="hover:text-white">
            <FaFacebookF />
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-white">
            <FaInstagram />
          </a>
          <a href="#" aria-label="X (Twitter)" className="hover:text-white">
            <FaTwitter />
          </a>
        </div>
      </div>

      <div className="flex justify-between">
        <div>
          <h3 className="font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link href="/about" className="hover:text-gray-200">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/careers" className="hover:text-gray-200">
                Careers
              </Link>
            </li>
            <li>
              <Link href="/press" className="hover:text-gray-200">
                Press
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link href="/contact" className="hover:text-gray-200">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/faqs" className="hover:text-gray-200">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="/returns" className="hover:text-gray-200">
                Return Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">Subscribe to our newsletter</h3>
        <p className="text-gray-400">
          Stay updated with the latest store updates.
        </p>
        <form className="flex max-w-md">
          <input
            type="email"
            placeholder="Email address"
            className="flex-1 bg-gray-800 placeholder-gray-500 text-gray-100 px-4 py-2 rounded-l-md focus:outline-none"
          />
          <button
            type="submit"
            className="bg-transparent border border-gray-500 text-gray-200 px-4 py-2 rounded-r-md hover:bg-gray-700 transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  </footer>
);

export default Footer;
