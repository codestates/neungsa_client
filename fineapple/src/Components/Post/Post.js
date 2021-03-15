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
import { useAuth0 } from "@auth0/auth0-react";
import { Input } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(0),
  },
}));

const Post = ({ match, history }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const classes = useStyles();
  const refReview = useRef(null);
  const refImage = useRef(null);
  const refProfile = useRef(null);
  const [postData, setPostData] = useState({});
  const [yourself, setYourself] = useState(true);
  const [scrollState, setScrollState] = useState("profile");
  const [editTitle, setEditTitle] = useState(false);
  const [inputTitle, setInputTitle] = useState("");
  const [editContent, setEditContent] = useState(false);
  const [inputContent, setInputContent] = useState({});
  const [postEmail, setPostEmail] = useState("");
  const [writerData, setwriterData] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [sendMessage, setSendMessage] = useState(true);

  const deletePost = () => {
    axios
      .post("https://fineapple.kr/postPagedelete", {
        email: user.email,
        feedid: match.params.id,
      })
      .then((res) => {
        history.push("/feed");
      });
    openModal();
  };
  const openModal = () => {
    setModalOpen((prev) => !prev);
  };

  const moveScroll = (e, refName) => {
    if (refName === refProfile) setScrollState("profile");
    if (refName === refReview) setScrollState("review");
    if (refName === refImage) setScrollState("image");
    window.scrollTo(0, refName.current.offsetTop - 100);
  };

  const editComplete = (where) => {
    if (where === "content") {
      console.log(user.email, inputContent.content);
      axios
        .post("https://fineapple.kr/postPagecontentmodify", {
          email: user.email,
          content: inputContent.content,
          feedid: match.params.id,
          cost: inputContent.cost,
        })
        .then((res) => console.log("3", res));
      setEditContent((prev) => !prev);
    } else if (where === "title") {
      console.log(user.email, inputTitle);
      axios
        .post("https://fineapple.kr/postPagetitlemodify", {
          email: user.email,
          title: inputTitle,
          feedid: match.params.id,
        })
        .then((res) => console.log("3", res));
      setEditTitle((prev) => !prev);
    }
  };

  useEffect(() => {
    axios
      .get(`https://fineapple.kr/postPage/${match.params.id}`)
      .then((res) => {
        setwriterData(res.data.feed_postuser);
        let data = res.data.find_feedid;
        if (user && data.postemail === user.email) {
          setPostEmail(user.email);
          setYourself(true);
        } else {
          setPostEmail(data.postemail);
          setYourself(false);
        }
        setPostData(data);
        setInputTitle(data.title);
        setInputContent({
          content: data.content,
          cost: data.cost,
        });
      })
      .catch((err) => console.log(err));
  }, [isAuthenticated]);

  return (
    <div>
      <section
        className={modalOpen ? "modal-container show" : "modal-container"}
      >
        <div className="modal">
          <button className="close-modal" onClick={openModal}></button>
          <div className="modal_text_container">
            <h2 className="delete_account">잠시만요! 🤔</h2>
            <div>
              정말로 삭제하시겠어요? 한번 삭제된 글은 복구되지 않습니다.
            </div>
            <button onClick={deletePost}>삭제</button>
          </div>
        </div>
      </section>
      <div className="post_container">
        <div className="post_content">
          <div className="title_container">
            <img
              src={postData.profileimage ? postData.profileimage : rec4}
              alt=""
              className="post_profile_img"
            />
            <div>
              <div className="post_edit_container">
                {!editTitle ? (
                  <h1>{inputTitle}</h1>
                ) : (
                  <input
                    type="text"
                    value={inputTitle}
                    onChange={(e) => setInputTitle(e.target.value)}
                  />
                )}

                {yourself ? (
                  !editTitle ? (
                    <div>
                      <button
                        className="edit_btn_"
                        onClick={() => setEditTitle((prev) => !prev)}
                      >
                        수정
                      </button>
                      <button
                        className="edit_btn_delete"
                        onClick={() => openModal()}
                      >
                        글 삭제
                      </button>
                    </div>
                  ) : (
                    <button
                      className="edit_btn_"
                      onClick={() => editComplete("title")}
                    >
                      완료
                    </button>
                  )
                ) : (
                  ""
                )}
              </div>
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
            {/* <button
              className={scrollState === "review" ? "click" : ""}
              onClick={(e) => moveScroll(e, refReview)}
            >
              리뷰보기
            </button> */}
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
                {postData.nickname}
              </p>
              {/* <p>
                <FaceIcon />
                30회 누적사용
              </p> */}
              <p>
                <ExploreIcon />
                {postData.location}
              </p>
              <p>
                <CallIcon />
                연락가능 시간:{writerData.ContactTime}
              </p>
              <p>
                <LocalAtmIcon />
                {writerData.trade}
              </p>
            </div>
            <div>
              <h2>추가정보</h2>
              <p>
                <AddCircleOutlineIcon />
                사업자:{writerData.Entrepreneur}
              </p>
              <p>
                <AddCircleOutlineIcon />
                자격증:{writerData.Certificate}
              </p>
              <p>
                <AddCircleOutlineIcon />
                {writerData.Job}
              </p>
              <p>
                <AddCircleOutlineIcon />
                {writerData.school}
              </p>
            </div>
          </div>
          <div className="text_container">
            <div>
              <h2>서비스 상세설명</h2>
              {yourself ? (
                !editContent ? (
                  <button
                    className="edit_btn_"
                    onClick={() => setEditContent((prev) => !prev)}
                  >
                    수정
                  </button>
                ) : (
                  <button
                    className="edit_btn_"
                    onClick={() => editComplete("content")}
                  >
                    완료
                  </button>
                )
              ) : (
                ""
              )}
            </div>

            {!editContent ? (
              <p className="post__p">{inputContent.content}</p>
            ) : (
              <textarea
                value={inputContent.content}
                onChange={(e) =>
                  setInputContent({ ...inputContent, content: e.target.value })
                }
              />
            )}

            <h2 className="post__price">비용</h2>
            {!editContent ? (
              <p className="post__p">{`${
                !inputContent.cost ? "0" : inputContent.cost
              }원 / 시간당`}</p>
            ) : (
              <input
                type="text"
                value={inputContent.cost}
                onChange={(e) =>
                  setInputContent({ ...inputContent, cost: e.target.value })
                }
              />
            )}

            <h2 ref={refImage} className="post__price">
              사진 및 동영상
            </h2>
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
          {yourself && sendMessage ? (
            ""
          ) : (
            <div className="for_message_box">
              작성자에게 메시지를 보내보세요
              <Button
                onClick={() => {
                  // console.log("chat send Click");
                  // console.log(user.email, match.params.id);
                  if (user && user.email) {
                    axios
                      .post("https://fineapple.kr/chatroom", {
                        email: user.email,
                        feedid: match.params.id,
                      })
                      .then((res) => setSendMessage(false));
                  } else {
                    alert("login이후 이용가능합니다.");
                  }
                }}
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<SendIcon>send</SendIcon>}
              >
                Send
              </Button>
            </div>
          )}
        </div>
        <div className="post_comments">
          {/* <div>
            <h2 ref={refReview}>Review</h2>
          </div> */}
          {/* <ul>
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <button className="post_review_more_btn">더보기</button>
          </ul> */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Post;
