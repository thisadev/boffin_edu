"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { courses, courseCategories } from '@/data/courses';
import Image from 'next/image';
import SuccessMessage from '@/components/ui/SuccessMessage';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  courseId: string;
  category: string;
  educationLevel: string;
  workExperience: string;
  hearAboutUs: string;
  specialRequirements: string;
  certificationLevel?: string;
  priorExperience?: string;
  programmingLanguages?: string;
  preferredSchedule?: string;
  projectIdeas?: string;
  companyName?: string;
  jobTitle?: string;
  teamSize?: string;
  preferredLocation?: string;
  preExamMaterials?: string;
  examVoucher?: string;
  hasLaptop?: string;
  needsSoftwareHelp?: string;
  departmentFocus?: string;
  trainingObjectives?: string;
}

export default function RegisterPage() {
  const searchParams = useSearchParams();
  
  const initialFormData: FormData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    courseId: searchParams?.get('courseId') || '',
    category: searchParams?.get('category') || '',
    educationLevel: '',
    workExperience: '',
    hearAboutUs: '',
    specialRequirements: '',
    certificationLevel: '',
    priorExperience: '',
    programmingLanguages: '',
    preferredSchedule: '',
    projectIdeas: '',
    companyName: '',
    jobTitle: '',
    teamSize: '',
    preferredLocation: '',
    preExamMaterials: 'no',
    examVoucher: 'no',
    hasLaptop: '',
    needsSoftwareHelp: '',
    departmentFocus: '',
    trainingObjectives: ''
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState(courses);

  // Filter courses when category changes
  useEffect(() => {
    if (formData.category) {
      setFilteredCourses(courses.filter(course => course.category === formData.category));
    } else {
      setFilteredCourses(courses);
    }
  }, [formData.category]);

  // Handle URL parameters on initial load
  useEffect(() => {
    const categoryParam = searchParams?.get('category');
    const courseIdParam = searchParams?.get('courseId');
    
    if (categoryParam) {
      // Find the category by slug and use its ID
      const category = courseCategories.find(cat => cat.slug === categoryParam || cat.id.toLowerCase() === categoryParam.toLowerCase());
      if (category) {
        // Map the category slug to the actual category value used in the courses data
        const mappedCategory = category.id === 'dasaca' ? 'DASACA' : 
                               category.id === 'bootcamp' ? 'BootCamp' : 
                               category.id === 'corporate' ? 'Corporate' : '';
        
        setFormData(prev => ({
          ...prev,
          category: mappedCategory
        }));
      }
    }
    
    // Verify that the course exists and set it in the form
    if (courseIdParam) {
      // First try to find the course by its ID in the static data
      let selectedCourse = courses.find(course => course.id === courseIdParam);
      
      // If not found, it might be a numeric ID from the database
      if (!selectedCourse && !isNaN(Number(courseIdParam))) {
        // Fetch the course details from the API
        const fetchCourseDetails = async () => {
          try {
            // First, try to find a course with this ID in our filtered courses
            if (formData.category) {
              const categoryCourses = courses.filter(course => course.category === formData.category);
              if (categoryCourses.length > 0) {
                // For now, just use the first course in the category as a fallback
                selectedCourse = categoryCourses[0];
                
                setFormData(prev => ({
                  ...prev,
                  courseId: selectedCourse.id
                }));
              }
            }
          } catch (error) {
            console.error('Error fetching course details:', error);
          }
        };
        
        fetchCourseDetails();
      } else if (selectedCourse) {
        setFormData(prev => ({
          ...prev,
          courseId: selectedCourse.id,
          // If we already set the category from the URL param, don't override it
          ...(prev.category === '' ? { category: selectedCourse.category } : {})
        }));
      }
    }
  }, [searchParams, formData.category]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Special handling for category selection
    if (name === 'category' && value !== formData.category) {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        courseId: '' // Reset course selection when category changes
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.courseId) {
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
        message: 'Registration successful! We will contact you shortly with next steps.'
      });
      
      // Show success modal
      setShowSuccessModal(true);
      
      // Reset form after successful submission
      setFormData(initialFormData);
    }, 1000);
  };

  // Find selected course, defaulting to null if not found
  const selectedCourse = courses.find(course => course.id === formData.courseId) || null;

  // Add dynamic fields based on course category
  const renderCategorySpecificFields = () => {
    if (!formData.category) return null;
    
    switch (formData.category) {
      case 'DASACA':
        return (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-boffin-background mb-4">DASACAu2122 Certification Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="certificationLevel" className="block text-boffin-background font-medium mb-2">Desired Certification Level</label>
                <div className="relative">
                  <select
                    id="certificationLevel"
                    name="certificationLevel"
                    value={formData.certificationLevel || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-boffin-background bg-white focus:outline-none focus:ring-2 focus:ring-boffin-primary focus:border-transparent"
                  >
                    <option value="" className="text-boffin-background">Select certification level</option>
                    <option value="Foundation" className="text-boffin-background">Foundation</option>
                    <option value="Practitioner" className="text-boffin-background">Practitioner</option>
                    <option value="Expert" className="text-boffin-background">Expert</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-boffin-background">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="priorExperience" className="block text-boffin-background font-medium mb-2">Prior Data Analytics Experience</label>
                <div className="relative">
                  <select
                    id="priorExperience"
                    name="priorExperience"
                    value={formData.priorExperience || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-boffin-background bg-white focus:outline-none focus:ring-2 focus:ring-boffin-primary focus:border-transparent"
                  >
                    <option value="" className="text-boffin-background">Select experience level</option>
                    <option value="None" className="text-boffin-background">None</option>
                    <option value="Beginner" className="text-boffin-background">Beginner</option>
                    <option value="Intermediate" className="text-boffin-background">Intermediate</option>
                    <option value="Advanced" className="text-boffin-background">Advanced</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-boffin-background">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'BootCamp':
        return (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-boffin-background mb-4">Boot Camp Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <label htmlFor="programmingLanguages" className="block text-boffin-background font-medium mb-2">Programming Languages Known</label>
                <input
                  type="text"
                  id="programmingLanguages"
                  name="programmingLanguages"
                  value={formData.programmingLanguages || ''}
                  onChange={handleChange}
                  placeholder="e.g., Python, R, SQL"
                  className="w-full px-4 py-2 border border-boffin-primary rounded-md text-boffin-background bg-white focus:outline-none focus:ring-2 focus:ring-boffin-primary focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="preferredSchedule" className="block text-boffin-background font-medium mb-2">Preferred Schedule</label>
                <div className="relative">
                  <select
                    id="preferredSchedule"
                    name="preferredSchedule"
                    value={formData.preferredSchedule || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-boffin-primary rounded-md text-boffin-background bg-white focus:outline-none focus:ring-2 focus:ring-boffin-primary focus:border-transparent"
                  >
                    <option value="" className="text-boffin-background">Select schedule preference</option>
                    <option value="Weekdays" className="text-boffin-background">Weekdays</option>
                    <option value="Weekends" className="text-boffin-background">Weekends</option>
                    <option value="Evenings" className="text-boffin-background">Evenings</option>
                    <option value="Flexible" className="text-boffin-background">Flexible</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-boffin-background">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="projectIdeas" className="block text-boffin-background font-medium mb-2">Project Ideas or Interests</label>
              <textarea
                id="projectIdeas"
                name="projectIdeas"
                value={formData.projectIdeas || ''}
                onChange={handleChange}
                rows={3}
                placeholder="Share any specific projects or areas you're interested in working on during the boot camp"
                className="w-full px-4 py-2 border border-boffin-primary rounded-md text-boffin-background bg-white focus:outline-none focus:ring-2 focus:ring-boffin-primary focus:border-transparent"
              ></textarea>
            </div>
          </div>
        );
      case 'Corporate':
        return (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-boffin-background mb-4">Corporate Training Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <label htmlFor="companyName" className="block text-boffin-background font-medium mb-2">Company Name</label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-boffin-background bg-white focus:outline-none focus:ring-2 focus:ring-boffin-primary focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="jobTitle" className="block text-boffin-background font-medium mb-2">Job Title</label>
                <input
                  type="text"
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-boffin-background bg-white focus:outline-none focus:ring-2 focus:ring-boffin-primary focus:border-transparent"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="teamSize" className="block text-boffin-background font-medium mb-2">Number of Team Members to Train</label>
                <input
                  type="number"
                  id="teamSize"
                  name="teamSize"
                  min="1"
                  value={formData.teamSize || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-boffin-background bg-white focus:outline-none focus:ring-2 focus:ring-boffin-primary focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="preferredLocation" className="block text-boffin-background font-medium mb-2">Preferred Training Location</label>
                <div className="relative">
                  <select
                    id="preferredLocation"
                    name="preferredLocation"
                    value={formData.preferredLocation || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-boffin-primary rounded-md text-boffin-background bg-white focus:outline-none focus:ring-2 focus:ring-boffin-primary focus:border-transparent"
                  >
                    <option value="" className="text-boffin-background">Select location preference</option>
                    <option value="On-site" className="text-boffin-background">On-site at our company</option>
                    <option value="Boffin" className="text-boffin-background">At Boffin Institute</option>
                    <option value="Virtual" className="text-boffin-background">Virtual/Online</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-boffin-background">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Add dynamic fields based on specific course
  const renderCourseSpecificFields = () => {
    if (!formData.courseId) return null;
    
    const selectedCourse = courses.find(course => course.id === formData.courseId);
    if (!selectedCourse) return null;
    
    // Course-specific fields based on course ID
    switch (selectedCourse.id) {
      case 'dasaca-foundation':
      case 'dasaca-practitioner':
      case 'dasaca-expert':
        return (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">DASACAu2122 Certification Preparation</h3>
            <div className="mb-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="preExamMaterials"
                  name="preExamMaterials"
                  checked={formData.preExamMaterials === 'yes'}
                  onChange={(e) => handleChange({
                    target: {
                      name: 'preExamMaterials',
                      value: e.target.checked ? 'yes' : 'no'
                    }
                  } as any)}
                  className="h-4 w-4 text-boffin-primary focus:ring-boffin-primary border-gray-300 rounded"
                />
                <span className="text-gray-700">I would like to receive pre-exam study materials</span>
              </label>
            </div>
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="examVoucher"
                  name="examVoucher"
                  checked={formData.examVoucher === 'yes'}
                  onChange={(e) => handleChange({
                    target: {
                      name: 'examVoucher',
                      value: e.target.checked ? 'yes' : 'no'
                    }
                  } as any)}
                  className="h-4 w-4 text-boffin-primary focus:ring-boffin-primary border-gray-300 rounded"
                />
                <span className="text-gray-700">Include certification exam voucher with registration</span>
              </label>
            </div>
          </div>
        );
      case 'python-data-analytics':
      case 'r-data-science':
      case 'machine-learning-bootcamp':
        return (
          <div className="mb-6 p-4 bg-green-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Boot Camp Equipment</h3>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Do you have a laptop for the course?</label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="hasLaptop"
                    value="yes"
                    checked={formData.hasLaptop === 'yes'}
                    onChange={handleChange}
                    className="h-4 w-4 text-boffin-primary focus:ring-boffin-primary border-gray-300"
                  />
                  <span>Yes</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="hasLaptop"
                    value="no"
                    checked={formData.hasLaptop === 'no'}
                    onChange={handleChange}
                    className="h-4 w-4 text-boffin-primary focus:ring-boffin-primary border-gray-300"
                  />
                  <span>No, I need to rent one</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Software Installation Assistance</label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="needsSoftwareHelp"
                    value="yes"
                    checked={formData.needsSoftwareHelp === 'yes'}
                    onChange={handleChange}
                    className="h-4 w-4 text-boffin-primary focus:ring-boffin-primary border-gray-300"
                  />
                  <span>Yes, I need assistance</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="needsSoftwareHelp"
                    value="no"
                    checked={formData.needsSoftwareHelp === 'no'}
                    onChange={handleChange}
                    className="h-4 w-4 text-boffin-primary focus:ring-boffin-primary border-gray-300"
                  />
                  <span>No, I can manage</span>
                </label>
              </div>
            </div>
          </div>
        );
      case 'data-literacy-for-business':
      case 'data-driven-decision-making':
      case 'ai-for-executives':
        return (
          <div className="mb-6 p-4 bg-purple-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Corporate Training Details</h3>
            <div className="mb-4">
              <label htmlFor="departmentFocus" className="block text-gray-700 font-medium mb-2">Department Focus</label>
              <select
                id="departmentFocus"
                name="departmentFocus"
                value={formData.departmentFocus || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-boffin-primary focus:border-transparent"
              >
                <option value="">Select department</option>
                <option value="Executive">Executive Leadership</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="Finance">Finance</option>
                <option value="Operations">Operations</option>
                <option value="HR">Human Resources</option>
                <option value="IT">IT</option>
                <option value="Mixed">Mixed Departments</option>
              </select>
            </div>
            <div>
              <label htmlFor="trainingObjectives" className="block text-gray-700 font-medium mb-2">Specific Training Objectives</label>
              <textarea
                id="trainingObjectives"
                name="trainingObjectives"
                value={formData.trainingObjectives || ''}
                onChange={handleChange}
                rows={3}
                placeholder="What specific outcomes are you hoping to achieve with this training?"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-boffin-primary focus:border-transparent"
              ></textarea>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50">
      {/* Success Modal */}
      {showSuccessModal && (
        <SuccessMessage
          title="Registration Successful!"
          message="Thank you for registering for our course. We will contact you shortly with next steps and payment information."
          onClose={() => setShowSuccessModal(false)}
        />
      )}
      
      {/* Hero Section */}
      <section className="bg-boffin-background text-white py-16">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Course Registration</h1>
            <p className="text-xl mb-8">
              {selectedCourse 
                ? `Register for ${selectedCourse?.title}`
                : 'Complete the form below to register for your selected course'}
            </p>
          </div>
        </Container>
      </section>

      {/* Registration Form */}
      <section className="py-16">
        <Container>
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
            {formStatus.submitted && !formStatus.success && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600">{formStatus.message}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              {/* Course Selection */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-boffin-background mb-6">Course Selection</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="category" className="block text-boffin-background font-medium mb-2">Course Category*</label>
                    <div className="relative">
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md text-boffin-background bg-white focus:outline-none focus:ring-2 focus:ring-boffin-primary focus:border-transparent"
                        required
                      >
                        <option value="" className="text-boffin-background">Select a category</option>
                        <option value="DASACA" className="text-boffin-background">DASACAu2122 Certification</option>
                        <option value="BootCamp" className="text-boffin-background">Data Analytics Boot Camp</option>
                        <option value="Corporate" className="text-boffin-background">Corporate Training</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-boffin-background">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="courseId" className="block text-boffin-background font-medium mb-2">Course*</label>
                    <div className="relative">
                      <select
                        id="courseId"
                        name="courseId"
                        value={formData.courseId}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md text-boffin-background bg-white focus:outline-none focus:ring-2 focus:ring-boffin-primary focus:border-transparent"
                        required
                        disabled={!formData.category}
                      >
                        <option value="" className="text-boffin-background">Select a course</option>
                        {filteredCourses
                          .filter(course => !formData.category || course.category === formData.category)
                          .map(course => (
                            <option key={course.id} value={course.id} className="text-boffin-background">{course.title}</option>
                          ))
                        }
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-boffin-background">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-boffin-background mb-6">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-boffin-background font-medium mb-2">First Name*</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md text-boffin-background bg-white focus:outline-none focus:ring-2 focus:ring-boffin-primary focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-boffin-background font-medium mb-2">Last Name*</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md text-boffin-background bg-white focus:outline-none focus:ring-2 focus:ring-boffin-primary focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-boffin-background font-medium mb-2">Email*</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md text-boffin-background bg-white focus:outline-none focus:ring-2 focus:ring-boffin-primary focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-boffin-background font-medium mb-2">Phone Number*</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md text-boffin-background bg-white focus:outline-none focus:ring-2 focus:ring-boffin-primary focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>
              
              {/* Address Information */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-boffin-background mb-6">Address Information</h2>
                <div className="mb-6">
                  <label htmlFor="address" className="block text-boffin-background font-medium mb-2">Street Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-boffin-background bg-white focus:outline-none focus:ring-2 focus:ring-boffin-primary focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="city" className="block text-boffin-background font-medium mb-2">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md text-boffin-background bg-white focus:outline-none focus:ring-2 focus:ring-boffin-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-boffin-background font-medium mb-2">State/Province</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md text-boffin-background bg-white focus:outline-none focus:ring-2 focus:ring-boffin-primary focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="zipCode" className="block text-boffin-background font-medium mb-2">Postal/Zip Code</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md text-boffin-background bg-white focus:outline-none focus:ring-2 focus:ring-boffin-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-boffin-background font-medium mb-2">Country</label>
                    <div className="relative">
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md text-boffin-background bg-white focus:outline-none focus:ring-2 focus:ring-boffin-primary focus:border-transparent"
                      >
                        <option value="" className="text-boffin-background">Select a country</option>
                        <option value="Sri Lanka" className="text-boffin-background">Sri Lanka</option>
                        <option value="India" className="text-boffin-background">India</option>
                        <option value="United States" className="text-boffin-background">United States</option>
                        <option value="United Kingdom" className="text-boffin-background">United Kingdom</option>
                        <option value="Canada" className="text-boffin-background">Canada</option>
                        <option value="Australia" className="text-boffin-background">Australia</option>
                        <option value="Singapore" className="text-boffin-background">Singapore</option>
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
              </div>
              
              {/* Educational Background */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-boffin-background mb-6">Educational Background</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="educationLevel" className="block text-boffin-background font-medium mb-2">Highest Education Level*</label>
                    <div className="relative">
                      <select
                        id="educationLevel"
                        name="educationLevel"
                        value={formData.educationLevel}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md text-boffin-background bg-white focus:outline-none focus:ring-2 focus:ring-boffin-primary focus:border-transparent"
                        required
                      >
                        <option value="" className="text-boffin-background">Select education level</option>
                        <option value="High School" className="text-boffin-background">High School</option>
                        <option value="Associate Degree" className="text-boffin-background">Associate Degree</option>
                        <option value="Bachelor's Degree" className="text-boffin-background">Bachelor's Degree</option>
                        <option value="Master's Degree" className="text-boffin-background">Master's Degree</option>
                        <option value="Doctorate" className="text-boffin-background">Doctorate</option>
                        <option value="Other" className="text-boffin-background">Other</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-boffin-background">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="workExperience" className="block text-boffin-background font-medium mb-2">Work Experience*</label>
                    <div className="relative">
                      <select
                        id="workExperience"
                        name="workExperience"
                        value={formData.workExperience}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md text-boffin-background bg-white focus:outline-none focus:ring-2 focus:ring-boffin-primary focus:border-transparent"
                        required
                      >
                        <option value="" className="text-boffin-background">Select work experience</option>
                        <option value="None" className="text-boffin-background">None</option>
                        <option value="Less than 1 year" className="text-boffin-background">Less than 1 year</option>
                        <option value="1-3 years" className="text-boffin-background">1-3 years</option>
                        <option value="3-5 years" className="text-boffin-background">3-5 years</option>
                        <option value="5-10 years" className="text-boffin-background">5-10 years</option>
                        <option value="10+ years" className="text-boffin-background">10+ years</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-boffin-background">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Additional Information */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-boffin-background mb-6">Additional Information</h2>
                
                {/* Dynamic fields based on course category */}
                {renderCategorySpecificFields()}
                
                {/* Dynamic fields based on specific course */}
                {renderCourseSpecificFields()}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="hearAboutUs" className="block text-boffin-background font-medium mb-2">How did you hear about us?</label>
                    <div className="relative">
                      <select
                        id="hearAboutUs"
                        name="hearAboutUs"
                        value={formData.hearAboutUs}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md text-boffin-background bg-white focus:outline-none focus:ring-2 focus:ring-boffin-primary focus:border-transparent"
                      >
                        <option value="" className="text-boffin-background">Select an option</option>
                        <option value="Search Engine" className="text-boffin-background">Search Engine</option>
                        <option value="Social Media" className="text-boffin-background">Social Media</option>
                        <option value="Friend/Colleague" className="text-boffin-background">Friend/Colleague</option>
                        <option value="Advertisement" className="text-boffin-background">Advertisement</option>
                        <option value="Email" className="text-boffin-background">Email</option>
                        <option value="Other" className="text-boffin-background">Other</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-boffin-background">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="specialRequirements" className="block text-boffin-background font-medium mb-2">Special Requirements or Questions</label>
                    <textarea
                      id="specialRequirements"
                      name="specialRequirements"
                      value={formData.specialRequirements}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md text-boffin-background bg-white focus:outline-none focus:ring-2 focus:ring-boffin-primary focus:border-transparent"
                    ></textarea>
                  </div>
                </div>
              </div>
              
              {/* Submit Button */}
              <div className="mt-8">
                <button 
                  type="submit" 
                  disabled={formStatus.submitted}
                  className={`w-full py-3 px-6 text-white font-semibold rounded-md transition duration-200 ${formStatus.submitted ? 'bg-gray-400 cursor-not-allowed' : 'bg-boffin-primary hover:bg-boffin-secondary'}`}
                >
                  {formStatus.submitted ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : 'Submit Registration'}
                </button>
              </div>
            </form>
          </div>
        </Container>
      </section>

      {/* Related Courses */}
      {selectedCourse && (
        <section className="py-16 bg-gray-100">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">You Might Also Be Interested In</h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Explore other courses in the {selectedCourse.category} category.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {courses
                .filter(course => course.category === selectedCourse.category && course.id !== selectedCourse.id)
                .slice(0, 3)
                .map(course => (
                  <div key={course.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                    <Link href={`/courses/${course.slug}`} className="block relative h-48 overflow-hidden">
                      <div className="relative w-full h-full">
                        <Image 
                          src={course.image || '/images/course-placeholder.jpg'} 
                          alt={course.title}
                          fill
                          className="object-cover transition-transform hover:scale-105"
                        />
                      </div>
                    </Link>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        <Link href={`/courses/${course.slug}`} className="hover:text-boffin-primary transition-colors">
                          {course.title}
                        </Link>
                      </h3>
                      <p className="text-gray-700 mb-4 line-clamp-2">{course.description}</p>
                      <Link 
                        href={`/register?courseId=${course.id}`}
                        className="text-boffin-primary font-bold hover:underline"
                      >
                        Register Now
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </Container>
        </section>
      )}
    </div>
  );
}
