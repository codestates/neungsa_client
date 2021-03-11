import React, { useState, useEffect } from "react";
import "./Page2.css";
import { Link } from "react-router-dom";
import Next from "./BtnNext";
import Prev from "./BtnPrev";
import "./Tagging.scss";
import TagsInput from "./TagsInput";
import axios from "axios";

function WorkTitle({ handleWriteData }) {
  const [tags, setTags] = useState([]);
  const [emails, setEmails] = useState([]);
  const [coords, setCoords] = useState({});
  const [errors, setErrors] = useState({});
  const [locationInput, setLocationInput] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    setCoords((prev) => {
      return { ...prev, region: locationInput };
    });
  }, [locationInput]);

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

  return (
    <div className="worktitle">
      <div className="worktitle__container">
        <div className="worktitle__title">
          <div className="worktitle__headerbox">
            <h1 className="worktitle__header">제목 및 카테고리</h1>
            <p>Stpe 1 of 7</p>
          </div>
          <div className="worktitle__typeJob">
            <div className="worktitle__typejob__enter__container">
              <div className="typejob__enter">소개글을 입력해 주세요.</div>
              <input
                type="text"
                autoComplete="none"
                className="typejob__input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="worktitle__typejob__description">
              <ul className="typejob__details">
                소개글의 예시입니다:
                <li className="typejob__details__lists">
                  어깨통증, 체계적이고 전문적으로 지도해드리겠습니다!
                </li>
                <li className="typejob__details__lists">
                  가구 경력 20년 운송 20년 믿고 고용해도 좋습니다
                </li>
                <li className="typejob__details__lists">
                  소비자에게 각인 될 수 있는 로고를 만들어 드립니다.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="worktitle__job__category">
          <div className="job__category__container">
            <h3 className="job__category__title">서비스 카테고리</h3>
            <p className="job__category__content">
              서비스 카테고리를 선택해 주세요. 정확한 카테고리 선별은 소비자가
              접근하는데 도움이 됩니다. <br />
              파인애플이 소개글을 바탕으로 몇 가지 제안을 준비 했어요. 이중에
              원하시는 카테고리가 있나요?
            </p>
            {/* <div className="job__category__radio"></div> */}
          </div>
        </div>
        <div className="tag__container">
          <div className="job__hashtag__container">
            <h3 className="job__hashtag__title">서비스 키워드</h3>
            <p>
              하는 일을 가장 잘 설명해주는 카테고리에 관련된 테그를 입력해
              주세요. 테그는 쉼표 ( , ) 단위로 구별됩니다.{" "}
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
            <h3 className="job__hashtag__title">위치 등록</h3>
            <p>
              해당 위치를 기반으로 노출됩니다.
              <br />
              원하시는 위치를 설정해주세요(구 까지만 입력하시면 됩니다.)
            </p>

            <div className="job__location__inputbox">
              <form>
                <button onClick={submitLocation}>현재위치</button>
                <input
                  className="write_location_button"
                  type="text"
                  value={locationInput}
                  placeholder="ex.서울시 서초구"
                  onChange={(e) => setLocationInput(e.target.value)}
                />
              </form>
            </div>
          </div>
          <div className="container__btns">
            <Link className="writePage" to="/write/1">
              <Prev />
            </Link>
            <Link
              className="descriptionPage"
              to="/write/3"
              onClick={() => {
                handleWriteData(tags, coords, title);
              }}
            >
              <Next />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkTitle;
