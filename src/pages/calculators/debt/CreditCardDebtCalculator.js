import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, Percent, Clock, Globe, Home, ChevronRight, CreditCard, Zap } from 'lucide-react';

const CreditCardDebtCalculator = () => {
  // States
  const [currentBalance, setCurrentBalance] = useState('5000');
  const [interestRate, setInterestRate] = useState('18.99');
  const [minimumPayment, setMinimumPayment] = useState('150');
  const [extraPayment, setExtraPayment] = useState('0');
  const [currency, setCurrency] = useState('USD');
  const [results, setResults] = useState(null);

  // Currency list
  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
    { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
    { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
    { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc' },
    { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar' }
  ];

  // Get current currency
  const currentCurrency = currencies.find(c => c.code === currency) || currencies[0];

  // Format currency
  const formatMoney = (amount) => {
    const formatted = new Intl.NumberFormat('en-US').format(Math.round(amount));
    return `${currentCurrency.symbol}${formatted}`;
  };

  // Calculate Credit Card Payoff
  const calculatePayoff = () => {
    const balance = parseFloat(currentBalance);
    const apr = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
    const minPay = parseFloat(minimumPayment);
    const extraPay = parseFloat(extraPayment) || 0;
    const totalPayment = minPay + extraPay;

    if (balance <= 0 || interestRate <= 0 || minimumPayment <= 0) {
      setResults(null);
      return;
    }

    // Calculate minimum payment scenario
    let minBalance = balance;
    let minMonths = 0;
    let minTotalPaid = 0;
    let minInterestPaid = 0;

    while (minBalance > 0.01 && minMonths < 600) { // 50 years max
      const interestCharge = minBalance * apr;
      const principalPayment = Math.min(minPay - interestCharge, minBalance);
      
      if (principalPayment <= 0) break; // Payment less than interest
      
      minBalance -= principalPayment;
      minTotalPaid += minPay;
      minInterestPaid += interestCharge;
      minMonths++;
    }

    // Calculate with extra payment scenario
    let extraBalance = balance;
    let extraMonths = 0;
    let extraTotalPaid = 0;
    let extraInterestPaid = 0;

    while (extraBalance > 0.01 && extraMonths < 600) {
      const interestCharge = extraBalance * apr;
      const principalPayment = Math.min(totalPayment - interestCharge, extraBalance);
      
      if (principalPayment <= 0) break;
      
      extraBalance -= principalPayment;
      extraTotalPaid += Math.min(totalPayment, extraBalance + interestCharge + principalPayment);
      extraInterestPaid += interestCharge;
      extraMonths++;
    }

    const timeSaved = minMonths - extraMonths;
    const interestSaved = minInterestPaid - extraInterestPaid;

    setResults({
      minPaymentMonths: minMonths,
      minPaymentYears: (minMonths / 12).toFixed(1),
      minTotalPaid: minTotalPaid,
      minInterestPaid: minInterestPaid,
      extraPaymentMonths: extraMonths,
      extraPaymentYears: (extraMonths / 12).toFixed(1),
      extraTotalPaid: extraTotalPaid,
      extraInterestPaid: extraInterestPaid,
      timeSaved: timeSaved,
      interestSaved: interestSaved,
      originalBalance: balance
    });
  };

  // Calculate on input change
  useEffect(() => {
    calculatePayoff();
  }, [currentBalance, interestRate, minimumPayment, extraPayment, currency]);

  // Navigation function
  const goHome = () => window.location.href = '/';

  return (
    <div className="credit-card-calculator">
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
            <span className="breadcrumb-current">Credit Card Debt Calculator</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-icon">
              <CreditCard size={48} />
            </div>
            <h1>Credit Card Debt Calculator</h1>
            <p>Eliminate high-interest credit card debt faster with smart payoff strategies</p>
            <div className="badges">
              <span className="badge">High-Interest Killer</span>
              <span className="badge">Debt Freedom</span>
              <span className="badge">100% Free</span>
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
              <h2>Credit Card Details</h2>
              
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

              {/* Current Balance */}
              <div className="input-group">
                <label>
                  <CreditCard size={18} />
                  Current Balance ({currentCurrency.symbol})
                </label>
                <input
                  type="number"
                  value={currentBalance}
                  onChange={(e) => setCurrentBalance(e.target.value)}
                  placeholder="5000"
                />
                <small>Total outstanding credit card debt</small>
              </div>

              {/* Interest Rate */}
              <div className="input-group">
                <label>
                  <Percent size={18} />
                  Interest Rate (APR %)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  placeholder="18.99"
                />
                <small>Annual Percentage Rate from your statement</small>
              </div>

              {/* Minimum Payment */}
              <div className="input-group">
                <label>
                  <DollarSign size={18} />
                  Minimum Payment ({currentCurrency.symbol})
                </label>
                <input
                  type="number"
                  value={minimumPayment}
                  onChange={(e) => setMinimumPayment(e.target.value)}
                  placeholder="150"
                />
                <small>Monthly minimum payment required</small>
              </div>

              {/* Extra Payment */}
              <div className="input-group">
                <label>
                  <Zap size={18} />
                  Extra Payment ({currentCurrency.symbol})
                </label>
                <input
                  type="number"
                  value={extraPayment}
                  onChange={(e) => setExtraPayment(e.target.value)}
                  placeholder="0"
                />
                <small>Additional amount you can pay monthly</small>
              </div>

              {/* Strategy Info */}
              <div className="formula-info">
                <h3>Debt Elimination Strategy</h3>
                <div className="formula">Pay More Than Minimum = Faster Freedom</div>
                <ul>
                  <li><strong>Minimum Payment</strong> = Mostly goes to interest</li>
                  <li><strong>Extra Payment</strong> = Goes directly to principal</li>
                  <li><strong>Higher APR</strong> = Priority for payoff</li>
                </ul>
              </div>
            </div>

            {/* Results Panel */}
            <div className="results-panel">
              <h2>Payoff Results</h2>
              
              {results ? (
                <div className="results">
                  {/* Main Result */}
                  <div className="result-card main-result">
                    <div className="result-icon">
                      <Zap size={32} />
                    </div>
                    <div className="result-content">
                      <h3>Interest Savings</h3>
                      <div className="amount">{formatMoney(results.interestSaved)}</div>
                      <p>Save by paying extra {formatMoney(parseFloat(extraPayment))}/month</p>
                    </div>
                  </div>

                  {/* Comparison Results */}
                  <div className="comparison-grid">
                    <div className="comparison-card minimum">
                      <h3>Minimum Payment Only</h3>
                      <div className="comparison-stat">
                        <label>Payoff Time:</label>
                        <span>{results.minPaymentYears} years ({results.minPaymentMonths} months)</span>
                      </div>
                      <div className="comparison-stat">
                        <label>Total Interest:</label>
                        <span className="interest">{formatMoney(results.minInterestPaid)}</span>
                      </div>
                      <div className="comparison-stat">
                        <label>Total Paid:</label>
                        <span>{formatMoney(results.minTotalPaid)}</span>
                      </div>
                    </div>

                    <div className="comparison-card extra">
                      <h3>With Extra Payment</h3>
                      <div className="comparison-stat">
                        <label>Payoff Time:</label>
                        <span>{results.extraPaymentYears} years ({results.extraPaymentMonths} months)</span>
                      </div>
                      <div className="comparison-stat">
                        <label>Total Interest:</label>
                        <span className="interest">{formatMoney(results.extraInterestPaid)}</span>
                      </div>
                      <div className="comparison-stat">
                        <label>Total Paid:</label>
                        <span>{formatMoney(results.extraTotalPaid)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="summary">
                    <h3>Debt Freedom Summary</h3>
                    <div className="summary-grid">
                      <div className="summary-item">
                        <span>Original Balance:</span>
                        <strong>{formatMoney(results.originalBalance)}</strong>
                      </div>
                      <div className="summary-item">
                        <span>Monthly Payment:</span>
                        <strong>{formatMoney(parseFloat(minimumPayment) + parseFloat(extraPayment))}</strong>
                      </div>
                      <div className="summary-item">
                        <span>Interest Rate:</span>
                        <strong>{interestRate}% APR</strong>
                      </div>
                      <div className="summary-item savings">
                        <span>Time Saved:</span>
                        <strong>{results.timeSaved} months ({(results.timeSaved / 12).toFixed(1)} years)</strong>
                      </div>
                      <div className="summary-item savings">
                        <span>Interest Saved:</span>
                        <strong>{formatMoney(results.interestSaved)}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="no-results">
                  <CreditCard size={64} />
                  <h3>Enter your debt details</h3>
                  <p>Fill in your credit card balance, interest rate, and payment amounts to see your payoff strategy</p>
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
            
            <h2>Master Credit Card Debt Elimination with Smart Payoff Strategies</h2>
            
            <p>
              A <strong>credit card debt calculator</strong> is an essential tool for anyone struggling with <strong>high-interest debt</strong> and seeking the fastest path to financial freedom. Credit cards typically carry interest rates between 15-29% APR, making them among the most expensive forms of consumer debt. Our comprehensive <strong>credit card payoff calculator</strong> helps you understand exactly how much time and money you can save by paying more than the minimum required payment. Whether you're dealing with one card or multiple cards, strategic debt elimination can save you thousands of dollars and years of payments.
            </p>

            <p>
              The mathematics behind <strong>credit card interest calculation</strong> reveals why minimum payments keep you trapped in debt for decades. Credit card companies typically set minimum payments at just 2-3% of your balance, ensuring most of your payment goes toward interest rather than principal reduction. Our <strong>debt avalanche calculator</strong> demonstrates how even small additional payments can dramatically accelerate your journey to debt freedom. For example, paying an extra $50 monthly on a $5,000 balance at 18.99% APR can save over $2,000 in interest and reduce payoff time from 17 years to under 4 years.
            </p>

            <p>
              Smart debt elimination strategies include the <strong>debt avalanche method</strong> (paying minimums on all cards while attacking the highest interest rate first) and the <strong>debt snowball method</strong> (focusing on smallest balances first for psychological wins). Our <strong>high interest debt calculator</strong> supports both approaches by helping you prioritize which debts to tackle first. Additionally, consider balance transfer options to lower-interest cards, but beware of transfer fees and promotional rate expiration dates. The key is maintaining discipline and avoiding new debt while aggressively paying down existing balances.
            </p>

            <p>
              Beyond basic calculations, successful credit card debt elimination requires understanding compound interest, opportunity costs, and the true cost of minimum payments. Many borrowers don't realize that a $1,000 purchase financed at 19.99% APR with minimum payments will ultimately cost over $3,000 and take 22 years to pay off. Our <strong>credit card payment calculator</strong> includes features for multiple currencies, making it valuable for international users and expatriates managing debt across different countries. Remember that eliminating high-interest debt is often your best "investment" with guaranteed returns equivalent to your card's interest rate, typically higher than most investment returns after taxes.
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
              <h3>How does credit card interest work?</h3>
              <p>Credit card interest is calculated daily based on your average daily balance and Annual Percentage Rate (APR). The daily rate is your APR divided by 365, and interest compounds daily. This means you pay interest on both your original balance and any accumulated interest charges.</p>
            </div>

            <div className="faq-item">
              <h3>Why do minimum payments take so long to pay off debt?</h3>
              <p>Minimum payments are typically set at 2-3% of your balance, with most going toward interest rather than principal. At 18% APR, paying only minimums on a $5,000 balance would take over 17 years and cost more than $8,000 in total interest charges.</p>
            </div>

            <div className="faq-item">
              <h3>What's the debt avalanche method?</h3>
              <p>The debt avalanche method involves paying minimum amounts on all debts while putting any extra money toward the debt with the highest interest rate. This mathematically optimal approach saves the most money in interest charges and typically reduces overall payoff time.</p>
            </div>

            <div className="faq-item">
              <h3>Should I pay off credit cards or invest extra money?</h3>
              <p>Generally, pay off high-interest credit card debt first. With average credit card rates at 18-24%, you'd need investment returns exceeding 25-30% (pre-tax) to beat the guaranteed "return" of eliminating debt. High-interest debt elimination should be your priority before investing.</p>
            </div>

            <div className="faq-item">
              <h3>How much extra should I pay on credit cards?</h3>
              <p>Pay as much extra as your budget allows. Even an additional $25-50 monthly can save thousands in interest. Aim to pay at least double the minimum payment when possible. Use windfalls like tax refunds or bonuses to make large principal payments.</p>
            </div>

            <div className="faq-item">
              <h3>Are balance transfers worth it for debt consolidation?</h3>
              <p>Balance transfers can be beneficial if you qualify for a significantly lower interest rate and can pay off the balance before promotional rates expire. Factor in transfer fees (typically 3-5%) and ensure you won't accumulate new debt on the cleared cards.</p>
            </div>

            <div className="faq-item">
              <h3>What happens if I can only afford minimum payments?</h3>
              <p>If you can only afford minimums, focus on preventing new debt and look for ways to increase income or reduce expenses. Consider credit counseling services, debt management plans, or speaking with card companies about hardship programs that might reduce interest rates temporarily.</p>
            </div>

            <div className="faq-item">
              <h3>How accurate are credit card payoff calculators?</h3>
              <p>Our calculator provides accurate estimates based on standard interest calculation methods. Actual results may vary slightly due to daily compounding, payment timing, and any fees. Always verify calculations with your specific card terms and statements.</p>
            </div>

            <div className="faq-item">
              <h3>Should I focus on one card or spread extra payments?</h3>
              <p>For maximum interest savings, focus extra payments on the highest interest rate debt while maintaining minimums on others (debt avalanche). For psychological motivation, some prefer the debt snowball method, focusing on smallest balances first regardless of interest rates.</p>
            </div>

            <div className="faq-item">
              <h3>Can this calculator help with multiple credit cards?</h3>
              <p>While this calculator focuses on individual card analysis, you can use it for each card separately to develop a comprehensive debt elimination strategy. Input each card's details to prioritize which debts to attack first based on interest rates and balances.</p>
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

        .credit-card-calculator {
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
          background: linear-gradient(135deg, #059669, #047857);
          color: white;
          padding: 30px;
          border-radius: 16px;
          margin-bottom: 32px;
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

        .comparison-card.minimum {
          border-color: #fca5a5;
          background: #fef2f2;
        }

        .comparison-card.extra {
          border-color: #86efac;
          background: #f0fdf4;
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
        }
      `}</style>
    </div>
  );
};

export default CreditCardDebtCalculator;