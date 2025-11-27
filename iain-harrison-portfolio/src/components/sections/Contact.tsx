import React from 'react';

const Contact: React.FC = () => {
  return (
    <section className="contact section" id="contact">
      <span className="section-subtitle">Contact Me</span>
      <h2 className="section-title">Get In Touch</h2>

      <div className="contact__container bd-grid">
        <div>
          <div className="contact__info">
            <h3 className="contact__subtitle">Call me</h3>
            <span className="contact__text">+31 626221082</span>

            <h3 className="contact__subtitle">E-mail</h3>
            <span className="contact__text">iainharrisonpro@gmail.com</span>

            <h3 className="contact__subtitle">Location</h3>
            <span className="contact__text">Netherlands</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
