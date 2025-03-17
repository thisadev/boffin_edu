import { RegistrationFormData } from '../RegistrationForm';

interface MailingAddressFieldsProps {
  formData: RegistrationFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function MailingAddressFields({ formData, handleChange, handleCheckboxChange }: MailingAddressFieldsProps) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Mailing Address</h3>
      
      <div className="mb-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="sameAsBillingAddress"
            name="sameAsBillingAddress"
            checked={formData.sameAsBillingAddress}
            onChange={handleCheckboxChange}
            className="mr-2 h-5 w-5 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label htmlFor="sameAsBillingAddress" className="text-gray-700 font-medium">
            Same as billing address
          </label>
        </div>
      </div>
      
      {!formData.sameAsBillingAddress && (
        <>
          <div className="mb-4">
            <label htmlFor="mailingAddressLine1" className="block text-gray-700 font-medium mb-2">Address Line 1 <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="mailingAddressLine1"
              name="mailingAddressLine1"
              value={formData.mailingAddressLine1}
              onChange={handleChange}
              required={!formData.sameAsBillingAddress}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="mailingAddressLine2" className="block text-gray-700 font-medium mb-2">Address Line 2</label>
            <input
              type="text"
              id="mailingAddressLine2"
              name="mailingAddressLine2"
              value={formData.mailingAddressLine2}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label htmlFor="mailingAddressCity" className="block text-gray-700 font-medium mb-2">City <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="mailingAddressCity"
                name="mailingAddressCity"
                value={formData.mailingAddressCity}
                onChange={handleChange}
                required={!formData.sameAsBillingAddress}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="mailingAddressState" className="block text-gray-700 font-medium mb-2">State/Province <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="mailingAddressState"
                name="mailingAddressState"
                value={formData.mailingAddressState}
                onChange={handleChange}
                required={!formData.sameAsBillingAddress}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="mailingAddressZipCode" className="block text-gray-700 font-medium mb-2">Postal/ZIP Code <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="mailingAddressZipCode"
                name="mailingAddressZipCode"
                value={formData.mailingAddressZipCode}
                onChange={handleChange}
                required={!formData.sameAsBillingAddress}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="mailingAddressCountry" className="block text-gray-700 font-medium mb-2">Country <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="mailingAddressCountry"
                name="mailingAddressCountry"
                value={formData.mailingAddressCountry}
                onChange={handleChange}
                required={!formData.sameAsBillingAddress}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
