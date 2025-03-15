"use client";

import Link from 'next/link';
import PlaceholderImage from '@/components/ui/PlaceholderImage';

interface CourseProps {
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

interface CourseCardProps {
  course: CourseProps;
}

export default function CourseCard({ course }: CourseCardProps) {
  // Format duration string
  const formatDuration = () => {
    if (course.durationWeeks) {
      return `${course.durationWeeks} week${course.durationWeeks !== 1 ? 's' : ''}`;
    } else if (course.durationHours) {
      return `${course.durationHours} hour${course.durationHours !== 1 ? 's' : ''}`;
    }
    return 'Flexible';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-48 w-full">
        <PlaceholderImage 
          src={course.featuredImageUrl || ''} 
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
            {course.categoryName}
          </span>
        </div>
        <div className="flex items-center mb-4">
          <span className="text-gray-600 text-sm mr-4">{formatDuration()}</span>
          {course.level && <span className="text-gray-600 text-sm">{course.level}</span>}
        </div>
        <p className="text-gray-700 mb-4 line-clamp-2">{course.shortDescription}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-end">
            {course.salePrice ? (
              <>
                <span className="text-2xl font-bold text-gray-900">${course.salePrice}</span>
                <span className="text-sm text-gray-500 line-through ml-2">${course.regularPrice}</span>
              </>
            ) : (
              <span className="text-2xl font-bold text-gray-900">${course.regularPrice}</span>
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
