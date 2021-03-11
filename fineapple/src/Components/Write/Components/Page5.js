import React from "react";
import axios from "axios";
import Next from "./BtnNext";
import Prev from "./BtnPrev";

import { Link, withRouter } from "react-router-dom";
import ReactS3 from "react-s3";

import "./Page5.css";
import { useAuth0 } from "@auth0/auth0-react";


function WorkReview({ writeData, handlecomplete, history }) {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const config = {
    bucketName: process.env.REACT_APP_BUCKETNAME,
    dirName: process.env.REACT_APP_DIRNAME,
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESSKEYID,
    secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY,
  };
  console.log(user, isAuthenticated);

  const addCommas = (num) => {
    if (num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return;
  };

  const handleSubmit = (data) => {
    console.log("ok", data.toForm);
    const formData = new FormData();
    if (data.toForm) {
      data.toForm.forEach((el) => formData.append("image", el));
      axios(
        {
          method: "post",
          url: "https://localhost:5000/uploadFiles",
          data: { formData: formData },
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    }

    handlecomplete();

    let submitObj = {

      email: user.email,

      group_category: data.type,
      profileimage: "profileimage",
      title: data.title,
      category: "data.category",
      tag: data.tags,
      content: data.content,
      images: data.file,
      location: data.region,
      latitude: data.lat,
      longitude: data.lon,
      serviceId: "12312",
      chatroom: "123123",
      cost: data.cost,
      form: formData,
    };
    console.log(submitObj);

    axios(
      {
        method: "post",
        url: "https://localhost:5000/write/friend",
        data: submitObj,
      },
      {
        headers: {
          "x-device-id": "stuff",
          "Content-Type": "multipart/form-data",
        },
      }
    ).then((res) => console.log("ok", res));
  };

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
            </div>
          )}

          <div className="container__btns">
            <Link className="writePage" to="/write/4">
              <Prev />
            </Link>
            <Link
              className="writePage"
              to="/Login"
              onClick={() => handleSubmit(writeData)}
            >
              <Next />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkReview;
