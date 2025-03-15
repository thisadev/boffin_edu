export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-boffin-background min-h-screen">
      <div className="container-custom">
        {children}
      </div>
    </div>
  )
}
