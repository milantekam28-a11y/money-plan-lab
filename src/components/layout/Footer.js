// src/components/layout/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="footer" id="contact">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="footer-logo-icon">🧮</span>
              Money Plan Lab
            </div>
            <p className="footer-description">
              Take charge of your money, career and life goals with powerful financial planning tools based on proven mathematical principles. Start your journey to financial freedom today.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <span>📘</span>
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <span>🐦</span>
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <span>💼</span>
              </a>
              <a href="#" className="social-link" aria-label="YouTube">
                <span>📺</span>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Debt Calculators</h3>
            <ul className="footer-links">
              <li><a href="debt-payoff.html" target="_blank">General Debt Payoff</a></li>
              <li><a href="credit-card-debt.html" target="_blank">Credit Card Debt</a></li>
              <li><a href="student-loan.html" target="_blank">Student Loan Payoff</a></li>
              <li><a href="car-loan.html" target="_blank">Car Loan</a></li>
              <li><a href="medical_debt_calculator.html" target="_blank">Medical Debt</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Investment & Planning</h3>
            <ul className="footer-links">
              <li><a href="budget_calculator.html" target="_blank">Budget Calculator</a></li>
              <li><a href="emergency-fund.html" target="_blank">Emergency Fund</a></li>
              <li><a href="investment.html" target="_blank">Investment Calculator</a></li>
              <li><a href="retirement.html" target="_blank">Retirement Planning</a></li>
              <li><a href="401k-calculator.html" target="_blank">401k Calculator</a></li>
              <li><a href="net-worth.html" target="_blank">Net Worth Calculator</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Real Estate & Tools</h3>
            <ul className="footer-links">
              <li><a href="mortgage.html" target="_blank">Mortgage Calculator</a></li>
              <li><a href="house-affordability.html" target="_blank">House Affordability</a></li>
              <li><a href="life-insurance.html" target="_blank">Life Insurance</a></li>
              <li><a href="vacation-savings.html" target="_blank">Vacation Savings</a></li>
              <li><a href="days-between-dates.html" target="_blank">Days Between Dates</a></li>
              <li><a href="tax-calculator.html" target="_blank">Tax Calculator</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Money Plan Lab. All rights reserved. | Part of <a href="https://moneyplanlab.com/" target="_blank" style={{color: 'var(--primary)'}}>MoneyPlanLab.com</a> - Your complete financial education resource</p>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: var(--gray-900);
          color: var(--gray-300);
          padding: 60px 20px 30px;
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 60px;
          margin-bottom: 40px;
        }

        .footer-brand {
          color: white;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 16px;
        }

        .footer-logo-icon {
          color: var(--primary);
          font-size: 2rem;
        }

        .footer-description {
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .social-links {
          display: flex;
          gap: 16px;
        }

        .social-link {
          width: 40px;
          height: 40px;
          background: var(--gray-800);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--gray-400);
          text-decoration: none;
          transition: all 0.3s ease;
          font-size: 1.2rem;
        }

        .social-link:hover {
          background: var(--primary);
          color: white;
          transform: translateY(-2px);
        }

        .footer-section h3 {
          color: white;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .footer-links {
          list-style: none;
        }

        .footer-links li {
          margin-bottom: 12px;
        }

        .footer-links a {
          color: var(--gray-400);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-links a:hover {
          color: var(--primary);
        }

        .footer-bottom {
          border-top: 1px solid var(--gray-800);
          padding-top: 30px;
          text-align: center;
          color: var(--gray-500);
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;