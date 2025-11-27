import React from 'react';
import { Testimonial } from '../../types/testimonial';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="testimonial__card">
      <div className="testimonial__content">
        <div className="testimonial__quote">
          <i className='bx bxs-quote-alt-left'></i>
        </div>
        <p className="testimonial__description">{testimonial.quote}</p>
        <div className="testimonial__details">
          <h3 className="testimonial__name">
            {testimonial.linkedinUrl ? (
              <a href={testimonial.linkedinUrl} target="_blank" rel="noopener noreferrer">
                {testimonial.name} <i className='bx bxl-linkedin-square'></i>
              </a>
            ) : (
              testimonial.name
            )}
          </h3>
          <span className="testimonial__position">{testimonial.position}</span>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
