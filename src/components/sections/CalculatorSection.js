// src/components/sections/CalculatorSection.js - Professional Upgrade
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { categories } from '../../data/categories';

const CalculatorSection = () => {
  const navigate = useNavigate();

  return (
    <section className="calculators-section" id="calculators">
      <div className="calculators-container">
        <div className="section-header">
          <h2 className="section-title">Complete Financial Calculator Suite</h2>
          <p className="section-subtitle">Choose from our comprehensive collection of professional-grade financial tools designed to help you make smarter money decisions</p>
        </div>

        <div className="categories-grid">
          {Object.entries(categories).map(([key, category]) => (
            <div 
              key={key} 
              className="category-card"
              onClick={() => navigate(category.categoryUrl)}
            >
              <div className="category-background" style={{ background: category.color }}></div>
              <div className="category-content">
                <div className="category-icon">{category.icon}</div>
                <h3 className="category-title">{category.name}</h3>
                <p className="category-description">{category.description}</p>
                
                <div className="category-stats">
                  <div className="stat-item">
                    <span className="stat-number">{category.calculators.length}</span>
                    <span className="stat-label">Tools</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">
                      {category.calculators.filter(calc => calc.featured || calc.status === 'active').length}
                    </span>
                    <span className="stat-label">Popular</span>
                  </div>
                </div>
                
                <div className="popular-calculators">
                  {category.calculators.filter(calc => calc.featured || calc.popular).slice(0, 3).map((calc, idx) => (
                    <div key={idx} className="popular-calc">
                      <span className="calc-icon">{calc.icon}</span>
                      <span className="calc-name">{calc.title}</span>
                    </div>
                  ))}
                </div>
                
                <div className="category-action">
                  <span>Explore All {category.name}</span>
                  <span className="arrow">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="section-cta">
          <div className="cta-content">
            <h3>Need help choosing the right calculator?</h3>
            <p>View all 25+ calculators in one place with filters and search functionality</p>
            <button 
              className="cta-button"
              onClick={() => navigate('/calculators')}
            >
              View All Calculators
              <span className="btn-arrow">→</span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .calculators-section {
          padding: 100px 20px;
          background: white;
        }

        .calculators-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .section-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .section-title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          color: #1e293b;
          margin-bottom: 16px;
        }

        .section-subtitle {
          font-size: 1.25rem;
          color: #64748b;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
          gap: 40px;
          margin-bottom: 80px;
        }

        .category-card {
          background: white;
          border-radius: 24px;
          padding: 40px 30px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          border: 2px solid #f1f5f9;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        }

        .category-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 6px;
          border-radius: 24px 24px 0 0;
        }

        .category-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.15);
          border-color: rgba(102, 126, 234, 0.2);
        }

        .category-content {
          position: relative;
          z-index: 2;
        }

        .category-icon {
          font-size: 3.5rem;
          margin-bottom: 20px;
          display: block;
        }

        .category-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 12px;
        }

        .category-description {
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 24px;
          font-size: 1rem;
        }

        .category-stats {
          display: flex;
          justify-content: center;
          gap: 30px;
          margin-bottom: 24px;
          padding: 20px 0;
          border-top: 1px solid #f1f5f9;
          border-bottom: 1px solid #f1f5f9;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          display: block;
          font-size: 1.8rem;
          font-weight: 800;
          color: #667eea;
          margin-bottom: 4px;
        }

        .stat-label {
          font-size: 0.9rem;
          color: #94a3b8;
          font-weight: 500;
        }

        .popular-calculators {
          margin-bottom: 24px;
        }

        .popular-calc {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
          color: #475569;
          font-size: 0.9rem;
          justify-content: center;
        }

        .calc-icon {
          font-size: 1.1rem;
        }

        .calc-name {
          font-weight: 500;
        }

        .category-action {
          color: #667eea;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: gap 0.2s ease;
        }

        .category-card:hover .category-action {
          gap: 12px;
        }

        .arrow {
          transition: transform 0.2s ease;
        }

        .category-card:hover .arrow {
          transform: translateX(4px);
        }

        .section-cta {
          text-align: center;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          padding: 60px 40px;
          border-radius: 24px;
          border: 2px solid #e2e8f0;
        }

        .cta-content h3 {
          font-size: 1.8rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 12px;
        }

        .cta-content p {
          color: #64748b;
          font-size: 1.1rem;
          margin-bottom: 30px;
          line-height: 1.6;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 32px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border: none;
          border-radius: 16px;
          font-weight: 600;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        }

        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
        }

        .btn-arrow {
          transition: transform 0.3s ease;
        }

        .cta-button:hover .btn-arrow {
          transform: translateX(5px);
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .calculators-section {
            padding: 80px 20px;
          }

          .categories-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .category-stats {
            gap: 20px;
          }

          .section-cta {
            padding: 40px 20px;
          }
        }
      `}</style>
    </section>
  );
};

export default CalculatorSection;