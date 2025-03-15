"use client";

import { useState, useEffect } from 'react';
// Define MediaType locally to avoid import issues
type MediaType = 'IMAGE' | 'VIDEO' | 'DOCUMENT' | 'AUDIO';
import { toast } from 'react-hot-toast';
import { FiImage, FiVideo, FiFile, FiMusic, FiEdit2, FiTrash2, FiInfo, FiLink } from 'react-icons/fi';
import MediaDetailsModal from './MediaDetailsModal';
import AssignPlaceholderModal from './AssignPlaceholderModal';

interface MediaAsset {
  id: string;
  fileName: string;
  originalFileName: string;
  fileSize: number;
  mediaType: MediaType;
  mimeType: string;
  publicUrl: string;
  title: string | null;
  description: string | null;
  altText: string | null;
  width: number | null;
  height: number | null;
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

interface MediaLibraryProps {
  mediaType?: MediaType;
  refreshTrigger: number;
  onRefresh: () => void;
}

export default function MediaLibrary({ mediaType, refreshTrigger, onRefresh }: MediaLibraryProps) {
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  useEffect(() => {
    fetchMediaAssets();
  }, [mediaType, page, refreshTrigger]);

  const fetchMediaAssets = async () => {
    setLoading(true);
    try {
      const url = new URL('/api/admin/media', window.location.origin);
      if (mediaType) url.searchParams.append('mediaType', mediaType);
      url.searchParams.append('page', page.toString());
      url.searchParams.append('limit', '20');

      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error('Failed to fetch media assets');
      }

      const data = await response.json();
      setMediaAssets(data.mediaAssets);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error('Error fetching media assets:', error);
      toast.error('Failed to load media assets');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAsset = async (id: string) => {
    if (!confirm('Are you sure you want to delete this media asset? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/media/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete media asset');
      }

      toast.success('Media asset deleted successfully');
      onRefresh();
    } catch (error) {
      console.error('Error deleting media asset:', error);
      toast.error('Failed to delete media asset');
    }
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

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleViewDetails = (asset: MediaAsset) => {
    setSelectedAsset(asset);
    setIsDetailsModalOpen(true);
  };

  const handleAssignPlaceholder = (asset: MediaAsset) => {
    setSelectedAsset(asset);
    setIsAssignModalOpen(true);
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
      .then(() => toast.success('URL copied to clipboard'))
      .catch(() => toast.error('Failed to copy URL'));
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : mediaAssets.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-500 mb-4">No media assets found</p>
          <p className="text-sm text-gray-400">
            {mediaType ? `Try selecting a different media type or` : ''} upload some media assets
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mediaAssets.map((asset) => (
            <div key={asset.id} className="bg-white rounded-lg shadow overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
              <div className="h-48 bg-gray-100 flex items-center justify-center relative">
                {asset.mediaType === 'IMAGE' ? (
                  <img 
                    src={asset.publicUrl} 
                    alt={asset.altText || asset.fileName} 
                    className="w-full h-full object-cover"
                  />
                ) : asset.mediaType === 'VIDEO' ? (
                  <video 
                    src={asset.publicUrl} 
                    className="w-full h-full object-cover"
                    controls
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full w-full bg-gray-100">
                    {getMediaTypeIcon(asset.mediaType)}
                    <span className="mt-2 text-sm text-gray-500">{asset.originalFileName.split('.').pop()?.toUpperCase()}</span>
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="font-medium text-gray-900 truncate">
                  {asset.title || asset.originalFileName}
                </h3>
                <p className="text-sm text-gray-500 mt-1 truncate">
                  {formatFileSize(asset.fileSize)} • {formatDate(asset.createdAt)}
                </p>
                
                <div className="flex mt-4 justify-between">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleViewDetails(asset)}
                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
                      title="View details"
                    >
                      <FiInfo className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleAssignPlaceholder(asset)}
                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
                      title="Assign to placeholder"
                    >
                      <FiLink className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleCopyUrl(asset.publicUrl)}
                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
                      title="Copy URL"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => handleDeleteAsset(asset.id)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full"
                      title="Delete"
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <nav className="flex items-center space-x-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 rounded border border-gray-300 text-sm disabled:opacity-50"
            >
              Previous
            </button>
            
            <div className="text-sm text-gray-700">
              Page {page} of {totalPages}
            </div>
            
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 rounded border border-gray-300 text-sm disabled:opacity-50"
            >
              Next
            </button>
          </nav>
        </div>
      )}

      {selectedAsset && (
        <>
          <MediaDetailsModal 
            isOpen={isDetailsModalOpen} 
            onClose={() => setIsDetailsModalOpen(false)} 
            mediaAsset={selectedAsset} 
            onUpdate={onRefresh}
          />
          
          <AssignPlaceholderModal 
            isOpen={isAssignModalOpen} 
            onClose={() => setIsAssignModalOpen(false)} 
            mediaAsset={selectedAsset} 
            onAssign={onRefresh}
          />
        </>
      )}
    </div>
  );
}
