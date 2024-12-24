import React, { useState, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider"; // Import the context

const FAQ = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const { dark } = useContext(AuthContext); // Access the dark mode value

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Form Data Submitted: ", formData);
    // Add your form submission logic here
  };

  const faqs = [
    {
      question: "What is the purpose of this website?",
      answer:
        "This website is designed to help users connect, find, and recover lost items through community support.",
    },
    {
      question: "How can I report a lost item?",
      answer:
        "You can report a lost item by navigating to the 'Lost Items' section and filling out the provided form.",
    },
    {
      question: "Is there a fee to use this platform?",
      answer: "No, our platform is completely free to use for all users.",
    },
    {
      question: "How do I contact support?",
      answer:
        "You can contact support by filling out the feedback form below or emailing us directly at support@example.com.",
    },
  ];

  return (
    <div
      className={`py-16 mt-4 rounded-xl px-8 ${
        dark ? "bg-gray-800 text-gray-200" : "bg-gray-50 text-gray-800"
      }`}
    >
      {/* FAQ Section */}
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center text-orange-500">
          Frequently Asked Questions
        </h2>
        <div className="mt-10 space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`p-6 rounded shadow ${
                dark ? "bg-gray-700 text-gray-300" : "bg-white"
              }`}
            >
              <h3 className="text-lg font-semibold">{faq.question}</h3>
              <p className="mt-2">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback Form */}
      <div
        className={`mt-16 container mx-auto p-8 rounded shadow ${
          dark ? "bg-gray-700 text-gray-300" : "bg-white"
        }`}
      >
        <h2 className="text-2xl font-bold mb-4">Feedback</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-3 rounded border ${
                dark
                  ? "bg-gray-800 text-gray-300 border-gray-600 focus:ring-orange-500 focus:border-orange-500"
                  : "bg-white border-gray-300 focus:ring-orange-500 focus:border-orange-500"
              }`}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 rounded border ${
                dark
                  ? "bg-gray-800 text-gray-300 border-gray-600 focus:ring-orange-500 focus:border-orange-500"
                  : "bg-white border-gray-300 focus:ring-orange-500 focus:border-orange-500"
              }`}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={`w-full p-3 rounded border ${
                dark
                  ? "bg-gray-800 text-gray-300 border-gray-600 focus:ring-orange-500 focus:border-orange-500"
                  : "bg-white border-gray-300 focus:ring-orange-500 focus:border-orange-500"
              } h-32`}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-orange-500 text-white py-2 px-6 rounded hover:bg-orange-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FAQ;
