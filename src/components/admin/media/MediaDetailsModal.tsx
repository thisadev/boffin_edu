"use client";

import { useState } from 'react';
import { MediaType } from '@prisma/client';
import { toast } from 'react-hot-toast';
import { FiX, FiImage, FiVideo, FiFile, FiMusic } from 'react-icons/fi';

interface MediaAsset {
  id: string;
  fileName: string;
  originalFileName: string;
  fileSize: number;
  mediaType: MediaType;
  mimeType: string;
  publicUrl: string;
  storagePath: string;
  title: string | null;
  description: string | null;
  altText: string | null;
  width: number | null;
  height: number | null;
  duration: number | null;
  createdAt: string;
  uploadedBy: {
    id: number;
    firstName: string;
    lastName: string;
  };
  placeholders: Array<{
    placeholder: {
      id: number;
      name: string;
      placeholderType: string;
    };
  }>;
}

interface MediaDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  mediaAsset: MediaAsset;
  onUpdate: () => void;
}

export default function MediaDetailsModal({ isOpen, onClose, mediaAsset, onUpdate }: MediaDetailsModalProps) {
  const [title, setTitle] = useState(mediaAsset.title || '');
  const [description, setDescription] = useState(mediaAsset.description || '');
  const [altText, setAltText] = useState(mediaAsset.altText || '');
  const [saving, setSaving] = useState(false);

  if (!isOpen) return null;

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getMediaTypeIcon = (type: MediaType) => {
    switch (type) {
      case 'IMAGE':
        return <FiImage className="h-5 w-5" />;
      case 'VIDEO':
        return <FiVideo className="h-5 w-5" />;
      case 'AUDIO':
        return <FiMusic className="h-5 w-5" />;
      case 'DOCUMENT':
        return <FiFile className="h-5 w-5" />;
      default:
        return <FiFile className="h-5 w-5" />;
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(`/api/admin/media/${mediaAsset.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          altText,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update media asset');
      }

      toast.success('Media asset updated successfully');
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error updating media asset:', error);
      toast.error('Failed to update media asset');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Media Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
          <div>
            <div className="bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center h-64">
              {mediaAsset.mediaType === 'IMAGE' ? (
                <img
                  src={mediaAsset.publicUrl}
                  alt={mediaAsset.altText || mediaAsset.fileName}
                  className="max-w-full max-h-full object-contain"
                />
              ) : mediaAsset.mediaType === 'VIDEO' ? (
                <video
                  src={mediaAsset.publicUrl}
                  controls
                  className="max-w-full max-h-full"
                />
              ) : mediaAsset.mediaType === 'AUDIO' ? (
                <audio
                  src={mediaAsset.publicUrl}
                  controls
                  className="w-full"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full w-full">
                  {getMediaTypeIcon(mediaAsset.mediaType)}
                  <span className="mt-2 text-sm text-gray-500">{mediaAsset.originalFileName.split('.').pop()?.toUpperCase()}</span>
                </div>
              )}
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <h3 className="text-sm font-medium text-gray-500">File Information</h3>
                <ul className="mt-2 text-sm text-gray-600 space-y-1">
                  <li><span className="font-medium">Original Filename:</span> {mediaAsset.originalFileName}</li>
                  <li><span className="font-medium">File Size:</span> {formatFileSize(mediaAsset.fileSize)}</li>
                  <li><span className="font-medium">MIME Type:</span> {mediaAsset.mimeType}</li>
                  {mediaAsset.width && mediaAsset.height && (
                    <li><span className="font-medium">Dimensions:</span> {mediaAsset.width} × {mediaAsset.height} px</li>
                  )}
                  {mediaAsset.duration && (
                    <li><span className="font-medium">Duration:</span> {Math.floor(mediaAsset.duration / 60)}:{(mediaAsset.duration % 60).toString().padStart(2, '0')}</li>
                  )}
                  <li><span className="font-medium">Uploaded:</span> {formatDate(mediaAsset.createdAt)}</li>
                  <li><span className="font-medium">Uploaded By:</span> {mediaAsset.uploadedBy.firstName} {mediaAsset.uploadedBy.lastName}</li>
                </ul>
              </div>

              {mediaAsset.placeholders.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Used In Placeholders</h3>
                  <ul className="mt-2 text-sm text-gray-600 space-y-1">
                    {mediaAsset.placeholders.map((item) => (
                      <li key={item.placeholder.id}>{item.placeholder.name} ({item.placeholder.placeholderType})</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter a title for this media"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter a description"
                rows={5}
              />
            </div>

            {mediaAsset.mediaType === 'IMAGE' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
                <input
                  type="text"
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Describe the image for accessibility"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Public URL</label>
              <div className="flex">
                <input
                  type="text"
                  value={mediaAsset.publicUrl}
                  readOnly
                  className="w-full border border-gray-300 rounded-l-md px-3 py-2 bg-gray-50"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(mediaAsset.publicUrl)
                      .then(() => toast.success('URL copied to clipboard'))
                      .catch(() => toast.error('Failed to copy URL'));
                  }}
                  className="bg-gray-200 text-gray-700 px-3 py-2 rounded-r-md hover:bg-gray-300 focus:outline-none"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end p-4 border-t bg-gray-50">
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
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
                <span>Save Changes</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
