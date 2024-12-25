import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import MyCampCard from "../components/MyCampCard";
import AllCmapTable from "../components/AllCmapTable";
import { Helmet } from "react-helmet";
import Loading from "../components/Loading";
import axios from "axios";
import useAxiosSecure from "../auth/useAxiosSecure";

const MyCamo = () => {
  const { user, dark } = useContext(AuthContext);
  const [donation, setDonations] = useState([]);
  const [loadding, setLoadding] = useState(true);


  console.log(user)
  // const [card, isCard] = useState(true);
  // console.log(card);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    if (user?.mail) {
      setLoadding(true);

      axiosSecure
        .get(`/myitems/${user.mail}`)
        .then((data) => {
          setDonations(data.data); 
          setLoadding(false); 
        })
        .catch((err) => {
          console.error(err);
          setLoadding(false);
        });
    }
  }, [user?.mail, axiosSecure]);

  if (loadding) {
    return <Loading></Loading>;
  }

  if (donation.length == 0) {
    return (
      <div>
        <div className="text-center">
          <h2 className="text-4xl font-bold text-orange-500">My Items</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            <img
              src="https://i.ibb.co.com/ZX9b5F5/no-data-concept-illustration-114360-25063.jpg"
              alt=""
            />
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="text-center flex justify-between max-sm:flex-col items-center gap-2">
          <h2 className="text-4xl font-bold text-orange-500">
            My Items {donation.length}
          </h2>
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
            {donation &&
              donation.map((d, index) => (
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
  }
};

export default MyCamo;
