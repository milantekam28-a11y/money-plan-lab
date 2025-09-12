// src/pages/categories/DebtCategory.js
import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEO/SEOHead';

const DebtCategory = () => {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Debt Calculators', url: '/debt-calculators' }
  ];

  const calculators = [
    {
      id: 'emi-calculator',
      title: 'Universal EMI Calculator',
      subtitle: 'LOAN PAYMENT CALCULATOR',
      description: 'Calculate monthly EMI payments for any loan with principal, interest rate, and tenure.',
      icon: '🏠',
      features: [
        'Monthly EMI calculation',
        'Total interest payable',
        'Payment breakdown'
      ],
      tags: ['Most Popular', 'Loan Calculator', 'Monthly Payment'],
      url: '/debt-calculators/emi-calculator',
      isWorking: true,
      color: '#10b981'
    },
    {
      id: 'universal-debt-payoff',
      title: 'Universal Debt Payoff Calculator',
      subtitle: 'ULTIMATE DEBT DESTROYER',
      description: 'Calculate the fastest way to pay off all your debts using avalanche or snowball methods.',
      icon: '🔥',
      features: [
        'Multiple debt strategies',
        'Global currency support',
        'Interest savings calculator'
      ],
      tags: ['Most Popular', 'Debt Avalanche', 'Debt Snowball'],
      url: '/debt-calculators/universal-debt-payoff',
      isWorking: true,
      color: '#667eea'
    },
    {
      id: 'credit-cards-payoff',
      title: 'Credit Cards Payoff Calculator',
      subtitle: 'HIGH-INTEREST KILLER',
      description: 'Calculate minimum payments vs. aggressive payoff strategies for credit cards.',
      icon: '💳',
      features: [
        'APR impact analysis',
        'Balance transfer options',
        'Payment optimization'
      ],
      tags: ['High Interest', 'APR Calculator', 'Balance Transfer'],
      url: '/debt-calculators/credit-card-debt',
      isWorking: true,
      color: '#ef4444'
    },
    {
      id: 'student-loan-payoff',
      title: 'Student Loan Payoff',
      subtitle: 'EDUCATION DEBT FREEDOM',
      description: 'Accelerate your student loan freedom with extra payment strategies and refinancing analysis.',
      icon: '🎓',
      features: [
        'Refinancing comparison',
        'Forgiveness programs',
        'Extra payment impact'
      ],
      tags: ['Federal Loans', 'PSLF', 'Refinancing'],
      url: '/debt-calculators/student-loan-payoff',
      isWorking: true,
      color: '#f59e0b'
    },
    {
      id: 'car-loan-calculator',
      title: 'Car Loan Calculator',
      subtitle: 'AUTO FINANCING TOOL',
      description: 'Compare auto loan terms, calculate payments, and see down payment impact.',
      icon: '🚗',
      features: [
        'Payment comparison',
        'Down payment analysis',
        'Trade-in value impact'
      ],
      tags: ['Auto Loan', 'Down Payment', 'Trade-in'],
      url: '/debt-calculators/car-loan-calculator',
      isWorking: false,
      color: '#6b7280'
    },
    {
      id: 'medical-debt-calculator',
      title: 'Medical Debt Calculator',
      subtitle: 'HEALTHCARE BILL MANAGER',
      description: 'Handle unexpected medical bills with smart planning and payment strategies.',
      icon: '🏥',
      features: [
        'Payment plan options',
        'Negotiation strategies',
        'Credit protection tips'
      ],
      tags: ['Payment Plans', 'Negotiation', 'Credit Protection'],
      url: '/debt-calculators/medical-debt-calculator',
      isWorking: false,
      color: '#6b7280'
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Debt Calculators - Financial Freedom Tools",
    "description": "Comprehensive debt elimination calculators including EMI, debt payoff, credit card, and student loan calculators",
    "url": "/debt-calculators"
  };

  return (
    <>
      <SEOHead
        title="Debt Calculators - Free Debt Elimination Tools | Money Plan Lab"
        description="Break free from debt with our comprehensive calculator suite. EMI calculator, debt payoff planner, credit card payoff, and student loan calculators. All free tools for financial freedom."
        keywords="debt calculator, EMI calculator, debt payoff, credit card calculator, student loan calculator, debt elimination, financial planning"
        canonicalUrl="/debt-calculators"
        breadcrumbs={breadcrumbs}
        structuredData={structuredData}
      />
      
      <div className="category-page">
        {/* Breadcrumb */}
        <nav className="breadcrumb-nav">
          <div className="container">
            <ol className="breadcrumb">
              <li><Link to="/">Home</Link></li>
              <li className="active">Debt Calculators</li>
            </ol>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="hero-section">
          <div className="container">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="hero-icon">🔗💥</span>
                Get Out of Debt
              </div>
              <h1>Debt Elimination Calculators</h1>
              <p className="hero-subtitle">Break Free from the Cycle of Debt and Reclaim Your Financial Freedom</p>
              <p className="hero-description">
                Use our comprehensive suite of debt calculators to create your personalized debt elimination strategy. 
                From EMI planning to complete debt payoff strategies - all tools are free and designed to accelerate your path to financial freedom.
              </p>
              
              {/* Key Statistics */}
              <div style={{display: 'flex', gap: '15px', justifyContent: 'space-between', maxWidth: '700px', margin: '0 auto', flexWrap: 'nowrap'}}>
                <div style={{background: 'rgba(255,255,255,0.15)', padding: '14px 18px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.2)', flex: '1', textAlign: 'center', minWidth: '120px', backdropFilter: 'blur(10px)'}}>
                  <div style={{fontSize: '1.6rem', fontWeight: '800', marginBottom: '4px'}}>6</div>
                  <div style={{fontSize: '0.8rem', opacity: '0.9'}}>Debt Calculators</div>
                </div>
                <div style={{background: 'rgba(255,255,255,0.15)', padding: '14px 18px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.2)', flex: '1', textAlign: 'center', minWidth: '120px', backdropFilter: 'blur(10px)'}}>
                  <div style={{fontSize: '1.6rem', fontWeight: '800', marginBottom: '4px'}}>4</div>
                  <div style={{fontSize: '0.8rem', opacity: '0.9'}}>Ready Now</div>
                </div>
                <div style={{background: 'rgba(255,255,255,0.15)', padding: '14px 18px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.2)', flex: '1', textAlign: 'center', minWidth: '120px', backdropFilter: 'blur(10px)'}}>
                  <div style={{fontSize: '1.6rem', fontWeight: '800', marginBottom: '4px'}}>10+</div>
                  <div style={{fontSize: '0.8rem', opacity: '0.9'}}>Global Currencies</div>
                </div>
                <div style={{background: 'rgba(255,255,255,0.15)', padding: '14px 18px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.2)', flex: '1', textAlign: 'center', minWidth: '120px', backdropFilter: 'blur(10px)'}}>
                  <div style={{fontSize: '1.6rem', fontWeight: '800', marginBottom: '4px'}}>100%</div>
                  <div style={{fontSize: '0.8rem', opacity: '0.9'}}>Free Tools</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Calculators Grid */}
        <section className="calculators-section">
          <div className="container">
            <div className="section-header">
              <h2>Choose Your Debt Freedom Calculator</h2>
              <p>Select the calculator that matches your debt situation. Each tool is designed to provide actionable insights for your specific financial goals.</p>
            </div>
            
            <div className="calculators-grid">
              {calculators.map((calculator, index) => (
                <div key={calculator.id} className={`calculator-card ${!calculator.isWorking ? 'coming-soon' : ''}`}>
                  <div className="card-header">
                    <div className="card-icon" style={{ backgroundColor: calculator.color + '20', color: calculator.color }}>
                      {calculator.icon}
                    </div>
                    <div className="card-priority">
                      {index < 2 && <span className="priority-badge">FEATURED</span>}
                    </div>
                  </div>
                  
                  <div className="card-content">
                    <h3 className="card-title">{calculator.title}</h3>
                    <p className="card-subtitle">{calculator.subtitle}</p>
                    <p className="card-description">{calculator.description}</p>
                    
                    <div className="card-features">
                      {calculator.features.map((feature, idx) => (
                        <div key={idx} className="feature-item">
                          <span className="feature-check">✓</span>
                          <span className="feature-text">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="card-tags">
                      {calculator.tags.map((tag, idx) => (
                        <span key={idx} className={`tag ${tag === 'Most Popular' ? 'tag-popular' : ''}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="card-footer">
                    {calculator.isWorking ? (
                      <Link to={calculator.url} className="card-button">
                        <span className="button-icon">🚀</span>
                        Start Calculator
                      </Link>
                    ) : (
                      <button disabled className="card-button disabled">
                        <span className="button-icon">⏳</span>
                        Coming Soon
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Strategy Guide */}
        <section className="strategy-section">
          <div className="container">
            <div className="strategy-content">
              <div className="strategy-header">
                <div className="strategy-badge">
                  <span className="strategy-icon">💡</span>
                  Debt Strategy Guide
                </div>
                <h2>Which Debt Elimination Method Should You Choose?</h2>
              </div>
              
              <div className="strategy-grid">
                <div className="strategy-card avalanche">
                  <div className="strategy-icon">🏔️</div>
                  <h3>Debt Avalanche</h3>
                  <p className="strategy-subtitle">Mathematical Approach</p>
                  <p>Pay minimums on all debts, then attack the highest interest rate debt first. Saves the most money mathematically.</p>
                  <div className="strategy-pros">
                    <h4>Best For:</h4>
                    <ul>
                      <li>Maximizing interest savings</li>
                      <li>Logical, numbers-focused approach</li>
                      <li>High-interest credit card debt</li>
                    </ul>
                  </div>
                </div>
                
                <div className="strategy-card snowball">
                  <div className="strategy-icon">❄️</div>
                  <h3>Debt Snowball</h3>
                  <p className="strategy-subtitle">Psychological Approach</p>
                  <p>Pay minimums on all debts, then attack the smallest balance first. Provides quick wins for motivation.</p>
                  <div className="strategy-pros">
                    <h4>Best For:</h4>
                    <ul>
                      <li>Building momentum and motivation</li>
                      <li>Multiple small debts</li>
                      <li>Emotional/behavioral change</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="strategy-recommendation">
                <div className="recommendation-icon">🎯</div>
                <div className="recommendation-content">
                  <h3>Our Recommendation</h3>
                  <p>Start with our <strong>Universal Debt Payoff Calculator</strong> to compare both methods with your actual debts. You'll see exact numbers for time saved and interest costs, helping you choose the strategy that works best for your situation and personality.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pro Tips */}
        <section className="tips-section">
          <div className="container">
            <div className="tips-header">
              <h2>💰 Pro Tips for Faster Debt Freedom</h2>
              <p>Expert strategies to accelerate your debt elimination journey</p>
            </div>
            
            <div className="tips-grid">
              <div className="tip-card">
                <div className="tip-number">1</div>
                <h3>Find Extra Money</h3>
                <p>Review your budget for unused subscriptions, dining out, or entertainment. Even $100 extra monthly can save thousands in interest.</p>
              </div>
              
              <div className="tip-card">
                <div className="tip-number">2</div>
                <h3>Use Windfalls Wisely</h3>
                <p>Tax refunds, bonuses, and gifts should go directly to debt. A single $2,000 windfall can eliminate 6+ months of payments.</p>
              </div>
              
              <div className="tip-card">
                <div className="tip-number">3</div>
                <h3>Negotiate Lower Rates</h3>
                <p>Call your credit card companies to request lower rates. A 5% reduction on a $5,000 balance saves $250 annually.</p>
              </div>
              
              <div className="tip-card">
                <div className="tip-number">4</div>
                <h3>Automate Everything</h3>
                <p>Set up automatic payments for more than the minimum. Remove the temptation to spend that money elsewhere.</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        .category-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .breadcrumb-nav {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          padding: 15px 0;
        }

        .breadcrumb {
          display: flex;
          list-style: none;
          gap: 8px;
          margin: 0;
          padding: 0;
          color: white;
        }

        .breadcrumb li:not(:last-child)::after {
          content: '/';
          margin-left: 8px;
          color: rgba(255, 255, 255, 0.6);
        }

        .breadcrumb a {
          color: white;
          text-decoration: none;
          opacity: 0.8;
          transition: opacity 0.3s;
        }

        .breadcrumb a:hover {
          opacity: 1;
        }

        .breadcrumb .active {
          opacity: 1;
        }

        .hero-section {
          padding: 60px 0;
          color: white;
          text-align: center;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          padding: 12px 24px;
          border-radius: 50px;
          font-weight: 600;
          margin-bottom: 24px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .hero-icon {
          font-size: 1.2rem;
        }

        .hero-section h1 {
          font-size: clamp(2.5rem, 5vw, 4rem);
          margin-bottom: 16px;
          font-weight: 800;
          line-height: 1.1;
        }

        .hero-subtitle {
          font-size: 1.4rem;
          margin-bottom: 16px;
          opacity: 0.95;
          font-weight: 500;
        }

        .hero-description {
          font-size: 1.1rem;
          margin-bottom: 40px;
          opacity: 0.9;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 24px;
          max-width: 600px;
          margin: 0 auto;
        }

        .stat-item {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          padding: 20px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 4px;
        }

        .stat-label {
          font-size: 0.9rem;
          opacity: 0.9;
        }

        .calculators-section {
          padding: 60px 0;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        }

        .section-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .section-header h2 {
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          color: #1a202c;
          margin-bottom: 16px;
          font-weight: 700;
        }

        .section-header p {
          font-size: 1.1rem;
          color: #4a5568;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .calculators-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 32px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .calculator-card {
          background: white;
          border-radius: 24px;
          padding: 32px;
          box-shadow: 0 20px 40px -12px rgba(0,0,0,0.15);
          border: 2px solid transparent;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .calculator-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 32px 64px -12px rgba(0,0,0,0.25);
          border-color: #dc2626;
        }

        .calculator-card.coming-soon {
          opacity: 0.6;
          background: #f8fafc;
        }

        .calculator-card.coming-soon:hover {
          transform: translateY(-2px);
          border-color: #e2e8f0;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 24px;
        }

        .card-icon {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          font-weight: 600;
        }

        .priority-badge {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .card-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 8px;
          line-height: 1.3;
        }

        .card-subtitle {
          font-size: 0.8rem;
          font-weight: 600;
          color: #667eea;
          margin-bottom: 16px;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .card-description {
          font-size: 1rem;
          color: #4a5568;
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .card-features {
          margin-bottom: 24px;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .feature-check {
          width: 20px;
          height: 20px;
          background: #10b981;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          font-weight: 700;
          flex-shrink: 0;
        }

        .feature-text {
          font-size: 0.9rem;
          color: #4a5568;
        }

        .card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 24px;
        }

        .tag {
          padding: 6px 12px;
          background: #e2e8f0;
          color: #4a5568;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .tag-popular {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
        }

        .card-button {
          width: 100%;
          padding: 16px 24px;
          border: none;
          border-radius: 12px;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-decoration: none;
          background: linear-gradient(135deg, #dc2626, #b91c1c);
          color: white;
        }

        .card-button:hover:not(.disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(220, 38, 38, 0.3);
        }

        .card-button.disabled {
          background: #e2e8f0;
          color: #9ca3af;
          cursor: not-allowed;
        }

        .button-icon {
          font-size: 1rem;
        }

        .strategy-section {
          padding: 60px 0;
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          color: white;
        }

        .strategy-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          padding: 12px 24px;
          border-radius: 50px;
          font-weight: 600;
          margin-bottom: 24px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .strategy-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .strategy-header h2 {
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          margin-bottom: 24px;
          font-weight: 700;
        }

        .strategy-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 32px;
          margin-bottom: 50px;
        }

        .strategy-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 24px;
          padding: 32px;
          text-align: center;
          transition: transform 0.3s ease;
        }

        .strategy-card:hover {
          transform: translateY(-5px);
        }

        .strategy-card .strategy-icon {
          font-size: 3rem;
          margin-bottom: 20px;
        }

        .strategy-card h3 {
          font-size: 1.5rem;
          margin-bottom: 8px;
          font-weight: 700;
        }

        .strategy-subtitle {
          font-size: 0.9rem;
          opacity: 0.8;
          margin-bottom: 16px;
          font-style: italic;
        }

        .strategy-card > p {
          line-height: 1.6;
          margin-bottom: 24px;
          opacity: 0.9;
        }

        .strategy-pros h4 {
          font-size: 1rem;
          margin-bottom: 12px;
          color: #10b981;
        }

        .strategy-pros ul {
          list-style: none;
          padding: 0;
          text-align: left;
        }

        .strategy-pros li {
          padding: 6px 0;
          position: relative;
          padding-left: 20px;
          font-size: 0.9rem;
          opacity: 0.9;
        }

        .strategy-pros li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: #10b981;
          font-weight: bold;
        }

        .strategy-recommendation {
          background: rgba(16, 185, 129, 0.1);
          border: 2px solid rgba(16, 185, 129, 0.3);
          border-radius: 20px;
          padding: 32px;
          display: flex;
          gap: 20px;
          align-items: flex-start;
        }

        .recommendation-icon {
          font-size: 2.5rem;
          flex-shrink: 0;
        }

        .recommendation-content h3 {
          font-size: 1.3rem;
          margin-bottom: 12px;
          color: #10b981;
        }

        .recommendation-content p {
          line-height: 1.6;
          opacity: 0.95;
        }

        .tips-section {
          padding: 60px 0;
          background: linear-gradient(135deg, #fef3c7 0%, #f59e0b 100%);
        }

        .tips-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .tips-header h2 {
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          color: #92400e;
          margin-bottom: 16px;
          font-weight: 700;
        }

        .tips-header p {
          font-size: 1.1rem;
          color: #b45309;
          font-weight: 500;
        }

        .tips-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .tip-card {
          background: white;
          border-radius: 20px;
          padding: 28px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          transition: transform 0.3s ease;
          text-align: center;
        }

        .tip-card:hover {
          transform: translateY(-5px);
        }

        .tip-number {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.2rem;
          margin: 0 auto 20px;
        }

        .tip-card h3 {
          font-size: 1.2rem;
          color: #1a202c;
          margin-bottom: 12px;
          font-weight: 700;
        }

        .tip-card p {
          color: #4a5568;
          line-height: 1.6;
          font-size: 0.95rem;
        }

        /* Mobile Responsiveness */
        @media (max-width: 768px) {
          .hero-section {
            padding: 40px 0;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }

          .calculators-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .strategy-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .strategy-recommendation {
            flex-direction: column;
            text-align: center;
          }

          .tips-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }

          .calculator-card {
            padding: 24px;
          }
        }
      `}</style>
    </>
  );
};

export default DebtCategory;