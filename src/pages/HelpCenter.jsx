import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";
import "tailwindcss/tailwind.css";
import { Helmet } from "react-helmet";

const topics = [
  {
    title: "Reporting Lost Items",
    description: "Learn how to report your lost items and increase the chances of recovery.",
    icon: "📢",
  },
  {
    title: "Claiming Found Items",
    description: "Follow steps to verify and claim items that have been found and reported.",
    icon: "🎒",
  },
  {
    title: "Community Alerts",
    description: "Stay updated with alerts about recently lost and found items in your community.",
    icon: "🔔",
  },
  {
    title: "Account Settings",
    description: "Manage your account information and notification preferences.",
    icon: "⚙️",
  },
  {
    title: "Tips for Prevention",
    description: "Learn practical tips to avoid losing your belongings in the first place.",
    icon: "💡",
  },
  {
    title: "Trust and Verification",
    description: "Know how to verify the authenticity of claims and build trust within the community.",
    icon: "🛡️",
  },
];

const HelpCenter = () => {
  const { user, dark } = useContext(AuthContext);
  const [isDarkMode, setIsDarkMode] = useState(dark);
  const [email, setEmail] = useState("");
  console.log(user)
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSubscribe = () => {
    if (!email) {
      Swal.fire({
        title: "Error!",
        text: "Please enter your email address.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      Swal.fire({
        title: "Subscribed!",
        text: "Thank you for subscribing to our lost-found tips.",
        icon: "success",
        confirmButtonText: "Awesome!",
      });
      setEmail("");
    }
  };

  return (
    <div className={`${isDarkMode ? "dark " : ""} min-h-screen py-8 px-4`}>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Help Center
          </h1>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <div
              key={topic.title}
              className="p-6 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-lg"
            >
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-4">{topic.icon}</span>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {topic.title}
                </h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                {topic.description}
              </p>
            </div>
          ))}
        </div>

        {/* Sign-Up Section */}
        <div className="mt-12 bg-green-100 dark:bg-green-900 p-8 rounded-2xl shadow-md">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Want more lost-founds tips?
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            We’ve seen thousands of volunteers, and we’ve put together a list
            of our top tips for you.
          </p>
          <div className="flex mt-4 gap-4 justify-center items-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="input input-bordered dark:bg-gray-800 dark:text-white w-full max-w-md"
            />
            <button onClick={handleSubscribe} className="btn btn-primary">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <Helmet>
        <title>Help Center</title>
      </Helmet>
    </div>
  );
};

export default HelpCenter;
