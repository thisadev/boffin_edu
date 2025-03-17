"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import PlaceholderImage from '@/components/ui/PlaceholderImage';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

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
      <Container className="py-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-boffin-primary"></div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-16">
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
        <Button variant="boffin-outline" asChild>
          <Link href="/courses">← Back to Courses</Link>
        </Button>
      </Container>
    );
  }
  
  if (!course) {
    return (
      <Container className="py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Course not found</h1>
        <p className="mb-8">The course you're looking for doesn't exist or has been moved.</p>
        <Button variant="boffin" asChild>
          <Link href="/courses">Back to Courses</Link>
        </Button>
      </Container>
    );
  }
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <Container className="py-16">
        <div className="mb-8">
          <Button variant="boffin-outline" asChild>
            <Link href="/courses">← Back to Courses</Link>
          </Button>
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
                <h1 className="text-3xl font-bold text-boffin-background">{course.title}</h1>
                <span className="inline-block bg-boffin-primary/10 text-boffin-primary px-3 py-1 text-sm font-semibold rounded">
                  {course.category.name}
                </span>
              </div>
              <p className="text-gray-700 mb-6">{course.shortDescription}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-boffin-background">Duration</h3>
                  <p className="text-lg font-medium text-boffin-background">{formatDuration()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-boffin-background">Level</h3>
                  <p className="text-lg font-medium text-boffin-background">{course.level || 'All Levels'}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-end mb-2">
                  {course.salePrice ? (
                    <>
                      <span className="text-3xl font-bold text-boffin-background">${course.salePrice}</span>
                      <span className="text-xl text-gray-500 line-through ml-3">${course.regularPrice}</span>
                    </>
                  ) : (
                    <span className="text-3xl font-bold text-boffin-background">${course.regularPrice}</span>
                  )}
                </div>
                {course.salePrice && (
                  <p className="text-green-600 font-medium">
                    Save ${Number(course.regularPrice) - Number(course.salePrice)} ({Math.round((Number(course.regularPrice) - Number(course.salePrice)) / Number(course.regularPrice) * 100)}% off)
                  </p>
                )}
              </div>
              
              <div className="flex space-x-4">
                <Button variant="boffin" size="lg" className="flex-1" asChild>
                  <Link href={`/register?category=${course.category.slug}&courseId=${course.id}`}>
                    Enroll Now
                  </Link>
                </Button>
                {course.curriculumPdfUrl && (
                  <Button variant="boffin-secondary" size="lg" asChild>
                    <a 
                      href={course.curriculumPdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download Syllabus
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Course Content */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-boffin-background">Course Content</h2>
          
          {course.modules.length > 0 ? (
            <div className="space-y-6">
              {course.modules
                .sort((a, b) => a.orderIndex - b.orderIndex)
                .map((module) => (
                  <div key={module.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-6 py-4">
                      <h3 className="text-lg font-semibold text-boffin-background">{module.title}</h3>
                      {module.description && <p className="mt-1 text-boffin-background/80">{module.description}</p>}
                    </div>
                    
                    <div className="divide-y divide-gray-200">
                      {module.topics
                        .sort((a, b) => a.orderIndex - b.orderIndex)
                        .map((topic) => (
                          <div key={topic.id} className="px-6 py-4">
                            <h4 className="font-medium text-boffin-background">{topic.title}</h4>
                            {topic.description && <p className="mt-1 text-sm text-boffin-background/80">{topic.description}</p>}
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-boffin-background/80">Detailed course content will be available soon.</p>
          )}
        </div>
        
        {/* Course Details */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8 h-full">
              <h2 className="text-2xl font-bold mb-6 text-boffin-background">About This Course</h2>
              
              {course.longDescription ? (
                <div className="prose max-w-none text-boffin-background/80">
                  <p>{course.longDescription}</p>
                </div>
              ) : (
                <p className="text-boffin-background/80">{course.shortDescription}</p>
              )}
              
              {course.learningOutcomes && course.learningOutcomes.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4 text-boffin-background">What You'll Learn</h3>
                  <ul className="space-y-2">
                    {course.learningOutcomes.map((outcome, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="h-5 w-5 text-boffin-primary flex-shrink-0 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-boffin-background/80">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6 text-boffin-background">Course Details</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-boffin-background/70">Duration</h3>
                  <p className="text-boffin-background">{formatDuration()}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-boffin-background/70">Level</h3>
                  <p className="text-boffin-background">{course.level || 'All Levels'}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-boffin-background/70">Delivery Mode</h3>
                  <p className="text-boffin-background">{course.deliveryMode || 'Online'}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-boffin-background/70">Category</h3>
                  <p className="text-boffin-background">
                    <Link href={`/courses/category/${course.category.slug}`} className="text-boffin-primary hover:underline">
                      {course.category.name}
                    </Link>
                  </p>
                </div>
                
                {course.curriculumPdfUrl && (
                  <div className="pt-4">
                    <a 
                      href={course.curriculumPdfUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-boffin-primary hover:underline"
                    >
                      <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download Full Curriculum
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Instructors */}
        {course.instructors && course.instructors.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-boffin-background">Course Instructors</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {course.instructors.map(({ instructor }) => (
                <div key={instructor.id} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-200">
                      {instructor.profileImageUrl ? (
                        <Image 
                          src={instructor.profileImageUrl} 
                          alt={instructor.name} 
                          width={64} 
                          height={64}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-boffin-primary/10 text-boffin-primary">
                          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-boffin-background">{instructor.name}</h3>
                    {instructor.bio && <p className="mt-1 text-boffin-background/80">{instructor.bio}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Enrollment CTA */}
        <div className="bg-boffin-background text-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Enroll?</h2>
          <p className="text-lg mb-6">Start your journey to mastering {course.title} today!</p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button variant="boffin" size="lg" asChild>
              <Link href={`/register?category=${course.category.slug}&courseId=${course.id}`}>
                Enroll Now
              </Link>
            </Button>
            
            <Button variant="boffin-outline" size="lg" asChild>
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
