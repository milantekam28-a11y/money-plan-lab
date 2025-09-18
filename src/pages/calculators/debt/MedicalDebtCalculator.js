import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, Percent, Clock, Globe, Home, ChevronRight, Heart, Activity, FileText } from 'lucide-react';

const MedicalDebtCalculator = () => {
  // States
  const [totalBalance, setTotalBalance] = useState('15000');
  const [interestRate, setInterestRate] = useState('0');
  const [monthlyPayment, setMonthlyPayment] = useState('300');
  const [negotiatedDiscount, setNegotiatedDiscount] = useState('0');
  const [currency, setCurrency] = useState('USD');
  const [paymentPlanType, setPaymentPlanType] = useState('fixed');
  const [results, setResults] = useState(null);

  // Global currencies with focus on countries with major healthcare systems
  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
    { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
    { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
    { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc' },
    { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar' },
    { code: 'MXN', symbol: '$', name: 'Mexican Peso' },
    { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
    { code: 'ZAR', symbol: 'R', name: 'South African Rand' }
  ];

  // Get current currency
  const currentCurrency = currencies.find(c => c.code === currency) || currencies[0];

  // Format currency
  const formatMoney = (amount) => {
    const formatted = new Intl.NumberFormat('en-US').format(Math.round(amount));
    return `${currentCurrency.symbol}${formatted}`;
  };

  // Calculate Medical Debt Payoff
  const calculatePayoff = () => {
    const balance = parseFloat(totalBalance);
    const monthlyRate = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
    const payment = parseFloat(monthlyPayment);
    const discount = parseFloat(negotiatedDiscount) / 100;

    if (balance <= 0 || payment <= 0) {
      setResults(null);
      return;
    }

    // Apply negotiated discount to principal
    const adjustedBalance = balance * (1 - discount);
    
    // Calculate standard payment scenario
    let remainingBalance = adjustedBalance;
    let totalMonths = 0;
    let totalPaid = 0;
    let totalInterest = 0;

    if (monthlyRate === 0) {
      // No interest calculation
      totalMonths = Math.ceil(remainingBalance / payment);
      totalPaid = remainingBalance;
      totalInterest = 0;
    } else {
      // With interest calculation
      while (remainingBalance > 0.01 && totalMonths < 600) { // 50 years max
        const interestCharge = remainingBalance * monthlyRate;
        const principalPayment = Math.min(payment - interestCharge, remainingBalance);
        
        if (principalPayment <= 0) break; // Payment less than interest
        
        remainingBalance -= principalPayment;
        totalPaid += payment;
        totalInterest += interestCharge;
        totalMonths++;
      }
    }

    // Calculate accelerated payment scenario (50% more)
    const acceleratedPayment = payment * 1.5;
    let acceleratedBalance = adjustedBalance;
    let acceleratedMonths = 0;
    let acceleratedTotalPaid = 0;
    let acceleratedInterest = 0;

    if (monthlyRate === 0) {
      acceleratedMonths = Math.ceil(acceleratedBalance / acceleratedPayment);
      acceleratedTotalPaid = acceleratedBalance;
      acceleratedInterest = 0;
    } else {
      while (acceleratedBalance > 0.01 && acceleratedMonths < 600) {
        const interestCharge = acceleratedBalance * monthlyRate;
        const principalPayment = Math.min(acceleratedPayment - interestCharge, acceleratedBalance);
        
        if (principalPayment <= 0) break;
        
        acceleratedBalance -= principalPayment;
        acceleratedTotalPaid += Math.min(acceleratedPayment, acceleratedBalance + interestCharge + principalPayment);
        acceleratedInterest += interestCharge;
        acceleratedMonths++;
      }
    }

    const timeSaved = totalMonths - acceleratedMonths;
    const interestSaved = totalInterest - acceleratedInterest;
    const discountSaved = balance * discount;

    setResults({
      originalBalance: balance,
      adjustedBalance: adjustedBalance,
      discountSaved: discountSaved,
      standardMonths: totalMonths,
      standardYears: (totalMonths / 12).toFixed(1),
      standardTotalPaid: totalPaid,
      standardInterest: totalInterest,
      acceleratedMonths: acceleratedMonths,
      acceleratedYears: (acceleratedMonths / 12).toFixed(1),
      acceleratedTotalPaid: acceleratedTotalPaid,
      acceleratedInterest: acceleratedInterest,
      timeSaved: timeSaved,
      interestSaved: interestSaved,
      monthlyPayment: payment,
      acceleratedPayment: acceleratedPayment
    });
  };

  // Calculate on input change
  useEffect(() => {
    calculatePayoff();
  }, [totalBalance, interestRate, monthlyPayment, negotiatedDiscount, currency, paymentPlanType]);

  // Navigation function
  const goHome = () => window.location.href = '/';

  return (
    <div className="medical-debt-calculator">
      {/* Breadcrumbs */}
      <nav className="breadcrumb">
        <div className="container">
          <div className="breadcrumb-path">
            <button onClick={goHome} className="breadcrumb-link">
              <Home size={14} />
              Home
            </button>
            <ChevronRight size={14} className="separator" />
            <a href="/debt-calculators" className="breadcrumb-link">
              Debt Calculators
            </a>
            <ChevronRight size={14} className="separator" />
            <span className="breadcrumb-current">Medical Debt Calculator</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-icon">
              <Heart size={48} />
            </div>
            <h1>Medical Debt Calculator</h1>
            <p>Navigate unexpected healthcare bills with smart payment strategies and negotiation tools</p>
            <div className="badges">
              <span className="badge">Healthcare Bill Manager</span>
              <span className="badge">Payment Plans</span>
              <span className="badge">Negotiation Helper</span>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="calculator-section">
        <div className="container">
          <div className="calculator-grid">
            
            {/* Input Panel */}
            <div className="input-panel">
              <h2>Medical Bill Details</h2>
              
              {/* Currency Selector */}
              <div className="input-group">
                <label>
                  <Globe size={18} />
                  Currency
                </label>
                <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                  {currencies.map(curr => (
                    <option key={curr.code} value={curr.code}>
                      {curr.symbol} {curr.name} ({curr.code})
                    </option>
                  ))}
                </select>
                <small>Selected: {currentCurrency.name}</small>
              </div>

              {/* Total Medical Debt */}
              <div className="input-group">
                <label>
                  <FileText size={18} />
                  Total Medical Debt ({currentCurrency.symbol})
                </label>
                <input
                  type="number"
                  value={totalBalance}
                  onChange={(e) => setTotalBalance(e.target.value)}
                  placeholder="15000"
                />
                <small>Total outstanding medical bills and hospital charges</small>
              </div>

              {/* Interest Rate */}
              <div className="input-group">
                <label>
                  <Percent size={18} />
                  Interest Rate (Annual %)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  placeholder="0"
                />
                <small>Many medical debts have 0% interest if paid per agreement</small>
              </div>

              {/* Monthly Payment */}
              <div className="input-group">
                <label>
                  <DollarSign size={18} />
                  Monthly Payment ({currentCurrency.symbol})
                </label>
                <input
                  type="number"
                  value={monthlyPayment}
                  onChange={(e) => setMonthlyPayment(e.target.value)}
                  placeholder="300"
                />
                <small>Amount you can afford to pay monthly</small>
              </div>

              {/* Negotiated Discount */}
              <div className="input-group">
                <label>
                  <Activity size={18} />
                  Negotiated Discount (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  max="80"
                  value={negotiatedDiscount}
                  onChange={(e) => setNegotiatedDiscount(e.target.value)}
                  placeholder="0"
                />
                <small>Discount percentage negotiated with healthcare provider</small>
              </div>

              {/* Payment Plan Type */}
              <div className="input-group">
                <label>
                  <Calculator size={18} />
                  Payment Plan Type
                </label>
                <select value={paymentPlanType} onChange={(e) => setPaymentPlanType(e.target.value)}>
                  <option value="fixed">Fixed Monthly Payment</option>
                  <option value="graduated">Graduated Payment Plan</option>
                  <option value="income-based">Income-Based Payment</option>
                  <option value="lump-sum">Lump Sum Settlement</option>
                </select>
                <small>Type of payment arrangement with provider</small>
              </div>

              {/* Strategy Info */}
              <div className="formula-info">
                <h3>Medical Debt Strategy</h3>
                <div className="formula">Negotiate First + Pay Smart = Maximum Savings</div>
                <ul>
                  <li><strong>Negotiate Early</strong> - Providers often accept less</li>
                  <li><strong>Ask for Itemized Bills</strong> - Check for errors</li>
                  <li><strong>Payment Plans</strong> - Often 0% interest available</li>
                  <li><strong>Financial Hardship</strong> - May qualify for assistance</li>
                </ul>
              </div>
            </div>

            {/* Results Panel */}
            <div className="results-panel">
              <h2>Payment Strategy Results</h2>
              
              {results ? (
                <div className="results">
                  {/* Main Result */}
                  <div className="result-card main-result">
                    <div className="result-icon">
                      <Heart size={32} />
                    </div>
                    <div className="result-content">
                      <h3>Total Potential Savings</h3>
                      <div className="amount">{formatMoney(results.discountSaved + results.interestSaved)}</div>
                      <p>Through negotiation and smart payments</p>
                    </div>
                  </div>

                  {/* Discount Savings */}
                  {results.discountSaved > 0 && (
                    <div className="savings-card">
                      <h3>Negotiation Savings</h3>
                      <div className="savings-amount">{formatMoney(results.discountSaved)}</div>
                      <p>Saved through {negotiatedDiscount}% negotiated discount</p>
                    </div>
                  )}

                  {/* Comparison Results */}
                  <div className="comparison-grid">
                    <div className="comparison-card standard">
                      <h3>Standard Payment Plan</h3>
                      <div className="comparison-stat">
                        <label>Payoff Time:</label>
                        <span>{results.standardYears} years ({results.standardMonths} months)</span>
                      </div>
                      <div className="comparison-stat">
                        <label>Monthly Payment:</label>
                        <span>{formatMoney(results.monthlyPayment)}</span>
                      </div>
                      <div className="comparison-stat">
                        <label>Total Interest:</label>
                        <span className="interest">{formatMoney(results.standardInterest)}</span>
                      </div>
                      <div className="comparison-stat">
                        <label>Total Paid:</label>
                        <span>{formatMoney(results.standardTotalPaid)}</span>
                      </div>
                    </div>

                    <div className="comparison-card accelerated">
                      <h3>Accelerated Payment (+50%)</h3>
                      <div className="comparison-stat">
                        <label>Payoff Time:</label>
                        <span>{results.acceleratedYears} years ({results.acceleratedMonths} months)</span>
                      </div>
                      <div className="comparison-stat">
                        <label>Monthly Payment:</label>
                        <span>{formatMoney(results.acceleratedPayment)}</span>
                      </div>
                      <div className="comparison-stat">
                        <label>Total Interest:</label>
                        <span className="interest">{formatMoney(results.acceleratedInterest)}</span>
                      </div>
                      <div className="comparison-stat">
                        <label>Total Paid:</label>
                        <span>{formatMoney(results.acceleratedTotalPaid)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="summary">
                    <h3>Medical Debt Summary</h3>
                    <div className="summary-grid">
                      <div className="summary-item">
                        <span>Original Medical Bill:</span>
                        <strong>{formatMoney(results.originalBalance)}</strong>
                      </div>
                      <div className="summary-item">
                        <span>After Negotiation:</span>
                        <strong>{formatMoney(results.adjustedBalance)}</strong>
                      </div>
                      <div className="summary-item">
                        <span>Interest Rate:</span>
                        <strong>{interestRate}% Annual</strong>
                      </div>
                      <div className="summary-item savings">
                        <span>Time Saved (Accelerated):</span>
                        <strong>{results.timeSaved} months ({(results.timeSaved / 12).toFixed(1)} years)</strong>
                      </div>
                      <div className="summary-item savings">
                        <span>Interest Saved:</span>
                        <strong>{formatMoney(results.interestSaved)}</strong>
                      </div>
                      {results.discountSaved > 0 && (
                        <div className="summary-item savings">
                          <span>Negotiation Discount:</span>
                          <strong>{formatMoney(results.discountSaved)}</strong>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Items */}
                  <div className="action-items">
                    <h3>Next Steps</h3>
                    <div className="action-list">
                      <div className="action-item">
                        <strong>1. Review Bills Carefully</strong>
                        <p>Request itemized statements and check for billing errors</p>
                      </div>
                      <div className="action-item">
                        <strong>2. Contact Billing Department</strong>
                        <p>Negotiate payment plans or hardship discounts</p>
                      </div>
                      <div className="action-item">
                        <strong>3. Set Up Payment Plan</strong>
                        <p>Arrange affordable monthly payments to avoid collections</p>
                      </div>
                      <div className="action-item">
                        <strong>4. Explore Financial Assistance</strong>
                        <p>Ask about hospital charity care or patient assistance programs</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="no-results">
                  <Heart size={64} />
                  <h3>Enter your medical debt details</h3>
                  <p>Fill in your medical bill amount and payment capacity to see your payoff strategy and negotiation opportunities</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="seo-content">
        <div className="container">
          <div className="content-wrapper">
            
            <h2>Navigate Medical Debt with Smart Payment Strategies and Bill Negotiation</h2>
            
            <p>
              A <strong>medical debt calculator</strong> is an essential financial tool for anyone facing unexpected <strong>healthcare bills</strong> and seeking the most effective path to resolution without damaging their financial future. Medical debt differs significantly from other types of consumer debt, often carrying little to no interest and offering unique negotiation opportunities that many patients don't realize exist. Our comprehensive <strong>medical bill calculator</strong> helps you understand payment timelines, negotiation potential, and the impact of different payment strategies on your overall financial health. Unlike credit card debt, medical debt often provides more flexible payment options and forgiveness programs, making strategic planning crucial for optimal outcomes.
            </p>

            <p>
              The landscape of <strong>medical debt management</strong> varies significantly across different healthcare systems worldwide. In countries with universal healthcare like Canada, the UK, or Australia, medical debt primarily concerns supplementary treatments, dental care, or private healthcare services. However, in systems like the United States, medical debt represents the leading cause of personal bankruptcy, with even insured patients facing substantial out-of-pocket expenses. Our <strong>healthcare bill calculator</strong> addresses these global differences by supporting multiple currencies and providing strategies relevant to different healthcare payment structures. Understanding your rights and options, from hardship programs to payment plan negotiations, can save thousands in unnecessary payments and protect your credit rating.
            </p>

            <p>
              Effective <strong>medical debt negotiation</strong> strategies include requesting itemized bills to identify potential errors, negotiating upfront discounts for immediate payment, and exploring hospital charity care programs that many patients qualify for but never access. Studies show that healthcare providers often accept 20-60% less than the original bill amount, especially when patients demonstrate financial hardship or offer prompt payment. Our calculator incorporates these negotiation possibilities, showing how upfront discounts combined with strategic payment planning can dramatically reduce your total financial obligation. Remember that medical debt rarely carries the high interest rates of credit cards, giving you more time to negotiate and arrange affordable payment terms.
            </p>

            <p>
              Beyond basic calculations, successful medical debt resolution requires understanding patient rights, billing practices, and available assistance programs. Many hospitals are required by law to offer charity care or payment plans, yet this information isn't always prominently disclosed to patients. Our <strong>medical debt payment calculator</strong> helps you model various scenarios, from standard payment plans to accelerated payoff strategies, ensuring you choose the approach that best fits your financial situation. Additionally, consider the impact on credit scores, as medical debt reporting rules have changed in many countries, often providing more protection for patients than other types of debt. Always verify any payment agreements in writing and maintain detailed records of all communications with healthcare providers and billing companies.
            </p>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          
          <div className="faq-grid">
            
            <div className="faq-item">
              <h3>How is medical debt different from other types of debt?</h3>
              <p>Medical debt often carries little to no interest, offers more negotiation opportunities, and has different credit reporting rules. Many healthcare providers are willing to arrange payment plans or accept reduced amounts, especially for patients experiencing financial hardship.</p>
            </div>

            <div className="faq-item">
              <h3>Can I negotiate my medical bills?</h3>
              <p>Yes, medical bills are often negotiable. Hospitals and providers frequently accept 20-60% less than the original amount, particularly for uninsured patients or those demonstrating financial hardship. Always request itemized bills and ask about charity care programs or payment discounts.</p>
            </div>

            <div className="faq-item">
              <h3>What should I do if I receive a large medical bill?</h3>
              <p>Don't panic or ignore it. First, verify insurance coverage and request an itemized statement to check for errors. Contact the billing department to discuss payment options, hardship programs, or potential discounts. Many providers offer interest-free payment plans.</p>
            </div>

            <div className="faq-item">
              <h3>Do medical bills affect my credit score?</h3>
              <p>Medical debt reporting rules have evolved to be more patient-friendly. In many countries, medical debt must be significantly delinquent before appearing on credit reports, and paid medical collections may be removed more quickly than other types of debt.</p>
            </div>

            <div className="faq-item">
              <h3>What are medical debt payment plans?</h3>
              <p>Payment plans allow you to spread medical debt over time, often with no interest charges. Plans can be customized based on your financial capacity, with some providers offering graduated payments that start low and increase over time as your situation improves.</p>
            </div>

            <div className="faq-item">
              <h3>Can hospitals provide financial assistance?</h3>
              <p>Many hospitals, especially non-profit ones, are required to offer charity care or financial hardship programs. These can reduce or even eliminate bills for qualifying patients. Income limits vary, but programs often help patients earning up to 400% of the federal poverty level.</p>
            </div>

            <div className="faq-item">
              <h3>Should I use credit cards to pay medical bills?</h3>
              <p>Generally avoid using credit cards for medical debt. Medical debt typically has better terms than credit cards - often 0% interest and more negotiation flexibility. Using credit cards converts favorable medical debt into high-interest consumer debt with fewer protections.</p>
            </div>

            <div className="faq-item">
              <h3>How can I verify my medical bills are accurate?</h3>
              <p>Request itemized statements showing each service, procedure, and medication. Compare these against your medical records and insurance explanations of benefits. Common errors include duplicate charges, incorrect procedure codes, and services you didn't receive.</p>
            </div>

            <div className="faq-item">
              <h3>What happens if I can't pay my medical debt?</h3>
              <p>Contact providers immediately to arrange payment plans or discuss hardship options. Ignored medical debt can eventually go to collections or legal action, but most providers prefer to work with patients rather than pursue aggressive collection tactics.</p>
            </div>

            <div className="faq-item">
              <h3>Is medical debt the same in all countries?</h3>
              <p>No, medical debt varies significantly by healthcare system. Countries with universal healthcare typically have minimal medical debt, while others may have substantial out-of-pocket expenses. Our calculator supports multiple currencies to address these global differences.</p>
            </div>

          </div>
        </div>
      </section>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .medical-debt-calculator {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          line-height: 1.6;
          color: #333;
          background: #f8fafc;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Breadcrumb */
        .breadcrumb {
          background: white;
          border-bottom: 1px solid #e2e8f0;
          padding: 15px 0;
        }

        .breadcrumb .container {
          display: flex;
          align-items: center;
        }

        .breadcrumb-path {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
        }

        .breadcrumb-link {
          display: flex;
          align-items: center;
          gap: 4px;
          background: none;
          border: none;
          color: #64748b;
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 4px;
          transition: color 0.2s;
          text-decoration: none;
        }

        .breadcrumb-link:hover {
          color: #dc2626;
          background: #fef2f2;
        }

        .breadcrumb-current {
          color: #dc2626;
          font-weight: 600;
          padding: 4px 8px;
        }

        .separator {
          color: #cbd5e1;
        }

        /* Hero */
        .hero {
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
          color: white;
          padding: 80px 0;
          text-align: center;
        }

        .hero-content {
          max-width: 600px;
          margin: 0 auto;
        }

        .hero-icon {
          width: 80px;
          height: 80px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
          backdrop-filter: blur(10px);
        }

        .hero h1 {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 16px;
          line-height: 1.1;
        }

        .hero p {
          font-size: 1.25rem;
          margin-bottom: 32px;
          opacity: 0.9;
        }

        .badges {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .badge {
          background: rgba(255, 255, 255, 0.2);
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          backdrop-filter: blur(10px);
        }

        /* Calculator */
        .calculator-section {
          padding: 80px 0;
        }

        .calculator-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
        }

        .input-panel, .results-panel {
          background: white;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
        }

        .input-panel h2, .results-panel h2 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 32px;
          color: #1e293b;
          text-align: center;
        }

        .input-group {
          margin-bottom: 24px;
        }

        .input-group label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          margin-bottom: 8px;
          color: #374151;
        }

        .input-group input, .input-group select {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.2s;
          background: #f8fafc;
        }

        .input-group input:focus, .input-group select:focus {
          outline: none;
          border-color: #dc2626;
          background: white;
        }

        .input-group small {
          display: block;
          margin-top: 4px;
          color: #64748b;
          font-size: 0.875rem;
        }

        .formula-info {
          background: #fef2f2;
          padding: 20px;
          border-radius: 12px;
          border: 1px solid #fecaca;
          margin-top: 24px;
        }

        .formula-info h3 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 12px;
          color: #991b1b;
        }

        .formula {
          background: white;
          padding: 12px;
          border-radius: 6px;
          font-family: 'Courier New', monospace;
          font-weight: 600;
          color: #dc2626;
          margin-bottom: 12px;
          text-align: center;
        }

        .formula-info ul {
          list-style: none;
          font-size: 0.875rem;
          color: #7f1d1d;
        }

        .formula-info li {
          margin-bottom: 4px;
        }

        /* Results */
        .results {
          text-align: center;
        }

        .main-result {
          background: linear-gradient(135deg, #dc2626, #b91c1c);
          color: white;
          padding: 30px;
          border-radius: 16px;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .result-icon {
          width: 80px;
          height: 80px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(10px);
        }

        .result-content {
          flex: 1;
          text-align: left;
        }

        .result-content h3 {
          font-size: 1rem;
          margin-bottom: 8px;
          opacity: 0.9;
        }

        .amount {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 4px;
        }

        .result-content p {
          opacity: 0.8;
          font-size: 0.9rem;
        }

        .savings-card {
          background: linear-gradient(135deg, #059669, #047857);
          color: white;
          padding: 24px;
          border-radius: 12px;
          margin-bottom: 24px;
          text-align: center;
        }

        .savings-card h3 {
          font-size: 1rem;
          margin-bottom: 12px;
          opacity: 0.9;
        }

        .savings-amount {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .comparison-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 32px;
        }

        .comparison-card {
          background: #f8fafc;
          padding: 24px;
          border-radius: 12px;
          border: 2px solid #e2e8f0;
        }

        .comparison-card.standard {
          border-color: #fbbf24;
          background: #fffbeb;
        }

        .comparison-card.accelerated {
          border-color: #34d399;
          background: #ecfdf5;
        }

        .comparison-card h3 {
          font-size: 1rem;
          margin-bottom: 16px;
          color: #1e293b;
          text-align: center;
          font-weight: 600;
        }

        .comparison-stat {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          font-size: 0.9rem;
        }

        .comparison-stat label {
          color: #64748b;
          font-weight: 500;
        }

        .comparison-stat span {
          color: #1e293b;
          font-weight: 600;
        }

        .comparison-stat .interest {
          color: #dc2626;
          font-weight: 700;
        }

        .summary {
          background: #f1f5f9;
          padding: 24px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          margin-bottom: 24px;
        }

        .summary h3 {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 16px;
          color: #1e293b;
        }

        .summary-grid {
          display: grid;
          gap: 12px;
        }

        .summary-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid #e2e8f0;
        }

        .summary-item:last-child {
          border-bottom: none;
        }

        .summary-item.savings {
          background: #ecfdf5;
          padding: 12px;
          border-radius: 8px;
          border: 1px solid #bbf7d0;
          margin-top: 8px;
        }

        .summary-item.savings strong {
          color: #059669;
          font-weight: 700;
        }

        .summary-item span {
          color: #64748b;
          font-size: 0.9rem;
        }

        .summary-item strong {
          color: #1e293b;
          font-weight: 600;
        }

        .action-items {
          background: #f8fafc;
          padding: 24px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }

        .action-items h3 {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 16px;
          color: #1e293b;
        }

        .action-list {
          display: grid;
          gap: 12px;
        }

        .action-item {
          background: white;
          padding: 16px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
        }

        .action-item strong {
          color: #dc2626;
          font-size: 0.9rem;
          display: block;
          margin-bottom: 4px;
        }

        .action-item p {
          color: #64748b;
          font-size: 0.85rem;
          margin: 0;
        }

        .no-results {
          text-align: center;
          padding: 60px 20px;
          color: #64748b;
        }

        .no-results h3 {
          margin: 20px 0 8px;
          color: #374151;
        }

        /* SEO Content */
        .seo-content {
          padding: 80px 0;
          background: white;
          border-top: 1px solid #e2e8f0;
        }

        .content-wrapper {
          max-width: 900px;
          margin: 0 auto;
        }

        .seo-content h2 {
          font-size: 2.25rem;
          font-weight: 800;
          color: #1e293b;
          margin-bottom: 32px;
          text-align: center;
          line-height: 1.2;
        }

        .seo-content p {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #374151;
          margin-bottom: 24px;
          text-align: justify;
        }

        .seo-content strong {
          color: #dc2626;
          font-weight: 600;
        }

        /* FAQ */
        .faq-section {
          padding: 80px 0;
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
        }

        .faq-section h2 {
          font-size: 2rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 40px;
          text-align: center;
        }

        .faq-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 24px;
        }

        .faq-item {
          background: white;
          padding: 24px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .faq-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          border-color: #dc2626;
        }

        .faq-item h3 {
          font-size: 1.1rem;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 12px;
          line-height: 1.4;
        }

        .faq-item p {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #64748b;
          margin: 0;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .breadcrumb-path {
            flex-wrap: wrap;
            gap: 6px;
          }

          .breadcrumb-link, .breadcrumb-current {
            font-size: 13px;
            padding: 2px 6px;
          }

          .separator {
            margin: 0 2px;
          }

          .hero h1 {
            font-size: 2.25rem;
          }

          .hero p {
            font-size: 1.1rem;
          }

          .calculator-section {
            padding: 60px 0;
          }

          .calculator-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .input-panel, .results-panel {
            padding: 24px;
          }

          .main-result {
            flex-direction: column;
            text-align: center;
          }

          .result-content {
            text-align: center;
          }

          .comparison-grid {
            grid-template-columns: 1fr;
          }

          .seo-content {
            padding: 60px 0;
          }

          .seo-content h2 {
            font-size: 1.75rem;
          }

          .seo-content p {
            font-size: 1rem;
            text-align: left;
          }

          .faq-section {
            padding: 60px 0;
          }

          .faq-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 0 16px;
          }

          .hero {
            padding: 60px 0;
          }

          .hero h1 {
            font-size: 2rem;
          }

          .input-panel, .results-panel {
            padding: 20px;
          }

          .amount {
            font-size: 2rem;
          }

          .savings-amount {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default MedicalDebtCalculator;