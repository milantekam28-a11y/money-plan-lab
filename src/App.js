// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Components
import LoadingScreen from './components/ui/LoadingScreen';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Pages - Import only what exists
import HomePage from './pages/HomePage';
import EMICalculator from './pages/calculators/debt/EMICalculator'; // 👈 ADD THIS LINE

// Styles
import './styles/globals.css';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <HelmetProvider>
      <Router>
        <div className="app">
          <Header />
          <Routes>
            {/* Home Page */}
            <Route path="/" element={<HomePage />} />
            
            {/* EMI Calculator */}
            <Route path="/debt-calculators/emi-calculator" element={<EMICalculator />} /> {/* 👈 ADD THIS LINE */}
            
            {/* Temporary - other routes will be added later */}
            <Route path="*" element={
              <div style={{padding: '100px 20px', textAlign: 'center'}}>
                <h1>Page Coming Soon</h1>
                <p>This calculator page is under development.</p>
              </div>
            } />
          </Routes>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
};

export default App;