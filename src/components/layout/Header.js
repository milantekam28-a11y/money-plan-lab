// src/components/layout/Header.js
import React, { useState } from 'react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="header">
      <nav className="nav-container">
        <a href="#" className="logo">
          <span className="logo-icon">🧮</span>
          Money Plan Lab
        </a>
        <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <li className="nav-item"><a href="#calculators">Investment calculators</a></li>
          <li className="nav-item"><a href="#features">Real Estate calculators</a></li>
          <li className="nav-item"><a href="#about">Travel calculators</a></li>
          <li className="nav-item"><a href="#contact">Insurance calculators </a></li>
        </ul>
        <div 
          className="mobile-toggle" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      <style jsx>{`
        .header {
          position: sticky;
          top: 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--gray-200);
          z-index: 1000;
          transition: all 0.3s ease;
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 70px;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--primary);
          text-decoration: none;
        }

        .logo-icon {
          font-size: 2rem;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .nav-menu {
          display: flex;
          list-style: none;
          gap: 32px;
        }

        .nav-item a {
          color: var(--gray-700);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
          position: relative;
        }

        .nav-item a:hover {
          color: var(--primary);
        }

        .nav-item a::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -5px;
          left: 0;
          background: var(--primary);
          transition: width 0.3s ease;
        }

        .nav-item a:hover::after {
          width: 100%;
        }

        .mobile-toggle {
          display: none;
          flex-direction: column;
          cursor: pointer;
          gap: 4px;
        }

        .mobile-toggle span {
          width: 25px;
          height: 3px;
          background: var(--gray-700);
          transition: all 0.3s ease;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .nav-menu {
            position: fixed;
            top: 70px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: white;
            flex-direction: column;
            justify-content: flex-start;
            padding: 40px 20px;
            transition: left 0.3s ease;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
          }

          .nav-menu.active {
            left: 0;
          }

          .mobile-toggle {
            display: flex;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;