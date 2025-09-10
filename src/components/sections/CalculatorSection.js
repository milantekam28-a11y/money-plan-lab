// src/components/sections/CalculatorSection.js
import React from 'react';
import { categories } from '../../data/categories';

const CalculatorSection = () => {
  return (
    <section className="calculators" id="calculators">
      <div className="calculators-container">
        <div className="section-header">
          <h2 className="section-title">Complete Financial Calculator Suite</h2>
          <p className="section-subtitle">Choose from our comprehensive collection of professional-grade financial tools designed to help you make smarter money decisions</p>
        </div>

        {Object.entries(categories).map(([key, category]) => (
          <div key={key} className={`category-section ${key}-category`}>
            <div className="category-header" style={{ background: category.color }}>
              <div className="category-icon">{category.icon}</div>
              <div className="category-info">
                <div className="category-title">{category.name}</div>
                <div className="category-description">{category.description}</div>
              </div>
            </div>
            
            <div className="calculator-grid">
              {category.calculators.map((calc) => (
                <div 
                  key={calc.id} 
                  className="calculator-card"
                  onClick={() => {
                    if (calc.url) {
                      window.open(calc.url, '_blank');
                    }
                  }}
                >
                  <div className="card-content">
                    <div className="card-header">
                      <div className="card-icon" style={{ background: category.color }}>
                        <span>{calc.icon}</span>
                      </div>
                      <div>
                        <h3 className="card-title">{calc.title}</h3>
                        <p className="card-subtitle">{calc.subtitle}</p>
                      </div>
                    </div>
                    <p className="card-description">{calc.description}</p>
                    <ul className="card-features">
                      {calc.features.map((feature, idx) => (
                        <li key={idx}>
                          <span className="feature-check">✓</span> {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="card-action">
                      <span className="card-link">
                        Try Calculator
                        <span className="arrow">→</span>
                      </span>
                    </div>
                    <div className="card-tags">
                      {calc.tags.map((tag, idx) => (
                        <span 
                          key={idx} 
                          className={`tag ${calc.featured ? 'featured' : ''} ${calc.popular ? 'popular' : ''}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pro-tip">
              <div className="pro-tip-header">
                <span className="tip-icon">💡</span>
                <span className="pro-tip-title">Pro Tip</span>
              </div>
              <div className="pro-tip-content">
                {key === 'debt' && 'Focus on paying off high-interest debt first (debt avalanche) to save the most money, or use the debt snowball method if you need psychological wins to stay motivated. Both methods work - choose the one you\'ll stick with!'}
                {key === 'budget' && 'Start with zero-based budgeting for maximum control. Always build your emergency fund before aggressive debt payoff or investing!'}
                {key === 'investment' && 'Start investing early, even with small amounts. A 25-year-old investing $200/month will have more at retirement than a 35-year-old investing $400/month - that\'s the power of compound interest and time!'}
                {key === 'realestate' && 'Follow the 28/36 rule: spend no more than 28% of gross income on housing and 36% on total debt payments. Remember, being "house poor" can derail your other financial goals!'}
                {key === 'travel' && 'Save for major purchases and vacations in advance. This prevents debt accumulation and often allows you to take advantage of cash discounts or better deals!'}
                {key === 'insurance' && 'Buy term life insurance and invest the difference. Whole life insurance is a poor investment - separate your insurance needs from your investment strategy for better results!'}
                {key === 'utilities' && 'Use these handy tools to complement your main financial planning. The days calculator is especially useful for tracking savings goals and debt payoff timelines!'}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .calculators {
          padding: 100px 20px;
          background: var(--white);
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
          color: var(--gray-900);
          margin-bottom: 16px;
        }

        .section-subtitle {
          font-size: 1.25rem;
          color: var(--gray-600);
          max-width: 600px;
          margin: 0 auto;
        }

        .category-section {
          margin-bottom: 80px;
        }

        .category-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 40px;
          padding: 30px;
          color: white;
          border-radius: 20px;
          box-shadow: 0 15px 40px rgba(37, 99, 235, 0.2);
          position: relative;
          overflow: hidden;
        }

        .category-icon {
          font-size: 3rem;
          opacity: 0.9;
          min-width: 60px;
        }

        .category-info {
          flex: 1;
        }

        .category-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .category-description {
          font-size: 1.1rem;
          opacity: 0.9;
          line-height: 1.5;
        }

        .calculator-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
          gap: 30px;
        }

        .calculator-card {
          background: white;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: all 0.3s ease;
          cursor: pointer;
          border: 1px solid var(--gray-200);
          position: relative;
        }

        .calculator-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          transition: all 0.3s ease;
        }

        .calculator-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.15);
        }

        .calculator-card:hover::before {
          height: 6px;
        }

        .card-content {
          padding: 35px;
        }

        .card-header {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          margin-bottom: 24px;
        }

        .card-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 1.5rem;
          color: white;
        }

        .card-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--gray-900);
          margin-bottom: 8px;
          line-height: 1.3;
        }

        .card-subtitle {
          color: var(--primary);
          font-weight: 600;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .card-description {
          color: var(--gray-600);
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .card-features {
          list-style: none;
          margin-bottom: 24px;
        }

        .card-features li {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
          color: var(--gray-600);
          font-size: 0.9rem;
        }

        .feature-check {
          color: var(--success);
          font-weight: bold;
          font-size: 0.8rem;
        }

        .card-action {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 20px;
        }

        .card-link {
          color: var(--primary);
          font-weight: 600;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
        }

        .card-link:hover {
          gap: 12px;
        }

        .arrow {
          transition: transform 0.3s ease;
        }

        .card-link:hover .arrow {
          transform: translateX(4px);
        }

        .card-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: 16px;
        }

        .tag {
          background: var(--gray-100);
          color: var(--gray-600);
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .tag.featured {
          background: var(--primary);
          color: white;
        }

        .tag.popular {
          background: var(--accent);
          color: white;
        }

        /* Category-specific colors */
        .debt-category .calculator-card::before {
          background: linear-gradient(135deg, var(--danger), var(--danger-dark));
        }

        .debt-category .card-icon {
          background: linear-gradient(135deg, var(--danger), var(--danger-dark));
        }

        .budget-category .calculator-card::before {
          background: linear-gradient(135deg, var(--accent), var(--accent-dark));
        }

        .budget-category .card-icon {
          background: linear-gradient(135deg, var(--accent), var(--accent-dark));
        }

        .realestate-category .calculator-card::before {
          background: linear-gradient(135deg, var(--success), var(--secondary));
        }

        .realestate-category .card-icon {
          background: linear-gradient(135deg, var(--success), var(--secondary));
        }

        .travel-category .calculator-card::before {
          background: linear-gradient(135deg, #8b5cf6, #7c3aed);
        }

        .travel-category .card-icon {
          background: linear-gradient(135deg, #8b5cf6, #7c3aed);
        }

        .insurance-category .calculator-card::before {
          background: linear-gradient(135deg, #f59e0b, #d97706);
        }

        .insurance-category .card-icon {
          background: linear-gradient(135deg, #f59e0b, #d97706);
        }

        .utilities-category .calculator-card::before {
          background: linear-gradient(135deg, #06b6d4, #0891b2);
        }

        .utilities-category .card-icon {
          background: linear-gradient(135deg, #06b6d4, #0891b2);
        }

        /* Pro Tip Section */
        .pro-tip {
          background: linear-gradient(135deg, var(--gray-50), var(--gray-100));
          border-left: 4px solid var(--accent);
          padding: 20px;
          margin: 20px 0;
          border-radius: 10px;
        }

        .pro-tip-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }

        .tip-icon {
          color: var(--accent);
          font-size: 1.2rem;
        }

        .pro-tip-title {
          font-weight: 600;
          color: var(--gray-800);
        }

        .pro-tip-content {
          color: var(--gray-600);
          font-size: 0.95rem;
          line-height: 1.5;
        }

        /* Mobile Responsive */
        @media (max-width: 1024px) {
          .calculator-grid {
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .calculators {
            padding: 80px 20px;
          }

          .calculator-grid {
            grid-template-columns: 1fr;
          }

          .category-header {
            flex-direction: column;
            text-align: center;
            gap: 16px;
            padding: 25px;
          }

          .category-icon {
            font-size: 2.5rem;
          }

          .category-title {
            font-size: 1.6rem;
          }

          .card-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }
        }
      `}</style>
    </section>
  );
};

export default CalculatorSection;