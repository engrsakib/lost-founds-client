import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Link } from 'react-router-dom';

const ActiveCard = ({fund}) => {
    const {dark} = useContext(AuthContext);
    // console.log(fund)
    return (
      <>
        <div
          className={`card card-compact bg-base-100 w-full shadow-xl ${
            dark && "border-yellow-300 border"
          }`}
        >
          <figure>
            <img className="w-full h-[300px]" src={fund.photoURL} alt="Shoes" />
            <span className="badge-warning p-2 rounded-md absolute top-3 right-3">Active</span>
          </figure>
          <div className="card-body">
            <h2 className="card-title">{fund.title}</h2>
            <p className="text-left">Author: {fund.name}</p>
            <p className="text-left">Minimum Amount: {fund.minimumMoney}</p>
            <p className="text-left">Deadline: {fund.deadline}</p>
            <div className="card-actions justify-end">
              <Link
                to={`/donation/all-campagion/details/${fund._id}`}
                className="btn btn-primary"
              >
                Details
              </Link>
            </div>
          </div>
        </div>
      </>
    );
};

export default ActiveCard;