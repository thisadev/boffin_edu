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
  category?: string;
  courseId?: number;
  
  // Personal information
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  gender?: string;
  dateOfBirth?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  
  // Education
  highestQualification?: string;
  institution?: string;
  fieldOfStudy?: string;
  yearOfCompletion?: string;
  
  // Work experience
  employmentStatus?: string;
  employer?: string;
  jobTitle?: string;
  yearsOfExperience?: string;
  
  // Payment
  couponCode?: string;
  paymentMethod?: string;
  
  // Terms
  terms?: boolean;
}

interface FormCompletionStatus {
  [key: string]: boolean;
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
    category: undefined,
    courseId: undefined,
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    phone: undefined,
    gender: undefined,
    dateOfBirth: undefined,
    address: undefined,
    city: undefined,
    postalCode: undefined,
    highestQualification: undefined,
    institution: undefined,
    fieldOfStudy: undefined,
    paymentMethod: undefined,
    terms: undefined
  });

  // Form completion status
  const [formComplete, setFormComplete] = useState<Record<string, boolean>>({
    course: false,
    personal: false,
    education: false,
    payment: false
  });

  // Update form completion status for a specific step
  const handleFormComplete = (step: string, isComplete: boolean) => {
    setFormComplete(prev => ({ ...prev, [step]: isComplete }));
  };

  // Check if a step is complete
  const isStepComplete = (stepId: string): boolean => {
    switch (stepId) {
      case 'course':
        return !!formData.category && !!formData.courseId;
      case 'personal':
        return !!formData.firstName && !!formData.lastName && 
          !!formData.email && !!formData.phone && 
          !!formData.gender && !!formData.dateOfBirth &&
          !!formData.address && !!formData.city && !!formData.postalCode;
      case 'education':
        return !!formData.highestQualification && !!formData.institution && !!formData.fieldOfStudy;
      case 'payment':
        return !!formData.paymentMethod;
      case 'review':
        return !!formData.terms;
      default:
        return false;
    }
  };

  // Form validation state
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
  
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  
  // Initialize form data with URL parameters
  useEffect(() => {
    const category = searchParams.get('category');
    const courseId = searchParams.get('courseId');
    
    if (category) {
      setFormData(prev => ({ ...prev, category }));
    }
    
    if (courseId) {
      setFormData(prev => ({ ...prev, courseId: parseInt(courseId) }));
      const selectedCourse = courses.find(course => course.id === parseInt(courseId));
      if (selectedCourse) {
        setSelectedCourse(selectedCourse);
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
  
  // Handle form input changes with validation
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newFormData = { ...formData };
    
    // Handle checkbox inputs
    if (type === 'checkbox') {
      newFormData[name as keyof typeof formData] = (e.target as HTMLInputElement).checked;
    } else if (name === 'courseId') {
      newFormData[name as keyof typeof formData] = parseInt(value);
    } else {
      newFormData[name as keyof typeof formData] = value;
    }

    setFormData(newFormData);
    
    // Validate the current field
    const currentErrors = { ...validationErrors };
    const currentStepId = steps[currentStep].id;
    
    // Clear error for the current field
    if (currentErrors[name]) {
      delete currentErrors[name];
    }
    
    // Validate the current field
    if (currentStepId === 'personal') {
      if (name === 'email') {
        if (!value.trim()) {
          currentErrors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(value)) {
          currentErrors.email = 'Please enter a valid email address';
        }
      } else if (name === 'phone') {
        if (!value.trim()) {
          currentErrors.phone = 'Phone number is required';
        } else if (!/^[0-9]{10}$/.test(value)) {
          currentErrors.phone = 'Please enter a valid 10-digit phone number';
        }
      }
    }
    
    // Set validation errors
    setValidationErrors(currentErrors);
    
    // Update form completion status for current step
    const isComplete = isStepComplete(currentStepId);
    if (isComplete !== formComplete[currentStepId]) {
      handleFormComplete(currentStepId, isComplete);
    }
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
      if (!isStepComplete(steps[i].id)) {
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
        if (!formData.firstName?.trim()) errors.firstName = 'First name is required';
        if (!formData.lastName?.trim()) errors.lastName = 'Last name is required';
        if (!formData.email?.trim()) errors.email = 'Email is required';
        else if (!/^\S+@\S+\.\S+$/.test(formData.email)) errors.email = 'Please enter a valid email';
        if (!formData.phone?.trim()) errors.phone = 'Phone number is required';
        else if (!/^[0-9]{10}$/.test(formData.phone)) errors.phone = 'Please enter a valid 10-digit phone number';
        if (!formData.gender) errors.gender = 'Please select your gender';
        if (!formData.dateOfBirth) errors.dateOfBirth = 'Date of birth is required';
        if (!formData.address?.trim()) errors.address = 'Address is required';
        if (!formData.city?.trim()) errors.city = 'City is required';
        if (!formData.postalCode?.trim()) errors.postalCode = 'Postal code is required';
        break;
      
      case 'education':
        if (!formData.highestQualification) errors.highestQualification = 'Please select your highest qualification';
        if (!formData.institution?.trim()) errors.institution = 'Institution name is required';
        if (!formData.fieldOfStudy?.trim()) errors.fieldOfStudy = 'Field of study is required';
        break;
      
      case 'payment':
        if (!formData.paymentMethod) errors.paymentMethod = 'Please select a payment method';
        break;
      
      case 'review':
        if (!formData.terms) errors.terms = 'You must agree to the terms and conditions';
        break;
    }
    
    // Only update validation errors if there are actual errors
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
    }
    
    return Object.keys(errors).length === 0;
  };
  
  // Handle coupon discount update
  const handleCouponDiscountUpdate = (discount: number) => {
    setCouponDiscount(discount);
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate all steps
      const isValid = steps.every(step => validateStep(step.id));
      if (!isValid) {
        return;
      }

      // Prepare registration data
      const finalPrice = selectedCourse ? 
        (selectedCourse.discountPrice || selectedCourse.price) - couponDiscount : 0;
      const registrationData = {
        ...formData,
        finalPrice: finalPrice.toString(),
        courseId: formData.courseId, // Keep as number
        category: formData.category || ''
      };

      // Send registration data to API
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Update form status
      setFormStatus({
        submitted: true,
        success: true,
        message: 'Registration successful!'
      });

      // Reset form
      setFormData({
        category: undefined,
        courseId: undefined,
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        phone: undefined,
        gender: undefined,
        dateOfBirth: undefined,
        address: undefined,
        city: undefined,
        postalCode: undefined,
        highestQualification: undefined,
        institution: undefined,
        fieldOfStudy: undefined,
        paymentMethod: undefined,
        terms: undefined
      });
      setCurrentStep(0);
      setSelectedCourse(null);
      setFormComplete({
        course: false,
        personal: false,
        education: false,
        payment: false
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Registration failed. Please try again.'
      });
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
            validationErrors={validationErrors}
          />
        );
      case 1: // Personal Information
        return (
          <PersonalInfoStep
            formData={formData}
            handleChange={handleChange}
            validationErrors={validationErrors}
          />
        );
      case 2: // Education & Experience
        return (
          <EducationStep
            formData={formData}
            handleChange={handleChange}
            validationErrors={validationErrors}
          />
        );
      case 3: // Payment
        return (
          <PaymentStep
            formData={formData}
            handleChange={handleChange}
            selectedCourse={selectedCourse}
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
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
      <div className="space-y-6">
        <FormBreadcrumbs
          steps={steps}
          currentStep={currentStep}
          completedSteps={formComplete}
          onStepClick={handleStepClick}
        />

        {renderStep()}

        <div className="flex justify-end space-x-4">
          {currentStep > 0 && (
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              className="px-6"
            >
              Previous
            </Button>
          )}
          {currentStep < steps.length - 1 ? (
            <Button
              type="button"
              onClick={handleNext}
              disabled={!isStepComplete(steps[currentStep].id)}
              className="px-6"
            >
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              className="px-6"
            >
              Submit
            </Button>
          )}
        </div>
      </div>
    </form>
  );
};
