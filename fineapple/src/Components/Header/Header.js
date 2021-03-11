import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../img/logo_main.png";
import "./Header.css";

function Header() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <div className="header">
      <div className="container">
        <Link to="/" className="header__logo" onClick={handleClick}>
          <img src={Logo} alt="Fineapple logo" />
        </Link>
        <ul className="list">
          <li className="header__item">
            <Link to="/Login" className="header__links" onClick={handleClick}>
              로그인
            </Link>
          </li>
          <li className="header__item">
            <Link to="/feed" className="header__links" onClick={handleClick}>
              피드
            </Link>
          </li>
          <li className="header__item">
            <Link to="/mypage" className="header__links" onClick={handleClick}>
              마이페이지
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;