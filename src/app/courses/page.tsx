"use client";

import { useState, useEffect } from 'react';
import CategoryCard from '@/components/courses/CategoryCard';
import Link from 'next/link';

interface Category {
  id: number;
  name: string;
  description: string | null;
  slug: string;
  imageUrl: string | null;
  courseCount: number;
}

export default function CoursesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container-custom py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Course Catalog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive range of data science and analytics courses designed to help you advance your career.
          </p>
        </div>
        
        {/* Course Categories Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Categories</h2>
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <h3 className="text-xl font-medium mb-2">No categories available</h3>
              <p className="text-gray-600">Check back later for new course categories!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          )}
        </section>
        
        {/* Call to Action */}
        <section className="bg-primary rounded-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Not sure which course is right for you?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Our education advisors can help you choose the perfect learning path based on your career goals and experience level.
          </p>
          <Link 
            href="/contact"
            className="inline-block bg-white text-primary font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Schedule a Consultation
          </Link>
        </section>
      </div>
    </div>
  );
}
