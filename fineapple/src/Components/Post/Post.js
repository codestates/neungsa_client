import React, { useRef, useState, useEffect } from "react";
import "./Post.css";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import Comment from "./Comment";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import rec4 from "../../img/mockup/rec4.png";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FaceIcon from "@material-ui/icons/Face";
import ExploreIcon from "@material-ui/icons/Explore";
import CallIcon from "@material-ui/icons/Call";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import CheckIcon from "@material-ui/icons/Check";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const Post = ({ match }) => {
  const classes = useStyles();
  const refReview = useRef(null);
  const refImage = useRef(null);
  const refProfile = useRef(null);
  const [postData, setPostData] = useState({});

  const [scrollState, setScrollState] = useState("profile");

  const moveScroll = (e, refName) => {
    if (refName === refProfile) setScrollState("profile");
    if (refName === refReview) setScrollState("review");
    if (refName === refImage) setScrollState("image");
    window.scrollTo(0, refName.current.offsetTop - 100);
  };

  useEffect(() => {
    axios
      .get(`https://localhost:5000/postPage/${match.params.id}`)
      .then((res) => {
        console.log(res.data.find_feedid);
        setPostData(res.data.find_feedid);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <div className="post_container">
        <div className="post_content">
          <div className="title_container">
            <img src={rec4} alt="" className="post_profile_img" />
            <div>
              <h1>{postData.title}</h1>
              <div className="post_tag_box">
                {postData.tag &&
                  postData.tag.split(",").map((tagEl, idx) => {
                    return <span key={idx}>{tagEl}</span>;
                  })}
              </div>
            </div>
          </div>
          <div className="post_move_btn_box">
            <button
              className={scrollState === "profile" ? "click" : ""}
              onClick={(e) => moveScroll(e, refProfile)}
            >
              프로필보기
            </button>
            <button
              className={scrollState === "review" ? "click" : ""}
              onClick={(e) => moveScroll(e, refReview)}
            >
              리뷰보기
            </button>
            <button
              className={scrollState === "image" ? "click" : ""}
              onClick={(e) => moveScroll(e, refImage)}
            >
              사진보기
            </button>
          </div>
          <div className="introduction_container">
            <div>
              <h2 ref={refProfile}>기본정보</h2>
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
                서울시 강남구
              </p>
              <p>
                <CallIcon />
                연락가능 시간:1시
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
                사업자
              </p>
              <p>
                <CheckIcon />
                자격증
              </p>
              <p>
                <CheckIcon />
                직장
              </p>
              <p>
                <CheckIcon />
                학교
              </p>
              <p>
                <CheckIcon />
                경력
              </p>
            </div>
          </div>
          <div className="text_container">
            <h2>서비스 상세설명</h2>
            <p>{postData.content}</p>
            <h2>비용</h2>
            <p>
              {postData.cost === 0 || !postData.cost
                ? "무료"
                : `${postData.cost} 원 /1H`}
            </p>
            <h2 ref={refImage}>사진 및 동영상</h2>
            <div className="post_img_container">
              {postData.images &&
                postData.images.split(",").map((photo) => {
                  return (
                    <img
                      key={photo}
                      src={photo}
                      alt=""
                      style={{
                        width: "150px",
                        height: "150px",
                      }}
                    />
                  );
                })}
            </div>
          </div>
        </div>
        <div className="message_side">
          <div className="for_message_box">
            작성자에게 메시지를 보내보세요
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              endIcon={
                <SendIcon onClick={() => console.log("okok")}>send</SendIcon>
              }
            >
              Send
            </Button>
          </div>
        </div>
        <div className="post_comments">
          <div>
            <h2 ref={refReview}>Review</h2>
          </div>
          <ul>
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <button className="post_review_more_btn">더보기</button>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Post;
