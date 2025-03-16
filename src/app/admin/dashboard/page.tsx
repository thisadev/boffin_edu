"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const [stats, setStats] = useState<any>(null);
  const [recentRegistrations, setRecentRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only fetch data if authenticated
    if (status === "authenticated" && session?.user) {
      console.log("User authenticated:", session.user);
      // Fetch dashboard stats
      fetchStats();
      fetchRecentRegistrations();
      setLoading(false);
    } else if (status === "unauthenticated") {
      // Direct navigation to login page
      console.log("Not authenticated, redirecting to login");
      window.location.href = "/admin/login";
    }
  }, [session, status]);

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
      const response = await fetch("/api/admin/registrations/recent");
      if (!response.ok) {
        throw new Error("Failed to fetch recent registrations");
      }
      const data = await response.json();
      setRecentRegistrations(data);
    } catch (error) {
      console.error("Error fetching recent registrations:", error);
    }
  };

  // Helper function to format dates
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800">Loading dashboard...</h2>
          <div className="mt-4 flex justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-900"></div>
          </div>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800">Not authenticated</h2>
          <p className="mt-2 text-gray-600">Please sign in to access the dashboard</p>
          <div className="mt-4">
            <a 
              href="/admin/login"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 inline-block"
            >
              Go to Login
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome, {session?.user?.name || session?.user?.email}</p>
      </div>

      {/* Dashboard stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Students</h2>
          <p className="text-3xl font-bold text-blue-600">{stats?.totalStudents || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Active Courses</h2>
          <p className="text-3xl font-bold text-green-600">{stats?.activeCourses || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Revenue</h2>
          <p className="text-3xl font-bold text-purple-600">Rs. {stats?.totalRevenue?.toLocaleString() || 0}</p>
        </div>
      </div>

      {/* Recent registrations */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Recent Registrations</h2>
        {recentRegistrations.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentRegistrations.map((reg, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b border-gray-200">{reg.studentName}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{reg.courseName}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{formatDate(reg.date)}</td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          reg.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : reg.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {reg.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No recent registrations found.</p>
        )}
      </div>

      {/* Quick actions */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/admin/courses/new" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-center">
            Add New Course
          </Link>
          <Link href="/admin/students" className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded text-center">
            View Student Reports
          </Link>
          <Link href="/admin/testimonials" className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded text-center">
            Manage Testimonials
          </Link>
        </div>
      </div>
    </div>
  );
}
