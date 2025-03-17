import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import MediaSelector from "./media/MediaSelector";

interface CourseDetailsProps {
  courseData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleArrayInputChange?: (name: string, index: number, value: string) => void;
  handleAddArrayItem?: (name: string) => void;
  handleRemoveArrayItem?: (name: string, index: number) => void;
}

const CourseDetails: React.FC<CourseDetailsProps> = ({ 
  courseData, 
  handleInputChange,
  handleArrayInputChange,
  handleAddArrayItem,
  handleRemoveArrayItem 
}) => {
  const [isPdfSelectorOpen, setIsPdfSelectorOpen] = useState(false);

  const handlePdfSelect = (url: string) => {
    const event = {
      target: {
        name: "curriculumPdfUrl",
        value: url,
      },
    } as React.ChangeEvent<HTMLInputElement>;
    handleInputChange(event);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-md px-4 py-5 sm:p-6 border border-gray-100">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Course Details</h3>
            <p className="mt-1 text-sm text-gray-600">
              Additional information about the course structure and format.
            </p>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700 mb-1">
                  Target Audience
                </label>
                <textarea
                  id="targetAudience"
                  name="targetAudience"
                  rows={3}
                  value={courseData.targetAudience || ""}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                  placeholder="Who is this course designed for?"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">
                  Difficulty Level
                </label>
                <select
                  id="level"
                  name="level"
                  value={courseData.level || ""}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                >
                  <option value="" className="text-gray-900 bg-white">Select level</option>
                  <option value="beginner" className="text-gray-900 bg-white">Beginner</option>
                  <option value="intermediate" className="text-gray-900 bg-white">Intermediate</option>
                  <option value="advanced" className="text-gray-900 bg-white">Advanced</option>
                  <option value="all-levels" className="text-gray-900 bg-white">All Levels</option>
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="deliveryMode" className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Mode
                </label>
                <select
                  id="deliveryMode"
                  name="deliveryMode"
                  value={courseData.deliveryMode || ""}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                >
                  <option value="" className="text-gray-900 bg-white">Select delivery mode</option>
                  <option value="online" className="text-gray-900 bg-white">Online</option>
                  <option value="in-person" className="text-gray-900 bg-white">In-Person</option>
                  <option value="hybrid" className="text-gray-900 bg-white">Hybrid</option>
                  <option value="self-paced" className="text-gray-900 bg-white">Self-Paced</option>
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                  Language
                </label>
                <select
                  id="language"
                  name="language"
                  value={courseData.language || "English"}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                >
                  <option value="English" className="text-gray-900 bg-white">English</option>
                  <option value="Spanish" className="text-gray-900 bg-white">Spanish</option>
                  <option value="French" className="text-gray-900 bg-white">French</option>
                  <option value="German" className="text-gray-900 bg-white">German</option>
                  <option value="Chinese" className="text-gray-900 bg-white">Chinese</option>
                  <option value="Japanese" className="text-gray-900 bg-white">Japanese</option>
                  <option value="Arabic" className="text-gray-900 bg-white">Arabic</option>
                  <option value="Other" className="text-gray-900 bg-white">Other</option>
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="durationWeeks" className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (Weeks)
                </label>
                <input
                  type="number"
                  name="durationWeeks"
                  id="durationWeeks"
                  min="0"
                  value={courseData.durationWeeks || 0}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="durationHours" className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (Hours)
                </label>
                <input
                  type="number"
                  name="durationHours"
                  id="durationHours"
                  min="0"
                  value={courseData.durationHours || 0}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              
              {/* Start Date */}
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  id="startDate"
                  value={courseData.startDate || ""}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              
              {/* End Date */}
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  id="endDate"
                  value={courseData.endDate || ""}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              
              {/* Schedule Details */}
              <div className="col-span-6">
                <label htmlFor="scheduleDetails" className="block text-sm font-medium text-gray-700 mb-1">
                  Schedule Details
                </label>
                <textarea
                  id="scheduleDetails"
                  name="scheduleDetails"
                  rows={3}
                  value={courseData.scheduleDetails || ""}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
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
                    <p className="text-gray-600">Check if this course includes a certification upon completion</p>
                  </div>
                </div>
              </div>
              
              {/* Certification Details */}
              {courseData.certificationIncluded && (
                <div className="col-span-6 sm:col-span-6">
                  <label htmlFor="certificationDetails" className="block text-sm font-medium text-gray-700 mb-1">
                    Certification Details
                  </label>
                  <textarea
                    id="certificationDetails"
                    name="certificationDetails"
                    rows={3}
                    value={courseData.certificationDetails || ""}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                    placeholder="Details about the certification offered"
                  />
                </div>
              )}
              
              {/* Curriculum PDF */}
              <div className="col-span-6">
                <label htmlFor="curriculumPdfUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  Curriculum PDF
                </label>
                <div className="flex items-center mt-1">
                  <input
                    type="url"
                    name="curriculumPdfUrl"
                    id="curriculumPdfUrl"
                    value={courseData.curriculumPdfUrl || ""}
                    onChange={handleInputChange}
                    className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-1 sm:text-sm"
                    placeholder="https://example.com/curriculum.pdf"
                    readOnly
                  />
                  <Button
                    type="button"
                    onClick={() => setIsPdfSelectorOpen(true)}
                    className="ml-2 whitespace-nowrap"
                    variant="outline"
                  >
                    Select PDF
                  </Button>
                </div>
                {courseData.curriculumPdfUrl && (
                  <div className="mt-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <a href={courseData.curriculumPdfUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                      View PDF
                    </a>
                  </div>
                )}
                <MediaSelector
                  isOpen={isPdfSelectorOpen}
                  onClose={() => setIsPdfSelectorOpen(false)}
                  onSelect={handlePdfSelect}
                  mediaType="DOCUMENT"
                  title="Select Curriculum PDF"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* SEO and Metadata Section */}
      <div className="bg-white shadow-sm rounded-md px-4 py-5 sm:p-6 border border-gray-100">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">SEO & Metadata</h3>
            <p className="mt-1 text-sm text-gray-600">
              Optimize your course for search engines.
            </p>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="grid grid-cols-6 gap-6">
              {/* Meta Title */}
              <div className="col-span-6">
                <label htmlFor="metaTitle" className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Title
                </label>
                <input
                  type="text"
                  name="metaTitle"
                  id="metaTitle"
                  value={courseData.metaTitle || ""}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                  placeholder="SEO optimized title (defaults to course title if empty)"
                />
              </div>
              
              {/* Meta Description */}
              <div className="col-span-6">
                <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Description
                </label>
                <textarea
                  id="metaDescription"
                  name="metaDescription"
                  rows={2}
                  value={courseData.metaDescription || ""}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                  placeholder="Brief description for search engines (150-160 characters recommended)"
                />
                <p className="mt-1 text-xs text-gray-600">
                  {(courseData.metaDescription?.length || 0)}/160 characters
                </p>
              </div>
              
              {/* Meta Keywords */}
              <div className="col-span-6">
                <label htmlFor="metaKeywords" className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Keywords
                </label>
                <input
                  type="text"
                  name="metaKeywords"
                  id="metaKeywords"
                  value={courseData.metaKeywords || ""}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
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
