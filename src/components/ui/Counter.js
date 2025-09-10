// src/components/ui/Counter.js
import React, { useState, useEffect } from 'react';

const Counter = ({ target, label, suffix = '', animateCounter }) => {
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
    <div className="stat-item">
      <div className="stat-icon">
        <span className="stat-icon-emoji">
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

      <style jsx>{`
        .stat-item {
          background: white;
          padding: 40px 30px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          border: 1px solid var(--gray-200);
          position: relative;
          overflow: hidden;
          text-align: center;
        }

        .stat-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
        }

        .stat-item:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
        }

        .stat-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
        }

        .stat-icon-emoji {
          font-size: 1.5rem;
          color: white;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--primary);
          display: block;
          margin-bottom: 8px;
        }

        .stat-label {
          color: var(--gray-600);
          font-weight: 500;
          font-size: 1rem;
        }

        .stat-description {
          color: var(--gray-500);
          font-size: 0.9rem;
          margin-top: 8px;
        }
      `}</style>
    </div>
  );
};

export default Counter;