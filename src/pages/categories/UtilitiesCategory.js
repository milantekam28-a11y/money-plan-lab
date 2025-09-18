// src/pages/categories/UtilitiesCategory.js
import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEO/SEOHead';

const UtilitiesCategory = () => {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Utility Calculators', url: '/utility-calculators' }
  ];

  const calculators = [
    {
      id: 'days-between',
      title: 'Days Between Dates Calculator',
      subtitle: 'DATE DIFFERENCE TOOL',
      description: 'Calculate the exact number of days between two dates for financial planning and goal tracking.',
      icon: '📅',
      features: [
        'Exact day calculation',
        'Business days option',
        'Age calculator'
      ],
      tags: ['Date Calculator', 'Planning Tool', 'Goal Tracking'],
      url: 'https://www.timeanddate.com/date/durationresult.html',
      isWorking: false,
      color: '#06b6d4'
    },
    {
      id: 'tax-calculator',
      title: 'Tax Calculator',
      subtitle: 'INCOME TAX ESTIMATOR',
      description: 'Estimate your federal and state income taxes based on your income and filing status.',
      icon: '📋',
      features: [
        'Federal tax calculation',
        'State tax estimates',
        'Deduction optimization'
      ],
      tags: ['Tax Planning', 'Income Tax', 'Deductions'],
      url: 'https://www.nerdwallet.com/taxes/tax-calculator',
      isWorking: false,
      color: '#dc2626'
    },
    {
      id: 'tip-calculator',
      title: 'Tip Calculator',
      subtitle: 'QUICK TIP CALCULATOR',
      description: 'Calculate tips and split bills easily for restaurants, services, and group dining.',
      icon: '🧾',
      features: [
        'Multiple tip percentages',
        'Bill splitting',
        'Service quality guide'
      ],
      tags: ['Tip Calculator', 'Bill Splitting', 'Dining'],
      url: 'https://www.calculator.net/tip-calculator.html',
      isWorking: false,
      color: '#10b981'
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Financial Utility Calculators - Everyday Money Tools",
    "description": "Handy financial utility calculators including date calculator, tax estimator, and tip calculator for daily money management",
    "url": "/utility-calculators"
  };

  return (
    <>
      <SEOHead
        title="Financial Utility Calculators - Free Everyday Money Tools | Money Plan Lab"
        description="Handy financial calculators for everyday money management. Date calculator, tax estimator, and tip calculator. All free utility tools for smart financial planning."
        keywords="date calculator, tax calculator, tip calculator, financial utilities, money management tools, financial planning tools"
        canonicalUrl="/utility-calculators"
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
              <li className="active">Financial Utility Calculators</li>
            </ol>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="hero-section">
          <div className="container">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="hero-icon">🔧</span>
                Financial Utilities & Tools
              </div>
              <h1>Financial Utility & Everyday Money Calculators</h1>
              <p className="hero-subtitle">Handy Tools for Everyday Money Management Tasks</p>
              <p className="hero-description">
                Streamline your daily financial tasks with our collection of utility calculators. From date calculations for goal tracking 
                to tax planning and tip calculations, these tools make everyday money management simple and accurate.
              </p>
              
              {/* Key Statistics */}
              <div style={{display: 'flex', gap: '15px', justifyContent: 'space-between', maxWidth: '700px', margin: '0 auto', flexWrap: 'nowrap'}}>
                <div style={{background: 'rgba(255,255,255,0.15)', padding: '14px 18px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.2)', flex: '1', textAlign: 'center', minWidth: '120px', backdropFilter: 'blur(10px)'}}>
                  <div style={{fontSize: '1.6rem', fontWeight: '800', marginBottom: '4px'}}>3</div>
                  <div style={{fontSize: '0.8rem', opacity: '0.9'}}>Utility Tools</div>
                </div>
                <div style={{background: 'rgba(255,255,255,0.15)', padding: '14px 18px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.2)', flex: '1', textAlign: 'center', minWidth: '120px', backdropFilter: 'blur(10px)'}}>
                  <div style={{fontSize: '1.6rem', fontWeight: '800', marginBottom: '4px'}}>15%</div>
                  <div style={{fontSize: '0.8rem', opacity: '0.9'}}>Standard Tip</div>
                </div>
                <div style={{background: 'rgba(255,255,255,0.15)', padding: '14px 18px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.2)', flex: '1', textAlign: 'center', minWidth: '120px', backdropFilter: 'blur(10px)'}}>
                  <div style={{fontSize: '1.6rem', fontWeight: '800', marginBottom: '4px'}}>365</div>
                  <div style={{fontSize: '0.8rem', opacity: '0.9'}}>Days Per Year</div>
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
              <h2>Choose Your Financial Utility</h2>
              <p>Select the tool you need for quick calculations and everyday money management tasks.</p>
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
                        <span key={idx} className={`tag ${tag === 'Date Calculator' ? 'tag-popular' : ''}`}>
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

        {/* Quick Tips Section */}
        <section className="quick-tips-section">
          <div className="container">
            <div className="quick-tips-content">
              <div className="quick-tips-header">
                <div className="quick-tips-badge">
                  <span className="quick-tips-icon">⚡</span>
                  Quick Tips & Formulas
                </div>
                <h2>Handy Financial Formulas You Should Know</h2>
              </div>
              
              <div className="quick-tips-grid">
                <div className="quick-tip-card dates">
                  <div className="quick-tip-icon">📅</div>
                  <h3>Date Calculations</h3>
                  <div className="quick-tip-content">
                    <p><strong>Goal Timeline:</strong> Days remaining = Goal date - Today</p>
                    <p><strong>Savings Rate:</strong> Goal amount ÷ Days remaining = Daily savings needed</p>
                    <p><strong>Compound Frequency:</strong> Daily = 365, Monthly = 12, Quarterly = 4</p>
                  </div>
                </div>
                
                <div className="quick-tip-card taxes">
                  <div className="quick-tip-icon">📊</div>
                  <h3>Tax Calculations</h3>
                  <div className="quick-tip-content">
                    <p><strong>Marginal vs Effective:</strong> Marginal = highest bracket, Effective = average rate</p>
                    <p><strong>Tax Savings:</strong> Deduction × Marginal tax rate</p>
                    <p><strong>After-tax Income:</strong> Gross income × (1 - Effective tax rate)</p>
                  </div>
                </div>
                
                <div className="quick-tip-card tips">
                  <div className="quick-tip-icon">💰</div>
                  <h3>Tip Guidelines</h3>
                  <div className="quick-tip-content">
                    <p><strong>Restaurants:</strong> 15% standard, 18-20% good service, 10% poor service</p>
                    <p><strong>Delivery:</strong> 15-20% of order, minimum $3-5</p>
                    <p><strong>Services:</strong> Hair stylists 15-20%, Taxi 10-15%, Movers $20/person</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pro Tips */}
        <section className="tips-section">
          <div className="container">
            <div className="tips-header">
              <h2>💡 Pro Tips for Financial Efficiency</h2>
              <p>Expert strategies to streamline your money management</p>
            </div>
            
            <div className="tips-grid">
              <div className="tip-card">
                <div className="tip-number">1</div>
                <h3>Automate Calculations</h3>
                <p>Use apps and spreadsheets to automate recurring calculations like monthly savings needed or tax withholdings.</p>
              </div>
              
              <div className="tip-card">
                <div className="tip-number">2</div>
                <h3>Track Important Dates</h3>
                <p>Calendar reminders for tax deadlines, goal milestones, and financial reviews keep you on track without stress.</p>
              </div>
              
              <div className="tip-card">
                <div className="tip-number">3</div>
                <h3>Round Up for Tips</h3>
                <p>Simplify tip calculations by rounding bills to nearest $5 or $10, then calculating percentage for faster service.</p>
              </div>
              
              <div className="tip-card">
                <div className="tip-number">4</div>
                <h3>Plan Tax Moves Early</h3>
                <p>Use tax calculators throughout the year to optimize withholdings and plan tax-saving strategies before year-end.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section">
          <div className="container">
            <div className="faq-header">
              <h2>🤔 Financial Utility FAQs</h2>
              <p>Get answers to common questions about everyday financial calculations</p>
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
                  <span>How do I calculate the exact number of days for my savings goal?</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <p>Use our Days Between Dates Calculator for precise timeline planning:</p>
                  <p><strong>Step 1:</strong> Enter today's date as start date</p>
                  <p><strong>Step 2:</strong> Enter your goal deadline as end date</p>
                  <p><strong>Step 3:</strong> Get exact days remaining</p>
                  <p><strong>Calculate daily savings:</strong> Goal amount ÷ Days remaining = Daily amount needed</p>
                  <p><strong>Example:</strong> Need $3,000 for vacation in 200 days = $15/day savings needed</p>
                  <p><strong>Pro tip:</strong> Include buffer time for unexpected expenses by setting your goal date 2-4 weeks earlier than needed.</p>
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
                  <span>What's the difference between marginal and effective tax rates?</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <p>Understanding these rates helps with tax planning and financial decisions:</p>
                  <p><strong>Marginal Tax Rate:</strong></p>
                  <ul>
                    <li>Rate you pay on your last dollar of income</li>
                    <li>The tax bracket you fall into</li>
                    <li>Used for calculating tax savings from deductions</li>
                    <li>Example: 22% marginal rate means deductions save you 22¢ per dollar</li>
                  </ul>
                  <p><strong>Effective Tax Rate:</strong></p>
                  <ul>
                    <li>Average rate you pay across all income</li>
                    <li>Total taxes ÷ Total income</li>
                    <li>Always lower than marginal rate due to progressive taxation</li>
                    <li>Better for estimating overall tax burden</li>
                  </ul>
                  <p><strong>Example:</strong> $80,000 income might have 22% marginal rate but 12% effective rate</p>
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
                  <span>What's the proper way to calculate tips in different situations?</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <p>Tip amounts vary by service type and quality. Here are standard guidelines:</p>
                  <p><strong>Restaurants (Dine-in):</strong></p>
                  <ul>
                    <li><strong>15%:</strong> Standard service</li>
                    <li><strong>18-20%:</strong> Good to excellent service</li>
                    <li><strong>10-12%:</strong> Poor service (still tip something unless truly terrible)</li>
                    <li><strong>Quick formula:</strong> Move decimal left, double it, adjust up/down</li>
                  </ul>
                  <p><strong>Other Services:</strong></p>
                  <ul>
                    <li><strong>Food delivery:</strong> 15-20% with $3-5 minimum</li>
                    <li><strong>Takeout:</strong> 10% or $1-2 for simple orders</li>
                    <li><strong>Bartenders:</strong> $1-2 per drink or 15-20% of tab</li>
                    <li><strong>Taxis/Rideshare:</strong> 10-15% of fare</li>
                    <li><strong>Hair/spa services:</strong> 15-20% of service cost</li>
                  </ul>
                  <p><strong>Bill splitting:</strong> Calculate tip on total bill, then divide everything equally for simplicity.</p>
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
                  <span>How can I estimate my annual tax liability for planning purposes?</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <p>Estimating taxes helps with quarterly payments, withholding adjustments, and year-end planning:</p>
                  <p><strong>Quick Estimation Method:</strong></p>
                  <ul>
                    <li><strong>Gross income:</strong> All income sources (salary, freelance, investment)</li>
                    <li><strong>Standard deduction (2024):</strong> $14,600 single, $29,200 married filing jointly</li>
                    <li><strong>Taxable income:</strong> Gross income - deductions</li>
                    <li><strong>Apply tax brackets:</strong> Use IRS tax tables or calculator</li>
                  </ul>
                  <p><strong>Don't forget:</strong></p>
                  <ul>
                    <li><strong>FICA taxes:</strong> 7.65% on wages (Social Security + Medicare)</li>
                    <li><strong>State taxes:</strong> Varies by state (0-13%+)</li>
                    <li><strong>Self-employment tax:</strong> 15.3% on self-employment income</li>
                  </ul>
                  <p><strong>Quarterly payments:</strong> If you'll owe $1,000+ in taxes beyond withholding, make quarterly estimated payments to avoid penalties.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        .category-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
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
          border-color: #06b6d4;
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
          color: #06b6d4;
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
          background: linear-gradient(135deg, #06b6d4, #0891b2);
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
          background: linear-gradient(135deg, #06b6d4, #0891b2);
          color: white;
        }

        .card-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(6, 182, 212, 0.3);
        }

        .button-icon {
          font-size: 1rem;
        }

        .quick-tips-section {
          padding: 60px 0;
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          color: white;
        }

        .quick-tips-badge {
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

        .quick-tips-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .quick-tips-header h2 {
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          margin-bottom: 24px;
          font-weight: 700;
        }

        .quick-tips-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 32px;
        }

        .quick-tip-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 24px;
          padding: 32px;
          transition: transform 0.3s ease;
        }

        .quick-tip-card:hover {
          transform: translateY(-5px);
        }

        .quick-tip-icon {
          font-size: 3rem;
          margin-bottom: 20px;
        }

        .quick-tip-card h3 {
          font-size: 1.5rem;
          margin-bottom: 20px;
          font-weight: 700;
        }

        .quick-tip-content p {
          line-height: 1.6;
          margin-bottom: 12px;
          opacity: 0.9;
        }

        .quick-tip-content strong {
          color: #06b6d4;
        }

        .tips-section {
          padding: 60px 0;
          background: linear-gradient(135deg, #cffafe 0%, #67e8f9 100%);
        }

        .tips-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .tips-header h2 {
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          color: #0e7490;
          margin-bottom: 16px;
          font-weight: 700;
        }

        .tips-header p {
          font-size: 1.1rem;
          color: #0891b2;
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
          background: linear-gradient(135deg, #06b6d4, #0891b2);
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
          background: linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%);
        }

        .faq-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .faq-header h2 {
          font-size: clamp(2rem, 4vw, 2.8rem);
          color: #0e7490;
          margin-bottom: 16px;
          font-weight: 800;
        }

        .faq-header p {
          font-size: 1.2rem;
          color: #0891b2;
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
          border-color: #06b6d4;
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
          background: #f0fdfa;
        }

        .faq-question.active {
          background: #ccfbf1;
          color: #0e7490;
        }

        .faq-question.active .faq-icon {
          transform: rotate(45deg);
          color: #06b6d4;
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

          .quick-tips-grid {
            grid-template-columns: 1fr;
            gap: 24px;
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

export default UtilitiesCategory;