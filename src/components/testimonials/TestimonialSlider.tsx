"use client";

import React, { useState, useEffect } from 'react';
import TestimonialCard from './TestimonialCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Testimonial = {
  id: number;
  content: string;
  studentName: string;
  courseName: string;
  designation?: string;
  workplace?: string;
  university?: string;
  profileImageUrl?: string;
  rating: number;
  isFeatured: boolean;
};

const TestimonialSlider = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [autoplay, setAutoplay] = useState(true);

  // Number of testimonials to show at once based on screen size
  const [itemsToShow, setItemsToShow] = useState(3);

  useEffect(() => {
    // Function to handle window resize and adjust items to show
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsToShow(1);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(2);
      } else {
        setItemsToShow(3);
      }
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/testimonials');
        
        if (!response.ok) {
          throw new Error('Failed to fetch testimonials');
        }
        
        const data = await response.json();
        setTestimonials(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load testimonials. Please try again later.');
        setLoading(false);
        console.error('Error fetching testimonials:', err);
      }
    };

    fetchTestimonials();
  }, []);

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay || testimonials.length === 0) return;

    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay, currentIndex, testimonials.length]);

  // Pause autoplay when user interacts with slider
  const pauseAutoplay = () => setAutoplay(false);
  const resumeAutoplay = () => setAutoplay(true);

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? Math.max(0, testimonials.length - itemsToShow) : Math.max(0, currentIndex - 1);
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex = currentIndex >= testimonials.length - itemsToShow ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // If there are no testimonials or there's an error, show appropriate message
  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  if (loading) {
    return (
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-boffin-blue mb-8">What Our Students Say</h2>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-boffin-blue"></div>
          </div>
        </div>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return null; // Don't show the section if there are no testimonials
  }

  return (
    <section className="py-12 relative bg-boffin-background">
      {/* Add a subtle divider at the top of the section */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-100 to-transparent opacity-30"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-2">Student Testimonials</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">Hear what our students have to say about their learning experience at Boffin Institute</p>
        </div>
        
        <div className="relative">
          {/* Navigation buttons */}
          <button 
            onClick={() => {
              goToPrevious();
              pauseAutoplay();
            }}
            onMouseLeave={resumeAutoplay}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-boffin-primary"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="text-boffin-background" />
          </button>
          
          {/* Testimonials container */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className={`w-full flex-shrink-0 px-4`}
                  style={{ width: `${100 / itemsToShow}%` }}
                >
                  <TestimonialCard
                    content={testimonial.content}
                    studentName={testimonial.studentName}
                    courseName={testimonial.courseName}
                    designation={testimonial.designation}
                    workplace={testimonial.workplace}
                    university={testimonial.university}
                    profileImageUrl={testimonial.profileImageUrl}
                    rating={testimonial.rating}
                  />
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={() => {
              goToNext();
              pauseAutoplay();
            }}
            onMouseLeave={resumeAutoplay}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-boffin-primary"
            aria-label="Next testimonial"
          >
            <ChevronRight className="text-boffin-background" />
          </button>
        </div>
        
        {/* Dots indicator */}
        <div className="flex justify-center mt-8">
          {Array.from({ length: Math.ceil(testimonials.length / itemsToShow) }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index * itemsToShow);
                pauseAutoplay();
              }}
              onMouseLeave={resumeAutoplay}
              className={`h-2 w-2 mx-1 rounded-full ${currentIndex === index * itemsToShow ? 'bg-boffin-primary' : 'bg-gray-400'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Add a subtle divider at the bottom of the section */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-100 to-transparent opacity-30"></div>
    </section>
  );
};

export default TestimonialSlider;
