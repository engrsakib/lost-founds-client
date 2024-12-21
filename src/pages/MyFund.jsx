import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Link } from 'react-router-dom';

const MyFund = ({fund}) => {
    const {dark} = useContext(AuthContext);
    return (
      <>
        <div
          className={`card card-compact bg-base-100 w-full shadow-xl ${
            dark && "border-yellow-300 border"
          }`}
        >
          <figure>
            <img
              className="w-full h-[300px] object-fill"
              src={fund.photoURL}
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{fund.title}</h2>
            <p className="text-left">Your Donations amount is: {fund.amount}</p>
            <div className="card-actions justify-end">
              <Link
                to={`/donation/all-campagion/details/${fund.id}`}
                className="btn btn-primary w-full"
              >
                See Donations Details
              </Link>
            </div>
          </div>
        </div>
      </>
    );
};

export default MyFund;