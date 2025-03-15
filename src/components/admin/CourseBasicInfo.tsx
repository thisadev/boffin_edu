import React from "react";

interface CourseBasicInfoProps {
  courseData: any;
  categories: any[];
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleArrayInputChange: (name: string, index: number, value: string) => void;
  handleAddArrayItem: (name: string) => void;
  handleRemoveArrayItem: (name: string, index: number) => void;
}

const CourseBasicInfo: React.FC<CourseBasicInfoProps> = ({
  courseData,
  categories,
  handleInputChange,
  handleArrayInputChange,
  handleAddArrayItem,
  handleRemoveArrayItem,
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Basic Information</h3>
            <p className="mt-1 text-sm text-gray-500">
              This information will be displayed publicly on the course page.
            </p>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Course Title*
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={courseData.title || ""}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                  Slug (URL-friendly version of title)*
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                    /courses/
                  </span>
                  <input
                    type="text"
                    name="slug"
                    id="slug"
                    value={courseData.slug || ""}
                    onChange={handleInputChange}
                    className="flex-1 focus:ring-blue-500 focus:border-blue-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                    placeholder="my-course-title"
                    required
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Use lowercase letters, numbers, and hyphens only. No spaces or special characters.
                </p>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">
                  Category*
                </label>
                <select
                  id="categoryId"
                  name="categoryId"
                  value={courseData.categoryId || ""}
                  onChange={handleInputChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={courseData.status || "draft"}
                  onChange={handleInputChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div className="col-span-6">
                <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700">
                  Short Description*
                </label>
                <textarea
                  id="shortDescription"
                  name="shortDescription"
                  rows={3}
                  value={courseData.shortDescription || ""}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="A brief summary of the course (displayed in listings)"
                  required
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="longDescription" className="block text-sm font-medium text-gray-700">
                  Long Description*
                </label>
                <textarea
                  id="longDescription"
                  name="longDescription"
                  rows={6}
                  value={courseData.longDescription || ""}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="Detailed description of the course (displayed on course page)"
                  required
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="featuredImageUrl" className="block text-sm font-medium text-gray-700">
                  Featured Image URL
                </label>
                <input
                  type="url"
                  name="featuredImageUrl"
                  id="featuredImageUrl"
                  value={courseData.featuredImageUrl || ""}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              {/* Gallery Images */}
              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Gallery Images</label>
                {(courseData.galleryImages || []).map((imageUrl: string, index: number) => (
                  <div key={index} className="flex mb-2">
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => handleArrayInputChange("galleryImages", index, e.target.value)}
                      className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder={`Image URL ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveArrayItem("galleryImages", index)}
                      className="ml-2 inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddArrayItem("galleryImages")}
                  className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add Gallery Image
                </button>
              </div>

              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Learning Outcomes</label>
                {(courseData.learningOutcomes || [""]).map((outcome: string, index: number) => (
                  <div key={index} className="flex mb-2">
                    <input
                      type="text"
                      value={outcome}
                      onChange={(e) => handleArrayInputChange("learningOutcomes", index, e.target.value)}
                      className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder={`Outcome ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveArrayItem("learningOutcomes", index)}
                      className="ml-2 inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddArrayItem("learningOutcomes")}
                  className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add Outcome
                </button>
              </div>

              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Prerequisites</label>
                {(courseData.prerequisites || [""]).map((prerequisite: string, index: number) => (
                  <div key={index} className="flex mb-2">
                    <input
                      type="text"
                      value={prerequisite}
                      onChange={(e) => handleArrayInputChange("prerequisites", index, e.target.value)}
                      className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder={`Prerequisite ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveArrayItem("prerequisites", index)}
                      className="ml-2 inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddArrayItem("prerequisites")}
                  className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add Prerequisite
                </button>
              </div>
              
              {/* Published At Date */}
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="publishedAt" className="block text-sm font-medium text-gray-700">
                  Published At
                </label>
                <input
                  type="datetime-local"
                  name="publishedAt"
                  id="publishedAt"
                  value={courseData.publishedAt || ""}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseBasicInfo;
