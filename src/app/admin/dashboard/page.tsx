"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [recentRegistrations, setRecentRegistrations] = useState<any[]>([]);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/auth/session");
        const data = await res.json();
        console.log("Session data:", data);

        if (data.user) {
          setUser(data.user);
          // Fetch dashboard stats
          fetchStats();
          fetchRecentRegistrations();
        } else {
          // Redirect to login if not authenticated
          console.log("Not authenticated, redirecting to login");
          router.push("/admin/login");
        }
      } catch (error) {
        console.error("Error checking session:", error);
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [router]);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/stats");
      if (!response.ok) {
        throw new Error("Failed to fetch stats");
      }
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchRecentRegistrations = async () => {
    try {
      const response = await fetch("/api/admin/registrations?limit=5");
      if (!response.ok) {
        throw new Error("Failed to fetch recent registrations");
      }
      const data = await response.json();
      setRecentRegistrations(data.registrations || []);
    } catch (error) {
      console.error("Error fetching recent registrations:", error);
    }
  };

  const handleLogout = async () => {
    try {
      // Clear the session cookie
      document.cookie = "next-auth.session-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      
      // Redirect to login page
      router.push("/admin/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-700">Loading dashboard...</span>
      </div>
    );
  }

  // If not authenticated, show login button
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-blue-900 mb-4">Not Authenticated</h1>
          <p className="text-gray-600 mb-6">You need to log in to access the admin dashboard.</p>
          <button 
            onClick={() => window.location.href = '/admin/login'}
            className="w-full bg-blue-900 text-white py-2 px-4 rounded-md hover:bg-blue-800 transition duration-200"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-boffin-background">Admin Dashboard</h1>
        <div className="flex items-center">
          {user && (
            <span className="mr-4 text-gray-600">
              Welcome, {user.name || user.email}
            </span>
          )}
        </div>
      </div>

      {stats && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-2 text-boffin-background">Total Registrations</h2>
              <p className="text-3xl font-bold text-boffin-primary">{stats.totalRegistrations}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-2 text-boffin-background">Pending Registrations</h2>
              <p className="text-3xl font-bold text-boffin-primary">{stats.pendingRegistrations}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-2 text-boffin-background">Completed Registrations</h2>
              <p className="text-3xl font-bold text-boffin-primary">{stats.completedRegistrations}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-2 text-boffin-background">Total Courses</h2>
              <p className="text-3xl font-bold text-boffin-primary">{stats.totalCourses}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-2 text-boffin-background">Total Categories</h2>
              <p className="text-3xl font-bold text-boffin-primary">{stats.totalCategories}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4 text-boffin-background">Recent Registrations</h2>
            {recentRegistrations.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-boffin-background uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-boffin-background uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-boffin-background uppercase tracking-wider">Course</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-boffin-background uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-boffin-background uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentRegistrations.map((reg: any) => (
                      <tr key={reg.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-boffin-background">{reg.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-boffin-background/80">{reg.user?.firstName} {reg.user?.lastName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-boffin-background/80">{reg.course?.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${reg.status === 'pending' ? 'bg-yellow-100 text-boffin-primary' : 'bg-green-100 text-boffin-primary'}`}>
                            {reg.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-boffin-background/80">{formatDate(reg.registrationDate)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-4 text-boffin-background/70">No recent registrations found</div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
