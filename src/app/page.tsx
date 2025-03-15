"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import TestimonialSlider from '@/components/testimonials/TestimonialSlider';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="bg-white py-16 relative">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-boffin-background">Empower Your Future with Data Analytics</h1>
              <p className="text-gray-600 text-lg mb-6">Join Boffin Institute's cutting-edge programs to master the skills that drive today's data-driven world.</p>
              <div className="flex flex-wrap gap-4">
                <Button variant="boffin" size="lg" asChild>
                  <Link href="/courses">Explore Courses</Link>
                </Button>
                <Button variant="boffin-outline" size="lg" asChild>
                  <Link href="/register">Register Now</Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-md h-80">
                <Image 
                  src="/images/hero-image.jpg" 
                  alt="Data Analytics Education"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg shadow-lg"
                  priority
                />
              </div>
            </div>
          </div>
        </Container>
        
        {/* Add a subtle divider at the bottom of the hero section */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-16 relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Featured Programs</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Discover our most popular data analytics courses designed to help you excel in your career.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-all hover:shadow-lg">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-boffin-background">DASACA Certification</h3>
                <p className="text-gray-600 mb-4">Our flagship certification program for data science and analytics professionals.</p>
                <Button variant="boffin" asChild className="w-full">
                  <Link href="/courses/category/dasaca-certification">Learn More</Link>
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-all hover:shadow-lg">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-boffin-background">Data Analytics Boot Camp</h3>
                <p className="text-gray-600 mb-4">Intensive training program to master essential data analytics skills in weeks.</p>
                <Button variant="boffin" asChild className="w-full">
                  <Link href="/courses/category/data-analytics-boot-camp">Learn More</Link>
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-all hover:shadow-lg">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-boffin-background">Corporate Training</h3>
                <p className="text-gray-600 mb-4">Customized data analytics training solutions for organizations and teams.</p>
                <Button variant="boffin" asChild className="w-full">
                  <Link href="/courses/category/corporate-training">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
        
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Boffin Institute</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We're committed to providing the highest quality education in data analytics.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-boffin-background text-white mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Instructors</h3>
              <p className="text-gray-600">Learn from industry professionals with years of practical experience.</p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-boffin-background text-white mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Practical Curriculum</h3>
              <p className="text-gray-600">Hands-on projects and real-world applications that prepare you for success.</p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-boffin-background text-white mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Industry Recognition</h3>
              <p className="text-gray-600">Our certifications are recognized and valued by leading employers worldwide.</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Student Testimonials Section */}
      <TestimonialSlider />

      {/* CTA Section */}
      <section className="py-16 bg-white relative">
        {/* Add a subtle divider at the top of the section */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 text-boffin-background">Ready to Transform Your Career?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">Join thousands of successful professionals who have advanced their careers with Boffin Institute.</p>
            <Button variant="boffin" size="lg" asChild>
              <Link href="/register">Register Now</Link>
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
}
