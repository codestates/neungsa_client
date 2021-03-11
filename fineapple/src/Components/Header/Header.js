import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../img/logo_main.png";
import "./Header.css";

function Header({ handleLogin, Login }) {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();


  return (
    <div className="header">
      <div className="container">
        <Link to="/" className="header__logo" onClick={handleClick}>
          <img src={Logo} alt="Fineapple logo" />
        </Link>
        <ul className="list">

          {!isAuthenticated ? (
            <li className="header__item">
              <div
                className="header__links"
                onClick={() => loginWithRedirect()}
              >
                로그인
              </div>
            </li>
          ) : (
            <li className="header__item">
              <div
                className="header__links"
                onClick={() => logout({ returnTo: "https://localhost:8000" })}
              >
                로그아웃
              </div>
            </li>
          )}


          <li className="header__item">
            <Link to="/feed" className="header__links" onClick={handleClick}>
              피드
            </Link>
          </li>
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