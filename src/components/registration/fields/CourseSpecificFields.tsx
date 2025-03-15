import { RegistrationFormData } from '../RegistrationForm';
import { Course } from '@/data/courses';

interface CourseSpecificFieldsProps {
  course: Course;
  formData: RegistrationFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CourseSpecificFields({ 
  course, 
  formData, 
  handleChange,
  handleCheckboxChange 
}: CourseSpecificFieldsProps) {
  // Render fields based on the selected course
  // This is where we can add course-specific fields beyond the category-specific ones
  
  // For now, we'll just have a few examples based on course level
  switch (course.level) {
    case 'Advanced':
      return (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Advanced Course Requirements</h3>
          <div className="mb-4">
            <label htmlFor="advancedPrerequisites" className="block text-gray-700 font-medium mb-2">Previous Courses or Experience</label>
            <textarea
              id="advancedPrerequisites"
              name="advancedPrerequisites"
              value={formData.advancedPrerequisites || ''}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Please describe your previous courses or experience relevant to this advanced course"
            />
          </div>
        </div>
      );
    
    case 'Beginner':
      return (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Beginner Course Information</h3>
          <div className="mb-4">
            <label htmlFor="learningGoals" className="block text-gray-700 font-medium mb-2">Learning Goals</label>
            <textarea
              id="learningGoals"
              name="learningGoals"
              value={formData.learningGoals || ''}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="What do you hope to achieve by taking this course?"
            />
          </div>
        </div>
      );
    
    default:
      // For intermediate or all levels courses, no additional fields
      return null;
  }
}
