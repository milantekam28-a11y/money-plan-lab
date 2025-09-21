// src/pages/HomePage.js - Keep this structure!
import React, { useState, useEffect } from 'react';
import HeroSection from '../components/sections/HeroSection';
import TrustedBySection from '../components/sections/TrustedBySection';
import StatsSection from '../components/sections/StatsSection';
import CalculatorSection from '../components/sections/CalculatorSection';
import FeaturesSection from '../components/sections/FeaturesSection';

const HomePage = () => {
  const [animateCounter, setAnimateCounter] = useState(false);
  
  useEffect(() => {
    setTimeout(() => {
      setAnimateCounter(true);
    }, 500);
  }, []);

  return (
    <>
      <HeroSection />
      <TrustedBySection />
      <StatsSection animateCounter={animateCounter} />
      <CalculatorSection />
      <FeaturesSection />
    </>
  );
};

export default HomePage;