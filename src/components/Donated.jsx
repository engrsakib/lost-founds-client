import React, { useContext, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";

const Donated = () => {
  const data = useLoaderData();
  const { user } = useContext(AuthContext);
  const [donationAmount, setDonationAmount] = useState("");
  const {
    _id,
    name,
    mail,
    title,
    photoURL,
    type,
    description,
    moneyNedd,
    minimumMoney,
    deadline,
  } = data[0];
  const navigete = useNavigate();
  //   console.log(data[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Check if donation amount meets the minimum amount
    if (donationAmount < minimumMoney) {
      Swal.fire({
        icon: "error",
        title: "Donation Faild",
        text: `Minimum donation amount is ${minimumMoney}`,
      });
      return;
    }

    // Prepare data to send to backend
    const donationData = {
      name: user?.name,
      email: user?.mail,
      amount: donationAmount,
      id: _id,
      title: title,
      photoURL: photoURL,
    };

    // Send data to backend
    try {
      const response = await fetch("https://lostserver.vercel.app/myMoney", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donationData),
      });

      if (response.ok) {
        navigete(`/donation/all-campagion/details/${_id}`);
        let timerInterval;
        Swal.fire({
          title: "Donated",
          html: "Donation on processing",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            Swal.fire({
              title: "Success!",
              text: "Donations successfully received",
              html: `<img src="https://img.freepik.com/free-photo/light-bulb-with-drawing-graph_1232-2105.jpg?t=st=1733561936~exp=1733565536~hmac=873ea06faa427f4066a5923ddd86d0c85fd41cd850f3546a3af35a189965aa22&w=826" 
          alt="Custom image" style="width: 100%; height: auto;" />`,
              showConfirmButton: true,
            });
          }
        });
        setDonationAmount(""); // Reset the form
      } else {
        alert("Failed to process donation. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting donation:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto p-6 bg-base-100 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Make a Donation</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name (Read-only) */}
          <div>
            <label className="block text-left text-sm font-medium">Name</label>
            <input
              type="text"
              value={user?.name || "Anonymous"}
              readOnly
              className="input input-bordered w-full"
            />
          </div>

          {/* Email (Read-only) */}
          <div>
            <label className="block text-left text-sm font-medium">Email</label>
            <input
              type="email"
              value={user?.mail || ""}
              readOnly
              className="input input-bordered w-full"
            />
          </div>

          {/* Donation Amount */}
          <div>
            <label className="block text-left text-sm font-medium">
              Donation Amount (৳)
            </label>
            <input
              type="number"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              className="input input-bordered w-full"
              required
              placeholder={`Minimum ৳${minimumMoney}`}
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full">
            Donate
          </button>
        </form>
      </div>
    </>
  );
};

export default Donated;
