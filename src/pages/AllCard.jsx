import React from 'react';

const AllCard = ({dt}) => {
    console.log(dt);
    const { _id, name, dateLost, type, photoURL, title, lostlocation } = dt;
    return (
      <div className="col-span-1">
        <div className="w-d rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800">
          <img
            src={photoURL}
            alt=""
            className="object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500"
          />
          <div className="flex flex-col justify-between p-6 space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold tracking-wide">
                {title}
              </h2>
              <p className="dark:text-gray-800">
                Types: {type} <br />
                Lost Location: {lostlocation} <br />
                Date Lost: {dateLost}
                
              </p>
            </div>
            <button
              type="button"
              className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md dark:bg-violet-600 dark:text-gray-50"
            >
              Read more
            </button>
          </div>
        </div>
      </div>
    );
};

export default AllCard;