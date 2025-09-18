// src/pages/calculators/budget/CollegeSavingsCalculator.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../../components/SEO/SEOHead';

const CollegeSavingsCalculator = () => {
  const [inputs, setInputs] = useState({
    childAge: 5,
    collegeType: 'public-instate', // public-instate, public-outstate, private
    currentCosts: 25000,
    inflationRate: 5.5, // Education inflation rate
    investmentReturn: 7.0, // Expected 529 plan return
    currentSavings: 5000,
    monthlySavings: 300,
    stateTaxBenefit: 0, // State tax deduction/credit percentage
    yearsInCollege: 4
  });

  const [results, setResults] = useState({
    yearsUntilCollege: 0,
    totalCostAtEnrollment: 0,
    totalNeeded: 0,
    currentProjectedValue: 0,
    monthlyContributionProjected: 0,
    stillNeedToSave: 0,
    requiredMonthly: 0,
    totalContributions: 0,
    totalGrowth: 0,
    annualTaxBenefit: 0
  });

  const [scenarios, setScenarios] = useState([]);

  const [currency, setCurrency] = useState('USD');

  const collegeTypes = {
    'public-instate': { name: 'Public In-State', avgCost: 25000 },
    'public-outstate': { name: 'Public Out-of-State', avgCost: 42000 },
    'private': { name: 'Private University', avgCost: 55000 },
    'community': { name: 'Community College (2yr + Transfer)', avgCost: 15000 }
  };

  useEffect(() => {
    calculateCollege();
    generateScenarios();
  }, [inputs]);

  const calculateCollege = () => {
    const { childAge, currentCosts, inflationRate, investmentReturn, currentSavings, monthlySavings, stateTaxBenefit, yearsInCollege } = inputs;
    
    const yearsUntilCollege = Math.max(0, 18 - childAge);
    const monthsUntilCollege = yearsUntilCollege * 12;
    
    // Calculate college costs with inflation
    const annualCostAtEnrollment = currentCosts * Math.pow(1 + inflationRate / 100, yearsUntilCollege);
    const totalCostAtEnrollment = annualCostAtEnrollment * yearsInCollege;
    
    // We need to consider that college costs will continue inflating during college years
    // Year 1: cost * (1 + inflation)^years
    // Year 2: cost * (1 + inflation)^(years+1)
    // etc.
    let totalNeeded = 0;
    for (let year = 0; year < yearsInCollege; year++) {
      totalNeeded += currentCosts * Math.pow(1 + inflationRate / 100, yearsUntilCollege + year);
    }
    
    const monthlyReturn = investmentReturn / (12 * 100);
    
    // Calculate current savings projected value
    const currentProjectedValue = currentSavings * Math.pow(1 + investmentReturn / 100, yearsUntilCollege);
    
    // Calculate projected value of monthly contributions
    let monthlyContributionProjected = 0;
    if (monthlySavings > 0 && monthsUntilCollege > 0) {
      // Future value of annuity
      if (monthlyReturn > 0) {
        monthlyContributionProjected = monthlySavings * (Math.pow(1 + monthlyReturn, monthsUntilCollege) - 1) / monthlyReturn;
      } else {
        monthlyContributionProjected = monthlySavings * monthsUntilCollege;
      }
    }
    
    const totalProjected = currentProjectedValue + monthlyContributionProjected;
    const stillNeedToSave = Math.max(0, totalNeeded - totalProjected);
    
    // Calculate required monthly savings to meet goal
    let requiredMonthly = 0;
    if (yearsUntilCollege > 0 && stillNeedToSave > 0) {
      const targetMinusCurrentProjected = totalNeeded - currentProjectedValue;
      if (monthlyReturn > 0 && monthsUntilCollege > 0) {
        // PMT = PV * r / (1 - (1 + r)^(-n))
        requiredMonthly = targetMinusCurrentProjected * monthlyReturn / (Math.pow(1 + monthlyReturn, monthsUntilCollege) - 1);
      } else if (monthsUntilCollege > 0) {
        requiredMonthly = targetMinusCurrentProjected / monthsUntilCollege;
      }
    }
    
    const totalContributions = currentSavings + (monthlySavings * monthsUntilCollege);
    const totalGrowth = totalProjected - totalContributions;
    
    // Calculate annual tax benefit
    const annualContributions = monthlySavings * 12;
    const annualTaxBenefit = (annualContributions * stateTaxBenefit) / 100;
    
    setResults({
      yearsUntilCollege,
      totalCostAtEnrollment: annualCostAtEnrollment,
      totalNeeded,
      currentProjectedValue,
      monthlyContributionProjected,
      stillNeedToSave,
      requiredMonthly,
      totalContributions,
      totalGrowth,
      annualTaxBenefit
    });
  };

  const generateScenarios = () => {
    const baseInputs = { ...inputs };
    const scenarioList = [
      {
        name: 'Conservative Growth (5%)',
        description: 'Lower risk, bond-heavy portfolio',
        changes: { investmentReturn: 5.0 },
        color: '#059669'
      },
      {
        name: 'Moderate Growth (7%)',
        description: 'Balanced portfolio (current)',
        changes: {},
        color: '#2563eb'
      },
      {
        name: 'Aggressive Growth (9%)',
        description: 'Stock-heavy, higher risk portfolio',
        changes: { investmentReturn: 9.0 },
        color: '#dc2626'
      },
      {
        name: 'Double Monthly Savings',
        description: `Save ${formatCurrency(baseInputs.monthlySavings * 2)}/month`,
        changes: { monthlySavings: baseInputs.monthlySavings * 2 },
        color: '#f59e0b'
      }
    ];

    const calculatedScenarios = scenarioList.map(scenario => {
      const scenarioInputs = { ...baseInputs, ...scenario.changes };
      const scenarioResults = calculateScenarioResults(scenarioInputs);
      return {
        ...scenario,
        results: scenarioResults
      };
    });

    setScenarios(calculatedScenarios);
  };

  const calculateScenarioResults = (scenarioInputs) => {
    const { childAge, currentCosts, inflationRate, investmentReturn, currentSavings, monthlySavings, yearsInCollege } = scenarioInputs;
    
    const yearsUntilCollege = Math.max(0, 18 - childAge);
    const monthsUntilCollege = yearsUntilCollege * 12;
    
    let totalNeeded = 0;
    for (let year = 0; year < yearsInCollege; year++) {
      totalNeeded += currentCosts * Math.pow(1 + inflationRate / 100, yearsUntilCollege + year);
    }
    
    const monthlyReturn = investmentReturn / (12 * 100);
    const currentProjectedValue = currentSavings * Math.pow(1 + investmentReturn / 100, yearsUntilCollege);
    
    let monthlyContributionProjected = 0;
    if (monthlySavings > 0 && monthsUntilCollege > 0) {
      if (monthlyReturn > 0) {
        monthlyContributionProjected = monthlySavings * (Math.pow(1 + monthlyReturn, monthsUntilCollege) - 1) / monthlyReturn;
      } else {
        monthlyContributionProjected = monthlySavings * monthsUntilCollege;
      }
    }
    
    const totalProjected = currentProjectedValue + monthlyContributionProjected;
    const coveragePercentage = totalNeeded > 0 ? (totalProjected / totalNeeded) * 100 : 100;
    
    return {
      totalNeeded,
      totalProjected,
      coveragePercentage,
      shortfall: Math.max(0, totalNeeded - totalProjected)
    };
  };

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
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

  const getAgeBasedAllocation = (childAge) => {
    // Age-based asset allocation for 529 plans
    const yearsToCollege = 18 - childAge;
    if (yearsToCollege > 10) return { stocks: 80, bonds: 20 };
    if (yearsToCollege > 5) return { stocks: 60, bonds: 40 };
    if (yearsToCollege > 2) return { stocks: 40, bonds: 60 };
    return { stocks: 20, bonds: 80 };
  };

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'College Savings Calculator', url: '/budget-calculators/college-savings' }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "College Savings Calculator",
    "description": "Calculate monthly college savings needed for 529 plans with education cost inflation, investment growth, and state tax benefits",
    "url": "/budget-calculators/college-savings",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const seoData = {
    title: "College Savings Calculator - 529 Plan & Education Savings | Free Tool",
    description: "Free college savings calculator for 529 plans. Calculate monthly savings needed for education costs with inflation, investment growth, and state tax benefits. Plan your child's education funding.",
    keywords: "college savings calculator, 529 plan calculator, education savings calculator, college cost calculator, university savings planner, education funding calculator",
    canonicalUrl: "/budget-calculators/college-savings",
    breadcrumbs: breadcrumbs,
    structuredData: structuredData
  };

  const allocation = getAgeBasedAllocation(inputs.childAge);
  const coveragePercentage = results.totalNeeded > 0 ? ((results.currentProjectedValue + results.monthlyContributionProjected) / results.totalNeeded) * 100 : 100;

  return (
    <>
      <SEOHead {...seoData} />
      
      <div className="college-savings-page">
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
              <li className="active">College Savings Calculator</li>
            </ol>
          </nav>

          {/* Page Header */}
          <div className="page-header">
            <div className="header-badge">
              <span className="header-icon">🎓</span>
              Education Planning
            </div>
            <h1>College Savings Calculator</h1>
            <p className="header-subtitle">Plan Your Child's Education Funding with 529 Plans</p>
            <p className="header-description">
              Calculate how much to save monthly for your child's college education using 529 plans. Factors in education cost inflation, investment growth, and state tax benefits to ensure adequate funding.
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
                <h3>Child & College Information</h3>
                
                <div className="input-group">
                  <label>Child's Current Age</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      value={inputs.childAge}
                      onChange={(e) => handleInputChange('childAge', e.target.value)}
                      min="0"
                      max="17"
                    />
                    <span className="unit">years old</span>
                  </div>
                  <div className="slider-container">
                    <input
                      type="range"
                      min="0"
                      max="17"
                      step="1"
                      value={inputs.childAge}
                      onChange={(e) => handleInputChange('childAge', e.target.value)}
                      className="slider"
                    />
                    <div className="slider-labels">
                      <span>Newborn</span>
                      <span>17 years</span>
                    </div>
                  </div>
                  <div className="input-help">
                    Years until college: {results.yearsUntilCollege}
                  </div>
                </div>

                <div className="input-group">
                  <label>College Type</label>
                  <select
                    value={inputs.collegeType}
                    onChange={(e) => {
                      const newType = e.target.value;
                      setInputs(prev => ({
                        ...prev,
                        collegeType: newType,
                        currentCosts: collegeTypes[newType].avgCost
                      }));
                    }}
                  >
                    {Object.entries(collegeTypes).map(([key, type]) => (
                      <option key={key} value={key}>
                        {type.name} - {formatCurrency(type.avgCost)}/year
                      </option>
                    ))}
                  </select>
                </div>

                <div className="input-group">
                  <label>Current Annual College Costs</label>
                  <div className="input-wrapper">
                    <span className="currency">{formatCurrency(0).charAt(0)}</span>
                    <input
                      type="number"
                      value={inputs.currentCosts}
                      onChange={(e) => handleInputChange('currentCosts', e.target.value)}
                      placeholder="Annual tuition + fees + room + board"
                    />
                  </div>
                  <div className="slider-container">
                    <input
                      type="range"
                      min="10000"
                      max="80000"
                      step="2500"
                      value={inputs.currentCosts}
                      onChange={(e) => handleInputChange('currentCosts', e.target.value)}
                      className="slider"
                    />
                    <div className="slider-labels">
                      <span>{formatCurrency(10000)}</span>
                      <span>{formatCurrency(80000)}</span>
                    </div>
                  </div>
                  <div className="input-help">
                    Total cost at enrollment: {formatCurrency(results.totalCostAtEnrollment)}/year
                  </div>
                </div>

                <div className="input-group">
                  <label>Years in College</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      value={inputs.yearsInCollege}
                      onChange={(e) => handleInputChange('yearsInCollege', e.target.value)}
                      min="2"
                      max="6"
                    />
                    <span className="unit">years</span>
                  </div>
                  <div className="radio-options">
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="collegeYears"
                        checked={inputs.yearsInCollege === 4}
                        onChange={() => handleInputChange('yearsInCollege', 4)}
                      />
                      <span>4 years (Bachelor's)</span>
                    </label>
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="collegeYears"
                        checked={inputs.yearsInCollege === 2}
                        onChange={() => handleInputChange('yearsInCollege', 2)}
                      />
                      <span>2 years (Associate's)</span>
                    </label>
                  </div>
                </div>

                <div className="advanced-section">
                  <h4>Advanced Settings</h4>
                  
                  <div className="input-group">
                    <label>Education Cost Inflation Rate (%)</label>
                    <div className="input-wrapper">
                      <input
                        type="number"
                        value={inputs.inflationRate}
                        onChange={(e) => handleInputChange('inflationRate', e.target.value)}
                        step="0.1"
                      />
                      <span className="percentage">%</span>
                    </div>
                    <div className="slider-container">
                      <input
                        type="range"
                        min="3"
                        max="8"
                        step="0.1"
                        value={inputs.inflationRate}
                        onChange={(e) => handleInputChange('inflationRate', e.target.value)}
                        className="slider"
                      />
                      <div className="slider-labels">
                        <span>3%</span>
                        <span>8%</span>
                      </div>
                    </div>
                    <div className="input-help">
                      Historical average: 5-6% annually
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Expected Investment Return (%)</label>
                    <div className="input-wrapper">
                      <input
                        type="number"
                        value={inputs.investmentReturn}
                        onChange={(e) => handleInputChange('investmentReturn', e.target.value)}
                        step="0.1"
                      />
                      <span className="percentage">%</span>
                    </div>
                    <div className="slider-container">
                      <input
                        type="range"
                        min="4"
                        max="12"
                        step="0.1"
                        value={inputs.investmentReturn}
                        onChange={(e) => handleInputChange('investmentReturn', e.target.value)}
                        className="slider"
                      />
                      <div className="slider-labels">
                        <span>4%</span>
                        <span>12%</span>
                      </div>
                    </div>
                    <div className="input-help">
                      529 plans average: 6-8% annually
                    </div>
                  </div>

                  <div className="input-group">
                    <label>State Tax Benefit (%)</label>
                    <div className="input-wrapper">
                      <input
                        type="number"
                        value={inputs.stateTaxBenefit}
                        onChange={(e) => handleInputChange('stateTaxBenefit', e.target.value)}
                        step="0.1"
                      />
                      <span className="percentage">%</span>
                    </div>
                    <div className="input-help">
                      State deduction/credit percentage (varies by state)
                    </div>
                  </div>
                </div>

                <div className="savings-section">
                  <h4>Current Savings Plan</h4>
                  
                  <div className="input-group">
                    <label>Current College Savings</label>
                    <div className="input-wrapper">
                      <span className="currency">{formatCurrency(0).charAt(0)}</span>
                      <input
                        type="number"
                        value={inputs.currentSavings}
                        onChange={(e) => handleInputChange('currentSavings', e.target.value)}
                        placeholder="Current 529 plan balance"
                      />
                    </div>
                    <div className="slider-container">
                      <input
                        type="range"
                        min="0"
                        max="100000"
                        step="2500"
                        value={inputs.currentSavings}
                        onChange={(e) => handleInputChange('currentSavings', e.target.value)}
                        className="slider"
                      />
                      <div className="slider-labels">
                        <span>{formatCurrency(0)}</span>
                        <span>{formatCurrency(100000)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Monthly Savings Amount</label>
                    <div className="input-wrapper">
                      <span className="currency">{formatCurrency(0).charAt(0)}</span>
                      <input
                        type="number"
                        value={inputs.monthlySavings}
                        onChange={(e) => handleInputChange('monthlySavings', e.target.value)}
                        placeholder="Monthly 529 contribution"
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
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="calculator-results">
              <div className="results-card">
                <h3>College Savings Plan Results</h3>
                
                {/* Main Results */}
                <div className="main-results">
                  <div className="result-item featured">
                    <div className="result-icon">🎯</div>
                    <div className="result-content">
                      <div className="result-label">Total College Cost Needed</div>
                      <div className="result-value">{formatCurrency(results.totalNeeded)}</div>
                      <div className="result-detail">{inputs.yearsInCollege} years at {formatCurrency(results.totalCostAtEnrollment)}/year</div>
                    </div>
                  </div>

                  <div className="result-item">
                    <div className="result-icon">💰</div>
                    <div className="result-content">
                      <div className="result-label">Projected Savings Value</div>
                      <div className="result-value">{formatCurrency(results.currentProjectedValue + results.monthlyContributionProjected)}</div>
                      <div className="result-detail">At {inputs.investmentReturn}% annual return</div>
                    </div>
                  </div>

                  <div className="result-item">
                    <div className="result-icon">📈</div>
                    <div className="result-content">
                      <div className="result-label">Coverage Percentage</div>
                      <div className="result-value coverage">{coveragePercentage.toFixed(1)}%</div>
                      <div className="result-detail">of projected college costs</div>
                    </div>
                  </div>
                </div>

                {/* Progress Visualization */}
                <div className="progress-section">
                  <h4>College Funding Progress</h4>
                  <div className="progress-bar-container">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{
                          width: `${Math.min(coveragePercentage, 100)}%`,
                          backgroundColor: coveragePercentage >= 100 ? '#059669' : coveragePercentage >= 75 ? '#f59e0b' : '#dc2626'
                        }}
                      ></div>
                    </div>
                    <div className="progress-labels">
                      <span>0%</span>
                      <span>100% Funded</span>
                    </div>
                  </div>
                </div>

                {/* Breakdown */}
                <div className="breakdown-section">
                  <h4>Savings Breakdown</h4>
                  <div className="breakdown-grid">
                    <div className="breakdown-item">
                      <div className="breakdown-label">Current Savings Projected</div>
                      <div className="breakdown-value">{formatCurrency(results.currentProjectedValue)}</div>
                    </div>
                    <div className="breakdown-item">
                      <div className="breakdown-label">Monthly Contributions Value</div>
                      <div className="breakdown-value">{formatCurrency(results.monthlyContributionProjected)}</div>
                    </div>
                    <div className="breakdown-item">
                      <div className="breakdown-label">Total Investment Growth</div>
                      <div className="breakdown-value growth">{formatCurrency(results.totalGrowth)}</div>
                    </div>
                  </div>

                  {results.stillNeedToSave > 0 && (
                    <div className="shortfall-alert">
                      <div className="alert-icon">⚠️</div>
                      <div className="alert-content">
                        <h5>Additional Savings Needed</h5>
                        <p>You need <strong>{formatCurrency(results.stillNeedToSave)}</strong> more to fully fund college costs.</p>
                        <p>Required monthly savings: <strong>{formatCurrency(results.requiredMonthly)}</strong></p>
                      </div>
                    </div>
                  )}

                  {coveragePercentage >= 100 && (
                    <div className="success-alert">
                      <div className="alert-icon">🎉</div>
                      <div className="alert-content">
                        <h5>Congratulations!</h5>
                        <p>Your current savings plan will fully fund your child's college education!</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Tax Benefits */}
                {results.annualTaxBenefit > 0 && (
                  <div className="tax-benefit-section">
                    <h4>Tax Benefits</h4>
                    <div className="tax-benefit-card">
                      <div className="tax-benefit-icon">💸</div>
                      <div className="tax-benefit-content">
                        <div className="tax-benefit-amount">{formatCurrency(results.annualTaxBenefit)}</div>
                        <div className="tax-benefit-label">Annual State Tax Benefit</div>
                        <div className="tax-benefit-detail">
                          {inputs.stateTaxBenefit}% benefit on {formatCurrency(inputs.monthlySavings * 12)} contributions
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Recommended Asset Allocation */}
                <div className="allocation-section">
                  <h4>Recommended Asset Allocation</h4>
                  <p className="allocation-description">
                    Based on {results.yearsUntilCollege} years until college enrollment:
                  </p>
                  <div className="allocation-visual">
                    <div className="allocation-bar">
                      <div 
                        className="allocation-stocks"
                        style={{ width: `${allocation.stocks}%` }}
                      ></div>
                      <div 
                        className="allocation-bonds"
                        style={{ width: `${allocation.bonds}%` }}
                      ></div>
                    </div>
                    <div className="allocation-legend">
                      <div className="legend-item">
                        <div className="legend-color stocks"></div>
                        <span>Stocks: {allocation.stocks}%</span>
                      </div>
                      <div className="legend-item">
                        <div className="legend-color bonds"></div>
                        <span>Bonds: {allocation.bonds}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scenario Comparison */}
          <div className="scenarios-section">
            <h3>Savings Strategy Comparison</h3>
            <p className="scenarios-description">
              Compare different investment approaches and savings amounts to optimize your college funding strategy.
            </p>
            
            <div className="scenarios-grid">
              {scenarios.map((scenario, index) => (
                <div key={index} className="scenario-card">
                  <div className="scenario-header" style={{borderTopColor: scenario.color}}>
                    <h4>{scenario.name}</h4>
                    <p>{scenario.description}</p>
                  </div>
                  <div className="scenario-results">
                    <div className="scenario-coverage">
                      <div className="coverage-percentage" style={{color: scenario.color}}>
                        {scenario.results.coveragePercentage.toFixed(1)}%
                      </div>
                      <div className="coverage-label">Coverage</div>
                    </div>
                    <div className="scenario-details">
                      <div className="detail-item">
                        <span className="detail-label">Total Projected:</span>
                        <span className="detail-value">{formatCurrency(scenario.results.totalProjected)}</span>
                      </div>
                      {scenario.results.shortfall > 0 && (
                        <div className="detail-item shortfall">
                          <span className="detail-label">Shortfall:</span>
                          <span className="detail-value">{formatCurrency(scenario.results.shortfall)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Tips */}
          <div className="tips-section">
            <h3>College Savings Success Tips</h3>
            <div className="tips-grid">
              <div className="tip-card">
                <div className="tip-icon">🏦</div>
                <h4>Use 529 Plans</h4>
                <p>529 college savings plans offer tax-free growth and withdrawals for qualified education expenses, plus potential state tax benefits.</p>
              </div>
              
              <div className="tip-card">
                <div className="tip-icon">📈</div>
                <h4>Start Early</h4>
                <p>Time is your biggest ally. Starting when your child is born vs. age 10 can reduce required monthly savings by 60% or more.</p>
              </div>
              
              <div className="tip-card">
                <div className="tip-icon">🎯</div>
                <h4>Age-Based Portfolios</h4>
                <p>Use age-based investment options that automatically shift from aggressive to conservative as college approaches.</p>
              </div>
              
              <div className="tip-card">
                <div className="tip-icon">💰</div>
                <h4>Don't Overfund</h4>
                <p>Aim to cover 50-100% of costs. Your child can contribute through scholarships, grants, work-study, and reasonable student loans.</p>
              </div>
              
              <div className="tip-card">
                <div className="tip-icon">🔄</div>
                <h4>Review Annually</h4>
                <p>Reassess your savings plan yearly. College costs, investment returns, and family income can change significantly.</p>
              </div>
              
              <div className="tip-card">
                <div className="tip-icon">🎓</div>
                <h4>Consider All Options</h4>
                <p>In-state public schools, community college transfers, and merit scholarships can dramatically reduce total education costs.</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="faq-section">
            <h3>Frequently Asked Questions About College Savings</h3>
            <p className="faq-intro">
              Get answers to common questions about 529 plans, college funding strategies, and education savings planning.
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
                  <span>Should I save for college or my retirement first?</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <p><strong>Retirement should generally come first</strong> for these important reasons:</p>
                  <ul>
                    <li>You can borrow money for college, but not for retirement</li>
                    <li>Your child can work, get scholarships, and attend affordable schools</li>
                    <li>Being financially secure in retirement means you won't burden your children later</li>
                    <li>Compound interest works better with more time for retirement savings</li>
                  </ul>
                  <p><strong>Recommended approach:</strong></p>
                  <ol>
                    <li>Get full employer 401k match (free money)</li>
                    <li>Pay off high-interest debt</li>
                    <li>Build emergency fund</li>
                    <li>Save 15% for retirement</li>
                    <li>Then save for children's college</li>
                  </ol>
                  <p>You can balance both goals, but ensure retirement savings don't get shortchanged.</p>
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
                  <span>What are the benefits of 529 college savings plans?</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <p>529 plans offer significant advantages for college savings:</p>
                  <p><strong>Tax Benefits:</strong></p>
                  <ul>
                    <li>Tax-free growth on investments</li>
                    <li>Tax-free withdrawals for qualified education expenses</li>
                    <li>Many states offer tax deductions or credits for contributions</li>
                    <li>No federal income limits for contributors</li>
                  </ul>
                  <p><strong>Flexibility Benefits:</strong></p>
                  <ul>
                    <li>Can be used at any eligible college or university nationwide</li>
                    <li>Covers tuition, fees, room, board, books, and equipment</li>
                    <li>Can be transferred between family members</li>
                    <li>High contribution limits (often $300,000+)</li>
                  </ul>
                  <p><strong>Investment Benefits:</strong></p>
                  <ul>
                    <li>Professional investment management</li>
                    <li>Age-based portfolios that automatically adjust risk</li>
                    <li>Low fees compared to many investment accounts</li>
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
                  <span>How much should I save for my child's college education?</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <p>There's no single "right" answer, but here are guidelines:</p>
                  <p><strong>Full funding approach (100% of costs):</strong></p>
                  <ul>
                    <li>Aim to cover 4 years of projected college costs</li>
                    <li>Provides maximum flexibility and reduces student loan burden</li>
                    <li>Requires highest monthly savings commitment</li>
                  </ul>
                  <p><strong>Partial funding approach (50-75% of costs):</strong></p>
                  <ul>
                    <li>Cover most costs, expect child to contribute through work/scholarships</li>
                    <li>More manageable savings goal for most families</li>
                    <li>Teaches child financial responsibility</li>
                  </ul>
                  <p><strong>Rule of thumb:</strong> Save what you can afford without compromising retirement, emergency fund, or other essential goals. Even $100/month from birth can provide $35,000+ by college age.</p>
                  <p><strong>Remember:</strong> Your child has many funding options (scholarships, grants, work-study, affordable schools, student loans), but you have no options for retirement.</p>
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
                    e.target.value.add('active');
                  }
                }}>
                  <span>What happens if I save too much in a 529 plan?</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <p>Having "too much" in a 529 plan is a good problem to have, and you have several options:</p>
                  <p><strong>Use for qualified expenses:</strong></p>
                  <ul>
                    <li>Graduate school or professional school</li>
                    <li>Trade schools and certificate programs</li>
                    <li>K-12 tuition (up to $10,000/year)</li>
                    <li>Student loan payments (up to $10,000 lifetime)</li>
                  </ul>
                  <p><strong>Transfer to family members:</strong></p>
                  <ul>
                    <li>Siblings, cousins, nieces, nephews</li>
                    <li>Yourself or your spouse for education</li>
                    <li>Even future grandchildren</li>
                  </ul>
                  <p><strong>Non-qualified withdrawals:</strong></p>
                  <ul>
                    <li>You pay income tax + 10% penalty on earnings only</li>
                    <li>Your contributions always come out tax-free</li>
                    <li>Penalty is waived if beneficiary gets scholarships</li>
                  </ul>
                  <p><strong>Strategy:</strong> It's better to save slightly too much than too little. The flexibility of 529 plans makes overfunding less risky than underfunding.</p>
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
                  <span>How do 529 plans affect financial aid eligibility?</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <p>529 plan impact on financial aid depends on the account ownership:</p>
                  <p><strong>Parent-owned 529 plans:</strong></p>
                  <ul>
                    <li>Assessed at 5.64% in aid calculations</li>
                    <li>Much better than regular savings (20% assessment)</li>
                    <li>Distributions not counted as student income</li>
                    <li>This is the most common and favorable structure</li>
                  </ul>
                  <p><strong>Student-owned 529 plans:</strong></p>
                  <ul>
                    <li>Assessed at 20% (same as student savings)</li>
                    <li>Generally not recommended</li>
                    <li>Can be transferred to parent ownership</li>
                  </ul>
                  <p><strong>Grandparent-owned 529 plans:</strong></p>
                  <ul>
                    <li>Not counted as assets in aid calculations</li>
                    <li>But distributions count as student income (50% assessment)</li>
                    <li>Strategy: Wait until after sophomore year to use</li>
                  </ul>
                  <p><strong>Bottom line:</strong> Parent-owned 529 plans have minimal impact on aid eligibility while providing maximum tax benefits.</p>
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
                  <span>When should I start saving for my child's college education?</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <p><strong>The best time to start is as early as possible</strong> - ideally when your child is born or in early elementary school.</p>
                  <p><strong>Why starting early matters:</strong></p>
                  <ul>
                    <li><strong>Compound growth:</strong> More time equals exponentially more growth</li>
                    <li><strong>Lower monthly payments:</strong> Starting at birth vs. age 10 can reduce required savings by 60%</li>
                    <li><strong>Less financial stress:</strong> Smaller monthly amounts are easier to budget</li>
                  </ul>
                  <p><strong>Example comparison for $100,000 college goal:</strong></p>
                  <ul>
                    <li><strong>Start at birth:</strong> $250/month for 18 years</li>
                    <li><strong>Start at age 5:</strong> $400/month for 13 years</li>
                    <li><strong>Start at age 10:</strong> $700/month for 8 years</li>
                    <li><strong>Start at age 14:</strong> $1,500/month for 4 years</li>
                  </ul>
                  <p><strong>But it's never too late:</strong> Even starting when your child is in high school can help reduce student loan burden. Every dollar saved is a dollar not borrowed at high interest rates.</p>
                  <p><strong>If you're behind:</strong> Focus on affordable college options, merit scholarships, and don't compromise your retirement savings.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .college-savings-page {
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
            color: #7c3aed;
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
            background: linear-gradient(135deg, #7c3aed, #6d28d9);
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
            color: #7c3aed;
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
            grid-template-columns: 1fr 1fr;
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
            border-left: 4px solid #7c3aed;
          }

          .input-card h3, .results-card h3 {
            color: #1e293b;
            font-size: 1.6rem;
            margin-bottom: 28px;
            font-weight: 700;
          }

          .input-group {
            margin-bottom: 28px;
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
            border-color: #7c3aed;
            background: white;
            box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
          }

          .input-group select {
            width: 100%;
            padding: 16px;
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            font-size: 1.1rem;
            font-weight: 600;
            color: #1e293b;
            background: #f8fafc;
            transition: all 0.2s ease;
          }

          .input-group select:focus {
            outline: none;
            border-color: #7c3aed;
            background: white;
            box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
          }

          .currency, .percentage, .unit {
            position: absolute;
            color: #64748b;
            font-weight: 600;
            font-size: 1rem;
          }

          .currency {
            left: 16px;
          }

          .percentage, .unit {
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
            background: linear-gradient(135deg, #7c3aed, #6d28d9);
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          }

          .slider::-moz-range-thumb {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: linear-gradient(135deg, #7c3aed, #6d28d9);
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

          .radio-options {
            display: flex;
            gap: 20px;
            margin-top: 12px;
          }

          .radio-option {
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
          }

          .radio-option input[type="radio"] {
            margin: 0;
            width: auto;
            padding: 0;
          }

          .advanced-section, .savings-section {
            margin-top: 36px;
            padding-top: 28px;
            border-top: 2px solid #e2e8f0;
          }

          .advanced-section h4, .savings-section h4 {
            color: #1e293b;
            font-size: 1.2rem;
            margin-bottom: 24px;
            font-weight: 700;
          }

          /* Results Section */
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
            background: linear-gradient(135deg, #f3e8ff, #e9d5ff);
            border-color: #7c3aed;
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

          .result-value.coverage {
            color: #7c3aed;
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
            border-radius: 6px;
            transition: width 0.3s ease;
          }

          .progress-labels {
            display: flex;
            justify-content: space-between;
            font-size: 0.8rem;
            color: #64748b;
          }

          .breakdown-section {
            margin-bottom: 32px;
          }

          .breakdown-section h4 {
            color: #1e293b;
            margin-bottom: 16px;
            font-weight: 700;
          }

          .breakdown-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 12px;
            margin-bottom: 20px;
          }

          .breakdown-item {
            display: flex;
            justify-content: space-between;
            padding: 12px;
            background: #f8fafc;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
          }

          .breakdown-label {
            color: #64748b;
            font-weight: 600;
            font-size: 0.9rem;
          }

          .breakdown-value {
            color: #1e293b;
            font-weight: 700;
            font-size: 0.9rem;
          }

          .breakdown-value.growth {
            color: #059669;
          }

          .shortfall-alert {
            display: flex;
            gap: 16px;
            padding: 20px;
            background: linear-gradient(135deg, #fef2f2, #fecaca);
            border: 2px solid #f87171;
            border-radius: 12px;
            margin-bottom: 16px;
          }

          .success-alert {
            display: flex;
            gap: 16px;
            padding: 20px;
            background: linear-gradient(135deg, #ecfdf5, #d1fae5);
            border: 2px solid #10b981;
            border-radius: 12px;
            margin-bottom: 16px;
          }

          .alert-icon {
            font-size: 1.5rem;
            flex-shrink: 0;
          }

          .alert-content h5 {
            margin: 0 0 8px 0;
            font-weight: 700;
            color: #1e293b;
          }

          .alert-content p {
            margin: 0 0 8px 0;
            color: #374151;
            line-height: 1.5;
          }

          .tax-benefit-section {
            margin-bottom: 32px;
          }

          .tax-benefit-section h4 {
            color: #1e293b;
            margin-bottom: 16px;
            font-weight: 700;
          }

          .tax-benefit-card {
            display: flex;
            gap: 16px;
            padding: 20px;
            background: linear-gradient(135deg, #fefce8, #fef3c7);
            border: 2px solid #f59e0b;
            border-radius: 12px;
          }

          .tax-benefit-icon {
            font-size: 1.8rem;
            flex-shrink: 0;
          }

          .tax-benefit-content {
            flex: 1;
          }

          .tax-benefit-amount {
            font-size: 1.3rem;
            font-weight: 800;
            color: #92400e;
            margin-bottom: 4px;
          }

          .tax-benefit-label {
            color: #92400e;
            font-weight: 600;
            margin-bottom: 4px;
          }

          .tax-benefit-detail {
            color: #b45309;
            font-size: 0.9rem;
          }

          .allocation-section {
            margin-bottom: 32px;
          }

          .allocation-section h4 {
            color: #1e293b;
            margin-bottom: 12px;
            font-weight: 700;
          }

          .allocation-description {
            color: #64748b;
            margin-bottom: 16px;
            line-height: 1.5;
          }

          .allocation-visual {
            background: #f8fafc;
            padding: 20px;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
          }

          .allocation-bar {
            width: 100%;
            height: 20px;
            background: #e2e8f0;
            border-radius: 10px;
            overflow: hidden;
            margin-bottom: 16px;
            display: flex;
          }

          .allocation-stocks {
            background: linear-gradient(135deg, #2563eb, #1d4ed8);
            height: 100%;
          }

          .allocation-bonds {
            background: linear-gradient(135deg, #059669, #047857);
            height: 100%;
          }

          .allocation-legend {
            display: flex;
            gap: 20px;
            justify-content: center;
          }

          .legend-item {
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .legend-color {
            width: 16px;
            height: 16px;
            border-radius: 4px;
          }

          .legend-color.stocks {
            background: linear-gradient(135deg, #2563eb, #1d4ed8);
          }

          .legend-color.bonds {
            background: linear-gradient(135deg, #059669, #047857);
          }

          /* Scenarios Section */
          .scenarios-section {
            background: white;
            border-radius: 20px;
            padding: 36px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            border: 1px solid #e2e8f0;
            margin-bottom: 40px;
          }

          .scenarios-section h3 {
            color: #1e293b;
            margin-bottom: 16px;
            font-weight: 700;
            font-size: 1.8rem;
          }

          .scenarios-description {
            color: #64748b;
            margin-bottom: 32px;
            font-size: 1.1rem;
            line-height: 1.6;
          }

          .scenarios-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 24px;
          }

          .scenario-card {
            background: #f8fafc;
            border-radius: 16px;
            overflow: hidden;
            border: 1px solid #e2e8f0;
            transition: transform 0.2s;
          }

          .scenario-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          }

          .scenario-header {
            padding: 20px;
            border-top: 4px solid;
          }

          .scenario-header h4 {
            color: #1e293b;
            margin-bottom: 8px;
            font-weight: 700;
          }

          .scenario-header p {
            color: #64748b;
            margin: 0;
            font-size: 0.9rem;
          }

          .scenario-results {
            padding: 20px;
            background: white;
            border-top: 1px solid #e2e8f0;
          }

          .scenario-coverage {
            text-align: center;
            margin-bottom: 16px;
          }

          .coverage-percentage {
            font-size: 2rem;
            font-weight: 800;
            margin-bottom: 4px;
          }

          .coverage-label {
            color: #64748b;
            font-size: 0.9rem;
          }

          .scenario-details {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .detail-item {
            display: flex;
            justify-content: space-between;
            font-size: 0.85rem;
          }

          .detail-item.shortfall {
            color: #dc2626;
            font-weight: 600;
          }

          .detail-label {
            color: #64748b;
          }

          .detail-value {
            color: #1e293b;
            font-weight: 600;
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
            border-color: #7c3aed;
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
            background: linear-gradient(135deg, #f3e8ff, #e9d5ff);
            color: #6b21a8;
          }

          .faq-question.active .faq-icon {
            transform: rotate(45deg);
            color: #7c3aed;
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

            .scenarios-grid {
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

            .input-card, .results-card, .scenarios-section, .tips-section, .faq-section {
              padding: 24px;
            }

            .currency-selector {
              flex-direction: column;
              gap: 8px;
            }

            .scenarios-grid {
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

            .breadcrumb {
              font-size: 0.8rem;
            }

            .radio-options {
              flex-direction: column;
              gap: 12px;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default CollegeSavingsCalculator;