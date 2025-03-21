"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-boffin-background text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-10 h-10">
              <Image 
                src="/images/logo.svg" 
                alt="Boffin Institute Logo"
                width={40}
                height={40}
                priority
              />
            </div>
            <span className="text-xl font-bold text-white">Boffin Institute</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-boffin-primary transition-colors">
              Home
            </Link>
            <Link href="/courses" className="text-white hover:text-boffin-primary transition-colors">
              Courses
            </Link>
            <Link href="/about" className="text-white hover:text-boffin-primary transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="text-white hover:text-boffin-primary transition-colors">
              Contact
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/admin/login" className="text-white hover:text-boffin-primary transition-colors">
              Admin
            </Link>
            <Link 
              href="/register" 
              className="bg-boffin-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
            >
              Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-boffin-primary focus:outline-none focus:ring-2 focus:ring-boffin-primary"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-boffin-background border-t border-boffin-primary/20 ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <div className="flex flex-col space-y-2">
              <Link 
                href="/" 
                className="text-white hover:text-boffin-primary transition-colors block px-3 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/courses" 
                className="text-white hover:text-boffin-primary transition-colors block px-3 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Courses
              </Link>
              <Link 
                href="/about" 
                className="text-white hover:text-boffin-primary transition-colors block px-3 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                href="/contact" 
                className="text-white hover:text-boffin-primary transition-colors block px-3 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="flex space-x-4 pt-2 px-3">
                <Link 
                  href="/admin/login" 
                  className="text-white hover:text-boffin-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin
                </Link>
                <Link 
                  href="/register" 
                  className="bg-boffin-primary text-white px-3 py-1 rounded-md hover:bg-opacity-90 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
          </div>
        </div>
      </div>
    </header>
  );
}
