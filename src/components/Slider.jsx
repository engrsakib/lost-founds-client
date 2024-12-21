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
              src="https://i.ibb.co.com/0hDcvnF/man-wearing-red-jacket-walking-snowy-field-while-holding-snow-shovel-181624-8845.jpg"
            />
            <p className="legend">Donation Callection</p>
          </div>
          <div className="w-full h-[500px]">
            <img
              className="slder_img"
              src="https://i.ibb.co.com/k8ZQmhn/1-Getty-Images-1190345481.webp"
            />
            <p className="legend">Winter Donation</p>
          </div>
          <div className="w-full h-[500px]">
            <img
              className="slder_img"
              src="https://i.ibb.co.com/302X694/people-taking-community-action-23-2149232535.jpg"
            />
            <p className="legend">Donation Packaging</p>
          </div>
          <div className="w-full h-[500px]">
            <img
              className="slder_img"
              src="https://img.freepik.com/free-photo/bag-donation-with-provisions_23-2148613236.jpg?t=st=1733556972~exp=1733560572~hmac=32debb7a3a6d1c2f59929edaade3246799ce3d9c4dc2a1e8adfc7d6a122485d0&w=1380"
            />
            <p className="legend">Donation Packaging</p>
          </div>
          <div className="w-full h-[500px]">
            <img
              className="slder_img"
              src="https://img.freepik.com/free-photo/volunteer-helping-with-donation-box_23-2149230506.jpg?t=st=1733557019~exp=1733560619~hmac=9ab028a5c898cba70e4a3227fdc8568dc5c7e21a8359aacbe393d0a13914d392&w=1380"
            />
            <p className="legend">Donation Packaging</p>
          </div>
          <div className="w-full h-[500px]">
            <img
              className="slder_img"
              src="https://img.freepik.com/free-photo/front-view-box-with-donated-food_23-2148613254.jpg?t=st=1733557048~exp=1733560648~hmac=222c63e87b397c68f3ebd49bcab9d1690aafda18725228d4c7539d7430aa8ef7&w=1060"
            />
            <p className="legend">Donation Packaging</p>
          </div>
          <div className="w-full h-[500px] aspect-w-16 aspect-h-9">
            <img
              className="slder_img"
              src="https://img.freepik.com/free-photo/money-calculation-economy_23-2148568054.jpg?t=st=1733557079~exp=1733560679~hmac=725ef9ad6f27a191b7f28d5a1376d14e0dc76294744ca3d1cfba0f64c7626547&w=1380"
            />
            <p className="legend">Donation delivery</p>
          </div>
        </Carousel>
      </div>
    );
};

export default Slider;