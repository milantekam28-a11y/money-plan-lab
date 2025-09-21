// src/components/layout/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

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
              <a href="https://facebook.com/moneyplanlab" className="social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <span>📘</span>
              </a>
              <a href="https://twitter.com/moneyplanlab" className="social-link" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                <span>🐦</span>
              </a>
              <a href="https://linkedin.com/company/moneyplanlab" className="social-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <span>💼</span>
              </a>
              <a href="https://youtube.com/@moneyplanlab" className="social-link" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                <span>📺</span>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Debt Calculators</h3>
            <ul className="footer-links">
              <li><Link to="/debt-calculators/emi-calculator">EMI Calculator</Link></li>
              <li><Link to="/debt-calculators/universal-debt-payoff">Debt Payoff Calculator</Link></li>
              <li><Link to="/debt-calculators/credit-card-debt">Credit Card Debt</Link></li>
              <li><Link to="/debt-calculators/student-loan-payoff">Student Loan Payoff</Link></li>
              <li><Link to="/debt-calculators/car-loan-calculator">Car Loan Calculator</Link></li>
              <li><Link to="/debt-calculators/medical-debt-calculator">Medical Debt Calculator</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Budget & Planning</h3>
            <ul className="footer-links">
              <li><Link to="/budget-calculators/budget-calculator">Budget Calculator</Link></li>
              <li><Link to="/budget-calculators/emergency-fund">Emergency Fund Calculator</Link></li>
              <li><Link to="/budget-calculators/savings-goal">Savings Goal Calculator</Link></li>
              <li><Link to="/budget-calculators/college-savings">College Savings Calculator</Link></li>
              <li><Link to="/investment-calculators/compound-interest">Compound Interest</Link></li>
              <li><Link to="/investment-calculators/retirement">Retirement Planning</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Company & Legal</h3>
            <ul className="footer-links">
              <li><Link to="/calculators">All Calculators</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/disclaimer">Disclaimer</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/">Home</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Money Plan Lab. All rights reserved. | Part of <a href="https://moneyplanlab.com/" target="_blank" rel="noopener noreferrer" style={{color: 'var(--primary)'}}>MoneyPlanLab.com</a> - Your complete financial education resource</p>
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
          margin: 0;
          padding: 0;
        }

        .footer-links li {
          margin-bottom: 12px;
        }

        .footer-links a {
          color: var(--gray-400);
          text-decoration: none;
          transition: color 0.3s ease;
          display: block;
          padding: 2px 0;
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

        .footer-bottom a {
          color: var(--primary);
          text-decoration: none;
        }

        .footer-bottom a:hover {
          text-decoration: underline;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          
          .footer-section h3 {
            font-size: 1.2rem;
          }
          
          .footer-links a {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;