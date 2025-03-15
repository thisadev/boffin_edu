import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/container';

export default function AboutPage() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-boffin-background text-white py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Boffin Institute</h1>
            <p className="text-xl mb-8">Empowering individuals and organizations with cutting-edge data analytics education and certification.</p>
          </div>
        </Container>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-boffin-background mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4">
                Founded in 2018, Boffin Institute was born out of a vision to bridge the growing gap between data science theory and practical application in the industry. Our founders, a team of data scientists and educators, recognized that traditional educational institutions were struggling to keep pace with the rapidly evolving field of data analytics.
              </p>
              <p className="text-gray-700 mb-4">
                Starting with just three courses and a small team of instructors, we've grown to become a leading provider of data analytics education, serving thousands of students and hundreds of corporate clients worldwide.
              </p>
              <p className="text-gray-700">
                Our name, "Boffin," reflects our commitment to combining deep technical expertise with practical, accessible education. We believe that everyone, regardless of their background, can become a data analytics expert with the right guidance and curriculum.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/about/our-story.jpg"
                alt="Boffin Institute Story"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-gray-100">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-boffin-background mb-6">Our Mission</h2>
            <p className="text-xl text-gray-700">
              To democratize data analytics education and empower individuals and organizations to harness the power of data for better decision-making and innovation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-boffin-primary/10 w-16 h-16 flex items-center justify-center rounded-full mb-6">
                <svg className="w-8 h-8 text-boffin-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-boffin-background mb-4">Innovation</h3>
              <p className="text-gray-700">
                We continuously evolve our curriculum to incorporate the latest tools, techniques, and best practices in the rapidly changing field of data analytics.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-boffin-primary/10 w-16 h-16 flex items-center justify-center rounded-full mb-6">
                <svg className="w-8 h-8 text-boffin-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-boffin-background mb-4">Accessibility</h3>
              <p className="text-gray-700">
                We believe that quality education should be accessible to everyone. Our courses are designed to be approachable for beginners while challenging for experienced professionals.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-boffin-primary/10 w-16 h-16 flex items-center justify-center rounded-full mb-6">
                <svg className="w-8 h-8 text-boffin-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-boffin-background mb-4">Practicality</h3>
              <p className="text-gray-700">
                Our courses focus on real-world applications and hands-on projects, ensuring that students can immediately apply what they learn to solve actual business problems.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-boffin-background mb-6">Meet Our Leadership Team</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Our diverse team of experts brings together decades of experience in data science, education, and business.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-80 w-full">
                <Image
                  src="/images/about/team-1.jpg"
                  alt="Dr. Sarah Chen"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-boffin-background mb-1">Dr. Sarah Chen</h3>
                <p className="text-boffin-primary font-medium mb-4">Founder & CEO</p>
                <p className="text-gray-700 mb-4">
                  Former Lead Data Scientist at Google with a Ph.D. in Computer Science from Stanford. Sarah founded Boffin Institute with a vision to make data analytics education accessible to all.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-boffin-primary transition-colors">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-boffin-primary transition-colors">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Team Member 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-80 w-full">
                <Image
                  src="/images/about/team-2.jpg"
                  alt="Michael Rodriguez"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-boffin-background mb-1">Michael Rodriguez</h3>
                <p className="text-boffin-primary font-medium mb-4">Chief Academic Officer</p>
                <p className="text-gray-700 mb-4">
                  With 15 years of experience in education and a background in statistics, Michael oversees curriculum development and ensures our courses meet the highest standards of quality.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-boffin-primary transition-colors">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-boffin-primary transition-colors">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Team Member 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-80 w-full">
                <Image
                  src="/images/about/team-3.jpg"
                  alt="Dr. James Wilson"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-boffin-background mb-1">Dr. James Wilson</h3>
                <p className="text-boffin-primary font-medium mb-4">Chief Technology Officer</p>
                <p className="text-gray-700 mb-4">
                  A pioneer in machine learning with over 20 years of industry experience, James leads our technology initiatives and ensures our courses incorporate cutting-edge tools and techniques.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-boffin-primary transition-colors">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-boffin-primary transition-colors">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-boffin-background text-white">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">5,000+</div>
              <p className="text-lg">Students Trained</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">200+</div>
              <p className="text-lg">Corporate Clients</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">15+</div>
              <p className="text-lg">Specialized Courses</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">98%</div>
              <p className="text-lg">Satisfaction Rate</p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <Container>
          <div className="bg-gray-100 rounded-lg p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-boffin-background mb-6">Ready to Start Your Data Analytics Journey?</h2>
              <p className="text-xl text-gray-700 mb-8">
                Explore our courses or get in touch with our team to learn how we can help you achieve your data analytics goals.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/courses" className="bg-boffin-background text-white px-6 py-3 rounded-lg font-bold hover:bg-boffin-background/90 transition-colors">
                  Explore Courses
                </Link>
                <Link href="/contact" className="bg-white text-boffin-primary border border-boffin-primary px-6 py-3 rounded-lg font-bold hover:bg-gray-50 transition-colors">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
