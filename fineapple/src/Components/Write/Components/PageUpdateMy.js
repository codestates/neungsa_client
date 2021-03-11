import React, { useState, useEffect } from "react";
import "./PageUpdateMy.css";
import { Link } from "react-router-dom";
import "./Tagging.scss";
import TagsInput from "./TagsInput";
import axios from "axios";
import UpdateSidebar from "./UpdateSidebar";

function PageUpdateMy({ handleWriteData, history }) {
  const [tags, setTags] = useState([]);
  const [emails, setEmails] = useState([]);
  const [coords, setCoords] = useState({});
  const [errors, setErrors] = useState({});
  const [locationInput, setLocationInput] = useState("");
  const [title, setTitle] = useState("");
  const [nickName, setNickName] = useState("");
  const [contactTime, setContactTime] = useState("");
  const [trade, setTrade] = useState("");
  const [Entrepreneur, setEntrepreneur] = useState("");

  const changeHandler = (name, value) => {
    if (name === "tags") {
      setTags(value);
      if (value.length > 0 && errors.tags) {
        setErrors((prev) => {
          const prevErrors = { ...prev };
          delete prevErrors.tags;
          return prevErrors;
        });
      }
    } else if (name === "emails") {
      setEmails(value);
      if (value.length > 0 && errors.emails) {
        setErrors((prev) => {
          const prevErrors = { ...prev };
          delete prevErrors.emails;
          return prevErrors;
        });
      }
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (tags.length === 0) {
      setErrors((prev) => ({
        ...prev,
        tags: "Please add at least one tag",
      }));
    }
    if (emails.length === 0) {
      setErrors((prev) => ({
        ...prev,
        emails: "Please add at least one email",
      }));
    }

    if (tags.length > 0 && emails.length > 0) {
      console.log(tags, emails);
      // Submit form
    }
  };

  useEffect(() => {
    setCoords((prev) => {
      return { ...prev, region: locationInput };
    });
  }, [locationInput]);

  useEffect(() => {
    axios
      .post("https://localhost:5000/myPage", {
        email: "email@email.com",
      })
      .then((res) => {
        let myData = res.data.mypagepost;
        setNickName(myData.nickname);
        if (myData.ContactTime) setContactTime(myData.ContactTime);
        if (myData.descrition) setTrade(myData.descrition); //descrition > trade 로 벼경 예정
        if (myData.Entrepreneur) setEntrepreneur(myData.Entrepreneur);
        if (myData.location) setLocationInput(myData.location);

        console.log(myData);
      });
  }, []);

  const submitLocation = (e) => {
    e.preventDefault();

    navigator.geolocation.getCurrentPosition(
      (position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        // console.log(lat, lon);

        axios
          .get(
            `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${lon}&y=${lat}`,
            {
              headers: {
                Authorization: "KakaoAK ede32a5902568ca38d7da12deead44af",
              },
            }
          )
          .then((address) => {
            let locationName = address.data.documents[1].region_2depth_name;
            // console.log(locationName);
            setLocationInput(locationName);
            setCoords({
              lat: lat,
              lon: lon,
              region: locationName,
            });
          });
      },
      () => {
        alert("위치정보 접근을 허용해주세요");
      }
    );
  };

  const updateBtn = () => {
    let updateObj = {
      email: "email@email.com",
      nickname: nickName,
      ContactTime: contactTime,
      descrition: trade, //trade 로 수정예정
      location: coords.region,
      Entrepreneur: Entrepreneur,
    };
    axios
      .put("https://localhost:5000/mypage/update", updateObj)
      .then((res) => history.push("/mypage"));
  };

  return (
    <div className="write">
      <div className="write__body">
        <UpdateSidebar />
        <div className="worktitle">
          <div className="worktitle__container">
            <div className="worktitle__title">
              <div className="update_title__headerbox">
                <h1 className="worktitle__header">기본 정보</h1>
                <p>Stpe 1 of 2</p>
              </div>
              <div className="worktitle__typeJob">
                <div className="update_inner">
                  <h3 className="update__title">본인 인증</h3>
                  <button>본인인증</button>
                </div>
                <div className="update_inner">
                  <h3 className="update__title">닉네임 설정</h3>
                  <input
                    type="text"
                    autoComplete="none"
                    className="update_input"
                    placeholder="ex. 질투의해신 장보고"
                    value={nickName}
                    onChange={(e) => setNickName(e.target.value)}
                  />
                </div>
                <div className="update_inner">
                  <h3 className="update__title">연락가능시간</h3>
                  <input
                    type="text"
                    autoComplete="none"
                    className="update_input"
                    placeholder="ex. 13시~15시 , 무관"
                    value={contactTime}
                    onChange={(e) => setContactTime(e.target.value)}
                  />
                </div>
                <div className="update_inner">
                  <h3 className="update__title">거래 방식</h3>
                  <input
                    type="text"
                    autoComplete="none"
                    className="update_input"
                    value={trade}
                    placeholder="ex.계좌이체&현금가능 , 계좌번호: 농협 ***-****-..."
                    onChange={(e) => setTrade(e.target.value)}
                  />
                </div>
              </div>

              <div className="update__location__container">
                <h3 className="update__title">위치 등록</h3>
                <p>
                  해당 위치를 기반으로 노출됩니다.
                  <br />
                  원하시는 위치를 설정해주세요(구 까지만 입력하시면 됩니다.)
                </p>

                <div className="job__location__inputbox">
                  <form>
                    <button onClick={submitLocation}>현재위치</button>
                    <input
                      className="update_location_button"
                      type="text"
                      value={locationInput}
                      placeholder="ex.서울시 서초구"
                      onChange={(e) => setLocationInput(e.target.value)}
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="worktitle__container">
            <div className="worktitle__title">
              <div className="update_title__headerbox">
                <h1 className="worktitle__header">추가 정보</h1>
                <p>Stpe 2 of 2</p>
              </div>
              <div className="worktitle__typeJob">
                <div className="update_inner">
                  <h3 className="update__title">관련 사업정보란</h3>
                  <input
                    type="text"
                    autoComplete="none"
                    className="update_input"
                    placeholder="ex.사업장주소 나 관련정보를 적어주세요"
                    value={Entrepreneur}
                    onChange={(e) => setEntrepreneur(e.target.value)}
                  />
                </div>
                <div className="job__hashtag__container">
                  <h3 className="job__hashtag__title">관련 자격증</h3>
                  <p>
                    하는 일을 가장 잘 설명해주는 관련된 자격증을 입력해 주세요.
                    자격증은 쉼표 ( , ) 단위로 구별됩니다.{" "}
                  </p>
                  {/* <input className="job__hashtag__inputbox" placeholder="e.g. 영상 디자인" type="text" autoComplete="none" /> */}
                  <div className="job__hashtag__inputbox">
                    <form onSubmit={submitHandler}>
                      <TagsInput
                        id="tags"
                        name="tags"
                        placeholder="e.g. 영상 디자인"
                        onChange={changeHandler}
                        error={errors.tags}
                        defaultTags={tags}
                      />
                    </form>
                  </div>
                </div>

                <div className="update_inner">
                  <h3 className="update__title">기타 1</h3>
                  <input
                    type="text"
                    autoComplete="none"
                    className="update_input"
                    value={title}
                    placeholder="ex.개인취향"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="update_inner">
                  <h3 className="update__title">기타 2</h3>
                  <input
                    type="text"
                    autoComplete="none"
                    className="update_input"
                    value={title}
                    placeholder="ex.관련경험"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>
              <br />
              <button className="update_finish_btn" onClick={() => updateBtn()}>
                프로필 등록
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageUpdateMy;
