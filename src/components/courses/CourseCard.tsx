"use client";

import Link from 'next/link';
import { Course } from '@/data/courses';
import PlaceholderImage from '@/components/ui/PlaceholderImage';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-48 w-full">
        <PlaceholderImage 
          src={course.image} 
          fallbackSrc="/images/course-placeholder.jpg"
          alt={course.title}
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
          <span className="inline-block bg-primary/10 text-primary px-2 py-1 text-xs font-semibold rounded">
            {course.category}
          </span>
        </div>
        <div className="flex items-center mb-4">
          <span className="text-gray-600 text-sm mr-4">{course.duration}</span>
          <span className="text-gray-600 text-sm">{course.level}</span>
        </div>
        <p className="text-gray-700 mb-4 line-clamp-2">{course.description}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-end">
            {course.discountPrice ? (
              <>
                <span className="text-2xl font-bold text-gray-900">${course.discountPrice}</span>
                <span className="text-sm text-gray-500 line-through ml-2">${course.price}</span>
              </>
            ) : (
              <span className="text-2xl font-bold text-gray-900">${course.price}</span>
            )}
          </div>
          <Link 
            href={`/courses/${course.slug}`}
            className="inline-block bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
