"use client";

import { useState, useRef } from 'react';
// Define MediaType locally to avoid import issues
type MediaType = 'IMAGE' | 'VIDEO' | 'DOCUMENT' | 'AUDIO';
import { toast } from 'react-hot-toast';
import { FiUpload, FiImage, FiVideo, FiFile, FiMusic } from 'react-icons/fi';

interface MediaUploaderProps {
  onUploadComplete: () => void;
}

export default function MediaUploader({ onUploadComplete }: MediaUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [mediaType, setMediaType] = useState<MediaType>('IMAGE');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [altText, setAltText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setError(null);

      // Determine media type from file
      const mimeType = selectedFile.type;
      if (mimeType.startsWith('image/')) {
        setMediaType('IMAGE');
      } else if (mimeType.startsWith('video/')) {
        setMediaType('VIDEO');
      } else if (mimeType.startsWith('audio/')) {
        setMediaType('AUDIO');
      } else {
        setMediaType('DOCUMENT');
      }

      // Create preview for images and videos
      if (mimeType.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreview(e.target?.result as string);
        };
        reader.readAsDataURL(selectedFile);
      } else if (mimeType.startsWith('video/')) {
        setPreview(URL.createObjectURL(selectedFile));
      } else {
        setPreview(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file to upload');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('mediaType', mediaType);
      if (title) formData.append('title', title);
      if (description) formData.append('description', description);
      if (altText) formData.append('altText', altText);

      const response = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload media');
      }

      const data = await response.json();
      toast.success('Media uploaded successfully');
      
      // Reset form
      setFile(null);
      setPreview(null);
      setTitle('');
      setDescription('');
      setAltText('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      onUploadComplete();
    } catch (error) {
      console.error('Upload error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload media';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  const getMediaTypeIcon = () => {
    switch (mediaType) {
      case 'IMAGE':
        return <FiImage className="h-6 w-6" />;
      case 'VIDEO':
        return <FiVideo className="h-6 w-6" />;
      case 'AUDIO':
        return <FiMusic className="h-6 w-6" />;
      case 'DOCUMENT':
        return <FiFile className="h-6 w-6" />;
      default:
        return <FiFile className="h-6 w-6" />;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600">
          <p className="font-medium">Upload Error</p>
          <p className="text-sm">{error}</p>
          <p className="text-sm mt-1">Please check your Vercel Blob configuration in the .env file.</p>
        </div>
      )}
      
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-12 cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          {file && preview ? (
            <div className="flex flex-col items-center space-y-2">
              {mediaType === 'IMAGE' ? (
                <img src={preview} alt="Preview" className="max-h-64 max-w-full rounded" />
              ) : mediaType === 'VIDEO' ? (
                <video src={preview} controls className="max-h-64 max-w-full rounded" />
              ) : (
                <div className="flex items-center justify-center h-24 w-24 bg-gray-100 rounded-full">
                  {getMediaTypeIcon()}
                </div>
              )}
              <p className="text-sm text-gray-700">{file.name}</p>
              <p className="text-xs text-gray-600">{file.size ? (file.size / 1024 / 1024).toFixed(2) : '0'} MB</p>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <FiUpload className="h-12 w-12 text-gray-500" />
              <p className="text-lg font-medium text-gray-700">Drag and drop or click to upload</p>
              <p className="text-sm text-gray-600">Support for images, videos, documents, and audio files</p>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*,video/*,audio/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Media Type</label>
            <select
              value={mediaType}
              onChange={(e) => setMediaType(e.target.value as MediaType)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              disabled={!!file}
            >
              <option value="IMAGE">Image</option>
              <option value="VIDEO">Video</option>
              <option value="DOCUMENT">Document</option>
              <option value="AUDIO">Audio</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter a title for this media"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter a description"
            rows={3}
          />
        </div>

        {mediaType === 'IMAGE' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
            <input
              type="text"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Describe the image for accessibility"
            />
          </div>
        )}

        <div className="flex justify-end">
          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {uploading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <FiUpload className="h-4 w-4" />
                <span>Upload</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
