import { useState, useEffect } from 'react';
import { Course } from '@/data/courses';
import { validateCoupon, calculateDiscount } from '@/data/coupons';
import { RegistrationFormData } from '../RegistrationForm';

interface PaymentFieldsProps {
  formData: RegistrationFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  selectedCourse: Course | null;
}

export default function PaymentFields({ formData, handleChange, selectedCourse }: PaymentFieldsProps) {
  const [couponStatus, setCouponStatus] = useState({
    isValid: false,
    message: '',
    discount: 0
  });

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
  }, [formData.couponCode, selectedCourse]);

  // Validate coupon code
  const validateCouponCode = (code: string) => {
    if (!selectedCourse) {
      setCouponStatus({
        isValid: false,
        message: 'Please select a course before applying a coupon',
        discount: 0
      });
      return;
    }
    
    const coupon = validateCoupon(code, selectedCourse.id, selectedCourse.price);
    
    if (coupon) {
      const discountAmount = calculateDiscount(coupon, selectedCourse.price);
      setCouponStatus({
        isValid: true,
        message: `Coupon applied: ${coupon.description}`,
        discount: discountAmount
      });
    } else {
      setCouponStatus({
        isValid: false,
        message: 'Invalid or expired coupon code',
        discount: 0
      });
    }
  };
  
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
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Information</h3>
      
      {/* Course Price Display */}
      {selectedCourse && (
        <div className="mb-6 p-4 bg-gray-50 rounded-md">
          <h4 className="font-medium text-gray-800 mb-2">Course Fee Details</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-700">Selected Course:</span>
              <span className="text-primary font-medium">{selectedCourse.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Course Fee:</span>
              <span className="text-gray-700 font-medium">Rs. {selectedCourse.price.toLocaleString()}</span>
            </div>
            
            {selectedCourse.discountPrice && selectedCourse.discountPrice < selectedCourse.price && (
              <div className="flex justify-between">
                <span className="text-gray-700">Course Discount:</span>
                <span className="text-green-600 font-medium">- Rs. {(selectedCourse.price - selectedCourse.discountPrice).toLocaleString()}</span>
              </div>
            )}
            
            {couponStatus.isValid && couponStatus.discount > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-700">Coupon Discount:</span>
                <span className="text-green-600 font-medium">- Rs. {couponStatus.discount.toLocaleString()}</span>
              </div>
            )}
            
            <div className="border-t border-gray-300 pt-2 mt-2">
              <div className="flex justify-between font-bold">
                <span className="text-gray-700">Total Fee:</span>
                <span className="text-primary">Rs. {calculateFinalPrice().toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Coupon Code */}
      <div className="mb-6">
        <label htmlFor="couponCode" className="block text-gray-700 font-medium mb-2">Coupon Code (if applicable)</label>
        <div className="flex">
          <input
            type="text"
            id="couponCode"
            name="couponCode"
            value={formData.couponCode || ''}
            onChange={handleChange}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Enter coupon code"
          />
          <button
            type="button"
            onClick={handleApplyCoupon}
            className="px-4 py-2 bg-primary text-white rounded-r-md hover:bg-secondary transition duration-200"
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
        <label className="block text-gray-700 font-medium mb-2">Payment Method</label>
        <div className="space-y-3">
          <div className="flex items-center">
            <input
              type="radio"
              id="payment-myfees"
              name="paymentMethod"
              value="myfees"
              checked={formData.paymentMethod === 'myfees'}
              onChange={handleChange}
              className="h-4 w-4 text-primary focus:ring-primary"
            />
            <label htmlFor="payment-myfees" className="ml-2 block text-gray-700">
              Pay using MyFees.lk
              <a 
                href="https://myfees.lk/?schoolid=135" 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-2 text-primary hover:text-secondary underline"
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
              className="h-4 w-4 text-primary focus:ring-primary"
            />
            <label htmlFor="payment-bank" className="ml-2 block text-gray-700">
              Direct Bank Transfer
            </label>
          </div>
        </div>
        
        {formData.paymentMethod === 'bank_transfer' && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <h4 className="font-medium text-gray-800 mb-2">Bank Account Details:</h4>
            <p className="text-gray-700">Bank: Commercial Bank of Ceylon PLC</p>
            <p className="text-gray-700">Account Name: Boffin Institute of Data Science</p>
            <p className="text-gray-700">Account Number: 1234567890</p>
            <p className="text-gray-700">Branch: Colombo</p>
            <p className="text-gray-700 mt-2">Please include your name and course name as reference.</p>
          </div>
        )}
      </div>
    </div>
  );
}
