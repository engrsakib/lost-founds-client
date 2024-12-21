import React, { useContext } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { AuthContext } from '../provider/AuthProvider';

const Types = () => {
    const {dark} = useContext(AuthContext);
    return (
      <div>
        <h1 className={` text-2xl font-black ${dark ? "text-gray-200": "text-gray-800"}`}>
          Our main Goals is{" "}
          <Typewriter
            words={["Help to finds people works attachment", "Food and Eaducational things"]}
            loop={1000}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </h1>
      </div>
    );
};

export default Types;