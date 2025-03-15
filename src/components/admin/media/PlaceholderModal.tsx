"use client";

import { useState } from 'react';
import { PlaceholderType } from '@prisma/client';
import { toast } from 'react-hot-toast';
import { FiX } from 'react-icons/fi';

interface Placeholder {
  id: number;
  name: string;
  description: string | null;
  placeholderType: PlaceholderType;
  context: string | null;
  contextId: string | null;
}

interface PlaceholderModalProps {
  isOpen: boolean;
  onClose: () => void;
  placeholder: Placeholder | null;
  isCreating: boolean;
  onSave: () => void;
}

export default function PlaceholderModal({ isOpen, onClose, placeholder, isCreating, onSave }: PlaceholderModalProps) {
  const [formData, setFormData] = useState({
    name: placeholder?.name || '',
    description: placeholder?.description || '',
    placeholderType: placeholder?.placeholderType || 'OTHER' as PlaceholderType,
    context: placeholder?.context || '',
    contextId: placeholder?.contextId || '',
  });
  const [saving, setSaving] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.placeholderType) {
      toast.error('Name and placeholder type are required');
      return;
    }

    setSaving(true);
    try {
      const url = isCreating 
        ? '/api/admin/media/placeholders' 
        : `/api/admin/media/placeholders/${placeholder?.id}`;
      
      const method = isCreating ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${isCreating ? 'create' : 'update'} placeholder`);
      }

      toast.success(`Placeholder ${isCreating ? 'created' : 'updated'} successfully`);
      onSave();
      onClose();
    } catch (error) {
      console.error(`Error ${isCreating ? 'creating' : 'updating'} placeholder:`, error);
      toast.error(`Failed to ${isCreating ? 'create' : 'update'} placeholder`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">
            {isCreating ? 'Create New Placeholder' : 'Edit Placeholder'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter placeholder name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
            <select
              name="placeholderType"
              value={formData.placeholderType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="LOGO">Logo</option>
              <option value="FAVICON">Favicon</option>
              <option value="FULL_LOGO">Full Logo</option>
              <option value="PARTNERSHIP_LOGO">Partnership Logo</option>
              <option value="ACCREDITATION_LOGO">Accreditation Logo</option>
              <option value="COURSE_LOGO">Course Logo</option>
              <option value="COURSE_IMAGE">Course Image</option>
              <option value="TESTIMONIAL_IMAGE">Testimonial Image</option>
              <option value="PROMO_VIDEO">Promotional Video</option>
              <option value="HERO_BACKGROUND">Hero Background</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter description"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Context</label>
              <input
                type="text"
                name="context"
                value={formData.context}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., course, page"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Context ID</label>
              <input
                type="text"
                name="contextId"
                value={formData.contextId}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., course-123"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end p-4 border-t bg-gray-50 space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving || !formData.name || !formData.placeholderType}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {saving ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Saving...</span>
              </>
            ) : (
              <span>{isCreating ? 'Create' : 'Update'} Placeholder</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
