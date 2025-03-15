import React from "react";

interface CoursePricingProps {
  courseData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const CoursePricing: React.FC<CoursePricingProps> = ({ courseData, handleInputChange }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Pricing Information</h3>
            <p className="mt-1 text-sm text-gray-500">
              Set the pricing details for this course, including any promotional offers.
            </p>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="regularPrice" className="block text-sm font-medium text-gray-700">
                  Regular Price ($)*
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    name="regularPrice"
                    id="regularPrice"
                    min="0"
                    step="0.01"
                    value={courseData.regularPrice || 0}
                    onChange={handleInputChange}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="salePrice" className="block text-sm font-medium text-gray-700">
                  Sale Price ($)
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    name="salePrice"
                    id="salePrice"
                    min="0"
                    step="0.01"
                    value={courseData.salePrice || ""}
                    onChange={handleInputChange}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    placeholder="0.00"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Leave empty if there is no sale price.
                </p>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="saleStartDate" className="block text-sm font-medium text-gray-700">
                  Sale Start Date
                </label>
                <input
                  type="date"
                  name="saleStartDate"
                  id="saleStartDate"
                  value={courseData.saleStartDate || ""}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="saleEndDate" className="block text-sm font-medium text-gray-700">
                  Sale End Date
                </label>
                <input
                  type="date"
                  name="saleEndDate"
                  id="saleEndDate"
                  value={courseData.saleEndDate || ""}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
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
                    <p className="text-gray-500">Check if this course can be paid in installments</p>
                  </div>
                </div>
              </div>
              
              {/* Installment Details */}
              {courseData.installmentsAvailable && (
                <>
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="installmentCount" className="block text-sm font-medium text-gray-700">
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
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="installmentPrice" className="block text-sm font-medium text-gray-700">
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
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                        placeholder="0.00"
                      />
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
                    <p className="text-gray-500">Check if this course offers an early bird discount</p>
                  </div>
                </div>
              </div>
              
              {/* Early Bird Details */}
              {courseData.earlyBirdAvailable && (
                <>
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="earlyBirdPrice" className="block text-sm font-medium text-gray-700">
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
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="earlyBirdDeadline" className="block text-sm font-medium text-gray-700">
                      Early Bird Deadline
                    </label>
                    <input
                      type="date"
                      name="earlyBirdDeadline"
                      id="earlyBirdDeadline"
                      value={courseData.earlyBirdDeadline || ""}
                      onChange={handleInputChange}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                    <p className="text-gray-500">Check if this course offers a discount for group registrations</p>
                  </div>
                </div>
              </div>
              
              {/* Group Discount Details */}
              {courseData.groupDiscountAvailable && (
                <>
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="groupDiscountMinSize" className="block text-sm font-medium text-gray-700">
                      Minimum Group Size
                    </label>
                    <input
                      type="number"
                      name="groupDiscountMinSize"
                      id="groupDiscountMinSize"
                      min="2"
                      value={courseData.groupDiscountMinSize || 2}
                      onChange={handleInputChange}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="groupDiscountPercentage" className="block text-sm font-medium text-gray-700">
                      Discount Percentage (%)
                    </label>
                    <input
                      type="number"
                      name="groupDiscountPercentage"
                      id="groupDiscountPercentage"
                      min="1"
                      max="100"
                      value={courseData.groupDiscountPercentage || 10}
                      onChange={handleInputChange}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
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
