import React from 'react';
import HeroSection from '../components/landing/HeroSection';
import StepsBooking from '../components/landing/StepsBooking';
import ServicesGrid from '../components/landing/ServicesGrid';
import DoctorsCarousel from '../components/landing/DoctorsCarousel';
import Testimonials from '../components/landing/Testimonials';
import ContactMap from '../components/landing/ContactMap';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <StepsBooking />
      <ServicesGrid />
      <DoctorsCarousel />
      <Testimonials />
      <ContactMap />
    </div>
  );
};

export default LandingPage; 