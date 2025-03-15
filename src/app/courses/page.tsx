"use client";

import { useState, useEffect } from 'react';
import CategoryCard from '@/components/courses/CategoryCard';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface Category {
  id: number;
  name: string;
  description: string | null;
  slug: string;
  imageUrl: string | null;
  courseCount: number;
}

interface Course {
  id: number;
  title: string;
  shortDescription: string;
  slug: string;
  imageUrl: string | null;
  category: {
    name: string;
  };
  level: string | null;
  durationHours: number | null;
  isFeatured: boolean;
}

export default function CoursesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
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

  useEffect(() => {
    async function fetchFeaturedCourses() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/courses?featured=true');
        if (!response.ok) {
          throw new Error('Failed to fetch featured courses');
        }
        const data = await response.json();
        setFeaturedCourses(data);
      } catch (err) {
        console.error('Error fetching featured courses:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    }

    fetchFeaturedCourses();
  }, []);

  return (
    <div className="bg-boffin-background min-h-screen">
      {/* Hero Section */}
      <section className="bg-boffin-background text-white py-16">
        <Container>
          <div className="text-center mb-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Course Catalog</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Explore our comprehensive range of data science and analytics courses designed to help you advance your career.
            </p>
          </div>
        </Container>
      </section>
      
      {/* Course Categories Section */}
      <section className="py-16 bg-white">
        <Container>
          <div className="py-12">
            <h1 className="text-4xl font-bold text-boffin-background mb-4">Our Courses</h1>
            <p className="text-xl text-boffin-background/80 mb-12">Explore our wide range of courses designed to help you achieve your goals</p>
            
            <h2 className="text-2xl font-bold text-boffin-background mb-8">Course Categories</h2>
            
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-boffin-primary"></div>
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
                  <div key={category.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
                    <div className="h-48 relative">
                      {category.imageUrl ? (
                        <Image
                          src={category.imageUrl}
                          alt={category.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-boffin-primary/10">
                          <svg className="h-16 w-16 text-boffin-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-boffin-background mb-2">{category.name}</h3>
                      <p className="text-boffin-background/80 mb-4">{category.description || `Explore our ${category.name} courses`}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-boffin-background/70">{category.courseCount || 0} courses</span>
                        <Button variant="boffin" asChild>
                          <Link href={`/courses/category/${category.slug}`}>
                            View Courses
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Featured Courses section */}
            {featuredCourses.length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl font-bold text-boffin-background mb-8">Featured Courses</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featuredCourses.map((course) => (
                    <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
                      <div className="h-48 relative">
                        {course.imageUrl ? (
                          <Image
                            src={course.imageUrl}
                            alt={course.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center bg-boffin-primary/10">
                            <svg className="h-16 w-16 text-boffin-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                          </div>
                        )}
                        
                        {course.isFeatured && (
                          <div className="absolute top-4 right-4 bg-boffin-primary text-white text-xs font-bold px-2 py-1 rounded">
                            Featured
                          </div>
                        )}
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center mb-2">
                          <span className="text-xs font-medium text-boffin-primary bg-boffin-primary/10 rounded-full px-2 py-1">
                            {course.category.name}
                          </span>
                          {course.level && (
                            <span className="ml-2 text-xs font-medium text-boffin-background/70">
                              {course.level}
                            </span>
                          )}
                        </div>
                        
                        <h3 className="text-xl font-bold text-boffin-background mb-2">{course.title}</h3>
                        <p className="text-boffin-background/80 mb-4 line-clamp-2">{course.shortDescription}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-boffin-background/70">
                            {course.durationHours && (
                              <span className="flex items-center">
                                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {course.durationHours} hours
                              </span>
                            )}
                          </div>
                          
                          <Button variant="boffin" asChild>
                            <Link href={`/courses/${course.slug}`}>
                              View Course
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Call to Action */}
            <div className="mt-16 bg-boffin-background text-white rounded-lg shadow-md p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Can't find what you're looking for?</h2>
              <p className="text-lg mb-6">Contact us to discuss custom training solutions for your organization</p>
              
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button variant="boffin" size="lg" asChild>
                  <Link href="/contact">
                    Contact Us
                  </Link>
                </Button>
                
                <Button variant="boffin-outline" size="lg" asChild>
                  <Link href="/about">
                    Learn More About Us
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-boffin-background text-white">
        <Container>
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Not sure which course is right for you?</h2>
            <p className="mb-8 max-w-2xl mx-auto text-lg">
              Our education advisors can help you choose the perfect learning path based on your career goals and experience level.
            </p>
            <Button variant="boffin" size="lg" asChild>
              <Link href="/contact">Schedule a Consultation</Link>
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
