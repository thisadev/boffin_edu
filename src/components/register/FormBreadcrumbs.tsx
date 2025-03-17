"use client";

import React from 'react';

interface Step {
  id: string;
  title: string;
}

interface FormBreadcrumbsProps {
  steps: Step[];
  currentStep: number;
  completedSteps: Record<string, boolean>;
  onStepClick: (index: number) => void;
}

const FormBreadcrumbs: React.FC<FormBreadcrumbsProps> = ({
  steps,
  currentStep,
  completedSteps,
  onStepClick
}) => {
  return (
    <div className="w-full py-4 mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isActive = currentStep === index;
          const isCompleted = completedSteps[step.id];
          const isClickable = index < currentStep || isCompleted;
          
          return (
            <React.Fragment key={step.id}>
              {/* Step circle */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => isClickable && onStepClick(index)}
                  disabled={!isClickable}
                  className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed'} ${
                    isActive
                      ? 'bg-boffin-primary text-white'
                      : isCompleted
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {isCompleted && !isActive ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </button>
                <span className={`mt-2 text-sm ${isActive ? 'text-boffin-primary font-medium' : 'text-gray-500'}`}>
                  {step.title}
                </span>
              </div>
              
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div 
                  className={`flex-1 h-1 mx-2 ${index < currentStep ? 'bg-green-500' : 'bg-gray-200'}`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default FormBreadcrumbs;
