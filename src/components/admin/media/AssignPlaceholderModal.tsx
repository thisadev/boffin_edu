"use client";

import { useState, useEffect } from 'react';
import { MediaType, PlaceholderType } from '@prisma/client';
import { toast } from 'react-hot-toast';
import { FiX, FiPlus } from 'react-icons/fi';

interface MediaAsset {
  id: string;
  fileName: string;
  originalFileName: string;
  mediaType: MediaType;
  publicUrl: string;
  title: string | null;
}

interface Placeholder {
  id: number;
  name: string;
  description: string | null;
  placeholderType: PlaceholderType;
  context: string | null;
  contextId: string | null;
  mediaAssets: Array<{
    mediaAsset: MediaAsset;
    isActive: boolean;
    orderIndex: number;
  }>;
}

interface AssignPlaceholderModalProps {
  isOpen: boolean;
  onClose: () => void;
  mediaAsset: MediaAsset;
  onAssign: () => void;
}

export default function AssignPlaceholderModal({ isOpen, onClose, mediaAsset, onAssign }: AssignPlaceholderModalProps) {
  const [placeholders, setPlaceholders] = useState<Placeholder[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlaceholderId, setSelectedPlaceholderId] = useState<number | ''>('');
  const [assignedPlaceholders, setAssignedPlaceholders] = useState<Placeholder[]>([]);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newPlaceholder, setNewPlaceholder] = useState({
    name: '',
    description: '',
    placeholderType: 'OTHER' as PlaceholderType,
    context: '',
    contextId: '',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchPlaceholders();
    }
  }, [isOpen]);

  const fetchPlaceholders = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/media/placeholders');
      if (!response.ok) {
        throw new Error('Failed to fetch placeholders');
      }

      const data = await response.json();
      setPlaceholders(data.placeholders);

      // Identify already assigned placeholders
      const assigned = data.placeholders.filter((p: Placeholder) =>
        p.mediaAssets.some(a => a.mediaAsset.id === mediaAsset.id)
      );
      setAssignedPlaceholders(assigned);
    } catch (error) {
      console.error('Error fetching placeholders:', error);
      toast.error('Failed to load placeholders');
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async () => {
    if (!selectedPlaceholderId) {
      toast.error('Please select a placeholder');
      return;
    }

    setSaving(true);
    try {
      const response = await fetch('/api/admin/media/assignments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          placeholderId: selectedPlaceholderId,
          mediaAssetId: mediaAsset.id,
          isActive: true,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to assign media to placeholder');
      }

      toast.success('Media assigned to placeholder successfully');
      setSelectedPlaceholderId('');
      fetchPlaceholders();
      onAssign();
    } catch (error) {
      console.error('Error assigning media to placeholder:', error);
      toast.error('Failed to assign media to placeholder');
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveAssignment = async (placeholderId: number) => {
    setSaving(true);
    try {
      const url = new URL('/api/admin/media/assignments', window.location.origin);
      url.searchParams.append('placeholderId', placeholderId.toString());
      url.searchParams.append('mediaAssetId', mediaAsset.id);

      const response = await fetch(url.toString(), {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to remove assignment');
      }

      toast.success('Assignment removed successfully');
      fetchPlaceholders();
      onAssign();
    } catch (error) {
      console.error('Error removing assignment:', error);
      toast.error('Failed to remove assignment');
    } finally {
      setSaving(false);
    }
  };

  const handleCreatePlaceholder = async () => {
    if (!newPlaceholder.name || !newPlaceholder.placeholderType) {
      toast.error('Name and placeholder type are required');
      return;
    }

    setSaving(true);
    try {
      const response = await fetch('/api/admin/media/placeholders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPlaceholder),
      });

      if (!response.ok) {
        throw new Error('Failed to create placeholder');
      }

      const data = await response.json();
      toast.success('Placeholder created successfully');
      
      // Reset form and refresh placeholders
      setNewPlaceholder({
        name: '',
        description: '',
        placeholderType: 'OTHER',
        context: '',
        contextId: '',
      });
      setIsCreatingNew(false);
      fetchPlaceholders();
      
      // Auto-select the newly created placeholder
      setSelectedPlaceholderId(data.placeholder.id);
    } catch (error) {
      console.error('Error creating placeholder:', error);
      toast.error('Failed to create placeholder');
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Assign to Placeholder</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
          <div className="mb-6 flex items-center space-x-4">
            <div className="bg-gray-100 rounded-lg overflow-hidden h-16 w-16 flex-shrink-0">
              {mediaAsset.mediaType === 'IMAGE' ? (
                <img
                  src={mediaAsset.publicUrl}
                  alt={mediaAsset.title || mediaAsset.fileName}
                  className="h-full w-full object-cover"
                />
              ) : mediaAsset.mediaType === 'VIDEO' ? (
                <video
                  src={mediaAsset.publicUrl}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full w-full bg-gray-200">
                  <span className="text-xs text-gray-500">{mediaAsset.fileName.split('.').pop()?.toUpperCase()}</span>
                </div>
              )}
            </div>
            <div>
              <h3 className="font-medium">{mediaAsset.title || mediaAsset.originalFileName}</h3>
              <p className="text-sm text-gray-500">{mediaAsset.mediaType}</p>
            </div>
          </div>

          {assignedPlaceholders.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Currently Assigned To</h3>
              <ul className="space-y-2">
                {assignedPlaceholders.map((placeholder) => (
                  <li key={placeholder.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md border border-gray-200">
                    <div>
                      <span className="font-medium">{placeholder.name}</span>
                      <span className="ml-2 text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                        {placeholder.placeholderType}
                      </span>
                      {placeholder.description && (
                        <p className="text-sm text-gray-500 mt-1">{placeholder.description}</p>
                      )}
                    </div>
                    <button
                      onClick={() => handleRemoveAssignment(placeholder.id)}
                      disabled={saving}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {isCreatingNew ? (
            <div className="border rounded-md p-4 mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Create New Placeholder</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    value={newPlaceholder.name}
                    onChange={(e) => setNewPlaceholder({ ...newPlaceholder, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter placeholder name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                  <select
                    value={newPlaceholder.placeholderType}
                    onChange={(e) => setNewPlaceholder({ ...newPlaceholder, placeholderType: e.target.value as PlaceholderType })}
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
                    value={newPlaceholder.description}
                    onChange={(e) => setNewPlaceholder({ ...newPlaceholder, description: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter description"
                    rows={2}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Context</label>
                    <input
                      type="text"
                      value={newPlaceholder.context}
                      onChange={(e) => setNewPlaceholder({ ...newPlaceholder, context: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., course, page"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Context ID</label>
                    <input
                      type="text"
                      value={newPlaceholder.contextId}
                      onChange={(e) => setNewPlaceholder({ ...newPlaceholder, contextId: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., course-123"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-4">
                  <button
                    onClick={() => setIsCreatingNew(false)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreatePlaceholder}
                    disabled={saving || !newPlaceholder.name || !newPlaceholder.placeholderType}
                    className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {saving ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Creating...</span>
                      </>
                    ) : (
                      <span>Create Placeholder</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-700">Assign to Existing Placeholder</h3>
                <button
                  onClick={() => setIsCreatingNew(true)}
                  className="text-sm text-green-600 hover:text-green-700 flex items-center space-x-1"
                >
                  <FiPlus className="h-4 w-4" />
                  <span>Create New</span>
                </button>
              </div>

              {loading ? (
                <div className="flex justify-center items-center h-24">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-green-500"></div>
                </div>
              ) : placeholders.length === 0 ? (
                <div className="text-center py-6 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-gray-500">No placeholders found</p>
                  <p className="text-sm text-gray-400 mt-1">Create a new placeholder to assign this media</p>
                </div>
              ) : (
                <div>
                  <select
                    value={selectedPlaceholderId}
                    onChange={(e) => setSelectedPlaceholderId(e.target.value === '' ? '' : parseInt(e.target.value))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select a placeholder</option>
                    {placeholders
                      .filter(p => !assignedPlaceholders.some(ap => ap.id === p.id))
                      .map((placeholder) => (
                        <option key={placeholder.id} value={placeholder.id}>
                          {placeholder.name} ({placeholder.placeholderType})
                        </option>
                      ))}
                  </select>

                  <button
                    onClick={handleAssign}
                    disabled={saving || !selectedPlaceholderId}
                    className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {saving ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Assigning...</span>
                      </>
                    ) : (
                      <span>Assign to Placeholder</span>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-end p-4 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
