import React, { useContext, useEffect, useState } from "react";
import MyCampCard from "./MyCampCard";
import { AuthContext } from "../provider/AuthProvider";
import MyFund from "../pages/MyFund";
import ActiveCard from "./ActiveCard";
import { Link } from "react-router-dom";

const ActiveDon = () => {
  const { user } = useContext(AuthContext);
  const [donation, setDonations] = useState(null);
  const [loadding, setLoadding] = useState(true);

  useEffect(() => {
    setLoadding(true);
    fetch(`https://lostserver.vercel.app/lostandfinds/sort`)
      .then((res) => res.json())
      .then((data) => {
        setDonations(data); // Update state with fetched data
        setLoadding(false); // End loadding
      })
      .catch((err) => {
        console.error(err);
        setLoadding(false); // End loadding even on error
      });
  }, []);
  if (loadding) {
    return;
  }
  //   console.log(donation)
  return (
    <div>
      <div className="text-center">
        <h2 className="text-4xl font-bold text-orange-500">Active Item's</h2>
        <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          A Lost & Found Recovery System is designed to assist individuals in
          locating and recovering lost items. It streamlines the process of
          reporting lost belongings, verifying ownership, and ensuring secure
          handover to rightful owners. Such systems foster transparency, reduce
          disputes, and enhance user trust by ensuring a seamless recovery
          experience. Would you like help developing a similar system?
        </p>
      </div>

      <section className="grid mt-3 lg:grid-cols-3 gap-4 md:grid-cols-2 grid-1 gap-cols-4">
        {donation.map((fund) => (
          <ActiveCard key={fund._id} fund={fund}></ActiveCard>
        ))}
      </section>
      <div className="flex justify-end mt-4">
        <Link
          to={`finds-losts/all-finds`}
          className="btn btn-secondary justify-end"
        >
          see all
        </Link>
      </div>
    </div>
  );
};

export default ActiveDon;
