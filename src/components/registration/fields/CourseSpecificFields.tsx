import React from 'react';
import { courses } from '@/data/courses';

interface CourseSpecificFieldsProps {
  courseId: string;
  courseFields: {[key: string]: string}[];
  handleCourseFieldChange: (index: number, field: string, value: string) => void;
}

export default function CourseSpecificFields({ 
  courseId, 
  courseFields,
  handleCourseFieldChange 
}: CourseSpecificFieldsProps) {
  // Find the course by ID
  const course = courses.find(c => c.id === courseId);
  
  if (!course) return null;
  
  // Render fields based on the selected course level
  switch (course.level) {
    case 'Advanced':
      return (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Advanced Course Requirements</h3>
          <div className="mb-4">
            <label htmlFor="advancedPrerequisites" className="block text-gray-700 font-medium mb-2">Previous Courses or Experience</label>
            <textarea
              id="advancedPrerequisites"
              value={courseFields[0]?.advancedPrerequisites || ''}
              onChange={(e) => handleCourseFieldChange(0, 'advancedPrerequisites', e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Please list any relevant courses you've completed or experience you have in this field"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="technicalBackground" className="block text-gray-700 font-medium mb-2">Technical Background</label>
            <textarea
              id="technicalBackground"
              value={courseFields[0]?.technicalBackground || ''}
              onChange={(e) => handleCourseFieldChange(0, 'technicalBackground', e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Please describe your technical background relevant to this course"
            ></textarea>
          </div>
        </div>
      );
    case 'Intermediate':
      return (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Intermediate Course Information</h3>
          <div className="mb-4">
            <label htmlFor="priorKnowledge" className="block text-gray-700 font-medium mb-2">Prior Knowledge</label>
            <textarea
              id="priorKnowledge"
              value={courseFields[0]?.priorKnowledge || ''}
              onChange={(e) => handleCourseFieldChange(0, 'priorKnowledge', e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Please describe your current knowledge level in this subject"
            ></textarea>
          </div>
        </div>
      );
    case 'Beginner':
      return (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Beginner Course Information</h3>
          <div className="mb-4">
            <label htmlFor="learningObjectives" className="block text-gray-700 font-medium mb-2">Learning Objectives</label>
            <textarea
              id="learningObjectives"
              value={courseFields[0]?.learningObjectives || ''}
              onChange={(e) => handleCourseFieldChange(0, 'learningObjectives', e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="What do you hope to achieve by taking this course?"
            ></textarea>
          </div>
        </div>
      );
    default:
      return (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Course-Specific Information</h3>
          <div className="mb-4">
            <label htmlFor="additionalInfo" className="block text-gray-700 font-medium mb-2">Additional Information</label>
            <textarea
              id="additionalInfo"
              value={courseFields[0]?.additionalInfo || ''}
              onChange={(e) => handleCourseFieldChange(0, 'additionalInfo', e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Is there anything else you'd like us to know about your registration for this course?"
            ></textarea>
          </div>
        </div>
      );
  }
}
