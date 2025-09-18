// src/pages/calculators/budget/EmergencyFundCalculator.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../../components/SEO/SEOHead';

const EmergencyFundCalculator = () => {
  const [inputs, setInputs] = useState({
    monthlyExpenses: 4000,
    jobStability: 'stable', // stable, moderate, unstable
    incomeType: 'single', // single, dual
    dependents: 0,
    currentSavings: 1000,
    monthlySavings: 500,
    riskFactors: {
      healthIssues: false,
      oldCar: false,
      oldHome: false,
      variableIncome: false,
      highRiskJob: false
    }
  });

  const [results, setResults] = useState({
    recommendedAmount: 0,
    monthsRecommended: 0,
    currentCoverage: 0,
    neededAmount: 0,
    timeToGoal: 0,
    priority: 'medium'
  });

  const [currency, setCurrency] = useState('USD');

  useEffect(() => {
    calculateEmergencyFund();
  }, [inputs]);

  const calculateEmergencyFund = () => {
    const { monthlyExpenses, jobStability, incomeType, dependents, currentSavings, monthlySavings, riskFactors } = inputs;
    
    let baseMonths = 3; // Start with 3 months as minimum
    
    // Adjust based on job stability
    if (jobStability === 'moderate') baseMonths += 1;
    if (jobStability === 'unstable') baseMonths += 3;
    
    // Adjust based on income type
    if (incomeType === 'single') baseMonths += 1;
    if (incomeType === 'variable') baseMonths += 2;
    
    // Adjust based on dependents
    if (dependents > 0) baseMonths += 1;
    if (dependents > 2) baseMonths += 1;
    
    // Adjust based on risk factors
    const riskCount = Object.values(riskFactors).filter(Boolean).length;
    baseMonths += Math.floor(riskCount / 2);
    
    // Cap at reasonable maximum
    const monthsRecommended = Math.min(Math.max(baseMonths, 3), 12);
    const recommendedAmount = monthlyExpenses * monthsRecommended;
    
    const currentCoverage = currentSavings > 0 ? currentSavings / monthlyExpenses : 0;
    const neededAmount = Math.max(0, recommendedAmount - currentSavings);
    const timeToGoal = monthlySavings > 0 ? Math.ceil(neededAmount / monthlySavings) : 0;
    
    // Determine priority
    let priority = 'medium';
    if (currentSavings < monthlyExpenses) priority = 'urgent';
    else if (currentSavings < monthlyExpenses * 2) priority = 'high';
    else if (currentSavings >= recommendedAmount) priority = 'complete';
    
    setResults({
      recommendedAmount,
      monthsRecommended,
      currentCoverage,
      neededAmount,
      timeToGoal,
      priority
    });
  };

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setInputs(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: typeof value === 'boolean' ? value : parseFloat(value) || 0
        }
      }));
    } else {
      setInputs(prev => ({
        ...prev,
        [field]: typeof value === 'boolean' ? value : parseFloat(value) || 0
      }));
    }
  };

  const handleRiskFactorChange = (factor, checked) => {
    setInputs(prev => ({
      ...prev,
      riskFactors: {
        ...prev.riskFactors,
        [factor]: checked
      }
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

  const getPriorityColor = () => {
    switch (results.priority) {
      case 'urgent': return '#dc2626';
      case 'high': return '#ea580c';
      case 'medium': return '#ca8a04';
      case 'complete': return '#059669';
      default: return '#64748b';
    }
  };

  const getPriorityMessage = () => {
    switch (results.priority) {
      case 'urgent': return 'Build your emergency fund immediately - you have less than 1 month of expenses saved';
      case 'high': return 'High priority - increase your emergency fund to at least 2 months of expenses';
      case 'medium': return 'Good progress - continue building toward your full emergency fund goal';
      case 'complete': return 'Excellent! Your emergency fund is fully funded';
      default: return 'Keep building your financial safety net';
    }
  };

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Emergency Fund Calculator', url: '/budget-calculators/emergency-fund' }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Emergency Fund Calculator",
    "description": "Calculate the optimal emergency fund amount based on monthly expenses, job stability, family situation, and risk factors",
    "url": "/budget-calculators/emergency-fund",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const seoData = {
    title: "Emergency Fund Calculator - How Much Emergency Savings Do I Need?",
    description: "Free emergency fund calculator determines optimal emergency savings amount based on monthly expenses, job stability, dependents, and risk factors. Build your financial safety net.",
    keywords: "emergency fund calculator, emergency savings calculator, financial safety net, emergency money calculator, how much emergency fund, rainy day fund calculator",
    canonicalUrl: "/budget-calculators/emergency-fund",
    breadcrumbs: breadcrumbs,
    structuredData: structuredData
  };

  return (
    <>
      <SEOHead {...seoData} />
      
      <div className="emergency-fund-page">
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
              <li className="active">Emergency Fund Calculator</li>
            </ol>
          </nav>

          {/* Page Header */}
          <div className="page-header">
            <div className="header-badge">
              <span className="header-icon">🛡️</span>
              Financial Safety Net
            </div>
            <h1>Emergency Fund Calculator</h1>
            <p className="header-subtitle">Calculate Your Optimal Emergency Savings Amount</p>
            <p className="header-description">
              Determine how much you need in your emergency fund based on monthly expenses, job stability, family situation, and risk factors. Build your financial safety net with confidence.
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
            {/* Input Section */}
            <div className="calculator-inputs">
              <div className="input-card">
                <h3>Your Financial Situation</h3>
                
                <div className="input-group">
                  <label>Monthly Essential Expenses</label>
                  <div className="input-wrapper">
                    <span className="currency">{formatCurrency(0).charAt(0)}</span>
                    <input
                      type="number"
                      value={inputs.monthlyExpenses}
                      onChange={(e) => handleInputChange('monthlyExpenses', e.target.value)}
                      placeholder="Enter monthly expenses"
                    />
                  </div>
                  <div className="slider-container">
                    <input
                      type="range"
                      min="1000"
                      max="10000"
                      step="250"
                      value={inputs.monthlyExpenses}
                      onChange={(e) => handleInputChange('monthlyExpenses', e.target.value)}
                      className="slider"
                    />
                    <div className="slider-labels">
                      <span>{formatCurrency(1000)}</span>
                      <span>{formatCurrency(10000)}</span>
                    </div>
                  </div>
                  <div className="input-help">Include housing, utilities, food, insurance, minimum debt payments</div>
                </div>

                <div className="input-group">
                  <label>Current Emergency Savings</label>
                  <div className="input-wrapper">
                    <span className="currency">{formatCurrency(0).charAt(0)}</span>
                    <input
                      type="number"
                      value={inputs.currentSavings}
                      onChange={(e) => handleInputChange('currentSavings', e.target.value)}
                      placeholder="Current emergency fund amount"
                    />
                  </div>
                  <div className="slider-container">
                    <input
                      type="range"
                      min="0"
                      max="50000"
                      step="500"
                      value={inputs.currentSavings}
                      onChange={(e) => handleInputChange('currentSavings', e.target.value)}
                      className="slider"
                    />
                    <div className="slider-labels">
                      <span>{formatCurrency(0)}</span>
                      <span>{formatCurrency(50000)}</span>
                    </div>
                  </div>
                </div>

                <div className="input-group">
                  <label>Monthly Savings Capacity</label>
                  <div className="input-wrapper">
                    <span className="currency">{formatCurrency(0).charAt(0)}</span>
                    <input
                      type="number"
                      value={inputs.monthlySavings}
                      onChange={(e) => handleInputChange('monthlySavings', e.target.value)}
                      placeholder="How much can you save monthly"
                    />
                  </div>
                  <div className="slider-container">
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      step="50"
                      value={inputs.monthlySavings}
                      onChange={(e) => handleInputChange('monthlySavings', e.target.value)}
                      className="slider"
                    />
                    <div className="slider-labels">
                      <span>{formatCurrency(0)}</span>
                      <span>{formatCurrency(2000)}</span>
                    </div>
                  </div>
                </div>

                <div className="input-group">
                  <label>Number of Dependents</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      value={inputs.dependents}
                      onChange={(e) => handleInputChange('dependents', e.target.value)}
                      placeholder="0"
                      min="0"
                      max="10"
                    />
                    <span className="unit">people</span>
                  </div>
                  <div className="slider-container">
                    <input
                      type="range"
                      min="0"
                      max="6"
                      step="1"
                      value={inputs.dependents}
                      onChange={(e) => handleInputChange('dependents', e.target.value)}
                      className="slider"
                    />
                    <div className="slider-labels">
                      <span>0</span>
                      <span>6+</span>
                    </div>
                  </div>
                </div>

                {/* Situation Assessment */}
                <div className="situation-section">
                  <h4>Employment & Income</h4>
                  
                  <div className="input-group">
                    <label>Job Stability</label>
                    <div className="radio-group">
                      <label className="radio-option">
                        <input
                          type="radio"
                          name="jobStability"
                          value="stable"
                          checked={inputs.jobStability === 'stable'}
                          onChange={(e) => handleInputChange('jobStability', e.target.value)}
                        />
                        <span className="radio-custom"></span>
                        <div className="radio-content">
                          <strong>Stable</strong>
                          <span>Government, tenured, large corporation</span>
                        </div>
                      </label>
                      <label className="radio-option">
                        <input
                          type="radio"
                          name="jobStability"
                          value="moderate"
                          checked={inputs.jobStability === 'moderate'}
                          onChange={(e) => handleInputChange('jobStability', e.target.value)}
                        />
                        <span className="radio-custom"></span>
                        <div className="radio-content">
                          <strong>Moderate</strong>
                          <span>Average job market, some uncertainty</span>
                        </div>
                      </label>
                      <label className="radio-option">
                        <input
                          type="radio"
                          name="jobStability"
                          value="unstable"
                          checked={inputs.jobStability === 'unstable'}
                          onChange={(e) => handleInputChange('jobStability', e.target.value)}
                        />
                        <span className="radio-custom"></span>
                        <div className="radio-content">
                          <strong>Unstable</strong>
                          <span>Commission, gig economy, volatile industry</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Household Income Type</label>
                    <div className="radio-group">
                      <label className="radio-option">
                        <input
                          type="radio"
                          name="incomeType"
                          value="dual"
                          checked={inputs.incomeType === 'dual'}
                          onChange={(e) => handleInputChange('incomeType', e.target.value)}
                        />
                        <span className="radio-custom"></span>
                        <div className="radio-content">
                          <strong>Dual Income</strong>
                          <span>Both partners work</span>
                        </div>
                      </label>
                      <label className="radio-option">
                        <input
                          type="radio"
                          name="incomeType"
                          value="single"
                          checked={inputs.incomeType === 'single'}
                          onChange={(e) => handleInputChange('incomeType', e.target.value)}
                        />
                        <span className="radio-custom"></span>
                        <div className="radio-content">
                          <strong>Single Income</strong>
                          <span>One primary earner</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Risk Factors */}
                <div className="risk-factors-section">
                  <h4>Additional Risk Factors</h4>
                  <p className="section-description">Select any that apply to your situation:</p>
                  
                  <div className="checkbox-grid">
                    <label className="checkbox-option">
                      <input
                        type="checkbox"
                        checked={inputs.riskFactors.healthIssues}
                        onChange={(e) => handleRiskFactorChange('healthIssues', e.target.checked)}
                      />
                      <span className="checkbox-custom"></span>
                      <div className="checkbox-content">
                        <strong>Health Issues</strong>
                        <span>Chronic conditions or high medical costs</span>
                      </div>
                    </label>

                    <label className="checkbox-option">
                      <input
                        type="checkbox"
                        checked={inputs.riskFactors.oldCar}
                        onChange={(e) => handleRiskFactorChange('oldCar', e.target.checked)}
                      />
                      <span className="checkbox-custom"></span>
                      <div className="checkbox-content">
                        <strong>Aging Vehicle</strong>
                        <span>Car is 8+ years old or high mileage</span>
                      </div>
                    </label>

                    <label className="checkbox-option">
                      <input
                        type="checkbox"
                        checked={inputs.riskFactors.oldHome}
                        onChange={(e) => handleRiskFactorChange('oldHome', e.target.checked)}
                      />
                      <span className="checkbox-custom"></span>
                      <div className="checkbox-content">
                        <strong>Aging Home</strong>
                        <span>Home needs repairs or has old systems</span>
                      </div>
                    </label>

                    <label className="checkbox-option">
                      <input
                        type="checkbox"
                        checked={inputs.riskFactors.variableIncome}
                        onChange={(e) => handleRiskFactorChange('variableIncome', e.target.checked)}
                      />
                      <span className="checkbox-custom"></span>
                      <div className="checkbox-content">
                        <strong>Variable Income</strong>
                        <span>Seasonal work or irregular pay</span>
                      </div>
                    </label>

                    <label className="checkbox-option">
                      <input
                        type="checkbox"
                        checked={inputs.riskFactors.highRiskJob}
                        onChange={(e) => handleRiskFactorChange('highRiskJob', e.target.checked)}
                      />
                      <span className="checkbox-custom"></span>
                      <div className="checkbox-content">
                        <strong>High-Risk Profession</strong>
                        <span>Physical job or injury-prone work</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="calculator-results">
              <div className="results-card">
                <h3>Emergency Fund Recommendation</h3>
                
                {/* Priority Status */}
                <div className="priority-status" style={{borderColor: getPriorityColor()}}>
                  <div className="priority-indicator" style={{backgroundColor: getPriorityColor()}}>
                    {results.priority.toUpperCase()} PRIORITY
                  </div>
                  <div className="priority-message">
                    {getPriorityMessage()}
                  </div>
                </div>

                {/* Main Results */}
                <div className="main-results">
                  <div className="result-item featured">
                    <div className="result-icon">💰</div>
                    <div className="result-content">
                      <div className="result-label">Recommended Emergency Fund</div>
                      <div className="result-value">{formatCurrency(results.recommendedAmount)}</div>
                      <div className="result-detail">{results.monthsRecommended} months of expenses</div>
                    </div>
                  </div>

                  <div className="result-item">
                    <div className="result-icon">📊</div>
                    <div className="result-content">
                      <div className="result-label">Current Coverage</div>
                      <div className="result-value">{results.currentCoverage.toFixed(1)} months</div>
                      <div className="result-detail">{formatCurrency(inputs.currentSavings)} saved</div>
                    </div>
                  </div>

                  <div className="result-item">
                    <div className="result-icon">🎯</div>
                    <div className="result-content">
                      <div className="result-label">Still Need to Save</div>
                      <div className="result-value">{formatCurrency(results.neededAmount)}</div>
                      <div className="result-detail">
                        {results.timeToGoal > 0 ? `${results.timeToGoal} months to goal` : 'Goal achieved!'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Visualization */}
                <div className="progress-section">
                  <h4>Emergency Fund Progress</h4>
                  <div className="progress-bar-container">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{
                          width: `${Math.min((inputs.currentSavings / results.recommendedAmount) * 100, 100)}%`
                        }}
                      ></div>
                    </div>
                    <div className="progress-labels">
                      <span>{formatCurrency(0)}</span>
                      <span>{formatCurrency(results.recommendedAmount)}</span>
                    </div>
                  </div>
                  <div className="progress-percentage">
                    {((inputs.currentSavings / results.recommendedAmount) * 100).toFixed(1)}% Complete
                  </div>
                </div>

                {/* Savings Timeline */}
                {inputs.monthlySavings > 0 && results.neededAmount > 0 && (
                  <div className="timeline-section">
                    <h4>Savings Timeline</h4>
                    <div className="timeline-content">
                      <div className="timeline-item">
                        <div className="timeline-date">Today</div>
                        <div className="timeline-amount">{formatCurrency(inputs.currentSavings)}</div>
                      </div>
                      <div className="timeline-arrow">➜</div>
                      <div className="timeline-item">
                        <div className="timeline-date">
                          In {results.timeToGoal} month{results.timeToGoal !== 1 ? 's' : ''}
                        </div>
                        <div className="timeline-amount">{formatCurrency(results.recommendedAmount)}</div>
                      </div>
                    </div>
                    <div className="timeline-details">
                      Saving {formatCurrency(inputs.monthlySavings)} per month
                    </div>
                  </div>
                )}

                {/* Recommendation Breakdown */}
                <div className="recommendation-breakdown">
                  <h4>Why {results.monthsRecommended} Months?</h4>
                  <div className="breakdown-factors">
                    <div className="factor-item">
                      <span className="factor-label">Base recommendation:</span>
                      <span className="factor-value">3 months</span>
                    </div>
                    {inputs.jobStability === 'moderate' && (
                      <div className="factor-item">
                        <span className="factor-label">Moderate job stability:</span>
                        <span className="factor-value">+1 month</span>
                      </div>
                    )}
                    {inputs.jobStability === 'unstable' && (
                      <div className="factor-item">
                        <span className="factor-label">Unstable employment:</span>
                        <span className="factor-value">+3 months</span>
                      </div>
                    )}
                    {inputs.incomeType === 'single' && (
                      <div className="factor-item">
                        <span className="factor-label">Single income household:</span>
                        <span className="factor-value">+1 month</span>
                      </div>
                    )}
                    {inputs.dependents > 0 && (
                      <div className="factor-item">
                        <span className="factor-label">Dependents:</span>
                        <span className="factor-value">+{inputs.dependents > 2 ? 2 : 1} month{inputs.dependents > 2 || inputs.dependents === 1 ? '' : 's'}</span>
                      </div>
                    )}
                    {Object.values(inputs.riskFactors).some(Boolean) && (
                      <div className="factor-item">
                        <span className="factor-label">Risk factors:</span>
                        <span className="factor-value">+{Math.floor(Object.values(inputs.riskFactors).filter(Boolean).length / 2)} month{Math.floor(Object.values(inputs.riskFactors).filter(Boolean).length / 2) !== 1 ? 's' : ''}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Tips */}
          <div className="tips-section">
            <h3>Emergency Fund Building Tips</h3>
            <div className="tips-grid">
              <div className="tip-card">
                <div className="tip-icon">🚀</div>
                <h4>Start with $1,000</h4>
                <p>Build a starter emergency fund of $1,000 as fast as possible. This covers most common emergencies and prevents new debt.</p>
              </div>
              
              <div className="tip-card">
                <div className="tip-icon">🏦</div>
                <h4>High-Yield Savings Account</h4>
                <p>Keep your emergency fund in a separate, easily accessible high-yield savings account. Don't invest it in stocks or risky assets.</p>
              </div>
              
              <div className="tip-card">
                <div className="tip-icon">🤖</div>
                <h4>Automate Your Savings</h4>
                <p>Set up automatic transfers to your emergency fund. Treat it like a bill that must be paid each month.</p>
              </div>
              
              <div className="tip-card">
                <div className="tip-icon">📱</div>
                <h4>Use Windfalls Wisely</h4>
                <p>Tax refunds, bonuses, and gifts should go directly to your emergency fund until it's fully funded.</p>
              </div>
              
              <div className="tip-card">
                <div className="tip-icon">🎯</div>
                <h4>Define "Emergency"</h4>
                <p>True emergencies are unexpected, necessary, and urgent. Job loss, medical bills, and home repairs qualify. Vacations don't.</p>
              </div>
              
              <div className="tip-card">
                <div className="tip-icon">🔄</div>
                <h4>Replenish After Use</h4>
                <p>If you use your emergency fund, make replenishing it your top financial priority before returning to other goals.</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="faq-section">
            <h3>Frequently Asked Questions About Emergency Funds</h3>
            <p className="faq-intro">
              Get answers to the most common questions about building and maintaining your emergency fund.
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
                  <span>How much should I have in my emergency fund?</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <p>The standard recommendation is 3-6 months of essential expenses, but the exact amount depends on your specific situation:</p>
                  <ul>
                    <li><strong>3 months:</strong> Stable job, dual income, excellent job market, no dependents</li>
                    <li><strong>4-5 months:</strong> Average job stability, some dependents, moderate job market</li>
                    <li><strong>6+ months:</strong> Single income, unstable job, variable income, many dependents, health issues</li>
                  </ul>
                  <p>Our calculator considers your specific circumstances to give you a personalized recommendation.</p>
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
                  <span>Where should I keep my emergency fund?</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <p>Your emergency fund should be kept in accounts that are:</p>
                  <ul>
                    <li><strong>Easily accessible:</strong> Available within 24-48 hours</li>
                    <li><strong>Safe and FDIC insured:</strong> No risk of losing principal</li>
                    <li><strong>Separate from checking:</strong> Reduces temptation to spend</li>
                  </ul>
                  <p><strong>Best options:</strong></p>
                  <ul>
                    <li>High-yield savings accounts (online banks often offer better rates)</li>
                    <li>Money market accounts with debit card access</li>
                    <li>Short-term CDs (if you have a larger fund and can ladder them)</li>
                  </ul>
                  <p><strong>Avoid:</strong> Checking accounts (too easy to spend), stocks/investments (too risky), cash at home (no growth, theft risk).</p>
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
                  <span>Should I build my emergency fund or pay off debt first?</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <p>This depends on your debt situation and risk tolerance:</p>
                  <p><strong>Build $1,000 emergency fund first, then:</strong></p>
                  <ul>
                    <li><strong>Pay off high-interest debt first (18%+ APR):</strong> Credit cards, payday loans, personal loans with high rates</li>
                    <li><strong>Build full emergency fund first if:</strong> Your job is unstable, you have variable income, or you have dependents</li>
                    <li><strong>Balanced approach:</strong> Split extra money 50/50 between emergency fund and debt payment</li>
                  </ul>
                  <p><strong>Dave Ramsey approach:</strong> $1,000 emergency fund → pay off all non-mortgage debt → build 3-6 months emergency fund</p>
                  <p><strong>Remember:</strong> Without an emergency fund, unexpected expenses often create more debt, making it harder to get ahead.</p>
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
                  <span>What qualifies as a true emergency?</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <p>True emergencies are expenses that are <strong>unexpected, necessary, and urgent</strong>:</p>
                  <p><strong>Qualifies as emergency:</strong></p>
                  <ul>
                    <li>Job loss or significant income reduction</li>
                    <li>Major medical bills not covered by insurance</li>
                    <li>Essential home repairs (roof leak, broken HVAC, major plumbing)</li>
                    <li>Car repairs needed for work transportation</li>
                    <li>Emergency travel for family crisis</li>
                    <li>Essential appliance replacement (refrigerator, water heater)</li>
                  </ul>
                  <p><strong>Does NOT qualify:</strong></p>
                  <ul>
                    <li>Vacations or entertainment</li>
                    <li>Shopping sales or "great deals"</li>
                    <li>Predictable expenses (annual insurance, car maintenance)</li>
                    <li>Home improvements or upgrades</li>
                    <li>Investment opportunities</li>
                  </ul>
                  <p>When in doubt, ask: "Is this unexpected, necessary for health/safety/income, and urgent?"</p>
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
                  <span>How can I build my emergency fund faster?</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <p>Strategies to accelerate your emergency fund building:</p>
                  <p><strong>Increase income:</strong></p>
                  <ul>
                    <li>Sell items you no longer need</li>
                    <li>Take on freelance work or part-time job</li>
                    <li>Use cashback apps and credit card rewards</li>
                    <li>Ask for overtime at work</li>
                  </ul>
                  <p><strong>Reduce expenses temporarily:</strong></p>
                  <ul>
                    <li>Cancel subscriptions and memberships</li>
                    <li>Cook at home instead of dining out</li>
                    <li>Find cheaper entertainment options</li>
                    <li>Reduce utility costs (adjust thermostat, unplug devices)</li>
                  </ul>
                  <p><strong>Use windfalls:</strong></p>
                  <ul>
                    <li>Tax refunds go directly to emergency fund</li>
                    <li>Work bonuses, gifts, and raises</li>
                    <li>Insurance claim payouts (after covering the emergency)</li>
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
                  <span>Is it okay to invest my emergency fund to earn higher returns?</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <p><strong>No, you should not invest your emergency fund.</strong> Here's why:</p>
                  <p><strong>Emergency fund requirements:</strong></p>
                  <ul>
                    <li><strong>Liquidity:</strong> Must be available within 24-48 hours</li>
                    <li><strong>Stability:</strong> Principal must be guaranteed and safe</li>
                    <li><strong>Predictability:</strong> No risk of losing value when you need it most</li>
                  </ul>
                  <p><strong>Why investments don't work:</strong></p>
                  <ul>
                    <li>Market downturns often coincide with personal emergencies (job loss during recession)</li>
                    <li>You might be forced to sell at a loss when you need the money most</li>
                    <li>Investments can take days to settle and transfer</li>
                    <li>The stress of watching your emergency fund fluctuate defeats the purpose</li>
                  </ul>
                  <p><strong>Better approach:</strong> Keep emergency fund safe and liquid, then invest additional savings for long-term goals in separate accounts.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .emergency-fund-page {
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
            color: #10b981;
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
            background: linear-gradient(135deg, #10b981, #059669);
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
            color: #10b981;
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

          .input-card {
            border-left: 4px solid #10b981;
          }

          .input-card h3, .results-card h3 {
            color: #1e293b;
            font-size: 1.6rem;
            margin-bottom: 28px;
            font-weight: 700;
          }

          .input-group {
            margin-bottom: 32px;
          }

          .input-group label {
            display: block;
            color: #374151;
            font-weight: 600;
            margin-bottom: 10px;
            font-size: 1rem;
          }

          .input-wrapper {
            position: relative;
            display: flex;
            align-items: center;
            margin-bottom: 12px;
          }

          .input-wrapper input {
            width: 100%;
            padding: 16px;
            padding-left: 44px;
            padding-right: 54px;
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
            border-color: #10b981;
            background: white;
            box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
          }

          .currency, .unit {
            position: absolute;
            color: #64748b;
            font-weight: 600;
            font-size: 1rem;
          }

          .currency {
            left: 16px;
          }

          .unit {
            right: 16px;
          }

          .slider-container {
            margin-top: 12px;
          }

          .slider {
            width: 100%;
            height: 8px;
            border-radius: 4px;
            background: #e2e8f0;
            outline: none;
            -webkit-appearance: none;
          }

          .slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: linear-gradient(135deg, #10b981, #059669);
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          }

          .slider::-moz-range-thumb {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: linear-gradient(135deg, #10b981, #059669);
            cursor: pointer;
            border: none;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          }

          .slider-labels {
            display: flex;
            justify-content: space-between;
            margin-top: 8px;
            font-size: 0.85rem;
            color: #64748b;
            font-weight: 500;
          }

          .input-help {
            font-size: 0.85rem;
            color: #64748b;
            margin-top: 8px;
            font-style: italic;
          }

          .situation-section, .risk-factors-section {
            margin-top: 36px;
            padding-top: 28px;
            border-top: 2px solid #e2e8f0;
          }

          .situation-section h4, .risk-factors-section h4 {
            color: #1e293b;
            font-size: 1.2rem;
            margin-bottom: 24px;
            font-weight: 700;
          }

          .section-description {
            color: #64748b;
            margin-bottom: 20px;
            font-size: 0.95rem;
          }

          .radio-group {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }

          .radio-option {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            padding: 16px;
            background: #f8fafc;
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .radio-option:hover {
            background: #f1f5f9;
            border-color: #cbd5e1;
          }

          .radio-option input[type="radio"] {
            display: none;
          }

          .radio-option input[type="radio"]:checked + .radio-custom {
            background: #10b981;
            border-color: #10b981;
          }

          .radio-option input[type="radio"]:checked + .radio-custom::after {
            transform: scale(1);
          }

          .radio-custom {
            width: 20px;
            height: 20px;
            border: 2px solid #d1d5db;
            border-radius: 50%;
            background: white;
            position: relative;
            transition: all 0.2s ease;
            flex-shrink: 0;
            margin-top: 2px;
          }

          .radio-custom::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 8px;
            height: 8px;
            background: white;
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(0);
            transition: transform 0.2s ease;
          }

          .radio-content {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }

          .radio-content strong {
            color: #1e293b;
            font-weight: 600;
          }

          .radio-content span {
            color: #64748b;
            font-size: 0.9rem;
          }

          .checkbox-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .checkbox-option {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            padding: 16px;
            background: #f8fafc;
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .checkbox-option:hover {
            background: #f1f5f9;
            border-color: #cbd5e1;
          }

          .checkbox-option input[type="checkbox"] {
            display: none;
          }

          .checkbox-option input[type="checkbox"]:checked + .checkbox-custom {
            background: #10b981;
            border-color: #10b981;
          }

          .checkbox-option input[type="checkbox"]:checked + .checkbox-custom::after {
            opacity: 1;
            transform: translate(-50%, -50%) rotate(45deg);
          }

          .checkbox-custom {
            width: 20px;
            height: 20px;
            border: 2px solid #d1d5db;
            border-radius: 4px;
            background: white;
            position: relative;
            transition: all 0.2s ease;
            flex-shrink: 0;
            margin-top: 2px;
          }

          .checkbox-custom::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 5px;
            height: 10px;
            border: 2px solid white;
            border-width: 0 2px 2px 0;
            opacity: 0;
            transition: all 0.2s ease;
          }

          .checkbox-content {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }

          .checkbox-content strong {
            color: #1e293b;
            font-weight: 600;
          }

          .checkbox-content span {
            color: #64748b;
            font-size: 0.9rem;
          }

          /* Results Section */
          .priority-status {
            padding: 20px;
            border-radius: 16px;
            border: 2px solid;
            margin-bottom: 32px;
            text-align: center;
          }

          .priority-indicator {
            display: inline-block;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-weight: 700;
            font-size: 0.9rem;
            letter-spacing: 0.5px;
            margin-bottom: 12px;
          }

          .priority-message {
            color: #374151;
            font-weight: 600;
            line-height: 1.5;
          }

          .main-results {
            margin-bottom: 32px;
          }

          .result-item {
            display: flex;
            gap: 16px;
            padding: 20px;
            background: #f8fafc;
            border-radius: 12px;
            margin-bottom: 16px;
            border: 1px solid #e2e8f0;
          }

          .result-item.featured {
            background: linear-gradient(135deg, #ecfdf5, #d1fae5);
            border-color: #10b981;
          }

          .result-icon {
            font-size: 2rem;
            flex-shrink: 0;
            width: 48px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: white;
            border-radius: 12px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .result-content {
            flex: 1;
          }

          .result-label {
            color: #64748b;
            font-weight: 600;
            font-size: 0.9rem;
            margin-bottom: 4px;
          }

          .result-value {
            color: #1e293b;
            font-weight: 800;
            font-size: 1.5rem;
            margin-bottom: 4px;
          }

          .result-detail {
            color: #64748b;
            font-size: 0.85rem;
          }

          .progress-section {
            margin-bottom: 32px;
          }

          .progress-section h4 {
            color: #1e293b;
            margin-bottom: 16px;
            font-weight: 700;
          }

          .progress-bar-container {
            margin-bottom: 12px;
          }

          .progress-bar {
            width: 100%;
            height: 12px;
            background: #e2e8f0;
            border-radius: 6px;
            overflow: hidden;
            margin-bottom: 8px;
          }

          .progress-fill {
            height: 100%;
            background: linear-gradient(135deg, #10b981, #059669);
            border-radius: 6px;
            transition: width 0.3s ease;
          }

          .progress-labels {
            display: flex;
            justify-content: space-between;
            font-size: 0.8rem;
            color: #64748b;
          }

          .progress-percentage {
            text-align: center;
            font-weight: 700;
            color: #10b981;
          }

          .timeline-section {
            margin-bottom: 32px;
            padding: 20px;
            background: #f8fafc;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
          }

          .timeline-section h4 {
            color: #1e293b;
            margin-bottom: 16px;
            font-weight: 700;
          }

          .timeline-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 12px;
          }

          .timeline-item {
            text-align: center;
          }

          .timeline-date {
            font-size: 0.9rem;
            color: #64748b;
            margin-bottom: 4px;
          }

          .timeline-amount {
            font-weight: 700;
            color: #1e293b;
            font-size: 1.1rem;
          }

          .timeline-arrow {
            font-size: 1.5rem;
            color: #10b981;
          }

          .timeline-details {
            text-align: center;
            color: #64748b;
            font-size: 0.9rem;
            font-style: italic;
          }

          .recommendation-breakdown {
            padding: 20px;
            background: linear-gradient(135deg, #f0f9ff, #dbeafe);
            border-radius: 12px;
            border: 1px solid #93c5fd;
          }

          .recommendation-breakdown h4 {
            color: #1e293b;
            margin-bottom: 16px;
            font-weight: 700;
          }

          .breakdown-factors {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .factor-item {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
          }

          .factor-label {
            color: #374151;
            font-size: 0.9rem;
          }

          .factor-value {
            color: #1e293b;
            font-weight: 600;
            font-size: 0.9rem;
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
            border-color: #10b981;
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
            background: linear-gradient(135deg, #ecfdf5, #d1fae5);
            color: #047857;
          }

          .faq-question.active .faq-icon {
            transform: rotate(45deg);
            color: #10b981;
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

            .timeline-content {
              flex-direction: column;
              gap: 16px;
            }

            .timeline-arrow {
              transform: rotate(90deg);
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

            .breadcrumb {
              font-size: 0.8rem;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default EmergencyFundCalculator;