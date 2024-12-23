import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Details = () => {
  const { dark } = useContext(AuthContext);
  const data = useLoaderData();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const {
    _id,
    name,
    mail,
    title,
    photoURL,
    type,
    description,
    categoryArray,
    dateLost,
    lostlocation,
  } = data[0];

  // States for modal
  const [isModalOpen, setModalOpen] = useState(false);
  const [recoveredLocation, setRecoveredLocation] = useState("");
  const [recoveredDate, setRecoveredDate] = useState(new Date());

  const [ recoverData, setRecoveredData ] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/recovered-item/${_id}`).then((res) => {
      setRecoveredData(res.data);
    });
  }, [_id, setRecoveredData]);

  console.log(recoverData);

  const checkUser = () => {
    if (recoverData?.itemId == _id) {
      Swal.fire({
        icon: "error",
        title: "Already Recovered",
        text: `Item already recovered!`,
      });
      return;
    }
    if (mail === user.mail) {
      Swal.fire({
        icon: "error",
        title: "Recovery Failed",
        text: `You can't recover your own item!`,
      });
      return;
    }
    
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    const recoveryData = {
      itemId: _id,
      name: user.name,
      email: user.mail,
      image: user.photoURL,
      location: recoveredLocation,
      dateRecovered: recoveredDate,
    };

    try {
      const recoveryResponse = await fetch(
        "http://localhost:5000/api/recovered-items",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(recoveryData),
        }
      );

      // const statusResponse = await fetch(
      //   `http://localhost:5000/api/items/${_id}`,
      //   {
      //     method: "PATCH",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ status: "recovered" }),
      //   }
      // );

      if (recoveryResponse.ok) {
        Swal.fire("Success!", "Item marked as recovered!", "success");
        setModalOpen(false); // Close the modal
      } else {
        Swal.fire("Error", "Failed to mark item as recovered", "error");
      }
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Details</title>
      </Helmet>

      <div className="flex flex-col lg:flex-row gap-8 px-6 lg:px-16 py-8">
        {/* Left Section */}
        <div className="flex-1">
          <img
            src={photoURL}
            alt="Item"
            className="rounded-lg shadow-md w-full h-[400px] object-cover"
          />
          <h1 className="text-3xl font-bold mt-4">{title}</h1>
          <div
            className={`${
              type === "found" ? "bg-green-400" : "bg-red-400"
            } mt-4 p-4 rounded-md`}
          >
            <p className="text-sm font-medium">{type}</p>
          </div>
          <p className={`${dark ? "text-gray-200" : "text-gray-800"} mt-4`}>
            {description}
          </p>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold">User Details</h2>
          <p className="text-gray-600">
            Name: {name} <br /> Mail: {mail}
          </p>

          {type === "lost" ? (
            <button
              
              className="btn btn-primary w-full my-4"
              onClick={checkUser}
            >
              Found This!
            </button>
          ) : (
            <button
              
              className="btn btn-primary w-full my-4"
              onClick={checkUser}
            >
              This is Mine!
            </button>
          )}

          <h3 className="mt-6 text-lg font-semibold">Other Information</h3>
          <ul className="mt-4 space-y-2">
            <li className="flex justify-between">
              <p className="font-medium">Lost Date</p>
              <p className="text-gray-500">
                {new Date(dateLost).toLocaleDateString("en-GB")}
              </p>
            </li>
            <li className="flex justify-between">
              <p className="font-medium">Lost Location</p>
              <p className="text-gray-500">{lostlocation}</p>
            </li>
            <li className="flex justify-between">
              <p className="font-medium">Categories</p>
              <ul className="text-gray-500 text-left list-disc ml-6">
                {categoryArray?.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Mark as Recovered</h3>
            <div className="mt-4">
              <label className="label">
                <span className="label-text">Recovered Location</span>
              </label>
              <input
                type="text"
                placeholder="Enter location"
                className="input input-bordered w-full"
                value={recoveredLocation}
                onChange={(e) => setRecoveredLocation(e.target.value)}
              />

              <label className="label mt-4">
                <span className="label-text">Recovered Date</span>
              </label>
              <DatePicker
                selected={recoveredDate}
                onChange={(date) => setRecoveredDate(date)}
                className="input input-bordered w-full"
                popperPlacement="bottom-start"
                popperModifiers={[
                  {
                    name: "preventOverflow",
                    options: {
                      boundary: "viewport",
                    },
                  },
                ]}
              />

              <div className="mt-4">
                <p className="text-sm">
                  <strong>Recovered By:</strong>
                </p>
                <p>Name: {user.name}</p>
                <p>Email: {user.mail}</p>
              </div>
            </div>

            <div className="modal-action">
              <button
                className="btn btn-ghost"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Details;
