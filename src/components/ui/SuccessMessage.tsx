import React from 'react';
import Link from 'next/link';

interface SuccessMessageProps {
  title: string;
  message: string;
  onClose?: () => void;
  buttonText?: string;
  onButtonClick?: () => void;
  buttonHref?: string;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ 
  title, 
  message, 
  onClose, 
  buttonText, 
  onButtonClick,
  buttonHref 
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
        <div className="flex items-center justify-center mb-6">
          <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">{title}</h2>
        <p className="text-center text-gray-700 mb-6">{message}</p>
        
        <div className="flex justify-center space-x-4">
          {buttonText && buttonHref && (
            <Link href={buttonHref}>
              <button
                className="px-6 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                {buttonText}
              </button>
            </Link>
          )}
          
          {buttonText && onButtonClick && !buttonHref && (
            <button
              onClick={onButtonClick}
              className="px-6 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              {buttonText}
            </button>
          )}
          
          {onClose && (
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;
