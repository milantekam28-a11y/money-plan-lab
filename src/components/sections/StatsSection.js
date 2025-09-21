// src/components/sections/StatsSection.js - Professional Upgrade
import React, { useState, useEffect } from 'react';

const StatsSection = ({ animateCounter }) => {
  // Counter Component
  const Counter = ({ target, label, suffix = '' }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!animateCounter) return;
      
      let start = 0;
      const increment = target / 100;
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 20);

      return () => clearInterval(timer);
    }, [animateCounter, target]);

    const formatNumber = (num) => {
      if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
      if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
      return num.toString();
    };

    return (
      <div className="stat-card">
        <div className="stat-icon">
          <span className="stat-emoji">
            {label.includes('Calculator') && '🧮'}
            {label.includes('Users') && '👥'}
            {label.includes('Saved') && '💰'}
            {label.includes('Free') && '❤️'}
          </span>
        </div>
        <div className="stat-number">{formatNumber(count)}{suffix}</div>
        <div className="stat-label">{label}</div>
        <div className="stat-description">
          {label.includes('Calculator') && 'Comprehensive tools for every financial decision'}
          {label.includes('Users') && 'Growing community of smart money managers'}
          {label.includes('Saved') && 'Total savings achieved by our users'}
          {label.includes('Free') && 'No hidden fees, ever'}
        </div>
      </div>
    );
  };

  return (
    <section className="stats-section">
      <div className="stats-container">
        <div className="stats-header">
          <h2>Empowering Your Financial Journey</h2>
          <p>Join thousands who've transformed their financial lives with our tools</p>
        </div>
        <div className="stats-grid">
          <Counter target={25} label="Calculator Tools" suffix="+" />
          <Counter target={500000} label="Users Helped" />
          <Counter target={50000000} label="Dollars Saved" />
          <Counter target={100} label="% Free Forever" suffix="%" />
        </div>
      </div>

      <style jsx>{`
        .stats-section {
          padding: 100px 20px;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        }

        .stats-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .stats-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .stats-header h2 {
          font-size: 3rem;
          font-weight: 800;
          color: #1e293b;
          margin-bottom: 16px;
        }

        .stats-header p {
          font-size: 1.2rem;
          color: #64748b;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
        }

        .stat-card {
          background: white;
          padding: 40px 30px;
          border-radius: 24px;
          text-align: center;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          position: relative;
          transition: all 0.3s ease;
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 24px 24px 0 0;
        }

        .stat-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.15);
        }

        .stat-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }

        .stat-emoji {
          font-size: 2rem;
          color: white;
        }

        .stat-number {
          font-size: 3.5rem;
          font-weight: 900;
          color: #1e293b;
          margin-bottom: 12px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .stat-label {
          font-size: 1.1rem;
          font-weight: 700;
          color: #374151;
          margin-bottom: 8px;
        }

        .stat-description {
          color: #6b7280;
          font-size: 0.95rem;
          line-height: 1.5;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .stats-header h2 {
            font-size: 2rem;
          }

          .stats-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          }
        }
      `}</style>
    </section>
  );
};

export default StatsSection;