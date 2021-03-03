import React, { Component, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./Components/Header/Header";
import Header_dark from "./Components/Header/DarkHeader";
import Main from "./Components/Main/Main";
import Login from "./Components/Login/Login";
import Feed from "./Components/Feed/Feed";
import Post from "./Components/Post/Post";
import Chat from "./Components/Chat/Chat";
import ChatBtn from "./Components/Chat/ChatBtn";
import Write from "./Components/Write/Write";
import Mypage from "./Components/Mypage/Mypage";
// import WorkTitle from './Components/Write/Components/WorkTitle'
function App() {
  const [onChat, setOnChat] = useState(false);

  const handleChat = () => {
    console.log("ok");
    setOnChat((prev) => !prev);
  };

  return (
    <Router>
      <Header_dark />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/Login" exact component={Login} />
        <Route path="/Feed" component={Feed} />
        <Route path="/Post" component={Post} />
        <Route path="/write" component={Write} />
        <Route path="/mypage" component={Mypage} />
        {/* <Route path="/work/title" component={WorkTitle} />
        <Route path="/work/description" render={WorkDes} />
        <Route path="/work/budget" render={WorkBudget} />
        <Route path="/work/review" render={Review} /> */}
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
