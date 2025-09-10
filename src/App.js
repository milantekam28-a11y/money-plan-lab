// src/App.js
import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/ui/LoadingScreen';
import Header from './components/layout/Header';
import HeroSection from './components/sections/HeroSection';
import TrustedBySection from './components/sections/TrustedBySection';
import StatsSection from './components/sections/StatsSection';
import CalculatorSection from './components/sections/CalculatorSection';
import FeaturesSection from './components/sections/FeaturesSection';
import Footer from './components/layout/Footer';
import './styles/globals.css';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [animateCounter, setAnimateCounter] = useState(false);
  
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setAnimateCounter(true);
    }, 1500);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="app">
      <Header />
      <HeroSection />
      <TrustedBySection />
      <StatsSection animateCounter={animateCounter} />
      <CalculatorSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default App;