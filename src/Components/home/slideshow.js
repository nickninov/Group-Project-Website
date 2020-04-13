import React from "react";
import { Fade } from "react-slideshow-image";
import image2 from "../../assets/image2.jpg";
import image3 from "../../assets/image3.jpg";
import image4 from "../../assets/image4.jpg";
import image5 from "../../assets/image5.jpg";
import image6 from "../../assets/image6.jpg";

const fadeProperties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
};

export const Slideshow = () => {
  return (
    <div className="slide-container" style={{ width: "100%" }}>
      <Fade {...fadeProperties}>
        <div className="each-fade">
          <div className="image-container">
            <img src={image2} alt="Site Poster" />
          </div>
        </div>
        <div className="each-fade">
          <div className="image-container">
            <img src={image3} alt="Site Poster" />
          </div>
        </div>
        <div className="each-fade">
          <div className="image-container">
            <img src={image4} alt="Site Poster" />
          </div>
        </div>
        <div className="each-fade">
          <div className="image-container">
            <img src={image5} alt="Site Poster" />
          </div>
        </div>
        <div className="each-fade">
          <div className="image-container">
            <img src={image6} alt="Site Poster" />
          </div>
        </div>
      </Fade>
    </div>
  );
};
