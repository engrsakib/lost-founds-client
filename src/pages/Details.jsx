import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ca } from "date-fns/locale";

const Details = () => {
  const { dark } = useContext(AuthContext);
  const data = useLoaderData();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
console.log(user)
  const {
    _id,
    name,
    mail,
    itemId,
    title,
    user_name,
    photoURL,
    type,
    description,
    categoryArray,
    dateRecovered,
    location,
    user_photo,
    email,
    dateLost,
    lostlocation,
  } = data[0];

  // console.log(dateRecovered);
  // States for modal
  const [isModalOpen, setModalOpen] = useState(false);
  const [recoveredLocation, setRecoveredLocation] = useState("");
  const [recoveredDate, setRecoveredDate] = useState(new Date());
  const [rec, setRec] = useState(null);
  const [ recoverData, setRecoveredData ] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/recovered-item/${_id}`).then((res) => {
      setRec(res.data);
    });
  }, [_id, setRec]);

  
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/recovered-item/${itemId}`)
      .then((res) => {
        setRecoveredData(res.data);
      });
  }, [itemId, setRecoveredData]);

  // console.log("recoverData", recoverData);

  const checkUser = () => {
    if (rec?.itemId == _id || recoverData?._id == _id) {
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
      user_name: user.name,
      email: user.mail,
      user_photo: user.photo,
      image: user.photoURL,
      mail: mail,
      name: name,
      type: type,
      location: recoveredLocation,
      dateRecovered: recoveredDate,
      title: title,
      photoURL: photoURL,
      dateLost: dateLost,
      lostlocation: lostlocation,
      description: description,
      categoryArray: categoryArray,
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

        
          axios
            .get(`http://localhost:5000/api/recovered-item/${_id}`)
            .then((res) => {
              setRec(res.data);
            });

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
            <p className="text-sm text-black font-medium">{type}</p>
          </div>
          <p className={`${dark ? "text-gray-200" : "text-gray-800"} mt-4`}>
            {description}
          </p>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold">Contact Information</h2>
          <p className="text-gray-600">
            Name: {name} <br /> Mail: {mail}
          </p>

          {type === "lost" ? (
            <button className="btn btn-primary w-full my-4" onClick={checkUser}>
              Found This!
            </button>
          ) : (
            <button className="btn btn-primary w-full my-4" onClick={checkUser}>
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
            {dateRecovered && (
              <li className="flex justify-between">
                <p className="font-medium">Recovered Date</p>
                <p className="text-gray-500">
                  {new Date(dateRecovered).toLocaleDateString("en-GB")}
                </p>
              </li>
            )}
            {categoryArray && (
              <li className="flex justify-between">
                <p className="font-medium">Categories</p>
                <ul className="text-gray-500 text-left list-disc ml-6">
                  {categoryArray?.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </li>
            )}
            <h1 className="mt-6 text-lg font-semibold">
              Recoverer Information
            </h1>

            {user_photo && (
              <li className="flex justify-between">
                <img className="w-[450px] rounded-2xl" src={user_photo} alt="" />
              </li>
            )}

            {user_name && (
              <li className="flex justify-between">
                <p className="font-medium">Recovered Person Name:</p>
                <p className="text-gray-500">{user_name}</p>
              </li>
            )}
            {email && (
              <li className="flex justify-between">
                <p className="font-medium">Recovered Person Mail:</p>
                <p className="text-gray-500">{email}</p>
              </li>
            )}

            {dateRecovered && (
              <li className="flex justify-between">
                <p className="font-medium">Recovered Date</p>
                <p className="text-gray-500">
                  {new Date(dateRecovered).toLocaleDateString("en-GB")}
                </p>
              </li>
            )}

            {location && (
              <li className="flex justify-between">
                <p className="font-medium">Recovered Location</p>
                <p className="text-gray-500">{location}</p>
              </li>
            )}
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
                minDate={new Date()}
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
                <p>Name: {user?.name}</p>
                <p>Email: {user?.mail}</p>
                <img
                  className="w-24 h-24 mx-auto mt-3 rounded-full"
                  src={user?.photo}
                  alt="user photo"
                />
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
