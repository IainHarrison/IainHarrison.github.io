import React from 'react';
import UnityGame from '../unity/UnityGame';
import { Animate } from '../animations/ScrollAnimations';

const About: React.FC = () => {
  return (
    <section className="about section" id="about">
      <Animate.SlideUp>
        <span className="section-subtitle">My Intro</span>
      </Animate.SlideUp>
      <Animate.SlideUp delay={200}>
        <h2 className="section-title">About Me</h2>               
      </Animate.SlideUp>

      <div className="about__container bd-grid">
        <Animate.SlideLeft delay={400}>
          <div className="about__data">
            <p className="about__description">
              Hi, I'm a games developer, passionate about creating and developing games. 
              I am very self-motivated and always striving to improve and learn new things.
            </p>

            <UnityGame />
          </div>
        </Animate.SlideLeft>

        <Animate.SlideRight delay={600}>
          <div>
            <div className="about__information">
              <Animate.FadeIn delay={800}>
                <h3 className="about__information-title">Information</h3>
              </Animate.FadeIn>

              <Animate.ScaleIn delay={1000}>
                <div className="about__information-data">
                  <i className='bx bx-user about__information-icon'></i>
                  <span>Iain Harrison</span>
                </div>
              </Animate.ScaleIn>

              <Animate.ScaleIn delay={1100}>
                <div className="about__information-data">
                  <i className='bx bx-phone about__information-icon'></i>
                  <span>+31 626221082</span>
                </div>
              </Animate.ScaleIn>

              <Animate.ScaleIn delay={1200}>
                <div className="about__information-data">
                  <i className='bx bx-envelope about__information-icon'></i>
                  <span>iainharrisonpro@gmail.com</span>
                </div>
              </Animate.ScaleIn>
            </div>

            <div className="about__information">
              <Animate.FadeIn delay={1300}>
                <h3 className="about__information-title">Experience and support</h3>
              </Animate.FadeIn>

              <Animate.BounceIn delay={1400}>
                <div className="about__information-data">
                  <i className='bx bx-medal about__information-icon'></i>
                  <div>
                    <span className="about__information-subtitle">3 years of paid employment</span>
                    <span className="about__information-subtitle-small">Experience</span>
                  </div>
                </div>
              </Animate.BounceIn>

              <Animate.BounceIn delay={1500}>
                <div className="about__information-data">
                  <i className='bx bx-briefcase-alt about__information-icon'></i>
                  <div>
                    <span className="about__information-subtitle">75+ Projects</span>
                    <span className="about__information-subtitle-small">Completed</span>
                  </div>
                </div>
              </Animate.BounceIn>

              <Animate.BounceIn delay={1600}>
                <div className="about__information-data">
                  <i className='bx bx-support about__information-icon'></i>
                  <div>
                    <span className="about__information-subtitle">Education</span>
                    <span className="about__information-subtitle-small">Saxion University of Applied Sciences</span>
                  </div>
                </div>
              </Animate.BounceIn>
            </div>
          </div>
        </Animate.SlideRight>
      </div>
    </section>
  );
};

export default About;
