import React from 'react';
import TestimonialCarousel from '../ui/TestimonialCarousel';
import { Animate } from '../animations/ScrollAnimations';

const Testimonials: React.FC = () => {
  return (
    <section className="testimonials section" id="testimonials">
      <Animate.SlideUp>
        <span className="section-subtitle">What Others Say</span>
      </Animate.SlideUp>
      <Animate.SlideUp delay={200}>
        <h2 className="section-title">Testimonials</h2>
      </Animate.SlideUp>

      <TestimonialCarousel />
    </section>
  );
};

export default Testimonials;
