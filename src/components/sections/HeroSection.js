// src/components/sections/HeroSection.js
import React from 'react';

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="floating-elements"></div>
      <div className="hero-content">
        <h1>Take Control of Your Financial Future</h1>
        <p>Free, powerful financial calculators based on proven mathematical principles. Build wealth, eliminate debt, and achieve your money goals faster with our comprehensive suite of tools.</p>
        <div className="cta-buttons">
          <a href="#calculators" className="btn-primary">
            <span className="btn-icon">🧮</span>
            Start Calculating
          </a>
          <a href="#features" className="btn-secondary">
            <span className="btn-icon">📈</span>
            See Features
          </a>
        </div>
      </div>

      <style jsx>{`
        .hero {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 120px 20px 80px;
          text-align: center;
          color: white;
          position: relative;
          overflow: hidden;
        }

        .floating-elements {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 1;
        }

        .floating-elements::before,
        .floating-elements::after {
          content: '';
          position: absolute;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          animation: float 6s ease-in-out infinite;
        }

        .floating-elements::before {
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .floating-elements::after {
          top: 60%;
          right: 10%;
          animation-delay: 3s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .hero-content {
          max-width: 800px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .hero h1 {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          margin-bottom: 24px;
          line-height: 1.1;
        }

        .hero p {
          font-size: 1.25rem;
          margin-bottom: 40px;
          opacity: 0.95;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-primary, .btn-secondary {
          padding: 16px 32px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 1.1rem;
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .btn-primary {
          background: var(--white);
          color: var(--primary);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s;
        }

        .btn-primary:hover::before {
          left: 100%;
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-3px);
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .hero {
            padding: 80px 20px 60px;
          }

          .cta-buttons {
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