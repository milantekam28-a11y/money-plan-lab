// src/pages/categories/RealEstateCategory.js
import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEO/SEOHead';

const RealEstateCategory = () => {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Real Estate Calculators', url: '/real-estate-calculators' }
  ];

  const calculators = [
    {
      id: 'mortgage',
      title: 'Mortgage Calculator',
      subtitle: 'HOME LOAN ANALYZER',
      description: 'Calculate monthly mortgage payments including principal, interest, taxes, insurance (PITI) and PMI.',
      icon: '🏡',
      features: [
        'PITI breakdown',
        'PMI calculation',
        'Amortization schedule'
      ],
      tags: ['Essential', 'PITI Calculator', 'Home Buying'],
      url: 'https://www.bankrate.com/calculators/mortgages/mortgage-calculator.aspx',
      isWorking: false,
      color: '#10b981'
    },
    {
      id: 'mortgage-payoff',
      title: 'Mortgage Payoff Calculator',
      subtitle: 'EARLY PAYOFF PLANNER',
      description: 'See how extra principal payments can save you thousands and help you own your home sooner.',
      icon: '🎯',
      features: [
        'Interest savings calculation',
        'Time reduction analysis',
        'Payment schedule optimization'
      ],
      tags: ['Extra Payments', 'Interest Savings', 'Own Sooner'],
      url: 'https://www.bankrate.com/calculators/mortgages/mortgage-payoff-calculator.aspx',
      isWorking: false,
      color: '#2563eb'
    },
    {
      id: 'house-affordability',
      title: 'House Affordability Calculator',
      subtitle: 'SMART BUYING GUIDE',
      description: 'Determine how much house you can afford based on income, debts, and down payment.',
      icon: '🧮',
      features: [
        '28/36 rule application',
        'DTI consideration',
        'Down payment impact'
      ],
      tags: ['28/36 Rule', 'Safe Buying', 'Budget Planning'],
      url: 'https://www.zillow.com/mortgage-calculator/house-affordability-calculator/',
      isWorking: false,
      color: '#f59e0b'
    },
    {
      id: 'rent-vs-buy',
      title: 'Rent vs Buy Calculator',
      subtitle: 'DECISION ANALYSIS TOOL',
      description: 'Compare the long-term costs of renting vs. buying to make the best housing decision.',
      icon: '⚖️',
      features: [
        'Total cost comparison',
        'Opportunity cost analysis',
        'Break-even point'
      ],
      tags: ['Total Cost', 'Opportunity Cost', 'Smart Decision'],
      url: 'https://www.nytimes.com/interactive/2014/upshot/buy-rent-calculator.html',
      isWorking: false,
      color: '#8b5cf6'
    },
    {
      id: 'refinance',
      title: 'Refinance Calculator',
      subtitle: 'REFINANCING ANALYSIS',
      description: 'Determine if refinancing your mortgage makes financial sense with break-even analysis.',
      icon: '🔄',
      features: [
        'Break-even calculation',
        'Closing cost analysis',
        'Monthly savings potential'
      ],
      tags: ['Break-even', 'Lower Rates', 'Monthly Savings'],
      url: 'https://www.bankrate.com/calculators/mortgages/refinance-calculator.aspx',
      isWorking: false,
      color: '#dc2626'
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Real Estate Calculators - Home Buying & Mortgage Tools",
    "description": "Comprehensive real estate calculators including mortgage, affordability, rent vs buy, and refinance calculators",
    "url": "/real-estate-calculators"
  };

  return (
    <>
      <SEOHead
        title="Real Estate Calculators - Free Home Buying & Mortgage Tools | Money Plan Lab"
        description="Make smart real estate decisions with our comprehensive calculator suite. Mortgage calculator, home affordability, rent vs buy analysis, and refinancing tools. All free for smart home buying."
        keywords="mortgage calculator, home affordability calculator, rent vs buy calculator, refinance calculator, real estate calculator, home buying tools"
        canonicalUrl="/real-estate-calculators"
        breadcrumbs={breadcrumbs}
        structuredData={structuredData}
      />
      
      <div className="category-page">
        {/* Breadcrumb */}
        <nav className="breadcrumb-nav">
          <div className="container">
            <ol className="breadcrumb">
              <li><Link to="/"><span className="home-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9,22 9,12 15,12 15,22"></polyline>
                </svg>
              </span> Home</Link></li>
              <li className="active">Real Estate Calculators</li>
            </ol>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="hero-section">
          <div className="container">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="hero-icon">🏠</span>
                Real Estate & Housing
              </div>
              <h1>Real Estate & Home Buying Calculators</h1>
              <p className="hero-subtitle">Make Smart Decisions About Your Biggest Investment</p>
              <p className="hero-description">
                Navigate the complex world of real estate with confidence. Our comprehensive calculator suite helps you 
                determine affordability, compare rent vs buying, optimize mortgage payments, and make informed decisions 
                about your home purchase or refinancing.
              </p>
              
              {/* Key Statistics */}
              <div style={{display: 'flex', gap: '15px', justifyContent: 'space-between', maxWidth: '700px', margin: '0 auto', flexWrap: 'nowrap'}}>
                <div style={{background: 'rgba(255,255,255,0.15)', padding: '14px 18px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.2)', flex: '1', textAlign: 'center', minWidth: '120px', backdropFilter: 'blur(10px)'}}>
                  <div style={{fontSize: '1.6rem', fontWeight: '800', marginBottom: '4px'}}>5</div>
                  <div style={{fontSize: '0.8rem', opacity: '0.9'}}>Home Tools</div>
                </div>
                <div style={{background: 'rgba(255,255,255,0.15)', padding: '14px 18px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.2)', flex: '1', textAlign: 'center', minWidth: '120px', backdropFilter: 'blur(10px)'}}>
                  <div style={{fontSize: '1.6rem', fontWeight: '800', marginBottom: '4px'}}>28%</div>
                  <div style={{fontSize: '0.8rem', opacity: '0.9'}}>Max Housing Cost</div>
                </div>
                <div style={{background: 'rgba(255,255,255,0.15)', padding: '14px 18px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.2)', flex: '1', textAlign: 'center', minWidth: '120px', backdropFilter: 'blur(10px)'}}>
                  <div style={{fontSize: '1.6rem', fontWeight: '800', marginBottom: '4px'}}>20%</div>
                  <div style={{fontSize: '0.8rem', opacity: '0.9'}}>Down Payment</div>
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
              <h2>Choose Your Real Estate Calculator</h2>
              <p>Select the calculator that matches your home buying or selling needs. Each tool provides insights for smart real estate decisions.</p>
            </div>
            
            <div className="calculators-grid">
              {calculators.map((calculator, index) => (
                <div key={calculator.id} className="calculator-card">
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
                        <span key={idx} className={`tag ${tag === 'Essential' ? 'tag-popular' : ''}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="card-footer">
                    <a href={calculator.url} target="_blank" rel="noopener noreferrer" className="card-button">
                      <span className="button-icon">🌐</span>
                      Use Calculator
                    </a>
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
                  Real Estate Strategy Guide
                </div>
                <h2>When Should You Buy vs Rent?</h2>
              </div>
              
              <div className="strategy-grid">
                <div className="strategy-card buy">
                  <div className="strategy-icon">🏠</div>
                  <h3>Consider Buying When</h3>
                  <p className="strategy-subtitle">Building Equity & Stability</p>
                  <p>Buying makes sense when you're ready to commit to location, have stable income, and can afford down payment plus ongoing costs.</p>
                  <div className="strategy-pros">
                    <h4>Best For:</h4>
                    <ul>
                      <li>Staying 5+ years in same location</li>
                      <li>Stable employment and income</li>
                      <li>20% down payment saved</li>
                      <li>Emergency fund after closing</li>
                    </ul>
                  </div>
                </div>
                
                <div className="strategy-card rent">
                  <div className="strategy-icon">🔑</div>
                  <h3>Consider Renting When</h3>
                  <p className="strategy-subtitle">Flexibility & Lower Risk</p>
                  <p>Renting provides flexibility, lower upfront costs, and freedom from maintenance responsibilities and market risk.</p>
                  <div className="strategy-pros">
                    <h4>Best For:</h4>
                    <ul>
                      <li>Moving within 5 years</li>
                      <li>Building career or education</li>
                      <li>Limited savings for down payment</li>
                      <li>Want investment flexibility</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="strategy-recommendation">
                <div className="recommendation-icon">🎯</div>
                <div className="recommendation-content">
                  <h3>The 28/36 Rule</h3>
                  <p>Follow the <strong>28/36 rule</strong> for safe home buying: spend no more than 28% of gross monthly income on housing costs (PITI) and no more than 36% on total debt payments. Use our <strong>House Affordability Calculator</strong> to determine your safe buying range and avoid becoming "house poor."</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pro Tips */}
        <section className="tips-section">
          <div className="container">
            <div className="tips-header">
              <h2>💰 Pro Tips for Smart Home Buying</h2>
              <p>Expert strategies to make informed real estate decisions</p>
            </div>
            
            <div className="tips-grid">
              <div className="tip-card">
                <div className="tip-number">1</div>
                <h3>Save 20% Down Payment</h3>
                <p>Avoid PMI, get better rates, and reduce monthly payments. If you can't save 20%, consider waiting or looking at lower-priced homes.</p>
              </div>
              
              <div className="tip-card">
                <div className="tip-number">2</div>
                <h3>Get Pre-Approved First</h3>
                <p>Know your exact budget before house hunting. Pre-approval shows sellers you're serious and can close quickly in competitive markets.</p>
              </div>
              
              <div className="tip-card">
                <div className="tip-number">3</div>
                <h3>Factor in All Costs</h3>
                <p>Beyond PITI, budget for maintenance (1-2% of home value annually), utilities, HOA fees, and moving expenses.</p>
              </div>
              
              <div className="tip-card">
                <div className="tip-number">4</div>
                <h3>Don't Buy at Top of Budget</h3>
                <p>Leave room for unexpected expenses, job changes, or interest rate increases. Buy less house than you qualify for.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section">
          <div className="container">
            <div className="faq-header">
              <h2>🤔 Real Estate & Home Buying FAQs</h2>
              <p>Get answers to the most common home buying and real estate questions</p>
            </div>
            
            <div className="faq-container">
              <div className="faq-item">
                <button className="faq-question" onClick={(e) => {
                  const answer = e.target.nextElementSibling;
                  const isOpen = answer.style.maxHeight;
                  
                  document.querySelectorAll('.faq-answer').forEach(item => {
                    item.style.maxHeight = null;
                    item.previousElementSibling.classList.remove('active');
                  });
                  
                  if (!isOpen) {
                    answer.style.maxHeight = answer.scrollHeight + "px";
                    e.target.classList.add('active');
                  }
                }}>
                  <span>How much house can I afford on my salary?</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <p>Use the <strong>28/36 rule</strong> for safe home buying:</p>
                  <ul>
                    <li><strong>28% rule:</strong> Monthly housing costs (PITI) should not exceed 28% of gross monthly income</li>
                    <li><strong>36% rule:</strong> Total debt payments should not exceed 36% of gross monthly income</li>
                  </ul>
                  <p><strong>Example:</strong> With $6,000 monthly gross income:</p>
                  <ul>
                    <li>Maximum housing payment: $1,680 (28% of $6,000)</li>
                    <li>Maximum total debt: $2,160 (36% of $6,000)</li>
                  </ul>
                  <p>Use our House Affordability Calculator to get your exact numbers based on income, debts, down payment, and local taxes.</p>
                </div>
              </div>

              <div className="faq-item">
                <button className="faq-question" onClick={(e) => {
                  const answer = e.target.nextElementSibling;
                  const isOpen = answer.style.maxHeight;
                  
                  document.querySelectorAll('.faq-answer').forEach(item => {
                    item.style.maxHeight = null;
                    item.previousElementSibling.classList.remove('active');
                  });
                  
                  if (!isOpen) {
                    answer.style.maxHeight = answer.scrollHeight + "px";
                    e.target.classList.add('active');
                  }
                }}>
                  <span>Is it better to rent or buy in today's market?</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <p>The rent vs buy decision depends on your personal situation and local market conditions:</p>
                  <p><strong>Favor Buying When:</strong></p>
                  <ul>
                    <li>You plan to stay 5+ years in the same location</li>
                    <li>You have 20% down payment + emergency fund</li>
                    <li>Stable income and employment</li>
                    <li>Local rent-to-price ratios favor buying</li>
                  </ul>
                  <p><strong>Favor Renting When:</strong></p>
                  <ul>
                    <li>You might move within 5 years</li>
                    <li>Limited savings for down payment and closing costs</li>
                    <li>Local housing prices are extremely high</li>
                    <li>You want to invest extra money in stocks/bonds instead</li>
                  </ul>
                  <p>Use our Rent vs Buy Calculator to compare total costs over time for your specific situation.</p>
                </div>
              </div>

              <div className="faq-item">
                <button className="faq-question" onClick={(e) => {
                  const answer = e.target.nextElementSibling;
                  const isOpen = answer.style.maxHeight;
                  
                  document.querySelectorAll('.faq-answer').forEach(item => {
                    item.style.maxHeight = null;
                    item.previousElementSibling.classList.remove('active');
                  });
                  
                  if (!isOpen) {
                    answer.style.maxHeight = answer.scrollHeight + "px";
                    e.target.classList.add('active');
                  }
                }}>
                  <span>Should I pay off my mortgage early or invest the extra money?</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <p>This depends on your mortgage rate, investment returns, and personal preferences:</p>
                  <p><strong>Pay Off Mortgage Early When:</strong></p>
                  <ul>
                    <li>Mortgage rate is above 6-7%</li>
                    <li>You're approaching retirement (want guaranteed returns)</li>
                    <li>You have no other high-return investment options</li>
                    <li>Peace of mind from being debt-free is important</li>
                  </ul>
                  <p><strong>Invest Extra Money When:</strong></p>
                  <ul>
                    <li>Mortgage rate is below 5%</li>
                    <li>You're young with 15+ years to invest</li>
                    <li>You can handle investment volatility</li>
                    <li>You haven't maxed out retirement accounts</li>
                  </ul>
                  <p><strong>Mathematical Reality:</strong> Historically, stock market returns (10-12%) have beaten mortgage rates (3-7%). However, guaranteed mortgage payoff vs potential market returns is a personal choice.</p>
                </div>
              </div>

              <div className="faq-item">
                <button className="faq-question" onClick={(e) => {
                  const answer = e.target.nextElementSibling;
                  const isOpen = answer.style.maxHeight;
                  
                  document.querySelectorAll('.faq-answer').forEach(item => {
                    item.style.maxHeight = null;
                    item.previousElementSibling.classList.remove('active');
                  });
                  
                  if (!isOpen) {
                    answer.style.maxHeight = answer.scrollHeight + "px";
                    e.target.classList.add('active');
                  }
                }}>
                  <span>When should I refinance my mortgage?</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <p>Consider refinancing when you can save money or improve your financial situation:</p>
                  <p><strong>Good Times to Refinance:</strong></p>
                  <ul>
                    <li><strong>Rate Drop:</strong> Current rates are 0.5-1% lower than your rate</li>
                    <li><strong>Credit Improvement:</strong> Your credit score increased significantly</li>
                    <li><strong>Cash-Out Need:</strong> Need funds for home improvements or debt consolidation</li>
                    <li><strong>ARM to Fixed:</strong> Want stability from adjustable to fixed rate</li>
                  </ul>
                  <p><strong>Calculate Break-Even Point:</strong></p>
                  <ul>
                    <li>Total closing costs ÷ monthly savings = months to break even</li>
                    <li>Only refinance if you'll stay longer than break-even period</li>
                    <li>Example: $3,000 closing costs ÷ $200 monthly savings = 15 months break-even</li>
                  </ul>
                  <p>Use our Refinance Calculator to determine if refinancing makes sense for your situation.</p>
                </div>
              </div>

              <div className="faq-item">
                <button className="faq-question" onClick={(e) => {
                  const answer = e.target.nextElementSibling;
                  const isOpen = answer.style.maxHeight;
                  
                  document.querySelectorAll('.faq-answer').forEach(item => {
                    item.style.maxHeight = null;
                    item.previousElementSibling.classList.remove('active');
                  });
                  
                  if (!isOpen) {
                    answer.style.maxHeight = answer.scrollHeight + "px";
                    e.target.classList.add('active');
                  }
                }}>
                  <span>How much should I put down when buying a house?</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <p>Down payment affects your monthly payment, interest rate, and PMI requirements:</p>
                  <p><strong>20% Down Payment (Ideal):</strong></p>
                  <ul>
                    <li>Avoids PMI (private mortgage insurance)</li>
                    <li>Lower interest rates</li>
                    <li>Lower monthly payments</li>
                    <li>More equity from day one</li>
                  </ul>
                  <p><strong>Lower Down Payment Options:</strong></p>
                  <ul>
                    <li><strong>10-19% down:</strong> Still good rates, but requires PMI</li>
                    <li><strong>5% down:</strong> Higher rates and PMI, but achievable for many</li>
                    <li><strong>3% down:</strong> FHA loans, higher costs long-term</li>
                    <li><strong>0% down:</strong> VA loans (veterans) or USDA rural loans</li>
                  </ul>
                  <p><strong>Strategy:</strong> If you can't afford 20% down, consider waiting to save more or buying a less expensive home. PMI adds $100-300+ monthly and doesn't build equity.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        .category-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
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
          border-color: #10b981;
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
          color: #10b981;
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
          background: linear-gradient(135deg, #10b981, #059669);
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
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
        }

        .card-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(16, 185, 129, 0.3);
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
          background: linear-gradient(135deg, #d1fae5 0%, #6ee7b7 100%);
        }

        .tips-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .tips-header h2 {
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          color: #065f46;
          margin-bottom: 16px;
          font-weight: 700;
        }

        .tips-header p {
          font-size: 1.1rem;
          color: #047857;
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
          background: linear-gradient(135deg, #10b981, #059669);
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

        .faq-section {
          padding: 60px 0;
          background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
        }

        .faq-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .faq-header h2 {
          font-size: clamp(2rem, 4vw, 2.8rem);
          color: #065f46;
          margin-bottom: 16px;
          font-weight: 800;
        }

        .faq-header p {
          font-size: 1.2rem;
          color: #047857;
          font-weight: 500;
        }

        .faq-container {
          max-width: 900px;
          margin: 0 auto;
        }

        .faq-item {
          background: white;
          border-radius: 16px;
          margin-bottom: 16px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
          border: 2px solid transparent;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .faq-item:hover {
          border-color: #10b981;
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        }

        .faq-question {
          width: 100%;
          padding: 24px 32px;
          background: none;
          border: none;
          text-align: left;
          font-size: 1.1rem;
          font-weight: 600;
          color: #1f2937;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          line-height: 1.4;
          transition: all 0.3s ease;
        }

        .faq-question:hover {
          background: #f0fdf4;
        }

        .faq-question.active {
          background: #d1fae5;
          color: #065f46;
        }

        .faq-question.active .faq-icon {
          transform: rotate(45deg);
          color: #10b981;
        }

        .faq-icon {
          font-size: 1.5rem;
          font-weight: 300;
          color: #9ca3af;
          transition: all 0.3s ease;
          flex-shrink: 0;
          margin-left: 16px;
        }

        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }

        .faq-answer > * {
          padding: 0 32px 32px;
          margin: 0;
        }

        .faq-answer p {
          color: #374151;
          line-height: 1.7;
          margin-bottom: 16px;
          font-size: 1rem;
        }

        .faq-answer ul, .faq-answer ol {
          margin: 16px 0;
          padding-left: 20px;
        }

        .faq-answer li {
          color: #4b5563;
          margin-bottom: 8px;
          line-height: 1.6;
        }

        .faq-answer strong {
          color: #1f2937;
          font-weight: 600;
        }

        /* Mobile Responsiveness */
        @media (max-width: 768px) {
          .hero-section {
            padding: 40px 0;
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

          .faq-question {
            padding: 20px 24px;
            font-size: 1rem;
          }

          .faq-answer > * {
            padding: 0 24px 24px;
          }
        }
      `}</style>
    </>
  );
};

export default RealEstateCategory;