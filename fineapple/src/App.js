import React, { Component, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";
import Login from "./Components/Login/Login";
import Feed from "./Components/Feed/Feed";
import Post from "./Components/Post/Post";
import Chat from "./Components/Chat/Chat";
import ChatBtn from "./Components/Chat/ChatBtn";

function App() {
  const [onChat, setOnChat] = useState(true);

  const handleChat = () => {
    console.log("ok");
    setOnChat((prev) => !prev);
  };

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/Login" component={Login} />
        <Route path="/Feed" component={Feed} />
        <Route path="/Post" component={Post} />
        {/*<Route path='/signin' component={Auth} /> 
        <Route path="/feed" component={feed} /> */}
      </Switch>
      {onChat ? (
        <Chat handleChat={handleChat} onChat={onChat} />
      ) : (
        <ChatBtn handleChat={handleChat} />
      )}
    </Router>
  );
}

export default App;
