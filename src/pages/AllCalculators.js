// src/pages/AllCalculators.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const AllCalculators = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const calculatorCategories = {
    debt: {
      name: 'Debt Management',
      color: '#dc2626',
      bgColor: '#fef2f2',
      icon: '🔗💥',
      description: 'Break free from debt with proven elimination strategies',
      calculators: [
        {
          id: 'emi-calculator',
          title: 'EMI Calculator',
          description: 'Calculate monthly EMI payments for any loan with detailed breakdown',
          url: '/debt-calculators/emi-calculator',
          status: 'working',
          popular: true,
          icon: '💰'
        },
        {
          id: 'debt-payoff',
          title: 'Universal Debt Payoff',
          description: 'Multiple debt elimination strategies with payment schedules',
          url: '/debt-calculators/universal-debt-payoff',
          status: 'working',
          featured: true,
          icon: '🔥'
        },
        {
          id: 'credit-card-debt',
          title: 'Credit Card Debt Calculator',
          description: 'Optimize credit card payments and balance transfer strategies',
          url: '/debt-calculators/credit-card-debt',
          status: 'working',
          icon: '💳'
        },
        {
          id: 'student-loan',
          title: 'Student Loan Payoff',
          description: 'Education debt freedom with refinancing analysis',
          url: '/debt-calculators/student-loan-payoff',
          status: 'working',
          icon: '🎓'
        },
        {
          id: 'car-loan',
          title: 'Car Loan Calculator',
          description: 'Auto financing with down payment and trade-in analysis',
          url: '/debt-calculators/car-loan-calculator',
          status: 'working',
          icon: '🚗'
        },
        {
          id: 'medical-debt',
          title: 'Medical Debt Calculator',
          description: 'Healthcare bill management and payment planning',
          url: '/debt-calculators/medical-debt-calculator',
          status: 'working',
          icon: '🏥'
        }
      ]
    },
    budget: {
      name: 'Budgeting & Planning',
      color: '#f59e0b',
      bgColor: '#fffbeb',
      icon: '📊',
      description: 'Build a solid financial foundation with smart budgeting',
      calculators: [
        {
          id: 'budget-calculator',
          title: 'Budget Calculator',
          description: 'Zero-based budgeting with income vs expenses tracking',
          url: '/budget-calculators/budget-calculator',
          status: 'working',
          featured: true,
          icon: '📋'
        },
        {
          id: 'emergency-fund',
          title: 'Emergency Fund Calculator',
          description: '3-6 months expense calculation with job stability factors',
          url: '/budget-calculators/emergency-fund',
          status: 'working',
          popular: true,
          icon: '🛡️'
        },
        {
          id: 'savings-goal',
          title: 'Savings Goal Calculator',
          description: 'Goal-based savings with timeline optimization',
          url: '/budget-calculators/savings-goal',
          status: 'working',
          icon: '🎯'
        },
        {
          id: 'college-savings',
          title: 'College Savings Calculator',
          description: 'Education cost planning with 529 plan optimization',
          url: '/budget-calculators/college-savings',
          status: 'working',
          icon: '🎓'
        }
      ]
    },
    investment: {
      name: 'Investment & Retirement',
      color: '#2563eb',
      bgColor: '#eff6ff',
      icon: '📈',
      description: 'Build wealth for your golden years with smart investing',
      calculators: [
        {
          id: 'compound-interest',
          title: 'Compound Interest Calculator',
          description: 'The 8th wonder of the world with visual growth charts',
          url: '/investment-calculators/compound-interest',
          status: 'coming-soon',
          popular: true,
          icon: '✨'
        },
        {
          id: 'retirement',
          title: 'Retirement Calculator',
          description: 'Retirement planning with 401k match optimization',
          url: '/investment-calculators/retirement',
          status: 'coming-soon',
          icon: '🏖️'
        },
        {
          id: 'investment',
          title: 'Investment Calculator',
          description: 'Investment growth with historical market returns',
          url: '/investment-calculators/investment',
          status: 'coming-soon',
          icon: '📊'
        },
        {
          id: '401k',
          title: '401k Calculator',
          description: 'Employer match maximizer with tax benefits',
          url: '/investment-calculators/401k-calculator',
          status: 'coming-soon',
          icon: '💼'
        },
        {
          id: 'roth-ira',
          title: 'Roth IRA Calculator',
          description: 'Tax-free growth vs traditional IRA comparison',
          url: '/investment-calculators/roth-ira',
          status: 'coming-soon',
          icon: '🪙'
        },
        {
          id: 'net-worth',
          title: 'Net Worth Calculator',
          description: 'Wealth tracking with asset categorization',
          url: '/investment-calculators/net-worth',
          status: 'coming-soon',
          icon: '💎'
        }
      ]
    },
    realestate: {
      name: 'Real Estate & Housing',
      color: '#10b981',
      bgColor: '#f0fdf4',
      icon: '🏠',
      description: 'Make smart decisions about your biggest investment',
      calculators: [
        {
          id: 'mortgage',
          title: 'Mortgage Calculator',
          description: 'Home loan analyzer with PITI breakdown',
          url: '/real-estate-calculators/mortgage',
          status: 'coming-soon',
          featured: true,
          icon: '🏡'
        },
        {
          id: 'mortgage-payoff',
          title: 'Mortgage Payoff Calculator',
          description: 'Early payoff planner with interest savings',
          url: '/real-estate-calculators/mortgage-payoff',
          status: 'coming-soon',
          icon: '🎯'
        },
        {
          id: 'house-affordability',
          title: 'House Affordability Calculator',
          description: 'Smart buying guide with 28/36 rule application',
          url: '/real-estate-calculators/house-affordability',
          status: 'coming-soon',
          popular: true,
          icon: '🧮'
        },
        {
          id: 'rent-vs-buy',
          title: 'Rent vs Buy Calculator',
          description: 'Decision analysis with total cost comparison',
          url: '/real-estate-calculators/rent-vs-buy',
          status: 'coming-soon',
          icon: '⚖️'
        },
        {
          id: 'refinance',
          title: 'Refinance Calculator',
          description: 'Refinancing analysis with break-even calculation',
          url: '/real-estate-calculators/refinance',
          status: 'coming-soon',
          icon: '🔄'
        }
      ]
    }
  };

  // Filter calculators based on active filter and search term
  const getFilteredCalculators = () => {
    let filtered = [];
    
    Object.entries(calculatorCategories).forEach(([categoryKey, category]) => {
      if (activeFilter === 'all' || activeFilter === categoryKey) {
        category.calculators.forEach(calc => {
          if (calc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
              calc.description.toLowerCase().includes(searchTerm.toLowerCase())) {
            filtered.push({
              ...calc,
              category: category.name,
              categoryKey,
              categoryColor: category.color,
              categoryBgColor: category.bgColor
            });
          }
        });
      }
    });

    return filtered;
  };

  const filteredCalculators = getFilteredCalculators();
  const totalCalculators = Object.values(calculatorCategories).reduce((total, category) => total + category.calculators.length, 0);
  const workingCalculators = filteredCalculators.filter(calc => calc.status === 'working').length;

  return (
    <>
      <Helmet>
        <title>All Financial Calculators - Complete Suite | Money Plan Lab</title>
        <meta name="description" content="Browse our complete collection of 25+ free financial calculators including debt, budget, investment, real estate, and insurance planning tools." />
        <meta name="keywords" content="financial calculators, debt calculator, budget calculator, mortgage calculator, investment calculator, free tools" />
      </Helmet>

      <div className="all-calculators-page">
        {/* Breadcrumbs */}
        <div className="breadcrumbs-container">
          <div className="breadcrumbs">
            <Link to="/" className="breadcrumb-item">
              <span className="home-icon">🏠</span>
              <span>Home</span>
            </Link>
            <span className="breadcrumb-separator">›</span>
            <span className="breadcrumb-current">All Calculators</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-icon">🧮</div>
            <h1 className="hero-title">Complete Financial Calculator Suite</h1>
            <p className="hero-description">
              Your comprehensive toolkit for smart financial decisions. From debt elimination to retirement planning, 
              we've got the tools you need to take control of your financial future.
            </p>
            
            {/* Stats */}
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">{totalCalculators}+</div>
                <div className="stat-label">Total Tools</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{workingCalculators}</div>
                <div className="stat-label">Ready Now</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">100%</div>
                <div className="stat-label">Free</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">4</div>
                <div className="stat-label">Categories</div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter & Search Section */}
        <section className="filter-section">
          <div className="filter-container">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search calculators..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            
            <div className="filter-buttons">
              <button
                onClick={() => setActiveFilter('all')}
                className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              >
                All ({totalCalculators})
              </button>
              {Object.entries(calculatorCategories).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => setActiveFilter(key)}
                  className={`filter-btn ${activeFilter === key ? 'active' : ''}`}
                  style={{
                    '--category-color': category.color,
                    '--category-bg': category.bgColor
                  }}
                >
                  {category.icon} {category.name} ({category.calculators.length})
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Calculators Grid */}
        <section className="calculators-section">
          <div className="calculators-container">
            {/* Popular Calculators */}
            {activeFilter === 'all' && !searchTerm && (
              <div className="popular-section">
                <h2 className="section-title">
                  <span className="title-icon">🔥</span>
                  Most Popular Calculators
                </h2>
                <div className="calculators-grid">
                  {filteredCalculators
                    .filter(calc => calc.popular || calc.featured)
                    .slice(0, 6)
                    .map((calc) => (
                      <div key={calc.id} className="calculator-card popular">
                        <div className="card-header">
                          <div className="card-icon" style={{ backgroundColor: calc.categoryBgColor, color: calc.categoryColor }}>
                            {calc.icon}
                          </div>
                          <div className="card-badges">
                            {calc.featured && <span className="badge featured">Featured</span>}
                            {calc.popular && !calc.featured && <span className="badge popular">Popular</span>}
                          </div>
                        </div>
                        <h3 className="card-title">{calc.title}</h3>
                        <p className="card-description">{calc.description}</p>
                        <div className="card-footer">
                          <span className="card-category" style={{ color: calc.categoryColor }}>
                            {calc.category}
                          </span>
                          {calc.status === 'working' ? (
                            <Link to={calc.url} className="card-button working">
                              Use Calculator
                            </Link>
                          ) : (
                            <span className="card-button coming-soon">
                              Coming Soon
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            )}

            {/* All Calculators */}
            <div className="all-calculators-section">
              <h2 className="section-title">
                <span className="title-icon">🧮</span>
                {activeFilter === 'all' ? 'All Calculators' : calculatorCategories[activeFilter]?.name || 'Calculators'}
                <span className="count">({filteredCalculators.length})</span>
              </h2>
              
              {filteredCalculators.length === 0 ? (
                <div className="no-results">
                  <div className="no-results-icon">🔍</div>
                  <h3>No calculators found</h3>
                  <p>Try adjusting your search terms or filters</p>
                </div>
              ) : (
                <div className="calculators-grid">
                  {filteredCalculators.map((calc) => (
                    <div key={calc.id} className="calculator-card">
                      <div className="card-header">
                        <div className="card-icon" style={{ backgroundColor: calc.categoryBgColor, color: calc.categoryColor }}>
                          {calc.icon}
                        </div>
                        <div className="card-badges">
                          {calc.featured && <span className="badge featured">Featured</span>}
                          {calc.popular && !calc.featured && <span className="badge popular">Popular</span>}
                        </div>
                      </div>
                      <h3 className="card-title">{calc.title}</h3>
                      <p className="card-description">{calc.description}</p>
                      <div className="card-footer">
                        <span className="card-category" style={{ color: calc.categoryColor }}>
                          {calc.category}
                        </span>
                        {calc.status === 'working' ? (
                          <Link to={calc.url} className="card-button working">
                            Use Calculator
                          </Link>
                        ) : (
                          <span className="card-button coming-soon">
                            Coming Soon
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Coming Soon CTA */}
        <section className="cta-section">
          <div className="cta-container">
            <div className="cta-content">
              <span className="cta-icon">🚀</span>
              <h3>More Calculators Coming Soon!</h3>
              <p>We're constantly adding new calculators and features. Have a suggestion?</p>
              <Link to="/contact" className="cta-button">
                Let us know!
              </Link>
            </div>
          </div>
        </section>

        <style jsx>{`
          .all-calculators-page {
            min-height: 100vh;
            background: linear-gradient(to bottom, #f8fafc, #ffffff);
          }

          /* Breadcrumbs */
          .breadcrumbs-container {
            background: white;
            border-bottom: 1px solid #e2e8f0;
            padding: 0 20px;
          }

          .breadcrumbs {
            max-width: 1400px;
            margin: 0 auto;
            padding: 16px 0;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
          }

          .breadcrumb-item {
            display: flex;
            align-items: center;
            gap: 6px;
            color: #64748b;
            text-decoration: none;
            transition: color 0.2s ease;
          }

          .breadcrumb-item:hover {
            color: #2563eb;
          }

          .home-icon {
            font-size: 16px;
          }

          .breadcrumb-separator {
            color: #cbd5e1;
            font-weight: 500;
          }

          .breadcrumb-current {
            color: #1e293b;
            font-weight: 500;
          }

          /* Hero Section */
          .hero-section {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 80px 20px;
            text-align: center;
            position: relative;
            overflow: hidden;
          }

          .hero-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3), transparent 50%),
                        radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1), transparent 50%);
          }

          .hero-content {
            max-width: 1200px;
            margin: 0 auto;
            position: relative;
            z-index: 1;
          }

          .hero-icon {
            font-size: 4rem;
            margin-bottom: 24px;
          }

          .hero-title {
            font-size: clamp(2.5rem, 5vw, 4rem);
            font-weight: 800;
            margin-bottom: 20px;
            line-height: 1.1;
          }

          .hero-description {
            font-size: 1.25rem;
            max-width: 700px;
            margin: 0 auto 40px;
            opacity: 0.95;
            line-height: 1.6;
          }

          .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 30px;
            max-width: 600px;
            margin: 0 auto;
          }

          .stat-item {
            text-align: center;
          }

          .stat-number {
            font-size: 2.5rem;
            font-weight: 800;
            display: block;
            margin-bottom: 8px;
          }

          .stat-label {
            font-size: 0.9rem;
            opacity: 0.9;
          }

          /* Filter Section */
          .filter-section {
            background: white;
            padding: 40px 20px;
            border-bottom: 1px solid #e2e8f0;
          }

          .filter-container {
            max-width: 1400px;
            margin: 0 auto;
          }

          .search-box {
            position: relative;
            max-width: 500px;
            margin: 0 auto 30px;
          }

          .search-icon {
            position: absolute;
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
            color: #64748b;
            font-size: 1.1rem;
          }

          .search-input {
            width: 100%;
            padding: 16px 16px 16px 48px;
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            font-size: 16px;
            transition: all 0.2s ease;
            background: white;
          }

          .search-input:focus {
            outline: none;
            border-color: #2563eb;
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
          }

          .filter-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            justify-content: center;
          }

          .filter-btn {
            padding: 12px 24px;
            border: 2px solid #e2e8f0;
            background: white;
            border-radius: 25px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            white-space: nowrap;
          }

          .filter-btn:hover {
            border-color: #cbd5e1;
            background: #f8fafc;
          }

          .filter-btn.active {
            background: var(--category-color, #2563eb);
            border-color: var(--category-color, #2563eb);
            color: white;
          }

          /* Calculators Section */
          .calculators-section {
            padding: 60px 20px;
          }

          .calculators-container {
            max-width: 1400px;
            margin: 0 auto;
          }

          .popular-section,
          .all-calculators-section {
            margin-bottom: 80px;
          }

          .section-title {
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 2.5rem;
            font-weight: 800;
            color: #1e293b;
            margin-bottom: 40px;
            text-align: center;
            justify-content: center;
          }

          .title-icon {
            font-size: 2rem;
          }

          .count {
            color: #64748b;
            font-size: 1.5rem;
            font-weight: 500;
          }

          .calculators-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 30px;
          }

          .calculator-card {
            background: white;
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            border: 1px solid #e2e8f0;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }

          .calculator-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
          }

          .calculator-card.popular {
            border: 2px solid #f59e0b;
            background: linear-gradient(135deg, #fffbeb 0%, #ffffff 100%);
          }

          .card-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 20px;
          }

          .card-icon {
            width: 60px;
            height: 60px;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.8rem;
            font-weight: 600;
          }

          .card-badges {
            display: flex;
            flex-direction: column;
            gap: 6px;
          }

          .badge {
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .badge.featured {
            background: #8b5cf6;
            color: white;
          }

          .badge.popular {
            background: #f59e0b;
            color: white;
          }

          .card-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 12px;
            line-height: 1.3;
          }

          .card-description {
            color: #64748b;
            line-height: 1.6;
            margin-bottom: 24px;
          }

          .card-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 16px;
          }

          .card-category {
            font-size: 0.85rem;
            font-weight: 600;
            padding: 6px 12px;
            border-radius: 20px;
            background: rgba(37, 99, 235, 0.1);
          }

          .card-button {
            padding: 10px 20px;
            border-radius: 10px;
            font-size: 0.9rem;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.2s ease;
            white-space: nowrap;
          }

          .card-button.working {
            background: #2563eb;
            color: white;
          }

          .card-button.working:hover {
            background: #1d4ed8;
            transform: translateY(-2px);
          }

          .card-button.coming-soon {
            background: #f1f5f9;
            color: #64748b;
            cursor: not-allowed;
          }

          /* No Results */
          .no-results {
            text-align: center;
            padding: 80px 20px;
          }

          .no-results-icon {
            font-size: 4rem;
            margin-bottom: 20px;
          }

          .no-results h3 {
            font-size: 1.5rem;
            color: #1e293b;
            margin-bottom: 8px;
          }

          .no-results p {
            color: #64748b;
          }

          /* CTA Section */
          .cta-section {
            background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
            padding: 60px 20px;
          }

          .cta-container {
            max-width: 800px;
            margin: 0 auto;
          }

          .cta-content {
            text-align: center;
            background: white;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
          }

          .cta-icon {
            font-size: 3rem;
            margin-bottom: 16px;
            display: block;
          }

          .cta-content h3 {
            font-size: 1.8rem;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 12px;
          }

          .cta-content p {
            color: #64748b;
            margin-bottom: 24px;
            font-size: 1.1rem;
          }

          .cta-button {
            background: #2563eb;
            color: white;
            padding: 14px 28px;
            border-radius: 12px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.2s ease;
            display: inline-block;
          }

          .cta-button:hover {
            background: #1d4ed8;
            transform: translateY(-2px);
          }

          /* Mobile Responsive */
          @media (max-width: 768px) {
            .hero-section {
              padding: 60px 20px;
            }

            .calculators-grid {
              grid-template-columns: 1fr;
            }

            .filter-buttons {
              justify-content: center;
            }

            .filter-btn {
              font-size: 13px;
              padding: 10px 16px;
            }

            .section-title {
              font-size: 2rem;
              text-align: center;
            }

            .card-footer {
              flex-direction: column;
              gap: 12px;
              align-items: stretch;
            }

            .card-button {
              text-align: center;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default AllCalculators;