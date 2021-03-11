import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rec1 from "../../img/mockup/rec1.png";
import Rec2 from "../../img/mockup/rec2.png";
import Rec3 from "../../img/mockup/rec3.png";
import Rec4 from "../../img/mockup/rec4.png";
import Rec5 from "../../img/mockup/rec5.png";
import "./Recommandation.css";

function Recommandation({ location }) {
  const [defaultLocation, setDefaultLocation] = useState(-780);
  const handleButton = (move) => {
    // console.log(move);
    if (move === "left") {
      setDefaultLocation((prev) => {
        if (prev - 260 === -1820) {
          return -780;
        }
        return prev - 260;
      });
    } else if (move === "right") {
      setDefaultLocation((prev) => {
        if (prev + 260 === 260) {
          return -780;
        }
        return prev + 260;
      });
    }
  };
  return (
    <div className="recommandation">
      <div className="text__container">
        <h1 className="rec__header">
          {location ? location : "역삼1동"} 에는 이런 일들이 있어요!
        </h1>
      </div>
      <div className="slides__container">
        <button
          className="slider__prev slide__btn"
          onClick={() => handleButton("left")}
        >
          <img
            className="img__btn"
            src="https://assets.cdn.soomgo.com/icons/slick-arrow-left.svg"
            alt="left"
          />
        </button>

        <div className="slider_wrapper">
          <ul
            className="slider__track"
            style={{ left: `${defaultLocation}px` }}
          >
            <li className="single__slide">
              <img className="slide__img" src={Rec1} alt="" />
            </li>
            <li className="single__slide">
              <img className="slide__img" src={Rec2} alt="" />
            </li>
            <li className="single__slide">
              <img className="slide__img" src={Rec3} alt="" />
            </li>
            <li className="single__slide">
              <img className="slide__img" src={Rec4} alt="" />
            </li>
            <li className="single__slide">
              <img className="slide__img" src={Rec5} alt="" />
            </li>
            <li className="single__slide">
              <img className="slide__img" src={Rec1} alt="" />
            </li>
            <li className="single__slide">
              <img className="slide__img" src={Rec2} alt="" />
            </li>
            <li className="single__slide">
              <img className="slide__img" src={Rec3} alt="" />
            </li>
            <li className="single__slide">
              <img className="slide__img" src={Rec4} alt="" />
            </li>
            <li className="single__slide">
              <img className="slide__img" src={Rec5} alt="" />
            </li>
            <li className="single__slide">
              <img className="slide__img" src={Rec1} alt="" />
            </li>
          </ul>
        </div>

        <button
          className="slider__next slide__btn"
          onClick={() => handleButton("right")}
        >
          <img
            className="img__btn"
            src="https://assets.cdn.soomgo.com/icons/slick-arrow-right.svg"
            alt="right"
          />
        </button>
      </div>
    </div>
  );
}

export default Recommandation;
