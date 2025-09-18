// src/pages/calculators/budget/BudgetCalculator.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../../components/SEO/SEOHead';

const BudgetCalculator = () => {
  const [income, setIncome] = useState({
    salary: 5000,
    bonuses: 0,
    sideIncome: 0,
    other: 0
  });

  const [expenses, setExpenses] = useState({
    housing: 1400,
    utilities: 200,
    groceries: 600,
    transportation: 400,
    insurance: 300,
    debt: 500,
    savings: 500,
    entertainment: 300,
    dining: 250,
    personal: 200,
    miscellaneous: 150
  });

  const [results, setResults] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    leftOver: 0,
    isBalanced: false
  });

  const [currency, setCurrency] = useState('USD');

  useEffect(() => {
    calculateBudget();
  }, [income, expenses]);

  const calculateBudget = () => {
    const totalIncome = Object.values(income).reduce((sum, value) => sum + value, 0);
    const totalExpenses = Object.values(expenses).reduce((sum, value) => sum + value, 0);
    const leftOver = totalIncome - totalExpenses;
    const isBalanced = Math.abs(leftOver) < 10; // Within $10 is considered balanced

    setResults({
      totalIncome,
      totalExpenses,
      leftOver,
      isBalanced
    });
  };

  const handleIncomeChange = (field, value) => {
    setIncome(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const handleExpenseChange = (field, value) => {
    setExpenses(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const formatCurrency = (amount) => {
    const currencyMap = {
      USD: { symbol: '$', locale: 'en-US' },
      EUR: { symbol: '€', locale: 'de-DE' },
      GBP: { symbol: '£', locale: 'en-GB' },
      CAD: { symbol: 'C$', locale: 'en-CA' },
      AUD: { symbol: 'A$', locale: 'en-AU' },
      INR: { symbol: '₹', locale: 'en-IN' }
    };

    const currencyInfo = currencyMap[currency] || currencyMap.USD;
    
    return new Intl.NumberFormat(currencyInfo.locale, {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getExpensePercentage = (amount) => {
    return results.totalIncome > 0 ? ((amount / results.totalIncome) * 100).toFixed(1) : 0;
  };

  const expenseCategories = [
    { key: 'housing', label: 'Housing (Rent/Mortgage)', recommended: 25, icon: '🏠' },
    { key: 'utilities', label: 'Utilities & Internet', recommended: 8, icon: '💡' },
    { key: 'groceries', label: 'Groceries', recommended: 12, icon: '🛒' },
    { key: 'transportation', label: 'Transportation', recommended: 10, icon: '🚗' },
    { key: 'insurance', label: 'Insurance (Health/Auto/Life)', recommended: 8, icon: '🛡️' },
    { key: 'debt', label: 'Debt Payments', recommended: 10, icon: '💳' },
    { key: 'savings', label: 'Savings & Investments', recommended: 15, icon: '💰' },
    { key: 'entertainment', label: 'Entertainment & Hobbies', recommended: 5, icon: '🎬' },
    { key: 'dining', label: 'Dining Out', recommended: 5, icon: '🍽️' },
    { key: 'personal', label: 'Personal Care & Clothing', recommended: 4, icon: '👕' },
    { key: 'miscellaneous', label: 'Miscellaneous', recommended: 3, icon: '📝' }
  ];

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Budget Calculator', url: '/budget-calculators/budget-calculator' }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Zero-Based Budget Calculator",
    "description": "Professional zero-based budget calculator using Dave Ramsey's proven budgeting method with income tracking and expense categorization",
    "url": "/budget-calculators/budget-calculator",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const seoData = {
    title: "Budget Calculator - Free Zero-Based Budget Planner | Dave Ramsey Method",
    description: "Free professional budget calculator using Dave Ramsey's zero-based budgeting method. Track income, categorize expenses, and achieve perfect budget balance. Supports multiple currencies.",
    keywords: "budget calculator, zero based budget, Dave Ramsey budget, monthly budget planner, budget tracker, income expense calculator, financial planning tool",
    canonicalUrl: "/budget-calculators/budget-calculator",
    breadcrumbs: breadcrumbs,
    structuredData: structuredData
  };

  return (
    <>
      <SEOHead {...seoData} />
      
      <div className="budget-calculator-page">
        <div className="container">
          {/* Breadcrumbs Navigation */}
          <nav className="breadcrumb-nav">
            <ol className="breadcrumb">
              <li>
                <Link to="/">
                  <span className="home-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9,22 9,12 15,12 15,22"></polyline>
                    </svg>
                  </span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/budget-calculators">Budget Calculators</Link>
              </li>
              <li className="active">Budget Calculator</li>
            </ol>
          </nav>

          {/* Page Header */}
          <div className="page-header">
            <div className="header-badge">
              <span className="header-icon">📋</span>
              Zero-Based Budgeting
            </div>
            <h1>Budget Calculator</h1>
            <p className="header-subtitle">Create Your Zero-Based Budget Using Dave Ramsey's Proven Method</p>
            <p className="header-description">
              Professional budget calculator that assigns every dollar a purpose. Track income, categorize expenses, and achieve perfect budget balance where Income - Expenses = Zero.
            </p>
            
            {/* Currency Selector */}
            <div className="currency-selector">
              <label>Currency:</label>
              <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="currency-select">
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="CAD">CAD (C$)</option>
                <option value="AUD">AUD (A$)</option>
                <option value="INR">INR (₹)</option>
              </select>
            </div>
          </div>

          <div className="calculator-layout">
            {/* Income Section */}
            <div className="calculator-inputs">
              <div className="input-card income-card">
                <h3>Monthly Income Sources</h3>
                
                <div className="input-group">
                  <label>Primary Salary (After Tax)</label>
                  <div className="input-wrapper">
                    <span className="currency">{formatCurrency(0).charAt(0)}</span>
                    <input
                      type="number"
                      value={income.salary}
                      onChange={(e) => handleIncomeChange('salary', e.target.value)}
                      placeholder="Enter salary"
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>Bonuses & Commission</label>
                  <div className="input-wrapper">
                    <span className="currency">{formatCurrency(0).charAt(0)}</span>
                    <input
                      type="number"
                      value={income.bonuses}
                      onChange={(e) => handleIncomeChange('bonuses', e.target.value)}
                      placeholder="Monthly average"
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>Side Income & Freelancing</label>
                  <div className="input-wrapper">
                    <span className="currency">{formatCurrency(0).charAt(0)}</span>
                    <input
                      type="number"
                      value={income.sideIncome}
                      onChange={(e) => handleIncomeChange('sideIncome', e.target.value)}
                      placeholder="Additional income"
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>Other Income Sources</label>
                  <div className="input-wrapper">
                    <span className="currency">{formatCurrency(0).charAt(0)}</span>
                    <input
                      type="number"
                      value={income.other}
                      onChange={(e) => handleIncomeChange('other', e.target.value)}
                      placeholder="Dividends, rental, etc."
                    />
                  </div>
                </div>

                <div className="income-total">
                  <div className="total-label">Total Monthly Income</div>
                  <div className="total-value">{formatCurrency(results.totalIncome)}</div>
                </div>
              </div>

              {/* Expenses Section */}
              <div className="input-card expenses-card">
                <h3>Monthly Expenses</h3>
                <p className="expenses-intro">Assign every dollar to a category. Recommended percentages are guidelines - adjust based on your priorities.</p>
                
                {expenseCategories.map((category) => (
                  <div key={category.key} className="expense-group">
                    <div className="expense-header">
                      <label>
                        <span className="category-icon">{category.icon}</span>
                        {category.label}
                      </label>
                      <div className="percentage-info">
                        <span className={`actual-percentage ${getExpensePercentage(expenses[category.key]) > category.recommended + 5 ? 'high' : ''}`}>
                          {getExpensePercentage(expenses[category.key])}%
                        </span>
                        <span className="recommended-percentage">
                          (Rec: {category.recommended}%)
                        </span>
                      </div>
                    </div>
                    <div className="input-wrapper">
                      <span className="currency">{formatCurrency(0).charAt(0)}</span>
                      <input
                        type="number"
                        value={expenses[category.key]}
                        onChange={(e) => handleExpenseChange(category.key, e.target.value)}
                        placeholder="0"
                      />
                    </div>
                  </div>
                ))}

                <div className="expenses-total">
                  <div className="total-label">Total Monthly Expenses</div>
                  <div className="total-value">{formatCurrency(results.totalExpenses)}</div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="calculator-results">
              <div className="results-card">
                <h3>Budget Summary</h3>
                
                <div className="budget-status">
                  <div className={`status-indicator ${results.isBalanced ? 'balanced' : results.leftOver > 0 ? 'surplus' : 'deficit'}`}>
                    {results.isBalanced ? '✅ Budget Balanced' : 
                     results.leftOver > 0 ? '💰 Budget Surplus' : 
                     '⚠️ Budget Deficit'}
                  </div>
                  <div className="status-amount">
                    {results.leftOver === 0 ? 'Perfect Balance!' : 
                     formatCurrency(Math.abs(results.leftOver))}
                  </div>
                </div>

                <div className="budget-breakdown">
                  <div className="breakdown-item">
                    <div className="breakdown-label">Total Income</div>
                    <div className="breakdown-value income">{formatCurrency(results.totalIncome)}</div>
                  </div>
                  <div className="breakdown-item">
                    <div className="breakdown-label">Total Expenses</div>
                    <div className="breakdown-value expenses">-{formatCurrency(results.totalExpenses)}</div>
                  </div>
                  <div className="breakdown-item total">
                    <div className="breakdown-label">Left Over</div>
                    <div className={`breakdown-value ${results.leftOver >= 0 ? 'positive' : 'negative'}`}>
                      {results.leftOver >= 0 ? '+' : ''}{formatCurrency(results.leftOver)}
                    </div>
                  </div>
                </div>

                {/* Budget Advice */}
                <div className="budget-advice">
                  <h4>Budget Recommendations</h4>
                  {results.leftOver > 0 && (
                    <div className="advice-item surplus">
                      <div className="advice-icon">💰</div>
                      <div className="advice-content">
                        <h5>You have a surplus!</h5>
                        <p>Assign this {formatCurrency(results.leftOver)} to debt payoff, emergency fund, or additional savings goals.</p>
                      </div>
                    </div>
                  )}
                  
                  {results.leftOver < -10 && (
                    <div className="advice-item deficit">
                      <div className="advice-icon">⚠️</div>
                      <div className="advice-content">
                        <h5>Budget deficit detected</h5>
                        <p>You need to reduce expenses by {formatCurrency(Math.abs(results.leftOver))} or increase income to balance your budget.</p>
                      </div>
                    </div>
                  )}

                  {results.isBalanced && (
                    <div className="advice-item balanced">
                      <div className="advice-icon">✅</div>
                      <div className="advice-content">
                        <h5>Perfect zero-based budget!</h5>
                        <p>Every dollar has been assigned a purpose. Review monthly and adjust as needed.</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Category Analysis */}
                <div className="category-analysis">
                  <h4>Category Analysis</h4>
                  <div className="analysis-grid">
                    {expenseCategories.map((category) => {
                      const percentage = getExpensePercentage(expenses[category.key]);
                      const isHigh = percentage > category.recommended + 5;
                      const isLow = percentage < category.recommended - 5 && percentage > 0;
                      
                      return (
                        <div key={category.key} className={`analysis-item ${isHigh ? 'high' : isLow ? 'low' : ''}`}>
                          <div className="analysis-category">
                            <span className="analysis-icon">{category.icon}</span>
                            <span className="analysis-name">{category.label.split('(')[0].trim()}</span>
                          </div>
                          <div className="analysis-percentage">{percentage}%</div>
                          <div className="analysis-status">
                            {isHigh ? 'Above recommended' : isLow ? 'Below recommended' : 'On track'}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Tips */}
          <div className="tips-section">
            <h3>Zero-Based Budgeting Tips</h3>
            <div className="tips-grid">
              <div className="tip-card">
                <div className="tip-icon">🎯</div>
                <h4>Every Dollar Has A Job</h4>
                <p>Income minus expenses should equal zero. If you have money left over, assign it to debt payoff, savings, or specific goals.</p>
              </div>
              
              <div className="tip-card">
                <div className="tip-icon">📝</div>
                <h4>Track Before You Budget</h4>
                <p>Spend one month tracking expenses to understand where your money actually goes before creating your first budget.</p>
              </div>
              
              <div className="tip-card">
                <div className="tip-icon">🔄</div>
                <h4>Review Monthly</h4>
                <p>Schedule a monthly budget meeting with yourself (or spouse) to review, adjust categories, and plan for upcoming changes.</p>
              </div>
              
              <div className="tip-card">
                <div className="tip-icon">💡</div>
                <h4>Use Sinking Funds</h4>
                <p>Set aside money monthly for irregular expenses like car maintenance, gifts, and annual insurance payments.</p>
              </div>
              
              <div className="tip-card">
                <div className="tip-icon">🛡️</div>
                <h4>Emergency Fund First</h4>
                <p>Build your $1,000 starter emergency fund before aggressive debt payoff to avoid creating new debt during emergencies.</p>
              </div>
              
              <div className="tip-card">
                <div className="tip-icon">🎉</div>
                <h4>Budget for Fun</h4>
                <p>Include entertainment and personal spending money in your budget. Overly restrictive budgets often fail.</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="faq-section">
            <h3>Frequently Asked Questions About Zero-Based Budgeting</h3>
            <p className="faq-intro">
              Get answers to the most commonly asked questions about creating and maintaining a successful budget.
            </p>
            
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
                  <span>What is zero-based budgeting and how does it work?</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <p>Zero-based budgeting means that your income minus your expenses equals zero. Every dollar you earn is assigned to a specific category before you spend it. This doesn't mean you spend every dollar - you're "spending" money into savings, investments, and debt payments too.</p>
                  <p><strong>The formula:</strong> Income - Expenses = Zero</p>
                  <p><strong>Example:</strong> If you earn $5,000/month, you assign all $5,000 to categories like rent ($1,200), groceries ($500), savings ($800), debt payment ($600), etc. If there's money left over, assign it to an additional category until you reach zero.</p>
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
                  <span>Should I use gross income or net income for budgeting?</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <p><strong>Always use net income (take-home pay) for budgeting.</strong> This is the actual money you receive and can spend or save.</p>
                  <p><strong>Why net income works better:</strong></p>
                  <ul>
                    <li>It's the real money available to you</li>
                    <li>Taxes and deductions are already removed</li>
                    <li>Creates realistic and achievable budgets</li>
                    <li>Prevents overspending based on gross income</li>
                  </ul>
                  <p>If your gross income is $6,000 but your take-home is $4,500 after taxes and deductions, budget with the $4,500.</p>
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
                  <span>What are the recommended budget percentages for each category?</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <p>Here are the recommended percentage ranges for a balanced budget:</p>
                  <ul>
                    <li><strong>Housing:</strong> 25% (rent/mortgage, property tax, HOA)</li>
                    <li><strong>Savings & Investments:</strong> 15% (emergency fund, retirement, goals)</li>
                    <li><strong>Food:</strong> 12% (groceries only, not dining out)</li>
                    <li><strong>Debt Payments:</strong> 10% (all non-mortgage debt)</li>
                    <li><strong>Transportation:</strong> 10% (car payment, gas, insurance, maintenance)</li>
                    <li><strong>Insurance:</strong> 8% (health, life, disability - not auto)</li>
                    <li><strong>Utilities:</strong> 8% (electric, water, internet, phone)</li>
                    <li><strong>Entertainment & Dining Out:</strong> 10% combined</li>
                    <li><strong>Personal Care & Miscellaneous:</strong> 7% combined</li>
                  </ul>
                  <p><strong>Remember:</strong> These are guidelines. Adjust based on your life stage, priorities, and goals.</p>
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
                  <span>How do I handle irregular income with zero-based budgeting?</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <p>Irregular income requires a modified approach to zero-based budgeting:</p>
                  <p><strong>Method 1 - Conservative Approach:</strong></p>
                  <ul>
                    <li>Use your lowest monthly income from the past year</li>
                    <li>Create your budget based on this conservative amount</li>
                    <li>When you earn more, assign the extra to savings and debt payoff</li>
                  </ul>
                  <p><strong>Method 2 - Priority-Based Budgeting:</strong></p>
                  <ul>
                    <li>List your expenses in order of priority (Four Walls first: food, shelter, utilities, transportation)</li>
                    <li>Assign money to categories based on actual income each month</li>
                    <li>Cover necessities first, then work down your priority list</li>
                  </ul>
                  <p><strong>Key strategies:</strong> Build a larger emergency fund (6+ months), smooth out income with sinking funds, and track your annual average income.</p>
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
                  <span>What should I do if I consistently go over budget in certain categories?</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <p>Consistently overspending in categories indicates your budget needs adjustment:</p>
                  <p><strong>Step 1: Analyze the overspending</strong></p>
                  <ul>
                    <li>Track exactly where the money is going</li>
                    <li>Determine if it's needs vs. wants</li>
                    <li>Look for patterns (emotional spending, convenience, etc.)</li>
                  </ul>
                  <p><strong>Step 2: Adjust your budget</strong></p>
                  <ul>
                    <li>Increase the problematic category if it's realistic</li>
                    <li>Decrease other categories to maintain balance</li>
                    <li>Challenge yourself to find ways to reduce expenses</li>
                  </ul>
                  <p><strong>Step 3: Implementation strategies</strong></p>
                  <ul>
                    <li>Use cash envelopes for problem categories</li>
                    <li>Remove temptation (unsubscribe, avoid stores)</li>
                    <li>Find accountability partners</li>
                    <li>Identify the root cause of overspending</li>
                  </ul>
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
                  <span>How long does it take to see results from budgeting?</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <p>Budget results timeline varies, but here's what to expect:</p>
                  <p><strong>Month 1:</strong> Awareness shock - you'll discover where money actually goes and likely overspend in some categories</p>
                  <p><strong>Month 2-3:</strong> Adjustment period - fine-tuning amounts, developing new habits, and getting comfortable with the process</p>
                  <p><strong>Month 4-6:</strong> Rhythm development - budgeting becomes more natural and you'll see improved financial control</p>
                  <p><strong>Month 6-12:</strong> Significant progress - emergency fund growth, debt reduction, and clear advancement toward financial goals</p>
                  <p><strong>Financial improvements you'll notice:</strong></p>
                  <ul>
                    <li>Reduced financial stress and money-related arguments</li>
                    <li>More money available for savings and debt payoff</li>
                    <li>Better control over impulse spending</li>
                    <li>Clearer picture of your financial priorities</li>
                    <li>Increased confidence in financial decisions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .budget-calculator-page {
            min-height: 100vh;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            padding: 20px 0;
          }

          .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 20px;
          }

          /* Breadcrumb Navigation */
          .breadcrumb-nav {
            margin-bottom: 30px;
          }

          .breadcrumb {
            display: flex;
            list-style: none;
            gap: 8px;
            margin: 0;
            padding: 0;
            color: #64748b;
            font-size: 0.9rem;
          }

          .breadcrumb li:not(:last-child)::after {
            content: '/';
            margin-left: 8px;
            color: #94a3b8;
          }

          .breadcrumb a {
            color: #64748b;
            text-decoration: none;
            transition: color 0.2s;
            display: flex;
            align-items: center;
            gap: 4px;
          }

          .breadcrumb a:hover {
            color: #f59e0b;
          }

          .breadcrumb .active {
            color: #1e293b;
            font-weight: 600;
          }

          .home-icon {
            display: flex;
            align-items: center;
          }

          /* Page Header */
          .page-header {
            text-align: center;
            margin-bottom: 50px;
            background: white;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          }

          .header-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: linear-gradient(135deg, #f59e0b, #d97706);
            color: white;
            padding: 10px 20px;
            border-radius: 50px;
            font-size: 0.9rem;
            font-weight: 600;
            margin-bottom: 20px;
          }

          .header-icon {
            font-size: 1.1rem;
          }

          .page-header h1 {
            font-size: 2.8rem;
            color: #1e293b;
            margin-bottom: 12px;
            font-weight: 800;
          }

          .header-subtitle {
            font-size: 1.4rem;
            color: #f59e0b;
            margin-bottom: 16px;
            font-weight: 600;
          }

          .header-description {
            font-size: 1.1rem;
            color: #64748b;
            max-width: 800px;
            margin: 0 auto 24px;
            line-height: 1.6;
          }

          .currency-selector {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            margin-top: 20px;
          }

          .currency-selector label {
            font-weight: 600;
            color: #64748b;
          }

          .currency-select {
            padding: 8px 16px;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            font-weight: 600;
            background: white;
            color: #1e293b;
          }

          .calculator-layout {
            display: grid;
            grid-template-columns: 1.2fr 0.8fr;
            gap: 40px;
            margin-bottom: 60px;
          }

          .input-card, .results-card {
            background: white;
            border-radius: 20px;
            padding: 32px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            border: 1px solid #e2e8f0;
            height: fit-content;
          }

          .income-card {
            border-left: 4px solid #10b981;
          }

          .expenses-card {
            border-left: 4px solid #dc2626;
            margin-top: 24px;
          }

          .input-card h3, .results-card h3 {
            color: #1e293b;
            font-size: 1.6rem;
            margin-bottom: 28px;
            font-weight: 700;
          }

          .expenses-intro {
            color: #64748b;
            margin-bottom: 24px;
            font-size: 0.95rem;
            line-height: 1.6;
          }

          .input-group, .expense-group {
            margin-bottom: 24px;
          }

          .input-group label {
            display: block;
            color: #374151;
            font-weight: 600;
            margin-bottom: 10px;
            font-size: 1rem;
          }

          .expense-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
          }

          .expense-header label {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #374151;
            font-weight: 600;
            font-size: 0.95rem;
            margin: 0;
          }

          .category-icon {
            font-size: 1.1rem;
          }

          .percentage-info {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 0.8rem;
          }

          .actual-percentage {
            font-weight: 700;
            color: #059669;
            padding: 2px 6px;
            border-radius: 4px;
            background: #ecfdf5;
          }

          .actual-percentage.high {
            color: #dc2626;
            background: #fef2f2;
          }

          .recommended-percentage {
            color: #64748b;
          }

          .input-wrapper {
            position: relative;
            display: flex;
            align-items: center;
          }

          .input-wrapper input {
            width: 100%;
            padding: 16px;
            padding-left: 44px;
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            font-size: 1.1rem;
            font-weight: 600;
            color: #1e293b;
            background: #f8fafc;
            transition: all 0.2s ease;
          }

          .input-wrapper input:focus {
            outline: none;
            border-color: #f59e0b;
            background: white;
            box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
          }

          .currency {
            position: absolute;
            left: 16px;
            color: #64748b;
            font-weight: 600;
            font-size: 1rem;
          }

          .income-total, .expenses-total {
            margin-top: 28px;
            padding: 20px;
            background: linear-gradient(135deg, #f8fafc, #f1f5f9);
            border-radius: 12px;
            border: 2px solid #e2e8f0;
            text-align: center;
          }

          .income-total {
            border-color: #10b981;
            background: linear-gradient(135deg, #ecfdf5, #d1fae5);
          }

          .expenses-total {
            border-color: #dc2626;
            background: linear-gradient(135deg, #fef2f2, #fecaca);
          }

          .total-label {
            font-size: 1.1rem;
            font-weight: 600;
            color: #64748b;
            margin-bottom: 8px;
          }

          .total-value {
            font-size: 2rem;
            font-weight: 800;
            color: #1e293b;
          }

          .budget-status {
            text-align: center;
            margin-bottom: 32px;
            padding: 24px;
            border-radius: 16px;
          }

          .status-indicator {
            font-size: 1.2rem;
            font-weight: 700;
            margin-bottom: 8px;
          }

          .status-indicator.balanced {
            color: #059669;
            background: #ecfdf5;
            padding: 12px 20px;
            border-radius: 50px;
            border: 2px solid #10b981;
          }

          .status-indicator.surplus {
            color: #0369a1;
            background: #f0f9ff;
            padding: 12px 20px;
            border-radius: 50px;
            border: 2px solid #0ea5e9;
          }

          .status-indicator.deficit {
            color: #dc2626;
            background: #fef2f2;
            padding: 12px 20px;
            border-radius: 50px;
            border: 2px solid #ef4444;
          }

          .status-amount {
            font-size: 1.6rem;
            font-weight: 800;
            color: #1e293b;
            margin-top: 8px;
          }

          .budget-breakdown {
            margin-bottom: 32px;
            padding: 24px;
            background: #f8fafc;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
          }

          .breakdown-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;
            border-bottom: 1px solid #e2e8f0;
          }

          .breakdown-item:last-child {
            border-bottom: none;
          }

          .breakdown-item.total {
            border-top: 2px solid #d1d5db;
            margin-top: 8px;
            padding-top: 16px;
            font-weight: 700;
          }

          .breakdown-label {
            font-weight: 600;
            color: #64748b;
          }

          .breakdown-value {
            font-weight: 700;
            font-size: 1.1rem;
          }

          .breakdown-value.income {
            color: #059669;
          }

          .breakdown-value.expenses {
            color: #dc2626;
          }

          .breakdown-value.positive {
            color: #059669;
          }

          .breakdown-value.negative {
            color: #dc2626;
          }

          .budget-advice {
            margin-bottom: 32px;
          }

          .budget-advice h4 {
            color: #1e293b;
            margin-bottom: 20px;
            font-weight: 700;
          }

          .advice-item {
            display: flex;
            gap: 16px;
            padding: 20px;
            border-radius: 12px;
            margin-bottom: 16px;
          }

          .advice-item.surplus {
            background: linear-gradient(135deg, #ecfdf5, #d1fae5);
            border: 2px solid #10b981;
          }

          .advice-item.deficit {
            background: linear-gradient(135deg, #fef2f2, #fecaca);
            border: 2px solid #ef4444;
          }

          .advice-item.balanced {
            background: linear-gradient(135deg, #f0f9ff, #dbeafe);
            border: 2px solid #3b82f6;
          }

          .advice-icon {
            font-size: 1.5rem;
            flex-shrink: 0;
          }

          .advice-content h5 {
            margin: 0 0 8px 0;
            font-weight: 700;
            color: #1e293b;
          }

          .advice-content p {
            margin: 0;
            color: #64748b;
            line-height: 1.6;
          }

          .category-analysis h4 {
            color: #1e293b;
            margin-bottom: 20px;
            font-weight: 700;
          }

          .analysis-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 12px;
          }

          .analysis-item {
            padding: 12px;
            background: #f8fafc;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
            text-align: center;
            font-size: 0.85rem;
          }

          .analysis-item.high {
            background: #fef2f2;
            border-color: #fca5a5;
            color: #dc2626;
          }

          .analysis-item.low {
            background: #fffbeb;
            border-color: #fde68a;
            color: #d97706;
          }

          .analysis-category {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 4px;
            margin-bottom: 4px;
          }

          .analysis-icon {
            font-size: 0.9rem;
          }

          .analysis-name {
            font-weight: 600;
            font-size: 0.8rem;
          }

          .analysis-percentage {
            font-weight: 700;
            font-size: 0.9rem;
            margin-bottom: 2px;
          }

          .analysis-status {
            font-size: 0.75rem;
            opacity: 0.8;
          }

          .tips-section, .faq-section {
            background: white;
            border-radius: 20px;
            padding: 36px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            border: 1px solid #e2e8f0;
            margin-bottom: 40px;
          }

          .tips-section h3, .faq-section h3 {
            color: #1e293b;
            margin-bottom: 20px;
            font-weight: 700;
            font-size: 1.8rem;
          }

          .tips-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 28px;
          }

          .tip-card {
            padding: 28px;
            background: linear-gradient(135deg, #f8fafc, #f1f5f9);
            border-radius: 16px;
            border: 1px solid #e2e8f0;
            text-align: center;
            transition: transform 0.2s;
          }

          .tip-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          }

          .tip-icon {
            font-size: 2.2rem;
            margin-bottom: 18px;
          }

          .tip-card h4 {
            color: #1e293b;
            font-size: 1.2rem;
            margin-bottom: 14px;
            font-weight: 700;
          }

          .tip-card p {
            color: #64748b;
            line-height: 1.6;
            margin: 0;
          }

          /* FAQ Section */
          .faq-intro {
            color: #64748b;
            font-size: 1.1rem;
            margin-bottom: 32px;
            line-height: 1.6;
          }

          .faq-container {
            max-width: 900px;
            margin: 0 auto;
          }

          .faq-item {
            background: #f8fafc;
            border-radius: 12px;
            margin-bottom: 16px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            border: 1px solid #e2e8f0;
            overflow: hidden;
            transition: all 0.2s ease;
          }

          .faq-item:hover {
            border-color: #f59e0b;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          }

          .faq-question {
            width: 100%;
            padding: 20px 24px;
            background: none;
            border: none;
            text-align: left;
            font-size: 1.1rem;
            font-weight: 600;
            color: #1e293b;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            line-height: 1.4;
            transition: all 0.2s ease;
          }

          .faq-question:hover {
            background: #f1f5f9;
          }

          .faq-question.active {
            background: linear-gradient(135deg, #fef3c7, #fde68a);
            color: #92400e;
          }

          .faq-question.active .faq-icon {
            transform: rotate(45deg);
            color: #f59e0b;
          }

          .faq-icon {
            font-size: 1.4rem;
            font-weight: 300;
            color: #9ca3af;
            transition: all 0.2s ease;
            flex-shrink: 0;
            margin-left: 16px;
          }

          .faq-answer {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
            background: white;
          }

          .faq-answer > * {
            padding: 0 24px 24px;
            margin: 0;
          }

          .faq-answer p {
            color: #374151;
            line-height: 1.7;
            margin-bottom: 16px;
            font-size: 1rem;
          }

          .faq-answer ul {
            margin: 16px 0;
            padding-left: 20px;
          }

          .faq-answer li {
            color: #4b5563;
            margin-bottom: 8px;
            line-height: 1.6;
          }

          .faq-answer strong {
            color: #1e293b;
            font-weight: 700;
          }

          /* Mobile Responsiveness */
          @media (max-width: 1200px) {
            .tips-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }

          @media (max-width: 968px) {
            .calculator-layout {
              grid-template-columns: 1fr;
              gap: 30px;
            }

            .tips-grid {
              grid-template-columns: 1fr;
            }

            .analysis-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }

          @media (max-width: 768px) {
            .page-header {
              padding: 30px 20px;
            }

            .page-header h1 {
              font-size: 2.2rem;
            }

            .header-subtitle {
              font-size: 1.2rem;
            }

            .input-card, .results-card, .tips-section, .faq-section {
              padding: 24px;
            }

            .currency-selector {
              flex-direction: column;
              gap: 8px;
            }

            .analysis-grid {
              grid-template-columns: 1fr;
            }

            .faq-question {
              padding: 16px 20px;
              font-size: 1rem;
            }

            .faq-answer > * {
              padding: 0 20px 20px;
            }
          }

          @media (max-width: 480px) {
            .page-header h1 {
              font-size: 1.8rem;
            }

            .input-card, .results-card {
              padding: 20px;
            }

            .expense-header {
              flex-direction: column;
              align-items: flex-start;
              gap: 8px;
            }

            .breadcrumb {
              font-size: 0.8rem;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default BudgetCalculator;