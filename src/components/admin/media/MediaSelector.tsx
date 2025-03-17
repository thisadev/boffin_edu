"use client";

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FiImage, FiVideo, FiFile, FiMusic } from 'react-icons/fi';

// Define MediaType locally to avoid import issues
type MediaType = 'IMAGE' | 'VIDEO' | 'DOCUMENT' | 'AUDIO';

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
}

interface MediaSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  mediaType?: MediaType | MediaType[];
  title?: string;
}

export default function MediaSelector({ isOpen, onClose, onSelect, mediaType = 'IMAGE', title = 'Select Media' }: MediaSelectorProps) {
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchMediaAssets();
    }
  }, [isOpen, mediaType, page]);

  const fetchMediaAssets = async () => {
    setLoading(true);
    try {
      const url = new URL('/api/admin/media', window.location.origin);
      
      // Handle multiple media types
      if (Array.isArray(mediaType)) {
        mediaType.forEach(type => url.searchParams.append('mediaType', type));
      } else if (mediaType) {
        url.searchParams.append('mediaType', mediaType);
      }
      
      url.searchParams.append('page', page.toString());
      url.searchParams.append('limit', '12');

      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error('Failed to fetch media assets');
      }

      const data = await response.json();
      setMediaAssets(data.mediaAssets);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error('Error fetching media assets:', error);
    } finally {
      setLoading(false);
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

  const handleSelect = () => {
    const selectedAsset = mediaAssets.find(asset => asset.id === selectedAssetId);
    if (selectedAsset) {
      onSelect(selectedAsset.publicUrl);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : mediaAssets.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-500 mb-4">No media assets found</p>
            <p className="text-sm text-gray-400">
              Try uploading some media assets first
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {mediaAssets.map((asset) => (
              <div 
                key={asset.id} 
                className={`bg-white rounded-lg border overflow-hidden cursor-pointer transition-all ${selectedAssetId === asset.id ? 'ring-2 ring-blue-500 border-blue-500' : 'border-gray-200 hover:border-blue-300'}`}
                onClick={() => setSelectedAssetId(asset.id)}
              >
                <div className="h-32 bg-gray-100 flex items-center justify-center relative">
                  {asset.mediaType === 'IMAGE' ? (
                    <img 
                      src={asset.publicUrl} 
                      alt={asset.altText || asset.fileName} 
                      className="w-full h-full object-cover"
                    />
                  ) : asset.mediaType === 'VIDEO' ? (
                    <div className="flex flex-col items-center justify-center h-full w-full bg-gray-100">
                      <FiVideo className="h-8 w-8 text-gray-400" />
                      <span className="mt-2 text-xs text-gray-500">Video</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full w-full bg-gray-100">
                      {getMediaTypeIcon(asset.mediaType)}
                      <span className="mt-2 text-xs text-gray-500">{asset.originalFileName.split('.').pop()?.toUpperCase()}</span>
                    </div>
                  )}
                </div>
                
                <div className="p-3">
                  <h3 className="font-medium text-gray-900 text-sm truncate">
                    {asset.title || asset.originalFileName}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatFileSize(asset.fileSize)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center mt-4 mb-4">
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

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            onClick={handleSelect} 
            disabled={!selectedAssetId}
          >
            Select
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
