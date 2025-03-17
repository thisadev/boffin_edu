"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { courses, Course } from '@/data/courses';
import FormBreadcrumbs from './FormBreadcrumbs';
import CourseSelectionStep from './steps/CourseSelectionStep';
import PersonalInfoStep from './steps/PersonalInfoStep';
import EducationStep from './steps/EducationStep';
import PaymentStep from './steps/PaymentStep';
import ReviewStep from './steps/ReviewStep';
import SuccessMessage from '@/components/ui/SuccessMessage';
import { Button } from '@/components/ui/button';

interface RegistrationFormData {
  // Course selection
  category: string;
  courseId: string;
  
  // Personal information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
  address: string;
  city: string;
  postalCode: string;
  
  // Education
  highestQualification: string;
  institution: string;
  fieldOfStudy: string;
  yearOfCompletion?: string;
  
  // Work experience
  employmentStatus?: string;
  employer?: string;
  jobTitle?: string;
  yearsOfExperience?: string;
  
  // Payment
  couponCode?: string;
  paymentMethod: string;
  
  // Terms
  terms: boolean;
}

export default function MultiStepRegisterForm() {
  const searchParams = useSearchParams();
  const courseId = searchParams.get('courseId');
  
  // Form steps
  const steps = [
    { id: 'course', title: 'Course Selection' },
    { id: 'personal', title: 'Personal Information' },
    { id: 'education', title: 'Education & Experience' },
    { id: 'payment', title: 'Payment' },
    { id: 'review', title: 'Review & Submit' }
  ];
  
  // Form state
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<RegistrationFormData>({
    category: '',
    courseId: courseId || '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    dateOfBirth: '',
    address: '',
    city: '',
    postalCode: '',
    highestQualification: '',
    institution: '',
    fieldOfStudy: '',
    paymentMethod: '',
    terms: false
  });
  
  const [formComplete, setFormComplete] = useState({
    course: false,
    personal: false,
    education: false,
    payment: false
  });
  
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  
  // Form validation state
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
  
  // Initialize form data with URL parameters
  useEffect(() => {
    const category = searchParams.get('category');
    const courseId = searchParams.get('courseId');
    
    if (category) {
      setFormData(prev => ({ ...prev, category }));
    }
    
    if (courseId) {
      setFormData(prev => ({ ...prev, courseId }));
      const selectedCourse = courses.find(course => course.id === courseId);
      if (selectedCourse) {
        setSelectedCourse(selectedCourse);
        handleFormComplete('course', true);
        // Skip to personal info step if course is already selected
        setCurrentStep(1);
      }
    }
  }, [searchParams]);
  
  // Update selected course when courseId changes
  useEffect(() => {
    if (formData.courseId) {
      const course = courses.find(course => course.id === formData.courseId) || null;
      setSelectedCourse(course);
    } else {
      setSelectedCourse(null);
    }
  }, [formData.courseId]);
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Handle checkbox inputs
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  // Update form completion status for a specific step
  const handleFormComplete = (step: string, isComplete: boolean) => {
    setFormComplete(prev => ({ ...prev, [step]: isComplete }));
  };
  
  // Handle coupon discount update
  const handleCouponDiscountUpdate = (discount: number) => {
    setCouponDiscount(discount);
  };
  
  // Handle next step
  const handleNext = () => {
    const currentStepId = steps[currentStep].id;
    
    // Validate current step
    if (!validateStep(currentStepId)) {
      // Show validation errors
      return;
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  // Navigate to previous step
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Navigate to specific step
  const handleStepClick = (index: number) => {
    // Only allow navigation to completed steps or the current step
    if (index <= currentStep || isStepAccessible(index)) {
      setCurrentStep(index);
    }
  };
  
  // Check if a step is accessible (all previous steps are complete)
  const isStepAccessible = (stepIndex: number) => {
    // First step is always accessible
    if (stepIndex === 0) return true;
    
    // For other steps, check if all previous steps are complete
    for (let i = 0; i < stepIndex; i++) {
      if (!formComplete[steps[i].id as keyof typeof formComplete]) {
        return false;
      }
    }
    
    return true;
  };
  
  // Validate form data for each step
  const validateStep = (step: string): boolean => {
    const errors: { [key: string]: string } = {};
    
    switch(step) {
      case 'course':
        if (!formData.category) errors.category = 'Please select a course category';
        if (!formData.courseId) errors.courseId = 'Please select a course';
        break;
      
      case 'personal':
        if (!formData.firstName.trim()) errors.firstName = 'First name is required';
        if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
        if (!formData.email.trim()) errors.email = 'Email is required';
        else if (!/^\S+@\S+\.\S+$/.test(formData.email)) errors.email = 'Please enter a valid email';
        if (!formData.phone.trim()) errors.phone = 'Phone number is required';
        if (!formData.gender) errors.gender = 'Please select your gender';
        if (!formData.dateOfBirth) errors.dateOfBirth = 'Date of birth is required';
        if (!formData.address.trim()) errors.address = 'Address is required';
        if (!formData.city.trim()) errors.city = 'City is required';
        if (!formData.postalCode.trim()) errors.postalCode = 'Postal code is required';
        break;
      
      case 'education':
        if (!formData.highestQualification) errors.highestQualification = 'Please select your highest qualification';
        if (!formData.institution.trim()) errors.institution = 'Institution name is required';
        if (!formData.fieldOfStudy.trim()) errors.fieldOfStudy = 'Field of study is required';
        break;
      
      case 'payment':
        if (!formData.paymentMethod) errors.paymentMethod = 'Please select a payment method';
        break;
      
      case 'review':
        if (!formData.terms) errors.terms = 'You must agree to the terms and conditions';
        break;
    }
    
    // Only update validation errors if there are actual errors to avoid unnecessary re-renders
    if (Object.keys(errors).length > 0 || Object.keys(validationErrors).length > 0) {
      setValidationErrors(errors);
    }
    
    return Object.keys(errors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate the review step before submission
    if (!validateStep('review')) {
      return;
    }
    
    // Validate terms acceptance
    if (!formData.terms) {
      alert('Please accept the terms and conditions to proceed.');
      return;
    }
    
    // Set form status to submitting
    setFormStatus({
      submitted: true,
      success: false,
      message: 'Submitting your registration...'
    });
    
    try {
      // Calculate final price
      const finalPrice = selectedCourse ? 
        (selectedCourse.discountPrice || selectedCourse.price) - couponDiscount : 0;
      
      // Prepare data for API
      const registrationData = {
        ...formData,
        finalPrice: finalPrice.toString()
      };
      
      // Send registration data to API
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setFormStatus({
          submitted: true,
          success: true,
          message: result.message || 'Registration successful! You will receive a confirmation email shortly.'
        });
      } else {
        throw new Error(result.error || 'Registration failed');
      }
    } catch (error) {
      setFormStatus({
        submitted: true,
        success: false,
        message: 'An error occurred while submitting your registration. Please try again.'
      });
      console.error('Error submitting form:', error);
    }
  };
  
  // Render the current step
  const renderStep = () => {
    switch (currentStep) {
      case 0: // Course Selection
        return (
          <CourseSelectionStep
            formData={formData}
            handleChange={handleChange}
            setFormComplete={(step, isComplete) => handleFormComplete(step, isComplete)}
            validationErrors={validationErrors}
          />
        );
      case 1: // Personal Information
        return (
          <PersonalInfoStep
            formData={formData}
            handleChange={handleChange}
            setFormComplete={(step, isComplete) => handleFormComplete(step, isComplete)}
            validationErrors={validationErrors}
          />
        );
      case 2: // Education & Experience
        return (
          <EducationStep
            formData={formData}
            handleChange={handleChange}
            setFormComplete={(step, isComplete) => handleFormComplete(step, isComplete)}
            validationErrors={validationErrors}
          />
        );
      case 3: // Payment
        return (
          <PaymentStep
            formData={formData}
            handleChange={handleChange}
            selectedCourse={selectedCourse}
            setFormComplete={(step, isComplete) => handleFormComplete(step, isComplete)}
            validationErrors={validationErrors}
          />
        );
      case 4: // Review & Submit
        return (
          <ReviewStep
            formData={formData}
            selectedCourse={selectedCourse}
            couponDiscount={couponDiscount}
            handleChange={handleChange}
            validationErrors={validationErrors}
          />
        );
      default:
        return null;
    }
  };
  
  // If form is successfully submitted, show success message
  if (formStatus.submitted && formStatus.success) {
    return (
      <SuccessMessage
        title="Registration Successful!"
        message={formStatus.message}
        buttonText="Return to Home"
        buttonHref="/"
      />
    );
  }
  
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
      {/* Breadcrumb Navigation */}
      <FormBreadcrumbs
        steps={steps}
        currentStep={currentStep}
        completedSteps={formComplete}
        onStepClick={handleStepClick}
      />
      
      {/* Current Step */}
      {renderStep()}
      
      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8 mb-12">
        {currentStep > 0 ? (
          <Button
            type="button"
            onClick={handlePrevious}
            variant="outline"
            className="px-6"
          >
            Previous
          </Button>
        ) : (
          <div></div> // Empty div to maintain flex spacing
        )}
        
        {currentStep < steps.length - 1 ? (
          <Button
            type="button"
            onClick={handleNext}
            disabled={!formComplete[steps[currentStep].id as keyof typeof formComplete]}
            className="px-6"
          >
            Next
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={!formData.terms || formStatus.submitted}
            className="px-6 bg-green-600 hover:bg-green-700"
          >
            {formStatus.submitted ? 'Processing...' : 'Submit and Pay'}
          </Button>
        )}
      </div>
    </form>
  );
}
