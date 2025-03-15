"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);

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
      // Mock stats for now
      setStats({
        totalRegistrations: 125,
        pendingRegistrations: 15,
        completedRegistrations: 110,
        recentRegistrations: [
          { id: "1", name: "John Doe", course: "Advanced Physics", date: "2025-03-10" },
          { id: "2", name: "Jane Smith", course: "Quantum Computing", date: "2025-03-12" },
          { id: "3", name: "Bob Johnson", course: "Artificial Intelligence", date: "2025-03-14" },
        ],
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-700">Loading dashboard...</span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center">
          {user && (
            <span className="mr-4 text-gray-600">
              Welcome, {user.name || user.email}
            </span>
          )}
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {stats && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-2">Total Registrations</h2>
              <p className="text-3xl font-bold text-blue-600">{stats.totalRegistrations}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-2">Pending Registrations</h2>
              <p className="text-3xl font-bold text-yellow-600">{stats.pendingRegistrations}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-2">Completed Registrations</h2>
              <p className="text-3xl font-bold text-green-600">{stats.completedRegistrations}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Registrations</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {stats.recentRegistrations.map((reg: any) => (
                    <tr key={reg.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{reg.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reg.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reg.course}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reg.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
