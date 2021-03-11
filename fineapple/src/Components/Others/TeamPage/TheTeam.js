import React from "react";
import "./TheTeam.css";


import emily_front from '../../../img/Team/emily_front.png'
import emily_back from '../../../img/Team/emily_back.png'
import seung_front from '../../../img/Team/seung_front.png'
import seung_back from '../../../img/Team/seung_back.png'
import go_front from '../../../img/Team/go_front.png'

function TheTeam() {
  return (
    <section className="section members">
      <div className="theteam__container">
        <header className="section-header text-center">
          <h2 className="section-title"> team fineapple </h2>
        </header>
        <div className="team">
          <div className="team-member">
            <div className="card">
              <div className="card-front">
                <div className="team-member__image">
                  <figure className="img-holder">
                    <img src={emily_front} alt="" />
                  </figure>
                </div>
                <div className="team-member__body">
                  <h3 className="team-member__title">윤어진</h3>
                  <span className="team-member__subtitle">Project Manager</span>
                </div>
              </div>
              <div className="card-back">
                <div className="team-member__image">
                  <figure className="img-holder">
                    <img src={emily_back} alt="" />
                  </figure>
                </div>
                <div className="team-member__body">
                  <h3 className="team-member__title">윤어진</h3>
                  <span className="team-member__subtitle">
                    Wanted to be a psychiatrist
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="team-member">
            <div className="card">
              <div className="card-front">
                <div className="team-member__image">
                  <figure className="img-holder">
                    <img src={seung_front} alt="" />
                  </figure>
                </div>
                <div className="team-member__body">
                  <h3 className="team-member__title">오승익</h3>
                  <span className="team-member__subtitle">
                    Frontend Developer
                  </span>
                </div>
              </div>
              <div className="card-back">
                <div className="team-member__image">
                  <figure className="img-holder">
                    <img src={seung_back} alt="" />
                  </figure>
                </div>
                <div className="team-member__body">
                  <h3 className="team-member__title">오승익</h3>
                  <span className="team-member__subtitle">
                    Wanted to be an Scientist
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="team-member">
            <div className="card">
              <div className="card-front">
                <div className="team-member__image">
                  <figure className="img-holder">
                  <img src={seung_back} alt="" />
                  </figure>
                </div>
                <div className="team-member__body">
                  <h3 className="team-member__title">현승환</h3>
                  <span className="team-member__subtitle">
                    Backend Developer
                  </span>
                </div>
              </div>
              <div className="card-back">
                <div className="team-member__image">
                  <figure className="img-holder">
                  <img src={seung_back} alt="" />
                  </figure>
                </div>
                <div className="team-member__body">
                  <h3 className="team-member__title">현승환</h3>
                  <span className="team-member__subtitle">
                    Wanted to be a pilot
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="team-member">
            <div className="card">
              <div className="card-front">
                <div className="team-member__image">
                  <figure className="img-holder">
                  <img src={go_front} alt="" />
                  </figure>
                </div>
                <div className="team-member__body">
                  <h3 className="team-member__title">최고훈</h3>
                  <span className="team-member__subtitle">
                    Backend Developer
                  </span>
                </div>
              </div>
              <div className="card-back">
                <div className="team-member__image">
                  <figure className="img-holder">
                  <img src={seung_back} alt="" />
                  </figure>
                </div>
                <div className="team-member__body">
                  <h3 className="team-member__title">최고훈</h3>
                  <span className="team-member__subtitle">
                    Wanted to be a detective
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TheTeam;
