import React from "react";

const NewVendor = () => {
  return (
    <div className="Container ">
      <form method="POST" enctype="multipart/form-data" action="backend.php">
        <div className="px-8 py-6 flex flex-col items-center justify-center bg-gray-50 rounded-lg shadow-lg max-w-4xl mx-auto mt-10 space-y-10">
          {/*1. Vendor Information Section */}
          <section className="space-y-6 p-7 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800">
              1. Vendor Information
            </h2>

            <div className="form-group mb-4">
              <label
                htmlFor="vendorName"
                className="block text-gray-700 font-medium mb-1"
              >
                Vendor Name:
              </label>
              <input
                name="vendorName"
                type="text"
                id="vendorName"
                placeholder="Enter Vendor Name"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <small className="text-gray-500">
                The official name of the catering vendor.
              </small>
            </div>

            {/* More fields in Vendor Information section... */}
            {/* Contact Person */}
            <div className="form-group mb-4">
              <label
                htmlFor="contactPerson"
                className="block text-gray-700 font-medium mb-1"
              >
                Contact Person:
              </label>
              <input
                name="contactPerson"
                type="text"
                id="contactPerson"
                placeholder="Enter Contact Person"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <small className="text-gray-500">
                Primary contact for the vendor.
              </small>
            </div>

            {/* Operating Regions */}
            <div className="form-group mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Operating Regions:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Banjara Hills",
                  "Uppal",
                  "Secunderabad",
                  "Dilsukhnagar",
                  "Jubilee Hills",
                  "Madhapur",
                  "Gachibowli",
                  "KPHB",
                ].map((region) => (
                  <div key={region} className="checkbox-item flex items-center">
                    <input
                      type="checkbox"
                      id={region.toLowerCase().replace(/\s+/g, "")}
                      name="operatingRegions[]"
                      value={region}
                      className="mr-2 rounded text-indigo-500 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor={region.toLowerCase().replace(/\s+/g, "")}
                      className="text-gray-700"
                    >
                      {region}
                    </label>
                  </div>
                ))}
              </div>
              <small className="text-gray-500">
                Geographical areas where the vendor provides services.
              </small>
            </div>
          </section>

          {/* Licensing & Compliance Section */}
          <section className="space-y-6  p-7 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800">
              2. Licensing & Compliance
            </h2>

            {/* Business License Number */}
            <div className="form-group mb-4">
              <label
                htmlFor="businessLicense"
                className="block text-gray-700 font-medium mb-1"
              >
                Business License Number:
              </label>
              <input
                name="businessLicense"
                type="text"
                id="businessLicense"
                placeholder="Enter License Number"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Health Certifications */}
            <div className="form-group mb-4">
              <label
                htmlFor="healthCertifications"
                className="block text-gray-700 font-medium mb-1"
              >
                Health Certifications:
              </label>
              <input
                name="healthCertifications"
                type="file"
                id="healthCertifications"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Liability Insurance */}
            <div className="form-group mb-4">
              <label
                htmlFor="liabilityInsurance"
                className="block text-gray-700 font-medium mb-1"
              >
                Liability Insurance:
              </label>
              <input
                name="liabilityInsurance"
                type="file"
                id="liabilityInsurance"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Liquor License */}
            <div className="form-group mb-4">
              <label
                htmlFor="liquorLicense"
                className="block text-gray-700 font-medium mb-1"
              >
                Liquor License (if applicable):
              </label>
              <input
                name="liquorLicense"
                type="file"
                id="liquorLicense"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* License Expiry Date */}
            <div className="form-group mb-4">
              <label
                htmlFor="licenseExpiry"
                className="block text-gray-700 font-medium mb-1"
              >
                License Expiry Date:
              </label>
              <input
                name="licenseExpiry"
                type="date"
                id="licenseExpiry"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </section>
          {/* Services Offered */}
          <section className="space-y-6 p-7  bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800">
              3. Services Offered
            </h2>

            {/* Service Types */}
            <div className="form-group mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Service Types:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "buffet", label: "Buffet" },
                  { id: "platedMeal", label: "Plated Meal" },
                  { id: "foodStations", label: "Food Stations" },
                  { id: "cocktailReceptions", label: "Cocktail Receptions" },
                  { id: "bartendingServices", label: "Bartending Services" },
                  { id: "onSiteCooking", label: "On-site Cooking" },
                ].map((service) => (
                  <div
                    key={service.id}
                    className="checkbox-item flex items-center"
                  >
                    <input
                      type="checkbox"
                      id={service.id}
                      name="services[]"
                      value={service.label}
                      className="mr-2 rounded text-indigo-500 focus:ring-indigo-500"
                    />
                    <label htmlFor={service.id} className="text-gray-700">
                      {service.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Dietary Accommodations */}
            <div className="form-group mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Dietary Accommodations:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "vegan", label: "Vegan" },
                  { id: "vegetarian", label: "Vegetarian" },
                  { id: "glutenFree", label: "Gluten-Free" },
                  { id: "halal", label: "Halal" },
                  { id: "kosher", label: "Kosher" },
                  { id: "nutFree", label: "Nut-Free" },
                  { id: "lactoseFree", label: "Lactose-Free" },
                ].map((diet) => (
                  <div
                    key={diet.id}
                    className="checkbox-item flex items-center"
                  >
                    <input
                      type="checkbox"
                      id={diet.id}
                      name="dietaryAccommodations[]"
                      value={diet.label}
                      className="mr-2 rounded text-indigo-500 focus:ring-indigo-500"
                    />
                    <label htmlFor={diet.id} className="text-gray-700">
                      {diet.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Alcohol Services */}
            <div className="form-group mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Alcohol Services:
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center text-gray-700">
                  <input
                    type="radio"
                    name="alcoholServices"
                    value="yes"
                    className="mr-2 rounded text-indigo-500 focus:ring-indigo-500"
                  />
                  Yes
                </label>
                <label className="flex items-center text-gray-700">
                  <input
                    type="radio"
                    name="alcoholServices"
                    value="no"
                    className="mr-2 rounded text-indigo-500 focus:ring-indigo-500"
                  />
                  No
                </label>
              </div>
            </div>

            {/* Additional Services */}
            <div className="form-group mb-4">
              <label
                htmlFor="additionalServices"
                className="block text-gray-700 font-medium mb-1"
              >
                Additional Services:
              </label>
              <textarea
                name="additionalServices"
                id="additionalServices"
                placeholder="Any other services the vendor offers (e.g., table rentals, decor, custom cakes)"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
            </div>
          </section>

          {/* Menu Options */}
          <section className="space-y-6 p-7 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              4. Menu Options
            </h2>

            <div className="form-group mb-4">
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Menu Categories:
              </label>
              <div className="flex flex-wrap gap-4">
                {[
                  "Appetizers",
                  "Entrees",
                  "Desserts",
                  "Beverages",
                  "Special Dietary Menus",
                ].map((category) => (
                  <div
                    className="checkbox-item flex items-center space-x-2"
                    key={category}
                  >
                    <input
                      name="menuCategories[]"
                      type="checkbox"
                      id={category.toLowerCase()}
                      value={category}
                      className="w-5 h-5 text-indigo-600 bg-gray-200 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <label
                      htmlFor={category.toLowerCase()}
                      className="text-gray-700"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group mb-4">
              <label
                htmlFor="menuUpload"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Menu Upload:
              </label>
              <input
                name="menuUpload"
                type="file"
                id="menuUpload"
                className="w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="sampleMenus"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Sample Menus:
              </label>
              <textarea
                name="sampleMenus"
                id="sampleMenus"
                placeholder="Upload example menus or provide a description of available menu options"
                className="w-full h-32 px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
            </div>
          </section>

          {/* pricing and payment terms */}
          <section className="space-y-6 p-7 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              5. Pricing and Payment Terms
            </h2>

            <div className="form-group mb-4">
              <label
                htmlFor="pricingStructure"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Pricing Structure:
              </label>

              <div className="input-group flex items-center mb-4 space-x-4">
                <label htmlFor="perPlate" className="w-32 text-gray-700">
                  Per Plate:
                </label>
                <input
                  name="PerPlate"
                  type="number"
                  id="perPlate"
                  placeholder="Enter price per plate"
                  className="w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="input-group flex items-center mb-4 space-x-4">
                <label htmlFor="perEvent" className="w-32 text-gray-700">
                  Per Event:
                </label>
                <input
                  name="PerEvent"
                  type="number"
                  id="perEvent"
                  placeholder="Enter price per event"
                  className="w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="form-group mb-4">
              <label
                htmlFor="paymentTerms"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Payment Terms:
              </label>
              <textarea
                name="paymentTerms"
                id="paymentTerms"
                placeholder="Describe the payment terms (e.g., deposit, final payment due dates)"
                className="w-full h-32 px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
            </div>

            <div className="form-group mb-4">
              <label
                htmlFor="discounts"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Discounts (if applicable):
              </label>
              <textarea
                name="discounts"
                id="discounts"
                placeholder="Provide details of any discounts offered (e.g., seasonal discounts, large group discounts)"
                className="w-full h-32 px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
            </div>

            <div className="form-group">
              <label
                htmlFor="refundPolicy"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Refund Policy:
              </label>
              <textarea
                name="refundPolicy"
                id="refundPolicy"
                placeholder="Provide the vendor's refund policy"
                className="w-full h-32 px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
            </div>
          </section>

          {/* Availability and Scheduling */}
          <section className="section p-6 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              6. Availability and Scheduling
            </h2>

            <div className="form-group mb-4">
              <label
                htmlFor="availabilityDates"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Available Dates:
              </label>
              <input
                name="availabilityDates"
                type="date"
                id="availabilityDates"
                className="w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="form-group mb-4">
              <label
                htmlFor="bookingLeadTime"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Booking Lead Time:
              </label>
              <textarea
                name="bookingLeadTime"
                id="bookingLeadTime"
                placeholder="How much lead time is required for booking? (e.g., 2 weeks, 1 month)"
                className="w-full h-32 px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
            </div>

            <div className="form-group">
              <label
                htmlFor="peakSeason"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Peak Season Dates (if applicable):
              </label>
              <textarea
                name="peakSeason"
                id="peakSeason"
                placeholder="Specify peak seasons or busy periods (e.g., summer, holidays)"
                className="w-full h-32 px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
            </div>
          </section>

          {/* Reviews and testimonals */}
          <section className="section p-6 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              7. Reviews and Testimonials
            </h2>

            <div className="form-group mb-4">
              <label
                htmlFor="clientReviews"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Client Reviews:
              </label>
              <textarea
                name="clientReviews"
                id="clientReviews"
                placeholder="Enter client testimonials or reviews"
                className="w-full h-32 px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
            </div>

            <div className="form-group mb-4">
              <label
                htmlFor="ratings"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Average Ratings:
              </label>
              <input
                name="ratings"
                type="number"
                id="ratings"
                min="1"
                max="5"
                step="0.1"
                placeholder="Rate out of 5"
                className="w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="form-group mb-4">
              <label
                htmlFor="reviewUpload"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Upload Review Documents (optional):
              </label>
              <input
                name="reviewUpload"
                type="file"
                id="reviewUpload"
                className="w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </section>

          {/* Previous Event Experience */}
          <section className="section p-6 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              8. Previous Event Experience
            </h2>

            <div className="form-group mb-4">
              <label
                htmlFor="eventExperience"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Previous Events Catered:
              </label>
              <textarea
                name="eventExperience"
                id="eventExperience"
                placeholder="List the events this vendor has catered for (e.g., weddings, corporate events, etc.)"
                className="w-full h-32 px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
            </div>

            <div className="form-group mb-4">
              <label
                htmlFor="eventPhotos"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Upload Cover Photo:
              </label>
              <input
                name="eventPhotos"
                type="file"
                id="eventPhotos"
                multiple
                className="w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </section>

          {/* Vendor Reputation  */}
          <section className="section p-6 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              9. Vendor Reputation and Awards
            </h2>

            <div className="form-group mb-4">
              <label
                htmlFor="awards"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Awards and Recognitions:
              </label>
              <textarea
                name="awards"
                id="awards"
                placeholder="List any awards or recognitions the vendor has received"
                className="w-full h-32 px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
            </div>

            <div className="form-group mb-4">
              <label
                htmlFor="pressCoverage"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Press Coverage:
              </label>
              <textarea
                name="pressCoverage"
                id="pressCoverage"
                placeholder="Include any press coverage about the vendor (e.g., magazine features, TV appearances)"
                className="w-full h-32 px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
            </div>
          </section>

          {/* Social Media  */}
          <section className="section p-6 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              10. Social Media and Marketing
            </h2>

            <div className="form-group mb-4">
              <label
                htmlFor="socialMediaLinks"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Social Media Links:
              </label>
              <textarea
                name="socialMediaLinks"
                id="socialMediaLinks"
                placeholder="Enter the vendor's social media profiles (e.g., Instagram, Facebook)"
                className="w-full h-32 px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
            </div>

            <div className="form-group mb-4">
              <label
                htmlFor="marketingMaterials"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Upload Marketing Materials (optional):
              </label>
              <input
                name="marketingMaterials"
                type="file"
                id="marketingMaterials"
                multiple
                className="w-full text-gray-700 bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </section>

          {/* Additional Notes and Comments  */}
          <section className="section p-6 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              11. Additional Notes and Comments
            </h2>

            <div className="form-group mb-4">
              <label
                htmlFor="additionalNotes"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Additional Notes:
              </label>
              <textarea
                name="additionalNotes"
                id="additionalNotes"
                placeholder="Add any other relevant information about the vendor"
                className="w-full h-32 px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
            </div>
          </section>

          <section className="section p-6 bg-gray-50 rounded-lg shadow-md">
            <label
              htmlFor="files"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Select files to upload in Portfolio:
            </label>
            <input
              type="file"
              name="files[]"
              id="files"
              multiple
              required
              className="mb-4 block w-full text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="submit"
              value="Submit"
              className="mx-auto block px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </section>
        </div>
      </form>
    </div>
  );
};

export default NewVendor;
