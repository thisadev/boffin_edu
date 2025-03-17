import { RegistrationFormData } from '../RegistrationForm';

interface EmploymentFieldsProps {
  formData: RegistrationFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export default function EmploymentFields({ formData, handleChange }: EmploymentFieldsProps) {
  // Employment status options
  const employmentStatuses = [
    'Full Time',
    'Part Time',
    'On Contract',
    'Student/ No Experience',
    'Retired',
    'Currently not employed'
  ];

  // Years options (0-20+)
  const yearsOptions = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
    '11', '12', '13', '14', '15', '16', '17', '18', '19', '20 Years or more'
  ];

  // Months options (1-11)
  const monthsOptions = Array.from({ length: 11 }, (_, i) => String(i + 1));

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Employment</h3>
      
      <div className="mb-4">
        <label htmlFor="employmentStatus" className="block text-gray-700 font-medium mb-2">Employment Status <span className="text-red-500">*</span></label>
        <select
          id="employmentStatus"
          name="employmentStatus"
          value={formData.employmentStatus}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="">Select employment status</option>
          {employmentStatuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="employerName" className="block text-gray-700 font-medium mb-2">Employer Name</label>
        <input
          type="text"
          id="employerName"
          name="employerName"
          value={formData.employerName}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Total Work Experience <span className="text-red-500">*</span></label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="workExperienceYears" className="block text-gray-700 text-sm mb-1">Years</label>
            <select
              id="workExperienceYears"
              name="workExperienceYears"
              value={formData.workExperienceYears}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Select years</option>
              {yearsOptions.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="workExperienceMonths" className="block text-gray-700 text-sm mb-1">Months</label>
            <select
              id="workExperienceMonths"
              name="workExperienceMonths"
              value={formData.workExperienceMonths}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Select months</option>
              {monthsOptions.map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Total Work Experience in Programming Language <span className="text-red-500">*</span></label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="programmingExperienceYears" className="block text-gray-700 text-sm mb-1">Years</label>
            <select
              id="programmingExperienceYears"
              name="programmingExperienceYears"
              value={formData.programmingExperienceYears}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Select years</option>
              {yearsOptions.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="programmingExperienceMonths" className="block text-gray-700 text-sm mb-1">Months</label>
            <select
              id="programmingExperienceMonths"
              name="programmingExperienceMonths"
              value={formData.programmingExperienceMonths}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Select months</option>
              {monthsOptions.map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
