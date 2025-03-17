import React from 'react';

interface CategorySpecificFieldsProps {
  category: string;
  categoryFields: {[key: string]: string}[];
  handleCategoryFieldChange: (index: number, field: string, value: string) => void;
}

export default function CategorySpecificFields({ 
  category, 
  categoryFields,
  handleCategoryFieldChange 
}: CategorySpecificFieldsProps) {
  // Render fields based on the selected category
  switch (category) {
    case 'dasaca':
      return (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">DASACA™ Certification Requirements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label htmlFor="certificationLevel" className="block text-gray-700 font-medium mb-2">Desired Certification Level</label>
              <select
                id="certificationLevel"
                value={categoryFields[0]?.certificationLevel || ''}
                onChange={(e) => handleCategoryFieldChange(0, 'certificationLevel', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select Certification Level</option>
                <option value="foundation">Foundation</option>
                <option value="practitioner">Practitioner</option>
                <option value="expert">Expert</option>
              </select>
            </div>
            <div>
              <label htmlFor="preferredExamDate" className="block text-gray-700 font-medium mb-2">Preferred Exam Date</label>
              <input
                type="date"
                id="preferredExamDate"
                value={categoryFields[0]?.preferredExamDate || ''}
                onChange={(e) => handleCategoryFieldChange(0, 'preferredExamDate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="examVenue" className="block text-gray-700 font-medium mb-2">Preferred Exam Venue</label>
            <select
              id="examVenue"
              value={categoryFields[0]?.examVenue || ''}
              onChange={(e) => handleCategoryFieldChange(0, 'examVenue', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Select Exam Venue</option>
              <option value="colombo">Colombo</option>
              <option value="kandy">Kandy</option>
              <option value="galle">Galle</option>
              <option value="online">Online Proctored</option>
            </select>
          </div>
        </div>
      );
    case 'bootcamp':
      return (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Boot Camp Preferences</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label htmlFor="preferredStartDate" className="block text-gray-700 font-medium mb-2">Preferred Start Date</label>
              <input
                type="date"
                id="preferredStartDate"
                value={categoryFields[0]?.preferredStartDate || ''}
                onChange={(e) => handleCategoryFieldChange(0, 'preferredStartDate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="preferredSchedule" className="block text-gray-700 font-medium mb-2">Preferred Schedule</label>
              <select
                id="preferredSchedule"
                value={categoryFields[0]?.preferredSchedule || ''}
                onChange={(e) => handleCategoryFieldChange(0, 'preferredSchedule', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select Schedule</option>
                <option value="weekday-morning">Weekday Mornings</option>
                <option value="weekday-evening">Weekday Evenings</option>
                <option value="weekend">Weekends Only</option>
                <option value="intensive">Intensive (Full-time)</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="learningGoals" className="block text-gray-700 font-medium mb-2">Learning Goals</label>
            <textarea
              id="learningGoals"
              value={categoryFields[0]?.learningGoals || ''}
              onChange={(e) => handleCategoryFieldChange(0, 'learningGoals', e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="What specific skills or knowledge do you hope to gain from this boot camp?"
            ></textarea>
          </div>
        </div>
      );
    case 'corporate':
      return (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Corporate Training Details</h3>
          <div className="mb-4">
            <label htmlFor="companyName" className="block text-gray-700 font-medium mb-2">Company Name</label>
            <input
              type="text"
              id="companyName"
              value={categoryFields[0]?.companyName || ''}
              onChange={(e) => handleCategoryFieldChange(0, 'companyName', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="numberOfParticipants" className="block text-gray-700 font-medium mb-2">Number of Participants</label>
            <input
              type="number"
              id="numberOfParticipants"
              value={categoryFields[0]?.numberOfParticipants || ''}
              onChange={(e) => handleCategoryFieldChange(0, 'numberOfParticipants', e.target.value)}
              min="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="trainingObjectives" className="block text-gray-700 font-medium mb-2">Training Objectives</label>
            <textarea
              id="trainingObjectives"
              value={categoryFields[0]?.trainingObjectives || ''}
              onChange={(e) => handleCategoryFieldChange(0, 'trainingObjectives', e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="What are the key objectives your organization hopes to achieve through this training?"
            ></textarea>
          </div>
        </div>
      );
    default:
      return null;
  }
}
