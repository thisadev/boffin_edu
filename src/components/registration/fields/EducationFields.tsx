import { RegistrationFormData } from '../RegistrationForm';

interface EducationFieldsProps {
  formData: RegistrationFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export default function EducationFields({ formData, handleChange }: EducationFieldsProps) {
  const disciplines = [
    'APPLIED SCIENCES',
    'ARTIFICIAL INTELLIGENCE',
    'BUSINESS PROCESS MODELING',
    'COMPUTER SCIENCE',
    'DATA MINING',
    'DATA SCIENCES',
    'DESCRIPTIVE ANALYTICS',
    'DATA VISUALIZATION',
    'DATA WAREHOUSING',
    'DESCRIPTIVE STATISTICS',
    'ECONOMICS',
    'ENGINEERING',
    'ENTERPRISE DATA MANAGEMENT',
    'FINANCE',
    'INFERENTIAL STATISTICS',
    'INFORMATION TECHNOLOGY',
    'MACHINE LEARNING',
    'MANAGEMENT',
    'MATHEMATICS',
    'PREDICTIVE ANALYTICS',
    'PRESCRIPTIVE ANALYTICS',
    'SOCIAL SCIENCES',
    'STATISTICS',
    'TECHNOLOGY',
    'TIME SERIES',
    'OTHER DISCIPLINES'
  ];

  // Function to convert uppercase discipline to title case for display
  const formatDiscipline = (discipline: string) => {
    return discipline.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Education</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div>
          <label htmlFor="qualification" className="block text-gray-700 font-medium mb-2">Highest Qualification <span className="text-red-500">*</span></label>
          <select
            id="qualification"
            name="qualification"
            value={formData.qualification || formData.educationLevel}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Select qualification</option>
            <option value="Bachelor's Degree">Bachelor's Degree</option>
            <option value="Master's Degree">Master's Degree</option>
          </select>
        </div>
        <div>
          <label htmlFor="discipline" className="block text-gray-700 font-medium mb-2">Discipline <span className="text-red-500">*</span></label>
          <select
            id="discipline"
            name="discipline"
            value={formData.discipline}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Select discipline</option>
            {disciplines.map(discipline => (
              <option key={discipline} value={discipline}>{formatDiscipline(discipline)}</option>
            ))}
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
          <option value="Friend or Colleague">Friend or Colleague</option>
          <option value="Professional Network">Professional Network</option>
          <option value="Advertisement">Advertisement</option>
          <option value="Other">Other</option>
        </select>
      </div>
    </div>
  );
}
