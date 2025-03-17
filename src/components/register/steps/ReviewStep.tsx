"use client";

import React from 'react';
import { Course } from '@/data/courses';

interface ReviewStepProps {
  formData: any;
  selectedCourse: Course | null;
  couponDiscount: number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  validationErrors?: { [key: string]: string };
}

const ReviewStep: React.FC<ReviewStepProps> = ({ 
  formData, 
  selectedCourse,
  couponDiscount,
  handleChange,
  validationErrors = {}
}) => {
  // Calculate final price
  const calculateFinalPrice = () => {
    if (!selectedCourse) return 0;
    
    const basePrice = selectedCourse.discountPrice || selectedCourse.price;
    return basePrice - couponDiscount;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-boffin-primary mb-4">Review Your Information</h2>
      <p className="text-gray-600 mb-6">Please review all information before submitting your registration.</p>
      
      {/* Course Information */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-boffin-background mb-2 flex items-center">
          <span>Course Information</span>
        </h3>
        <div className="p-4 bg-gray-50 rounded-md">
          {selectedCourse ? (
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-boffin-background font-medium">Course:</span>
                <span className="text-boffin-background">{selectedCourse.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-boffin-background font-medium">Duration:</span>
                <span className="text-boffin-background">{selectedCourse.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-boffin-background font-medium">Level:</span>
                <span className="text-boffin-background">{selectedCourse.level}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-boffin-background font-medium">Total Fee:</span>
                <span className="text-boffin-primary font-bold">Rs. {calculateFinalPrice().toLocaleString()}</span>
              </div>
            </div>
          ) : (
            <p className="text-red-500">No course selected</p>
          )}
        </div>
      </div>
      
      {/* Personal Information */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-boffin-background mb-2 flex items-center">
          <span>Personal Information</span>
        </h3>
        <div className="p-4 bg-gray-50 rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-boffin-background font-medium">Name:</p>
              <p className="text-boffin-background">{formData.firstName} {formData.lastName}</p>
            </div>
            <div>
              <p className="text-boffin-background font-medium">Email:</p>
              <p className="text-boffin-background">{formData.email}</p>
            </div>
            <div>
              <p className="text-boffin-background font-medium">Phone:</p>
              <p className="text-boffin-background">{formData.phone}</p>
            </div>
            <div>
              <p className="text-boffin-background font-medium">Gender:</p>
              <p className="text-boffin-background">{formData.gender === 'male' ? 'Male' : formData.gender === 'female' ? 'Female' : formData.gender === 'other' ? 'Other' : ''}</p>
            </div>
            <div>
              <p className="text-boffin-background font-medium">Date of Birth:</p>
              <p className="text-boffin-background">{formData.dateOfBirth}</p>
            </div>
            <div>
              <p className="text-boffin-background font-medium">Address:</p>
              <p className="text-boffin-background">{formData.address}, {formData.city}, {formData.postalCode}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Education Information */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-boffin-background mb-2 flex items-center">
          <span>Education & Experience</span>
        </h3>
        <div className="p-4 bg-gray-50 rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-boffin-background font-medium">Highest Qualification:</p>
              <p className="text-boffin-background">
                {formData.highestQualification === 'high_school' ? 'High School' :
                 formData.highestQualification === 'diploma' ? 'Diploma' :
                 formData.highestQualification === 'bachelors' ? 'Bachelor\'s Degree' :
                 formData.highestQualification === 'masters' ? 'Master\'s Degree' :
                 formData.highestQualification === 'phd' ? 'PhD' :
                 formData.highestQualification === 'other' ? 'Other' : ''}
              </p>
            </div>
            <div>
              <p className="text-boffin-background font-medium">Institution:</p>
              <p className="text-boffin-background">{formData.institution}</p>
            </div>
            <div>
              <p className="text-boffin-background font-medium">Field of Study:</p>
              <p className="text-boffin-background">{formData.fieldOfStudy}</p>
            </div>
            {formData.yearOfCompletion && (
              <div>
                <p className="text-boffin-background font-medium">Year of Completion:</p>
                <p className="text-boffin-background">{formData.yearOfCompletion}</p>
              </div>
            )}
            {formData.employmentStatus && (
              <div>
                <p className="text-boffin-background font-medium">Employment Status:</p>
                <p className="text-boffin-background">
                  {formData.employmentStatus === 'employed' ? 'Employed' :
                   formData.employmentStatus === 'self_employed' ? 'Self-Employed' :
                   formData.employmentStatus === 'unemployed' ? 'Unemployed' :
                   formData.employmentStatus === 'student' ? 'Student' :
                   formData.employmentStatus === 'retired' ? 'Retired' : ''}
                </p>
              </div>
            )}
            {formData.employer && (
              <div>
                <p className="text-boffin-background font-medium">Employer:</p>
                <p className="text-boffin-background">{formData.employer}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Payment Information */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-boffin-background mb-2 flex items-center">
          <span>Payment Information</span>
        </h3>
        <div className="p-4 bg-gray-50 rounded-md">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-boffin-background font-medium">Payment Method:</span>
              <span className="text-boffin-background">
                {formData.paymentMethod === 'myfees' ? 'MyFees.lk' : 
                 formData.paymentMethod === 'bank_transfer' ? 'Direct Bank Transfer' : ''}
              </span>
            </div>
            {selectedCourse && (
              <>
                <div className="flex justify-between">
                  <span className="text-boffin-background font-medium">Course Fee:</span>
                  <span className="text-boffin-background">Rs. {selectedCourse.price.toLocaleString()}</span>
                </div>
                
                {selectedCourse.discountPrice && selectedCourse.discountPrice < selectedCourse.price && (
                  <div className="flex justify-between">
                    <span className="text-boffin-background font-medium">Course Discount:</span>
                    <span className="text-green-600">- Rs. {(selectedCourse.price - selectedCourse.discountPrice).toLocaleString()}</span>
                  </div>
                )}
                
                {couponDiscount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-boffin-background font-medium">Coupon Discount:</span>
                    <span className="text-green-600">- Rs. {couponDiscount.toLocaleString()}</span>
                  </div>
                )}
                
                <div className="border-t border-gray-300 pt-2 mt-2">
                  <div className="flex justify-between font-bold">
                    <span className="text-boffin-background">Total Fee:</span>
                    <span className="text-boffin-primary">Rs. {calculateFinalPrice().toLocaleString()}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Terms and Conditions */}
      <div className="mb-6">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              checked={formData.terms || false}
              onChange={handleChange}
              className="h-4 w-4 text-boffin-primary focus:ring-boffin-primary border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="text-boffin-background">
              I confirm that all the information provided is accurate and complete. I agree to the <a href="#" className="text-boffin-primary hover:text-boffin-secondary underline">Terms and Conditions</a> and <a href="#" className="text-boffin-primary hover:text-boffin-secondary underline">Privacy Policy</a>.
            </label>
            {validationErrors.terms && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.terms}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;
