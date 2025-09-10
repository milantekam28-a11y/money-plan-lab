// src/components/sections/StatsSection.js
import React from 'react';
import Counter from '../ui/Counter';

const StatsSection = ({ animateCounter }) => {
  return (
    <section className="stats">
      <div className="stats-container">
        <div className="stats-grid">
          <Counter target={25} label="Calculator Tools" suffix="+" animateCounter={animateCounter} />
          <Counter target={500000} label="Users Helped" animateCounter={animateCounter} />
          <Counter target={50000000} label="Dollars Saved" animateCounter={animateCounter} />
          <Counter target={100} label="% Free Forever" suffix="%" animateCounter={animateCounter} />
        </div>
      </div>

      <style jsx>{`
        .stats {
          padding: 80px 20px;
          background: var(--gray-50);
        }

        .stats-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 40px;
          text-align: center;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .stats {
            padding: 60px 20px;
          }

          .stats-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          }
        }
      `}</style>
    </section>
  );
};

export default StatsSection;