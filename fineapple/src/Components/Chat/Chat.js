import React, { useState, useEffect } from "react";
import "./Chat.css";
import { Link } from "react-router-dom";
// import socketio from "socket.io-client";
import { Avatar } from "@material-ui/core";
import cho from "./chu.png";
import dong from "./dong.png";
import SendIcon from "@material-ui/icons/Send";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CloseSharpIcon from "@material-ui/icons/CloseSharp";
import axios from "axios";
import moment from "moment";

const Chat = ({ handleChat, closeChatList, backToChatRoom, email, chatId }) => {
  // const socket = socketio.connect("http://localhost:3000");
  const [state, setState] = useState({ message: "", name: "tmddlr" });
  const [chat, setChats] = useState([]);
  const [profile, setProfile] = useState(null);

  function getTime({ timestamp }) {
    return moment(timestamp).format("LT");
  }

  // useEffect(() => {
  //   socket.on("message", ({ name, message }) => {
  //     setChat([...chat, { name, message }]);
  //   });
  // }, []);
  //   "profileimages": {
  //     "id": 15,
  //     "feedId": 215,
  //     "loginemail": "emiliyoun@gmail.com",
  //     "loginnickname": "emiliyoun",
  //     "loginprofileimage": "https://lh3.googleusercontent.com/a-/AOh14Gj2-hsU0aH5GE4cTnYA0vdlgjGPi8HFxtFeBEm8mA=s96-c",
  //     "recipient": "eojinyoun98@gmail.com",
  //     "recipientnickname": "eojinyoun98",
  //     "recipientprofileimage": "https://lh3.googleusercontent.com/a-/AOh14GiYDwXtx4VgABRAKOEIYeAygLt6-xY3Oae31TxFGA=s96-c",
  //     "comment": null,
  //     "created_at": "2021-03-14T11:03:00.000Z"
  // }

  const getMessages = function () {
    return axios
      .post(`https://fineapple.kr/socketlist/socketio`, {
        email: email,
        chatid: chatId,
      })
      .then((response) => {
        setProfile(response.data.profileimages);
        setChats(response.data.comment_all);
        return true;
      });
  };

  useEffect(() => {
    setInterval(() => {
      getMessages();
    }, 1000);
  });

  const sendMEssage = async function (message) {
    return axios
      .post(`https://fineapple.kr/socketlist/socketio`, {
        email: email,
        chatid: chatId,
        write: message,
      })
      .then((response) => {
        setChats(response.data.comment_all);
        return true;
      });
  };

  const onMessageSubmit = (e) => {
    e.preventDefault();
    const { message, name } = state;
    console.log(message);
    sendMEssage(message).then(() => {
      setState({ message: "", name });
    });
    // socket.emit("message", { name, message });
    // setState({ message: "", name });
  };

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const renderComment = function ({ chatEmail, comment, created_at }) {
    if (chatEmail === email) {
      return (
        <li className="chat_i">
          <div className="chat_profile">
            <Avatar
              style={{ height: "25px", width: "25px" }}
              src={profile.loginprofileimage}
            />
            <div className="chat_profile_name">{profile.loginnickname}</div>
            <div className="chat_profile_sent">{getTime(created_at)}</div>
          </div>
          <div className="chat_you_text">
            <div className="chat_you_text_content">{comment}</div>
          </div>
        </li>
      );
    } else {
      return (
        <li className="chat_you">
          <div className="chat_profile">
            {/* <Avatar style={{ height: "25px", width: "25px" }} src={profile.recipientprofileimage} /> */}
            {/* <div className="chat_profile_name">{profile.recipientnickname}</div> */}
            <div className="chat_profile_sent">{getTime(created_at)}</div>
          </div>
          <div className="chat_you_text">
            <div className="chat_you_text_content">{comment}</div>
          </div>
        </li>
      );
    }
  };

  return (
    <div className="chatting_box">
      <div className="chat_header">
        <div className="chat_header_name_container">
          <ArrowBackIosIcon
            onClick={() => backToChatRoom()}
            className="chat_header_arrow"
          />

          {/* <Avatar style={{ height: "40px", width: "40px" }} src={cho} />
          <h4>추성훈</h4> */}
          <h4>Message 🎁</h4>
        </div>
        <CloseSharpIcon onClick={closeChatList} className="chat_header_close" />
      </div>

      <div className="conversation">
        <ul>
          {profile &&
            chat.map(({ chatEmail, comment, created_at }, index) =>
              renderComment({ chatEmail, comment, created_at })
            )}
        </ul>
      </div>
      <div className="input_send">
        <input
          name="message"
          type="text"
          placeholder="메세지를 입력해주세요."
          value={state.message}
          onChange={(e) => onTextChange(e)}
          // onKeyPress={(e) => 'enter'}
        />
        <div className="input_send_btn" onClick={(e) => onMessageSubmit(e)}>
          <SendIcon />
        </div>
      </div>
    </div>
  );
};

export default Chat;
