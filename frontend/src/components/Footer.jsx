import React from 'react';
import { FaFacebook, FaGithub, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-2xl font-bold">DB Central Motors</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your trusted partner in premium automotive experiences since 2010.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="https://fahad-khan-portfolio.vercel.app/" className="text-gray-400 hover:text-indigo-400 transition-colors">About Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <div className="text-gray-400 space-y-1">
              <p>Super Chowk</p>
              <p>Bahawalpur, Pakistan</p>
              <p>Email: info@dbcentralmotors.com</p>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                <FaInstagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                <FaGithub className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                <FaYoutube className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 pt-8 mt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} DB Central Motors. All rights reserved.
          </p>
          <div className="mt-2 text-gray-500 text-xs">
            <a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a> | 
            <a href="#" className="hover:text-indigo-400 transition-colors"> Terms of Service</a> | 
            <a href="#" className="hover:text-indigo-400 transition-colors"> Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;