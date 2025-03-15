"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import CourseCard from '@/components/courses/CourseCard';
import Link from 'next/link';

interface Course {
  id: number;
  title: string;
  shortDescription: string;
  slug: string;
  featuredImageUrl: string | null;
  level: string | null;
  deliveryMode: string | null;
  durationWeeks: number | null;
  durationHours: number | null;
  regularPrice: number;
  salePrice: number | null;
  categoryId: number;
  categoryName: string;
  categorySlug: string;
  moduleCount: number;
  instructors: {
    id: number;
    name: string;
    profileImageUrl: string | null;
  }[];
}

interface Category {
  id: number;
  name: string;
  description: string | null;
  slug: string;
  imageUrl: string | null;
  courses: Course[];
}

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [category, setCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategory() {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/categories/${slug}`);
        if (!response.ok) {
          if (response.status === 404) {
            setCategory(null);
          } else {
            throw new Error('Failed to fetch category');
          }
        } else {
          const data = await response.json();
          setCategory(data);
        }
      } catch (err) {
        console.error('Error fetching category:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    }

    if (slug) {
      fetchCategory();
    }
  }, [slug]);
  
  if (isLoading) {
    return (
      <div className="container-custom py-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-custom py-16">
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
        <Link 
          href="/courses"
          className="text-primary hover:underline mb-4 inline-block"
        >
          ← Back to Courses
        </Link>
      </div>
    );
  }
  
  if (!category) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Category not found</h1>
        <p className="mb-8">The category you're looking for doesn't exist or has been moved.</p>
        <Link 
          href="/courses"
          className="inline-block bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors"
        >
          Back to Courses
        </Link>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container-custom py-16">
        <div className="mb-8">
          <Link 
            href="/courses"
            className="text-primary hover:underline mb-4 inline-block"
          >
            ← Back to All Categories
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">{category.name}</h1>
          <p className="text-xl text-gray-600 mt-2">{category.description}</p>
        </div>
        
        {category.courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {category.courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <h3 className="text-xl font-medium mb-2">No courses available</h3>
            <p className="text-gray-600">New courses in this category are coming soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
