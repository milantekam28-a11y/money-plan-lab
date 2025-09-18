// src/pages/calculators/debt/CarLoanCalculator.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../../components/SEO/SEOHead';

const CarLoanCalculator = () => {
  const [inputs, setInputs] = useState({
    carPrice: 25000,
    downPayment: 5000,
    tradeInValue: 0,
    loanTerm: 5,
    interestRate: 6.5,
    salesTax: 8.5,
    fees: 2500
  });

  const [results, setResults] = useState({
    loanAmount: 0,
    monthlyPayment: 0,
    totalPayment: 0,
    totalInterest: 0,
    totalCost: 0
  });

  const [breakdown, setBreakdown] = useState([]);

  useEffect(() => {
    calculateCarLoan();
  }, [inputs]);

  const calculateCarLoan = () => {
    const { carPrice, downPayment, tradeInValue, loanTerm, interestRate, salesTax, fees } = inputs;
    
    // Calculate total car cost including taxes and fees
    const salesTaxAmount = (carPrice * salesTax) / 100;
    const totalCarCost = carPrice + salesTaxAmount + fees;
    
    // Calculate loan amount after down payment and trade-in
    const loanAmount = totalCarCost - downPayment - tradeInValue;
    
    if (loanAmount > 0 && interestRate > 0 && loanTerm > 0) {
      const monthlyRate = interestRate / (12 * 100);
      const numPayments = loanTerm * 12;
      
      // Calculate monthly payment using EMI formula
      const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                           (Math.pow(1 + monthlyRate, numPayments) - 1);
      
      const totalPayment = monthlyPayment * numPayments;
      const totalInterest = totalPayment - loanAmount;
      const totalCost = totalCarCost; // Total cost including down payment

      setResults({
        loanAmount: Math.round(loanAmount),
        monthlyPayment: Math.round(monthlyPayment),
        totalPayment: Math.round(totalPayment),
        totalInterest: Math.round(totalInterest),
        totalCost: Math.round(totalCost)
      });

      // Generate payment breakdown for first year
      generateBreakdown(loanAmount, monthlyRate, monthlyPayment, numPayments);
    } else {
      setResults({
        loanAmount: Math.max(0, loanAmount),
        monthlyPayment: 0,
        totalPayment: 0,
        totalInterest: 0,
        totalCost: totalCarCost
      });
    }
  };

  const generateBreakdown = (principal, monthlyRate, payment, totalPayments) => {
    const schedule = [];
    let balance = principal;

    for (let month = 1; month <= Math.min(12, totalPayments); month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = payment - interestPayment;
      balance = balance - principalPayment;

      schedule.push({
        month,
        payment: Math.round(payment),
        principal: Math.round(principalPayment),
        interest: Math.round(interestPayment),
        balance: Math.round(balance)
      });
    }

    setBreakdown(schedule);
  };

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Debt Calculators', url: '/debt-calculators' },
    { name: 'Car Loan Calculator', url: '/debt-calculators/car-loan-calculator' }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Car Loan Calculator",
    "description": "Professional car loan calculator to calculate auto loan EMI, monthly payments, total interest, and financing costs with taxes and fees",
    "url": "/debt-calculators/car-loan-calculator",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const seoData = {
    title: "Car Loan Calculator - Auto Loan EMI & Monthly Payment Calculator",
    description: "Free professional car loan calculator to calculate auto loan EMI, monthly payments, total interest, and loan affordability with taxes and fees. Compare car financing options and get payment schedules.",
    keywords: "car loan calculator, auto loan calculator, car EMI calculator, vehicle loan calculator, car financing calculator, auto loan EMI, monthly car payment calculator, car loan interest calculator",
    canonicalUrl: "/debt-calculators/car-loan-calculator",
    breadcrumbs: breadcrumbs,
    structuredData: structuredData
  };

  return (
    <>
      <SEOHead {...seoData} />
      
      <div className="car-loan-calculator-page">
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
                <Link to="/debt-calculators">Debt Calculators</Link>
              </li>
              <li className="active">Car Loan Calculator</li>
            </ol>
          </nav>

          {/* Page Header */}
          <div className="page-header">
            <div className="header-badge">
              <span className="header-icon">🚗</span>
              Auto Financing Tool
            </div>
            <h1>Car Loan Calculator</h1>
            <p className="header-subtitle">Calculate Auto Loan EMI, Monthly Payments & Total Financing Costs</p>
            <p className="header-description">
              Professional car loan calculator with comprehensive cost breakdown including taxes, fees, trade-in value, and payment schedules. Compare financing options and make informed auto purchasing decisions.
            </p>
          </div>

          <div className="calculator-layout">
            {/* Input Section */}
            <div className="calculator-inputs">
              <div className="input-card">
                <h3>Vehicle & Loan Details</h3>
                
                <div className="input-group">
                  <label>Vehicle Price (MSRP)</label>
                  <div className="input-wrapper">
                    <span className="currency">$</span>
                    <input
                      type="number"
                      value={inputs.carPrice}
                      onChange={(e) => handleInputChange('carPrice', e.target.value)}
                      placeholder="Enter vehicle price"
                    />
                  </div>
                  <div className="slider-container">
                    <input
                      type="range"
                      min="10000"
                      max="100000"
                      step="2500"
                      value={inputs.carPrice}
                      onChange={(e) => handleInputChange('carPrice', e.target.value)}
                      className="slider"
                    />
                    <div className="slider-labels">
                      <span>$10K</span>
                      <span>$100K</span>
                    </div>
                  </div>
                </div>

                <div className="input-group">
                  <label>Down Payment</label>
                  <div className="input-wrapper">
                    <span className="currency">$</span>
                    <input
                      type="number"
                      value={inputs.downPayment}
                      onChange={(e) => handleInputChange('downPayment', e.target.value)}
                      placeholder="Enter down payment"
                    />
                  </div>
                  <div className="slider-container">
                    <input
                      type="range"
                      min="0"
                      max={inputs.carPrice * 0.5}
                      step="1000"
                      value={inputs.downPayment}
                      onChange={(e) => handleInputChange('downPayment', e.target.value)}
                      className="slider"
                    />
                    <div className="slider-labels">
                      <span>$0</span>
                      <span>{formatCurrency(inputs.carPrice * 0.5)}</span>
                    </div>
                  </div>
                </div>

                <div className="input-group">
                  <label>Trade-in Value (Optional)</label>
                  <div className="input-wrapper">
                    <span className="currency">$</span>
                    <input
                      type="number"
                      value={inputs.tradeInValue}
                      onChange={(e) => handleInputChange('tradeInValue', e.target.value)}
                      placeholder="Enter trade-in value"
                    />
                  </div>
                  <div className="slider-container">
                    <input
                      type="range"
                      min="0"
                      max="25000"
                      step="1000"
                      value={inputs.tradeInValue}
                      onChange={(e) => handleInputChange('tradeInValue', e.target.value)}
                      className="slider"
                    />
                    <div className="slider-labels">
                      <span>$0</span>
                      <span>$25K</span>
                    </div>
                  </div>
                </div>

                <div className="input-group">
                  <label>Annual Interest Rate (%)</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      value={inputs.interestRate}
                      onChange={(e) => handleInputChange('interestRate', e.target.value)}
                      placeholder="Enter interest rate"
                      step="0.1"
                    />
                    <span className="percentage">%</span>
                  </div>
                  <div className="slider-container">
                    <input
                      type="range"
                      min="2"
                      max="12"
                      step="0.25"
                      value={inputs.interestRate}
                      onChange={(e) => handleInputChange('interestRate', e.target.value)}
                      className="slider"
                    />
                    <div className="slider-labels">
                      <span>2%</span>
                      <span>12%</span>
                    </div>
                  </div>
                </div>

                <div className="input-group">
                  <label>Loan Term (years)</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      value={inputs.loanTerm}
                      onChange={(e) => handleInputChange('loanTerm', e.target.value)}
                      placeholder="Enter loan term"
                    />
                    <span className="years">years</span>
                  </div>
                  <div className="slider-container">
                    <input
                      type="range"
                      min="1"
                      max="7"
                      step="1"
                      value={inputs.loanTerm}
                      onChange={(e) => handleInputChange('loanTerm', e.target.value)}
                      className="slider"
                    />
                    <div className="slider-labels">
                      <span>1 year</span>
                      <span>7 years</span>
                    </div>
                  </div>
                </div>

                <div className="additional-costs">
                  <h4>Additional Costs</h4>
                  
                  <div className="input-group-small">
                    <label>Sales Tax (%)</label>
                    <div className="input-wrapper">
                      <input
                        type="number"
                        value={inputs.salesTax}
                        onChange={(e) => handleInputChange('salesTax', e.target.value)}
                        step="0.1"
                      />
                      <span className="percentage">%</span>
                    </div>
                  </div>

                  <div className="input-group-small">
                    <label>Registration & Other Fees</label>
                    <div className="input-wrapper">
                      <span className="currency">$</span>
                      <input
                        type="number"
                        value={inputs.fees}
                        onChange={(e) => handleInputChange('fees', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="calculator-results">
              <div className="results-card">
                <h3>Auto Loan Summary</h3>
                
                <div className="result-item main-result">
                  <div className="result-label">Monthly EMI Payment</div>
                  <div className="result-value emi-amount">
                    {formatCurrency(results.monthlyPayment)}
                  </div>
                </div>

                <div className="cost-breakdown-visual">
                  <h4>Total Cost Breakdown</h4>
                  <div className="cost-items">
                    <div className="cost-item">
                      <span className="cost-label">Vehicle Price</span>
                      <span className="cost-value">{formatCurrency(inputs.carPrice)}</span>
                    </div>
                    <div className="cost-item">
                      <span className="cost-label">Sales Tax ({inputs.salesTax}%)</span>
                      <span className="cost-value">+{formatCurrency((inputs.carPrice * inputs.salesTax) / 100)}</span>
                    </div>
                    <div className="cost-item">
                      <span className="cost-label">Registration & Fees</span>
                      <span className="cost-value">+{formatCurrency(inputs.fees)}</span>
                    </div>
                    <div className="cost-item total">
                      <span className="cost-label">Total Vehicle Cost</span>
                      <span className="cost-value">{formatCurrency(results.totalCost)}</span>
                    </div>
                  </div>
                </div>

                <div className="financing-breakdown">
                  <h4>Financing Structure</h4>
                  <div className="financing-items">
                    <div className="financing-item">
                      <span className="financing-label">Down Payment</span>
                      <span className="financing-value">-{formatCurrency(inputs.downPayment)}</span>
                    </div>
                    {inputs.tradeInValue > 0 && (
                      <div className="financing-item">
                        <span className="financing-label">Trade-in Credit</span>
                        <span className="financing-value">-{formatCurrency(inputs.tradeInValue)}</span>
                      </div>
                    )}
                    <div className="financing-item loan-amount">
                      <span className="financing-label">Financed Amount</span>
                      <span className="financing-value">{formatCurrency(results.loanAmount)}</span>
                    </div>
                  </div>
                </div>

                <div className="result-breakdown">
                  <div className="result-item">
                    <div className="result-label">Total Interest Cost</div>
                    <div className="result-value interest-amount">
                      {formatCurrency(results.totalInterest)}
                    </div>
                  </div>
                  
                  <div className="result-item">
                    <div className="result-label">Total of Payments</div>
                    <div className="result-value">
                      {formatCurrency(results.totalPayment)}
                    </div>
                  </div>
                  
                  <div className="result-item">
                    <div className="result-label">Payment Term</div>
                    <div className="result-value">
                      {inputs.loanTerm * 12} months
                    </div>
                  </div>
                </div>

                {/* Affordability Analysis */}
                <div className="affordability-check">
                  <h4>Affordability Analysis</h4>
                  <p>Financial experts recommend keeping total vehicle expenses (payment + insurance + maintenance) under 20% of monthly income.</p>
                  <div className="income-calculator">
                    <label>Your Monthly Income: </label>
                    <input 
                      type="number" 
                      placeholder="Enter income" 
                      onChange={(e) => {
                        const income = parseFloat(e.target.value) || 0;
                        const ratio = income > 0 ? (results.monthlyPayment / income * 100).toFixed(1) : 0;
                        const ratioElement = e.target.nextElementSibling;
                        if (income > 0) {
                          ratioElement.textContent = `Payment is ${ratio}% of income`;
                          ratioElement.className = `income-ratio ${ratio > 20 ? 'warning' : 'good'}`;
                        } else {
                          ratioElement.textContent = '';
                          ratioElement.className = 'income-ratio';
                        }
                      }}
                    />
                    <span className="income-ratio"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Amortization Schedule */}
          {breakdown.length > 0 && (
            <div className="payment-schedule-section">
              <h3>Payment Schedule (First 12 Months)</h3>
              <p className="schedule-description">
                This amortization schedule shows how your monthly payments are split between principal and interest for the first year.
              </p>
              <div className="schedule-table">
                <div className="table-header">
                  <div>Month</div>
                  <div>Payment</div>
                  <div>Principal</div>
                  <div>Interest</div>
                  <div>Remaining Balance</div>
                </div>
                {breakdown.map((row) => (
                  <div key={row.month} className="table-row">
                    <div>{row.month}</div>
                    <div>{formatCurrency(row.payment)}</div>
                    <div>{formatCurrency(row.principal)}</div>
                    <div>{formatCurrency(row.interest)}</div>
                    <div>{formatCurrency(row.balance)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Professional Tips */}
          <div className="tips-section">
            <h3>Professional Auto Financing Tips</h3>
            <div className="tips-grid">
              <div className="tip-card">
                <div className="tip-icon">💰</div>
                <h4>Optimize Down Payment</h4>
                <p>A 20% down payment reduces monthly costs, eliminates PMI, and prevents negative equity situations. Consider saving longer for a larger down payment.</p>
              </div>
              
              <div className="tip-card">
                <div className="tip-icon">🏪</div>
                <h4>Compare Financing Options</h4>
                <p>Shop rates from banks, credit unions, and dealerships. Pre-approval strengthens your negotiating position and reveals true financing costs.</p>
              </div>
              
              <div className="tip-card">
                <div className="tip-icon">📅</div>
                <h4>Choose Optimal Term Length</h4>
                <p>Shorter terms (3-4 years) minimize interest costs. Longer terms reduce payments but increase total interest and depreciation risks.</p>
              </div>
              
              <div className="tip-card">
                <div className="tip-icon">🔍</div>
                <h4>Focus on Total Cost</h4>
                <p>Don't be swayed by low monthly payments alone. Consider total interest, fees, insurance costs, and long-term value retention.</p>
              </div>
              
              <div className="tip-card">
                <div className="tip-icon">📊</div>
                <h4>Understand True APR</h4>
                <p>The APR includes all financing costs, not just interest. Compare APRs across lenders for accurate cost comparison.</p>
              </div>
              
              <div className="tip-card">
                <div className="tip-icon">🛡️</div>
                <h4>Avoid Unnecessary Add-ons</h4>
                <p>Extended warranties, gap insurance, and dealer packages often have high markups. Research and purchase these separately if needed.</p>
              </div>
            </div>
          </div>

          {/* Comprehensive FAQ Section */}
          <div className="faq-section">
            <h3>Frequently Asked Questions About Car Loans</h3>
            <p className="faq-intro">
              Get answers to the most commonly searched questions about auto loans, car financing, and vehicle EMI calculations.
            </p>
            
            <div className="faq-container">
              <div className="faq-item">
                <button className="faq-question" onClick={(e) => {
                  const answer = e.target.nextElementSibling;
                  const isOpen = answer.style.maxHeight;
                  
                  // Close all other FAQ items
                  document.querySelectorAll('.faq-answer').forEach(item => {
                    item.style.maxHeight = null;
                    item.previousElementSibling.classList.remove('active');
                  });
                  
                  // Toggle current item
                  if (!isOpen) {
                    answer.style.maxHeight = answer.scrollHeight + "px";
                    e.target.classList.add('active');
                  }
                }}>
                  <span>How accurate are online car loan calculators for real financing?</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <p>Our car loan calculator uses bank-standard algorithms and provides highly accurate estimates for monthly payments, total interest, and loan costs. However, final rates depend on your credit score, income, debt-to-income ratio, and lender-specific terms. The calculator gives you a solid baseline for comparing offers and budgeting, but always get pre-approved quotes from multiple lenders for exact terms.</p>
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
                  <span>What's the ideal down payment for a car loan?</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <p><strong>New Cars:</strong> 20% down payment is ideal to avoid negative equity and reduce monthly payments.</p>
                  <p><strong>Used Cars:</strong> 10-15% down payment is typically sufficient, as depreciation is slower.</p>
                  <p><strong>Benefits of larger down payments:</strong></p>
                  <ul>
                    <li>Lower monthly payments and total interest costs</li>
                    <li>Easier loan approval with better terms</li>
                    <li>Protection against negative equity (owing more than car's worth)</li>
                    <li>Reduced risk if you need to sell early</li>
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
                  <span>Should I choose a shorter or longer car loan term?</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <p>The optimal loan term depends on your financial situation:</p>
                  <p><strong>Shorter Terms (2-4 years):</strong></p>
                  <ul>
                    <li>Lower total interest costs</li>
                    <li>Build equity faster</li>
                    <li>Better for your credit utilization</li>
                    <li>Higher monthly payments</li>
                  </ul>
                  <p><strong>Longer Terms (5-7 years):</strong></p>
                  <ul>
                    <li>Lower monthly payments</li>
                    <li>Higher total interest costs</li>
                    <li>Higher risk of negative equity</li>
                    <li>May affect ability to trade-in early</li>
                  </ul>
                  <p><strong>Recommendation:</strong> Choose the shortest term you can comfortably afford to minimize total cost.</p>
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
                  <span>How much car can I afford based on my income?</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <p>Financial experts recommend the following guidelines:</p>
                  <p><strong>20/4/10 Rule:</strong></p>
                  <ul>
                    <li>20% down payment minimum</li>
                    <li>4 years maximum loan term</li>
                    <li>10% of gross income maximum for total vehicle expenses</li>
                  </ul>
                  <p><strong>Conservative Approach:</strong> Total transportation costs (payment + insurance + gas + maintenance) should not exceed 15-20% of take-home pay.</p>
                  <p><strong>Examples by Income:</strong></p>
                  <ul>
                    <li>$50,000 annual income: $15,000-20,000 car budget</li>
                    <li>$75,000 annual income: $22,500-30,000 car budget</li>
                    <li>$100,000 annual income: $30,000-40,000 car budget</li>
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
                  <span>What credit score do I need for the best car loan rates?</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <p>Credit score ranges and typical auto loan rates (rates vary by market conditions):</p>
                  <ul>
                    <li><strong>781-850 (Super Prime):</strong> 2-4% APR - Best rates available</li>
                    <li><strong>661-780 (Prime):</strong> 4-6% APR - Excellent rates with multiple options</li>
                    <li><strong>601-660 (Near Prime):</strong> 6-9% APR - Good rates available</li>
                    <li><strong>501-600 (Subprime):</strong> 9-15% APR - Higher rates, limited options</li>
                    <li><strong>300-500 (Deep Subprime):</strong> 15%+ APR - Specialty lenders required</li>
                  </ul>
                  <p><strong>Tips to improve rates:</strong> Pay down existing debt, check credit reports for errors, consider a co-signer, or wait to improve your score before applying.</p>
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
                  <span>Should I finance through a dealership or external lender?</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <p>Both options have advantages - compare all offers:</p>
                  <p><strong>Dealership Financing:</strong></p>
                  <ul>
                    <li>Convenient one-stop shopping</li>
                    <li>Special manufacturer incentives and rebates</li>
                    <li>May offer promotional rates (0% APR deals)</li>
                    <li>Can negotiate as part of total deal</li>
                    <li>Dealer markup on interest rates possible</li>
                  </ul>
                  <p><strong>Bank/Credit Union Financing:</strong></p>
                  <ul>
                    <li>Often better rates, especially credit unions</li>
                    <li>Direct relationship with lender</li>
                    <li>Pre-approval strengthens negotiating position</li>
                    <li>No dealer markup on rates</li>
                    <li>Separate from vehicle negotiation</li>
                  </ul>
                  <p><strong>Best Strategy:</strong> Get pre-approved from 2-3 external lenders, then compare with dealer financing to choose the best overall deal.</p>
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
                  <span>What additional costs should I budget for when buying a car?</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <p>Beyond the monthly payment, budget for these essential costs:</p>
                  <p><strong>Upfront Costs:</strong></p>
                  <ul>
                    <li>Sales tax (varies by state: 0-10%+ of purchase price)</li>
                    <li>Registration and title fees ($50-500)</li>
                    <li>Documentation fees ($100-800)</li>
                    <li>Extended warranty (optional: $1,000-3,000)</li>
                  </ul>
                  <p><strong>Ongoing Monthly Costs:</strong></p>
                  <ul>
                    <li>Insurance ($100-300+ per month)</li>
                    <li>Fuel costs (varies by vehicle and driving habits)</li>
                    <li>Maintenance and repairs ($50-200+ per month)</li>
                  </ul>
                  <p><strong>Budget Rule:</strong> Total transportation costs should be 15-20% of take-home income, including all the above expenses.</p>
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
                  <span>Is it better to lease or buy a car financially?</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <p>The choice depends on your priorities and financial situation:</p>
                  <p><strong>Buying is Better When:</strong></p>
                  <ul>
                    <li>You want to build equity and ownership</li>
                    <li>You drive more than 12,000-15,000 miles per year</li>
                    <li>You keep vehicles for many years</li>
                    <li>You want freedom to modify the vehicle</li>
                    <li>Long-term cost savings are priority</li>
                  </ul>
                  <p><strong>Leasing is Better When:</strong></p>
                  <ul>
                    <li>You want lower monthly payments</li>
                    <li>You prefer driving newer cars with latest features</li>
                    <li>You drive less than 12,000 miles annually</li>
                    <li>You don't want to deal with maintenance after warranty</li>
                    <li>You like changing vehicles every 2-3 years</li>
                  </ul>
                  <p><strong>Financial Reality:</strong> Buying is almost always cheaper long-term if you keep the car after paying it off. Leasing is essentially renting with perpetual payments.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .car-loan-calculator-page {
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
            color: #059669;
          }

          .breadcrumb .active {
            color: #1e293b;
            font-weight: 600;
          }

          .home-icon {
            display: flex;
            align-items: center;
          }

          /* Enhanced Page Header */
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
            background: linear-gradient(135deg, #059669, #047857);
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
            color: #059669;
            margin-bottom: 16px;
            font-weight: 600;
          }

          .header-description {
            font-size: 1.1rem;
            color: #64748b;
            max-width: 800px;
            margin: 0 auto;
            line-height: 1.6;
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

          .input-group-small {
            margin-bottom: 20px;
          }

          .input-group label, .input-group-small label {
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
            border-color: #059669;
            background: white;
            box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.1);
          }

          .currency, .percentage, .years {
            position: absolute;
            color: #64748b;
            font-weight: 600;
            font-size: 1rem;
          }

          .currency {
            left: 16px;
          }

          .percentage, .years {
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
            background: linear-gradient(135deg, #059669, #047857);
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          }

          .slider::-moz-range-thumb {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: linear-gradient(135deg, #059669, #047857);
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

          .additional-costs {
            margin-top: 36px;
            padding-top: 28px;
            border-top: 2px solid #e2e8f0;
          }

          .additional-costs h4 {
            color: #1e293b;
            font-size: 1.2rem;
            margin-bottom: 24px;
            font-weight: 600;
          }

          .result-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 0;
          }

          .main-result {
            background: linear-gradient(135deg, #059669, #047857);
            color: white;
            padding: 28px;
            border-radius: 16px;
            margin-bottom: 28px;
            text-align: center;
          }

          .main-result .result-label {
            font-size: 1.1rem;
            opacity: 0.95;
            margin-bottom: 8px;
          }

          .emi-amount {
            font-size: 2.4rem;
            font-weight: 800;
          }

          .cost-breakdown-visual, .financing-breakdown {
            margin-bottom: 28px;
            padding: 24px;
            background: #f8fafc;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
          }

          .cost-breakdown-visual h4, .financing-breakdown h4 {
            color: #1e293b;
            font-size: 1.1rem;
            margin-bottom: 18px;
            font-weight: 600;
          }

          .cost-items, .financing-items {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .cost-item, .financing-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.95rem;
          }

          .cost-item.total, .financing-item.loan-amount {
            border-top: 1px solid #d1d5db;
            padding-top: 12px;
            margin-top: 10px;
            font-weight: 700;
            color: #1e293b;
          }

          .cost-label, .financing-label {
            color: #64748b;
          }

          .cost-value, .financing-value {
            color: #1e293b;
            font-weight: 600;
          }

          .result-breakdown {
            border-top: 2px solid #e2e8f0;
            padding-top: 20px;
            margin-bottom: 28px;
          }

          .result-breakdown .result-item {
            border-bottom: 1px solid #f1f5f9;
            padding: 14px 0;
          }

          .result-label {
            color: #64748b;
            font-weight: 600;
          }

          .result-value {
            color: #1e293b;
            font-weight: 700;
            font-size: 1.2rem;
          }

          .interest-amount {
            color: #dc2626;
          }

          .affordability-check {
            background: linear-gradient(135deg, #fef3c7, #fde68a);
            padding: 24px;
            border-radius: 12px;
            border: 2px solid #f59e0b;
          }

          .affordability-check h4 {
            color: #92400e;
            margin-bottom: 12px;
            font-weight: 700;
          }

          .affordability-check p {
            color: #92400e;
            margin-bottom: 18px;
            font-size: 0.95rem;
            line-height: 1.6;
          }

          .income-calculator {
            display: flex;
            align-items: center;
            gap: 12px;
            flex-wrap: wrap;
          }

          .income-calculator label {
            color: #92400e;
            font-weight: 600;
            font-size: 0.95rem;
            white-space: nowrap;
          }

          .income-calculator input {
            padding: 10px 14px;
            border: 2px solid #f59e0b;
            border-radius: 8px;
            font-size: 0.95rem;
            width: 140px;
            font-weight: 600;
          }

          .income-ratio {
            color: #92400e;
            font-weight: 700;
            font-size: 0.9rem;
          }

          .income-ratio.good {
            color: #047857;
          }

          .income-ratio.warning {
            color: #dc2626;
          }

          .payment-schedule-section, .tips-section, .faq-section {
            background: white;
            border-radius: 20px;
            padding: 36px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            border: 1px solid #e2e8f0;
            margin-bottom: 40px;
          }

          .payment-schedule-section h3, .tips-section h3, .faq-section h3 {
            color: #1e293b;
            margin-bottom: 20px;
            font-weight: 700;
            font-size: 1.8rem;
          }

          .schedule-description {
            color: #64748b;
            margin-bottom: 24px;
            line-height: 1.6;
          }

          .schedule-table {
            overflow-x: auto;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
          }

          .table-header, .table-row {
            display: grid;
            grid-template-columns: 80px 1fr 1fr 1fr 1.2fr;
            gap: 16px;
            padding: 14px 16px;
            align-items: center;
          }

          .table-header {
            font-weight: 700;
            color: #374151;
            background: #f8fafc;
            border-bottom: 2px solid #e2e8f0;
          }

          .table-row {
            border-bottom: 1px solid #f1f5f9;
            transition: background 0.2s;
          }

          .table-row:hover {
            background: #f8fafc;
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

          /* FAQ Section Styles */
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
            border-color: #059669;
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
            color: #059669;
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

            .input-card, .results-card, .payment-schedule-section, .tips-section, .faq-section {
              padding: 24px;
            }

            .emi-amount {
              font-size: 2rem;
            }

            .income-calculator {
              flex-direction: column;
              align-items: flex-start;
              gap: 12px;
            }

            .table-header, .table-row {
              grid-template-columns: 60px 1fr 1fr 1fr 1fr;
              gap: 8px;
              padding: 12px;
              font-size: 0.9rem;
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

            .calculator-layout {
              gap: 20px;
            }

            .input-card, .results-card {
              padding: 20px;
            }

            .table-header, .table-row {
              grid-template-columns: 50px 80px 80px 80px 90px;
              gap: 4px;
              padding: 10px 8px;
              font-size: 0.8rem;
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

export default CarLoanCalculator;