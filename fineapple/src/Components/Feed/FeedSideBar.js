import React from 'react'
import SearchIcon from '@material-ui/icons/Search';
import './FeedSideBar.css';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function FeedSideBar() {
    return (
        <div className="feedsidebar">
            <h1 className="feedsidebar__header">
                맞춤 검색
            </h1>
            <ul className="feedsidebar__ul">
            <ExpandMoreIcon className="feedsidebar__close"/>
                <h3 className="feedsidebar__ul__title">카테고리로 찾기</h3>
                <li className="feedsidebar__list">교육</li>
                <li className="feedsidebar__list">친구</li>
                <li className="feedsidebar__list">유아</li>
                <li className="feedsidebar__list">뷰티</li>
                <li className="feedsidebar__list">스포츠 / 레저</li>
                <li className="feedsidebar__list">반려동물</li>
                <li className="feedsidebar__list">언어</li>
                <li className="feedsidebar__list">컴퓨터</li>
                <li className="feedsidebar__list">요리 / 예체능</li>
            </ul>

            <ul className="feedsidebar__ul">
            <ExpandMoreIcon className="feedsidebar__close"/>
                <h3 className="feedsidebar__ul__title">지역 검색하기</h3>
                <div className="feedsidebar__search__container">
                    <SearchIcon className="feedsidebar__search__icon" />
                    <input type="text" autoComplete="none" placeholder="e.g. 딸기농장 일손구함" className="feedsidebar__search__input"/>
                </div>
            </ul>

            <ul className="feedsidebar__ul">
            <ExpandMoreIcon className="feedsidebar__close"/>
                <h3 className="feedsidebar__ul__title">타입으로 찾기</h3>
                <li className="feedsidebar__list">레슨 찾기</li>
                <li className="feedsidebar__list">친구 구하기</li>
            </ul>

            <ul className="feedsidebar__ul">
            <ExpandMoreIcon className="feedsidebar__close"/>
                <h3 className="feedsidebar__ul__title">시간당 가격</h3>
                <li className="feedsidebar__list">슬라이드</li>
            </ul>
            
        </div>
    )
}

export default FeedSideBar
