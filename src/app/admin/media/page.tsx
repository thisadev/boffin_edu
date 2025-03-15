import { Metadata } from 'next';
import MediaDashboard from '@/components/admin/media/MediaDashboard';

export const metadata: Metadata = {
  title: 'Media Management - Boffin Institute Admin',
  description: 'Upload and manage media assets for the Boffin Institute website',
};

export default function MediaManagementPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Media Management</h1>
      <MediaDashboard />
    </div>
  );
}
