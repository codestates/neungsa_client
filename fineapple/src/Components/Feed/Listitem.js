import React from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import Profile from '../../img/mockup/profile.png';

import './Listitem.css'
const Listitem = (props) => {
  return (
    // <li className="list_card">
    //   <div className="list_card_left">
    //     <div>
    //     <Avatar className='card__top__left__img' style={{ height: "70px", width: "70px" }} src={Profile} />
    //       <span className="list_card_left_distance">12km 이내</span>
    //     </div>
    //     <div className="list_card_tag_box">
    //       <p>HTML</p>
    //       <p>CSS</p>
    //       <p>Typescript</p>
    //       <p>Javascript</p>
    //       <p>coffee</p>
    //     </div>
    //   </div>
    //   <div className="list_card_right">
    //     <h3> javascript 알려드릴게요 공방 1:1 들어오세요 오늘 한시까지 합니다. </h3>
    //     <br></br>
    //     <h4>한줄소개 : </h4>
    //     <p>현업에서 일 안해봤고 아는만큼만 알려드릴게요</p>
    //   </div>
    // </li>

    <ul className="listitem">
      <li className="listsitem__list">
        <div className="listitem__list__top">
          <div className="listitem__list__top__img__container">
            <Avatar className='card__top__left__img' style={{ height: "70px", width: "70px" }} src={Profile} />
          </div>
          <div className="listitem__list__top__left">
            <h4>emily youn</h4>
            <h3> javascript 알려드릴게요 공방 1:1 들어오세요 오늘 한시까지 합니다. </h3>
            <p>1.4km 이내</p>
          </div>
        </div>
        <div className="listitem__list__middle">
          {/* <div className="listitem__list__price">
            시간당 <b>15000</b> 원
          </div> */}
        </div>
        <div className="lisstitem__list__bottom">
          현업에서 일 안해봤고 아는만큼만 알려드릴게요 지금 리액트 배우고 있고 mysql, javascript, css, html 중에 원하시는거 가르쳐드려요. 한시간 생각하고 있는데 보고 더 길어질 수 도 있습니다. 선착순 10명입니다 빨리오세요 열명 넘으면 앞으로도 가끔 할테니까 다음에 오세요
          <div className="list_card_tag_box">
          <p>HTML</p>
          <p>CSS</p>
          <p>Typescript</p>
          <p>Javascript</p>
          <p>coffee</p>
        </div>   
        </div>
        
      </li>
    </ul>
  );
};

export default Listitem;
