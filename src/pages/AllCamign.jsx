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
import { IoGrid } from "react-icons/io5";
import { FaList } from "react-icons/fa";

const AllCamign = () => {
  const { dark, user } = useContext(AuthContext);

  const [card, isCard] = useState(true);

  const [data, setData] = useState(null);
  setTimeout(() => {
    setData(d);
  }, 2000);

  const [loadding, setLoadding] = useState(true);

  useEffect(() => {
    setLoadding(true);
    axios
      .get("https://lostserver.vercel.app/lostandfinds")
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
    fetch(`https://lostserver.vercel.app/lostandfinds/sorted`)
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

  // sort function
  const handlesumbit = (e) => {
    e.preventDefault();
    const search = e.target[0].value;
    // console.log(search);
    fetch(`https://lostserver.vercel.app/lostandfinds/search/${search}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoadding(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadding(false);
      });
  };

  return (
    <div>
      <div className="text-center flex justify-between max-sm:flex-col items-center gap-2">
        <h2 className="text-4xl font-bold text-orange-500 justify-center">
          Lost & Found Items {data?.length}
        </h2>
        <div className="space-x-6 flex gap-3 justify-center items-center max-sm:flex-col">
          {/* search start */}
          <form action="" onSubmit={handlesumbit}>
            <div className="join">
              <input
                className="input input-bordered join-item"
                placeholder="serach your items"
              />
              <button className="btn btn-warning join-item rounded-r-full">
                Search
              </button>
            </div>
          </form>
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
