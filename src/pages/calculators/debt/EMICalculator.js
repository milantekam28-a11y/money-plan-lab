// src/pages/calculators/debt/EMICalculator.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../../components/SEO/SEOHead';

const EMICalculator = () => {
  const [principal, setPrincipal] = useState('500000');
  const [rate, setRate] = useState('10');
  const [tenure, setTenure] = useState('5');
  const [results, setResults] = useState(null);

  const calculateEMI = () => {
    const P = parseFloat(principal);
    const r = parseFloat(rate) / 12 / 100; // Monthly interest rate
    const n = parseFloat(tenure) * 12; // Total number of months

    if (P <= 0 || rate <= 0 || tenure <= 0) {
      return;
    }

    // EMI formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalAmount = emi * n;
    const totalInterest = totalAmount - P;

    setResults({
      emi: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest),
      principal: P
    });
  };

  useEffect(() => {
    calculateEMI();
  }, [principal, rate, tenure]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <>
      <SEOHead
        title="EMI Calculator - Calculate Monthly Loan Payments"
        description="Calculate monthly EMI payments for any loan. Free EMI calculator with principal, interest rate, and tenure. Get instant results with detailed payment breakdown."
        keywords="EMI calculator, loan calculator, monthly payment calculator, equated monthly installment"
        canonicalUrl="/debt-calculators/emi-calculator"
      />

      <div className="calculator-page">
        {/* Breadcrumb */}
        <nav className="breadcrumb-nav">
          <div className="container">
            <Link to="/">Home</Link> / <Link to="/debt-calculators">Debt Calculators</Link> / EMI Calculator
          </div>
        </nav>

        {/* Calculator Hero */}
        <section className="calculator-hero">
          <div className="container">
            <h1>EMI Calculator</h1>
            <p>Calculate your monthly loan payments instantly</p>
          </div>
        </section>

        {/* Calculator Interface */}
        <section className="calculator-interface">
          <div className="container">
            <div className="calculator-grid">
              {/* Input Section */}
              <div className="calculator-inputs">
                <h2>Loan Details</h2>
                
                <div className="input-group">
                  <label>Loan Amount (Principal)</label>
                  <input
                    type="number"
                    value={principal}
                    onChange={(e) => setPrincipal(e.target.value)}
                    placeholder="500000"
                  />
                </div>

                <div className="input-group">
                  <label>Interest Rate (Per Annum)</label>
                  <input
                    type="number"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    placeholder="10"
                    step="0.1"
                  />
                </div>

                <div className="input-group">
                  <label>Loan Tenure (Years)</label>
                  <input
                    type="number"
                    value={tenure}
                    onChange={(e) => setTenure(e.target.value)}
                    placeholder="5"
                  />
                </div>
              </div>

              {/* Results Section */}
              <div className="calculator-results">
                <h2>EMI Results</h2>
                
                {results && (
                  <div className="results-grid">
                    <div className="result-card highlight">
                      <div className="result-label">Monthly EMI</div>
                      <div className="result-value">{formatCurrency(results.emi)}</div>
                    </div>
                    
                    <div className="result-card">
                      <div className="result-label">Principal Amount</div>
                      <div className="result-value">{formatCurrency(results.principal)}</div>
                    </div>
                    
                    <div className="result-card">
                      <div className="result-label">Total Interest</div>
                      <div className="result-value">{formatCurrency(results.totalInterest)}</div>
                    </div>
                    
                    <div className="result-card">
                      <div className="result-label">Total Amount</div>
                      <div className="result-value">{formatCurrency(results.totalAmount)}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        .calculator-page {
          min-height: 100vh;
          padding-top: 20px;
        }

        .breadcrumb-nav {
          background: var(--gray-50);
          padding: 12px 0;
          margin-bottom: 20px;
        }

        .calculator-hero {
          background: linear-gradient(135deg, var(--primary), var(--primary-dark));
          color: white;
          padding: 60px 0;
          text-align: center;
        }

        .calculator-hero h1 {
          font-size: 2.5rem;
          margin-bottom: 16px;
        }

        .calculator-interface {
          padding: 60px 0;
          background: var(--gray-50);
        }

        .calculator-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .calculator-inputs,
        .calculator-results {
          background: white;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .input-group {
          margin-bottom: 24px;
        }

        .input-group label {
          display: block;
          font-weight: 600;
          margin-bottom: 8px;
          color: var(--gray-700);
        }

        .input-group input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid var(--gray-200);
          border-radius: 8px;
          font-size: 1.1rem;
        }

        .input-group input:focus {
          outline: none;
          border-color: var(--primary);
        }

        .results-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .result-card {
          padding: 20px;
          background: var(--gray-50);
          border-radius: 12px;
          text-align: center;
        }

        .result-card.highlight {
          background: var(--primary);
          color: white;
        }

        .result-label {
          font-size: 0.9rem;
          margin-bottom: 8px;
          opacity: 0.8;
        }

        .result-value {
          font-size: 1.5rem;
          font-weight: 800;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        @media (max-width: 768px) {
          .calculator-grid {
            grid-template-columns: 1fr;
          }
          
          .results-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
};

export default EMICalculator;