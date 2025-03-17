"use client";

import { useState, useEffect } from 'react';
import { Course } from '@/data/courses';
import PersonalInfoFields from './fields/PersonalInfoFields';
import ContactInfoFields from './fields/ContactInfoFields';
import AddressFields from './fields/AddressFields';
import EducationFields from './fields/EducationFields';
import EmploymentFields from './fields/EmploymentFields';
import MailingAddressFields from './fields/MailingAddressFields';
import CourseSelectionFields from './fields/CourseSelectionFields';
import CategorySpecificFields from './fields/CategorySpecificFields';
import CourseSpecificFields from './fields/CourseSpecificFields';
import SuccessMessage from '@/components/ui/SuccessMessage';

export interface RegistrationFormData {
  // Course Selection (Certification)
  courseId: string;
  category: string;
  
  // Personal Information
  firstName: string;
  middleName: string;
  lastName: string;
  dobDay: string;
  dobMonth: string;
  dobYear: string;
  gender: string;
  nationality: string;
  
  // Contact Information
  email: string;
  mobileNumber: string;
  
  // Education
  qualification: string;
  discipline: string;
  
  // Employment
  employmentStatus: string;
  employerName: string;
  workExperienceYears: string;
  workExperienceMonths: string;
  programmingExperienceYears: string;
  programmingExperienceMonths: string;
  
  // Billing Address
  billingAddressLine1: string;
  billingAddressLine2: string;
  billingAddressCity: string;
  billingAddressState: string;
  billingAddressZipCode: string;
  billingAddressCountry: string;
  
  // Mailing Address
  sameAsBillingAddress: boolean;
  mailingAddressLine1: string;
  mailingAddressLine2: string;
  mailingAddressCity: string;
  mailingAddressState: string;
  mailingAddressZipCode: string;
  mailingAddressCountry: string;
  
  // Additional Information
  hearAboutUs: string;
  specialRequirements: string;
  
  // Legacy fields for backward compatibility
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  educationLevel: string;
  workExperience: string;
  
  // Dynamic fields based on category
  [key: string]: string | boolean;
}

interface RegistrationFormProps {
  courses: Course[];
  categories: { id: string; title: string }[];
  initialCourseId?: string;
  initialCategory?: string;
}

