import React, { useContext, useEffect, useState } from "react";
import MyCampCard from "./MyCampCard";
import { AuthContext } from "../provider/AuthProvider";
import MyFund from "../pages/MyFund";
import ActiveCard from "./ActiveCard";

const ActiveDon = () => {
  const { user } = useContext(AuthContext);
  const [donation, setDonations] = useState(null);
  const [loadding, setLoadding] = useState(true);

  useEffect(() => {
    setLoadding(true);
    fetch(`http://localhost:5000/activeDonations`)
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
        <h2 className="text-4xl font-bold text-orange-500">Active Donations</h2>
        <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          ActiveCampaign is a powerful customer experience automation (CXA)
          platform that integrates email marketing, marketing automation, sales
          automation, and customer relationship management (CRM) tools into a
          single platform. It is widely used by businesses of all sizes to
          improve engagement, nurture leads, and drive customer retention. Below
          are the key details about ActiveCampaign:
        </p>
      </div>

      <section className="grid mt-3 lg:grid-cols-3 gap-4 md:grid-cols-2 grid-1 gap-cols-4">
        {donation.map((fund) => (
          <ActiveCard key={fund._id} fund={fund}></ActiveCard>
        ))}
      </section>
    </div>
  );
};

export default ActiveDon;
