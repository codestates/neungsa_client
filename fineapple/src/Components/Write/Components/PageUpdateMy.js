import React, { useState, useEffect } from "react";
import "./PageUpdateMy.css";
import { Link } from "react-router-dom";
import "./Tagging.scss";
import TagsInput from "./TagsInput";
import axios from "axios";
import UpdateSidebar from "./UpdateSidebar";
import { useAuth0 } from "@auth0/auth0-react";

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
  const [addOne, setAddOne] = useState("");
  const [addTwo, setAddTwo] = useState("");
  const { user, isAuthenticated, isLoading } = useAuth0();

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
      // console.log(tags, emails);
      // Submit form
    }
  };

  useEffect(() => {
    setCoords((prev) => {
      return { ...prev, region: locationInput };
    });
  }, [locationInput]);

  useEffect(() => {
    if (isAuthenticated) {
      axios
        .post("https://fineapple.kr/myPage", {
          email: user.email,
        })
        .then((res) => {
          let myData = res.data.mypagepost;
          // console.log(myData);
          setNickName(myData.nickname);
          if (myData.ContactTime) setContactTime(myData.ContactTime);
          if (myData.descrition) setTrade(myData.descrition); //descrition > trade 로 벼경 예정
          if (myData.Entrepreneur) setEntrepreneur(myData.Entrepreneur);
          if (myData.location) setLocationInput(myData.location);
          if (myData.trade) setTrade(myData.trade);
          if (myData.Certificate) setTags(myData.Certificate.split(","));
          if (myData.Job) setAddOne(myData.Job);
          if (myData.school) setAddTwo(myData.school);

          // console.log(myData);
        });
    }
  }, [isAuthenticated]);

  const submitLocation = (e) => {
    e.preventDefault();

    navigator.geolocation.getCurrentPosition(
      (position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

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
            const last = address.data.documents[1].region_1depth_name.slice(-1);
            if (last === "도") {
              let locationName = address.data.documents[1].region_2depth_name;
              setLocationInput(locationName);
              setCoords({
                lat: lat,
                lon: lon,
                region: locationName,
              });
            } else {
              let regionName =
                address.data.documents[1].region_1depth_name +
                " " +
                address.data.documents[1].region_2depth_name;
              let locationName = regionName;
              setLocationInput(locationName);
              setCoords({
                lat: lat,
                lon: lon,
                region: locationName,
              });
            }
          });
      },
      () => {
        alert("위치정보 접근을 허용해주세요");
      },
      { timeout: 6000 }
    );
  };

  const updateBtn = () => {
    let updateObj = {
      email: user.email,
      nickname: nickName,
      ContactTime: contactTime,
      trade: trade, //trade 로 수정예정
      location: coords.region,
      Entrepreneur: Entrepreneur,
      Certificate: tags,
      Job: addOne,
      school: addTwo,
    };
    // console.log(updateObj);

    axios
      .put("https://fineapple.kr/myPage/update", updateObj)
      .then((res) => {
        // console.log("ok");
        history.push("/mypage");
      })
      .catch((err) => alert("수정한 내용을 확인해주세요"));
  };

  const corfirmNickName = () => {
    axios
      .post("https://fineapple.kr/myPage/nickname", {
        email: user.email,
        nickname: nickName,
      })
      .then((res) => alert("사용가능한 닉네임 입니다."))
      .catch((err) => alert("중복된 닉네임 입니다."));
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
                  <button onClick={() => corfirmNickName()}>중복확인</button>
                </div>
                <div className="update_inner">
                  <h3 className="update__title">직업</h3>
                  <input
                    type="text"
                    autoComplete="none"
                    className="update_input"
                    placeholder="e.g. 대학생"
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
                  <h3 className="update__title">회사 및 학교</h3>
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
                  <h3 className="job__hashtag__title">분야 및 자격증</h3>
                  <p>
                    하는 일을 가장 잘 설명해주는 단어나 관련된 자격증을 입력해
                    주세요. 태그는 쉼표 ( , ) 단위로 구별됩니다.{" "}
                  </p>
                  {/* <input className="job__hashtag__inputbox" placeholder="e.g. 영상 디자인" type="text" autoComplete="none" /> */}
                  <div className="job__hashtag__inputbox_">
                    <form onSubmit={submitHandler}>
                      <TagsInput
                        id="tags"
                        name="tags"
                        placeholder="e.g. 영상 디자인"
                        onChange={changeHandler}
                        error={errors.tags}
                        value={tags}
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
                    value={addOne}
                    placeholder="e.g. 기타: 개인취향"
                    onChange={(e) => setAddOne(e.target.value)}
                  />
                </div>
                <div className="update_inner">
                  <h3 className="update__title">기타 2</h3>
                  <input
                    type="text"
                    autoComplete="none"
                    className="update_input"
                    value={addTwo}
                    placeholder="e.g.기타: 관련경험"
                    onChange={(e) => setAddTwo(e.target.value)}
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
