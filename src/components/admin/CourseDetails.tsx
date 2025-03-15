import React from "react";

interface CourseDetailsProps {
  courseData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const CourseDetails: React.FC<CourseDetailsProps> = ({ courseData, handleInputChange }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Course Details</h3>
            <p className="mt-1 text-sm text-gray-500">
              Additional information about the course structure and format.
            </p>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700">
                  Target Audience
                </label>
                <textarea
                  id="targetAudience"
                  name="targetAudience"
                  rows={3}
                  value={courseData.targetAudience || ""}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="Who is this course designed for?"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="level" className="block text-sm font-medium text-gray-700">
                  Difficulty Level
                </label>
                <select
                  id="level"
                  name="level"
                  value={courseData.level || ""}
                  onChange={handleInputChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Select level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="all-levels">All Levels</option>
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="deliveryMode" className="block text-sm font-medium text-gray-700">
                  Delivery Mode
                </label>
                <select
                  id="deliveryMode"
                  name="deliveryMode"
                  value={courseData.deliveryMode || ""}
                  onChange={handleInputChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Select delivery mode</option>
                  <option value="online">Online</option>
                  <option value="in-person">In-Person</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="self-paced">Self-Paced</option>
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                  Language
                </label>
                <select
                  id="language"
                  name="language"
                  value={courseData.language || "English"}
                  onChange={handleInputChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Arabic">Arabic</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="durationWeeks" className="block text-sm font-medium text-gray-700">
                  Duration (Weeks)
                </label>
                <input
                  type="number"
                  name="durationWeeks"
                  id="durationWeeks"
                  min="0"
                  value={courseData.durationWeeks || 0}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="durationHours" className="block text-sm font-medium text-gray-700">
                  Duration (Hours)
                </label>
                <input
                  type="number"
                  name="durationHours"
                  id="durationHours"
                  min="0"
                  value={courseData.durationHours || 0}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              
              {/* Start Date */}
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  id="startDate"
                  value={courseData.startDate || ""}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              
              {/* End Date */}
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  id="endDate"
                  value={courseData.endDate || ""}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              
              {/* Schedule Details */}
              <div className="col-span-6">
                <label htmlFor="scheduleDetails" className="block text-sm font-medium text-gray-700">
                  Schedule Details
                </label>
                <textarea
                  id="scheduleDetails"
                  name="scheduleDetails"
                  rows={3}
                  value={courseData.scheduleDetails || ""}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="Detailed schedule information (days, times, etc.)"
                />
              </div>
              
              {/* Certification Included */}
              <div className="col-span-6 sm:col-span-3">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="certificationIncluded"
                      name="certificationIncluded"
                      type="checkbox"
                      checked={courseData.certificationIncluded || false}
                      onChange={(e) => {
                        handleInputChange({
                          target: {
                            name: e.target.name,
                            value: e.target.checked,
                          },
                        } as any);
                      }}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="certificationIncluded" className="font-medium text-gray-700">
                      Certification Included
                    </label>
                    <p className="text-gray-500">Check if this course includes a certification upon completion</p>
                  </div>
                </div>
              </div>
              
              {/* Certification Details */}
              {courseData.certificationIncluded && (
                <div className="col-span-6 sm:col-span-6">
                  <label htmlFor="certificationDetails" className="block text-sm font-medium text-gray-700">
                    Certification Details
                  </label>
                  <textarea
                    id="certificationDetails"
                    name="certificationDetails"
                    rows={3}
                    value={courseData.certificationDetails || ""}
                    onChange={handleInputChange}
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="Details about the certification offered"
                  />
                </div>
              )}
              
              {/* Curriculum PDF URL */}
              <div className="col-span-6">
                <label htmlFor="curriculumPdfUrl" className="block text-sm font-medium text-gray-700">
                  Curriculum PDF URL
                </label>
                <input
                  type="url"
                  name="curriculumPdfUrl"
                  id="curriculumPdfUrl"
                  value={courseData.curriculumPdfUrl || ""}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="https://example.com/curriculum.pdf"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* SEO and Metadata Section */}
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">SEO & Metadata</h3>
            <p className="mt-1 text-sm text-gray-500">
              Optimize your course for search engines.
            </p>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="grid grid-cols-6 gap-6">
              {/* Meta Title */}
              <div className="col-span-6">
                <label htmlFor="metaTitle" className="block text-sm font-medium text-gray-700">
                  Meta Title
                </label>
                <input
                  type="text"
                  name="metaTitle"
                  id="metaTitle"
                  value={courseData.metaTitle || ""}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="SEO optimized title (defaults to course title if empty)"
                />
              </div>
              
              {/* Meta Description */}
              <div className="col-span-6">
                <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700">
                  Meta Description
                </label>
                <textarea
                  id="metaDescription"
                  name="metaDescription"
                  rows={2}
                  value={courseData.metaDescription || ""}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="Brief description for search engines (150-160 characters recommended)"
                />
                <p className="mt-1 text-xs text-gray-500">
                  {(courseData.metaDescription?.length || 0)}/160 characters
                </p>
              </div>
              
              {/* Meta Keywords */}
              <div className="col-span-6">
                <label htmlFor="metaKeywords" className="block text-sm font-medium text-gray-700">
                  Meta Keywords
                </label>
                <input
                  type="text"
                  name="metaKeywords"
                  id="metaKeywords"
                  value={courseData.metaKeywords || ""}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="Comma-separated keywords"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
