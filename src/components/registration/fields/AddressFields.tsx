import { RegistrationFormData } from '../RegistrationForm';

interface AddressFieldsProps {
  formData: RegistrationFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  title?: string;
}

export default function AddressFields({ formData, handleChange, title = "Address Information" }: AddressFieldsProps) {
  const isBillingAddress = title.includes("Billing");
  
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="mb-4">
        <label htmlFor={isBillingAddress ? "billingAddressLine1" : "address"} className="block text-gray-700 font-medium mb-2">Address Line 1 <span className="text-red-500">*</span></label>
        <input
          type="text"
          id={isBillingAddress ? "billingAddressLine1" : "address"}
          name={isBillingAddress ? "billingAddressLine1" : "address"}
          value={isBillingAddress ? formData.billingAddressLine1 || formData.address : formData.address}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>
      
      {isBillingAddress && (
        <div className="mb-4">
          <label htmlFor="billingAddressLine2" className="block text-gray-700 font-medium mb-2">Address Line 2</label>
          <input
            type="text"
            id="billingAddressLine2"
            name="billingAddressLine2"
            value={formData.billingAddressLine2}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div>
          <label htmlFor={isBillingAddress ? "billingAddressCity" : "city"} className="block text-gray-700 font-medium mb-2">City <span className="text-red-500">*</span></label>
          <input
            type="text"
            id={isBillingAddress ? "billingAddressCity" : "city"}
            name={isBillingAddress ? "billingAddressCity" : "city"}
            value={isBillingAddress ? formData.billingAddressCity || formData.city : formData.city}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor={isBillingAddress ? "billingAddressState" : "state"} className="block text-gray-700 font-medium mb-2">State/Province <span className="text-red-500">*</span></label>
          <input
            type="text"
            id={isBillingAddress ? "billingAddressState" : "state"}
            name={isBillingAddress ? "billingAddressState" : "state"}
            value={isBillingAddress ? formData.billingAddressState || formData.state : formData.state}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor={isBillingAddress ? "billingAddressZipCode" : "zipCode"} className="block text-gray-700 font-medium mb-2">Postal/ZIP Code <span className="text-red-500">*</span></label>
          <input
            type="text"
            id={isBillingAddress ? "billingAddressZipCode" : "zipCode"}
            name={isBillingAddress ? "billingAddressZipCode" : "zipCode"}
            value={isBillingAddress ? formData.billingAddressZipCode || formData.zipCode : formData.zipCode}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor={isBillingAddress ? "billingAddressCountry" : "country"} className="block text-gray-700 font-medium mb-2">Country <span className="text-red-500">*</span></label>
          <input
            type="text"
            id={isBillingAddress ? "billingAddressCountry" : "country"}
            name={isBillingAddress ? "billingAddressCountry" : "country"}
            value={isBillingAddress ? formData.billingAddressCountry || formData.country : formData.country}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
}
