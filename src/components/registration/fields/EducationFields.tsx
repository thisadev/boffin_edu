import { RegistrationFormData } from '../RegistrationForm';

interface EducationFieldsProps {
  formData: RegistrationFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export default function EducationFields({ formData, handleChange }: EducationFieldsProps) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Education & Background</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div>
          <label htmlFor="educationLevel" className="block text-gray-700 font-medium mb-2">Highest Education Level</label>
          <select
            id="educationLevel"
            name="educationLevel"
            value={formData.educationLevel}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Select education level</option>
            <option value="High School">High School</option>
            <option value="Associate's Degree">Associate's Degree</option>
            <option value="Bachelor's Degree">Bachelor's Degree</option>
            <option value="Master's Degree">Master's Degree</option>
            <option value="Doctorate">Doctorate</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="workExperience" className="block text-gray-700 font-medium mb-2">Work Experience</label>
          <select
            id="workExperience"
            name="workExperience"
            value={formData.workExperience}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Select work experience</option>
            <option value="Student">Student</option>
            <option value="0-2 years">0-2 years</option>
            <option value="3-5 years">3-5 years</option>
            <option value="6-10 years">6-10 years</option>
            <option value="10+ years">10+ years</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="hearAboutUs" className="block text-gray-700 font-medium mb-2">How did you hear about us?</label>
        <select
          id="hearAboutUs"
          name="hearAboutUs"
          value={formData.hearAboutUs}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="">Select an option</option>
          <option value="Search Engine">Search Engine</option>
          <option value="Social Media">Social Media</option>
          <option value="Friend/Colleague">Friend/Colleague</option>
          <option value="Email">Email</option>
          <option value="Advertisement">Advertisement</option>
          <option value="Other">Other</option>
        </select>
      </div>
    </div>
  );
}
