import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import AllCmapTable from "../components/AllCmapTable";
import { Helmet } from "react-helmet";
import Loading from "../components/Loading";
import axios from "axios";
import { ca } from "date-fns/locale";
import { useQuery } from "@tanstack/react-query";

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
      .get("http://localhost:5000/donations")
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
    fetch(`http://localhost:5000/donations/sorted`)
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
      <div className="text-center flex justify-between">
        <h2 className="text-4xl font-bold text-orange-500 justify-center">
          All Campagion {data?.length}
        </h2>
        <div className="space-x-6">
          <button onClick={handleSort} className="btn btn-warning justify-end">
            Sort
          </button>

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
              <th>Needed Amount</th>
              <th>Min Donate Amount</th>
              <th>Types</th>
              <th></th>
              <th>Deadline</th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          {data?.map((d) => (
            <AllCmapTable key={d._id} d={d}></AllCmapTable>
          ))}
        </table>
      </div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>All Campagion</title>
      </Helmet>
    </div>
  );
};

export default AllCamign;
