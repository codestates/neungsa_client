import React, { useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import "./Mypage.css";
import ServiceItem from "./ServiceItem";
import face1 from "../../img/mockup/face1.jpg";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FaceIcon from "@material-ui/icons/Face";
import ExploreIcon from "@material-ui/icons/Explore";
import CallIcon from "@material-ui/icons/Call";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import CheckIcon from "@material-ui/icons/Check";
import PostAddIcon from "@material-ui/icons/PostAdd";
import axios from "axios";
import { withRouter } from "react-router-dom";

const Mypage = (props) => {
  const [onEdit, setOnEdit] = useState(false);
  const [yourSelf, setYourSelf] = useState(true);
  const [myData, setMyData] = useState({});
  const [feedDatas, setFeedDatas] = useState([]);

  const handleProfile = () => {
    console.log("a");
    props.history.push("/mypage/update");
  };

  useEffect(() => {
    axios
      .post("https://localhost:5000/myPage", {
        email: "email@email.com",
      })
      .then((res) => {
        let filterData = res.data.find_feed.slice(-5);
        setMyData(res.data.mypagepost);
        setFeedDatas(filterData);
      });
  }, []);

  return (
    <div>
      <div className="mypage_container">
        <div className="mypage_profile">
          <img src={myData.image ? myData.image : face1} alt="" />
          <div>
            <div className="mypage_profile_name">{myData.nickname}</div>
            <span className="mypage_profile_good">누적 좋아요👌 : 800</span>
            {yourSelf ? (
              <button onClick={handleProfile}>"프로필 등록/수정"</button>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="mypage_introduction">
          {/* <div className="mypage_introduction_header">소개</div> */}
          <div className="mypage_introduction_container">
            <div>
              <h2>기본정보</h2>
              <p>
                <AccountCircleIcon />
                본인인증
              </p>
              <p>
                <FaceIcon />
                30회 누적사용
              </p>
              <p>
                <ExploreIcon />
                {myData.location}
              </p>
              <p>
                <CallIcon />
                연락시간: {myData.ContactTime}
              </p>
              <p>
                <LocalAtmIcon />
                계좌이체&현금가능
              </p>
            </div>
            <div>
              <h2>추가정보</h2>
              <p>
                <CheckIcon />
                관련사업: {myData.Entrepreneur}
              </p>
              <p>
                <CheckIcon />
                자격증
              </p>
              <p>
                <CheckIcon />
                직장: {myData.Job}
              </p>
              <p>
                <CheckIcon />
                기타: {myData.Career}
              </p>
            </div>
          </div>
        </div>
        <div className="mypage_service">
          <h2
            style={{
              paddingLeft: "40px",
              paddingTop: "15px",
              paddingBottom: "15px",
              marginBottom: "20px",
            }}
          >
            최근활동
            <PostAddIcon />
          </h2>
          <ul style={{ paddingBottom: "30px" }}>
            {feedDatas.map((feedData, key) => {
              return <ServiceItem key={key} feedData={feedData} />;
            })}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Mypage;
