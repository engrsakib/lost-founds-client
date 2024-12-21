import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import MyCampCard from "../components/MyCampCard";
import AllCmapTable from "../components/AllCmapTable";
import { Helmet } from "react-helmet";
import Loading from "../components/Loading";

const MyCamo = () => {
  const { user, dark } = useContext(AuthContext);
  const [donation, setDonations] = useState(null);
  const [loadding, setLoadding] = useState(true);

  useEffect(() => {
    if (user?.mail) {
      setLoadding(true);
      fetch(`http://localhost:5000/myDonations/${user.mail}`)
        .then((res) => res.json())
        .then((data) => {
          setDonations(data); // Update state with fetched data
          setLoadding(false); // End loadding
        })
        .catch((err) => {
          console.error(err);
          setLoadding(false); // End loadding even on error
        });
    }
  }, [user?.mail]);

  if (loadding) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <div className="text-center">
        <h2 className="text-4xl font-bold text-orange-500">
          My Campagion {donation.length}
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Title and photo</th>
              <th>Needed</th>
              <th>Types</th>
              <th></th>
              <th>Deadline</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          {donation.map((d, index) => (
            <MyCampCard
              key={index}
              d={d}
              setDonations={setDonations}
            ></MyCampCard>
          ))}
        </table>
      </div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Campagion</title>
      </Helmet>
    </div>
  );
};

export default MyCamo;