export default function RegistrationForm({ 
  courses, 
  initialCourseId, 
  initialCategory,
  categories
}: RegistrationFormProps) {
  const initialFormData: RegistrationFormData = {
    // Course Selection (Certification)
    courseId: initialCourseId || '',
    category: initialCategory || '',
    
    // Personal Information
    firstName: '',
    middleName: '',
    lastName: '',
    dobDay: '',
    dobMonth: '',
    dobYear: '',
    gender: '',
    nationality: 'Sri Lanka',
    
    // Contact Information
    email: '',
    mobileNumber: '',
    
    // Education
    qualification: '',
    discipline: '',
    
    // Employment
    employmentStatus: '',
    employerName: '',
    workExperienceYears: '',
    workExperienceMonths: '',
    programmingExperienceYears: '',
    programmingExperienceMonths: '',
    
    // Billing Address
    billingAddressLine1: '',
    billingAddressLine2: '',
    billingAddressCity: '',
    billingAddressState: '',
    billingAddressZipCode: '',
    billingAddressCountry: '',
    
    // Mailing Address
    sameAsBillingAddress: true,
    mailingAddressLine1: '',
    mailingAddressLine2: '',
    mailingAddressCity: '',
    mailingAddressState: '',
    mailingAddressZipCode: '',
    mailingAddressCountry: '',
    
    // Additional Information
    hearAboutUs: '',
    specialRequirements: '',
    
    // Legacy fields for backward compatibility
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    educationLevel: '',
    workExperience: '',
  };

  const [formData, setFormData] = useState<RegistrationFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [categorySpecificFields, setCategorySpecificFields] = useState<{[key: string]: string}[]>([]);
  const [courseSpecificFields, setCourseSpecificFields] = useState<{[key: string]: string}[]>([]);

  // Filter courses based on selected category
  useEffect(() => {
    if (formData.category) {
      setFilteredCourses(courses.filter(course => course.category === formData.category));
    } else {
      setFilteredCourses([]);
    }
  }, [formData.category, courses]);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Special handling for course selection to reset course-specific fields
    if (name === 'courseId' && value !== formData.courseId) {
      setCourseSpecificFields([]);
    }
    
    // Special handling for category selection to reset category-specific fields and course selection
    if (name === 'category' && value !== formData.category) {
      setCategorySpecificFields([]);
      setCourseSpecificFields([]);
      setFormData(prev => ({
        ...prev,
        [name]: value,
        courseId: ''
      }));
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    
    // If checking "same as billing address", copy billing address to mailing address
    if (name === 'sameAsBillingAddress' && checked) {
      setFormData(prev => ({
        ...prev,
        sameAsBillingAddress: checked,
        mailingAddressLine1: prev.billingAddressLine1,
        mailingAddressLine2: prev.billingAddressLine2,
        mailingAddressCity: prev.billingAddressCity,
        mailingAddressState: prev.billingAddressState,
        mailingAddressZipCode: prev.billingAddressZipCode,
        mailingAddressCountry: prev.billingAddressCountry
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    }
  };

  // Handle category-specific field changes
  const handleCategoryFieldChange = (index: number, field: string, value: string) => {
    const updatedFields = [...categorySpecificFields];
    if (!updatedFields[index]) {
      updatedFields[index] = {};
    }
    updatedFields[index][field] = value;
    setCategorySpecificFields(updatedFields);
  };

  // Handle course-specific field changes
  const handleCourseFieldChange = (index: number, field: string, value: string) => {
    const updatedFields = [...courseSpecificFields];
    if (!updatedFields[index]) {
      updatedFields[index] = {};
    }
    updatedFields[index][field] = value;
    setCourseSpecificFields(updatedFields);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Prepare the data for submission
      const submissionData = {
        ...formData,
        categoryFields: categorySpecificFields,
        courseFields: courseSpecificFields,
        // Format the date of birth
        dateOfBirth: `${formData.dobYear}-${formData.dobMonth}-${formData.dobDay}`,
      };
      
      // Mock API call - replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', submissionData);
      
      // Reset form and show success message
      setFormData(initialFormData);
      setCategorySpecificFields([]);
      setCourseSpecificFields([]);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <SuccessMessage 
        title="Registration Successful!" 
        message="Thank you for registering. We will contact you shortly with further details."
        buttonText="Register for Another Course"
        onButtonClick={() => setIsSubmitted(false)}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Course Registration</h2>
      
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
      
      {/* Education */}
      <EducationFields 
        formData={formData}
        handleChange={handleChange}
      />
      
      {/* Employment */}
      <EmploymentFields 
        formData={formData}
        handleChange={handleChange}
      />
      
      {/* Billing Address */}
      <AddressFields 
        formData={formData}
        handleChange={handleChange}
        title="Billing Address"
      />
      
      {/* Mailing Address */}
      <MailingAddressFields 
        formData={formData}
        handleChange={handleChange}
        handleCheckboxChange={handleCheckboxChange}
      />
      
      {/* Category-specific fields */}
      {formData.category && (
        <CategorySpecificFields
          category={formData.category}
          categoryFields={categorySpecificFields}
          handleCategoryFieldChange={handleCategoryFieldChange}
        />
      )}
      
      {/* Course-specific fields */}
      {formData.courseId && (
        <CourseSpecificFields
          courseId={formData.courseId}
          courseFields={courseSpecificFields}
          handleCourseFieldChange={handleCourseFieldChange}
        />
      )}
      
      {/* Special Requirements */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Information</h3>
        <div className="mb-4">
          <label htmlFor="specialRequirements" className="block text-gray-700 font-medium mb-2">Special Requirements or Comments</label>
          <textarea
            id="specialRequirements"
            name="specialRequirements"
            value={formData.specialRequirements}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Please let us know if you have any special requirements or additional information to share."
          ></textarea>
        </div>
      </div>
      
      {/* Submit Button */}
      <div className="mt-8">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Complete Registration'}
        </button>
      </div>
    </form>
  );
}
