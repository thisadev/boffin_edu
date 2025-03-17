"use client";

import React, { useEffect } from 'react';

interface PersonalInfoStepProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  setFormComplete: (step: string, isComplete: boolean) => void;
  validationErrors?: { [key: string]: string };
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ 
  formData, 
  handleChange,
  setFormComplete,
  validationErrors = {}
}) => {
  // Check if personal information is complete
  useEffect(() => {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'gender', 'dateOfBirth', 'address', 'city', 'postalCode'];
    const isComplete = requiredFields.every(field => formData[field] && (formData[field].trim() !== ''));
    setFormComplete('personal', isComplete);
  }, [formData.firstName, formData.lastName, formData.email, formData.phone, formData.gender, formData.dateOfBirth, formData.address, formData.city, formData.postalCode, setFormComplete]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-boffin-primary mb-4">Personal Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* First Name */}
        <div>
          <label htmlFor="firstName" className="block text-boffin-background font-medium mb-2">First Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName || ''}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-boffin-background bg-white focus:outline-none focus:ring-2 focus:ring-boffin-primary focus:border-transparent"
          />
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lastName" className="block text-boffin-background font-medium mb-2">Last Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName || ''}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-boffin-background bg-white focus:outline-none focus:ring-2 focus:ring-boffin-primary focus:border-transparent"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-boffin-background font-medium mb-2">Email <span className="text-red-500">*</span></label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-boffin-background bg-white focus:outline-none focus:ring-2 focus:ring-boffin-primary focus:border-transparent"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-boffin-background font-medium mb-2">Phone <span className="text-red-500">*</span></label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone || ''}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-boffin-background bg-white focus:outline-none focus:ring-2 focus:ring-boffin-primary focus:border-transparent"
          />
        </div>

        {/* Gender */}
        <div>
          <label htmlFor="gender" className="block text-boffin-background font-medium mb-2">Gender <span className="text-red-500">*</span></label>
          <div className="relative">
            <select
              id="gender"
              name="gender"
              value={formData.gender || ''}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-boffin-background bg-white focus:outline-none focus:ring-2 focus:ring-boffin-primary focus:border-transparent"
            >
              <option value="" className="text-boffin-background">Select gender</option>
              <option value="male" className="text-boffin-background">Male</option>
              <option value="female" className="text-boffin-background">Female</option>
              <option value="other" className="text-boffin-background">Other</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-boffin-background">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Date of Birth */}
        <div>
          <label htmlFor="dateOfBirth" className="block text-boffin-background font-medium mb-2">Date of Birth <span className="text-red-500">*</span></label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth || ''}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-boffin-background bg-white focus:outline-none focus:ring-2 focus:ring-boffin-primary focus:border-transparent"
          />
        </div>
      </div>

      <h3 className="text-lg font-semibold text-boffin-background mb-4">Address Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Address */}
        <div className="md:col-span-2">
          <label htmlFor="address" className="block text-boffin-background font-medium mb-2">Address <span className="text-red-500">*</span></label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address || ''}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-boffin-background bg-white focus:outline-none focus:ring-2 focus:ring-boffin-primary focus:border-transparent"
          />
        </div>

        {/* City */}
        <div>
          <label htmlFor="city" className="block text-boffin-background font-medium mb-2">City <span className="text-red-500">*</span></label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city || ''}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-boffin-background bg-white focus:outline-none focus:ring-2 focus:ring-boffin-primary focus:border-transparent"
          />
        </div>

        {/* Postal Code */}
        <div>
          <label htmlFor="postalCode" className="block text-boffin-background font-medium mb-2">Postal Code <span className="text-red-500">*</span></label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={formData.postalCode || ''}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-boffin-background bg-white focus:outline-none focus:ring-2 focus:ring-boffin-primary focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
