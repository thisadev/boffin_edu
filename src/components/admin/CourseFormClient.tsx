"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CourseBasicInfo from "@/components/admin/CourseBasicInfo";
import CourseDetails from "@/components/admin/CourseDetails";
import CoursePricing from "@/components/admin/CoursePricing";
import CourseModules from "@/components/admin/CourseModules";

interface CourseData {
  id?: number;
  title: string;
  shortDescription: string;
  longDescription: string;
  categoryId: number;
  slug: string;
  featuredImageUrl: string;
  galleryImages: string[];
  learningOutcomes: string[];
  prerequisites: string[];
  targetAudience: string;
  level: string;
  deliveryMode: string;
  language: string;
  durationWeeks: number;
  durationHours: number;
  regularPrice: number;
  salePrice: number | null;
  saleStartDate: string | null;
  saleEndDate: string | null;
  status: string;
  modules: any[];
}

interface CourseFormClientProps {
  courseId: string;
}

export default function CourseFormClient({ courseId }: CourseFormClientProps) {
  const router = useRouter();
  const isNewCourse = courseId === "new";
  const [courseData, setCourseData] = useState<CourseData>({
    title: "",
    shortDescription: "",
    longDescription: "",
    categoryId: 0,
    slug: "",
    featuredImageUrl: "",
    galleryImages: [],
    learningOutcomes: [""],
    prerequisites: [""],
    targetAudience: "",
    level: "",
    deliveryMode: "",
    language: "English",
    durationWeeks: 0,
    durationHours: 0,
    regularPrice: 0,
    salePrice: null,
    saleStartDate: null,
    saleEndDate: null,
    status: "draft",
    modules: [],
  });
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState("basic");
  const [isLoading, setIsLoading] = useState(!isNewCourse);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch categories
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/admin/categories");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories");
      }
    };

    // Fetch course data if editing an existing course
    const fetchCourseData = async () => {
      if (isNewCourse) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/admin/courses/${courseId}`);
        if (!response.ok) throw new Error("Failed to fetch course data");
        const data = await response.json();
        setCourseData(data);
      } catch (err) {
        console.error("Error fetching course data:", err);
        setError("Failed to load course data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
    fetchCourseData();
  }, [isNewCourse, courseId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleArrayInputChange = (name: string, index: number, value: string) => {
    const newArray = [...courseData[name as keyof CourseData] as string[]];
    newArray[index] = value;
    setCourseData({ ...courseData, [name]: newArray });
  };

  const handleAddArrayItem = (name: string) => {
    const newArray = [...courseData[name as keyof CourseData] as string[], ""];
    setCourseData({ ...courseData, [name]: newArray });
  };

  const handleRemoveArrayItem = (name: string, index: number) => {
    const newArray = [...courseData[name as keyof CourseData] as string[]];
    newArray.splice(index, 1);
    setCourseData({ ...courseData, [name]: newArray });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      const url = isNewCourse ? "/api/admin/courses" : `/api/admin/courses/${courseId}`;
      const method = isNewCourse ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save course");
      }

      const savedCourse = await response.json();
      if (isNewCourse) {
        router.push(`/admin/courses/${savedCourse.id}`);
      }

      alert(isNewCourse ? "Course created successfully!" : "Course updated successfully!");
    } catch (err) {
      console.error("Error saving course:", err);
      setError(err instanceof Error ? err.message : "An error occurred while saving the course");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          {isNewCourse ? "Create New Course" : `Edit Course: ${courseData.title}`}
        </h1>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-2"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSaving}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save Course"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-4 bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200">
          <nav className="-mb-px flex space-x-6 px-6 py-3" aria-label="Tabs">
            <button
              onClick={() => setActiveTab("basic")}
              className={`${
                activeTab === "basic"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-700 hover:text-gray-800 hover:border-gray-300"
              } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}
            >
              Basic Information
            </button>
            <button
              onClick={() => setActiveTab("details")}
              className={`${
                activeTab === "details"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-700 hover:text-gray-800 hover:border-gray-300"
              } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}
            >
              Course Details
            </button>
            <button
              onClick={() => setActiveTab("pricing")}
              className={`${
                activeTab === "pricing"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-700 hover:text-gray-800 hover:border-gray-300"
              } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}
            >
              Pricing
            </button>
            <button
              onClick={() => setActiveTab("modules")}
              className={`${
                activeTab === "modules"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-700 hover:text-gray-800 hover:border-gray-300"
              } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}
            >
              Modules
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "basic" && (
            <CourseBasicInfo
              courseData={courseData}
              categories={categories}
              handleInputChange={handleInputChange}
              handleArrayInputChange={handleArrayInputChange}
              handleAddArrayItem={handleAddArrayItem}
              handleRemoveArrayItem={handleRemoveArrayItem}
            />
          )}
          {activeTab === "details" && (
            <CourseDetails
              courseData={courseData}
              handleInputChange={handleInputChange}
              handleArrayInputChange={handleArrayInputChange}
              handleAddArrayItem={handleAddArrayItem}
              handleRemoveArrayItem={handleRemoveArrayItem}
            />
          )}
          {activeTab === "pricing" && (
            <CoursePricing courseData={courseData} handleInputChange={handleInputChange} />
          )}
          {activeTab === "modules" && <CourseModules courseData={courseData} setCourseData={setCourseData} />}
        </div>
      </div>
    </div>
  );
}
