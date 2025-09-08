import React, { useState, useEffect } from 'react';

const FinancialCalculatorApp = () => {
  const [activeCategory, setActiveCategory] = useState('budget');
  const [activeCalculator, setActiveCalculator] = useState('emi');
  const [isLoading, setIsLoading] = useState(true);
  const [animateCounter, setAnimateCounter] = useState(false);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      setAnimateCounter(true);
    }, 2000);
  }, []);

  const categories = {
    budget: {
      name: 'Budget & Debt',
      icon: '💰',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      calculators: [
        { id: 'emi', name: 'EMI Calculator', desc: 'Monthly loan payments', popular: true },
        { id: 'budget', name: '50/30/20 Budget', desc: 'Budget allocation rule' },
        { id: 'debt-payoff', name: 'Debt Payoff', desc: 'Avalanche vs Snowball', featured: true },
        { id: 'emergency-fund', name: 'Emergency Fund', desc: 'Emergency savings goal' }
      ]
    },
    loans: {
      name: 'Loans & Credit',
      icon: '💳',
      gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      calculators: [
        { id: 'credit-card', name: 'Credit Card Payoff', desc: 'Credit card debt calculator' },
        { id: 'student-loan', name: 'Student Loan', desc: 'Education loan payoff' },
        { id: 'car-loan', name: 'Car Loan', desc: 'Auto financing calculator' },
        { id: 'medical-debt', name: 'Medical Debt', desc: 'Healthcare debt planning' }
      ]
    },
    investment: {
      name: 'Investment & Retirement',
      icon: '📈',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      calculators: [
        { id: 'compound-interest', name: 'Compound Interest', desc: 'Investment growth calculator', popular: true },
        { id: 'retirement', name: 'Retirement Planner', desc: 'Retirement savings goal' },
        { id: '401k', name: '401k Calculator', desc: '401k contribution planner' },
        { id: 'roth-ira', name: 'Roth IRA', desc: 'Roth IRA calculator' }
      ]
    },
    realestate: {
      name: 'Real Estate',
      icon: '🏠',
      gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
      calculators: [
        { id: 'mortgage', name: 'Mortgage Calculator', desc: 'Home loan calculator', featured: true },
        { id: 'mortgage-payoff', name: 'Mortgage Payoff', desc: 'Early payoff calculator' },
        { id: 'affordability', name: 'House Affordability', desc: 'Home buying budget' },
        { id: 'rent-vs-buy', name: 'Rent vs Buy', desc: 'Rent vs buy comparison' }
      ]
    },
    planning: {
      name: 'Savings & Planning',
      icon: '📅',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      calculators: [
        { id: 'vacation', name: 'Vacation Savings', desc: 'Travel savings planner' },
        { id: 'wedding', name: 'Wedding Budget', desc: 'Wedding expense planner' },
        { id: 'major-purchase', name: 'Major Purchase', desc: 'Large purchase planner' },
        { id: 'college-savings', name: 'College Savings', desc: 'Education savings plan' }
      ]
    },
    insurance: {
      name: 'Insurance & Benefits',
      icon: '🛡️',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      calculators: [
        { id: 'life-insurance', name: 'Life Insurance', desc: 'Life insurance needs' },
        { id: 'disability', name: 'Disability Insurance', desc: 'Disability coverage' },
        { id: 'hsa', name: 'HSA Calculator', desc: 'Health savings account' },
        { id: 'net-worth', name: 'Net Worth', desc: 'Net worth tracker' }
      ]
    }
  };

  // Enhanced EMI Calculator Component
  const EMICalculator = () => {
    const [principal, setPrincipal] = useState('100000');
    const [rate, setRate] = useState('10');
    const [tenure, setTenure] = useState('12');
    const [result, setResult] = useState(null);
    const [calculating, setCalculating] = useState(false);

    const calculateEMI = () => {
      setCalculating(true);
      
      setTimeout(() => {
        const P = parseFloat(principal);
        const r = parseFloat(rate) / 100 / 12;
        const n = parseFloat(tenure);
        
        if (P && r && n) {
          const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
          const totalPayment = emi * n;
          const totalInterest = totalPayment - P;
          
          setResult({
            emi: emi.toFixed(2),
            totalPayment: totalPayment.toFixed(2),
            totalInterest: totalInterest.toFixed(2)
          });
        }
        setCalculating(false);
      }, 1000);
    };

    return (
      <div className="calculator-container">
        <div className="calculator-header">
          <div className="calculator-icon">💵</div>
          <h2>EMI Calculator</h2>
          <p>Calculate your monthly loan payments with precision</p>
        </div>
        
        <div className="calculator-content">
          <div className="input-section">
            <div className="input-group">
              <label>Loan Amount ($)</label>
              <div className="input-wrapper">
                <span className="input-prefix">$</span>
                <input
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                  placeholder="100,000"
                />
              </div>
            </div>
            
            <div className="input-group">
              <label>Annual Interest Rate</label>
              <div className="input-wrapper">
                <input
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  placeholder="10"
                  step="0.1"
                />
                <span className="input-suffix">%</span>
              </div>
            </div>
            
            <div className="input-group">
              <label>Loan Tenure</label>
              <div className="input-wrapper">
                <input
                  type="number"
                  value={tenure}
                  onChange={(e) => setTenure(e.target.value)}
                  placeholder="12"
                />
                <span className="input-suffix">months</span>
              </div>
            </div>
            
            <button 
              onClick={calculateEMI} 
              className="calculate-btn"
              disabled={calculating}
            >
              {calculating ? (
                <>
                  <div className="spinner"></div>
                  Calculating...
                </>
              ) : (
                <>
                  <span className="btn-icon">🧮</span>
                  Calculate EMI
                </>
              )}
            </button>
          </div>
          
          {result && (
            <div className="result-section">
              <h3>💡 Results</h3>
              <div className="result-cards">
                <div className="result-card primary">
                  <div className="result-icon">💰</div>
                  <div className="result-info">
                    <div className="result-label">Monthly EMI</div>
                    <div className="result-value">${result.emi}</div>
                  </div>
                </div>
                
                <div className="result-card">
                  <div className="result-icon">📊</div>
                  <div className="result-info">
                    <div className="result-label">Total Payment</div>
                    <div className="result-value">${result.totalPayment}</div>
                  </div>
                </div>
                
                <div className="result-card danger">
                  <div className="result-icon">⚠️</div>
                  <div className="result-info">
                    <div className="result-label">Total Interest</div>
                    <div className="result-value">${result.totalInterest}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Enhanced Budget Calculator
  const BudgetCalculator = () => {
    const [income, setIncome] = useState('5000');
    const [result, setResult] = useState(null);
    const [calculating, setCalculating] = useState(false);

    const calculateBudget = () => {
      setCalculating(true);
      
      setTimeout(() => {
        const monthlyIncome = parseFloat(income);
        if (monthlyIncome) {
          setResult({
            needs: (monthlyIncome * 0.5).toFixed(2),
            wants: (monthlyIncome * 0.3).toFixed(2),
            savings: (monthlyIncome * 0.2).toFixed(2)
          });
        }
        setCalculating(false);
      }, 1000);
    };

    return (
      <div className="calculator-container">
        <div className="calculator-header">
          <div className="calculator-icon">📊</div>
          <h2>50/30/20 Budget Rule</h2>
          <p>Plan your finances with the popular budgeting method</p>
        </div>
        
        <div className="calculator-content">
          <div className="input-section">
            <div className="input-group">
              <label>Monthly After-Tax Income</label>
              <div className="input-wrapper">
                <span className="input-prefix">$</span>
                <input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  placeholder="5,000"
                />
              </div>
            </div>
            
            <button 
              onClick={calculateBudget} 
              className="calculate-btn"
              disabled={calculating}
            >
              {calculating ? (
                <>
                  <div className="spinner"></div>
                  Calculating...
                </>
              ) : (
                <>
                  <span className="btn-icon">🧮</span>
                  Calculate Budget
                </>
              )}
            </button>
          </div>
          
          {result && (
            <div className="result-section">
              <h3>🎯 Your Budget Breakdown</h3>
              
              <div className="budget-breakdown">
                <div className="budget-category needs">
                  <div className="budget-header">
                    <div className="budget-icon">🏠</div>
                    <div className="budget-info">
                      <h4>50% Needs</h4>
                      <p>Rent, utilities, groceries, debt payments</p>
                    </div>
                  </div>
                  <div className="budget-amount">${result.needs}</div>
                </div>
                
                <div className="budget-category wants">
                  <div className="budget-header">
                    <div className="budget-icon">🎉</div>
                    <div className="budget-info">
                      <h4>30% Wants</h4>
                      <p>Entertainment, dining out, hobbies</p>
                    </div>
                  </div>
                  <div className="budget-amount">${result.wants}</div>
                </div>
                
                <div className="budget-category savings">
                  <div className="budget-header">
                    <div className="budget-icon">💰</div>
                    <div className="budget-info">
                      <h4>20% Savings</h4>
                      <p>Emergency fund, retirement, investments</p>
                    </div>
                  </div>
                  <div className="budget-amount">${result.savings}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderCalculator = () => {
    switch(activeCalculator) {
      case 'emi':
        return <EMICalculator />;
      case 'budget':
        return <BudgetCalculator />;
      default:
        return (
          <div className="coming-soon">
            <div className="coming-soon-animation">
              <div className="rocket">🚀</div>
              <div className="stars">
                <div className="star">⭐</div>
                <div className="star">✨</div>
                <div className="star">💫</div>
              </div>
            </div>
            <h2>Calculator Coming Soon</h2>
            <p>This calculator is being developed with advanced features. Check back soon!</p>
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
          </div>
        );
    }
  };

  const Counter = ({ target, label, suffix = '' }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!animateCounter) return;
      
      let start = 0;
      const increment = target / 100;
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 20);

      return () => clearInterval(timer);
    }, [animateCounter, target]);

    const formatNumber = (num) => {
      if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
      if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
      return num.toString();
    };

    return (
      <div className="stat-item">
        <div className="stat-number">{formatNumber(count)}{suffix}</div>
        <div className="stat-label">{label}</div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="loading-logo">
            <div className="logo-ring"></div>
            <div className="logo-center">🧮</div>
          </div>
          <h2>Financial Calculator Hub</h2>
          <p>Loading your financial tools...</p>
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .app {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        /* Loading Screen */
        .loading-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .loading-content {
          text-align: center;
          color: white;
        }

        .loading-logo {
          position: relative;
          width: 80px;
          height: 80px;
          margin: 0 auto 24px;
        }

        .logo-ring {
          position: absolute;
          width: 80px;
          height: 80px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top: 3px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .logo-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 2rem;
        }

        .loading-bar {
          width: 200px;
          height: 4px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
          margin: 24px auto;
          overflow: hidden;
        }

        .loading-progress {
          width: 0;
          height: 100%;
          background: white;
          border-radius: 2px;
          animation: loading 2s ease-in-out infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes loading {
          0% { width: 0; }
          50% { width: 70%; }
          100% { width: 100%; }
        }

        /* Header */
        .header {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          padding: 1.5rem 2rem;
          position: relative;
        }

        .header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 30% 40%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
        }

        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 1rem;
          color: white;
        }

        .logo-icon {
          font-size: 2.5rem;
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }

        .logo h1 {
          font-size: 1.8rem;
          font-weight: 800;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .tagline {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.9rem;
          font-weight: 500;
        }

        /* Hero Stats */
        .hero-stats {
          padding: 3rem 2rem;
          text-align: center;
        }

        .stats-container {
          max-width: 1000px;
          margin: 0 auto;
          color: white;
        }

        .hero-title {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.8));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: fadeInUp 1s ease 0.2s both;
        }

        .hero-subtitle {
          font-size: 1.2rem;
          opacity: 0.9;
          margin-bottom: 3rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          animation: fadeInUp 1s ease 0.4s both;
        }

        .stats-row {
          display: flex;
          justify-content: center;
          gap: 3rem;
          flex-wrap: wrap;
          animation: fadeInUp 1s ease 0.6s both;
        }

        .stat-item {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          padding: 2rem 2.5rem;
          text-align: center;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .stat-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.6s ease;
        }

        .stat-item:hover::before {
          left: 100%;
        }

        .stat-item:hover {
          transform: translateY(-10px) scale(1.05);
          background: rgba(255, 255, 255, 0.2);
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 800;
          display: block;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 0.9rem;
          opacity: 0.9;
          font-weight: 500;
        }

        /* Main Content */
        .main-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 2rem;
        }

        /* Sidebar */
        .sidebar {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 2rem;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.3);
          height: fit-content;
          position: sticky;
          top: 2rem;
        }

        .sidebar h2 {
          font-size: 1.2rem;
          font-weight: 700;
          color: #374151;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .category-btn {
          width: 100%;
          background: none;
          border: none;
          padding: 1rem;
          margin-bottom: 0.75rem;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 1rem;
          text-align: left;
          position: relative;
          overflow: hidden;
        }

        .category-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.1), transparent);
          transition: left 0.6s ease;
        }

        .category-btn:hover::before {
          left: 100%;
        }

        .category-btn:hover {
          background: #f8fafc;
          transform: translateX(5px);
        }

        .category-btn.active {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
          transform: translateX(0);
        }

        .category-icon {
          font-size: 1.5rem;
          width: 40px;
          text-align: center;
        }

        .category-name {
          font-weight: 600;
          font-size: 0.95rem;
        }

        .calculator-list {
          margin-left: 2.5rem;
          margin-top: 0.75rem;
          margin-bottom: 1rem;
        }

        .calculator-btn {
          width: 100%;
          background: none;
          border: none;
          padding: 0.75rem 1rem;
          margin-bottom: 0.5rem;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: left;
          position: relative;
        }

        .calculator-btn:hover {
          background: #e5e7eb;
          transform: translateX(5px);
        }

        .calculator-btn.active {
          background: rgba(102, 126, 234, 0.1);
          color: #667eea;
          font-weight: 600;
        }

        .calc-name {
          font-size: 0.9rem;
          margin-bottom: 0.25rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .calc-desc {
          font-size: 0.75rem;
          color: #6b7280;
        }

        .calc-badge {
          background: #ef4444;
          color: white;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 0.7rem;
          font-weight: 600;
        }

        .calc-badge.popular {
          background: #10b981;
        }

        .calc-badge.featured {
          background: #f59e0b;
        }

        /* Content Area */
        .content-area {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.3);
          overflow: hidden;
          position: relative;
        }

        .content-area::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(135deg, #667eea, #764ba2);
        }

        /* Calculator Container */
        .calculator-container {
          padding: 3rem;
        }

        .calculator-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .calculator-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .calculator-header h2 {
          font-size: 2.2rem;
          font-weight: 800;
          color: #374151;
          margin-bottom: 0.75rem;
          background: linear-gradient(135deg, #374151, #6b7280);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .calculator-header p {
          color: #6b7280;
          font-size: 1.1rem;
        }

        .calculator-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
        }

        /* Input Section */
        .input-section {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .input-group {
          position: relative;
        }

        .input-group label {
          display: block;
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.75rem;
          font-size: 0.95rem;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-prefix,
        .input-suffix {
          position: absolute;
          color: #6b7280;
          font-weight: 600;
          z-index: 2;
        }

        .input-prefix {
          left: 1rem;
        }

        .input-suffix {
          right: 1rem;
        }

        .input-group input {
          width: 100%;
          padding: 1rem 1.25rem;
          padding-left: 2.5rem;
          border: 2px solid #e5e7eb;
          border-radius: 16px;
          font-size: 1.1rem;
          font-weight: 500;
          transition: all 0.3s ease;
          background: white;
          color: #374151;
        }

        .input-group input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
          transform: translateY(-2px);
        }

        /* Calculate Button */
        .calculate-btn {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border: none;
          padding: 1.25rem 2rem;
          border-radius: 16px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          position: relative;
          overflow: hidden;
        }

        .calculate-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.7s ease;
        }

        .calculate-btn:hover::before {
          left: 100%;
        }

        .calculate-btn:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(102, 126, 234, 0.5);
        }

        .calculate-btn:active {
          transform: translateY(-2px);
        }

        .calculate-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .btn-icon {
          font-size: 1.2rem;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        /* Result Section */
        .result-section {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .result-section h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #374151;
          text-align: center;
          margin-bottom: 1rem;
        }

        .result-cards {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .result-card {
          background: #f8fafc;
          border: 2px solid #e2e8f0;
          border-radius: 16px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .result-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.05), transparent);
          transition: left 0.6s ease;
        }

        .result-card:hover::before {
          left: 100%;
        }

        .result-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .result-card.primary {
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
          border-color: #667eea;
        }

        .result-card.danger {
          background: rgba(239, 68, 68, 0.1);
          border-color: #ef4444;
        }

        .result-icon {
          font-size: 2rem;
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
        }

        .result-card.danger .result-icon {
          background: linear-gradient(135deg, #ef4444, #dc2626);
          box-shadow: 0 8px 20px rgba(239, 68, 68, 0.3);
        }

        .result-info {
          flex: 1;
        }

        .result-label {
          font-weight: 600;
          color: #6b7280;
          font-size: 0.9rem;
          margin-bottom: 0.25rem;
        }

        .result-value {
          font-size: 1.8rem;
          font-weight: 800;
          color: #374151;
        }

        .result-card.primary .result-value {
          color: #667eea;
        }

        .result-card.danger .result-value {
          color: #ef4444;
        }

        /* Budget Breakdown */
        .budget-breakdown {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .budget-category {
          background: white;
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          border-left: 4px solid;
          transition: all 0.3s ease;
        }

        .budget-category:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
        }

        .budget-category.needs {
          border-left-color: #3b82f6;
        }

        .budget-category.wants {
          border-left-color: #8b5cf6;
        }

        .budget-category.savings {
          border-left-color: #10b981;
        }

        .budget-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .budget-icon {
          font-size: 2rem;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .budget-category.needs .budget-icon {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
        }

        .budget-category.wants .budget-icon {
          background: linear-gradient(135deg, #8b5cf6, #7c3aed);
        }

        .budget-category.savings .budget-icon {
          background: linear-gradient(135deg, #10b981, #059669);
        }

        .budget-info h4 {
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .budget-info p {
          font-size: 0.9rem;
          color: #6b7280;
        }

        .budget-amount {
          font-size: 2rem;
          font-weight: 800;
          text-align: right;
        }

        .budget-category.needs .budget-amount {
          color: #3b82f6;
        }

        .budget-category.wants .budget-amount {
          color: #8b5cf6;
        }

        .budget-category.savings .budget-amount {
          color: #10b981;
        }

        /* Coming Soon */
        .coming-soon {
          text-align: center;
          padding: 5rem 2rem;
          position: relative;
        }

        .coming-soon-animation {
          position: relative;
          margin-bottom: 2rem;
        }

        .rocket {
          font-size: 4rem;
          animation: rocketFloat 3s ease-in-out infinite;
        }

        @keyframes rocketFloat {
          0%, 100% { transform: translateY(0px) rotate(-5deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        .stars {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 200px;
          height: 100px;
        }

        .star {
          position: absolute;
          animation: twinkle 2s ease-in-out infinite;
        }

        .star:nth-child(1) {
          top: 20%;
          left: 20%;
          animation-delay: 0s;
        }

        .star:nth-child(2) {
          top: 40%;
          right: 20%;
          animation-delay: 0.7s;
        }

        .star:nth-child(3) {
          bottom: 20%;
          left: 50%;
          animation-delay: 1.4s;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        .coming-soon h2 {
          font-size: 2rem;
          font-weight: 800;
          color: #374151;
          margin-bottom: 1rem;
        }

        .coming-soon p {
          color: #6b7280;
          font-size: 1.1rem;
          margin-bottom: 2rem;
        }

        .progress-bar {
          width: 200px;
          height: 8px;
          background: #e5e7eb;
          border-radius: 4px;
          margin: 0 auto;
          overflow: hidden;
        }

        .progress-fill {
          width: 0;
          height: 100%;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 4px;
          animation: progress 3s ease-in-out infinite;
        }

        @keyframes progress {
          0% { width: 0; }
          50% { width: 75%; }
          100% { width: 0; }
        }

        /* Animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .main-content {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            padding: 1rem;
          }

          .calculator-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .stats-row {
            gap: 1.5rem;
          }

          .stat-item {
            padding: 1.5rem 2rem;
          }

          .hero-title {
            font-size: 2.2rem;
          }

          .calculator-container {
            padding: 2rem;
          }

          .calculator-header h2 {
            font-size: 1.8rem;
          }

          .sidebar {
            position: static;
          }
        }
      `}</style>

      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon">🧮</div>
            <h1>Calculator Hub</h1>
          </div>
          <p className="tagline">Professional planning tools for everyone</p>
        </div>
      </header>

      {/* Hero Stats Section */}
      <section className="hero-stats">
        <div className="stats-container">
          <h1 className="hero-title">Professional Calculator Suite</h1>
          <p className="hero-subtitle">
            Free, powerful calculators based on proven mathematical principles. 
            Build wealth, eliminate debt, and achieve your money goals faster.
          </p>
          
          <div className="stats-row">
            <Counter target={20} label="Calculator Tools" suffix="+" />
            <Counter target={1000} label="Users Helped" />
            <Counter target={100} label="% Free Forever" suffix="%" />
          </div>
        </div>
      </section>

      <div className="main-content">
        {/* Sidebar Navigation */}
        <div className="sidebar">
          <h2>Calculator Categories</h2>
          
          {Object.entries(categories).map(([key, category]) => (
            <div key={key}>
              <button
                onClick={() => setActiveCategory(key)}
                className={`category-btn ${activeCategory === key ? 'active' : ''}`}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
              </button>
              
              {activeCategory === key && (
                <div className="calculator-list">
                  {category.calculators.map((calc) => (
                    <button
                      key={calc.id}
                      onClick={() => setActiveCalculator(calc.id)}
                      className={`calculator-btn ${activeCalculator === calc.id ? 'active' : ''}`}
                    >
                      <div className="calc-name">
                        {calc.name}
                        {calc.popular && <span className="calc-badge popular">Popular</span>}
                        {calc.featured && <span className="calc-badge featured">Featured</span>}
                      </div>
                      <div className="calc-desc">{calc.desc}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="content-area">
          {renderCalculator()}
        </div>
      </div>
    </div>
  );
};

export default FinancialCalculatorApp;