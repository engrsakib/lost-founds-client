import React, { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosSecure from "../auth/useAxiosSecure";

const AddCap = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: user.name,
    mail: user.mail,
    title: "",
    photoURL: "",
    type: "",
    description: "",
    categoryArray: [],
    lostlocation: "", // String or number depending on the input format
    dateLost: new Date(),
  });
  const [imageUploading, setImageUploading] = useState(false);
  const [categoryInput, setCategoryInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [photoUrlInput, setPhotoUrlInput] = useState("");
  const axiosSecure = useAxiosSecure();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, dateLost: date });
  };

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
      setCategoryInput(""); // Clear the input after adding categories
    }
  };

  const removeCategory = (index) => {
    const updatedCategories = formData.categoryArray.filter(
      (_, idx) => idx !== index
    );
    setFormData({ ...formData, categoryArray: updatedCategories });
  };

  const handleImageUpload = async (file) => {
    if (!file) return;

    // Restrict file types to png, jpeg, and jpg
    const allowedFileTypes = /\.(png|jpe?g)$/i;
    if (!allowedFileTypes.test(file.name)) {
      Swal.fire({
        icon: "error",
        title: "Invalid File Type",
        text: "Only PNG, JPEG, and JPG files are allowed.",
      });
      return;
    }

    if (file.size > 1024 * 1024) {
      Swal.fire({
        icon: "error",
        title: "File too large",
        text: "Please upload an image less than 1MB.",
      });
      return;
    }

    const imageData = new FormData();
    imageData.append("image", file);

    setImageUploading(true);
    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=ff3d9127cce3eed275891ef32d478736`,
        {
          method: "POST",
          body: imageData,
        }
      );

      const result = await response.json();

      if (result.success) {
        setFormData({ ...formData, photoURL: result.data.display_url });
        Swal.fire({
          icon: "success",
          title: "Image Uploaded",
          text: "Image uploaded successfully!",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Upload Failed",
          text: "There was an issue uploading the image. Please try again.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setImageUploading(false);
      setIsModalOpen(false); // Close modal
    }
  };

  const handlePhotoUrlChange = (e) => {
    setPhotoUrlInput(e.target.value);
  };

  const handleSetPhotoUrl = () => {
    setFormData({ ...formData, photoURL: photoUrlInput });
    setPhotoUrlInput(""); // Clear input after setting the URL
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure lostlocation is either a number or a valid string
    const location = formData.lostlocation;
    const payload = {
      ...formData,
      category: formData.categoryArray, // Send category as an array
      lostlocation: location,
    };

    Swal.fire({
      title: "Do you want to save?",
      showDenyButton: true,
      confirmButtonText: "Save",
      denyButtonText: "Don't save",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await fetch(
          "https://lostserver.vercel.app/lostandfinds",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );

        if (response.ok) {
          Swal.fire("Saved!", "", "success");
          setFormData({
            name: user.name,
            mail: user.mail,
            title: "",
            photoURL: "",
            type: "",
            description: "",
            categoryArray: [],
            lostlocation: "",
            dateLost: new Date(),
          });
          setCategoryInput(""); // Clear category input
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
      } else if (result.isDenied) {
        Swal.fire("Data not saved", "", "info");
      }
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-base-200 rounded-lg shadow-lg">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-orange-500">
          Add Lost & Found Item
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
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

        <div>
          <label className="label">Photo</label>
          <button
            type="button"
            className="btn btn-outline btn-primary w-full"
            onClick={() => setIsModalOpen(true)}
          >
            Choose Photo
          </button>
          {formData.photoURL && (
            <img
              src={formData.photoURL}
              alt="Uploaded"
              className="mt-2 rounded-md"
              style={{ maxWidth: "100px", maxHeight: "100px" }}
            />
          )}
        </div>

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

        <div className="text-center">
          <button type="submit" className="btn btn-primary w-full">
            Submit
          </button>
        </div>
      </form>

      <Helmet>
        <meta charSet="utf-8" />
        <title>Add Lost & Found Item</title>
      </Helmet>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Choose Image</h3>
            <div className="mt-4 space-y-4">
              <div>
                <label className="label">Upload File</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e.target.files[0])}
                  className="file-input file-input-bordered w-full"
                />
              </div>
              <div>
                <h1>OR</h1>
              </div>
              <div>
                <label className="label">Photo URL</label>
                <input
                  type="text"
                  value={formData.photoURL}
                  onChange={(e) =>
                    setFormData({ ...formData, photoURL: e.target.value })
                  }
                  placeholder="Paste photo URL"
                  className="input input-bordered w-full"
                />
              </div>
            </div>
            <div className="modal-action">
              <button
                className="btn btn-outline btn-error"
                onClick={() => setIsModalOpen(false)}
              >
                Open/Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCap;
