import React, { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Link } from "react-router-dom";


const WeightLossSection = () => {
  const { dark } = useContext(AuthContext);

  return (
    <div
      className={`flex flex-col mt-4 lg:flex-row items-center justify-between px-6 py-12 ${
        dark ? "bg-gray-800 text-white" : "bg-[#fff7f3] text-gray-800"
      }`}
    >
      {/* Text Section */}
      <div className="lg:w-1/2 space-y-6">
        <h1
          className={`text-4xl lg:text-5xl font-bold leading-tight ${
            dark ? "text-white" : "text-gray-800"
          }`}
        >
          We work to{" "}
          <span
            className={`italic ${dark ? "text-gray-300" : "text-gray-500"}`}
          >
            to help you find your,
          </span>{" "}
          lost product
        </h1>
        <ul className="space-y-3">
          <li className="flex items-start space-x-2">
            <span
              className={`text-xl ${
                dark ? "text-green-400" : "text-green-600"
              }`}
            >
              ✔
            </span>
            <p
              className={`${dark ? "text-gray-300" : "text-gray-600"} text-lg`}
            >
              Finding lost products
            </p>
          </li>
          <li className="flex items-start space-x-2">
            <span
              className={`text-xl ${
                dark ? "text-green-400" : "text-green-600"
              }`}
            >
              ✔
            </span>
            <p
              className={`${dark ? "text-gray-300" : "text-gray-600"} text-lg`}
            >
              Expert advice on lost products
            </p>
          </li>
          <li className="flex items-start space-x-2">
            <span
              className={`text-xl ${
                dark ? "text-green-400" : "text-green-600"
              }`}
            >
              ✔
            </span>
            <p
              className={`${dark ? "text-gray-300" : "text-gray-600"} text-lg`}
            >
              Plan personalized for you
            </p>
          </li>
        </ul>
        <Link
          className={`btn btn-primary px-6 py-3 rounded-md ${
            dark ? "bg-white text-gray-800" : "bg-black text-white"
          }`}
          to={`/donation/add-campagion`}
        >
          Get started →
        </Link>
      </div>

      {/* Product Showcase */}
      <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-center items-center">
        <div className="relative">
          <img
            src="https://img.freepik.com/free-photo/portrait-young-woman-holding-paper-craft-bags-standing-high-quality-photo_2831-10541.jpg?t=st=1734807232~exp=1734810832~hmac=f5b0a0921396850197a348b71db1760b40519b2da523964e44bd98d7d6871afb&w=1380"
            alt="Phone Mockup"
            className="m-3 h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default WeightLossSection;
