import React from 'react';
import { testimonialsData } from '../../data/testimonials';
import TestimonialCard from '../ui/TestimonialCard';

const Testimonials: React.FC = () => {
  return (
    <section className="testimonials section" id="testimonials">
      <span className="section-subtitle">What Others Say</span>
      <h2 className="section-title">Testimonials</h2>

      <div className="testimonials__container bd-grid">
        {testimonialsData.map((testimonial, index) => (
          <TestimonialCard key={index} testimonial={testimonial} />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
