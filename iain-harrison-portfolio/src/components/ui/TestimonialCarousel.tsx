import React from 'react';
import Slider from "react-slick";
import { testimonialsData } from '../../data/testimonials';
import { Animate } from '../animations/ScrollAnimations';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TestimonialCarousel: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: true
        }
      }
    ]
  };

  return (
    <Animate.SlideUp delay={400}>
      <div className="testimonial-carousel">
        <Slider {...settings}>
          {testimonialsData.map((testimonial, index) => (
            <div key={index} className="testimonial-slide">
              <div className="testimonial-card">
                <div className="testimonial-content">
                  <div className="quote-icon">
                    <i className="bx bxs-quote-alt-left"></i>
                  </div>
                  <p className="testimonial-text">"{testimonial.quote}"</p>
                </div>
                
                <div className="testimonial-author">
                  <div className="author-avatar">
                    {testimonial.avatar ? (
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className="avatar-fallback" style={{ display: testimonial.avatar ? 'none' : 'flex' }}>
                      <i className="bx bx-user"></i>
                    </div>
                  </div>
                  
                  <div className="author-info">
                    <h4 className="author-name">{testimonial.name}</h4>
                    <p className="author-position">{testimonial.position}</p>
                    {testimonial.company && (
                      <p className="author-company">{testimonial.company}</p>
                    )}
                    {testimonial.linkedinUrl && (
                      <a 
                        href={testimonial.linkedinUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="linkedin-link"
                      >
                        <i className="bx bxl-linkedin"></i>
                        Connect on LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </Animate.SlideUp>
  );
};

export default TestimonialCarousel;
