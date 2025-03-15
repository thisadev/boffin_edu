"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import PlaceholderImage from '@/components/ui/PlaceholderImage';

interface Instructor {
  id: number;
  name: string;
  bio: string | null;
  profileImageUrl: string | null;
}

interface ModuleTopic {
  id: number;
  title: string;
  description: string | null;
  orderIndex: number;
}

interface CourseModule {
  id: number;
  title: string;
  description: string | null;
  orderIndex: number;
  topics: ModuleTopic[];
}

interface Course {
  id: number;
  title: string;
  shortDescription: string;
  longDescription: string | null;
  slug: string;
  featuredImageUrl: string | null;
  level: string | null;
  deliveryMode: string | null;
  durationWeeks: number | null;
  durationHours: number | null;
  regularPrice: number;
  salePrice: number | null;
  learningOutcomes: string[];
  categoryId: number;
  curriculumPdfUrl: string | null;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  modules: CourseModule[];
  instructors: {
    instructor: Instructor;
  }[];
}

export default function CourseDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCourse() {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/courses/${slug}`);
        if (!response.ok) {
          if (response.status === 404) {
            setCourse(null);
          } else {
            throw new Error('Failed to fetch course');
          }
        } else {
          const data = await response.json();
          setCourse(data);
        }
      } catch (err) {
        console.error('Error fetching course:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    }

    if (slug) {
      fetchCourse();
    }
  }, [slug]);

  // Format duration string
  const formatDuration = () => {
    if (!course) return '';
    
    if (course.durationWeeks) {
      return `${course.durationWeeks} week${course.durationWeeks !== 1 ? 's' : ''}`;
    } else if (course.durationHours) {
      return `${course.durationHours} hour${course.durationHours !== 1 ? 's' : ''}`;
    }
    return 'Flexible';
  };
  
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
          u2190 Back to Courses
        </Link>
      </div>
    );
  }
  
  if (!course) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Course not found</h1>
        <p className="mb-8">The course you're looking for doesn't exist or has been moved.</p>
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
            u2190 Back to Courses
          </Link>
        </div>
        
        {/* Course Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:w-1/2">
              <div className="relative h-64 md:h-full w-full">
                <PlaceholderImage 
                  src={course.featuredImageUrl || ''} 
                  fallbackSrc="/images/course-placeholder.jpg"
                  alt={course.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <div className="md:w-1/2 p-8">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
                <span className="inline-block bg-primary/10 text-primary px-3 py-1 text-sm font-semibold rounded">
                  {course.category.name}
                </span>
              </div>
              <p className="text-gray-700 mb-6">{course.shortDescription}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Duration</h3>
                  <p className="text-lg font-medium">{formatDuration()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Level</h3>
                  <p className="text-lg font-medium">{course.level || 'All Levels'}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-end mb-2">
                  {course.salePrice ? (
                    <>
                      <span className="text-3xl font-bold text-gray-900">${course.salePrice}</span>
                      <span className="text-xl text-gray-500 line-through ml-3">${course.regularPrice}</span>
                    </>
                  ) : (
                    <span className="text-3xl font-bold text-gray-900">${course.regularPrice}</span>
                  )}
                </div>
                {course.salePrice && (
                  <p className="text-green-600 font-medium">
                    Save ${Number(course.regularPrice) - Number(course.salePrice)} ({Math.round((Number(course.regularPrice) - Number(course.salePrice)) / Number(course.regularPrice) * 100)}% off)
                  </p>
                )}
              </div>
              
              <div className="flex space-x-4">
                <Link 
                  href={`/register?category=${course.category.slug}&courseId=${course.id}`}
                  className="flex-1 bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors text-center"
                >
                  Enroll Now
                </Link>
                {course.curriculumPdfUrl && (
                  <a 
                    href={course.curriculumPdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Download Syllabus
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Course Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* What You'll Learn */}
            {course.learningOutcomes && course.learningOutcomes.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">What You'll Learn</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.learningOutcomes.map((outcome, index) => (
                    <div key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Course Syllabus */}
            {course.modules && course.modules.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Syllabus</h2>
                <div className="space-y-6">
                  {course.modules.map((module, index) => (
                    <div key={module.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                      <h3 className="text-xl font-bold mb-4">Module {index + 1}: {module.title}</h3>
                      {module.description && <p className="text-gray-700 mb-4">{module.description}</p>}
                      <ul className="space-y-2">
                        {module.topics.map((topic, topicIndex) => (
                          <li key={topic.id} className="flex items-start">
                            <span className="inline-block h-6 w-6 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center mr-3 mt-0.5">
                              {topicIndex + 1}
                            </span>
                            {topic.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Instructors */}
            {course.instructors && course.instructors.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Instructor{course.instructors.length > 1 ? 's' : ''}</h2>
                <div className="space-y-8">
                  {course.instructors.map((instructorItem) => (
                    <div key={instructorItem.instructor.id} className="flex flex-col md:flex-row items-center md:items-start">
                      <div className="relative h-24 w-24 rounded-full overflow-hidden mb-4 md:mb-0 md:mr-6">
                        <PlaceholderImage 
                          src={instructorItem.instructor.profileImageUrl || ''} 
                          fallbackSrc="/images/instructor-placeholder.jpg"
                          alt={instructorItem.instructor.name}
                          fill
                          className="object-cover"
                          priority
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{instructorItem.instructor.name}</h3>
                        <p className="text-gray-700">{instructorItem.instructor.bio}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Course Details Card */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Course Details</h3>
              <ul className="space-y-4">
                <li className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{formatDuration()}</span>
                </li>
                {course.level && (
                  <li className="flex justify-between">
                    <span className="text-gray-600">Level:</span>
                    <span className="font-medium">{course.level}</span>
                  </li>
                )}
                <li className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">{course.category.name}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Modules:</span>
                  <span className="font-medium">{course.modules.length}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Total Topics:</span>
                  <span className="font-medium">
                    {course.modules.reduce((total, module) => total + module.topics.length, 0)}
                  </span>
                </li>
                {course.deliveryMode && (
                  <li className="flex justify-between">
                    <span className="text-gray-600">Delivery Mode:</span>
                    <span className="font-medium">{course.deliveryMode}</span>
                  </li>
                )}
              </ul>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Link 
                  href={`/register?category=${course.category.slug}&courseId=${course.id}`}
                  className="block w-full bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors text-center"
                >
                  Enroll Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
