import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
const Slider = () => {
    return (
      <div>
        <Carousel>
          <div className="w-full h-[500px]">
            <img
              className="slder_img"
              src="/5.jpg"
            />
           =
          </div>
          <div className="w-full h-[500px]">
            <img
              className="slder_img"
              src="/6.jpg"
            />
            
          </div>
          <div className="w-full h-[500px]">
            <img
              className="slder_img"
              src="/3.jpg"
            />
          
          </div>
          <div className="w-full h-[500px]">
            <img
              className="slder_img"
              src="/7.jpg"
            />
          
          </div>
          <div className="w-full h-[500px]">
            <img
              className="slder_img"
              src="/1.jpg"
            />
          </div>
          <div className="w-full h-[500px]">
            <img
              className="slder_img"
              src="/4.jpg"
            />
            
          </div>
          <div className="w-full h-[500px] aspect-w-16 aspect-h-9">
            <img
              className="slder_img"
              src="/2.jpg"
            />
            
          </div>
        </Carousel>
      </div>
    );
};

export default Slider;