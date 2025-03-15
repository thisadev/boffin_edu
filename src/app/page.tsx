"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import FeaturedPrograms from '@/components/home/FeaturedPrograms';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import TestimonialSlider from '@/components/testimonials/TestimonialSlider';
import ParticleBackground from '@/components/hero/ParticleBackground';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Interactive Particle Hero Section */}
      <ParticleBackground />
      
      {/* Featured Courses Section */}
      <section className="bg-white py-16 relative">
        {/* Add a subtle divider at the top of the section */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-boffin-background mb-4">Featured Programs</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Discover our most popular data science and analytics programs designed to accelerate your career</p>
          </div>
          <FeaturedPrograms />
        </Container>
        
        {/* Add a subtle divider at the bottom of the section */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      </section>

      {/* Why Choose Us Section */}
      <WhyChooseUs />
      
      {/* Testimonials Section */}
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
