"use client";

import { useState, useEffect } from 'react';
// Define PlaceholderType locally to avoid import issues
type PlaceholderType = 'LOGO' | 'FAVICON' | 'FULL_LOGO' | 'PARTNERSHIP_LOGO' | 'ACCREDITATION_LOGO' | 'COURSE_LOGO' | 'COURSE_IMAGE' | 'TESTIMONIAL_IMAGE' | 'PROMO_VIDEO' | 'HERO_BACKGROUND' | 'OTHER';
import { toast } from 'react-hot-toast';
import { FiEdit2, FiTrash2, FiPlus, FiImage, FiVideo, FiFile, FiMusic } from 'react-icons/fi';
import PlaceholderModal from './PlaceholderModal';

interface MediaAsset {
  id: string;
  fileName: string;
  originalFileName: string;
  mediaType: string;
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
  createdAt: string;
  mediaAssets: Array<{
    mediaAsset: MediaAsset;
    isActive: boolean;
    orderIndex: number;
  }>;
}

interface PlaceholderManagerProps {
  refreshTrigger: number;
  onRefresh: () => void;
}

export default function PlaceholderManager({ refreshTrigger, onRefresh }: PlaceholderManagerProps) {
  const [placeholders, setPlaceholders] = useState<Placeholder[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlaceholder, setSelectedPlaceholder] = useState<Placeholder | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [filterType, setFilterType] = useState<PlaceholderType | 'ALL'>('ALL');

  useEffect(() => {
    fetchPlaceholders();
  }, [refreshTrigger]);

  const fetchPlaceholders = async () => {
    setLoading(true);
    try {
      const url = new URL('/api/admin/media/placeholders', window.location.origin);
      if (filterType !== 'ALL') {
        url.searchParams.append('placeholderType', filterType);
      }

      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error('Failed to fetch placeholders');
      }

      const data = await response.json();
      setPlaceholders(data.placeholders);
    } catch (error) {
      console.error('Error fetching placeholders:', error);
      toast.error('Failed to load placeholders');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePlaceholder = async (id: number) => {
    if (!confirm('Are you sure you want to delete this placeholder? This will remove all media assignments but will not delete the media assets themselves.')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/media/placeholders/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete placeholder');
      }

      toast.success('Placeholder deleted successfully');
      onRefresh();
    } catch (error) {
      console.error('Error deleting placeholder:', error);
      toast.error('Failed to delete placeholder');
    }
  };

  const handleEditPlaceholder = (placeholder: Placeholder) => {
    setSelectedPlaceholder(placeholder);
    setIsCreating(false);
    setIsModalOpen(true);
  };

  const handleCreatePlaceholder = () => {
    setSelectedPlaceholder(null);
    setIsCreating(true);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPlaceholder(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getMediaTypeIcon = (type: string) => {
    switch (type) {
      case 'IMAGE':
        return <FiImage className="h-4 w-4" />;
      case 'VIDEO':
        return <FiVideo className="h-4 w-4" />;
      case 'AUDIO':
        return <FiMusic className="h-4 w-4" />;
      case 'DOCUMENT':
        return <FiFile className="h-4 w-4" />;
      default:
        return <FiFile className="h-4 w-4" />;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as PlaceholderType | 'ALL')}
            className="border rounded-md px-3 py-2"
          >
            <option value="ALL">All Placeholder Types</option>
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
        <button
          onClick={handleCreatePlaceholder}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center space-x-2"
        >
          <FiPlus className="h-4 w-4" />
          <span>Create Placeholder</span>
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : placeholders.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-500 mb-4">No placeholders found</p>
          <p className="text-sm text-gray-400">
            {filterType !== 'ALL' ? 'Try selecting a different placeholder type or' : ''} create a new placeholder
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {placeholders.map((placeholder) => (
            <div key={placeholder.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg">{placeholder.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                        {placeholder.placeholderType}
                      </span>
                      {placeholder.context && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          {placeholder.context}{placeholder.contextId ? `:${placeholder.contextId}` : ''}
                        </span>
                      )}
                      <span className="text-xs text-gray-500">
                        Created {formatDate(placeholder.createdAt)}
                      </span>
                    </div>
                    {placeholder.description && (
                      <p className="text-sm text-gray-500 mt-2">{placeholder.description}</p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditPlaceholder(placeholder)}
                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
                      title="Edit"
                    >
                      <FiEdit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeletePlaceholder(placeholder.id)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full"
                      title="Delete"
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              {placeholder.mediaAssets.length > 0 ? (
                <div className="p-4 bg-gray-50">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Assigned Media</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {placeholder.mediaAssets
                      .filter(a => a.isActive)
                      .sort((a, b) => a.orderIndex - b.orderIndex)
                      .map((assignment) => (
                        <div key={assignment.mediaAsset.id} className="bg-white border border-gray-200 rounded overflow-hidden">
                          <div className="h-20 bg-gray-100 flex items-center justify-center relative">
                            {assignment.mediaAsset.mediaType === 'IMAGE' ? (
                              <img 
                                src={assignment.mediaAsset.publicUrl} 
                                alt={assignment.mediaAsset.title || assignment.mediaAsset.fileName} 
                                className="w-full h-full object-cover"
                              />
                            ) : assignment.mediaAsset.mediaType === 'VIDEO' ? (
                              <div className="flex items-center justify-center h-full w-full">
                                {getMediaTypeIcon(assignment.mediaAsset.mediaType)}
                              </div>
                            ) : (
                              <div className="flex items-center justify-center h-full w-full">
                                {getMediaTypeIcon(assignment.mediaAsset.mediaType)}
                              </div>
                            )}
                          </div>
                          <div className="p-2">
                            <p className="text-xs truncate">
                              {assignment.mediaAsset.title || assignment.mediaAsset.originalFileName}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-gray-50 text-center text-sm text-gray-500">
                  No media assigned to this placeholder
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <PlaceholderModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          placeholder={selectedPlaceholder}
          isCreating={isCreating}
          onSave={onRefresh}
        />
      )}
    </div>
  );
}
