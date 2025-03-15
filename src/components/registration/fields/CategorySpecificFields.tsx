import { RegistrationFormData } from '../RegistrationForm';

interface CategorySpecificFieldsProps {
  category: string;
  formData: RegistrationFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CategorySpecificFields({ 
  category, 
  formData, 
  handleChange,
  handleCheckboxChange 
}: CategorySpecificFieldsProps) {
  // Render fields based on the selected category
  switch (category) {
    case 'DASACA':
      return (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">DASACA™ Certification Requirements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label htmlFor="certificationLevel" className="block text-gray-700 font-medium mb-2">Desired Certification Level</label>
              <select
                id="certificationLevel"
                name="certificationLevel"
                value={formData.certificationLevel || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select certification level</option>
                <option value="Foundation">Foundation</option>
                <option value="Practitioner">Practitioner</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
            <div>
              <label htmlFor="priorExperience" className="block text-gray-700 font-medium mb-2">Prior Data Analytics Experience</label>
              <select
                id="priorExperience"
                name="priorExperience"
                value={formData.priorExperience || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select experience level</option>
                <option value="None">None</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="preExamMaterials"
                  checked={formData.preExamMaterials === 'yes'}
                  onChange={(e) => {
                    handleChange({
                      target: {
                        name: 'preExamMaterials',
                        value: e.target.checked ? 'yes' : 'no'
                      }
                    } as React.ChangeEvent<HTMLSelectElement>);
                  }}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <span className="ml-2 text-gray-700">I would like to receive pre-exam study materials</span>
              </label>
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="examVoucher"
                  checked={formData.examVoucher === 'yes'}
                  onChange={(e) => {
                    handleChange({
                      target: {
                        name: 'examVoucher',
                        value: e.target.checked ? 'yes' : 'no'
                      }
                    } as React.ChangeEvent<HTMLSelectElement>);
                  }}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <span className="ml-2 text-gray-700">Include exam voucher with registration</span>
              </label>
            </div>
          </div>
        </div>
      );
    
    case 'BootCamp':
      return (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Boot Camp Requirements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label htmlFor="programmingLanguages" className="block text-gray-700 font-medium mb-2">Programming Languages Known</label>
              <input
                type="text"
                id="programmingLanguages"
                name="programmingLanguages"
                value={formData.programmingLanguages || ''}
                onChange={handleChange}
                placeholder="e.g., Python, R, SQL"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="preferredSchedule" className="block text-gray-700 font-medium mb-2">Preferred Schedule</label>
              <select
                id="preferredSchedule"
                name="preferredSchedule"
                value={formData.preferredSchedule || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select schedule preference</option>
                <option value="Weekdays">Weekdays</option>
                <option value="Weekends">Weekends</option>
                <option value="Evenings">Evenings</option>
                <option value="Flexible">Flexible</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="projectIdeas" className="block text-gray-700 font-medium mb-2">Project Ideas or Interests</label>
            <textarea
              id="projectIdeas"
              name="projectIdeas"
              value={formData.projectIdeas || ''}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Share any project ideas or specific areas of interest"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="hasLaptop"
                  checked={formData.hasLaptop === 'yes'}
                  onChange={(e) => {
                    handleChange({
                      target: {
                        name: 'hasLaptop',
                        value: e.target.checked ? 'yes' : 'no'
                      }
                    } as React.ChangeEvent<HTMLSelectElement>);
                  }}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <span className="ml-2 text-gray-700">I will bring my own laptop</span>
              </label>
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="needsSoftwareHelp"
                  checked={formData.needsSoftwareHelp === 'yes'}
                  onChange={(e) => {
                    handleChange({
                      target: {
                        name: 'needsSoftwareHelp',
                        value: e.target.checked ? 'yes' : 'no'
                      }
                    } as React.ChangeEvent<HTMLSelectElement>);
                  }}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <span className="ml-2 text-gray-700">I need assistance with software installation</span>
              </label>
            </div>
          </div>
        </div>
      );
    
    case 'Corporate':
      return (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Corporate Training Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label htmlFor="companyName" className="block text-gray-700 font-medium mb-2">Company Name</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="jobTitle" className="block text-gray-700 font-medium mb-2">Job Title</label>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label htmlFor="teamSize" className="block text-gray-700 font-medium mb-2">Team Size (# of Participants)</label>
              <input
                type="number"
                id="teamSize"
                name="teamSize"
                value={formData.teamSize || ''}
                onChange={handleChange}
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="preferredLocation" className="block text-gray-700 font-medium mb-2">Preferred Training Location</label>
              <select
                id="preferredLocation"
                name="preferredLocation"
                value={formData.preferredLocation || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select location preference</option>
                <option value="On-site">On-site (at your company)</option>
                <option value="Boffin Institute">Boffin Institute Training Center</option>
                <option value="Virtual">Virtual/Online</option>
                <option value="Hybrid">Hybrid (combination)</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="departmentFocus" className="block text-gray-700 font-medium mb-2">Department/Team Focus</label>
            <input
              type="text"
              id="departmentFocus"
              name="departmentFocus"
              value={formData.departmentFocus || ''}
              onChange={handleChange}
              placeholder="e.g., Marketing, Finance, IT, etc."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="trainingObjectives" className="block text-gray-700 font-medium mb-2">Training Objectives</label>
            <textarea
              id="trainingObjectives"
              name="trainingObjectives"
              value={formData.trainingObjectives || ''}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Please describe your specific training goals and objectives"
            />
          </div>
        </div>
      );
    
    default:
      return null;
  }
}
