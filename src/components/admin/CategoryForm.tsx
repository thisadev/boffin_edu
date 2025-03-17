"use client";

import { useState, useEffect } from "react";
import MediaSelector from "./media/MediaSelector";
import { Button } from "@/components/ui/button";

interface Category {
  id: number;
  name: string;
  description: string | null;
  slug: string;
  imageUrl: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  courseCount?: number;
}

interface CategoryFormProps {
  category: Category | null;
  onSubmit: (data: Partial<Category>) => void;
  onCancel: () => void;
}

export default function CategoryForm({ category, onSubmit, onCancel }: CategoryFormProps) {
  const [formData, setFormData] = useState<Partial<Category>>({
    name: "",
    description: "",
    slug: "",
    imageUrl: "",
    isActive: true,
    createdAt: "",
    updatedAt: "",
    courseCount: 0,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isGeneratingSlug, setIsGeneratingSlug] = useState(!category?.slug);
  const [isMediaSelectorOpen, setIsMediaSelectorOpen] = useState(false);

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || "",
        description: category.description || "",
        slug: category.slug || "",
        imageUrl: category.imageUrl || "",
        isActive: category.isActive,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
        courseCount: category.courseCount || 0,
      });
      setIsGeneratingSlug(false);
    }
  }, [category]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Handle checkbox inputs
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
    
    // Auto-generate slug from name if enabled
    if (name === "name" && isGeneratingSlug) {
      const slug = value
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const toggleSlugGeneration = () => {
    setIsGeneratingSlug(!isGeneratingSlug);
    if (!isGeneratingSlug) {
      // If enabling auto-generation, update slug based on current name
      const slug = formData.name
        ?.toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name?.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.slug?.trim()) {
      newErrors.slug = "Slug is required";
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = "Slug can only contain lowercase letters, numbers, and hyphens";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  // Function to handle media selection
  const handleMediaSelect = (url: string) => {
    setFormData({ ...formData, imageUrl: url });
    setIsMediaSelectorOpen(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-8">
      <h2 className="text-xl font-bold mb-6 text-gray-900">
        {category ? "Edit Category" : "Add New Category"}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Category Name*
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? "border-red-500" : "border-gray-300"} bg-white text-gray-900`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        
        {/* Status */}
        <div>
          <label htmlFor="isActive" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-gray-900">Active</span>
            </label>
          </div>
        </div>
      </div>
      
      {/* Slug */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
            Slug (URL-friendly version)*
          </label>
          <label className="inline-flex items-center text-sm">
            <input
              type="checkbox"
              checked={isGeneratingSlug}
              onChange={toggleSlugGeneration}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <span className="ml-2 text-gray-900">Auto-generate from name</span>
          </label>
        </div>
        <div className="flex rounded-md shadow-sm">
          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
            /categories/
          </span>
          <input
            type="text"
            id="slug"
            name="slug"
            value={formData.slug || ""}
            onChange={handleChange}
            disabled={isGeneratingSlug}
            className={`flex-1 px-4 py-2 border rounded-none rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.slug ? "border-red-500" : "border-gray-300"} ${isGeneratingSlug ? "bg-gray-100" : "bg-white"} text-gray-900`}
          />
        </div>
        {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug}</p>}
        <p className="mt-1 text-xs text-gray-500">
          Use lowercase letters, numbers, and hyphens only. No spaces or special characters.
        </p>
      </div>
      
      {/* Description */}
      <div className="mb-6">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
        ></textarea>
      </div>
      
      {/* Image Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category Image
        </label>
        
        {formData.imageUrl ? (
          <div className="mb-4">
            <div className="relative">
              <img 
                src={formData.imageUrl} 
                alt="Category preview" 
                className="h-40 w-auto object-cover rounded-md border border-gray-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Invalid+Image+URL';
                }} 
              />
              <button
                type="button"
                onClick={() => setFormData({ ...formData, imageUrl: "" })}
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 focus:outline-none"
                aria-label="Remove image"
              >
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <div 
            className="border-2 border-dashed border-gray-300 rounded-md h-40 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
            onClick={() => setIsMediaSelectorOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="mt-2 text-sm text-gray-500">Click to select an image</span>
          </div>
        )}
        
        <Button 
          type="button" 
          onClick={() => setIsMediaSelectorOpen(true)}
          className="mt-2 border-gray-300 text-gray-700 hover:bg-gray-50"
          variant="outline"
        >
          {formData.imageUrl ? "Change Image" : "Select Image"}
        </Button>
        
        <MediaSelector
          isOpen={isMediaSelectorOpen}
          onClose={() => setIsMediaSelectorOpen(false)}
          onSelect={handleMediaSelect}
          mediaType="IMAGE"
          title="Select Category Image"
        />
      </div>
      
      {/* Form Actions */}
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {category ? "Update Category" : "Create Category"}
        </button>
      </div>
    </form>
  );
}
