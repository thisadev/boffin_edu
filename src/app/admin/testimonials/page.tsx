"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

interface Testimonial {
  id: string;
  content: string;
  rating: number;
  registrationId: number;
  designation: string | null;
  workplace: string | null;
  university: string | null;
  registration: {
    user: {
      firstName: string;
      lastName: string;
    };
    course: {
      title: string;
    };
  };
}

interface Registration {
  id: number;
  user: {
    firstName: string;
    lastName: string;
  };
  course: {
    title: string;
  };
}

interface FormData {
  registrationId: string;
  content: string;
  rating: string;
  designation: string;
  workplace: string;
  university: string;
}

export default function TestimonialsPage() {
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTestimonial, setCurrentTestimonial] = useState<Testimonial | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    registrationId: "",
    content: "",
    rating: "5",
    designation: "",
    workplace: "",
    university: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Fetch testimonials and registrations
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch testimonials using the bypass endpoint
        const testimonialRes = await fetch("/api/admin/testimonials-bypass");
        if (!testimonialRes.ok) {
          const errorData = await testimonialRes.json();
          throw new Error(`Failed to fetch testimonials: ${errorData.error || testimonialRes.statusText}`);
        }
        const testimonialData = await testimonialRes.json();
        setTestimonials(testimonialData);
        console.log("Testimonials loaded:", testimonialData.length);

        // Fetch registrations
        const registrationRes = await fetch("/api/admin/registrations");
        if (!registrationRes.ok) {
          const errorData = await registrationRes.json();
          throw new Error(`Failed to fetch registrations: ${errorData.error || registrationRes.statusText}`);
        }
        const registrationData = await registrationRes.json();
        setRegistrations(registrationData);
        console.log("Registrations loaded:", registrationData.length);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to load data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Reset form data
  const resetForm = () => {
    setFormData({
      registrationId: "",
      content: "",
      rating: "5",
      designation: "",
      workplace: "",
      university: "",
    });
    setCurrentTestimonial(null);
    setIsEditing(false);
  };

  // Open form for creating a new testimonial
  const handleAddNew = () => {
    resetForm();
    setShowForm(true);
    setIsEditing(false);
  };

  // Open form for editing an existing testimonial
  const handleEdit = (testimonial: Testimonial) => {
    setCurrentTestimonial(testimonial);
    setFormData({
      registrationId: testimonial.registrationId.toString(),
      content: testimonial.content,
      rating: testimonial.rating.toString(),
      designation: testimonial.designation || "",
      workplace: testimonial.workplace || "",
      university: testimonial.university || "",
    });
    setShowForm(true);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open delete confirmation dialog
  const handleDeleteClick = (testimonial: Testimonial) => {
    setCurrentTestimonial(testimonial);
    setIsDeleteDialogOpen(true);
  };

  // Update form data when input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit form to create or update a testimonial
  const handleSubmit = async () => {
    try {
      // Validate form data
      if (!formData.registrationId) {
        toast({
          title: "Validation Error",
          description: "Please select a student registration",
          variant: "destructive",
        });
        return;
      }

      if (!formData.content) {
        toast({
          title: "Validation Error",
          description: "Please enter testimonial content",
          variant: "destructive",
        });
        return;
      }

      console.log("Submitting testimonial form data:", formData);
      
      const url = currentTestimonial
        ? `/api/admin/testimonials-bypass/${currentTestimonial.id}`
        : "/api/admin/testimonials-bypass";
      const method = currentTestimonial ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to save testimonial: ${errorData.error || errorData.details || response.statusText}`);
      }

      // Refresh testimonials list
      const refreshResponse = await fetch("/api/admin/testimonials-bypass");
      if (!refreshResponse.ok) {
        const errorData = await refreshResponse.json();
        throw new Error(`Failed to refresh testimonials: ${errorData.error || refreshResponse.statusText}`);
      }
      const refreshData = await refreshResponse.json();
      setTestimonials(refreshData);

      // Reset form and hide it
      resetForm();
      setShowForm(false);
      
      toast({
        title: "Success",
        description: currentTestimonial
          ? "Testimonial updated successfully"
          : "Testimonial created successfully",
      });
    } catch (error) {
      console.error("Error saving testimonial:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save testimonial. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Delete a testimonial
  const handleDelete = async () => {
    if (!currentTestimonial) return;

    try {
      console.log(`Deleting testimonial: ${currentTestimonial.id}`);
      
      const response = await fetch(`/api/admin/testimonials-bypass/${currentTestimonial.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to delete testimonial: ${errorData.error || errorData.details || response.statusText}`);
      }

      // Refresh testimonials list
      const refreshResponse = await fetch("/api/admin/testimonials-bypass");
      if (!refreshResponse.ok) {
        const errorData = await refreshResponse.json();
        throw new Error(`Failed to refresh testimonials: ${errorData.error || refreshResponse.statusText}`);
      }
      const refreshData = await refreshResponse.json();
      setTestimonials(refreshData);

      setIsDeleteDialogOpen(false);
      toast({
        title: "Success",
        description: "Testimonial deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete testimonial. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Cancel delete operation
  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setCurrentTestimonial(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#1e3a8a]">Testimonials Management</h1>
        <button
          onClick={handleAddNew}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-[#1e3a8a] text-white hover:bg-[#1e3a8a]/90 h-10 py-2 px-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-plus h-4 w-4 mr-2"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5v14"></path>
          </svg>
          Add New Testimonial
        </button>
      </div>

      {/* Inline Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-[#1e3a8a]">
            {isEditing ? "Edit Testimonial" : "Add New Testimonial"}
          </h2>
          <div className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <label htmlFor="registrationId" className="text-sm font-medium text-gray-700">
                Student
              </label>
              <select
                id="registrationId"
                name="registrationId"
                value={formData.registrationId}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
              >
                <option value="">Select a student</option>
                {registrations.map((registration) => (
                  <option key={registration.id} value={registration.id}>
                    {registration.user.firstName} {registration.user.lastName} - {registration.course.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid w-full items-center gap-1.5">
              <label htmlFor="content" className="text-sm font-medium text-gray-700">
                Testimonial Content
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows={4}
                className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
                placeholder="Enter the testimonial content"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid w-full items-center gap-1.5">
                <label htmlFor="designation" className="text-sm font-medium text-gray-700">
                  Designation/Department
                </label>
                <input
                  type="text"
                  id="designation"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
                  placeholder="E.g. Software Engineer, Marketing Manager"
                />
              </div>

              <div className="grid w-full items-center gap-1.5">
                <label htmlFor="workplace" className="text-sm font-medium text-gray-700">
                  Workplace
                </label>
                <input
                  type="text"
                  id="workplace"
                  name="workplace"
                  value={formData.workplace}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
                  placeholder="E.g. Google, Microsoft"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid w-full items-center gap-1.5">
                <label htmlFor="university" className="text-sm font-medium text-gray-700">
                  University/Institution
                </label>
                <input
                  type="text"
                  id="university"
                  name="university"
                  value={formData.university}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
                  placeholder="E.g. Stanford University, MIT"
                />
              </div>

              <div className="grid w-full items-center gap-1.5">
                <label htmlFor="rating" className="text-sm font-medium text-gray-700">
                  Rating (1-5)
                </label>
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  min="1"
                  max="5"
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => {
                  resetForm();
                  setShowForm(false);
                }}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 h-10 py-2 px-4"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-[#1e3a8a] text-white hover:bg-[#1e3a8a]/90 h-10 py-2 px-4"
              >
                {isEditing ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1e3a8a]"></div>
        </div>
      ) : testimonials.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center">
          <p className="text-gray-600">No testimonials found. Add your first testimonial!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 relative"
            >
              <div className="absolute top-4 right-4 flex space-x-2">
                <button
                  onClick={() => handleEdit(testimonial)}
                  className="p-1 text-blue-600 hover:text-blue-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-square-pen h-4 w-4"
                  >
                    <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"></path>
                  </svg>
                </button>
                <button
                  onClick={() => handleDeleteClick(testimonial)}
                  className="p-1 text-red-600 hover:text-red-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-trash-2 h-4 w-4"
                  >
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    <line x1="10" x2="10" y1="11" y2="17"></line>
                    <line x1="14" x2="14" y1="11" y2="17"></line>
                  </svg>
                </button>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-[#1e3a8a]">
                  {testimonial.registration.user.firstName} {testimonial.registration.user.lastName}
                </h3>
                <p className="text-sm text-gray-600">{testimonial.registration.course.title}</p>
                
                {/* Display designation and workplace/university */}
                {(testimonial.designation || testimonial.workplace || testimonial.university) && (
                  <div className="mt-1">
                    {testimonial.designation && (
                      <p className="text-sm text-gray-700">
                        {testimonial.designation}
                        {testimonial.workplace && ` at ${testimonial.workplace}`}
                      </p>
                    )}
                    {!testimonial.designation && testimonial.workplace && (
                      <p className="text-sm text-gray-700">{testimonial.workplace}</p>
                    )}
                    {testimonial.university && (
                      <p className="text-sm text-gray-700">{testimonial.university}</p>
                    )}
                  </div>
                )}
              </div>
              <div className="mb-2">
                <p className="text-gray-700">"{testimonial.content}"</p>
              </div>
              <div className="flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill={i < testimonial.rating ? "#FFD700" : "none"}
                      stroke="#FFD700"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {isDeleteDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4 text-[#1e3a8a]">Confirm Deletion</h3>
            <p className="text-gray-700 mb-4">
              Are you sure you want to delete this testimonial? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleCancelDelete}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 h-10 py-2 px-4"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-red-600 text-white hover:bg-red-700 h-10 py-2 px-4"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
