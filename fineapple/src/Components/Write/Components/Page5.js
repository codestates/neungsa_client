import React, { useEffect, useState } from "react";
import axios from "axios";
import Next from "./BtnNext";
import Prev from "./BtnPrev";
import { Link, withRouter } from "react-router-dom";
import ReactS3 from "react-s3";
import "./Page5.css";
import { useAuth0 } from "@auth0/auth0-react";
import FadeLoader from "react-spinners/FadeLoader";
import { css } from "@emotion/core";

const override = css`
  display: block;
  margin-bottom: 0 auto;
  border-color: yellow;
  height: 15px;
  width: 5px;
  radius: 5px;
  margin-bottom: 40px;
  margin-left: 250px;
`;

function WorkReview({ writeData, handlecomplete, history }) {
  const { loginWithRedirect } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const config = {
    bucketName: process.env.REACT_APP_BUCKETNAME,
    dirName: process.env.REACT_APP_DIRNAME,
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESSKEYID,
    secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY,
  };
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("rgb(251, 216, 110)");
  const [submitLoading, setSubmitLoading] = useState(false);

  const addCommas = (num) => {
    if (num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return;
  };

  async function uploadS3(uploadS3Files) {
    let s3Objects = [];

    for (let file of uploadS3Files) {
      await ReactS3.uploadFile(file, config).then((data) => {
        s3Objects.push(data.location);
      });
    }

    return s3Objects;
  }

  async function handleSubmit(data) {
    setSubmitLoading(true);
    if (!user) {
      loginWithRedirect();
    } else {
      const uploadS3Files = data.toForm;
      let s3;
      if (uploadS3Files) {
        s3 = await uploadS3(uploadS3Files);
      }
      let submitObj = {
        email: user.email,
        group_category: data.type,
        profileimage: "profileimage",
        title: data.title,
        category: data.category,
        tag: data.tags,
        content: data.content,
        images: s3 || [],
        location: data.region,
        latitude: data.lat,
        longitude: data.lon,
        serviceId: "12312",
        chatroom: "123123",
        cost: data.cost,
      };
      axios({
        method: "post",
        url: "https://fineapple.kr/write/friend",
        data: submitObj,
      })
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });

      handlecomplete();
      history.push("/feed");
      return () => setSubmitLoading(false);
    }
  }

  const renderPhotos = (photos) => {
    if (photos) {
      return photos.map((photo) => {
        return (
          <img
            src={photo}
            key={photo}
            alt=""
            style={{ width: "70px", margin: "10px" }}
          />
        );
      });
    }
  };
  return (
    <div className="workreview">
      <div className="workreview__container">
        <div className="workreview__title">
          <div className="workreview__title__header">
            <h1>리뷰하고 글 작성하기</h1>
            <div
              className="workreview__post__now"
              onClick={() => handleSubmit(writeData)}
            >
              게시글 저장
            </div>
          </div>

          <h1 className="workreview__top">글 제목</h1>
          <div className="workreview__container">
            <h1>글 제목</h1>
            <p>{writeData.title}</p>
          </div>
          <div className="workreview__container">
            {submitLoading ? (
              <FadeLoader
                color={color}
                loading={loading}
                css={override}
                size={100}
              />
            ) : (
              ""
            )}
            <h1>서비스 카테고리</h1>
            <p>교육</p>
          </div>

          <div className="workreview__container">
            <h1>서비스 태그</h1>
            <div className="workreview__tag__container">
              {writeData.tags &&
                writeData.tags.map((tag, idx) => (
                  <div key={idx} className="tag__review">
                    {tag}
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="workreview__description">
          <h1 className="workreview__top">상세 설명</h1>
          <div className="workreview__container">
            <h1>상세 설명</h1>
            <p>{writeData.content}</p>
            <h1>첨부 이미지</h1>
            {renderPhotos(writeData.file)}
          </div>
        </div>
        <div className="workrevview__budget">
          <h1 className="workreview__top">가격 및 예산</h1>

          <div className="workreview__container">
            <h1>결제 방법</h1>
            <p>{writeData.payment === "meet" ? "추후 협의" : "시간당 계산"}</p>
          </div>
          {writeData.payment === "meet" ? (
            ""
          ) : (
            <div className="workreview__container">
              <h1>시간당 가격</h1>
              <p>{addCommas(writeData.cost)} 원</p>
              {submitLoading ? (
                <FadeLoader
                  color={color}
                  loading={loading}
                  css={override}
                  size={100}
                />
              ) : (
                ""
              )}
            </div>
          )}

          <div className="container__btns">
            <Link className="writePage" to="/write/4">
              <Prev />
            </Link>

            <div className="writePage" onClick={() => handleSubmit(writeData)}>
              <Next onClick={() => handleSubmit(writeData)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(WorkReview);
