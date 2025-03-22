"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Course } from '@/data/courses';
import { validateCoupon, calculateDiscount } from '@/data/coupons';

interface PaymentStepProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  selectedCourse: Course | null;
  setFormComplete: (step: string, isComplete: boolean) => void;
  validationErrors?: { [key: string]: string };
}

const PaymentStep: React.FC<PaymentStepProps> = ({ 
  formData, 
  handleChange,
  selectedCourse,
  setFormComplete,
  validationErrors = {}
}) => {
  const [couponStatus, setCouponStatus] = useState({
    isValid: false,
    message: '',
    discount: 0
  });

  // Validate coupon code
  const validateCouponCode = useCallback((code: string) => {
    if (!selectedCourse) {
      setCouponStatus({
        isValid: false,
        message: 'Please select a course first',
        discount: 0
      });
      return;
    }

    const coupon = validateCoupon(code, selectedCourse.id, selectedCourse.price);
    
    if (coupon) {
      const discountAmount = calculateDiscount(coupon, selectedCourse.price);
      setCouponStatus({
        isValid: true,
        message: `Coupon applied: ${coupon.description || 'Discount'}`,
        discount: discountAmount
      });
    } else {
      setCouponStatus({
        isValid: false,
        message: 'Invalid or expired coupon code',
        discount: 0
      });
    }
  }, [selectedCourse]);

  // Validate coupon code when it changes
  useEffect(() => {
    if (formData.couponCode && typeof formData.couponCode === 'string' && selectedCourse) {
      validateCouponCode(formData.couponCode);
    } else if (!formData.couponCode) {
      // Reset coupon status when coupon code is cleared
      setCouponStatus({
        isValid: false,
        message: '',
        discount: 0
      });
    }
  }, [formData.couponCode, selectedCourse, validateCouponCode]);

  // Check if payment information is complete
  useEffect(() => {
    const isComplete = !!formData.paymentMethod;
    const completionStatus = isComplete;
    
    // Use a callback to update form completion status
    const updateCompletion = () => {
      setFormComplete('payment', completionStatus);
    };
    
    updateCompletion();
  }, [formData.paymentMethod]);

  // Calculate final price
  const calculateFinalPrice = () => {
    if (!selectedCourse) return 0;
    
    const basePrice = selectedCourse.discountPrice || selectedCourse.price;
    return basePrice - couponStatus.discount;
  };

  // Handle apply coupon button click
  const handleApplyCoupon = () => {
    if (formData.couponCode && typeof formData.couponCode === 'string') {
      validateCouponCode(formData.couponCode);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-boffin-primary mb-4">Payment Information</h2>
      
      {/* Course Price Display */}
      {selectedCourse && (
        <div className="mb-6 p-4 bg-gray-50 rounded-md">
          <h3 className="text-lg font-semibold text-boffin-background mb-2">Course Fee Details</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-boffin-background">Selected Course:</span>
              <span className="text-boffin-primary font-medium">{selectedCourse.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-boffin-background">Course Fee:</span>
              <span className="text-boffin-background font-medium">Rs. {selectedCourse.price.toLocaleString()}</span>
            </div>
            
            {selectedCourse.discountPrice && selectedCourse.discountPrice < selectedCourse.price && (
              <div className="flex justify-between">
                <span className="text-boffin-background">Course Discount:</span>
                <span className="text-green-600 font-medium">- Rs. {(selectedCourse.price - selectedCourse.discountPrice).toLocaleString()}</span>
              </div>
            )}
            
            {couponStatus.isValid && couponStatus.discount > 0 && (
              <div className="flex justify-between">
                <span className="text-boffin-background">Coupon Discount:</span>
                <span className="text-green-600 font-medium">- Rs. {couponStatus.discount.toLocaleString()}</span>
              </div>
            )}
            
            <div className="border-t border-gray-300 pt-2 mt-2">
              <div className="flex justify-between font-bold">
                <span className="text-boffin-background">Total Fee:</span>
                <span className="text-boffin-primary">Rs. {calculateFinalPrice().toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Coupon Code */}
      <div className="mb-6">
        <label htmlFor="couponCode" className="block text-boffin-background font-medium mb-2">Coupon Code (if applicable)</label>
        <div className="flex">
          <input
            type="text"
            id="couponCode"
            name="couponCode"
            value={formData.couponCode || ''}
            onChange={handleChange}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md text-boffin-background bg-white focus:outline-none focus:ring-2 focus:ring-boffin-primary focus:border-transparent"
            placeholder="Enter coupon code"
          />
          <button
            type="button"
            onClick={handleApplyCoupon}
            className="px-4 py-2 bg-boffin-primary text-white rounded-r-md hover:bg-boffin-secondary transition duration-200"
          >
            Apply
          </button>
        </div>
        {formData.couponCode && (
          <p className={`mt-2 text-sm ${couponStatus.isValid ? 'text-green-600' : 'text-red-500'}`}>
            {couponStatus.message}
          </p>
        )}
      </div>
      
      {/* Payment Method */}
      <div>
        <label className="block text-boffin-background font-medium mb-2">Payment Method <span className="text-red-500">*</span></label>
        <div className="space-y-3">
          <div className="flex items-center">
            <input
              type="radio"
              id="payment-myfees"
              name="paymentMethod"
              value="myfees"
              checked={formData.paymentMethod === 'myfees'}
              onChange={handleChange}
              className="h-4 w-4 text-boffin-primary focus:ring-boffin-primary"
            />
            <label htmlFor="payment-myfees" className="ml-2 block text-boffin-background">
              Pay using MyFees.lk
              <a 
                href="https://myfees.lk/?schoolid=135" 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-2 text-boffin-primary hover:text-boffin-secondary underline"
              >
                Visit MyFees.lk
              </a>
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="payment-bank"
              name="paymentMethod"
              value="bank_transfer"
              checked={formData.paymentMethod === 'bank_transfer'}
              onChange={handleChange}
              className="h-4 w-4 text-boffin-primary focus:ring-boffin-primary"
            />
            <label htmlFor="payment-bank" className="ml-2 block text-boffin-background">
              Direct Bank Transfer
            </label>
          </div>
        </div>
        
        {formData.paymentMethod === 'bank_transfer' && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <h4 className="font-medium text-boffin-background mb-2">Bank Account Details:</h4>
            <p className="text-boffin-background">Bank: Commercial Bank of Ceylon PLC</p>
            <p className="text-boffin-background">Account Name: Boffin Institute of Data Science</p>
            <p className="text-boffin-background">Account Number: 1234567890</p>
            <p className="text-boffin-background">Branch: Colombo</p>
            <p className="text-boffin-background mt-2">Please include your name and course name as reference.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentStep;
