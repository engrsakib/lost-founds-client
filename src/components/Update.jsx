import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const Update = () => {
  const updateData = useLoaderData();
  // console.log(updateData)
  const {
    _id,
    name,
    mail,
    deadline,
    moneyNedd,
    minimumMoney,
    title,
    photoURL,
    type,
    description,
  } = updateData;
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: user.name, // Static data for demonstration
    mail: user.mail,
    title: title,
    photoURL: photoURL,
    type: type,
    description: description,
    moneyNedd: moneyNedd,
    minimumMoney: minimumMoney,
    deadline: deadline,
  });

  // Handle form field updates
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const response = await fetch(
          `http://localhost:5000/donationsUpadte/${_id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          }
        );

        if (response.ok) {
          const result = await response.json();
          Swal.fire("Saved!", "", "success");
          // console.log("Server Response:", result);
          setFormData({
            name: user.name,
            mail: user.mail,
            title: "",
            photoURL: "",
            type: "",
            description: "",
            moneyNedd: "",
            minimumMoney: "",
            deadline: "",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            //   footer: '<a href="#">Why do I have this issue?</a>',
          });
        }
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
  return (
    <>
      <div className="max-w-3xl mx-auto p-6 bg-base-200 rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-orange-500">Edit Campagion</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="label">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              readOnly
              className="input input-bordered w-full"
            />
          </div>

          {/* Email */}
          <div>
            <label className="label">Email</label>
            <input
              type="text"
              name="mail"
              value={formData.mail}
              readOnly
              className="input input-bordered w-full"
            />
          </div>

          {/* Title */}
          <div>
            <label className="label">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter a title"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="label">Photo URL</label>
            <input
              type="text"
              name="photoURL"
              value={formData.photoURL}
              onChange={handleChange}
              placeholder="Enter photo URL"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Type */}
          <div>
            <label className="label">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="select select-bordered w-full"
              required
            >
              <option disabled value="">
                Select a type
              </option>
              <option value="personal">Personal</option>
              <option value="business">Business</option>
              <option value="startup">Startup</option>
              <option value="creative">Creative</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="label">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter a description"
              className="textarea textarea-bordered w-full"
              required
            />
          </div>

          {/* Money Neaded */}
          <div>
            <label className="label">Money Neaded</label>
            <input
              type="number"
              name="moneyNedd"
              value={formData.moneyNedd}
              onChange={handleChange}
              placeholder="Enter the minimum money required"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Minimum Money */}
          <div>
            <label className="label">Minimum Money</label>
            <input
              type="number"
              name="minimumMoney"
              value={formData.minimumMoney}
              onChange={handleChange}
              placeholder="Enter the minimum money required"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Deadline */}
          <div>
            <label className="label">Deadline</label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
              max={
                new Date(new Date().setDate(new Date().getDate() + 240))
                  .toISOString()
                  .split("T")[0]
              } // Current date + 240 days as the maximum
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button type="submit" className="btn btn-primary w-full">
              Update
            </button>
          </div>
        </form>
      </div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Update Campagion</title>
      </Helmet>
    </>
  );
};

export default Update;
