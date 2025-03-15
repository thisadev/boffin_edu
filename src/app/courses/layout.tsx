export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container-custom py-16">
        {children}
      </div>
    </div>
  )
}
