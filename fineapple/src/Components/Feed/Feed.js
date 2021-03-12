import React, { useState, useEffect, useRef } from "react";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import "./Feed.css";
import Card from "./Card";
import Listitem from "./Listitem";
import Footer from "../Footer/Footer";
import Advertise from "./Advertise";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import face1 from "../../img/mockup/face1.jpg";
import face2 from "../../img/mockup/face2.jpg";
import FeedSideBar from "./FeedSideBar";
import Profile from "../../img/mockup/profile.png";
import { Avatar } from "@material-ui/core";
import axios from "axios";
function Feed({ handleFeedData }) {
  //feed is array and initally needs to put empty array
  const inputRef = useRef(null);
  const [feeds, setFeeds] = useState([]);
  const [filtredFeeds, setFiltredFeeds] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cost, setCost] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  useEffect(
    function () {
      let data = feeds;
      if (inputValue) {
        data = data.filter(
          (item) =>
            item.title.includes(inputValue) || item.content.includes(inputValue)
        );
      }
      if (cost) {
        data = data.filter((item) => item.cost <= cost);
      }
      setFiltredFeeds(data);
    },
    [feeds, cost, inputValue]
  );
  useEffect(
    function () {
      const query = selectedCategory ? `?category=${selectedCategory}` : "";
      axios.get(`https://localhost:3000/feedpage${query}`).then((response) => {
        setFeeds(response.data.find_feed);
      });
    },
    [selectedCategory]
  );
  useEffect(
    function () {
      const queryGroup = selectedGroup
        ? `?group_category=${selectedGroup}`
        : "";
      axios
        .get(`https://localhost:3000/feedpage${queryGroup}`)
        .then((response) => {
          setFeeds(response.data.find_feed);
        });
    },
    [selectedGroup]
  );
  return (
    <div className="feed">
      {/* <div className="feed_cards">
        <Card data={slideData} className="single__card" />
        <Card data={slideData} className="single__card" />
        <Card data={slideData} className="single__card" />
        <Card data={slideData} className="single__card" />
        <PlayArrowIcon
          className="feed__cards__next"
          onClick={handleSlideBtn}
        />
      </div> */}
      <div className="feed_container">
        <FeedSideBar
          setCategory={setSelectedCategory}
          setCost={setCost}
          setGroup={setSelectedGroup}
        />
        <div className="feed__wrapper">
          <div className="feed__wrapper__header">
            <h2>일산 3동에는 이런일이 있어요!</h2>
            <div className="feed__wrapper__top__container">
              <div className="feed__wrapper__search">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="e.g. 딸기농장 일손구함"
                  className="feed__wrapper__search__input"
                />
                <div
                  onClick={() => setInputValue(inputRef.current.value)}
                  className="feed__wrapper__search__btn"
                >
                  검색
                </div>
              </div>
              <Link to="/write/1" className="feed__btn__write">
                글 작성
              </Link>
            </div>
          </div>
          <div className="feed_posts">
            {filtredFeeds.map((feed) => (
              <Link className="writePage" key={feed.id} to={`/feed/${feed.id}`}>
                <Listitem feed={feed} />
              </Link>
            ))}
            <div className="see__more__container">더보기</div>
          </div>
        </div>
      </div>
      <Advertise />
      <Footer />
    </div>
  );
}
export default Feed;
