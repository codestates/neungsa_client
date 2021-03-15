/*global kakao*/
import React, { useEffect, useState } from "react";
import axios from "axios";
import { css } from "@emotion/core";
import Map from "../../img/mockup/map2.png";
import ClipLoader from "react-spinners/BeatLoader";

const override = css`
  padding-top: 150px;
  display: flex;
  justify-content: center;
  align-item: center;
`;

const MapContents = ({ handleMap }) => {
  // Loading effect
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#fbd86e");

  const [allowLocation, setAllowLocation] = useState(true);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        // let locPosition = new kakao.maps.LatLng(lat, lon);
        // console.log(locPosition);
        kakao.maps.load(() => {
          let container = document.getElementById("map");
          let options = {
            center: new kakao.maps.LatLng(lat, lon),
            level: 6,
          };

          const map = new window.kakao.maps.Map(container, options);

          let markerPosition = new kakao.maps.LatLng(lat, lon);

          // 마커를 생성
          let marker = new kakao.maps.Marker({
            position: markerPosition,
          });

          // 마커를 지도 위에 표시
          marker.setMap(map);

          axios
            .get(
              `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${lon}&y=${lat}`,
              {
                headers: {
                  Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_AK}`,
                },
              }
            )
            .then((address) => {
              const last = address.data.documents[1].region_1depth_name.slice(
                -1
              );
              if (last === "도") {
                handleMap(address.data.documents[1].region_2depth_name);
              } else {
                let regionName =
                  address.data.documents[1].region_1depth_name +
                  " " +
                  address.data.documents[1].region_2depth_name;
                handleMap(regionName);
              }
            });
        });
      },
      () => {
        setAllowLocation(false);
      }
    );
  }, []);

  return (
    <div>
      {allowLocation ? (
        <div
          id="map"
          style={{ width: "100%", height: "375px", margin: "50px 0" }}
        >
          <div className="sweet-loading">
            <ClipLoader
              color={color}
              loading={loading}
              css={override}
              size={15}
            />
          </div>
        </div>
      ) : (
        <img className="map_img" src={Map} alt="gangnam_map" />
      )}
    </div>
  );
};

export default MapContents;
