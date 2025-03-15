"use client";

import Link from 'next/link';
import PlaceholderImage from '@/components/ui/PlaceholderImage';

interface CategoryCardProps {
  category: {
    id: number;
    name: string;
    description: string | null;
    slug: string;
    imageUrl: string | null;
    courseCount: number;
  };
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link 
      href={`/courses/category/${category.slug}`}
      className="group block bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <div className="relative h-48 w-full">
        <PlaceholderImage 
          src={category.imageUrl || ''} 
          fallbackSrc="/images/category-placeholder.jpg"
          alt={category.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-boffin-background/80 to-transparent flex items-end">
          <h3 className="text-white text-xl font-bold p-6">{category.name}</h3>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-700 line-clamp-2">{category.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-500">{category.courseCount} course{category.courseCount !== 1 ? 's' : ''}</span>
          <span className="text-boffin-primary font-medium text-sm">View Courses →</span>
        </div>
      </div>
    </Link>
  );
}
