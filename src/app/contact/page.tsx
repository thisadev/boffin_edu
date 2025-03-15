"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Please fill in all required fields.'
      });
      return;
    }

    // In a real application, you would send this data to your backend
    // For now, we'll just simulate a successful submission
    setTimeout(() => {
      setFormStatus({
        submitted: true,
        success: true,
        message: 'Thank you for your message! We will get back to you soon.'
      });
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 1000);
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-boffin-background text-white py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl mb-8">Have questions or need more information? We're here to help.</p>
          </div>
        </Container>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-boffin-primary/10 w-16 h-16 flex items-center justify-center rounded-full mb-6">
                <svg className="w-8 h-8 text-boffin-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-boffin-background mb-4">Phone</h3>
              <p className="text-gray-700 mb-2">General Inquiries:</p>
              <p className="text-boffin-primary font-medium mb-4">+1 (555) 123-4567</p>
              <p className="text-gray-700 mb-2">Corporate Training:</p>
              <p className="text-boffin-primary font-medium">+1 (555) 987-6543</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-boffin-primary/10 w-16 h-16 flex items-center justify-center rounded-full mb-6">
                <svg className="w-8 h-8 text-boffin-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-boffin-background mb-4">Email</h3>
              <p className="text-gray-700 mb-2">General Inquiries:</p>
              <p className="text-boffin-primary font-medium mb-4">info@boffininstitute.com</p>
              <p className="text-gray-700 mb-2">Support:</p>
              <p className="text-boffin-primary font-medium mb-4">support@boffininstitute.com</p>
              <p className="text-gray-700 mb-2">Corporate Training:</p>
              <p className="text-boffin-primary font-medium">corporate@boffininstitute.com</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-boffin-primary/10 w-16 h-16 flex items-center justify-center rounded-full mb-6">
                <svg className="w-8 h-8 text-boffin-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-boffin-background mb-4">Address</h3>
              <p className="text-gray-700 mb-4">
                123 Analytics Way<br />
                Data City, DC 10101<br />
                United States
              </p>
              <p className="text-gray-700 mb-2">Office Hours:</p>
              <p className="text-boffin-primary font-medium">Monday - Friday: 9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-gray-100">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-boffin-background mb-6">Send Us a Message</h2>
              <p className="text-xl text-gray-700">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              {formStatus.submitted && (
                <div className={`mb-6 p-4 rounded-md ${formStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {formStatus.message}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-boffin-primary focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-boffin-primary focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-boffin-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-boffin-background font-medium mb-2">Subject</label>
                    <div className="relative">
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md text-boffin-background bg-white focus:outline-none focus:ring-2 focus:ring-boffin-primary focus:border-transparent"
                      >
                        <option value="" className="text-boffin-background">Select a subject</option>
                        <option value="General Inquiry" className="text-boffin-background">General Inquiry</option>
                        <option value="Course Information" className="text-boffin-background">Course Information</option>
                        <option value="Corporate Training" className="text-boffin-background">Corporate Training</option>
                        <option value="Technical Support" className="text-boffin-background">Technical Support</option>
                        <option value="Other" className="text-boffin-background">Other</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-boffin-background">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-boffin-primary focus:border-transparent"
                    required
                  ></textarea>
                </div>
                
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    variant="boffin"
                    className="px-6 py-3 font-bold"
                  >
                    Send Message
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-boffin-background mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Find answers to common questions about our courses, certifications, and services.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-boffin-background mb-3">How do I enroll in a course?</h3>
                <p className="text-gray-700">
                  You can enroll in any of our courses by visiting the course page and clicking the "Enroll Now" button. You'll be guided through the registration and payment process.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-boffin-background mb-3">Do you offer corporate training packages?</h3>
                <p className="text-gray-700">
                  Yes, we offer customized corporate training packages tailored to your organization's specific needs. Please contact our corporate training team at corporate@boffininstitute.com for more information.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-boffin-background mb-3">What is the DASACA™ Certification?</h3>
                <p className="text-gray-700">
                  The Data Analytics and Science Accreditation (DASACA™) is our industry-recognized certification program that validates your skills and knowledge in data analytics. It consists of three levels: Foundation, Professional, and Expert.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-boffin-background mb-3">Do you offer refunds if I'm not satisfied with a course?</h3>
                <p className="text-gray-700">
                  Yes, we offer a 14-day money-back guarantee for all our courses. If you're not satisfied with your purchase, you can request a full refund within 14 days of enrollment.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-boffin-background text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Data Analytics Skills?</h2>
            <p className="text-xl mb-8">
              Explore our courses and start your journey to becoming a data analytics expert today.
            </p>
            <Button variant="boffin-outline" size="lg" asChild>
              <Link href="/courses">
                Browse Courses
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
