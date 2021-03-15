import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../img/logo_wite.png";

import "./Header.css";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

function Header({ handleLogin, Login }) {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  // const [tryLogin, setTryLogin] = useState(false);
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      // console.log(user);
      localStorage.setItem("email", user.email);
      axios
        .post("https://fineapple.kr", {
          email: user.email,
          nickname: user.nickname,
          image: user.picture,
          sub: user.sub,
        })
        .then((res) => {})
        .catch((err) => {
          if (!err.response) {
            logout({ returnTo: "https://fineaple.com" });
            alert("서버가 불안정합니다.");
          } else if (err.response.status === 500) {
            logout({ returnTo: "https://fineaple.com" });
            alert("이미 가입된 상태 입니다.");
          }
        });
    }
  });

  return (
    <div className="header">
      <div className="container">
        <Link to="/" className="header__logo" onClick={handleClick}>
          <img src={Logo} alt="Fineapple logo" />
        </Link>
        <ul className="list">
          <li className="header__item">
<<<<<<< HEAD
            <Link to="/feed" onClick={handleClick} className="header__links" >
=======
            <Link
              to="/feed"
              onClick={() => (window.location.href = "/feed")}
              className="header__links"
            >
>>>>>>> 03997ec168a341695c2f78a010a61db694506bae
              글 목록
            </Link>
          </li>
          <li className="header__item">
            <Link to="/write/1" className="header__links" onClick={handleClick}>
              글 쓰기
            </Link>
          </li>
          {!isAuthenticated ? (
            <li className="header__item">
              <div
                className="header__links"
                onClick={() => {
                  loginWithRedirect();
                  // setTryLogin((prev) => !prev);
                }}
              >
                로그인
              </div>
            </li>
          ) : (
            <li className="header__item">
              <div
                className="header__links"
                onClick={() => logout({ returnTo: "https://fineaple.com" })}
              >
                로그아웃
              </div>
            </li>
          )}
          <li className="header__item">
            {!isAuthenticated ? (
              <Link
                to="/theteam"
                className="header__links"
                onClick={handleClick}
              >
                팀 소개
              </Link>
            ) : (
              <Link
                to="/mypage"
                className="header__links"
                onClick={handleClick}
              >
                마이페이지
              </Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
