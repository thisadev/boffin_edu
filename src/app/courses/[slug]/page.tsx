"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getCourseBySlug } from '@/data/courses';
import PlaceholderImage from '@/components/ui/PlaceholderImage';

export default function CourseDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const course = getCourseBySlug(slug);
  
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
            ← Back to Courses
          </Link>
        </div>
        
        {/* Course Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:w-1/2">
              <div className="relative h-64 md:h-full w-full">
                <PlaceholderImage 
                  src={course.image} 
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
                  {course.category}
                </span>
              </div>
              <p className="text-gray-700 mb-6">{course.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Duration</h3>
                  <p className="text-lg font-medium">{course.duration}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Level</h3>
                  <p className="text-lg font-medium">{course.level}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-end mb-2">
                  {course.discountPrice ? (
                    <>
                      <span className="text-3xl font-bold text-gray-900">${course.discountPrice}</span>
                      <span className="text-xl text-gray-500 line-through ml-3">${course.price}</span>
                    </>
                  ) : (
                    <span className="text-3xl font-bold text-gray-900">${course.price}</span>
                  )}
                </div>
                {course.discountPrice && (
                  <p className="text-green-600 font-medium">
                    Save ${course.price - course.discountPrice} ({Math.round((course.price - course.discountPrice) / course.price * 100)}% off)
                  </p>
                )}
              </div>
              
              <div className="flex space-x-4">
                <button className="flex-1 bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors">
                  Enroll Now
                </button>
                <button className="bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors">
                  Download Syllabus
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Course Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* What You'll Learn */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What You'll Learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Course Syllabus */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Syllabus</h2>
              <div className="space-y-6">
                {course.syllabus.map((module, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                    <h3 className="text-xl font-bold mb-4">Module {index + 1}: {module.title}</h3>
                    <ul className="space-y-2">
                      {module.topics.map((topic, topicIndex) => (
                        <li key={topicIndex} className="flex items-start">
                          <span className="inline-block h-6 w-6 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center mr-3 mt-0.5">
                            {topicIndex + 1}
                          </span>
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Instructors */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Instructor{course.instructors.length > 1 ? 's' : ''}</h2>
              <div className="space-y-8">
                {course.instructors.map((instructor, index) => (
                  <div key={index} className="flex flex-col md:flex-row items-center md:items-start">
                    <div className="relative h-24 w-24 rounded-full overflow-hidden mb-4 md:mb-0 md:mr-6">
                      <PlaceholderImage 
                        src={instructor.image} 
                        fallbackSrc="/images/instructor-placeholder.jpg"
                        alt={instructor.name}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{instructor.name}</h3>
                      <p className="text-gray-700">{instructor.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Course Details Card */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Course Details</h3>
              <ul className="space-y-4">
                <li className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{course.duration}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Level:</span>
                  <span className="font-medium">{course.level}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">{course.category}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Modules:</span>
                  <span className="font-medium">{course.syllabus.length}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Total Topics:</span>
                  <span className="font-medium">
                    {course.syllabus.reduce((total, module) => total + module.topics.length, 0)}
                  </span>
                </li>
              </ul>
              
              <div className="border-t border-gray-200 my-6 pt-6">
                <button className="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors mb-4">
                  Enroll Now
                </button>
                <button className="w-full bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors">
                  Download Syllabus
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
