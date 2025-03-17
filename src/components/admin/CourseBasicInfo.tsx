import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import MediaSelector from "./media/MediaSelector";

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
  const [isMediaSelectorOpen, setIsMediaSelectorOpen] = useState(false);

  // Function to handle setting an image as the featured image
  const setAsFeaturedImage = (url: string) => {
    const event = {
      target: {
        name: "featuredImageUrl",
        value: url,
      },
    } as React.ChangeEvent<HTMLInputElement>;
    handleInputChange(event);
  };

  // Function to add an image to the gallery
  const addToGallery = (url: string) => {
    // Check if the image is already in the gallery to avoid duplicates
    if (!(courseData.galleryImages || []).includes(url)) {
      const newGalleryImages = [...(courseData.galleryImages || []), url];
      // Update the course data with the new gallery images
      const event = {
        target: {
          name: "galleryImages",
          value: newGalleryImages,
        },
      } as any;
      handleInputChange(event);
    }
  };

  // Function to handle media selection from the MediaSelector
  const handleMediaSelect = (url: string) => {
    // If there's no featured image yet, set this as the featured image
    if (!courseData.featuredImageUrl) {
      setAsFeaturedImage(url);
    }
    // Add to gallery
    addToGallery(url);
  };

  // Function to remove an image from the gallery
  const removeFromGallery = (index: number) => {
    const newGalleryImages = [...(courseData.galleryImages || [])];
    const removedUrl = newGalleryImages[index];
    newGalleryImages.splice(index, 1);
    
    // Update the gallery
    const galleryEvent = {
      target: {
        name: "galleryImages",
        value: newGalleryImages,
      },
    } as any;
    handleInputChange(galleryEvent);
    
    // If the removed image was the featured image, clear the featured image or set a new one
    if (removedUrl === courseData.featuredImageUrl) {
      const featuredEvent = {
        target: {
          name: "featuredImageUrl",
          value: newGalleryImages.length > 0 ? newGalleryImages[0] : "",
        },
      } as React.ChangeEvent<HTMLInputElement>;
      handleInputChange(featuredEvent);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-md px-4 py-5 sm:p-6 border border-gray-100">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Basic Information</h3>
            <p className="mt-1 text-sm text-gray-600">
              This information will be displayed publicly on the course page.
            </p>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Course Title*
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={courseData.title || ""}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                  placeholder="e.g. Introduction to Data Science"
                  required
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
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
                    className="flex-1 focus:ring-blue-500 focus:border-blue-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border border-gray-300 text-gray-900 bg-white py-2 px-3"
                    placeholder="e.g. intro-to-data-science"
                    required
                  />
                </div>
                <p className="mt-1 text-xs text-gray-600">
                  Use lowercase letters, numbers, and hyphens only. No spaces or special characters.
                </p>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">
                  Category*
                </label>
                <select
                  id="categoryId"
                  name="categoryId"
                  value={courseData.categoryId || ""}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                  required
                >
                  <option value="" className="text-gray-900 bg-white">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id} className="text-gray-900 bg-white">
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={courseData.status || "draft"}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                >
                  <option value="draft" className="text-gray-900 bg-white">Draft</option>
                  <option value="published" className="text-gray-900 bg-white">Published</option>
                  <option value="archived" className="text-gray-900 bg-white">Archived</option>
                </select>
              </div>

              <div className="col-span-6">
                <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  Short Description*
                </label>
                <textarea
                  id="shortDescription"
                  name="shortDescription"
                  rows={3}
                  value={courseData.shortDescription || ""}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md text-gray-900 bg-white py-2 px-3"
                  placeholder="A brief summary of the course (displayed in listings)"
                  required
                />
                <p className="mt-1 text-xs text-gray-600">Maximum 500 characters</p>
              </div>

              <div className="col-span-6">
                <label htmlFor="longDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  Long Description*
                </label>
                <textarea
                  id="longDescription"
                  name="longDescription"
                  rows={6}
                  value={courseData.longDescription || ""}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md text-gray-900 bg-white py-2 px-3"
                  placeholder="Detailed description of the course (displayed on course page)"
                  required
                />
              </div>

              <div className="col-span-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Course Images</label>
                </div>
                
                {/* Featured Image Section */}
                {courseData.featuredImageUrl && (
                  <div className="mb-4 border rounded-md overflow-hidden bg-white shadow-sm">
                    <div className="relative">
                      <img 
                        src={courseData.featuredImageUrl} 
                        alt="Featured Image" 
                        className="w-full h-48 object-cover" 
                      />
                      <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-md font-medium">
                        Featured Image
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Gallery Images Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  {(courseData.galleryImages || []).map((imageUrl: string, index: number) => {
                    // Skip the featured image in the gallery grid to avoid duplication
                    if (imageUrl === courseData.featuredImageUrl) return null;
                    
                    return (
                      <div key={index} className="border rounded-md overflow-hidden bg-white shadow-sm">
                        <div className="relative h-32 bg-gray-100">
                          <img 
                            src={imageUrl} 
                            alt={`Gallery Image ${index + 1}`} 
                            className="w-full h-full object-cover" 
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all flex items-center justify-center opacity-0 hover:opacity-100">
                            <Button
                              onClick={() => setAsFeaturedImage(imageUrl)}
                              size="sm"
                              variant="secondary"
                              className="mr-2"
                            >
                              Set as Featured
                            </Button>
                          </div>
                        </div>
                        <div className="p-2 flex justify-end items-center">
                          <button
                            type="button"
                            onClick={() => removeFromGallery(index)}
                            className="p-1 rounded-full text-red-600 hover:bg-red-50"
                            title="Remove image"
                          >
                            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  
                  {/* Add Image Button - Always visible */}
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-md h-32 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors shadow-sm"
                    onClick={() => setIsMediaSelectorOpen(true)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span className="mt-2 text-sm text-gray-500">Add Course Images</span>
                  </div>
                </div>
                
                {/* Helper text */}
                <p className="text-sm text-gray-600 mt-2">
                  Add images for your course. The featured image will be displayed prominently on course listings and the course page.
                  {!courseData.featuredImageUrl && courseData.galleryImages && courseData.galleryImages.length > 0 && (
                    <span className="text-amber-600 block mt-1">
                      No featured image selected. Hover over an image and click "Set as Featured" to select one.
                    </span>
                  )}
                </p>
                
                <MediaSelector
                  isOpen={isMediaSelectorOpen}
                  onClose={() => setIsMediaSelectorOpen(false)}
                  onSelect={handleMediaSelect}
                  mediaType="IMAGE"
                  title="Select Course Image"
                />
              </div>

              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Learning Outcomes</label>
                {(courseData.learningOutcomes || [""]).map((outcome: string, index: number) => (
                  <div key={index} className="flex mb-2">
                    <input
                      type="text"
                      value={outcome}
                      onChange={(e) => handleArrayInputChange("learningOutcomes", index, e.target.value)}
                      className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md text-gray-900 bg-white py-2 px-3"
                      placeholder={`Outcome ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveArrayItem("learningOutcomes", index)}
                      className="ml-2 inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      disabled={courseData.learningOutcomes.length <= 1}
                    >
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
                <Button onClick={() => handleAddArrayItem("learningOutcomes")}>Add Learning Outcome</Button>
              </div>

              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Prerequisites</label>
                {(courseData.prerequisites || [""]).map((prerequisite: string, index: number) => (
                  <div key={index} className="flex mb-2">
                    <input
                      type="text"
                      value={prerequisite}
                      onChange={(e) => handleArrayInputChange("prerequisites", index, e.target.value)}
                      className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md text-gray-900 bg-white py-2 px-3"
                      placeholder={`Prerequisite ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveArrayItem("prerequisites", index)}
                      className="ml-2 inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      disabled={courseData.prerequisites.length <= 1}
                    >
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
                <Button onClick={() => handleAddArrayItem("prerequisites")}>Add Prerequisite</Button>
              </div>

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
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md text-gray-900 bg-white py-2 px-3"
                  placeholder="Who is this course designed for?"
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
