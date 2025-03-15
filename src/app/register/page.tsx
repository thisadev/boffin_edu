"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { courses, courseCategories } from '@/data/courses';
import Image from 'next/image';
import SuccessMessage from '@/components/ui/SuccessMessage';

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
    
    // Verify that the course exists and matches the category
    if (courseIdParam) {
      const selectedCourse = courses.find(course => course.id === courseIdParam);
      if (selectedCourse && (!categoryParam || selectedCourse.category === categoryParam)) {
        // If course exists but category doesn't match or isn't provided, use the course's category
        if (!categoryParam || selectedCourse.category !== categoryParam) {
          setFormData(prev => ({
            ...prev,
            category: selectedCourse.category,
            courseId: courseIdParam
          }));
        }
      }
    }
  }, [searchParams]);

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

  const selectedCourse = courses.find(course => course.id === formData.courseId);

  // Add dynamic fields based on course category
  const renderCategorySpecificFields = () => {
    if (!formData.category) return null;
    
    switch (formData.category) {
      case 'DASACA':
        return (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">DASACAu2122 Certification Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="certificationLevel" className="block text-gray-700 font-medium mb-2">Desired Certification Level</label>
                <select
                  id="certificationLevel"
                  name="certificationLevel"
                  value={formData.certificationLevel || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select certification level</option>
                  <option value="Foundation">Foundation</option>
                  <option value="Practitioner">Practitioner</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
              <div>
                <label htmlFor="priorExperience" className="block text-gray-700 font-medium mb-2">Prior Data Analytics Experience</label>
                <select
                  id="priorExperience"
                  name="priorExperience"
                  value={formData.priorExperience || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select experience level</option>
                  <option value="None">None</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>
          </div>
        );
      case 'BootCamp':
        return (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Boot Camp Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <label htmlFor="programmingLanguages" className="block text-gray-700 font-medium mb-2">Programming Languages Known</label>
                <input
                  type="text"
                  id="programmingLanguages"
                  name="programmingLanguages"
                  value={formData.programmingLanguages || ''}
                  onChange={handleChange}
                  placeholder="e.g., Python, R, SQL"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="preferredSchedule" className="block text-gray-700 font-medium mb-2">Preferred Schedule</label>
                <select
                  id="preferredSchedule"
                  name="preferredSchedule"
                  value={formData.preferredSchedule || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select schedule preference</option>
                  <option value="Weekdays">Weekdays</option>
                  <option value="Weekends">Weekends</option>
                  <option value="Evenings">Evenings</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="projectIdeas" className="block text-gray-700 font-medium mb-2">Project Ideas or Interests</label>
              <textarea
                id="projectIdeas"
                name="projectIdeas"
                value={formData.projectIdeas || ''}
                onChange={handleChange}
                rows={3}
                placeholder="Share any specific projects or areas you're interested in working on during the boot camp"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              ></textarea>
            </div>
          </div>
        );
      case 'Corporate':
        return (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Corporate Training Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <label htmlFor="companyName" className="block text-gray-700 font-medium mb-2">Company Name</label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="jobTitle" className="block text-gray-700 font-medium mb-2">Job Title</label>
                <input
                  type="text"
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="teamSize" className="block text-gray-700 font-medium mb-2">Number of Team Members to Train</label>
                <input
                  type="number"
                  id="teamSize"
                  name="teamSize"
                  min="1"
                  value={formData.teamSize || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="preferredLocation" className="block text-gray-700 font-medium mb-2">Preferred Training Location</label>
                <select
                  id="preferredLocation"
                  name="preferredLocation"
                  value={formData.preferredLocation || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select location preference</option>
                  <option value="On-site">On-site at our company</option>
                  <option value="Boffin Institute">At Boffin Institute</option>
                  <option value="Virtual">Virtual/Remote</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
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
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
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
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
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
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
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
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
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
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
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
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
      <section className="bg-primary text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Course Registration</h1>
            <p className="text-xl mb-8">
              {selectedCourse 
                ? `Register for ${selectedCourse.title}`
                : 'Complete the form below to register for your selected course'}
            </p>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md">
              {formStatus.submitted && !showSuccessModal && (
                <div className={`mb-6 p-4 rounded-md ${formStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {formStatus.message}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                {/* Course Selection */}
                <div className="mb-8 pb-8 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Selection</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="category" className="block text-gray-700 font-medium mb-2">Course Category *</label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="">Select a category</option>
                        <option value="DASACA">DASACAu2122 Certification</option>
                        <option value="BootCamp">Boot Camps</option>
                        <option value="Corporate">Corporate Training</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="courseId" className="block text-gray-700 font-medium mb-2">Course *</label>
                      <select
                        id="courseId"
                        name="courseId"
                        value={formData.courseId}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="">Select a course</option>
                        {filteredCourses.map(course => (
                          <option key={course.id} value={course.id}>
                            {course.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                
                {/* Personal Information */}
                <div className="mb-8 pb-8 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">First Name *</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">Last Name *</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Address Information */}
                <div className="mb-8 pb-8 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Address Information</h2>
                  
                  <div className="mb-6">
                    <label htmlFor="address" className="block text-gray-700 font-medium mb-2">Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <label htmlFor="city" className="block text-gray-700 font-medium mb-2">City</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="state" className="block text-gray-700 font-medium mb-2">State/Province</label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="zipCode" className="block text-gray-700 font-medium mb-2">ZIP/Postal Code</label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="country" className="block text-gray-700 font-medium mb-2">Country</label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select a country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                      <option value="IN">India</option>
                      <option value="SG">Singapore</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                
                {/* Additional Information */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Information</h2>
                  
                  {/* Dynamic fields based on course category */}
                  {renderCategorySpecificFields()}
                  
                  {/* Dynamic fields based on specific course */}
                  {renderCourseSpecificFields()}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="educationLevel" className="block text-gray-700 font-medium mb-2">Education Level</label>
                      <select
                        id="educationLevel"
                        name="educationLevel"
                        value={formData.educationLevel}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="">Select education level</option>
                        <option value="High School">High School</option>
                        <option value="Associate's Degree">Associate's Degree</option>
                        <option value="Bachelor's Degree">Bachelor's Degree</option>
                        <option value="Master's Degree">Master's Degree</option>
                        <option value="Doctorate">Doctorate</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="workExperience" className="block text-gray-700 font-medium mb-2">Years of Work Experience</label>
                      <select
                        id="workExperience"
                        name="workExperience"
                        value={formData.workExperience}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="">Select years of experience</option>
                        <option value="0-1">0-1 years</option>
                        <option value="1-3">1-3 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="5-10">5-10 years</option>
                        <option value="10+">10+ years</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="hearAboutUs" className="block text-gray-700 font-medium mb-2">How did you hear about us?</label>
                    <select
                      id="hearAboutUs"
                      name="hearAboutUs"
                      value={formData.hearAboutUs}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select an option</option>
                      <option value="Search Engine">Search Engine</option>
                      <option value="Social Media">Social Media</option>
                      <option value="Friend/Colleague">Friend/Colleague</option>
                      <option value="Advertisement">Advertisement</option>
                      <option value="Email">Email</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="specialRequirements" className="block text-gray-700 font-medium mb-2">Special Requirements or Questions</label>
                    <textarea
                      id="specialRequirements"
                      name="specialRequirements"
                      value={formData.specialRequirements}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    ></textarea>
                  </div>
                </div>
                
                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors"
                  >
                    Submit Registration
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Related Courses */}
      {selectedCourse && (
        <section className="py-16 bg-gray-100">
          <div className="container-custom">
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
                        <Link href={`/courses/${course.slug}`} className="hover:text-primary transition-colors">
                          {course.title}
                        </Link>
                      </h3>
                      <p className="text-gray-700 mb-4 line-clamp-2">{course.description}</p>
                      <Link 
                        href={`/register?courseId=${course.id}`}
                        className="text-primary font-bold hover:underline"
                      >
                        Register Now
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
