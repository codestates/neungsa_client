import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Business.css";

import Logo from "../../img/logo_wite.png";
import Biz from "../../img/Main/biz.png";
import Emily from "../../img/Main/biz_emily.png";
import Nick from "../../img/Main/biz_nick.png";
import SI from "../../img/Main/biz_SI.png";
import GH from "../../img/Main/biz_GH.png";

import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

function Business() {
  return (
    <div className="business">
      <div className="business__left">
        <div className="business__left__header">
          <img className="business__left__header__logo" src={Logo} alt="" />
          <h1 className="business__left__header__title">business.</h1>
          <p className="business__left__header__new">NEW</p>
        </div>
        <div className="business__left__content">
          <h1 className="business__left__content__title">
            동네 주민에게 홍보하는 <br />
            가장 쉽고 빠른 <i>방법</i>
          </h1>
        </div>
        <div className="business__left__details">
          <div className="business__left__details__top">
            우리 동네 주민에게 홍보할 방법을 찾고있나요?
            <br />
            파인애플 지역광고 상품을 이용해보세요!
            <br /> 손쉽게 원하는 지역에 광고하세요. <br /> 동네 주민들만 모여
            있는 온라인 공간에 광고를 노출할 수 있어요.
          </div>
          <div className="business__left__details__bottom">
            <div className="business__left__details__bottom__row">
              <CheckCircleOutlineIcon /> 광고하고 싶은 동네에 광고 할 수 있어요!
            </div>
            <div className="business__left__details__bottom__row">
              <CheckCircleOutlineIcon /> 사용하기가 쉽고 간편해요.
            </div>
            <div className="business__left__details__bottom__row">
              <CheckCircleOutlineIcon /> 지역 상권의 핵심 고객층에게 광고할 수
              있어요! <br /> 지역상권의 핵심 고객층과 같기 때문에 지역광고
              효과가 좋아요.
            </div>
            <div className="business__left__btn">
              파인애플 동네 광고 문의하기
            </div>
          </div>
        </div>
      </div>
      <div className="business__right">
        <img className="business__right__img__biz" src={Biz} alt="" />
      </div>
    </div>
  );
}

export default Business;
