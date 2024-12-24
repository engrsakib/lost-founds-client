import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import MyFund from "./MyFund";
import { Helmet } from "react-helmet";
import Loading from "../components/Loading";
import axios from "axios";
import { IoGrid } from "react-icons/io5";
import { FaList } from "react-icons/fa";
import All from "./All";
import AllR from "./AllR";
import useAxiosSecure from "../auth/useAxiosSecure";

const MyDonation = () => {
  const { user, dark } = useContext(AuthContext);
  const [card, isCard] = useState(true);
  const [data, setdata] = useState(null);
  const [loadding, setLoadding] = useState(true);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    if (user?.mail) {
      setLoadding(true);
      axiosSecure(`/myrecover/items/${user.mail}`)
        .then((data) => {
          setdata(data.data);
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

  if (data?.length !== 0) {
    return (
      <div>
        <div className="flex justify-between items-center mt-3">
          <div className="text-left">
            <h2 className="text-4xl font-bold text-orange-500">
              My Recover {data?.length}
            </h2>
          </div>
          <div className="join">
            <button
              onClick={() => {
                isCard(true);
              }}
              className={`join-item btn btn-warning ${
                card ? "btn-primary" : ""
              }`}
              aria-label="Radio 3"
              disabled={card}
            >
              <IoGrid />
            </button>
            <button
              onClick={() => {
                isCard(false);
              }}
              className={`join-item btn btn-warning ${
                card ? "" : "btn-primary"
              }`}
              disabled={!card}
              aria-label="Radio 3"
            >
              <FaList />
            </button>
          </div>
        </div>
        <AllR data={data} card={card}></AllR>
        <Helmet>
          <meta charSet="utf-8" />
          <title>My Recover</title>
        </Helmet>
      </div>
    );
  } else {
    return (
      <div>
        <div className="text-center">
          <h2 className="text-4xl font-bold text-orange-500">My Recover</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            <img
              src="https://i.ibb.co.com/ZX9b5F5/no-data-concept-illustration-114360-25063.jpg"
              alt=""
            />
          </p>
        </div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>My Recover</title>
        </Helmet>
      </div>
    );
  }
};

export default MyDonation;
