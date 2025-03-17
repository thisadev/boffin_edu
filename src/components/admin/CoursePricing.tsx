import React from "react";

interface CoursePricingProps {
  courseData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const CoursePricing: React.FC<CoursePricingProps> = ({ courseData, handleInputChange }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-md px-4 py-5 sm:p-6 border border-gray-100">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Pricing Information</h3>
            <p className="mt-1 text-sm text-gray-600">
              Set the pricing details for this course, including any promotional offers.
            </p>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="regularPrice" className="block text-sm font-medium text-gray-700 mb-1">
                  Regular Price*
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    name="regularPrice"
                    id="regularPrice"
                    value={courseData.regularPrice || ""}
                    onChange={handleInputChange}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border border-gray-300 rounded-md text-gray-900 bg-white py-2 px-3"
                    placeholder="0.00"
                    aria-describedby="price-currency"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm" id="price-currency">
                      {courseData.currency || "LKR"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="salePrice" className="block text-sm font-medium text-gray-700 mb-1">
                  Sale Price
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    name="salePrice"
                    id="salePrice"
                    value={courseData.salePrice || ""}
                    onChange={handleInputChange}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border border-gray-300 rounded-md text-gray-900 bg-white py-2 px-3"
                    placeholder="0.00"
                    aria-describedby="sale-price-currency"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm" id="sale-price-currency">
                      {courseData.currency || "LKR"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="saleStartDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Sale Start Date
                </label>
                <input
                  type="date"
                  name="saleStartDate"
                  id="saleStartDate"
                  value={courseData.saleStartDate || ""}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md text-gray-900 bg-white py-2 px-3"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="saleEndDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Sale End Date
                </label>
                <input
                  type="date"
                  name="saleEndDate"
                  id="saleEndDate"
                  value={courseData.saleEndDate || ""}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md text-gray-900 bg-white py-2 px-3"
                />
              </div>

              {/* Currency */}
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
                  Currency
                </label>
                <select
                  id="currency"
                  name="currency"
                  value={courseData.currency || "LKR"}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                >
                  <option value="LKR" className="text-gray-900 bg-white">LKR (Sri Lankan Rupee)</option>
                  <option value="USD" className="text-gray-900 bg-white">USD (US Dollar)</option>
                  <option value="EUR" className="text-gray-900 bg-white">EUR (Euro)</option>
                  <option value="GBP" className="text-gray-900 bg-white">GBP (British Pound)</option>
                </select>
              </div>

              {/* Payment Options */}
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="paymentOptions" className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Options
                </label>
                <select
                  id="paymentOptions"
                  name="paymentOptions"
                  value={courseData.paymentOptions || ""}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                >
                  <option value="" className="text-gray-900 bg-white">Select payment option</option>
                  <option value="FULL_PAYMENT" className="text-gray-900 bg-white">Full Payment</option>
                  <option value="INSTALLMENTS" className="text-gray-900 bg-white">Installments</option>
                  <option value="BOTH" className="text-gray-900 bg-white">Both</option>
                </select>
              </div>

              {/* Installment Options */}
              <div className="col-span-6">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="installmentsAvailable"
                      name="installmentsAvailable"
                      type="checkbox"
                      checked={courseData.installmentsAvailable || false}
                      onChange={(e) => {
                        handleInputChange({
                          target: {
                            name: e.target.name,
                            value: e.target.checked,
                          },
                        } as any);
                      }}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="installmentsAvailable" className="font-medium text-gray-700">
                      Installment Payment Available
                    </label>
                    <p className="text-gray-600">Check if this course can be paid in installments</p>
                  </div>
                </div>
              </div>

              {/* Installment Details */}
              {courseData.installmentsAvailable && (
                <>
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="installmentCount" className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Installments
                    </label>
                    <input
                      type="number"
                      name="installmentCount"
                      id="installmentCount"
                      min="2"
                      max="12"
                      value={courseData.installmentCount || 2}
                      onChange={handleInputChange}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md text-gray-900 bg-white py-2 px-3"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="installmentPrice" className="block text-sm font-medium text-gray-700 mb-1">
                      Price Per Installment ($)
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="number"
                        name="installmentPrice"
                        id="installmentPrice"
                        min="0"
                        step="0.01"
                        value={courseData.installmentPrice || 0}
                        onChange={handleInputChange}
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border border-gray-300 rounded-md text-gray-900 bg-white py-2 px-3"
                        placeholder="0.00"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm" id="installment-price-currency">
                          {courseData.currency || "LKR"}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Early Bird Discount */}
              <div className="col-span-6">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="earlyBirdAvailable"
                      name="earlyBirdAvailable"
                      type="checkbox"
                      checked={courseData.earlyBirdAvailable || false}
                      onChange={(e) => {
                        handleInputChange({
                          target: {
                            name: e.target.name,
                            value: e.target.checked,
                          },
                        } as any);
                      }}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="earlyBirdAvailable" className="font-medium text-gray-700">
                      Early Bird Discount Available
                    </label>
                    <p className="text-gray-600">Check if this course offers an early bird discount</p>
                  </div>
                </div>
              </div>

              {/* Early Bird Details */}
              {courseData.earlyBirdAvailable && (
                <>
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="earlyBirdPrice" className="block text-sm font-medium text-gray-700 mb-1">
                      Early Bird Price ($)
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="number"
                        name="earlyBirdPrice"
                        id="earlyBirdPrice"
                        min="0"
                        step="0.01"
                        value={courseData.earlyBirdPrice || 0}
                        onChange={handleInputChange}
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border border-gray-300 rounded-md text-gray-900 bg-white py-2 px-3"
                        placeholder="0.00"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm" id="early-bird-price-currency">
                          {courseData.currency || "LKR"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="earlyBirdDeadline" className="block text-sm font-medium text-gray-700 mb-1">
                      Early Bird Deadline
                    </label>
                    <input
                      type="date"
                      name="earlyBirdDeadline"
                      id="earlyBirdDeadline"
                      value={courseData.earlyBirdDeadline || ""}
                      onChange={handleInputChange}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md text-gray-900 bg-white py-2 px-3"
                    />
                  </div>
                </>
              )}

              {/* Group Discount */}
              <div className="col-span-6">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="groupDiscountAvailable"
                      name="groupDiscountAvailable"
                      type="checkbox"
                      checked={courseData.groupDiscountAvailable || false}
                      onChange={(e) => {
                        handleInputChange({
                          target: {
                            name: e.target.name,
                            value: e.target.checked,
                          },
                        } as any);
                      }}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="groupDiscountAvailable" className="font-medium text-gray-700">
                      Group Discount Available
                    </label>
                    <p className="text-gray-600">Check if this course offers discounts for group enrollments</p>
                  </div>
                </div>
              </div>

              {/* Group Discount Details */}
              {courseData.groupDiscountAvailable && (
                <>
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="groupDiscountMinSize" className="block text-sm font-medium text-gray-700 mb-1">
                      Minimum Group Size
                    </label>
                    <input
                      type="number"
                      name="groupDiscountMinSize"
                      id="groupDiscountMinSize"
                      min="2"
                      value={courseData.groupDiscountMinSize || 2}
                      onChange={handleInputChange}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md text-gray-900 bg-white py-2 px-3"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="groupDiscountPercentage" className="block text-sm font-medium text-gray-700 mb-1">
                      Discount Percentage (%)
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="number"
                        name="groupDiscountPercentage"
                        id="groupDiscountPercentage"
                        min="0"
                        max="100"
                        value={courseData.groupDiscountPercentage || 0}
                        onChange={handleInputChange}
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pr-12 sm:text-sm border border-gray-300 rounded-md text-gray-900 bg-white py-2 px-3"
                        placeholder="0"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">%</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePricing;
