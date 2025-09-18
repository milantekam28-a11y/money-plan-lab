// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import LoadingScreen from './components/ui/LoadingScreen';
import ScrollToTop from './components/ui/ScrollToTop';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './pages/HomePage';

// Category Pages
import DebtCategory from './pages/categories/DebtCategory';
import BudgetCategory from './pages/categories/BudgetCategory';

// Debt Calculators
import EMICalculator from './pages/calculators/debt/EMICalculator';
import UniversalDebtPayoff from './pages/calculators/debt/UniversalDebtPayoff';
import CreditCardDebtCalculator from './pages/calculators/debt/CreditCardDebtCalculator';
import StudentLoanCalculator from './pages/calculators/debt/StudentLoanCalculator';
import CarLoanCalculator from './pages/calculators/debt/CarLoanCalculator';
import MedicalDebtCalculator from './pages/calculators/debt/MedicalDebtCalculator';

// Budget Calculators
import BudgetCalculator from './pages/calculators/budget/BudgetCalculator';
import EmergencyFundCalculator from './pages/calculators/budget/EmergencyFundCalculator';
import SavingsGoalCalculator from './pages/calculators/budget/SavingsGoalCalculator';
import CollegeSavingsCalculator from './pages/calculators/budget/CollegeSavingsCalculator';

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
    <Router>
      <ScrollToTop />
      <div className="app">
        <Header />
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<HomePage />} />
          
          {/* Category Pages - NEW URLs with /category/ prefix */}
          <Route path="/category/debt-calculators" element={<DebtCategory />} />
          <Route path="/category/budget-calculators" element={<BudgetCategory />} />
          <Route path="/category/investment-calculators" element={
            <div style={{ padding: '100px 20px', textAlign: 'center', minHeight: '60vh' }}>
              <h1>Investment Calculators Coming Soon</h1>
              <p>We're building amazing investment calculators for you.</p>
              <a href="/" style={{ background: '#2563eb', color: 'white', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600' }}>Back to Home</a>
            </div>
          } />
          <Route path="/category/real-estate-calculators" element={
            <div style={{ padding: '100px 20px', textAlign: 'center', minHeight: '60vh' }}>
              <h1>Real Estate Calculators Coming Soon</h1>
              <p>We're building amazing real estate calculators for you.</p>
              <a href="/" style={{ background: '#2563eb', color: 'white', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600' }}>Back to Home</a>
            </div>
          } />
          <Route path="/category/travel-calculators" element={
            <div style={{ padding: '100px 20px', textAlign: 'center', minHeight: '60vh' }}>
              <h1>Travel Calculators Coming Soon</h1>
              <p>We're building amazing travel calculators for you.</p>
              <a href="/" style={{ background: '#2563eb', color: 'white', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600' }}>Back to Home</a>
            </div>
          } />
          <Route path="/category/insurance-calculators" element={
            <div style={{ padding: '100px 20px', textAlign: 'center', minHeight: '60vh' }}>
              <h1>Insurance Calculators Coming Soon</h1>
              <p>We're building amazing insurance calculators for you.</p>
              <a href="/" style={{ background: '#2563eb', color: 'white', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600' }}>Back to Home</a>
            </div>
          } />
          <Route path="/category/utilities-calculators" element={
            <div style={{ padding: '100px 20px', textAlign: 'center', minHeight: '60vh' }}>
              <h1>Utility Calculators Coming Soon</h1>
              <p>We're building amazing utility calculators for you.</p>
              <a href="/" style={{ background: '#2563eb', color: 'white', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600' }}>Back to Home</a>
            </div>
          } />
          
          {/* Debt Calculator Pages */}
          <Route path="/debt-calculators/emi-calculator" element={<EMICalculator />} />
          <Route path="/debt-calculators/universal-debt-payoff" element={<UniversalDebtPayoff />} />
          <Route path="/debt-calculators/credit-card-debt" element={<CreditCardDebtCalculator />} />
          <Route path="/debt-calculators/student-loan-payoff" element={<StudentLoanCalculator />} />
          <Route path="/debt-calculators/car-loan-calculator" element={<CarLoanCalculator />} />
          <Route path="/debt-calculators/medical-debt-calculator" element={<MedicalDebtCalculator />} />
          
          {/* Budget Calculator Pages */}
          <Route path="/budget-calculators/budget-calculator" element={<BudgetCalculator />} />
          <Route path="/budget-calculators/emergency-fund" element={<EmergencyFundCalculator />} />
          <Route path="/budget-calculators/savings-goal" element={<SavingsGoalCalculator />} />
          <Route path="/budget-calculators/college-savings" element={<CollegeSavingsCalculator />} />
          
          {/* Legacy Routes for old URLs - Redirect to new structure */}
          <Route path="/debt-calculators" element={<DebtCategory />} />
          <Route path="/budget-calculators" element={<BudgetCategory />} />
          
          {/* Direct Calculator Routes */}
          <Route path="/emi-calculator" element={<EMICalculator />} />
          <Route path="/debt-payoff-calculator" element={<UniversalDebtPayoff />} />
          <Route path="/credit-card-payoff-calculator" element={<CreditCardDebtCalculator />} />
          <Route path="/student-loan-calculator" element={<StudentLoanCalculator />} />
          <Route path="/car-loan-calculator" element={<CarLoanCalculator />} />
          <Route path="/medical-debt-calculator" element={<MedicalDebtCalculator />} />
          <Route path="/budget-calculator" element={<BudgetCalculator />} />
          <Route path="/emergency-fund-calculator" element={<EmergencyFundCalculator />} />
          <Route path="/savings-goal-calculator" element={<SavingsGoalCalculator />} />
          <Route path="/college-savings-calculator" element={<CollegeSavingsCalculator />} />
          
          {/* 404 Fallback */}
          <Route path="*" element={
            <div style={{
              padding: '100px 20px',
              textAlign: 'center',
              minHeight: '60vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <h1>Page Coming Soon</h1>
              <p>This calculator is under development.</p>
              <a href="/" style={{
                background: '#2563eb',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600'
              }}>
                Back to Home
              </a>
            </div>
          } />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;