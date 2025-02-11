import React, { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { BsSun, BsMoon } from "react-icons/bs";
import "tailwindcss/tailwind.css";

const HelpCenter = () => {
  const { user, dark } = useContext(AuthContext);
  const [isDarkMode, setIsDarkMode] = useState(dark);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`${isDarkMode ? "dark bg-gray-900" : "bg-white"} min-h-screen py-8 px-4`}> 
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Help Center</h1>
          <button
            className="flex items-center bg-gray-200 dark:bg-gray-700 p-2 rounded-lg"
            onClick={toggleDarkMode}
          >
            {isDarkMode ? <BsSun className="text-yellow-400" /> : <BsMoon className="text-gray-600" />} Dark Mode
          </button>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <div key={topic.title} className="p-6 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-4">{topic.icon}</span>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {topic.title}
                </h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{topic.description}</p>
            </div>
          ))}
        </div>

        {/* Sign-Up Section */}
        <div className="mt-12 bg-green-100 dark:bg-green-900 p-8 rounded-2xl shadow-md">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">Want more fundraiser tips?</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            We’ve seen thousands of fundraisers, and we’ve put together a list of our top tips for you.
          </p>
          <div className="flex mt-4 gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="input input-bordered dark:bg-gray-800 dark:text-white w-full max-w-md"
            />
            <button className="btn btn-primary">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;

const topics = [
  {
    title: "Starting and running a fundraiser",
    description: "What to know when creating, launching, and running your fundraiser.",
    icon: "💳",
  },
  {
    title: "Transferring funds",
    description: "All the steps to move funds from your GoFundMe to a bank account.",
    icon: "💵",
  },
  {
    title: "Donations",
    description: "Make, change, or refund a donation.",
    icon: "💎",
  },
  {
    title: "Account settings",
    description: "Keep your GoFundMe account information up to date.",
    icon: "🔑",
  },
  {
    title: "Charity and business",
    description: "Overview of raising funds for a charity or business.",
    icon: "💖",
  },
  {
    title: "Trust and safety",
    description: "Learn about holds and how to report a fundraiser or unrecognized charges.",
    icon: "✈️",
  },
];
