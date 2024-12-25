import React, { useContext, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import DatePicker from "react-datepicker";
import useAxiosSecure from "../auth/useAxiosSecure";

const Update = () => {
  const updateData = useLoaderData();
  const [categoryInput, setCategoryInput] = useState("");
  const navigate = useNavigate();
  // console.log(updateData)
  const axiosSecure = useAxiosSecure();

  const {
    _id,
    name,
    mail,
    categoryArray,
    dateLost,
    lostlocation,
    title,
    photoURL,
    type,
    description,
  } = updateData;

  console.log(updateData);
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: user.name, // Static data for demonstration
    mail: user.mail,
    title: title,
    photoURL: photoURL,
    type: type,
    description: description,
    categoryArray: categoryArray,
    dateLost: dateLost,
    lostlocation: lostlocation,
  });

  // Handle form field updates
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // handle date change
  const handleDateChange = (date) => {
    setFormData({ ...formData, dateLost: date });
  };

  // Handle category input
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategoryInput(value);
    if (value.includes(",")) {
      const categories = value
        .split(",")
        .map((cat) => cat.trim())
        .filter((cat) => cat !== "");
      setFormData({
        ...formData,
        categoryArray: [...formData.categoryArray, ...categories],
      });
      setCategoryInput("");
    }
  };

  const removeCategory = (index) => {
    const updatedCategories = formData.categoryArray.filter(
      (_, idx) => idx !== index
    );
    setFormData({ ...formData, categoryArray: updatedCategories });
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
          `https://lostserver.vercel.app/itemsUpadte/${_id}`,
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
            categoryArray: "",
            dateLost: "",
            lostlocation: "",
          });
          setCategoryInput("");
          navigate(`/lost-finds/all/details/${_id}`);
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
              <option value="lost">Lost</option>
              <option value="found">Found</option>
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

          {/* category */}
          <div>
            <label className="label">Category</label>
            <input
              type="text"
              value={categoryInput}
              onChange={handleCategoryChange}
              placeholder="Type and press comma"
              className="input input-bordered w-full"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.categoryArray.map((cat, index) => (
                <div
                  key={index}
                  className="badge badge-primary flex items-center gap-2"
                >
                  {cat}
                  <button
                    type="button"
                    className="btn btn-xs btn-circle btn-error"
                    onClick={() => removeCategory(index)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Lost location */}
          <div>
            <label className="label">Lost Location</label>
            <input
              type="text"
              name="lostlocation"
              value={formData.lostlocation}
              onChange={handleChange}
              placeholder="Enter the pickup location"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Deadline */}
          <div>
            <label className="label">Date Lost</label>
            <DatePicker
              selected={formData.dateLost}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              className="input input-bordered w-full"
              required
              maxDate={new Date()} // Disable future dates
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
        <title>Update Items</title>
      </Helmet>
    </>
  );
};

export default Update;
