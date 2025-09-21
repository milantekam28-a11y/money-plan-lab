// src/components/sections/HeroSection.js - Professional Upgrade
import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-background">
        <div className="floating-element element-1"></div>
        <div className="floating-element element-2"></div>
        <div className="floating-element element-3"></div>
        <div className="floating-element element-4"></div>
      </div>
      
      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-icon">🚀</span>
          <span>Free Financial Planning Tools</span>
        </div>
        
        <h1 className="hero-title">
          Take Control of Your 
          <span className="gradient-text"> Financial Future</span>
        </h1>
        
        <p className="hero-description">
          Free, powerful financial calculators based on proven mathematical principles. 
          Build wealth, eliminate debt, and achieve your money goals faster with our 
          comprehensive suite of 25+ professional tools.
        </p>
        
        <div className="hero-features">
          <div className="feature-item">
            <span className="feature-icon">🔒</span>
            <span>100% Secure & Private</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📱</span>
            <span>Mobile Optimized</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">⚡</span>
            <span>Instant Results</span>
          </div>
        </div>
        
        <div className="hero-buttons">
          <Link to="/calculators" className="btn-primary">
            <span className="btn-icon">🧮</span>
            <span>Explore All Calculators</span>
            <span className="btn-arrow">→</span>
          </Link>
          <Link to="/about" className="btn-secondary">
            <span className="btn-icon">ℹ️</span>
            <span>Learn More</span>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .hero-section {
          position: relative;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 120px 20px 80px;
          text-align: center;
          color: white;
          overflow: hidden;
        }

        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
        }

        .floating-element {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          animation: float 8s ease-in-out infinite;
        }

        .element-1 {
          width: 120px;
          height: 120px;
          top: 10%;
          left: 10%;
          animation-delay: 0s;
        }

        .element-2 {
          width: 80px;
          height: 80px;
          top: 20%;
          right: 15%;
          animation-delay: 2s;
        }

        .element-3 {
          width: 100px;
          height: 100px;
          bottom: 20%;
          left: 20%;
          animation-delay: 4s;
        }

        .element-4 {
          width: 60px;
          height: 60px;
          bottom: 30%;
          right: 10%;
          animation-delay: 6s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-30px) scale(1.1); }
        }

        .hero-content {
          max-width: 900px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          padding: 8px 20px;
          border-radius: 25px;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 30px;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .badge-icon {
          font-size: 1.1rem;
        }

        .hero-title {
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 24px;
        }

        .gradient-text {
          background: linear-gradient(135deg, #fff 0%, #f0f8ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-description {
          font-size: 1.3rem;
          line-height: 1.6;
          margin-bottom: 40px;
          opacity: 0.95;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-features {
          display: flex;
          justify-content: center;
          gap: 30px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 1rem;
          font-weight: 500;
        }

        .feature-icon {
          font-size: 1.2rem;
        }

        .hero-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-primary, .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 18px 36px;
          border-radius: 16px;
          font-weight: 700;
          font-size: 1.1rem;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .btn-primary {
          background: white;
          color: #667eea;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
        }

        .btn-primary:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.3);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-4px);
        }

        .btn-arrow {
          transition: transform 0.3s ease;
        }

        .btn-primary:hover .btn-arrow,
        .btn-secondary:hover .btn-arrow {
          transform: translateX(5px);
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }

          .hero-features {
            flex-direction: column;
            gap: 15px;
          }

          .hero-buttons {
            flex-direction: column;
            align-items: center;
          }

          .btn-primary, .btn-secondary {
            width: 100%;
            max-width: 300px;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;