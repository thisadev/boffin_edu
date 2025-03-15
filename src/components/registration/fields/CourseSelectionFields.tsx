import { RegistrationFormData } from '../RegistrationForm';
import { Course } from '@/data/courses';

interface CourseSelectionFieldsProps {
  formData: RegistrationFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  categories: { id: string; title: string }[];
  filteredCourses: Course[];
}

export default function CourseSelectionFields({ 
  formData, 
  handleChange, 
  categories,
  filteredCourses 
}: CourseSelectionFieldsProps) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Course Selection</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="category" className="block text-gray-700 font-medium mb-2">Course Category <span className="text-red-500">*</span></label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="courseId" className="block text-gray-700 font-medium mb-2">Course <span className="text-red-500">*</span></label>
          <select
            id="courseId"
            name="courseId"
            value={formData.courseId}
            onChange={handleChange}
            required
            disabled={!formData.category}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Select a course</option>
            {filteredCourses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
          {!formData.category && (
            <p className="text-sm text-gray-500 mt-1">Please select a category first</p>
          )}
        </div>
      </div>
    </div>
  );
}
