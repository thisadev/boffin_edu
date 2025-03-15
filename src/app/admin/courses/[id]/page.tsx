import CourseFormClient from "@/components/admin/CourseFormClient";

export default function CourseFormPage({ params }: { params: { id: string } }) {
  return <CourseFormClient courseId={params.id} />;
}
