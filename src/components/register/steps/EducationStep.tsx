"use client";

import React, { useEffect } from 'react';

interface EducationStepProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  setFormComplete: (step: string, isComplete: boolean) => void;
  validationErrors?: { [key: string]: string };
}

const EducationStep: React.FC<EducationStepProps> = ({ 
  formData, 
  handleChange,
  setFormComplete,
  validationErrors = {}
}) => {
  // Check if education information is complete
  useEffect(() => {
    const requiredFields = ['highestQualification', 'institution', 'fieldOfStudy'];
    const isComplete = requiredFields.every(field => formData[field] && formData[field].trim() !== '');
    setFormComplete('education', isComplete);
  }, [formData.highestQualification, formData.institution, formData.fieldOfStudy, setFormComplete]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-boffin-primary mb-4">Education & Experience</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Highest Qualification */}
        <div>
          <label htmlFor="highestQualification" className="block text-boffin-background font-medium mb-2">Highest Qualification <span className="text-red-500">*</span></label>
          <div className="relative">
            <select
              id="highestQualification"
              name="highestQualification"
              value={formData.highestQualification || ''}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-boffin-background bg-white focus:outline-none focus:ring-2 focus:ring-boffin-primary focus:border-transparent"
            >
              <option value="" className="text-boffin-background">Select qualification</option>
              <option value="high_school" className="text-boffin-background">High School</option>
              <option value="diploma" className="text-boffin-background">Diploma</option>
              <option value="bachelors" className="text-boffin-background">Bachelor's Degree</option>
              <option value="masters" className="text-boffin-background">Master's Degree</option>
              <option value="phd" className="text-boffin-background">PhD</option>
              <option value="other" className="text-boffin-background">Other</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-boffin-background">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Institution */}
        <div>
          <label htmlFor="institution" className="block text-boffin-background font-medium mb-2">Institution <span className="text-red-500">*</span></label>
          <input
            type="text"
            id="institution"
            name="institution"
            value={formData.institution || ''}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-boffin-background bg-white focus:outline-none focus:ring-2 focus:ring-boffin-primary focus:border-transparent"
            placeholder="Name of school/university"
          />
        </div>

        {/* Field of Study */}
        <div>
          <label htmlFor="fieldOfStudy" className="block text-boffin-background font-medium mb-2">Field of Study <span className="text-red-500">*</span></label>
          <input
            type="text"
            id="fieldOfStudy"
            name="fieldOfStudy"
            value={formData.fieldOfStudy || ''}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-boffin-background bg-white focus:outline-none focus:ring-2 focus:ring-boffin-primary focus:border-transparent"
            placeholder="e.g. Computer Science, Business, etc."
          />
        </div>

        {/* Year of Completion */}
        <div>
          <label htmlFor="yearOfCompletion" className="block text-boffin-background font-medium mb-2">Year of Completion</label>
          <input
            type="number"
            id="yearOfCompletion"
            name="yearOfCompletion"
            value={formData.yearOfCompletion || ''}
            onChange={handleChange}
            min="1950"
            max={new Date().getFullYear()}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-boffin-background bg-white focus:outline-none focus:ring-2 focus:ring-boffin-primary focus:border-transparent"
          />
        </div>
      </div>

      <h3 className="text-lg font-semibold text-boffin-background mb-4">Work Experience</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current Employment Status */}
        <div>
          <label htmlFor="employmentStatus" className="block text-boffin-background font-medium mb-2">Current Employment Status</label>
          <div className="relative">
            <select
              id="employmentStatus"
              name="employmentStatus"
              value={formData.employmentStatus || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-boffin-background bg-white focus:outline-none focus:ring-2 focus:ring-boffin-primary focus:border-transparent"
            >
              <option value="" className="text-boffin-background">Select status</option>
              <option value="employed" className="text-boffin-background">Employed</option>
              <option value="self_employed" className="text-boffin-background">Self-Employed</option>
              <option value="unemployed" className="text-boffin-background">Unemployed</option>
              <option value="student" className="text-boffin-background">Student</option>
              <option value="retired" className="text-boffin-background">Retired</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-boffin-background">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Current/Last Employer */}
        <div>
          <label htmlFor="employer" className="block text-boffin-background font-medium mb-2">Current/Last Employer</label>
          <input
            type="text"
            id="employer"
            name="employer"
            value={formData.employer || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-boffin-background bg-white focus:outline-none focus:ring-2 focus:ring-boffin-primary focus:border-transparent"
          />
        </div>

        {/* Job Title */}
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

        {/* Years of Experience */}
        <div>
          <label htmlFor="yearsOfExperience" className="block text-boffin-background font-medium mb-2">Years of Experience</label>
          <input
            type="number"
            id="yearsOfExperience"
            name="yearsOfExperience"
            value={formData.yearsOfExperience || ''}
            onChange={handleChange}
            min="0"
            max="50"
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-boffin-background bg-white focus:outline-none focus:ring-2 focus:ring-boffin-primary focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default EducationStep;
