// components/calculators/EMICalculator.js

import React, { useState } from 'react';

const EMICalculator = ({ onBack }) => {
  const [principal, setPrincipal] = useState('10000');
  const [rate, setRate] = useState('5.5');
  const [tenure, setTenure] = useState('60');
  const [result, setResult] = useState(null);
  const [calculating, setCalculating] = useState(false);

  const calculateEMI = () => {
    setCalculating(true);
    
    setTimeout(() => {
      const P = parseFloat(principal);
      const r = parseFloat(rate) / 100 / 12;
      const n = parseFloat(tenure);
      
      if (P && r && n) {
        const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        const totalPayment = emi * n;
        const totalInterest = totalPayment - P;
        
        setResult({
          emi: emi.toFixed(2),
          totalPayment: totalPayment.toFixed(2),
          totalInterest: totalInterest.toFixed(2)
        });
      }
      setCalculating(false);
    }, 1000);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="calculator-container">
      <div className="calculator-header">
        <div className="calculator-icon">💰</div>
        <h2>Loan EMI Calculator</h2>
        <p>Calculate your monthly loan payments for any currency</p>
      </div>
      
      <div className="calculator-content">
        <div className="input-section">
          <div className="input-group">
            <label>Loan Amount ($)</label>
            <div className="input-wrapper">
              <span className="input-prefix">$</span>
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                placeholder="10,000"
                className="input-with-prefix"
              />
            </div>
          </div>
          
          <div className="input-group">
            <label>Annual Interest Rate (%)</label>
            <div className="input-wrapper">
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                placeholder="5.5"
                step="0.1"
                min="0"
                max="30"
              />
              <span className="input-suffix">%</span>
            </div>
          </div>
          
          <div className="input-group">
            <label>Loan Term (months)</label>
            <div className="input-wrapper">
              <input
                type="number"
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
                placeholder="60"
                min="1"
                max="480"
              />
              <span className="input-suffix">months</span>
            </div>
          </div>
          
          <div className="common-terms">
            <span>Quick Terms:</span>
            <button onClick={() => setTenure('12')} className="term-btn">1 Year</button>
            <button onClick={() => setTenure('36')} className="term-btn">3 Years</button>
            <button onClick={() => setTenure('60')} className="term-btn">5 Years</button>
            <button onClick={() => setTenure('360')} className="term-btn">30 Years</button>
          </div>
          
          <div className="button-group">
            <button 
              onClick={calculateEMI} 
              className="calculate-btn"
              disabled={calculating}
            >
              {calculating ? (
                <>
                  <div className="spinner"></div>
                  Calculating...
                </>
              ) : (
                'Calculate Payment'
              )}
            </button>
            
            <button 
              onClick={() => {
                setPrincipal('10000');
                setRate('5.5');
                setTenure('60');
                setResult(null);
              }} 
              className="reset-btn"
            >
              Reset
            </button>
          </div>
        </div>
        
        {result && (
          <div className="result-section">
            <h3>Payment Summary</h3>
            <div className="result-cards">
              <div className="result-card primary">
                <div className="result-icon">💰</div>
                <div className="result-info">
                  <div className="result-label">Monthly Payment</div>
                  <div className="result-value">{formatCurrency(result.emi)}</div>
                  <div className="result-sublabel">Per month for {tenure} months</div>
                </div>
              </div>
              
              <div className="result-card">
                <div className="result-icon">📊</div>
                <div className="result-info">
                  <div className="result-label">Total Amount</div>
                  <div className="result-value">{formatCurrency(result.totalPayment)}</div>
                  <div className="result-sublabel">Principal + Interest</div>
                </div>
              </div>
              
              <div className="result-card danger">
                <div className="result-icon">⚠️</div>
                <div className="result-info">
                  <div className="result-label">Total Interest</div>
                  <div className="result-value">{formatCurrency(result.totalInterest)}</div>
                  <div className="result-sublabel">Interest paid over loan term</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .calculator-container {
          background: white;
          border-radius: 24px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
          overflow: hidden;
          max-width: 800px;
          margin: 0 auto;
        }

        .calculator-header {
          text-align: center;
          padding: 3rem 3rem 2rem;
          background: linear-gradient(135deg, #f9fafb, #ffffff);
        }

        .calculator-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .calculator-header h2 {
          font-size: 2.2rem;
          font-weight: 800;
          margin-bottom: 0.75rem;
          color: #1f2937;
        }

        .calculator-header p {
          color: #6b7280;
          font-size: 1.1rem;
        }

        .calculator-content {
          padding: 0 3rem 3rem;
        }

        .input-section {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .input-group {
          position: relative;
        }

        .input-group label {
          display: block;
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.75rem;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-prefix,
        .input-suffix {
          position: absolute;
          color: #6b7280;
          font-weight: 600;
          z-index: 2;
          pointer-events: none;
        }

        .input-prefix {
          left: 1rem;
        }

        .input-suffix {
          right: 1rem;
        }

        .input-group input {
          width: 100%;
          padding: 1rem 1.25rem;
          border: 2px solid #e5e7eb;
          border-radius: 16px;
          font-size: 1.1rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .input-with-prefix {
          padding-left: 2.5rem !important;
        }

        .input-group input:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
        }

        .common-terms {
          display: flex;
          gap: 0.5rem;
          align-items: center;
          flex-wrap: wrap;
        }

        .common-terms span {
          font-weight: 500;
          color: #6b7280;
          margin-right: 0.5rem;
        }

        .term-btn {
          background: #f3f4f6;
          border: 1px solid #e5e7eb;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }

        .term-btn:hover {
          background: #2563eb;
          color: white;
          border-color: #2563eb;
        }

        .button-group {
          display: flex;
          gap: 1rem;
        }

        .calculate-btn,
        .reset-btn {
          padding: 1.25rem 2rem;
          border-radius: 16px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          flex: 1;
        }

        .calculate-btn {
          background: linear-gradient(135deg, #2563eb, #10b981);
          color: white;
          box-shadow: 0 10px 30px rgba(37, 99, 235, 0.4);
        }

        .calculate-btn:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(37, 99, 235, 0.5);
        }

        .reset-btn {
          background: #f3f4f6;
          color: #374151;
          border: 2px solid #e5e7eb;
        }

        .reset-btn:hover {
          background: #e5e7eb;
        }

        .calculate-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-right: 0.5rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .result-section {
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid #e5e7eb;
        }

        .result-section h3 {
          font-size: 1.5rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 2rem;
          color: #374151;
        }

        .result-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
        }

        .result-card {
          background: #f9fafb;
          border: 2px solid #e5e7eb;
          border-radius: 16px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: all 0.3s ease;
        }

        .result-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .result-card.primary {
          background: linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(16, 185, 129, 0.1));
          border-color: #2563eb;
        }

        .result-card.danger {
          background: rgba(220, 38, 38, 0.1);
          border-color: #dc2626;
        }

        .result-icon {
          font-size: 2rem;
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #2563eb, #10b981);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .result-card.danger .result-icon {
          background: linear-gradient(135deg, #dc2626, #b91c1c);
        }

        .result-info {
          flex: 1;
        }

        .result-label {
          font-weight: 600;
          color: #6b7280;
          font-size: 0.9rem;
          margin-bottom: 0.25rem;
        }

        .result-value {
          font-size: 1.5rem;
          font-weight: 800;
          color: #374151;
        }

        .result-card.primary .result-value {
          color: #2563eb;
        }

        .result-card.danger .result-value {
          color: #dc2626;
        }

        .result-sublabel {
          font-size: 0.8rem;
          color: #9ca3af;
          margin-top: 0.25rem;
        }

        @media (max-width: 768px) {
          .calculator-content {
            padding: 0 2rem 2rem;
          }

          .calculator-header {
            padding: 2rem 2rem 1rem;
          }

          .button-group {
            flex-direction: column;
          }

          .result-cards {
            grid-template-columns: 1fr;
          }

          .common-terms {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default EMICalculator;