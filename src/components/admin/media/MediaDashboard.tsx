"use client";

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MediaUploader from './MediaUploader';
import MediaLibrary from './MediaLibrary';
import PlaceholderManager from './PlaceholderManager';
import BlobDebugger from './BlobDebugger';

// Define MediaType enum locally to avoid import issues
type MediaType = 'IMAGE' | 'VIDEO' | 'DOCUMENT' | 'AUDIO';

export default function MediaDashboard() {
  const [activeTab, setActiveTab] = useState('library');
  const [selectedMediaType, setSelectedMediaType] = useState<MediaType | 'ALL'>('ALL');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <Tabs defaultValue="library" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 mb-8 bg-gray-100 text-gray-700">
          <TabsTrigger value="library" className="text-gray-700 data-[state=active]:bg-white data-[state=active]:text-gray-900">Media Library</TabsTrigger>
          <TabsTrigger value="upload" className="text-gray-700 data-[state=active]:bg-white data-[state=active]:text-gray-900">Upload Media</TabsTrigger>
          <TabsTrigger value="placeholders" className="text-gray-700 data-[state=active]:bg-white data-[state=active]:text-gray-900">Manage Placeholders</TabsTrigger>
          <TabsTrigger value="debug" className="text-gray-700 data-[state=active]:bg-white data-[state=active]:text-gray-900">Debug</TabsTrigger>
        </TabsList>
        
        <TabsContent value="library" className="space-y-4">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Media Library</h2>
              <p className="text-gray-700">Browse and manage your media assets</p>
            </div>
            <div className="flex space-x-2">
              <select 
                className="border rounded-md px-3 py-2 text-gray-800 bg-white border-gray-300"
                value={selectedMediaType}
                onChange={(e) => setSelectedMediaType(e.target.value as MediaType | 'ALL')}
              >
                <option value="ALL">All Media Types</option>
                <option value="IMAGE">Images</option>
                <option value="VIDEO">Videos</option>
                <option value="DOCUMENT">Documents</option>
                <option value="AUDIO">Audio</option>
              </select>
            </div>
          </div>
          <MediaLibrary 
            mediaType={selectedMediaType === 'ALL' ? undefined : selectedMediaType} 
            refreshTrigger={refreshTrigger}
            onRefresh={handleRefresh}
          />
        </TabsContent>
        
        <TabsContent value="upload" className="space-y-4">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Upload Media</h2>
            <p className="text-gray-700">Add new media assets to your library</p>
          </div>
          <MediaUploader onUploadComplete={() => {
            handleRefresh();
            setActiveTab('library');
          }} />
        </TabsContent>
        
        <TabsContent value="placeholders" className="space-y-4">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Manage Placeholders</h2>
            <p className="text-gray-700">Create and manage media placeholders for your website</p>
          </div>
          <PlaceholderManager refreshTrigger={refreshTrigger} onRefresh={handleRefresh} />
        </TabsContent>
        
        <TabsContent value="debug" className="space-y-4">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Debug</h2>
            <p className="text-gray-700">Debug your media assets</p>
          </div>
          <BlobDebugger />
        </TabsContent>
      </Tabs>
    </div>
  );
}
