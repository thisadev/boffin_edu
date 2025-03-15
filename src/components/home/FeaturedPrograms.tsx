"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function FeaturedPrograms() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-all hover:shadow-lg">
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 text-boffin-background">DASACA Certification</h3>
          <p className="text-gray-600 mb-4">Our flagship certification program for data science and analytics professionals.</p>
          <Button variant="boffin" asChild className="w-full">
            <Link href="/courses/category/dasaca-certification">Learn More</Link>
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-all hover:shadow-lg">
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 text-boffin-background">Data Analytics Boot Camp</h3>
          <p className="text-gray-600 mb-4">Intensive training program to master essential data analytics skills in weeks.</p>
          <Button variant="boffin" asChild className="w-full">
            <Link href="/courses/category/data-analytics-boot-camp">Learn More</Link>
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-all hover:shadow-lg">
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 text-boffin-background">Corporate Training</h3>
          <p className="text-gray-600 mb-4">Customized data analytics training solutions for organizations and teams.</p>
          <Button variant="boffin" asChild className="w-full">
            <Link href="/courses/category/corporate-training">Learn More</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
