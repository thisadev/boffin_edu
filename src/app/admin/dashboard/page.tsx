"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DashboardStats {
  totalCourses: number;
  totalCategories: number;
  totalRegistrations: number;
  totalInstructors: number;
  pendingRegistrations: number;
  completedRegistrations: number;
}

interface Registration {
  id: number;
  studentName: string;
  studentEmail: string;
  courseName: string;
  date: string;
  status: string;
  finalPrice: number;
}

interface MonthlyData {
  month: number;
  name: string;
  count: number;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentRegistrations, setRecentRegistrations] = useState<Registration[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [loading, setLoading] = useState(true);

  // Brand colors
  const brandColors = {
    primary: "#0f2c59", // Deep blue
    secondary: "#164b60", // Medium blue
    accent: "#4fc0d0", // Light blue
    highlight: "#1b9c85", // Light green
    background: "#f8f9fa",
    text: "#333333",
  };

  useEffect(() => {
    // Only fetch data if authenticated
    if (status === "authenticated" && session?.user) {
      // Fetch dashboard stats
      fetchStats();
      fetchRecentRegistrations();
      fetchMonthlyRegistrations();
      setLoading(false);
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

  const fetchMonthlyRegistrations = async () => {
    try {
      const response = await fetch("/api/admin/stats/monthly-registrations");
      if (!response.ok) {
        throw new Error("Failed to fetch monthly registrations");
      }
      const data = await response.json();
      setMonthlyData(data);
    } catch (error) {
      console.error("Error fetching monthly registrations:", error);
    }
  };

  // Helper function to format dates
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Helper function to format currency
  const formatCurrency = (amount: number) => {
    if (amount === undefined || amount === null) return "N/A";
    return `Rs. ${amount.toLocaleString()}`;
  };

  // Chart options and data
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  const chartData = {
    labels: monthlyData.map((item) => item.name),
    datasets: [
      {
        label: "Registrations",
        data: monthlyData.map((item) => item.count),
        backgroundColor: brandColors.accent,
        borderColor: brandColors.primary,
        borderWidth: 1,
      },
    ],
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome, {session?.user?.name || session?.user?.email}</p>
      </div>

      {/* Dashboard stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4" style={{ backgroundColor: brandColors.primary }}>
            <h2 className="text-lg font-semibold text-white">Total Courses</h2>
          </div>
          <div className="p-6">
            <p className="text-3xl font-bold text-gray-800">{stats?.totalCourses || 0}</p>
            <p className="text-sm text-gray-500 mt-2">Available courses</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4" style={{ backgroundColor: brandColors.highlight }}>
            <h2 className="text-lg font-semibold text-white">Categories</h2>
          </div>
          <div className="p-6">
            <p className="text-3xl font-bold text-gray-800">{stats?.totalCategories || 0}</p>
            <p className="text-sm text-gray-500 mt-2">Course categories</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4" style={{ backgroundColor: brandColors.secondary }}>
            <h2 className="text-lg font-semibold text-white">Instructors</h2>
          </div>
          <div className="p-6">
            <p className="text-3xl font-bold text-gray-800">{stats?.totalInstructors || 0}</p>
            <p className="text-sm text-gray-500 mt-2">Active instructors</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4" style={{ backgroundColor: brandColors.accent }}>
            <h2 className="text-lg font-semibold text-white">Registrations</h2>
          </div>
          <div className="p-6">
            <p className="text-3xl font-bold text-gray-800">{stats?.totalRegistrations || 0}</p>
            <p className="text-sm text-gray-500 mt-2">Total registrations</p>
          </div>
        </div>
      </div>

      {/* Monthly Registrations Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Monthly Registrations ({new Date().getFullYear()})</h2>
        <div style={{ height: "300px" }}>
          {monthlyData.length > 0 ? (
            <Bar options={chartOptions} data={chartData} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">No registration data available</p>
            </div>
          )}
        </div>
      </div>

      {/* Registration status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Registration Status</h2>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full" 
                  style={{ backgroundColor: `${brandColors.highlight}20`, color: brandColors.highlight }}>
                  Completed
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block" 
                  style={{ color: brandColors.highlight }}>
                  {stats?.completedRegistrations || 0}
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded" 
              style={{ backgroundColor: `${brandColors.highlight}20` }}>
              <div
                style={{
                  width: `${stats?.totalRegistrations ? (stats.completedRegistrations / stats.totalRegistrations) * 100 : 0}%`,
                  backgroundColor: brandColors.highlight
                }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"
              ></div>
            </div>
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full" 
                  style={{ backgroundColor: `${brandColors.accent}20`, color: brandColors.accent }}>
                  Pending
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block" 
                  style={{ color: brandColors.accent }}>
                  {stats?.pendingRegistrations || 0}
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded" 
              style={{ backgroundColor: `${brandColors.accent}20` }}>
              <div
                style={{
                  width: `${stats?.totalRegistrations ? (stats.pendingRegistrations / stats.totalRegistrations) * 100 : 0}%`,
                  backgroundColor: brandColors.accent
                }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"
              ></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-3">
            <Link href="/admin/courses/new" className="text-white py-2 px-4 rounded text-center" 
              style={{ backgroundColor: brandColors.primary, transition: "opacity 0.2s" }}
              onMouseOver={(e) => e.currentTarget.style.opacity = "0.9"}
              onMouseOut={(e) => e.currentTarget.style.opacity = "1"}>
              Add New Course
            </Link>
            <Link href="/admin/registrations" className="text-white py-2 px-4 rounded text-center" 
              style={{ backgroundColor: brandColors.highlight, transition: "opacity 0.2s" }}
              onMouseOver={(e) => e.currentTarget.style.opacity = "0.9"}
              onMouseOut={(e) => e.currentTarget.style.opacity = "1"}>
              View All Registrations
            </Link>
            <Link href="/admin/categories" className="text-white py-2 px-4 rounded text-center" 
              style={{ backgroundColor: brandColors.secondary, transition: "opacity 0.2s" }}
              onMouseOver={(e) => e.currentTarget.style.opacity = "0.9"}
              onMouseOut={(e) => e.currentTarget.style.opacity = "1"}>
              Manage Categories
            </Link>
          </div>
        </div>
      </div>

      {/* Recent registrations */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Recent Registrations</h2>
          <Link href="/admin/registrations" className="text-sm font-medium" style={{ color: brandColors.primary }}>
            View All
          </Link>
        </div>
        
        {recentRegistrations.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentRegistrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{reg.studentName}</div>
                          <div className="text-sm text-gray-500">{reg.studentEmail}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{reg.courseName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(reg.date)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatCurrency(reg.finalPrice)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full`}
                        style={{
                          backgroundColor: reg.status === "completed" 
                            ? `${brandColors.highlight}20` 
                            : reg.status === "pending" 
                              ? `${brandColors.accent}20` 
                              : "#f3f4f6",
                          color: reg.status === "completed" 
                            ? brandColors.highlight 
                            : reg.status === "pending" 
                              ? brandColors.accent 
                              : "#6b7280"
                        }}
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
          <div className="text-center py-8">
            <p className="text-gray-500">No recent registrations found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
