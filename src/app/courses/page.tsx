"use client";

import { courseCategories } from '@/data/courses';
import CategoryCard from '@/components/courses/CategoryCard';
import Link from 'next/link';

export default function CoursesPage() {
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courseCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>
        
        {/* Featured Courses Section - We could add this later */}
        
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
