import React from "react";

const ContactForm = () => {
  return (
    <section className="flex flex-col items-center justify-center p-6 lg:px-10 gap-12 max-[425px]:p-0">
      <div className="w-full max-w-screen-lg">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center md:text-left mb-6 lg:mb-10">
          Let's Start a Conversation
        </h2>
        <div className="flex flex-col md:flex-row items-start gap-8 lg:gap-16">
          {/* Contact Info */}
          <div className="w-full md:w-1/2 p-6 bg-gray-100 rounded-lg shadow-md space-y-4">
            <h3 className="text-2xl font-semibold text-indigo-700">
              How We Can Help You
            </h3>
            <p className="leading-relaxed text-gray-700">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non
              saepe quos, natus veritatis, ut delectus ea cumque, cupiditate
              laboriosam recusandae id amet voluptatum in accusamus facilis quo
              placeat magnam quisquam.
            </p>
            <div className="pt-4 space-y-2">
              <h4 className="font-semibold text-gray-900">Our Office</h4>
              <address className="text-gray-700 not-italic leading-relaxed">
                <strong>India:</strong>your home Hyderabad, Telangana, 500081
              </address>
              <p className="text-gray-700 font-semibold">Phone: 7330639555</p>
              <p className="text-gray-700 font-semibold">
                Email: whois@home.com
              </p>
            </div>
          </div>

          {/* Form */}
          <form className="w-full md:w-1/2 space-y-6 p-6 bg-white shadow-lg rounded-lg">
            <div className="flex flex-col">
              <label htmlFor="FN" className="font-semibold text-gray-800">
                First Name
              </label>
              <input
                type="text"
                name="FirstName"
                id="FN"
                required
                className="border border-gray-300 rounded-lg p-3 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="LN" className="font-semibold text-gray-800">
                Last Name
              </label>
              <input
                type="text"
                name="LastName"
                id="LN"
                required
                className="border border-gray-300 rounded-lg p-3 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="mail" className="font-semibold text-gray-800">
                Email
              </label>
              <input
                type="email"
                name="Email"
                id="mail"
                required
                className="border border-gray-300 rounded-lg p-3 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="mess" className="font-semibold text-gray-800">
                Your Message
              </label>
              <textarea
                name="Message"
                id="mess"
                required
                className="border border-gray-300 rounded-lg p-3 text-base resize-none h-24 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-200"
            >
              SUBMIT
            </button>
            <p className="text-center mt-4 text-indigo-600 font-medium"></p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
