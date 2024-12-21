import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import MyFund from "./MyFund";
import { Helmet } from "react-helmet";
import Loading from "../components/Loading";
import axios from "axios";

const MyDonation = () => {
  const { user, dark } = useContext(AuthContext);
  const [donation, setDonations] = useState(null);
  const [loadding, setLoadding] = useState(true);

  useEffect(() => {
    if (user?.mail) {
      setLoadding(true);
      // fetch(`http://localhost:5000/myMoney/${user.mail}`)
      //   .then((res) => res.json())
      //   .then((data) => {
      //     setDonations(data);
      //     setLoadding(false);
      //   })
      //   .catch((err) => {
      //     console.error(err);
      //     setLoadding(false);
      //   });
      axios
        .get(`http://localhost:5000/myMoney/${user.mail}`, {
          withCredentials: true,
        })
        .then((data) => {
          setDonations(data.data);
          setLoadding(false);
        })
        .catch((err) => {
          console.error(err);
          setLoadding(false);
        });
    }
  }, [user?.mail]);
  // console.log(donation)

  if (loadding) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <div className="text-center">
        <h2 className="text-4xl font-bold text-orange-500">
          My Donations {donation.length}
        </h2>
      </div>
      <section className="grid mt-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {donation.map((fund) => (
          <MyFund key={fund._id} fund={fund}></MyFund>
        ))}
      </section>
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Donations</title>
      </Helmet>
    </div>
  );
};

export default MyDonation;
