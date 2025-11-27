import React from 'react';
import UnityGame from '../unity/UnityGame';

const About: React.FC = () => {
  return (
    <section className="about section" id="about">
      <span className="section-subtitle">My Intro</span>
      <h2 className="section-title">About Me</h2>               

      <div className="about__container bd-grid">
        <div className="about__data">
          <p className="about__description">
            Hi, I'm a games developer, passionate about creating and developing games. 
            I am very self-motivated and always striving to improve and learn new things.
          </p>

          <UnityGame />
        </div>

        <div>
          <div className="about__information">
            <h3 className="about__information-title">Information</h3>

            <div className="about__information-data">
              <i className='bx bx-user about__information-icon'></i>
              <span>Iain Harrison</span>
            </div>

            <div className="about__information-data">
              <i className='bx bx-phone about__information-icon'></i>
              <span>+31 626221082</span>
            </div>

            <div className="about__information-data">
              <i className='bx bx-envelope about__information-icon'></i>
              <span>iainharrisonpro@gmail.com</span>
            </div>
          </div>

          <div className="about__information">
            <h3 className="about__information-title">Experience and support</h3>

            <div className="about__information-data">
              <i className='bx bx-medal about__information-icon'></i>
              <div>
                <span className="about__information-subtitle">3 years of paid employment</span>
                <span className="about__information-subtitle-small">Experience</span>
              </div>
            </div>

            <div className="about__information-data">
              <i className='bx bx-briefcase-alt about__information-icon'></i>
              <div>
                <span className="about__information-subtitle">75+ Projects</span>
                <span className="about__information-subtitle-small">Completed</span>
              </div>
            </div>

            <div className="about__information-data">
              <i className='bx bx-support about__information-icon'></i>
              <div>
                <span className="about__information-subtitle">Education</span>
                <span className="about__information-subtitle-small">Saxion University of Applied Sciences</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
