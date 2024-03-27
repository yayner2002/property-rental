"use client";

import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

const PropertyContactForm = ({ property }) => {
  const [contacFormFields, setContactFormFields] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [wasSubmitted, setWasSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, phone, message } = contacFormFields;

    const messageData = {
      name,
      email,
      phone,
      message,
      property: property._id,
      recipient: property.owner,
    };

    console.log(messageData);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    setContactFormFields({
      ...contacFormFields,
      [name]: value,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
      {wasSubmitted ? (
        <p className="text-green-700 mb-4 font-bold">
          Your message has been sent successfully!
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              name="name"
              value={contacFormFields.name}
              onChange={handleChange}
              type="text"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              value={contacFormFields.email}
              onChange={handleChange}
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              name="phone"
              value={contacFormFields.phone}
              onChange={handleChange}
              type="text"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="message"
            >
              Message:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
              id="message"
              name="message"
              value={contacFormFields.message}
              onChange={handleChange}
              placeholder="Enter your message"
            ></textarea>
          </div>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
              type="submit"
            >
              <FaPaperPlane className="mr-2" /> Send Message
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PropertyContactForm;
