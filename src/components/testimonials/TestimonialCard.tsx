import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';

type TestimonialCardProps = {
  content: string;
  studentName: string;
  courseName: string;
  designation?: string;
  workplace?: string;
  university?: string;
  profileImageUrl?: string;
  rating: number;
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  content,
  studentName,
  courseName,
  designation,
  workplace,
  university,
  profileImageUrl,
  rating,
}) => {
  // Function to truncate text if it's too long
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <div className="flex flex-col h-full p-6 bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center mb-4">
        <div className="relative w-14 h-14 mr-4 rounded-full overflow-hidden flex-shrink-0 border-2 border-boffin-blue">
          {profileImageUrl ? (
            <Image 
              src={profileImageUrl} 
              alt={studentName} 
              fill 
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-boffin-blue flex items-center justify-center text-white text-xl font-bold">
              {studentName.split(' ').map(name => name[0]).join('')}
            </div>
          )}
        </div>
        <div>
          <h4 className="font-bold text-boffin-background text-lg">{studentName}</h4>
          <p className="text-sm text-gray-600">{courseName}</p>
          {(designation || workplace || university) && (
            <p className="text-xs text-gray-500">
              {designation && <span>{designation}</span>}
              {designation && (workplace || university) && <span> at </span>}
              {workplace && <span>{workplace}</span>}
              {university && <span>{university}</span>}
            </p>
          )}
        </div>
      </div>
      
      <div className="flex mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            className={`${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
      
      <blockquote className="text-gray-700 italic flex-grow">
        <p>"{truncateText(content, 200)}"</p>
      </blockquote>
    </div>
  );
};

export default TestimonialCard;
