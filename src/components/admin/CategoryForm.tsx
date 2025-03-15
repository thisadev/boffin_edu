"use client";

import { useState, useEffect } from "react";

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

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-8">
      <h2 className="text-xl font-bold mb-6">
        {category ? "Edit Category" : "Add New Category"}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Category Name*
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        
        {/* Status */}
        <div>
          <label htmlFor="isActive" className="block text-gray-700 font-medium mb-2">
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
              <span className="ml-2">Active</span>
            </label>
          </div>
        </div>
      </div>
      
      {/* Slug */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="slug" className="block text-gray-700 font-medium">
            Slug (URL-friendly version)*
          </label>
          <label className="inline-flex items-center text-sm">
            <input
              type="checkbox"
              checked={isGeneratingSlug}
              onChange={toggleSlugGeneration}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <span className="ml-2">Auto-generate from name</span>
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
            className={`flex-1 px-4 py-2 border rounded-none rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.slug ? "border-red-500" : "border-gray-300"} ${isGeneratingSlug ? "bg-gray-100" : ""}`}
          />
        </div>
        {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug}</p>}
        <p className="mt-1 text-xs text-gray-500">
          Use lowercase letters, numbers, and hyphens only. No spaces or special characters.
        </p>
      </div>
      
      {/* Description */}
      <div className="mb-6">
        <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>
      
      {/* Image URL */}
      <div className="mb-6">
        <label htmlFor="imageUrl" className="block text-gray-700 font-medium mb-2">
          Image URL
        </label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl || ""}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {formData.imageUrl && (
          <div className="mt-2">
            <p className="text-sm text-gray-600 mb-1">Preview:</p>
            <img 
              src={formData.imageUrl} 
              alt="Category preview" 
              className="h-32 w-auto object-cover rounded-md border border-gray-300"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Invalid+Image+URL';
              }} 
            />
          </div>
        )}
      </div>
      
      {/* Created At */}
      <div className="mb-6">
        <label htmlFor="createdAt" className="block text-gray-700 font-medium mb-2">
          Created At
        </label>
        <input
          type="text"
          id="createdAt"
          name="createdAt"
          value={formData.createdAt || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      {/* Updated At */}
      <div className="mb-6">
        <label htmlFor="updatedAt" className="block text-gray-700 font-medium mb-2">
          Updated At
        </label>
        <input
          type="text"
          id="updatedAt"
          name="updatedAt"
          value={formData.updatedAt || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      {/* Course Count */}
      <div className="mb-6">
        <label htmlFor="courseCount" className="block text-gray-700 font-medium mb-2">
          Course Count
        </label>
        <input
          type="number"
          id="courseCount"
          name="courseCount"
          value={formData.courseCount || 0}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
