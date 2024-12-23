import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";

const Details = () => {
  const { dark, setActive, active } = useContext(AuthContext);
  const data = useLoaderData();
  const navigate = useNavigate();
  const {user} = useContext(AuthContext);
  console.log(data[0])
  
  const {p} = useParams();
  console.log(p)
    

  const {
    _id,
    name,
    mail,
    title,
    photoURL,
    type,
    description,
    categoryArray,
    dateLost,
    lostlocation,
  } = data[0];
  console.log(data[0]);

 

  // donetation section handel
  const handleDonate = (id)=>{
    if(active){
       
      if (name === user.name) {
        Swal.fire({
          icon: "error",
          title: "Donation Faild",
          text: `You can't donated in your own campagion`,
        });
        return;
      }
      navigate(`/donation/all-campagion/details/donated/${id}`);

        

    }else{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Donations date!",
      });
    }
  }
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-8 px-6 lg:px-16 py-8">
        {/* Left Section */}
        <div className="flex-1">
          <img
            src={photoURL}
            alt="Fundraiser"
            className="rounded-lg shadow-md w-full h-[400px] object-cover"
          />
          <h1 className="text-3xl font-bold mt-4">{title}</h1>
          <p className="text-gray-600 mt-2">
            {/* <span className="font-semibold badge ">Types: {type} </span> */}
          </p>
          <div
            className={`${
              active ? "bg-green-400" : "bg-red-400"
            } mt-4 p-4 rounded-md`}
          >
            <p className="text-sm font-medium">
              <i className="fas fa-shield-alt text-2xl mr-2 text-white">
                {type}
              </i>
            </p>
          </div>
          <p className={`${dark ? "text-gray-200" : "text-gray-800"} mt-4`}>
            {description}
          </p>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold">User</h2>
          <p className="text-gray-600">
            Name: {name} <br /> Mail: {mail}
          </p>

          <button className="btn mt-6 btn-outline btn-accent w-full"></button>

          {type == "found" ? (
            <button
              onClick={() => {
                handleDonate(_id);
              }}
              className="btn btn-primary w-full my-2"
            >
              This is Mine!
            </button>
          ) : (
            <button
              onClick={() => {
                handleDonate(_id);
              }}
              className="btn btn-primary w-full my-2"
            >
              Found This!
            </button>
          )}

          <h3 className="mt-6 text-lg font-semibold">Other Informations</h3>
          <ul className="mt-4 space-y-2">
            <li className="flex justify-between">
              <p className="font-medium">Lost date</p>
              <p className="text-gray-500">
                {new Date(dateLost).toLocaleDateString("en-GB")}
              </p>
            </li>
            <li className="flex justify-between">
              <p className="font-medium">Lost Location</p>
              <p className="text-gray-500">
                {lostlocation}
              </p>
            </li>
            <li className="flex justify-between">
              <p className="font-medium">categories</p>
              <p className="text-gray-500 text-left">
                {categoryArray?.map((c, i) => <li key={i}>{i+1}{" "}{c}</li>)}
              </p>
            </li>
            {/* <li className="flex justify-between">
              <p className="font-medium">Davinder Sapra</p>
              <p className="text-gray-500">$5,000</p>
            </li>
            <li className="flex justify-between">
              <p className="font-medium">Anonymous</p>
              <p className="text-gray-500">$500</p>
            </li> */}
          </ul>
        </div>
      </div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Details</title>
      </Helmet>
    </>
  );
};

export default Details;
