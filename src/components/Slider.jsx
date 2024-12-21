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
              src="https://i.ibb.co.com/CKfNX1J/business-woman-is-working-online-traing-reply-customer-home-office-packaging-wall-1150-21874.jpg"
            />
           =
          </div>
          <div className="w-full h-[500px]">
            <img
              className="slder_img"
              src="https://i.ibb.co.com/sFSDGj2/portrait-young-woman-holding-paper-craft-bags-standing-high-quality-photo-2831-10278.jpg"
            />
            
          </div>
          <div className="w-full h-[500px]">
            <img
              className="slder_img"
              src="https://i.ibb.co.com/YddXMPZ/food-crisis-concept-with-jars-arrangement-23-2150314826.jpg"
            />
          
          </div>
          <div className="w-full h-[500px]">
            <img
              className="slder_img"
              src="https://i.ibb.co.com/SxcvDtv/5w-KUAWEmh9-KSf63c9ps-Sn-Q.jpg"
            />
          
          </div>
          <div className="w-full h-[500px]">
            <img
              className="slder_img"
              src="https://img.freepik.com/free-photo/young-hispanic-woman-preparing-order-working-storehouse-worried-stressed-about-problem-with-hand-forehead-nervous-anxious-crisis_839833-27616.jpg?t=st=1734798713~exp=1734802313~hmac=c1d98f4192b0158b28cf373e77b5ec5f3f8b6610b5517efdeec24cb1e0dd1b10&w=1380"
            />
          </div>
          <div className="w-full h-[500px]">
            <img
              className="slder_img"
              src="https://img.freepik.com/free-photo/food-donations-collected-charity_23-2149230528.jpg?t=st=1734798737~exp=1734802337~hmac=519705591fe9a5890822569face06544cdf79c3b836d78e683616aadb4781f91&w=1380"
            />
            
          </div>
          <div className="w-full h-[500px] aspect-w-16 aspect-h-9">
            <img
              className="slder_img"
              src="https://img.freepik.com/free-photo/high-angle-delivery-man-prepared-wrap-up-delivery-packages_23-2148447904.jpg?t=st=1734798758~exp=1734802358~hmac=afc8233dc18eec64af9513e463ec7283aa8c65182e4bc12c1c801d68bc77244a&w=1380"
            />
            
          </div>
        </Carousel>
      </div>
    );
};

export default Slider;