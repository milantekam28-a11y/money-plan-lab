// src/pages/calculators/debt/UniversalDebtPayoff.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../../components/SEO/SEOHead';

const UniversalDebtPayoff = () => {
  const [currency, setCurrency] = useState('USD');
  const [strategy, setStrategy] = useState('avalanche');
  const [extraPayment, setExtraPayment] = useState('500');
  const [debts, setDebts] = useState([
    { id: 1, name: 'Credit Card 1', balance: '2500', minPayment: '75', interestRate: '18.5', type: 'credit_card' }
  ]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Debt Calculators', url: '/debt-calculators' },
    { name: 'Universal Debt Payoff', url: '/debt-calculators/universal-debt-payoff' }
  ];

  // Global currencies
  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc' },
    { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
    { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' }
  ];

  const debtTypes = [
    { value: 'credit_card', label: 'Credit Card', color: '#ef4444' },
    { value: 'personal_loan', label: 'Personal Loan', color: '#f97316' },
    { value: 'student_loan', label: 'Student Loan', color: '#eab308' },
    { value: 'auto_loan', label: 'Auto Loan', color: '#22c55e' },
    { value: 'medical_debt', label: 'Medical Debt', color: '#a855f7' },
    { value: 'mortgage', label: 'Mortgage', color: '#3b82f6' },
    { value: 'other', label: 'Other Debt', color: '#6b7280' }
  ];

  const currentCurrency = currencies.find(c => c.code === currency);

  const addDebt = () => {
    const newDebt = {
      id: Date.now(),
      name: `Debt ${debts.length + 1}`,
      balance: '',
      minPayment: '',
      interestRate: '',
      type: 'credit_card'
    };
    setDebts([...debts, newDebt]);
  };

  const updateDebt = (id, field, value) => {
    setDebts(debts.map(debt => 
      debt.id === id ? { ...debt, [field]: value } : debt
    ));
  };

  const removeDebt = (id) => {
    if (debts.length > 1) {
      setDebts(debts.filter(debt => debt.id !== id));
    }
  };

  const calculatePayoff = () => {
    setLoading(true);
    
    setTimeout(() => {
      // Filter valid debts
      const validDebts = debts.filter(debt => 
        debt.balance && debt.minPayment && debt.interestRate &&
        parseFloat(debt.balance) > 0 && parseFloat(debt.minPayment) > 0 && parseFloat(debt.interestRate) > 0
      );

      if (validDebts.length === 0) {
        alert('Please enter valid debt information');
        setLoading(false);
        return;
      }

      const extra = parseFloat(extraPayment) || 0;
      
      // Prepare debts for calculation
      const workingDebts = validDebts.map(debt => ({
        ...debt,
        originalBalance: parseFloat(debt.balance),
        balance: parseFloat(debt.balance),
        minPayment: parseFloat(debt.minPayment),
        interestRate: parseFloat(debt.interestRate) / 100 / 12,
        annualRate: parseFloat(debt.interestRate)
      }));

      // Sort by strategy
      let sortedDebts = [...workingDebts];
      if (strategy === 'avalanche') {
        sortedDebts.sort((a, b) => b.annualRate - a.annualRate);
      } else {
        sortedDebts.sort((a, b) => a.originalBalance - b.originalBalance);
      }

      // Calculate payoff timeline
      let totalInterest = 0;
      let totalMonths = 0;
      let snowball = extra;
      let victories = [];
      let activeDebts = [...sortedDebts];
      let month = 0;
      const maxMonths = 600;

      while (activeDebts.length > 0 && month < maxMonths) {
        month++;
        
        for (let debt of activeDebts) {
          if (debt.balance > 0) {
            const interest = debt.balance * debt.interestRate;
            let payment = debt.minPayment;
            
            // Add snowball to first debt
            if (debt === activeDebts.find(d => d.balance > 0)) {
              payment += snowball;
            }
            
            payment = Math.min(payment, debt.balance + interest);
            debt.balance = Math.max(0, debt.balance - (payment - interest));
            totalInterest += interest;
            
            if (debt.balance <= 0.01) {
              debt.balance = 0;
              victories.push({
                month: month,
                name: debt.name,
                amount: debt.originalBalance,
                type: debt.type
              });
              snowball += debt.minPayment;
            }
          }
        }
        
        activeDebts = activeDebts.filter(debt => debt.balance > 0);
      }

      totalMonths = month;
      const totalOriginalBalance = workingDebts.reduce((sum, debt) => sum + debt.originalBalance, 0);
      const totalMinPayments = workingDebts.reduce((sum, debt) => sum + debt.minPayment, 0);
      const totalPaid = totalOriginalBalance + totalInterest;

      // Calculate debt-free date
      const today = new Date();
      const debtFreeDate = new Date(today);
      debtFreeDate.setMonth(debtFreeDate.getMonth() + totalMonths);

      setResults({
        strategy,
        totalOriginalBalance,
        totalMonths,
        totalInterest,
        totalPaid,
        totalMinPayments,
        totalMonthlyPayment: totalMinPayments + extra,
        debtFreeDate,
        victories,
        finalSnowball: snowball,
        extraPayment: extra,
        debtOrder: sortedDebts.map((debt, index) => ({ 
          ...debt, 
          order: index + 1,
          name: debt.name, 
          balance: debt.originalBalance 
        }))
      });

      setLoading(false);
      setShowResults(true);
    }, 1000);
  };

  const formatCurrency = (amount) => {
    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return `${currentCurrency.symbol}${formatter.format(Math.abs(amount))}`;
  };

  const formatTime = (months) => {
    if (months <= 0) return '0 months';
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years === 0) return `${months} month${months > 1 ? 's' : ''}`;
    if (remainingMonths === 0) return `${years} year${years > 1 ? 's' : ''}`;
    return `${years} year${years > 1 ? 's' : ''} ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
  };

  const getSortedDebts = () => {
    const validDebts = debts.filter(debt => debt.balance && parseFloat(debt.balance) > 0);
    if (strategy === 'avalanche') {
      return validDebts.sort((a, b) => (parseFloat(b.interestRate) || 0) - (parseFloat(a.interestRate) || 0));
    } else {
      return validDebts.sort((a, b) => (parseFloat(a.balance) || 0) - (parseFloat(b.balance) || 0));
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Universal Debt Payoff Calculator",
    "description": "Calculate the fastest way to eliminate debt using avalanche or snowball methods with multiple currency support",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "permissions": "browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      <SEOHead
        title="Universal Debt Payoff Calculator - Free Debt Elimination Tool"
        description="Calculate the fastest way to eliminate debt using avalanche or snowball methods. Free global debt payoff calculator with multiple currency support."
        keywords="debt payoff calculator, debt elimination, debt avalanche, debt snowball, pay off debt faster, debt freedom, financial calculator"
        canonicalUrl="/debt-calculators/universal-debt-payoff"
        breadcrumbs={breadcrumbs}
        structuredData={structuredData}
        calculatorType="Universal Debt Payoff Calculator"
      />
      
      <div className="calculator-page">
        {/* Breadcrumb */}
        <nav className="breadcrumb-nav">
          <div className="container">
            <ol className="breadcrumb">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/debt-calculators">Debt Calculators</Link></li>
              <li className="active">Universal Debt Payoff</li>
            </ol>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="hero-section">
          <div className="container">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="hero-icon">🔥</span>
                Ultimate Debt Destroyer
              </div>
              <h1>Universal Debt Payoff Calculator</h1>
              <p className="hero-subtitle">Break Free from Debt Using Proven Mathematical Strategies</p>
              <p className="hero-description">
                Calculate your debt-free date, create a payment timeline, and see exactly how much you'll save 
                using debt avalanche or snowball methods. Works with any currency globally.
              </p>
              
              {/* Key Benefits */}
              <div className="benefits-grid">
                <div className="benefit-item">
                  <div className="benefit-icon">📅</div>
                  <h3>Debt-Free Date</h3>
                  <p>See exactly when you'll be debt-free</p>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">💰</div>
                  <h3>Interest Savings</h3>
                  <p>Calculate total interest saved</p>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">📊</div>
                  <h3>Payment Timeline</h3>
                  <p>Visual progress tracking</p>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">🌍</div>
                  <h3>Global Support</h3>
                  <p>Multiple currencies included</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Calculator Interface */}
        <section className="calculator-section">
          <div className="container">
            <div className="calculator-grid">
              
              {/* Input Section */}
              <div className="input-card">
                <div className="card-header">
                  <h2><span className="header-icon">⚙️</span> Configure Your Debts</h2>
                </div>
                
                {/* Global Settings */}
                <div className="global-settings">
                  <div className="settings-row">
                    <div className="form-group">
                      <label htmlFor="currency">Currency</label>
                      <select
                        id="currency"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="form-select"
                      >
                        {currencies.map(curr => (
                          <option key={curr.code} value={curr.code}>
                            {curr.symbol} {curr.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="strategy">Payoff Strategy</label>
                      <select
                        id="strategy"
                        value={strategy}
                        onChange={(e) => setStrategy(e.target.value)}
                        className="form-select"
                      >
                        <option value="avalanche">🏔️ Debt Avalanche (Highest Interest First)</option>
                        <option value="snowball">❄️ Debt Snowball (Smallest Balance First)</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="extra-payment">
                      Extra Monthly Payment ({currentCurrency.symbol})
                    </label>
                    <input
                      type="number"
                      id="extra-payment"
                      value={extraPayment}
                      onChange={(e) => setExtraPayment(e.target.value)}
                      placeholder="500"
                      className="form-input"
                      min="0"
                      step="1"
                    />
                    <small className="form-help">Additional amount beyond minimum payments</small>
                  </div>
                </div>

                {/* Strategy Info */}
                <div className="strategy-info">
                  <div className="info-box">
                    <h4>
                      {strategy === 'avalanche' ? '🏔️ Debt Avalanche Method' : '❄️ Debt Snowball Method'}
                    </h4>
                    <p>
                      {strategy === 'avalanche' 
                        ? 'Pay minimums on all debts, then attack the highest interest rate debt first. Mathematically optimal - saves the most money.'
                        : 'Pay minimums on all debts, then attack the smallest balance first. Provides psychological wins to keep you motivated.'
                      }
                    </p>
                  </div>
                </div>

                {/* Add Debt Form */}
                <div className="add-debt-section">
                  <h3>Add New Debt</h3>
                  <div className="debt-form">
                    <div className="form-group">
                      <label>Debt Name</label>
                      <input
                        type="text"
                        placeholder="e.g., Visa Card, Medical Bill"
                        className="form-input"
                        id="newDebtName"
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Balance ({currentCurrency.symbol})</label>
                        <input
                          type="number"
                          placeholder="5000"
                          className="form-input"
                          id="newDebtBalance"
                          min="0"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Min Payment ({currentCurrency.symbol})</label>
                        <input
                          type="number"
                          placeholder="150"
                          className="form-input"
                          id="newDebtPayment"
                          min="0"
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Interest Rate (%)</label>
                        <input
                          type="number"
                          step="0.01"
                          placeholder="18.5"
                          className="form-input"
                          id="newDebtRate"
                          min="0"
                          max="100"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Debt Type</label>
                        <select className="form-select" id="newDebtType">
                          {debtTypes.map(type => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      const name = document.getElementById('newDebtName').value.trim();
                      const balance = document.getElementById('newDebtBalance').value;
                      const payment = document.getElementById('newDebtPayment').value;
                      const rate = document.getElementById('newDebtRate').value;
                      const type = document.getElementById('newDebtType').value;

                      if (name && balance && payment && rate) {
                        const newDebt = {
                          id: Date.now(),
                          name,
                          balance,
                          minPayment: payment,
                          interestRate: rate,
                          type
                        };
                        setDebts([...debts, newDebt]);
                        
                        // Clear form
                        document.getElementById('newDebtName').value = '';
                        document.getElementById('newDebtBalance').value = '';
                        document.getElementById('newDebtPayment').value = '';
                        document.getElementById('newDebtRate').value = '';
                      } else {
                        alert('Please fill in all debt information');
                      }
                    }}
                    className="btn-add-debt"
                    type="button"
                  >
                    <span className="btn-icon">+</span> Add to Payoff Plan
                  </button>
                </div>

                <button 
                  onClick={calculatePayoff} 
                  className="btn-calculate"
                  disabled={loading}
                  type="button"
                >
                  {loading ? (
                    <>
                      <span className="btn-icon">⏳</span> Calculating...
                    </>
                  ) : (
                    <>
                      <span className="btn-icon">🚀</span> Calculate My Debt-Free Date!
                    </>
                  )}
                </button>
              </div>

              {/* Debt List */}
              <div className="debt-list-card">
                <div className="card-header">
                  <h2>
                    <span className="header-icon">
                      {strategy === 'avalanche' ? '🏔️' : '❄️'}
                    </span> 
                    Your {strategy === 'avalanche' ? 'Avalanche' : 'Snowball'} Plan
                  </h2>
                  <div className="debt-count">{debts.length} debt{debts.length !== 1 ? 's' : ''}</div>
                </div>

                <p className="debt-list-subtitle">
                  {strategy === 'avalanche' 
                    ? 'Debts ordered by highest to lowest interest rate'
                    : 'Debts ordered by smallest to largest balance'
                  }
                </p>

                <div className="debt-list">
                  {getSortedDebts().map((debt, index) => (
                    <div key={debt.id} className={`debt-item ${index === 0 ? 'priority' : ''}`}>
                      <div className="debt-header">
                        <div className="debt-priority">
                          <span className="priority-number">{index + 1}</span>
                          {index === 0 && <span className="priority-badge">ATTACK FIRST!</span>}
                        </div>
                        <button 
                          onClick={() => removeDebt(debt.id)} 
                          className="remove-btn"
                          type="button"
                        >
                          ×
                        </button>
                      </div>
                      
                      <div className="debt-info">
                        <h4 className="debt-name">{debt.name}</h4>
                        <div className="debt-details">
                          <div className="debt-detail">
                            <span className="detail-label">Balance</span>
                            <span className="detail-value">{formatCurrency(debt.balance || 0)}</span>
                          </div>
                          <div className="debt-detail">
                            <span className="detail-label">Min Payment</span>
                            <span className="detail-value">{formatCurrency(debt.minPayment || 0)}</span>
                          </div>
                          <div className="debt-detail">
                            <span className="detail-label">Interest Rate</span>
                            <span className="detail-value">{debt.interestRate || 0}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {debts.length === 0 && (
                    <div className="empty-state">
                      <div className="empty-icon">📋</div>
                      <p>No debts added yet. Add your debts to create your payoff plan!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        {showResults && results && (
          <section className="results-section">
            <div className="container">
              
              {/* Debt Free Date */}
              <div className="debt-free-card">
                <h2>Your Debt-Free Date</h2>
                <div className="date-display">
                  {results.debtFreeDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <div className="countdown">
                  <div className="countdown-item">
                    <div className="countdown-value">{Math.floor(results.totalMonths / 12)}</div>
                    <div className="countdown-label">Years</div>
                  </div>
                  <div className="countdown-item">
                    <div className="countdown-value">{results.totalMonths % 12}</div>
                    <div className="countdown-label">Months</div>
                  </div>
                </div>
              </div>

              {/* Results Grid */}
              <div className="results-grid">
                <div className="result-card">
                  <div className="result-icon">📅</div>
                  <div className="result-value">{results.totalMonths}</div>
                  <div className="result-label">Total Months</div>
                </div>
                <div className="result-card">
                  <div className="result-icon">💵</div>
                  <div className="result-value">{formatCurrency(results.totalPaid)}</div>
                  <div className="result-label">Total Paid</div>
                </div>
                <div className="result-card">
                  <div className="result-icon">💸</div>
                  <div className="result-value">{formatCurrency(results.totalInterest)}</div>
                  <div className="result-label">Total Interest</div>
                </div>
                <div className="result-card">
                  <div className="result-icon">🚀</div>
                  <div className="result-value">{formatCurrency(results.finalSnowball)}</div>
                  <div className="result-label">Final Payment Power</div>
                </div>
              </div>

              {/* Victory Timeline */}
              {results.victories && results.victories.length > 0 && (
                <div className="timeline-card">
                  <h3><span className="timeline-icon">🏆</span> Your Victory Timeline</h3>
                  <div className="timeline">
                    {results.victories.map((victory, index) => {
                      const victoryDate = new Date();
                      victoryDate.setMonth(victoryDate.getMonth() + victory.month);
                      
                      return (
                        <div key={index} className="timeline-item">
                          <div className="timeline-marker">
                            <span className="timeline-month">Month {victory.month}</span>
                          </div>
                          <div className="timeline-content">
                            <h4 className="timeline-title">{victory.name} - ELIMINATED! 🎉</h4>
                            <p className="timeline-details">
                              {victoryDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} • 
                              {formatCurrency(victory.amount)} paid off
                            </p>
                            <div className="timeline-progress">
                              Victory {index + 1} of {results.victories.length} • 
                              {results.victories.length - index - 1} debts remaining
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Pro Tips */}
              <div className="pro-tips-card">
                <h3><span className="tips-icon">💡</span> Pro Tips to Pay Off Debt Faster</h3>
                
                <div className="tips-grid">
                  <div className="tip-item">
                    <div className="tip-number">1</div>
                    <div className="tip-content">
                      <h4>Apply All Windfalls</h4>
                      <p>Tax refunds, bonuses, and gifts should go directly to debt. A $1,000 windfall can eliminate months of payments.</p>
                    </div>
                  </div>

                  <div className="tip-item">
                    <div className="tip-number">2</div>
                    <div className="tip-content">
                      <h4>Round Up Payments</h4>
                      <p>Round payments to the nearest $50 or $100. Small increases compound into massive interest savings.</p>
                    </div>
                  </div>

                  <div className="tip-item">
                    <div className="tip-number">3</div>
                    <div className="tip-content">
                      <h4>Negotiate Lower Rates</h4>
                      <p>Call creditors to request lower rates. Even a 2% reduction saves hundreds in interest over time.</p>
                    </div>
                  </div>

                  <div className="tip-item">
                    <div className="tip-number">4</div>
                    <div className="tip-content">
                      <h4>Find Extra Income</h4>
                      <p>Side jobs, selling items, or freelancing can provide extra payment power to accelerate your freedom.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        <section className="faq-section">
          <div className="container">
            <div className="faq-header">
              <div className="faq-badge">
                <span className="faq-icon">❓</span>
                FAQ Section
              </div>
              <h2>Frequently Asked Questions</h2>
              <p className="faq-intro">
                Get answers to the most common questions about debt elimination strategies.
              </p>
            </div>

            <div className="faq-grid">
              <div className="faq-item">
                <h3 className="faq-question">What's the difference between debt avalanche and snowball methods?</h3>
                <div className="faq-answer">
                  <p>Debt avalanche targets the highest interest rate debt first, saving more money mathematically. Debt snowball targets the smallest balance first, providing psychological wins for better motivation. Choose avalanche for maximum savings, snowball for maximum motivation.</p>
                </div>
              </div>

              <div className="faq-item">
                <h3 className="faq-question">How does this calculator work with different currencies?</h3>
                <div className="faq-answer">
                  <p>Our calculator supports 10+ major global currencies including USD, EUR, GBP, INR, and more. Simply select your currency from the dropdown, and all calculations and results will be displayed in your chosen currency format.</p>
                </div>
              </div>

              <div className="faq-item">
                <h3 className="faq-question">Should I include my mortgage in debt payoff calculations?</h3>
                <div className="faq-answer">
                  <p>Generally, mortgages are excluded from debt elimination strategies due to their low interest rates and tax benefits. Focus on high-interest consumer debt first - credit cards, personal loans, and auto loans typically provide better returns when paid off early.</p>
                </div>
              </div>

              <div className="faq-item">
                <h3 className="faq-question">How much extra should I put toward debt each month?</h3>
                <div className="faq-answer">
                  <p>Put as much as possible while maintaining a basic emergency fund. Even an extra $100-200 monthly can cut years off your debt freedom date. Review your budget for areas to cut temporarily - entertainment, dining out, or unused subscriptions.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        .calculator-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
          margin-bottom: 0;
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

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .benefit-item {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          padding: 24px 20px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: transform 0.3s ease;
        }

        .benefit-item:hover {
          transform: translateY(-5px);
        }

        .benefit-icon {
          font-size: 2rem;
          margin-bottom: 12px;
        }

        .benefit-item h3 {
          font-size: 1.1rem;
          margin-bottom: 8px;
          font-weight: 600;
        }

        .benefit-item p {
          font-size: 0.9rem;
          opacity: 0.9;
          line-height: 1.4;
        }

        .calculator-section {
          padding: 40px 0;
        }

        .calculator-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .input-card,
        .debt-list-card {
          background: white;
          border-radius: 24px;
          padding: 32px;
          box-shadow: 0 20px 40px -12px rgba(0,0,0,0.15);
          border: 1px solid #e2e8f0;
        }

        .card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 2px solid #e2e8f0;
        }

        .card-header h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1a202c;
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 0;
        }

        .header-icon {
          font-size: 1.3rem;
        }

        .debt-count {
          background: #667eea;
          color: white;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .global-settings {
          margin-bottom: 32px;
          padding: 24px;
          background: #f8fafc;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
        }

        .settings-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .form-group label {
          display: block;
          font-weight: 600;
          color: #374151;
          margin-bottom: 6px;
          font-size: 0.9rem;
        }

        .form-input,
        .form-select {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 14px;
          transition: all 0.3s ease;
          background: white;
        }

        .form-input:focus,
        .form-select:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .form-help {
          display: block;
          font-size: 0.8rem;
          color: #6b7280;
          margin-top: 4px;
        }

        .strategy-info {
          margin-bottom: 32px;
        }

        .info-box {
          background: linear-gradient(135deg, #e0e7ff, #c7d2fe);
          border: 2px solid #818cf8;
          border-radius: 16px;
          padding: 24px;
        }

        .info-box h4 {
          color: #312e81;
          margin-bottom: 12px;
          font-size: 1.1rem;
          font-weight: 700;
        }

        .info-box p {
          color: #4c1d95;
          line-height: 1.6;
          margin: 0;
        }

        .add-debt-section {
          margin-bottom: 32px;
          padding: 24px;
          border: 2px dashed #d1d5db;
          border-radius: 16px;
        }

        .add-debt-section h3 {
          color: #374151;
          margin-bottom: 20px;
          font-size: 1.2rem;
          font-weight: 600;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .btn-add-debt {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
        }

        .btn-add-debt:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
        }

        .btn-calculate {
          width: 100%;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border: none;
          padding: 18px 24px;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .btn-calculate:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(102, 126, 234, 0.3);
        }

        .btn-calculate:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .btn-icon {
          font-size: 1rem;
        }

        .debt-list-subtitle {
          color: #6b7280;
          font-size: 0.9rem;
          margin-bottom: 24px;
          text-align: center;
          font-style: italic;
        }

        .debt-list {
          max-height: 500px;
          overflow-y: auto;
        }

        .debt-item {
          background: linear-gradient(135deg, #f8f9fa, #e9ecef);
          border: 2px solid #dee2e6;
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 16px;
          transition: all 0.3s ease;
        }

        .debt-item:hover {
          transform: translateX(5px);
          border-color: #667eea;
        }

        .debt-item.priority {
          border-color: #10b981;
          background: linear-gradient(135deg, #d1fae5, #a7f3d0);
        }

        .debt-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .debt-priority {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .priority-number {
          width: 32px;
          height: 32px;
          background: #667eea;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.9rem;
        }

        .debt-item.priority .priority-number {
          background: #10b981;
        }

        .priority-badge {
          background: #10b981;
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .remove-btn {
          width: 28px;
          height: 28px;
          background: #fee2e2;
          color: #dc2626;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          font-weight: bold;
          transition: all 0.2s ease;
        }

        .remove-btn:hover {
          background: #fecaca;
          transform: scale(1.1);
        }

        .debt-name {
          font-weight: 700;
          color: #374151;
          margin-bottom: 12px;
          font-size: 1rem;
        }

        .debt-details {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .debt-detail {
          text-align: center;
        }

        .detail-label {
          display: block;
          font-size: 0.75rem;
          color: #6b7280;
          margin-bottom: 4px;
        }

        .detail-value {
          font-weight: 600;
          color: #374151;
          font-size: 0.9rem;
        }

        .empty-state {
          text-align: center;
          padding: 40px 20px;
          color: #6b7280;
        }

        .empty-icon {
          font-size: 3rem;
          margin-bottom: 16px;
          opacity: 0.5;
        }

        .results-section {
          padding: 60px 0;
          animation: fadeInUp 0.6s ease;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .debt-free-card {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          padding: 40px;
          border-radius: 24px;
          text-align: center;
          margin-bottom: 40px;
          box-shadow: 0 20px 40px rgba(16, 185, 129, 0.3);
        }

        .debt-free-card h2 {
          font-size: 1.8rem;
          margin-bottom: 20px;
          font-weight: 700;
        }

        .date-display {
          font-size: 2.5rem;
          font-weight: 800;
          margin: 24px 0;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        }

        .countdown {
          display: flex;
          justify-content: center;
          gap: 40px;
          margin-top: 24px;
        }

        .countdown-item {
          text-align: center;
        }

        .countdown-value {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .countdown-label {
          font-size: 0.9rem;
          opacity: 0.9;
        }

        .results-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 24px;
          margin-bottom: 40px;
        }

        .result-card {
          background: white;
          border-radius: 20px;
          padding: 32px 24px;
          text-align: center;
          box-shadow: 0 15px 35px rgba(0,0,0,0.1);
          transition: transform 0.3s ease;
        }

        .result-card:hover {
          transform: translateY(-5px);
        }

        .result-icon {
          font-size: 2.5rem;
          margin-bottom: 16px;
        }

        .result-value {
          font-size: 1.8rem;
          font-weight: 700;
          color: #667eea;
          margin-bottom: 8px;
        }

        .result-label {
          color: #6b7280;
          font-size: 0.95rem;
        }

        .timeline-card {
          background: white;
          border-radius: 24px;
          padding: 32px;
          margin-bottom: 40px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .timeline-card h3 {
          color: #374151;
          margin-bottom: 32px;
          font-size: 1.5rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .timeline-icon {
          font-size: 1.4rem;
        }

        .timeline-item {
          display: flex;
          gap: 24px;
          margin-bottom: 24px;
          padding: 20px;
          background: #f8fafc;
          border-radius: 16px;
          border-left: 4px solid #667eea;
        }

        .timeline-marker {
          flex-shrink: 0;
        }

        .timeline-month {
          background: #667eea;
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .timeline-content {
          flex: 1;
        }

        .timeline-title {
          font-weight: 700;
          color: #374151;
          margin-bottom: 8px;
          font-size: 1.1rem;
        }

        .timeline-details {
          color: #6b7280;
          font-size: 0.9rem;
          margin-bottom: 6px;
        }

        .timeline-progress {
          color: #10b981;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .pro-tips-card {
          background: linear-gradient(135deg, #e0e7ff, #c7d2fe);
          border: 2px solid #818cf8;
          border-radius: 24px;
          padding: 40px;
          margin-bottom: 40px;
        }

        .pro-tips-card h3 {
          color: #312e81;
          margin-bottom: 32px;
          font-size: 1.5rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .tips-icon {
          font-size: 1.4rem;
        }

        .tips-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }

        .tip-item {
          background: white;
          padding: 24px;
          border-radius: 16px;
          display: flex;
          gap: 16px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }

        .tip-number {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          flex-shrink: 0;
        }

        .tip-content h4 {
          color: #374151;
          margin-bottom: 8px;
          font-size: 1rem;
          font-weight: 600;
        }

        .tip-content p {
          color: #6b7280;
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .faq-section {
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
          border-radius: 24px 24px 0 0;
          padding: 60px 0;
          position: relative;
          overflow: hidden;
        }

        .faq-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 6px;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        }

        .faq-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .faq-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          padding: 12px 24px;
          border-radius: 50px;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 24px;
        }

        .faq-icon {
          font-size: 1rem;
        }

        .faq-section h2 {
          color: #1a202c;
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          margin-bottom: 16px;
          font-weight: 800;
        }

        .faq-intro {
          font-size: 1.1rem;
          color: #4a5568;
          line-height: 1.6;
          max-width: 600px;
          margin: 0 auto;
        }

        .faq-grid {
          display: grid;
          gap: 24px;
          max-width: 800px;
          margin: 0 auto;
        }

        .faq-item {
          background: white;
          border: 2px solid #e2e8f0;
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }

        .faq-item:hover {
          border-color: #10b981;
          transform: translateY(-2px);
          box-shadow: 0 12px 25px rgba(0,0,0,0.1);
        }

        .faq-question {
          color: #1a202c;
          font-size: 1.1rem;
          font-weight: 700;
          margin: 0;
          padding: 24px 28px;
          background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          align-items: flex-start;
          gap: 12px;
          line-height: 1.4;
        }

        .faq-question::before {
          content: 'Q';
          width: 28px;
          height: 28px;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 0.9rem;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .faq-answer {
          color: #4a5568;
          line-height: 1.7;
          font-size: 1rem;
          padding: 24px 28px;
          background: white;
          position: relative;
        }

        .faq-answer::before {
          content: 'A';
          position: absolute;
          left: 28px;
          top: 24px;
          width: 24px;
          height: 24px;
          background: #667eea;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.85rem;
        }

        .faq-answer p {
          margin-left: 36px;
          margin: 0;
        }

        /* Mobile Responsiveness */
        @media (max-width: 1024px) {
          .calculator-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .debt-list-card {
            order: -1;
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            padding: 40px 0;
          }

          .benefits-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .settings-row,
          .form-row {
            grid-template-columns: 1fr;
          }

          .results-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .countdown {
            gap: 24px;
          }

          .tips-grid {
            grid-template-columns: 1fr;
          }

          .debt-details {
            grid-template-columns: 1fr;
            gap: 8px;
          }
        }

        @media (max-width: 480px) {
          .benefits-grid,
          .results-grid {
            grid-template-columns: 1fr;
          }

          .timeline-item {
            flex-direction: column;
            gap: 12px;
          }
        }
      `}</style>
    </>
  );
};

export default UniversalDebtPayoff;