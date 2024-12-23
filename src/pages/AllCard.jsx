import React from 'react';
import { Link } from 'react-router-dom';

const AllCard = ({dt}) => {
    console.log(dt);
    const { _id, name, dateLost, type, photoURL, title, lostlocation } = dt;
    return (
      <div className="col-span-1 w-full h-[550px]">
        <div className="rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800">
          <img
            src={photoURL}
            alt=""
            className="object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500"
          />
          <div className="flex flex-col justify-between p-6 space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold tracking-wide">
                {title.length > 10 ? `${title.substring(0, 30)}...` : title}
              </h2>
              <p className="dark:text-gray-800">
                Types: <span className='badge p-2 rounded-2xl'>{type}</span> <br />
                Lost Location: {lostlocation} <br />
                Date Lost: {dateLost}
              </p>
            </div>
            <Link
              type="button"
              to={`/donation/all-campagion/details/${_id}`}
              className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md dark:bg-violet-600 dark:text-gray-50"
            >
              Read more
            </Link>
          </div>
        </div>
      </div>
    );
};

export default AllCard;