import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import socketio from "socket.io-client";
import Chat from "./Chat";
import ChatBtn from "./ChatBtn";
import "./ChatContainer.css";
import { Avatar } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CloseSharpIcon from "@material-ui/icons/CloseSharp";
import Logo from "../../img/fineapple.png";
import cho from "./chu.png";
import axios from "axios";
import moment from "moment";

function ChatContainer({ handleChat, closeChatRoom, openChatList }) {
  const userEmail = localStorage.getItem("email");

  const [chats, setChats] = useState([]);
  const [state, setState] = useState({ message: "", name: "tmddlr" });
  const [chat, setChat] = useState([]);
  const [email, setEmail] = useState(userEmail);

  function getTime({ timestamp }) {
    return moment(timestamp).format("LT");
  }

  const getChats = function () {
    axios
      .post(`https://fineapple.kr/socketlist`, {
        email: email,
      })
      .then((response) => {
        setChats(response.data.find_chat.reverse());
      });
  };
  useEffect(() => getChats());

  return (
    <div className="chatContainer">
      <div className="chatContainer__header">
        <div className="chatContainer__header__name__container">
          <h4>Chats 💬</h4>
        </div>
        <CloseSharpIcon
          onClick={closeChatRoom}
          className="chatContainer__header__close"
        />
      </div>

      <div className="chatContainer__list__container">
        {chats.map((chat, chatIndex) => (
          <div
            className="chatContainer__list"
            onClick={() => openChatList(email, chat.id)}
          >
            <div className="chatContainer__list__left">
              <Avatar
                style={{ height: "60px", width: "60px" }}
                src={chat.recipientprofileimage}
              />
            </div>
            <div className="chatContainer__list__middle">
              <h2 className="chatContainer__list__middle__name">
                {chat.recipientnickname}
              </h2>
              <div className="chatContainer__list__con">
                메세지가 도착했습니다
              </div>
            </div>
            <div className="chatContainer__list__right">
              {getTime(chat.created_at)}
            </div>
          </div>
        ))}
      </div>

      <div className="chatContainer__footer">
        <img src={Logo} alt="" />
        <div className="chatContainer__footer__content">
          위치기반 재능거래 서비스 <b>파인애플</b>
        </div>
      </div>
    </div>
  );
}

export default ChatContainer;
