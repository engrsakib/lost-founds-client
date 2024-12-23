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

  const [card, isCard] = useState(true);
  console.log(card);

  useEffect(() => {
    if (user?.mail) {
      setLoadding(true);
      fetch(`http://localhost:5000/myitems/${user.mail}`)
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
      <div className="text-center flex justify-between max-sm:flex-col items-center gap-2">
        <h2 className="text-4xl font-bold text-orange-500">
          My Items {donation.length}
        </h2>

        <div className="space-x-6 flex gap-3 justify-center items-center max-sm:flex-col">
          <div className="join">
            <button
              onClick={() => {
                isCard(true);
              }}
              className={`join-item btn ${card ? "btn-primary" : ""}`}
              aria-label="Radio 3"
              disabled={card}
            >
              Card Layout
            </button>
            <button
              onClick={() => {
                isCard(false);
              }}
              className={`join-item btn ${card ? "" : "btn-primary"}`}
              disabled={!card}
              aria-label="Radio 3"
            >
              Table Layout
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Title and photo</th>
              <th>Lost Location</th>
              <th></th>
              <th>Types</th>
              <th>Date Lost</th>
              <th></th>
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
        <title>My Items</title>
      </Helmet>
    </div>
  );
};

export default MyCamo;
