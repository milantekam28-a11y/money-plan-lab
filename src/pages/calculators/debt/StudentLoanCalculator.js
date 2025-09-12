import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, Percent, Clock, Globe, Home, ChevronRight, GraduationCap, BookOpen, Zap } from 'lucide-react';

const StudentLoanCalculator = () => {
  // States
  const [loanBalance, setLoanBalance] = useState('35000');
  const [interestRate, setInterestRate] = useState('5.5');
  const [loanTerm, setLoanTerm] = useState('10');
  const [minimumPayment, setMinimumPayment] = useState('385');
  const [extraPayment, setExtraPayment] = useState('0');
  const [currency, setCurrency] = useState('USD');
  const [loanType, setLoanType] = useState('federal');
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

  // Loan types
  const loanTypes = [
    { value: 'federal', label: '🏛️ Federal Student Loan', rate: '5.5%' },
    { value: 'private', label: '🏦 Private Student Loan', rate: '7.5%' },
    { value: 'graduate', label: '🎓 Graduate School Loan', rate: '6.5%' },
    { value: 'parent', label: '👨‍👩‍👧 Parent PLUS Loan', rate: '8.0%' }
  ];

  // Get current currency
  const currentCurrency = currencies.find(c => c.code === currency) || currencies[0];

  // Format currency
  const formatMoney = (amount) => {
    const formatted = new Intl.NumberFormat('en-US').format(Math.round(amount));
    return `${currentCurrency.symbol}${formatted}`;
  };

  // Calculate Student Loan Payoff
  const calculatePayoff = () => {
    const balance = parseFloat(loanBalance);
    const apr = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
    const minPay = parseFloat(minimumPayment);
    const extraPay = parseFloat(extraPayment) || 0;
    const totalPayment = minPay + extraPay;

    if (balance <= 0 || interestRate <= 0 || minimumPayment <= 0) {
      setResults(null);
      return;
    }

    // Calculate standard payment scenario
    let standardBalance = balance;
    let standardMonths = 0;
    let standardTotalPaid = 0;
    let standardInterestPaid = 0;

    while (standardBalance > 0.01 && standardMonths < 600) { // 50 years max
      const interestCharge = standardBalance * apr;
      const principalPayment = Math.min(minPay - interestCharge, standardBalance);
      
      if (principalPayment <= 0) break; // Payment less than interest
      
      standardBalance -= principalPayment;
      standardTotalPaid += minPay;
      standardInterestPaid += interestCharge;
      standardMonths++;
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

    const timeSaved = standardMonths - extraMonths;
    const interestSaved = standardInterestPaid - extraInterestPaid;
    const monthlySavings = interestSaved / standardMonths;

    setResults({
      standardMonths: standardMonths,
      standardYears: (standardMonths / 12).toFixed(1),
      standardTotalPaid: standardTotalPaid,
      standardInterestPaid: standardInterestPaid,
      extraMonths: extraMonths,
      extraYears: (extraMonths / 12).toFixed(1),
      extraTotalPaid: extraTotalPaid,
      extraInterestPaid: extraInterestPaid,
      timeSaved: timeSaved,
      interestSaved: interestSaved,
      monthlySavings: monthlySavings,
      originalBalance: balance,
      totalPayment: totalPayment
    });
  };

  // Calculate on input change
  useEffect(() => {
    calculatePayoff();
  }, [loanBalance, interestRate, loanTerm, minimumPayment, extraPayment, currency]);

  // Navigation function
  const goHome = () => window.location.href = '/';

  return (
    <div className="student-loan-calculator">
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
            <span className="breadcrumb-current">Student Loan Calculator</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-icon">
              <GraduationCap size={48} />
            </div>
            <h1>Student Loan Payoff Calculator</h1>
            <p>Accelerate your path to student debt freedom with smart repayment strategies</p>
            <div className="badges">
              <span className="badge">Education Debt Freedom</span>
              <span className="badge">PSLF Compatible</span>
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
              <h2>Student Loan Details</h2>
              
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

              {/* Loan Type */}
              <div className="input-group">
                <label>
                  <BookOpen size={18} />
                  Loan Type
                </label>
                <select value={loanType} onChange={(e) => setLoanType(e.target.value)}>
                  {loanTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label} (≈{type.rate})
                    </option>
                  ))}
                </select>
                <small>Federal loans often have better terms and forgiveness options</small>
              </div>

              {/* Current Balance */}
              <div className="input-group">
                <label>
                  <GraduationCap size={18} />
                  Current Balance ({currentCurrency.symbol})
                </label>
                <input
                  type="number"
                  value={loanBalance}
                  onChange={(e) => setLoanBalance(e.target.value)}
                  placeholder="35000"
                />
                <small>Total outstanding student loan debt</small>
              </div>

              {/* Interest Rate */}
              <div className="input-group">
                <label>
                  <Percent size={18} />
                  Interest Rate (% per year)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  placeholder="5.5"
                />
                <small>Weighted average if you have multiple loans</small>
              </div>

              {/* Standard Payment */}
              <div className="input-group">
                <label>
                  <DollarSign size={18} />
                  Standard Payment ({currentCurrency.symbol})
                </label>
                <input
                  type="number"
                  value={minimumPayment}
                  onChange={(e) => setMinimumPayment(e.target.value)}
                  placeholder="385"
                />
                <small>Standard 10-year repayment amount</small>
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
                <small>Additional amount to accelerate payoff</small>
              </div>

              {/* Strategy Info */}
              <div className="formula-info">
                <h3>Student Loan Strategy</h3>
                <div className="formula">Extra Payments = Faster Freedom</div>
                <ul>
                  <li><strong>Federal Loans</strong> = Consider PSLF eligibility</li>
                  <li><strong>Private Loans</strong> = Prioritize for payoff</li>
                  <li><strong>High Interest</strong> = Pay off first (avalanche)</li>
                  <li><strong>Tax Benefits</strong> = Interest deduction up to $2,500</li>
                </ul>
              </div>
            </div>

            {/* Results Panel */}
            <div className="results-panel">
              <h2>Payoff Analysis</h2>
              
              {results ? (
                <div className="results">
                  {/* Main Result */}
                  <div className="result-card main-result">
                    <div className="result-icon">
                      <Zap size={32} />
                    </div>
                    <div className="result-content">
                      <h3>Total Interest Savings</h3>
                      <div className="amount">{formatMoney(results.interestSaved)}</div>
                      <p>Save by paying extra {formatMoney(parseFloat(extraPayment))}/month</p>
                    </div>
                  </div>

                  {/* Comparison Results */}
                  <div className="comparison-grid">
                    <div className="comparison-card standard">
                      <h3>Standard Repayment</h3>
                      <div className="comparison-stat">
                        <label>Payoff Time:</label>
                        <span>{results.standardYears} years ({results.standardMonths} months)</span>
                      </div>
                      <div className="comparison-stat">
                        <label>Total Interest:</label>
                        <span className="interest">{formatMoney(results.standardInterestPaid)}</span>
                      </div>
                      <div className="comparison-stat">
                        <label>Total Paid:</label>
                        <span>{formatMoney(results.standardTotalPaid)}</span>
                      </div>
                      <div className="comparison-stat">
                        <label>Monthly Payment:</label>
                        <span>{formatMoney(parseFloat(minimumPayment))}</span>
                      </div>
                    </div>

                    <div className="comparison-card accelerated">
                      <h3>Accelerated Repayment</h3>
                      <div className="comparison-stat">
                        <label>Payoff Time:</label>
                        <span>{results.extraYears} years ({results.extraMonths} months)</span>
                      </div>
                      <div className="comparison-stat">
                        <label>Total Interest:</label>
                        <span className="interest">{formatMoney(results.extraInterestPaid)}</span>
                      </div>
                      <div className="comparison-stat">
                        <label>Total Paid:</label>
                        <span>{formatMoney(results.extraTotalPaid)}</span>
                      </div>
                      <div className="comparison-stat">
                        <label>Monthly Payment:</label>
                        <span>{formatMoney(results.totalPayment)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="summary">
                    <h3>Student Debt Freedom Summary</h3>
                    <div className="summary-grid">
                      <div className="summary-item">
                        <span>Original Balance:</span>
                        <strong>{formatMoney(results.originalBalance)}</strong>
                      </div>
                      <div className="summary-item">
                        <span>Interest Rate:</span>
                        <strong>{interestRate}% per year</strong>
                      </div>
                      <div className="summary-item">
                        <span>Loan Type:</span>
                        <strong>{loanTypes.find(t => t.value === loanType)?.label.replace(/[🏛️🏦🎓👨‍👩‍👧]/g, '').trim()}</strong>
                      </div>
                      <div className="summary-item savings">
                        <span>Time Saved:</span>
                        <strong>{results.timeSaved} months ({(results.timeSaved / 12).toFixed(1)} years)</strong>
                      </div>
                      <div className="summary-item savings">
                        <span>Interest Saved:</span>
                        <strong>{formatMoney(results.interestSaved)}</strong>
                      </div>
                      <div className="summary-item savings">
                        <span>Monthly Avg Savings:</span>
                        <strong>{formatMoney(results.monthlySavings)}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Special Notes */}
                  <div className="special-notes">
                    <h4>💡 Important Considerations</h4>
                    <ul>
                      <li>Consider PSLF if working in qualifying public service</li>
                      <li>Income-driven repayment may lower payments but increase total interest</li>
                      <li>Student loan interest may be tax-deductible up to $2,500/year</li>
                      <li>Refinancing federal loans loses federal protections and forgiveness options</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="no-results">
                  <GraduationCap size={64} />
                  <h3>Enter your loan details</h3>
                  <p>Fill in your student loan balance, interest rate, and payment amounts to see your debt freedom strategy</p>
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
            
            <h2>Complete Guide to Student Loan Payoff and Debt Freedom Strategies</h2>
            
            <p>
              A <strong>student loan calculator</strong> is essential for the millions of borrowers navigating <strong>education debt repayment</strong> and planning their path to financial freedom. With over $1.7 trillion in outstanding student loan debt, strategic repayment planning has become crucial for graduates entering the workforce. Our comprehensive <strong>student loan payoff calculator</strong> helps you understand the true cost of your education debt and discover how different repayment strategies can save thousands of dollars and years of payments. Whether you have federal student loans, private education loans, or a combination of both, smart repayment planning is your key to achieving debt freedom faster.
            </p>

            <p>
              <strong>Federal student loans</strong> offer unique benefits including income-driven repayment plans, deferment options, forbearance programs, and potential loan forgiveness through Public Service Loan Forgiveness (PSLF) or Teacher Loan Forgiveness programs. Our <strong>education loan calculator</strong> helps you evaluate whether aggressive repayment or income-driven plans align better with your financial goals. Standard 10-year repayment typically costs more monthly but saves significant interest compared to 20-25 year income-driven plans. However, borrowers pursuing PSLF should maximize income-driven payments while working toward qualifying employment, as loan forgiveness after 120 qualifying payments can result in substantial savings.
            </p>

            <p>
              <strong>Private student loans</strong> generally lack the flexible repayment options and forgiveness programs available with federal loans, making them prime candidates for aggressive repayment strategies. Our <strong>student debt calculator</strong> demonstrates how extra payments toward private loans can dramatically reduce total interest costs. Consider refinancing private loans if you qualify for significantly lower interest rates, but carefully evaluate the loss of any existing benefits. The debt avalanche method (prioritizing highest interest rate loans) typically saves more money than the debt snowball approach, though some borrowers prefer the psychological wins of eliminating smaller balances first.
            </p>

            <p>
              Beyond basic repayment calculations, successful student loan management involves understanding tax implications, employer benefits, and strategic financial planning. <strong>Student loan interest</strong> is tax-deductible up to $2,500 annually for eligible borrowers, effectively reducing your true interest cost. Many employers now offer student loan repayment assistance as an employee benefit, providing tax-free payments up to $5,250 annually. Our <strong>student loan payment calculator</strong> supports multiple currencies for international students and graduates working abroad. Remember that while aggressive repayment saves interest, ensure you're also building emergency savings, maximizing employer 401(k) matches, and maintaining a balanced approach to your overall financial health and long-term wealth building goals.
            </p>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <h2>Student Loan FAQs</h2>
          
          <div className="faq-grid">
            
            <div className="faq-item">
              <h3>Should I pay off student loans early or invest?</h3>
              <p>It depends on your loan interest rates and risk tolerance. If your student loans have rates above 6-7%, prioritize payoff. For lower rates, especially federal loans with tax benefits, investing in retirement accounts with employer matching typically provides better long-term returns.</p>
            </div>

            <div className="faq-item">
              <h3>What's the difference between federal and private student loans?</h3>
              <p>Federal loans offer income-driven repayment, deferment/forbearance options, and forgiveness programs. Private loans typically have fewer protections but may offer lower rates for borrowers with excellent credit. Federal loans should generally be preserved for their benefits.</p>
            </div>

            <div className="faq-item">
              <h3>How does Public Service Loan Forgiveness (PSLF) work?</h3>
              <p>PSLF forgives remaining federal loan balances after 120 qualifying payments while working full-time for qualifying employers (government, 501(c)(3) nonprofits). You must be on an income-driven repayment plan and make payments on time. Consider this before aggressive payoff strategies.</p>
            </div>

            <div className="faq-item">
              <h3>Should I refinance my student loans?</h3>
              <p>Refinancing can lower rates for borrowers with good credit but eliminates federal protections and forgiveness options. Only refinance federal loans if you don't need income-driven repayment, deferment options, or forgiveness programs, and can secure significantly lower rates.</p>
            </div>

            <div className="faq-item">
              <h3>What are income-driven repayment plans?</h3>
              <p>Income-driven plans (IDR, IBR, PAYE, REPAYE) calculate payments based on income and family size, typically 10-20% of discretionary income. Payments can be as low as $0 for low earners. Remaining balances are forgiven after 20-25 years, but forgiven amounts may be taxable.</p>
            </div>

            <div className="faq-item">
              <h3>Can I deduct student loan interest on my taxes?</h3>
              <p>Yes, you can deduct up to $2,500 in student loan interest annually if your modified adjusted gross income is below certain thresholds ($70,000 single, $140,000 married filing jointly for full deduction). This effectively reduces your loan's true interest cost.</p>
            </div>

            <div className="faq-item">
              <h3>What happens if I can't make my student loan payments?</h3>
              <p>Contact your servicer immediately. Federal loans offer deferment, forbearance, and income-driven repayment options. Defaulting severely damages credit and can result in wage garnishment, tax refund seizure, and loss of federal aid eligibility. Private loans have fewer options but may offer temporary payment reductions.</p>
            </div>

            <div className="faq-item">
              <h3>How do extra payments affect my student loans?</h3>
              <p>Extra payments go directly toward principal reduction, saving interest and shortening repayment time. Specify that extra payments should go toward principal, not advance your due date. Target highest-rate loans first for maximum savings (debt avalanche method).</p>
            </div>

            <div className="faq-item">
              <h3>Should I use my emergency fund to pay off student loans?</h3>
              <p>Generally no. Maintain 3-6 months of expenses in emergency savings before aggressive debt payoff. Student loans typically have relatively low rates and flexible repayment options, making them lower priority than maintaining financial security through emergency savings.</p>
            </div>

            <div className="faq-item">
              <h3>How accurate are student loan calculators?</h3>
              <p>Our calculator provides accurate estimates based on standard loan calculations. Actual results may vary due to loan servicer policies, payment timing, and specific loan terms. Always verify calculations with your loan servicer and check your monthly statements for accuracy.</p>
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

        .student-loan-calculator {
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
          color: #2563eb;
          background: #eff6ff;
        }

        .breadcrumb-current {
          color: #2563eb;
          font-weight: 600;
          padding: 4px 8px;
        }

        .separator {
          color: #cbd5e1;
        }

        /* Hero */
        .hero {
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
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
          border-color: #2563eb;
          background: white;
        }

        .input-group small {
          display: block;
          margin-top: 4px;
          color: #64748b;
          font-size: 0.875rem;
        }

        .formula-info {
          background: #eff6ff;
          padding: 20px;
          border-radius: 12px;
          border: 1px solid #bfdbfe;
          margin-top: 24px;
        }

        .formula-info h3 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 12px;
          color: #1e40af;
        }

        .formula {
          background: white;
          padding: 12px;
          border-radius: 6px;
          font-family: 'Courier New', monospace;
          font-weight: 600;
          color: #2563eb;
          margin-bottom: 12px;
          text-align: center;
        }

        .formula-info ul {
          list-style: none;
          font-size: 0.875rem;
          color: #1e40af;
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

        .special-notes {
          background: #fef3c7;
          padding: 20px;
          border-radius: 12px;
          border: 1px solid #fbbf24;
        }

        .special-notes h4 {
          color: #92400e;
          margin-bottom: 12px;
          font-weight: 600;
        }

        .special-notes ul {
          color: #92400e;
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .special-notes li {
          margin-bottom: 8px;
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
          color: #2563eb;
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
          border-color: #2563eb;
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

export default StudentLoanCalculator;