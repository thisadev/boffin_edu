"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Download, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Registration = {
  id: number;
  userId: number;
  courseId: number;
  registrationDate: string;
  status: string;
  finalPrice: number;
  specialRequirements?: string;
  educationLevel?: string;
  workExperience?: string;
  hearAboutUs?: string;
  approvedById?: number;
  approvalDate?: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  course: {
    id: number;
    title: string;
    categoryId: number;
    category: {
      id: number;
      name: string;
    };
  };
};

type CategoryGroup = {
  id: number;
  name: string;
  registrations: Registration[];
};

export default function RegistrationsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryGroups, setCategoryGroups] = useState<CategoryGroup[]>([]);
  const [pendingRegistrations, setPendingRegistrations] = useState<Registration[]>([]);
  const [confirmedRegistrations, setConfirmedRegistrations] = useState<Registration[]>([]);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  // Fetch registrations
  useEffect(() => {
    if (status === "authenticated") {
      fetchRegistrations();
    }
  }, [status]);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Add a timestamp to prevent caching
      const timestamp = new Date().getTime();
      const response = await fetch(`/api/admin/registrations?t=${timestamp}`, {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      
      if (response.status === 401) {
        // Handle unauthorized - session might be expired
        console.log("Session expired or unauthorized, redirecting to login");
        router.push("/admin/login");
        return;
      }
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to fetch registrations: ${response.status}`);
      }
      
      const data = await response.json();
      // Check if data is an object with registrations property or an array
      const registrationsData = Array.isArray(data) ? data : data.registrations || [];
      
      setRegistrations(registrationsData);
      
      // Group by category
      const categories: { [key: number]: CategoryGroup } = {};
      
      // Process registrations
      if (Array.isArray(registrationsData)) {
        registrationsData.forEach((reg: Registration) => {
          const categoryId = reg.course.category.id;
          
          // Create category group if it doesn't exist
          if (!categories[categoryId]) {
            categories[categoryId] = {
              id: categoryId,
              name: reg.course.category.name,
              registrations: [],
            };
          }
          
          // Add registration to category group
          categories[categoryId].registrations.push(reg);
        });
        
        // Convert to array and sort
        const groupsArray = Object.values(categories).sort((a, b) => a.name.localeCompare(b.name));
        setCategoryGroups(groupsArray);
        
        // Filter by status
        setPendingRegistrations(registrationsData.filter((reg: Registration) => reg.status === "pending"));
        setConfirmedRegistrations(registrationsData.filter((reg: Registration) => reg.status === "confirmed"));
      } else {
        console.error("Registrations data is not an array:", registrationsData);
        setError("Invalid data format received from server");
      }
      
    } catch (err) {
      console.error("Error fetching registrations:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Filter registrations based on search term and status
  const filteredRegistrations = registrations.filter((reg) => {
    const matchesSearch =
      searchTerm === "" ||
      reg.user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.course.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || reg.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Handle retry when there's an error
  const handleRetry = () => {
    fetchRegistrations();
  };

  if (status === "loading") {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-500">Loading session...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 h-full overflow-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-boffin-background">Course Registrations</h1>
        
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 bg-white text-boffin-background"
            />
          </div>
          
          <div className="w-full sm:w-auto">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full bg-white text-boffin-background">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-boffin-primary"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>{error}</span>
          </div>
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-boffin-background">Total Registrations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-boffin-background">{registrations.length}</div>
                <p className="text-xs text-boffin-background/70 mt-1">From all courses</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-boffin-background">Pending Approval</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-boffin-background">{pendingRegistrations.length}</div>
                <p className="text-xs text-boffin-background/70 mt-1">Awaiting review</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-boffin-background">Confirmed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-boffin-background">{confirmedRegistrations.length}</div>
                <p className="text-xs text-boffin-background/70 mt-1">Approved registrations</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-boffin-background">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-boffin-background">{categoryGroups.length}</div>
                <p className="text-xs text-boffin-background/70 mt-1">Course categories</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Registrations</TabsTrigger>
              <TabsTrigger value="byCategory">By Category</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <div className="grid gap-4">
                {filteredRegistrations.map((registration) => (
                  <RegistrationCard key={registration.id} registration={registration} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="byCategory">
              <div className="space-y-6">
                {categoryGroups.map((group) => {
                  const filteredCategoryRegistrations = group.registrations.filter((reg) => {
                    const matchesSearch =
                      searchTerm === "" ||
                      reg.user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      reg.user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      reg.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      reg.course.title.toLowerCase().includes(searchTerm.toLowerCase());

                    const matchesStatus = statusFilter === "all" || reg.status === statusFilter;

                    return matchesSearch && matchesStatus;
                  });

                  if (filteredCategoryRegistrations.length === 0) return null;

                  return (
                    <div key={group.id} className="space-y-4">
                      <h3 className="font-semibold text-lg">{group.name}</h3>
                      <div className="grid gap-4">
                        {filteredCategoryRegistrations.map((registration) => (
                          <RegistrationCard key={registration.id} registration={registration} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}

function RegistrationCard({ registration }: { registration: Registration }) {
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  const statusColor = statusColors[registration.status as keyof typeof statusColors] || "bg-gray-100 text-gray-800";

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="space-y-3">
            <div className="space-y-1">
              <h3 className="font-semibold text-lg">
                {registration.user.firstName} {registration.user.lastName}
              </h3>
              <p className="text-sm text-muted-foreground">{registration.user.email}</p>
            </div>
            <div>
              <h4 className="font-medium">Course</h4>
              <p>{registration.course.title}</p>
              <p className="text-sm text-muted-foreground">
                Category: {registration.course.category.name}
              </p>
            </div>
            {registration.specialRequirements && (
              <div>
                <h4 className="font-medium">Special Requirements</h4>
                <p className="text-sm">{registration.specialRequirements}</p>
              </div>
            )}
          </div>
          <div className="space-y-3">
            <div>
              <Badge className={statusColor}>{registration.status}</Badge>
              <p className="text-sm text-muted-foreground mt-1">
                Registered on {new Date(registration.registrationDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <h4 className="font-medium">Contact</h4>
              <p className="text-sm">{registration.user.phone || "No phone provided"}</p>
              <p className="text-sm">
                {[registration.user.address, registration.user.city, registration.user.state, registration.user.zipCode]
                  .filter(Boolean)
                  .join(", ") || "No address provided"}
              </p>
            </div>
            <div className="pt-2">
              <Link href={`/admin/registrations/${registration.id}`}>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
