import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import AllCmapTable from "../components/AllCmapTable";
import { Helmet } from "react-helmet";
import Loading from "../components/Loading";
import axios from "axios";
import { ca } from "date-fns/locale";
import { useQuery } from "@tanstack/react-query";
import All from "./All";

const AllCamign = () => {
  const { dark, user } = useContext(AuthContext);

  const [card, isCard] = useState(true);
  console.log(card);
  const [data, setData] = useState(null);
  setTimeout(() => {
    setData(d);
  }, 2000);

  const [loadding, setLoadding] = useState(true);


  useEffect(() => {
    setLoadding(true);
    axios
      .get("http://localhost:5000/lostandfinds")
      .then((data) => {
        setData(data.data); // Update state with fetched data
        setLoadding(false); // End loadding
      })
      .catch((err) => {
        console.error(err);
        setLoadding(false); // End loadding even on error
      });
  }, []);

  const handleSort = () => {
    fetch(`http://localhost:5000/lostandfinds/sorted`)
      .then((res) => res.json())
      .then((data) => {
        setData(data); // Update state with fetched data
        setLoadding(false); // End loadding
      })
      .catch((err) => {
        console.error(err);
        setLoadding(false); // End loadding even on error
      });
  };

  if (loadding) {
    return <Loading></Loading>;
  }
  // console.log(data);
  return (
    <div>
      <div className="text-center flex justify-between max-sm:flex-col items-center gap-2">
        <h2 className="text-4xl font-bold text-orange-500 justify-center">
          Lost & Found Items {data?.length}
        </h2>
        <div className="space-x-6 flex gap-3 justify-center items-center max-sm:flex-col">
          {/* search start */}
          <div className="join">
            <input
              className="input input-bordered join-item"
              placeholder="serach your items"
            />
            <button className="btn join-item rounded-r-full">Search</button>
          </div>
          {/* search end */}

          <div className="join">
            <button
              onClick={handleSort}
              className="join-item btn btn-warning justify-end"
            >
              Sort
            </button>

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

      <All data={data} card={card}></All>
      <Helmet>
        <meta charSet="utf-8" />
        <title>All Lost & Found Item</title>
      </Helmet>
    </div>
  );
};

export default AllCamign;
