// src/pages/calculators/budget/SavingsGoalCalculator.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../../components/SEO/SEOHead';

const SavingsGoalCalculator = () => {
  const [goals, setGoals] = useState([
    {
      id: 1,
      name: 'Emergency Fund',
      targetAmount: 10000,
      currentAmount: 2500,
      monthlyContribution: 500,
      targetDate: '',
      priority: 'high',
      interestRate: 4.5
    },
    {
      id: 2,
      name: 'Vacation',
      targetAmount: 5000,
      currentAmount: 1000,
      monthlyContribution: 300,
      targetDate: '2025-07-01',
      priority: 'medium',
      interestRate: 4.5
    }
  ]);

  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: 0,
    currentAmount: 0,
    monthlyContribution: 0,
    targetDate: '',
    priority: 'medium',
    interestRate: 4.5
  });

  const [results, setResults] = useState({});
  const [currency, setCurrency] = useState('USD');

  useEffect(() => {
    calculateAllGoals();
  }, [goals]);

  const calculateGoal = (goal) => {
    const { targetAmount, currentAmount, monthlyContribution, targetDate, interestRate } = goal;
    const remainingAmount = Math.max(0, targetAmount - currentAmount);
    const monthlyRate = interestRate / (12 * 100);
    
    let timeToGoal = 0;
    let requiredMonthly = 0;
    let projectedAmount = currentAmount;
    let interestEarned = 0;

    // Calculate time to goal with current monthly contribution
    if (monthlyContribution > 0 && remainingAmount > 0) {
      if (monthlyRate > 0) {
        // With compound interest
        const presentValue = currentAmount;
        const futureValue = targetAmount;
        const payment = monthlyContribution;
        
        // Use compound interest formula to find time
        // FV = PV(1+r)^n + PMT[((1+r)^n - 1)/r]
        let months = 0;
        let balance = presentValue;
        
        while (balance < futureValue && months < 600) { // Cap at 50 years
          balance = balance * (1 + monthlyRate) + payment;
          months++;
        }
        
        timeToGoal = months;
        projectedAmount = balance;
        interestEarned = balance - currentAmount - (monthlyContribution * months);
      } else {
        // Without interest
        timeToGoal = Math.ceil(remainingAmount / monthlyContribution);
        projectedAmount = currentAmount + (monthlyContribution * timeToGoal);
        interestEarned = 0;
      }
    }

    // Calculate required monthly contribution for target date
    if (targetDate && remainingAmount > 0) {
      const targetDateObj = new Date(targetDate);
      const currentDate = new Date();
      const monthsUntilTarget = Math.max(1, Math.floor((targetDateObj - currentDate) / (1000 * 60 * 60 * 24 * 30.44)));
      
      if (monthlyRate > 0) {
        // PMT = (FV - PV(1+r)^n) / (((1+r)^n - 1)/r)
        const futureValueFactor = Math.pow(1 + monthlyRate, monthsUntilTarget);
        const annuityFactor = (futureValueFactor - 1) / monthlyRate;
        requiredMonthly = Math.max(0, (targetAmount - currentAmount * futureValueFactor) / annuityFactor);
      } else {
        requiredMonthly = remainingAmount / monthsUntilTarget;
      }
    }

    const completionPercentage = targetAmount > 0 ? (currentAmount / targetAmount) * 100 : 0;
    const isOnTrack = targetDate ? monthlyContribution >= requiredMonthly * 0.95 : true;
    
    return {
      remainingAmount,
      timeToGoal,
      requiredMonthly,
      projectedAmount,
      interestEarned,
      completionPercentage,
      isOnTrack
    };
  };

  const calculateAllGoals = () => {
    const newResults = {};
    goals.forEach(goal => {
      newResults[goal.id] = calculateGoal(goal);
    });
    setResults(newResults);
  };

  const addGoal = () => {
    if (newGoal.name && newGoal.targetAmount > 0) {
      const goal = {
        ...newGoal,
        id: Math.max(...goals.map(g => g.id), 0) + 1,
        targetAmount: parseFloat(newGoal.targetAmount),
        currentAmount: parseFloat(newGoal.currentAmount) || 0,
        monthlyContribution: parseFloat(newGoal.monthlyContribution) || 0,
        interestRate: parseFloat(newGoal.interestRate) || 0
      };
      
      setGoals([...goals, goal]);
      setNewGoal({
        name: '',
        targetAmount: 0,
        currentAmount: 0,
        monthlyContribution: 0,
        targetDate: '',
        priority: 'medium',
        interestRate: 4.5
      });
    }
  };

  const updateGoal = (id, field, value) => {
    setGoals(goals.map(goal => 
      goal.id === id 
        ? { ...goal, [field]: typeof value === 'string' && field !== 'name' && field !== 'targetDate' && field !== 'priority' ? parseFloat(value) || 0 : value }
        : goal
    ));
  };

  const removeGoal = (id) => {
    setGoals(goals.filter(goal => goal.id !== id));
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

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#dc2626';
      case 'medium': return '#f59e0b';
      case 'low': return '#059669';
      default: return '#64748b';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No target date';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDuration = (months) => {
    if (months < 1) return 'Less than 1 month';
    if (months < 12) return `${Math.ceil(months)} month${Math.ceil(months) !== 1 ? 's' : ''}`;
    const years = Math.floor(months / 12);
    const remainingMonths = Math.ceil(months % 12);
    return `${years} year${years !== 1 ? 's' : ''}${remainingMonths > 0 ? ` ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}` : ''}`;
  };

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Savings Goal Calculator', url: '/budget-calculators/savings-goal' }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Savings Goal Calculator",
    "description": "Set and track multiple savings goals with detailed timelines, monthly contribution requirements, and compound interest calculations",
    "url": "/budget-calculators/savings-goal",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const seoData = {
    title: "Savings Goal Calculator - Track Multiple Financial Goals | Free Tool",
    description: "Free savings goal calculator to set and track multiple financial goals. Calculate monthly contributions, timelines, and compound interest growth for emergency funds, vacations, and more.",
    keywords: "savings goal calculator, financial goal tracker, savings planner, goal achievement calculator, multiple savings goals, savings timeline calculator",
    canonicalUrl: "/budget-calculators/savings-goal",
    breadcrumbs: breadcrumbs,
    structuredData: structuredData
  };

  const totalSaved = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const totalTargets = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const totalMonthlyContributions = goals.reduce((sum, goal) => sum + goal.monthlyContribution, 0);
  const overallProgress = totalTargets > 0 ? (totalSaved / totalTargets) * 100 : 0;

  return (
    <>
      <SEOHead {...seoData} />
      
      <div className="savings-goal-page">
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
              <li className="active">Savings Goal Calculator</li>
            </ol>
          </nav>

          {/* Page Header */}
          <div className="page-header">
            <div className="header-badge">
              <span className="header-icon">🎯</span>
              Goal Achievement Tool
            </div>
            <h1>Savings Goal Calculator</h1>
            <p className="header-subtitle">Set, Track & Achieve Multiple Financial Goals</p>
            <p className="header-description">
              Create and manage multiple savings goals with detailed timelines, compound interest calculations, and progress tracking. Perfect for emergency funds, vacations, home down payments, and more.
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

          {/* Overall Progress Summary */}
          <div className="overall-summary">
            <h2>Your Savings Overview</h2>
            <div className="summary-grid">
              <div className="summary-card">
                <div className="summary-icon">💰</div>
                <div className="summary-content">
                  <div className="summary-label">Total Saved</div>
                  <div className="summary-value">{formatCurrency(totalSaved)}</div>
                </div>
              </div>
              <div className="summary-card">
                <div className="summary-icon">🎯</div>
                <div className="summary-content">
                  <div className="summary-label">Total Goals</div>
                  <div className="summary-value">{formatCurrency(totalTargets)}</div>
                </div>
              </div>
              <div className="summary-card">
                <div className="summary-icon">📈</div>
                <div className="summary-content">
                  <div className="summary-label">Monthly Savings</div>
                  <div className="summary-value">{formatCurrency(totalMonthlyContributions)}</div>
                </div>
              </div>
              <div className="summary-card">
                <div className="summary-icon">✅</div>
                <div className="summary-content">
                  <div className="summary-label">Overall Progress</div>
                  <div className="summary-value">{overallProgress.toFixed(1)}%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Add New Goal */}
          <div className="add-goal-section">
            <h2>Add New Savings Goal</h2>
            <div className="add-goal-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Goal Name</label>
                  <input
                    type="text"
                    value={newGoal.name}
                    onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
                    placeholder="e.g., Emergency Fund, Vacation, Car Down Payment"
                  />
                </div>
                <div className="form-group">
                  <label>Target Amount</label>
                  <div className="input-wrapper">
                    <span className="currency">{formatCurrency(0).charAt(0)}</span>
                    <input
                      type="number"
                      value={newGoal.targetAmount || ''}
                      onChange={(e) => setNewGoal({...newGoal, targetAmount: e.target.value})}
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Current Amount</label>
                  <div className="input-wrapper">
                    <span className="currency">{formatCurrency(0).charAt(0)}</span>
                    <input
                      type="number"
                      value={newGoal.currentAmount || ''}
                      onChange={(e) => setNewGoal({...newGoal, currentAmount: e.target.value})}
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Monthly Contribution</label>
                  <div className="input-wrapper">
                    <span className="currency">{formatCurrency(0).charAt(0)}</span>
                    <input
                      type="number"
                      value={newGoal.monthlyContribution || ''}
                      onChange={(e) => setNewGoal({...newGoal, monthlyContribution: e.target.value})}
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Target Date (Optional)</label>
                  <input
                    type="date"
                    value={newGoal.targetDate}
                    onChange={(e) => setNewGoal({...newGoal, targetDate: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Priority</label>
                  <select
                    value={newGoal.priority}
                    onChange={(e) => setNewGoal({...newGoal, priority: e.target.value})}
                  >
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Annual Interest Rate (%)</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      value={newGoal.interestRate || ''}
                      onChange={(e) => setNewGoal({...newGoal, interestRate: e.target.value})}
                      placeholder="4.5"
                      step="0.1"
                    />
                    <span className="percentage">%</span>
                  </div>
                  <div className="input-help">Typical savings account: 4-5%</div>
                </div>
                <div className="form-group">
                  <button className="add-goal-btn" onClick={addGoal} disabled={!newGoal.name || !newGoal.targetAmount}>
                    <span className="btn-icon">➕</span>
                    Add Goal
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Goals List */}
          <div className="goals-section">
            <h2>Your Savings Goals ({goals.length})</h2>
            {goals.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🎯</div>
                <h3>No savings goals yet</h3>
                <p>Add your first savings goal above to get started on your financial journey!</p>
              </div>
            ) : (
              <div className="goals-grid">
                {goals.map(goal => {
                  const result = results[goal.id] || {};
                  
                  return (
                    <div key={goal.id} className="goal-card">
                      <div className="goal-header">
                        <div className="goal-title-section">
                          <input
                            type="text"
                            value={goal.name}
                            onChange={(e) => updateGoal(goal.id, 'name', e.target.value)}
                            className="goal-name-input"
                          />
                          <div className="goal-priority" style={{backgroundColor: getPriorityColor(goal.priority)}}>
                            {goal.priority} priority
                          </div>
                        </div>
                        <button 
                          className="remove-goal-btn"
                          onClick={() => removeGoal(goal.id)}
                          title="Remove goal"
                        >
                          ✕
                        </button>
                      </div>

                      <div className="goal-progress">
                        <div className="progress-header">
                          <span>Progress: {result.completionPercentage?.toFixed(1)}%</span>
                          <span>{formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}</span>
                        </div>
                        <div className="progress-bar">
                          <div 
                            className="progress-fill"
                            style={{
                              width: `${Math.min(result.completionPercentage || 0, 100)}%`,
                              backgroundColor: getPriorityColor(goal.priority)
                            }}
                          ></div>
                        </div>
                      </div>

                      <div className="goal-inputs">
                        <div className="input-row">
                          <div className="input-group">
                            <label>Target Amount</label>
                            <div className="input-wrapper">
                              <span className="currency">{formatCurrency(0).charAt(0)}</span>
                              <input
                                type="number"
                                value={goal.targetAmount}
                                onChange={(e) => updateGoal(goal.id, 'targetAmount', e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="input-group">
                            <label>Current Amount</label>
                            <div className="input-wrapper">
                              <span className="currency">{formatCurrency(0).charAt(0)}</span>
                              <input
                                type="number"
                                value={goal.currentAmount}
                                onChange={(e) => updateGoal(goal.id, 'currentAmount', e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="input-row">
                          <div className="input-group">
                            <label>Monthly Contribution</label>
                            <div className="input-wrapper">
                              <span className="currency">{formatCurrency(0).charAt(0)}</span>
                              <input
                                type="number"
                                value={goal.monthlyContribution}
                                onChange={(e) => updateGoal(goal.id, 'monthlyContribution', e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="input-group">
                            <label>Interest Rate (%)</label>
                            <div className="input-wrapper">
                              <input
                                type="number"
                                value={goal.interestRate}
                                onChange={(e) => updateGoal(goal.id, 'interestRate', e.target.value)}
                                step="0.1"
                              />
                              <span className="percentage">%</span>
                            </div>
                          </div>
                        </div>

                        <div className="input-row">
                          <div className="input-group">
                            <label>Target Date</label>
                            <input
                              type="date"
                              value={goal.targetDate}
                              onChange={(e) => updateGoal(goal.id, 'targetDate', e.target.value)}
                            />
                          </div>
                          <div className="input-group">
                            <label>Priority</label>
                            <select
                              value={goal.priority}
                              onChange={(e) => updateGoal(goal.id, 'priority', e.target.value)}
                            >
                              <option value="high">High Priority</option>
                              <option value="medium">Medium Priority</option>
                              <option value="low">Low Priority</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="goal-results">
                        <div className="result-grid">
                          <div className="result-item">
                            <div className="result-label">Still Need</div>
                            <div className="result-value">{formatCurrency(result.remainingAmount || 0)}</div>
                          </div>
                          <div className="result-item">
                            <div className="result-label">Time to Goal</div>
                            <div className="result-value">
                              {result.timeToGoal > 0 ? formatDuration(result.timeToGoal) : 'Goal achieved!'}
                            </div>
                          </div>
                          <div className="result-item">
                            <div className="result-label">Interest Earned</div>
                            <div className="result-value interest">{formatCurrency(result.interestEarned || 0)}</div>
                          </div>
                        </div>

                        {goal.targetDate && (
                          <div className="target-date-analysis">
                            <div className="date-info">
                              <span className="date-label">Target: {formatDate(goal.targetDate)}</span>
                              <span className={`status ${result.isOnTrack ? 'on-track' : 'behind'}`}>
                                {result.isOnTrack ? '✅ On Track' : '⚠️ Behind Schedule'}
                              </span>
                            </div>
                            {!result.isOnTrack && result.requiredMonthly > 0 && (
                              <div className="recommendation">
                                Need {formatCurrency(result.requiredMonthly)} monthly to reach target date
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Professional Tips */}
          <div className="tips-section">
            <h3>Savings Goal Success Tips</h3>
            <div className="tips-grid">
              <div className="tip-card">
                <div className="tip-icon">🎯</div>
                <h4>Set SMART Goals</h4>
                <p>Make goals Specific, Measurable, Achievable, Relevant, and Time-bound. "Save $10,000 for emergency fund by December 2025" is better than "save money."</p>
              </div>
              
              <div className="tip-card">
                <div className="tip-icon">🤖</div>
                <h4>Automate Your Savings</h4>
                <p>Set up automatic transfers to dedicated savings accounts for each goal. Treat savings like a non-negotiable bill that must be paid first.</p>
              </div>
              
              <div className="tip-card">
                <div className="tip-icon">📊</div>
                <h4>Prioritize Your Goals</h4>
                <p>Focus on high-priority goals first (emergency fund, debt payoff) before moving to wants (vacation, luxury items). Complete one goal before starting another.</p>
              </div>
              
              <div className="tip-card">
                <div className="tip-icon">📱</div>
                <h4>Use Separate Accounts</h4>
                <p>Keep each goal in a separate high-yield savings account. This prevents you from borrowing between goals and helps track progress clearly.</p>
              </div>
              
              <div className="tip-card">
                <div className="tip-icon">🎉</div>
                <h4>Celebrate Milestones</h4>
                <p>Acknowledge progress at 25%, 50%, and 75% completion. Small celebrations keep you motivated without derailing your progress.</p>
              </div>
              
              <div className="tip-card">
                <div className="tip-icon">🔄</div>
                <h4>Review & Adjust Regularly</h4>
                <p>Review goals monthly and adjust contributions based on income changes, completed goals, or shifting priorities. Stay flexible but committed.</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="faq-section">
            <h3>Frequently Asked Questions About Savings Goals</h3>
            <p className="faq-intro">
              Get answers to common questions about setting, managing, and achieving your financial savings goals.
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
                  <span>How should I prioritize multiple savings goals?</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <p>Follow this priority order for optimal financial health:</p>
                  <p><strong>1. High Priority (Do First):</strong></p>
                  <ul>
                    <li>$1,000 starter emergency fund</li>
                    <li>Employer 401k match (free money)</li>
                    <li>High-interest debt payoff (18%+ APR)</li>
                  </ul>
                  <p><strong>2. Medium Priority (Do Next):</strong></p>
                  <ul>
                    <li>Full emergency fund (3-6 months expenses)</li>
                    <li>Retirement savings (15% of income)</li>
                    <li>House down payment</li>
                  </ul>
                  <p><strong>3. Low Priority (Do Last):</strong></p>
                  <ul>
                    <li>Vacation and luxury purchases</li>
                    <li>Non-essential upgrades</li>
                    <li>Extra investment accounts</li>
                  </ul>
                  <p><strong>Strategy:</strong> Complete one goal at a time for faster progress, or split contributions between 2-3 goals maximum.</p>
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
                  <span>Should I save for goals or pay off debt first?</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <p>The answer depends on the debt interest rate and goal urgency:</p>
                  <p><strong>Pay off debt first if:</strong></p>
                  <ul>
                    <li>Credit card debt (18%+ APR) - No investment beats this guaranteed return</li>
                    <li>Personal loans with high rates (12%+ APR)</li>
                    <li>You have no emergency fund (build $1,000 first, then attack debt)</li>
                  </ul>
                  <p><strong>Save for goals first if:</strong></p>
                  <ul>
                    <li>Low-interest debt (student loans 3-6%, mortgages 6-8%)</li>
                    <li>You have time-sensitive goals (house purchase, wedding)</li>
                    <li>Debt payments are manageable in your budget</li>
                  </ul>
                  <p><strong>Dave Ramsey approach:</strong> $1,000 emergency fund → pay off all non-mortgage debt → save for other goals</p>
                  <p><strong>Balanced approach:</strong> Build emergency fund while making minimum debt payments, then decide based on interest rates.</p>
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
                  <span>What's the best way to save for short-term vs. long-term goals?</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <p>Choose different savings strategies based on your timeline:</p>
                  <p><strong>Short-term goals (1-3 years):</strong></p>
                  <ul>
                    <li><strong>Where:</strong> High-yield savings accounts, CDs, money market accounts</li>
                    <li><strong>Why:</strong> Capital preservation is key - you need the exact amount when the time comes</li>
                    <li><strong>Target return:</strong> 4-5% annual interest</li>
                    <li><strong>Examples:</strong> Emergency fund, vacation, car down payment, wedding</li>
                  </ul>
                  <p><strong>Medium-term goals (3-7 years):</strong></p>
                  <ul>
                    <li><strong>Where:</strong> Conservative investments (60% bonds, 40% stocks) or high-yield savings</li>
                    <li><strong>Why:</strong> Some growth potential with moderate risk</li>
                    <li><strong>Target return:</strong> 5-7% annually</li>
                    <li><strong>Examples:</strong> House down payment, child's college fund</li>
                  </ul>
                  <p><strong>Long-term goals (7+ years):</strong></p>
                  <ul>
                    <li><strong>Where:</strong> Investment accounts (stocks, index funds, 401k, IRA)</li>
                    <li><strong>Why:</strong> Time allows you to ride out market volatility</li>
                    <li><strong>Target return:</strong> 8-12% annually (historical stock market average)</li>
                    <li><strong>Examples:</strong> Retirement, child's college (if far away)</li>
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
                  <span>How much should I save each month for goals?</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <p>A sustainable savings rate depends on your income and expenses:</p>
                  <p><strong>General Guidelines:</strong></p>
                  <ul>
                    <li><strong>Beginner:</strong> Start with 10% of take-home pay</li>
                    <li><strong>Intermediate:</strong> Work up to 20% of take-home pay</li>
                    <li><strong>Advanced:</strong> Save 25%+ if you have aggressive goals</li>
                  </ul>
                  <p><strong>How to allocate savings:</strong></p>
                  <ul>
                    <li><strong>Emergency fund:</strong> $500-1,000 per month until complete</li>
                    <li><strong>Retirement:</strong> 15% of gross income (including employer match)</li>
                    <li><strong>Other goals:</strong> Remaining savings capacity</li>
                  </ul>
                  <p><strong>Example breakdown for $5,000 take-home pay:</strong></p>
                  <ul>
                    <li>Total savings: $1,000 (20%)</li>
                    <li>Emergency fund: $500/month until complete</li>
                    <li>Retirement: $400/month</li>
                    <li>Other goals: $100/month</li>
                  </ul>
                  <p><strong>Remember:</strong> Start small and increase gradually. It's better to save $100 consistently than $500 sporadically.</p>
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
                  <span>What if I'm behind on my savings goals?</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <p>Don't panic - getting behind on savings goals is common and fixable:</p>
                  <p><strong>Step 1: Reassess your goals</strong></p>
                  <ul>
                    <li>Are your goals still realistic and relevant?</li>
                    <li>Has your income or priorities changed?</li>
                    <li>Can you extend target dates without major consequences?</li>
                  </ul>
                  <p><strong>Step 2: Find extra money</strong></p>
                  <ul>
                    <li>Review your budget for unnecessary expenses</li>
                    <li>Sell items you no longer need</li>
                    <li>Pick up extra work or side income</li>
                    <li>Use windfalls (tax refunds, bonuses) for catch-up</li>
                  </ul>
                  <p><strong>Step 3: Adjust your approach</strong></p>
                  <ul>
                    <li>Focus on fewer goals to accelerate progress</li>
                    <li>Increase monthly contributions even by small amounts</li>
                    <li>Consider if the goal amount can be reduced (cheaper vacation, smaller emergency fund temporarily)</li>
                  </ul>
                  <p><strong>Remember:</strong> Progress is better than perfection. Small, consistent steps will get you there eventually.</p>
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
                  <span>Should I have separate accounts for each savings goal?</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <p><strong>Yes, separate accounts are highly recommended</strong> for multiple reasons:</p>
                  <p><strong>Benefits of separate accounts:</strong></p>
                  <ul>
                    <li><strong>Clear progress tracking:</strong> See exactly how much you've saved for each goal</li>
                    <li><strong>Prevents borrowing:</strong> Less tempting to "borrow" from vacation fund for emergency fund</li>
                    <li><strong>Mental accounting:</strong> Each dollar has a specific purpose and destination</li>
                    <li><strong>Motivation:</strong> Watching individual accounts grow is psychologically rewarding</li>
                    <li><strong>Automatic allocation:</strong> Set up automatic transfers to each account</li>
                  </ul>
                  <p><strong>Best account types for goals:</strong></p>
                  <ul>
                    <li><strong>High-yield savings:</strong> Emergency fund, short-term goals (vacation, car)</li>
                    <li><strong>CDs:</strong> Goals with fixed timelines (wedding in 18 months)</li>
                    <li><strong>Money market:</strong> Medium-term goals with some liquidity needs</li>
                  </ul>
                  <p><strong>Account naming strategy:</strong> Use descriptive names like "Emergency Fund," "Vacation 2025," "Car Down Payment" to keep goals top-of-mind.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .savings-goal-page {
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
            color: #2563eb;
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
            background: linear-gradient(135deg, #2563eb, #1d4ed8);
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
            color: #2563eb;
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

          /* Overall Summary */
          .overall-summary {
            background: white;
            border-radius: 20px;
            padding: 32px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            border: 1px solid #e2e8f0;
            margin-bottom: 40px;
          }

          .overall-summary h2 {
            color: #1e293b;
            font-size: 1.8rem;
            margin-bottom: 24px;
            font-weight: 700;
          }

          .summary-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 24px;
          }

          .summary-card {
            display: flex;
            align-items: center;
            gap: 16px;
            padding: 20px;
            background: linear-gradient(135deg, #f8fafc, #f1f5f9);
            border-radius: 16px;
            border: 1px solid #e2e8f0;
          }

          .summary-icon {
            font-size: 2rem;
            width: 48px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: white;
            border-radius: 12px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .summary-content {
            flex: 1;
          }

          .summary-label {
            color: #64748b;
            font-size: 0.9rem;
            font-weight: 600;
            margin-bottom: 4px;
          }

          .summary-value {
            color: #1e293b;
            font-size: 1.5rem;
            font-weight: 800;
          }

          /* Add Goal Section */
          .add-goal-section, .goals-section {
            background: white;
            border-radius: 20px;
            padding: 32px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            border: 1px solid #e2e8f0;
            margin-bottom: 40px;
          }

          .add-goal-section h2, .goals-section h2 {
            color: #1e293b;
            font-size: 1.8rem;
            margin-bottom: 24px;
            font-weight: 700;
          }

          .add-goal-form {
            background: #f8fafc;
            padding: 24px;
            border-radius: 16px;
            border: 1px solid #e2e8f0;
          }

          .form-row {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
            margin-bottom: 20px;
          }

          .form-group {
            display: flex;
            flex-direction: column;
          }

          .form-group label {
            color: #374151;
            font-weight: 600;
            margin-bottom: 8px;
            font-size: 0.95rem;
          }

          .form-group input, .form-group select {
            padding: 12px 16px;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            color: #1e293b;
            background: white;
            transition: all 0.2s ease;
          }

          .form-group input:focus, .form-group select:focus {
            outline: none;
            border-color: #2563eb;
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
          }

          .input-wrapper {
            position: relative;
            display: flex;
            align-items: center;
          }

          .input-wrapper input {
            padding-left: 36px;
            padding-right: 36px;
          }

          .currency, .percentage {
            position: absolute;
            color: #64748b;
            font-weight: 600;
            font-size: 1rem;
          }

          .currency {
            left: 12px;
          }

          .percentage {
            right: 12px;
          }

          .input-help {
            font-size: 0.8rem;
            color: #64748b;
            margin-top: 4px;
            font-style: italic;
          }

          .add-goal-btn {
            background: linear-gradient(135deg, #2563eb, #1d4ed8);
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 8px;
            font-weight: 700;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 8px;
            align-self: flex-end;
          }

          .add-goal-btn:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(37, 99, 235, 0.3);
          }

          .add-goal-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }

          .btn-icon {
            font-size: 1.1rem;
          }

          /* Goals Section */
          .empty-state {
            text-align: center;
            padding: 60px 20px;
            color: #64748b;
          }

          .empty-icon {
            font-size: 4rem;
            margin-bottom: 20px;
          }

          .empty-state h3 {
            color: #1e293b;
            font-size: 1.5rem;
            margin-bottom: 12px;
            font-weight: 700;
          }

          .empty-state p {
            font-size: 1.1rem;
            line-height: 1.6;
          }

          .goals-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 28px;
          }

          .goal-card {
            background: #f8fafc;
            border-radius: 16px;
            padding: 24px;
            border: 2px solid #e2e8f0;
            transition: all 0.2s ease;
          }

          .goal-card:hover {
            border-color: #cbd5e1;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }

          .goal-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 20px;
          }

          .goal-title-section {
            flex: 1;
          }

          .goal-name-input {
            background: none;
            border: none;
            font-size: 1.3rem;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 8px;
            padding: 4px 8px;
            border-radius: 4px;
            width: 100%;
          }

          .goal-name-input:focus {
            outline: none;
            background: white;
            box-shadow: 0 0 0 2px #2563eb;
          }

          .goal-priority {
            display: inline-block;
            color: white;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 0.8rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .remove-goal-btn {
            background: #fee2e2;
            border: 1px solid #fca5a5;
            color: #dc2626;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s ease;
            font-weight: bold;
          }

          .remove-goal-btn:hover {
            background: #fecaca;
            transform: scale(1.1);
          }

          .goal-progress {
            margin-bottom: 24px;
          }

          .progress-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            font-size: 0.9rem;
            font-weight: 600;
            color: #374151;
          }

          .progress-bar {
            width: 100%;
            height: 8px;
            background: #e2e8f0;
            border-radius: 4px;
            overflow: hidden;
          }

          .progress-fill {
            height: 100%;
            border-radius: 4px;
            transition: width 0.3s ease;
          }

          .goal-inputs {
            margin-bottom: 24px;
          }

          .input-row {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
            margin-bottom: 16px;
          }

          .input-group {
            display: flex;
            flex-direction: column;
          }

          .input-group label {
            color: #374151;
            font-weight: 600;
            margin-bottom: 6px;
            font-size: 0.85rem;
          }

          .input-group input, .input-group select {
            padding: 8px 12px;
            border: 1px solid #d1d5db;
            border-radius: 6px;
            font-size: 0.9rem;
            font-weight: 500;
            color: #1e293b;
            background: white;
            transition: all 0.2s ease;
          }

          .input-group input:focus, .input-group select:focus {
            outline: none;
            border-color: #2563eb;
            box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
          }

          .goal-results {
            border-top: 1px solid #d1d5db;
            padding-top: 20px;
          }

          .result-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
            margin-bottom: 16px;
          }

          .result-item {
            text-align: center;
            padding: 12px;
            background: white;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
          }

          .result-label {
            color: #64748b;
            font-size: 0.8rem;
            font-weight: 600;
            margin-bottom: 4px;
          }

          .result-value {
            color: #1e293b;
            font-weight: 700;
            font-size: 0.95rem;
          }

          .result-value.interest {
            color: #059669;
          }

          .target-date-analysis {
            background: white;
            padding: 16px;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
          }

          .date-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
          }

          .date-label {
            color: #374151;
            font-weight: 600;
            font-size: 0.9rem;
          }

          .status {
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 0.8rem;
            font-weight: 700;
          }

          .status.on-track {
            background: #d1fae5;
            color: #065f46;
          }

          .status.behind {
            background: #fed7d7;
            color: #9b1c1c;
          }

          .recommendation {
            color: #dc2626;
            font-size: 0.85rem;
            font-weight: 600;
            font-style: italic;
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
            border-color: #2563eb;
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
            background: linear-gradient(135deg, #dbeafe, #bfdbfe);
            color: #1e40af;
          }

          .faq-question.active .faq-icon {
            transform: rotate(45deg);
            color: #2563eb;
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

            .goals-grid {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 968px) {
            .tips-grid {
              grid-template-columns: 1fr;
            }

            .summary-grid {
              grid-template-columns: repeat(2, 1fr);
            }

            .form-row, .input-row, .result-grid {
              grid-template-columns: 1fr;
              gap: 16px;
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

            .add-goal-section, .goals-section, .overall-summary, .tips-section, .faq-section {
              padding: 24px;
            }

            .currency-selector {
              flex-direction: column;
              gap: 8px;
            }

            .summary-grid {
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

            .add-goal-section, .goals-section, .overall-summary {
              padding: 20px;
            }

            .breadcrumb {
              font-size: 0.8rem;
            }

            .goals-grid {
              grid-template-columns: 1fr;
            }

            .goal-card {
              padding: 20px;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default SavingsGoalCalculator;