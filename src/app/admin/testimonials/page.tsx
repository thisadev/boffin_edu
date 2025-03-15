"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Star, Edit, Trash2, Plus, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

type Registration = {
  id: string;
  userId: string;
  courseId: string;
  user: {
    firstName: string;
    lastName: string;
  };
  course: {
    title: string;
  };
};

type Testimonial = {
  id: string;
  content: string;
  rating: number;
  designation: string | null;
  workplace: string | null;
  university: string | null;
  profileImageUrl: string | null;
  isActive: boolean;
  isFeatured: boolean;
  registrationId: string;
  registration: Registration;
  createdAt: string;
  updatedAt: string;
};

type TestimonialFormData = {
  registrationId: string;
  content: string;
  rating: number;
  designation: string;
  workplace: string;
  university: string;
  profileImageUrl: string;
  isActive: boolean;
  isFeatured: boolean;
};

export default function TestimonialsPage() {
  const router = useRouter();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState<TestimonialFormData>({
    registrationId: "",
    content: "",
    rating: 5,
    designation: "",
    workplace: "",
    university: "",
    profileImageUrl: "",
    isActive: true,
    isFeatured: false,
  });

  // Fetch testimonials and registrations
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch testimonials
        const testimonialRes = await fetch("/api/admin/testimonials");
        if (!testimonialRes.ok) throw new Error("Failed to fetch testimonials");
        const testimonialData = await testimonialRes.json();
        setTestimonials(testimonialData);

        // Fetch registrations
        const registrationRes = await fetch("/api/admin/registrations");
        if (!registrationRes.ok) throw new Error("Failed to fetch registrations");
        const registrationData = await registrationRes.json();
        setRegistrations(registrationData);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description: "Failed to load data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle switch changes
  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Open dialog for creating a new testimonial
  const handleCreateNew = () => {
    setCurrentTestimonial(null);
    setFormData({
      registrationId: "",
      content: "",
      rating: 5,
      designation: "",
      workplace: "",
      university: "",
      profileImageUrl: "",
      isActive: true,
      isFeatured: false,
    });
    setIsDialogOpen(true);
  };

  // Open dialog for editing an existing testimonial
  const handleEdit = (testimonial: Testimonial) => {
    setCurrentTestimonial(testimonial);
    setFormData({
      registrationId: testimonial.registrationId,
      content: testimonial.content,
      rating: testimonial.rating,
      designation: testimonial.designation || "",
      workplace: testimonial.workplace || "",
      university: testimonial.university || "",
      profileImageUrl: testimonial.profileImageUrl || "",
      isActive: testimonial.isActive,
      isFeatured: testimonial.isFeatured,
    });
    setIsDialogOpen(true);
  };

  // Open dialog for confirming deletion
  const handleDeleteConfirm = (testimonial: Testimonial) => {
    setCurrentTestimonial(testimonial);
    setIsDeleteDialogOpen(true);
  };

  // Submit form to create or update a testimonial
  const handleSubmit = async () => {
    try {
      const url = currentTestimonial
        ? `/api/admin/testimonials/${currentTestimonial.id}`
        : "/api/admin/testimonials";
      const method = currentTestimonial ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save testimonial");
      }

      // Refresh testimonials list
      const refreshResponse = await fetch("/api/admin/testimonials");
      if (!refreshResponse.ok) throw new Error("Failed to refresh testimonials");
      const refreshData = await refreshResponse.json();
      setTestimonials(refreshData);

      setIsDialogOpen(false);
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
        description: "Failed to save testimonial. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Delete a testimonial
  const handleDelete = async () => {
    if (!currentTestimonial) return;

    try {
      const response = await fetch(`/api/admin/testimonials/${currentTestimonial.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete testimonial");
      }

      // Refresh testimonials list
      const refreshResponse = await fetch("/api/admin/testimonials");
      if (!refreshResponse.ok) throw new Error("Failed to refresh testimonials");
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
        description: "Failed to delete testimonial. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Render star rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${index < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
      />
    ));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Testimonials Management</h1>
        <Button onClick={handleCreateNew}>
          <Plus className="h-4 w-4 mr-2" /> Add New Testimonial
        </Button>
      </div>

      {testimonials.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No testimonials found. Create your first testimonial!</p>
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
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteConfirm(testimonial)}
                  className="p-1 text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center mb-4">{renderStars(testimonial.rating)}</div>

              <div className="mb-4">
                <p className="text-gray-700 italic">
                  {testimonial.content}
                </p>
              </div>

              <div className="mb-2">
                <p className="text-sm font-medium">
                  {testimonial.registration.user.firstName} {testimonial.registration.user.lastName}
                </p>
                <p className="text-sm text-gray-600">
                  {testimonial.registration.course.title}
                </p>
              </div>

              {testimonial.designation && testimonial.workplace && (
                <div className="mb-2">
                  <p className="text-sm text-gray-600">
                    {testimonial.designation} at {testimonial.workplace}
                  </p>
                </div>
              )}

              {testimonial.university && (
                <div className="mb-2">
                  <p className="text-sm text-gray-600">
                    {testimonial.university}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-2">
                  <span className={`inline-block w-2 h-2 rounded-full ${testimonial.isActive ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                  <span className="text-xs text-gray-600">{testimonial.isActive ? 'Active' : 'Inactive'}</span>
                </div>
                {testimonial.isFeatured && (
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Featured</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Testimonial Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {currentTestimonial ? "Edit Testimonial" : "Create New Testimonial"}
            </DialogTitle>
            <DialogDescription>
              {currentTestimonial
                ? "Update the testimonial details below."
                : "Fill in the details to create a new testimonial."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="registrationId" className="text-right">
                Student
              </Label>
              <div className="col-span-3">
                <Select
                  value={formData.registrationId}
                  onValueChange={(value) => handleSelectChange("registrationId", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a student" />
                  </SelectTrigger>
                  <SelectContent>
                    {registrations.map((registration) => (
                      <SelectItem key={registration.id} value={registration.id}>
                        {registration.user.firstName} {registration.user.lastName} - {registration.course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="content" className="text-right">
                Content
              </Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                className="col-span-3"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rating" className="text-right">
                Rating
              </Label>
              <Select
                value={formData.rating.toString()}
                onValueChange={(value) => handleSelectChange("rating", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a rating" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <SelectItem key={rating} value={rating.toString()}>
                      {rating} Star{rating !== 1 ? "s" : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="designation" className="text-right">
                Designation
              </Label>
              <Input
                id="designation"
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="workplace" className="text-right">
                Workplace
              </Label>
              <Input
                id="workplace"
                name="workplace"
                value={formData.workplace}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="university" className="text-right">
                University
              </Label>
              <Input
                id="university"
                name="university"
                value={formData.university}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="profileImageUrl" className="text-right">
                Profile Image URL
              </Label>
              <Input
                id="profileImageUrl"
                name="profileImageUrl"
                value={formData.profileImageUrl}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="isActive" className="text-right">
                Active
              </Label>
              <div className="flex items-center space-x-2 col-span-3">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked: boolean) => handleSwitchChange("isActive", checked)}
                />
                <Label htmlFor="isActive">{formData.isActive ? "Yes" : "No"}</Label>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="isFeatured" className="text-right">
                Featured
              </Label>
              <div className="flex items-center space-x-2 col-span-3">
                <Switch
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onCheckedChange={(checked: boolean) => handleSwitchChange("isFeatured", checked)}
                />
                <Label htmlFor="isFeatured">{formData.isFeatured ? "Yes" : "No"}</Label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {currentTestimonial ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this testimonial? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
