"use client";

import React, { useEffect } from 'react';
import { Course, courseCategories, courses } from '@/data/courses';

interface CourseSelectionStepProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  setFormComplete: (step: string, isComplete: boolean) => void;
  validationErrors?: { [key: string]: string };
}

const CourseSelectionStep: React.FC<CourseSelectionStepProps> = ({ 
  formData, 
  handleChange,
  setFormComplete,
  validationErrors = {}
}) => {
  const [filteredCourses, setFilteredCourses] = React.useState(courses);
  const [selectedCourse, setSelectedCourse] = React.useState<Course | null>(null);

  // Filter courses when category changes
  useEffect(() => {
    if (formData.category) {
      const filtered = courses.filter(course => course.category.toLowerCase() === formData.category.toLowerCase());
      setFilteredCourses(filtered);
    } else {
      setFilteredCourses(courses);
    }
  }, [formData.category]);

  // Update selected course when courseId changes
  useEffect(() => {
    if (formData.courseId) {
      const course = courses.find(course => course.id === formData.courseId) || null;
      setSelectedCourse(course);
      // Update form completion status immediately when course is selected
      setFormComplete('course', !!course);
    } else {
      setSelectedCourse(null);
      setFormComplete('course', false);
    }
  }, [formData.courseId, setFormComplete]);

  // Handle form completion status
  useEffect(() => {
    const completionStatus = !!selectedCourse;
    const updateCompletion = () => {
      setFormComplete('course', completionStatus);
    };
    updateCompletion();
  }, [selectedCourse, setFormComplete]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-boffin-primary mb-4">Course Selection</h2>
      
      <div className="grid grid-cols-1 gap-6 mb-6">
        {/* Course Category */}
        <div>
          <label htmlFor="category" className="block text-boffin-background font-medium mb-2">Course Category <span className="text-red-500">*</span></label>
          <div className="relative">
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-boffin-background bg-white focus:outline-none focus:ring-2 focus:ring-boffin-primary focus:border-transparent"
            >
              <option value="" className="text-boffin-background">Select a category</option>
              {courseCategories.map(category => (
                <option key={category.id} value={category.id} className="text-boffin-background">
                  {category.title}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-boffin-background">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
            {validationErrors.category && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.category}</p>
            )}
          </div>
        </div>

        {/* Course Selection */}
        {formData.category && (
          <div>
            <label htmlFor="courseId" className="block text-boffin-background font-medium mb-2">Course <span className="text-red-500">*</span></label>
            <div className="relative">
              <select
                id="courseId"
                name="courseId"
                value={formData.courseId}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-boffin-background bg-white focus:outline-none focus:ring-2 focus:ring-boffin-primary focus:border-transparent"
              >
                <option value="" className="text-boffin-background">Select a course</option>
                {filteredCourses.map(course => (
                  <option key={course.id} value={course.id} className="text-boffin-background">
                    {course.title}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-boffin-background">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
              {validationErrors.courseId && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.courseId}</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Course Details */}
      {selectedCourse && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="text-lg font-semibold text-boffin-background mb-2">Selected Course Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-boffin-background">Course: {selectedCourse.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{selectedCourse.description}</p>
              <div className="mt-2">
                <span className="inline-block bg-boffin-primary text-white text-xs px-2 py-1 rounded mr-2">
                  {selectedCourse.duration}
                </span>
                <span className="inline-block bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded">
                  {selectedCourse.level}
                </span>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-boffin-background">Course Fee:</span>
                <span className="text-boffin-background font-medium">Rs. {selectedCourse.price.toLocaleString()}</span>
              </div>
              
              {selectedCourse.discountPrice && selectedCourse.discountPrice < selectedCourse.price && (
                <div className="flex justify-between items-center mb-1">
                  <span className="text-boffin-background">Discounted Price:</span>
                  <span className="text-green-600 font-medium">Rs. {selectedCourse.discountPrice.toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseSelectionStep;
