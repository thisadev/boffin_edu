export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  validUntil: string; // ISO date string
  minimumPurchase?: number;
  maxUsage?: number;
  currentUsage?: number;
  applicableCourses?: string[]; // Course IDs
  description?: string;
}

export const coupons: Coupon[] = [
  {
    code: 'WELCOME10',
    discountType: 'percentage',
    discountValue: 10,
    validUntil: '2025-12-31',
    description: 'Welcome discount for new students'
  },
  {
    code: 'EARLYBIRD20',
    discountType: 'percentage',
    discountValue: 20,
    validUntil: '2025-06-30',
    description: 'Early bird registration discount'
  },
  {
    code: 'DASACA25',
    discountType: 'percentage',
    discountValue: 25,
    validUntil: '2025-12-31',
    applicableCourses: ['dasaca-foundation', 'dasaca-associate', 'dasaca-professional'],
    description: 'Special discount for DASACA certification courses'
  },
  {
    code: 'FLAT5000',
    discountType: 'fixed',
    discountValue: 5000,
    validUntil: '2025-12-31',
    minimumPurchase: 20000,
    description: 'Flat Rs. 5,000 off on purchases above Rs. 20,000'
  }
];

// Function to validate a coupon code
export const validateCoupon = (code: string, courseId?: string, price?: number): Coupon | null => {
  const coupon = coupons.find(c => c.code === code);
  
  if (!coupon) return null;
  
  // Check if coupon is expired
  if (new Date(coupon.validUntil) < new Date()) return null;
  
  // Check if coupon has reached max usage
  if (coupon.maxUsage && coupon.currentUsage && coupon.currentUsage >= coupon.maxUsage) return null;
  
  // Check if coupon is applicable to the selected course
  if (coupon.applicableCourses && courseId && !coupon.applicableCourses.includes(courseId)) return null;
  
  // Check minimum purchase requirement
  if (coupon.minimumPurchase && price && price < coupon.minimumPurchase) return null;
  
  return coupon;
};

// Function to calculate discount amount
export const calculateDiscount = (coupon: Coupon, price: number): number => {
  if (coupon.discountType === 'percentage') {
    return (price * coupon.discountValue) / 100;
  } else {
    return Math.min(coupon.discountValue, price); // Don't allow discount to exceed price
  }
};
