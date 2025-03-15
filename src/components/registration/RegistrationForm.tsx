"use client";

import { useState, useEffect } from 'react';
import { Course } from '@/data/courses';
import PersonalInfoFields from './fields/PersonalInfoFields';
import ContactInfoFields from './fields/ContactInfoFields';
import AddressFields from './fields/AddressFields';
import EducationFields from './fields/EducationFields';
import CourseSelectionFields from './fields/CourseSelectionFields';
import CategorySpecificFields from './fields/CategorySpecificFields';
import CourseSpecificFields from './fields/CourseSpecificFields';
import SuccessMessage from '@/components/ui/SuccessMessage';

export interface RegistrationFormData {
  // Personal Information
  firstName: string;
  lastName: string;
  
  // Contact Information
  email: string;
  phone: string;
  
  // Address
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  
  // Course Selection
  courseId: string;
  category: string;
  
  // Background
  educationLevel: string;
  workExperience: string;
  hearAboutUs: string;
  specialRequirements: string;
  
  // Dynamic fields based on category
  [key: string]: string | boolean;
}

interface RegistrationFormProps {
  initialCategory?: string;
  initialCourseId?: string;
  courses: Course[];
  categories: { id: string; title: string }[];
}

export default function RegistrationForm({ 
  initialCategory, 
  initialCourseId,
  courses,
  categories
}: RegistrationFormProps) {
  const initialFormData: RegistrationFormData = {
    // Personal Information
    firstName: '',
    lastName: '',
    
    // Contact Information
    email: '',
    phone: '',
    
    // Address
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    
    // Course Selection
    courseId: initialCourseId || '',
    category: initialCategory || '',
    
    // Background
    educationLevel: '',
    workExperience: '',
    hearAboutUs: '',
    specialRequirements: '',
  };

  const [formData, setFormData] = useState<RegistrationFormData>(initialFormData);
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [selectedCourse, setSelectedCourse] = useState<Course | undefined>(undefined);

  // Filter courses when category changes
  useEffect(() => {
    if (formData.category) {
      setFilteredCourses(courses.filter(course => course.category === formData.category));
    } else {
      setFilteredCourses(courses);
    }
  }, [formData.category, courses]);

  // Update selected course when courseId changes
  useEffect(() => {
    if (formData.courseId) {
      const course = courses.find(c => c.id === formData.courseId);
      setSelectedCourse(course);
    } else {
      setSelectedCourse(undefined);
    }
  }, [formData.courseId, courses]);

  // Handle initial course selection from URL parameters
  useEffect(() => {
    if (initialCourseId) {
      const selectedCourse = courses.find(course => course.id === initialCourseId);
      if (selectedCourse) {
        // If course exists but category doesn't match or isn't provided, use the course's category
        if (!initialCategory || selectedCourse.category !== initialCategory) {
          setFormData(prev => ({
            ...prev,
            category: selectedCourse.category,
            courseId: initialCourseId
          }));
        }
      }
    }
  }, [initialCategory, initialCourseId, courses]);

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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

    try {
      // In a real application, you would send this data to your backend
      // For now, we'll just simulate a successful submission
      // const response = await fetch('/api/register', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });
      
      // if (!response.ok) {
      //   throw new Error('Registration failed');
      // }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setFormStatus({
        submitted: true,
        success: true,
        message: 'Registration successful! We will contact you shortly with next steps.'
      });
      
      // Show success modal
      setShowSuccessModal(true);
      
      // Reset form after successful submission
      setFormData(initialFormData);
    } catch (error) {
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Registration failed. Please try again later.'
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {showSuccessModal && (
        <SuccessMessage
          title="Registration Successful!"
          message={formStatus.message}
          onClose={() => setShowSuccessModal(false)}
        />
      )}
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Course Selection */}
        <CourseSelectionFields
          formData={formData}
          handleChange={handleChange}
          categories={categories}
          filteredCourses={filteredCourses}
        />
        
        {/* Personal Information */}
        <PersonalInfoFields 
          formData={formData}
          handleChange={handleChange}
        />
        
        {/* Contact Information */}
        <ContactInfoFields 
          formData={formData}
          handleChange={handleChange}
        />
        
        {/* Address */}
        <AddressFields 
          formData={formData}
          handleChange={handleChange}
        />
        
        {/* Education and Background */}
        <EducationFields 
          formData={formData}
          handleChange={handleChange}
        />
        
        {/* Category-specific fields */}
        {formData.category && (
          <CategorySpecificFields
            category={formData.category}
            formData={formData}
            handleChange={handleChange}
            handleCheckboxChange={handleCheckboxChange}
          />
        )}
        
        {/* Course-specific fields */}
        {selectedCourse && (
          <CourseSpecificFields
            course={selectedCourse}
            formData={formData}
            handleChange={handleChange}
            handleCheckboxChange={handleCheckboxChange}
          />
        )}
        
        {/* Special Requirements */}
        <div className="mb-6">
          <label htmlFor="specialRequirements" className="block text-gray-700 font-medium mb-2">Special Requirements or Accommodations</label>
          <textarea
            id="specialRequirements"
            name="specialRequirements"
            value={formData.specialRequirements}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Please let us know if you have any special requirements or need any accommodations"
          />
        </div>
        
        {/* Form Status */}
        {formStatus.submitted && !formStatus.success && (
          <div className="p-4 mb-6 text-sm text-red-700 bg-red-100 rounded-lg">
            {formStatus.message}
          </div>
        )}
        
        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Submit Registration
          </button>
        </div>
      </form>
    </div>
  );
}
