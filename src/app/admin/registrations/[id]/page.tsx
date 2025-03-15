"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, ArrowLeft, CheckCircle, X } from "lucide-react";

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
  categorySpecificData?: any;
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

export default function RegistrationDetailPage({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  // Fetch registration details
  useEffect(() => {
    if (status === "authenticated" && params.id) {
      fetchRegistrationDetails();
    }
  }, [status, params.id]);

  const fetchRegistrationDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/registrations/${params.id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch registration details");
      }
      const data = await response.json();
      setRegistration(data);
      setLoading(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unknown error occurred");
      setLoading(false);
    }
  };

  const confirmRegistration = async () => {
    if (!registration) return;
    
    try {
      const response = await fetch(`/api/admin/registrations/${registration.id}/confirm`, {
        method: "PUT",
      });
      
      if (!response.ok) {
        throw new Error("Failed to confirm registration");
      }
      
      // Refresh the data
      fetchRegistrationDetails();
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unknown error occurred");
    }
  };

  const cancelRegistration = async () => {
    if (!registration) return;
    
    try {
      const response = await fetch(`/api/admin/registrations/${registration.id}/cancel`, {
        method: "PUT",
      });
      
      if (!response.ok) {
        throw new Error("Failed to cancel registration");
      }
      
      // Refresh the data
      fetchRegistrationDetails();
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unknown error occurred");
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-6 px-4">
        <div className="flex items-center mb-6">
          <Link href="/admin/registrations" className="mr-4">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Registration Details</h1>
        </div>
        
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p className="flex items-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            {error}
          </p>
        </div>
      </div>
    );
  }

  if (!registration) {
    return (
      <div className="container mx-auto py-6 px-4">
        <div className="flex items-center mb-6">
          <Link href="/admin/registrations" className="mr-4">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Registration Details</h1>
        </div>
        
        <Card>
          <CardContent className="pt-6 text-center text-gray-500">
            Registration not found.
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex items-center mb-6">
        <Link href="/admin/registrations" className="mr-4">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Registration Details</h1>
      </div>

      <Card>
        <CardHeader className={`pb-3 ${registration.status === "confirmed" ? "bg-green-50" : registration.status === "pending" ? "bg-amber-50" : "bg-red-50"}`}>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">
                {registration.user.firstName} {registration.user.lastName}
              </CardTitle>
              <p className="text-sm text-gray-500">
                Registration #{registration.id} • {new Date(registration.registrationDate).toLocaleDateString()}
              </p>
            </div>
            <Badge className={`${registration.status === "confirmed" ? "bg-green-500" : registration.status === "pending" ? "bg-amber-500" : "bg-red-500"}`}>
              {registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Student Information</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Personal Details</h3>
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                    <div>
                      <span className="text-gray-500 text-sm">Full Name:</span>
                      <p>{registration.user.firstName} {registration.user.lastName}</p>
                    </div>
                    <div>
                      <span className="text-gray-500 text-sm">Email:</span>
                      <p>{registration.user.email}</p>
                    </div>
                    <div>
                      <span className="text-gray-500 text-sm">Phone:</span>
                      <p>{registration.user.phone || "N/A"}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Address</h3>
                  <div className="mt-2">
                    {registration.user.address ? (
                      <p>
                        {registration.user.address}<br />
                        {registration.user.city}{registration.user.state ? `, ${registration.user.state}` : ""} {registration.user.zipCode || ""}<br />
                        {registration.user.country || ""}
                      </p>
                    ) : (
                      <p>No address provided</p>
                    )}
                  </div>
                </div>
                
                {(registration.educationLevel || registration.workExperience) && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Background</h3>
                    <div className="mt-2 grid grid-cols-1 gap-y-2">
                      {registration.educationLevel && (
                        <div>
                          <span className="text-gray-500 text-sm">Education Level:</span>
                          <p>{registration.educationLevel}</p>
                        </div>
                      )}
                      {registration.workExperience && (
                        <div>
                          <span className="text-gray-500 text-sm">Work Experience:</span>
                          <p>{registration.workExperience}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {registration.hearAboutUs && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">How did they hear about us</h3>
                    <p className="mt-2">{registration.hearAboutUs}</p>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Course & Registration Details</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Course Information</h3>
                  <div className="mt-2 grid grid-cols-1 gap-y-2">
                    <div>
                      <span className="text-gray-500 text-sm">Course:</span>
                      <p>{registration.course.title}</p>
                    </div>
                    <div>
                      <span className="text-gray-500 text-sm">Category:</span>
                      <p>{registration.course.category.name}</p>
                    </div>
                    <div>
                      <span className="text-gray-500 text-sm">Price Paid:</span>
                      <p className="font-medium">${registration.finalPrice.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Registration Status</h3>
                  <div className="mt-2 grid grid-cols-1 gap-y-2">
                    <div>
                      <span className="text-gray-500 text-sm">Status:</span>
                      <p className="font-medium">{registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}</p>
                    </div>
                    <div>
                      <span className="text-gray-500 text-sm">Registration Date:</span>
                      <p>{new Date(registration.registrationDate).toLocaleString()}</p>
                    </div>
                    {registration.approvalDate && (
                      <div>
                        <span className="text-gray-500 text-sm">Approval Date:</span>
                        <p>{new Date(registration.approvalDate).toLocaleString()}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                {registration.specialRequirements && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Special Requirements</h3>
                    <p className="mt-2 text-sm whitespace-pre-line">{registration.specialRequirements}</p>
                  </div>
                )}
                
                {registration.categorySpecificData && Object.keys(registration.categorySpecificData).length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Category-Specific Information</h3>
                    <div className="mt-2 grid grid-cols-1 gap-y-2">
                      {Object.entries(registration.categorySpecificData).map(([key, value]) => (
                        <div key={key}>
                          <span className="text-gray-500 text-sm">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</span>
                          <p>{String(value)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {registration.status === "pending" && (
            <div className="mt-8 flex justify-end space-x-4">
              <Button 
                variant="outline"
                onClick={cancelRegistration}
                className="flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                Cancel Registration
              </Button>
              <Button 
                onClick={confirmRegistration}
                className="flex items-center gap-2"
              >
                <CheckCircle className="h-4 w-4" />
                Confirm Registration
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
