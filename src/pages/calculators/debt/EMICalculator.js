import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, Percent, Clock, Globe, Home, ChevronRight } from 'lucide-react';

const EMICalculator = () => {
  // States
  const [loanAmount, setLoanAmount] = useState('250000');
  const [interestRate, setInterestRate] = useState('8.5');
  const [loanTenure, setLoanTenure] = useState('20');
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

  // Calculate EMI
  const calculateEMI = () => {
    const P = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 12 / 100;
    const n = parseFloat(loanTenure) * 12;

    if (P <= 0 || interestRate <= 0 || loanTenure <= 0) {
      setResults(null);
      return;
    }

    // EMI formula
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalAmount = emi * n;
    const totalInterest = totalAmount - P;

    setResults({
      emi: emi,
      totalAmount: totalAmount,
      totalInterest: totalInterest,
      principal: P
    });
  };

  // Calculate on input change
  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, loanTenure, currency]);

  // Navigation function
  const goHome = () => window.location.href = '/';

  return (
    <div className="emi-calculator">
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
            <span className="breadcrumb-current">EMI Calculator</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-icon">
              <Globe size={48} />
            </div>
            <h1>Global EMI Calculator</h1>
            <p>Calculate your monthly loan payments in any currency - Free, Fast & Accurate</p>
            <div className="badges">
              <span className="badge">12+ Currencies</span>
              <span className="badge">Instant Results</span>
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
              <h2>Loan Details</h2>
              
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

              {/* Loan Amount */}
              <div className="input-group">
                <label>
                  <DollarSign size={18} />
                  Loan Amount ({currentCurrency.symbol})
                </label>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  placeholder="250000"
                />
                <small>Enter the total loan amount</small>
              </div>

              {/* Interest Rate */}
              <div className="input-group">
                <label>
                  <Percent size={18} />
                  Interest Rate (% per year)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  placeholder="8.5"
                />
                <small>Annual interest rate</small>
              </div>

              {/* Loan Tenure */}
              <div className="input-group">
                <label>
                  <Clock size={18} />
                  Loan Tenure (Years)
                </label>
                <input
                  type="number"
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(e.target.value)}
                  placeholder="20"
                />
                <small>Loan repayment period</small>
              </div>

              {/* Formula Info */}
              <div className="formula-info">
                <h3>EMI Formula</h3>
                <div className="formula">EMI = P × r × (1 + r)ⁿ / [(1 + r)ⁿ - 1]</div>
                <ul>
                  <li><strong>P</strong> = Principal loan amount</li>
                  <li><strong>r</strong> = Monthly interest rate</li>
                  <li><strong>n</strong> = Number of months</li>
                </ul>
              </div>
            </div>

            {/* Results Panel */}
            <div className="results-panel">
              <h2>EMI Results</h2>
              
              {results ? (
                <div className="results">
                  {/* Main EMI */}
                  <div className="result-card main-result">
                    <div className="result-icon">
                      <Calculator size={32} />
                    </div>
                    <div className="result-content">
                      <h3>Monthly EMI</h3>
                      <div className="amount">{formatMoney(results.emi)}</div>
                      <p>Amount to pay every month</p>
                    </div>
                  </div>

                  {/* Other Results */}
                  <div className="result-grid">
                    <div className="result-item">
                      <h4>Principal Amount</h4>
                      <div className="value">{formatMoney(results.principal)}</div>
                    </div>
                    <div className="result-item">
                      <h4>Total Interest</h4>
                      <div className="value interest">{formatMoney(results.totalInterest)}</div>
                    </div>
                    <div className="result-item">
                      <h4>Total Amount</h4>
                      <div className="value">{formatMoney(results.totalAmount)}</div>
                    </div>
                    <div className="result-item">
                      <h4>Interest %</h4>
                      <div className="value">
                        {((results.totalInterest / results.totalAmount) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="summary">
                    <h3>Loan Summary</h3>
                    <div className="summary-grid">
                      <div className="summary-item">
                        <span>Monthly Payment:</span>
                        <strong>{formatMoney(results.emi)}</strong>
                      </div>
                      <div className="summary-item">
                        <span>Total Payments:</span>
                        <strong>{loanTenure * 12} months</strong>
                      </div>
                      <div className="summary-item">
                        <span>Currency:</span>
                        <strong>{currentCurrency.name}</strong>
                      </div>
                      <div className="summary-item">
                        <span>Interest Rate:</span>
                        <strong>{interestRate}% per year</strong>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="no-results">
                  <Calculator size={64} />
                  <h3>Enter loan details</h3>
                  <p>Fill in the loan amount, interest rate, and tenure to see your EMI calculation</p>
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
            
            <h2>Understanding EMI Calculator and Smart Loan Planning</h2>
            
            <p>
              An <strong>EMI calculator</strong> is an indispensable financial tool that helps borrowers determine their <strong>monthly loan payments</strong> before committing to any loan agreement. Whether you're planning for a <strong>home loan</strong>, <strong>car loan</strong>, <strong>personal loan</strong>, or <strong>business loan</strong>, our comprehensive EMI calculator provides instant, accurate results across 12+ global currencies. The EMI (Equated Monthly Installment) represents the fixed monthly payment that includes both principal repayment and interest charges, making it easier to budget and plan your finances effectively.
            </p>

            <p>
              The <strong>EMI calculation formula</strong> - EMI = P × r × (1 + r)ⁿ / [(1 + r)ⁿ - 1] - takes into account three critical variables: the principal loan amount (P), monthly interest rate (r), and total number of monthly installments (n). Our <strong>mortgage calculator</strong> and <strong>loan payment calculator</strong> use this proven mathematical formula to provide precise calculations. Understanding how different loan parameters affect your EMI helps you make informed decisions about loan amount, tenure, and interest rates. For example, increasing the loan tenure reduces monthly EMI but increases total interest cost, while a higher down payment reduces both EMI and total interest burden.
            </p>

            <p>
              Smart borrowers leverage <strong>auto loan calculators</strong>, <strong>personal loan calculators</strong>, and <strong>home loan calculators</strong> to evaluate multiple scenarios before choosing the optimal loan structure. Financial experts recommend keeping total EMI obligations below 40% of monthly income to maintain healthy debt-to-income ratios. Additional factors like processing fees, insurance premiums, and prepayment charges should also be considered when calculating the true cost of borrowing. Our calculator supports major global currencies including USD, EUR, GBP, INR, CAD, AUD, JPY, CNY, SGD, AED, CHF, and NZD, making it valuable for international borrowers and expatriates.
            </p>

            <p>
              Beyond basic EMI calculations, successful loan management involves understanding concepts like reducing balance vs. flat rate interest, the impact of prepayments on loan tenure, and strategies for loan refinancing. Many borrowers can save significant amounts by making periodic prepayments toward the principal, especially during the early years of the loan when interest comprises a larger portion of the EMI. Our <strong>EMI calculator tool</strong> helps you visualize these scenarios and make data-driven decisions about your borrowing strategy. Remember that even a 0.25% difference in interest rates can result in substantial savings over a 15-20 year loan period, emphasizing the importance of shopping around and negotiating the best possible terms with lenders.
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
              <h3>What is EMI and how does it work?</h3>
              <p>EMI (Equated Monthly Installment) is a fixed payment amount made by a borrower to a lender at a specified date each month. It consists of both principal repayment and interest charges, calculated using the loan amount, interest rate, and repayment tenure.</p>
            </div>

            <div className="faq-item">
              <h3>How is EMI calculated using the formula?</h3>
              <p>EMI is calculated using the formula: EMI = P × r × (1 + r)ⁿ / [(1 + r)ⁿ - 1], where P = Principal amount, r = Monthly interest rate (annual rate ÷ 12), and n = Total number of monthly installments. Our calculator automatically applies this formula for accurate results.</p>
            </div>

            <div className="faq-item">
              <h3>Which factors affect my monthly EMI amount?</h3>
              <p>Three primary factors determine your EMI: loan amount (higher amount increases EMI), interest rate (higher rate increases EMI), and loan tenure (longer tenure reduces EMI but increases total interest). Your credit score and down payment also indirectly affect EMI through interest rate negotiations.</p>
            </div>

            <div className="faq-item">
              <h3>Can I reduce my EMI after taking the loan?</h3>
              <p>Yes, you can reduce EMI through several methods: making prepayments toward principal, extending loan tenure (if lender permits), refinancing at lower interest rates, or increasing your down payment. Each option has different implications for total interest cost and loan duration.</p>
            </div>

            <div className="faq-item">
              <h3>What's the ideal EMI to income ratio?</h3>
              <p>Financial advisors recommend keeping total EMI obligations (all loans combined) below 40% of gross monthly income. For individual loans, 30-35% is considered safe. This ensures adequate cash flow for other expenses and financial goals while maintaining healthy credit utilization.</p>
            </div>

            <div className="faq-item">
              <h3>Should I choose longer or shorter loan tenure?</h3>
              <p>Shorter tenure means higher EMI but significantly lower total interest cost and faster debt freedom. Longer tenure offers lower EMI but higher total interest burden. Choose based on your monthly cash flow capacity, other financial commitments, and long-term financial goals.</p>
            </div>

            <div className="faq-item">
              <h3>How accurate are online EMI calculators?</h3>
              <p>Online EMI calculators provide highly accurate baseline calculations using standard mathematical formulas. However, actual EMI may vary slightly due to processing fees, insurance premiums, and specific lender terms. Always verify final numbers with your chosen lender.</p>
            </div>

            <div className="faq-item">
              <h3>When should I make loan prepayments?</h3>
              <p>Prepayments are most beneficial during early loan years when interest forms a larger EMI component. Consider prepayments when you have surplus funds, tax benefits are minimal, and alternative investment returns are lower than your loan interest rate. Always check for prepayment penalties first.</p>
            </div>

            <div className="faq-item">
              <h3>What's the difference between flat and reducing balance rates?</h3>
              <p>Flat rate calculates interest on the entire principal amount throughout the loan tenure, resulting in higher total interest. Reducing balance (diminishing balance) calculates interest only on the outstanding principal, making it more borrower-friendly and commonly used by banks.</p>
            </div>

            <div className="faq-item">
              <h3>Which currencies does this calculator support?</h3>
              <p>Our calculator supports 12 major global currencies: USD, EUR, GBP, INR, CAD, AUD, JPY, CNY, SGD, AED, CHF, and NZD. This makes it suitable for international borrowers, expatriates, and anyone comparing loan options across different countries and currencies.</p>
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

        .emi-calculator {
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
          color: #3b82f6;
          background: #f1f5f9;
        }

        .breadcrumb-current {
          color: #3b82f6;
          font-weight: 600;
          padding: 4px 8px;
        }

        .separator {
          color: #cbd5e1;
        }

        /* Hero */
        .hero {
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
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
          border-color: #3b82f6;
          background: white;
        }

        .input-group small {
          display: block;
          margin-top: 4px;
          color: #64748b;
          font-size: 0.875rem;
        }

        .formula-info {
          background: #f1f5f9;
          padding: 20px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          margin-top: 24px;
        }

        .formula-info h3 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 12px;
          color: #1e293b;
        }

        .formula {
          background: white;
          padding: 12px;
          border-radius: 6px;
          font-family: 'Courier New', monospace;
          font-weight: 600;
          color: #3b82f6;
          margin-bottom: 12px;
          text-align: center;
        }

        .formula-info ul {
          list-style: none;
          font-size: 0.875rem;
          color: #64748b;
        }

        .formula-info li {
          margin-bottom: 4px;
        }

        /* Results */
        .results {
          text-align: center;
        }

        .main-result {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
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

        .result-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 32px;
        }

        .result-item {
          background: #f8fafc;
          padding: 20px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }

        .result-item h4 {
          font-size: 0.875rem;
          color: #64748b;
          margin-bottom: 8px;
          font-weight: 500;
        }

        .result-item .value {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1e293b;
        }

        .result-item .value.interest {
          color: #dc2626;
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
          color: #3b82f6;
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
          border-color: #3b82f6;
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

          .result-grid {
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

export default EMICalculator;