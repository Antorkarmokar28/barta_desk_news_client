"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaGooglePlusG,
  FaRss,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Column 1: Logo + Description */}
        <div>
          <h1 className="text-4xl font-bold text-[#0060d1] italic tracking-widest mb-6">
            BARTA<span className="text-white">DESK</span>
          </h1>
          <p className="text-gray-400 text-sm">
            Trusted source for breaking news, analysis, entertainment, and more.
            Stay informed with USNEWS.
          </p>
        </div>

        {/* Column 2: Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/world" className="hover:text-white">
                World
              </Link>
            </li>
            <li>
              <Link href="/technology" className="hover:text-white">
                Technology
              </Link>
            </li>
            <li>
              <Link href="/sports" className="hover:text-white">
                Sports
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <p className="text-gray-400 text-sm mb-3">Join us on social media</p>
          <div className="flex gap-2 text-white text-lg">
            <Link href="https://www.facebook.com/">
              <FaFacebookF />
            </Link>
            <Link href="https://x.com/">
              <FaTwitter />
            </Link>
            <Link href="https://www.google.com/">
              <FaGooglePlusG />
            </Link>
            <Link href="#">
              <FaRss />
            </Link>
            <Link href="https://www.youtube.com/">
              <FaYoutube />
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} Barta Desk. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
