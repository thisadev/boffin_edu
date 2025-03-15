"use client";

import { useParams } from 'next/navigation';
import { getCategoryBySlug, getCoursesByCategory } from '@/data/courses';
import CourseCard from '@/components/courses/CourseCard';
import Link from 'next/link';

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const category = getCategoryBySlug(slug);
  const courses = category ? getCoursesByCategory(category.id) : [];
  
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
          <h1 className="text-3xl font-bold text-gray-900 mt-2">{category.title}</h1>
          <p className="text-xl text-gray-600 mt-2">{category.description}</p>
        </div>
        
        {courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
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
