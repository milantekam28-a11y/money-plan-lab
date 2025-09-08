import React, { useState, useEffect } from 'react';

const FinancialCalculatorApp = () => {
  const [activeCategory, setActiveCategory] = useState('debt');
  const [activeCalculator, setActiveCalculator] = useState('emi');
  const [isLoading, setIsLoading] = useState(true);
  const [animateCounter, setAnimateCounter] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setAnimateCounter(true);
    }, 1500);
  }, []);

  const categories = {
    debt: {
      name: 'Get Out of Debt',
      icon: '🔗💥',
      description: 'Break free from the cycle of debt and reclaim your financial freedom with proven debt elimination strategies',
      color: 'linear-gradient(135deg, #dc2626, #b91c1c)',
      calculators: [
        {
          id: 'debt-payoff',
          title: 'General Debt Payoff',
          subtitle: 'Ultimate Debt Destroyer',
          description: 'Calculate the fastest way to pay off all your debts using avalanche or snowball methods with detailed payment schedules.',
          icon: '🔥',
          features: ['Multiple debt strategies', 'Interest savings calculator', 'Payment schedule timeline'],
          tags: ['Most Popular', 'Debt Avalanche', 'Debt Snowball'],
          featured: true,
          url: 'debt-payoff.html'
        },
        {
          id: 'credit-card',
          title: 'Credit Card Debt',
          subtitle: 'High-Interest Killer',
          description: 'Calculate minimum payments vs. aggressive payoff strategies for credit cards with compound interest analysis.',
          icon: '💳',
          features: ['APR impact analysis', 'Balance transfer options', 'Payment optimization'],
          tags: ['High Interest', 'APR Calculator', 'Balance Transfer'],
          url: 'credit-card-debt.html'
        },
        {
          id: 'student-loan',
          title: 'Student Loan Payoff',
          subtitle: 'Education Debt Freedom',
          description: 'Accelerate your student loan freedom with extra payment strategies, refinancing analysis, and forgiveness programs.',
          icon: '🎓',
          features: ['Refinancing comparison', 'Forgiveness program eligibility', 'Extra payment impact'],
          tags: ['Federal Loans', 'PSLF', 'Refinancing'],
          url: 'student-loan.html'
        },
        {
          id: 'car-loan',
          title: 'Car Loan Calculator',
          subtitle: 'Auto Financing Tool',
          description: 'Compare auto loan terms, calculate payments, and see the impact of down payments on your car financing.',
          icon: '🚗',
          features: ['Payment comparison', 'Down payment analysis', 'Trade-in value impact'],
          tags: ['Auto Loan', 'Down Payment', 'Trade-in'],
          url: 'car-loan.html'
        },
        {
          id: 'medical-debt',
          title: 'Medical Debt Calculator',
          subtitle: 'Healthcare Bill Manager',
          description: 'Handle unexpected medical bills with smart planning. Calculate payment plans, negotiate discounts, and protect your credit.',
          icon: '🏥',
          features: ['Payment plan options', 'Negotiation strategies', 'Credit protection tips'],
          tags: ['Payment Plans', 'Negotiation', 'Credit Protection'],
          url: 'medical_debt_calculator.html'
        }
      ]
    },
    budget: {
      name: 'Budgeting & Planning',
      icon: '📊',
      description: 'Build a solid financial foundation with smart budgeting tools and emergency planning strategies',
      color: 'linear-gradient(135deg, #f59e0b, #d97706)',
      calculators: [
        {
          id: 'budget',
          title: 'Budget Calculator',
          subtitle: 'Zero-Based Budgeting',
          description: 'Create your zero-based budget using Dave Ramsey\'s proven budgeting principles and EveryDollar method.',
          icon: '📋',
          features: ['Income vs. expenses tracking', 'Category recommendations', 'Surplus/deficit analysis'],
          tags: ['Essential', 'Zero-Based', 'EveryDollar'],
          featured: true,
          url: 'budget_calculator.html'
        },
        {
          id: 'emergency-fund',
          title: 'Emergency Fund Calculator',
          subtitle: 'Financial Safety Net',
          description: 'Calculate how much you need in your emergency fund based on your monthly expenses and family situation.',
          icon: '🛡️',
          features: ['3-6 months expenses', 'Job stability factors', 'Savings timeline'],
          tags: ['3-6 Months', 'Safety Net', 'Peace of Mind'],
          url: 'emergency-fund.html'
        },
        {
          id: 'savings-goal',
          title: 'Savings Goal Calculator',
          subtitle: 'Goal Achievement Tool',
          description: 'Set and track your savings goals with detailed timelines and monthly contribution requirements.',
          icon: '🎯',
          features: ['Multiple goal tracking', 'Timeline optimization', 'Progress visualization'],
          tags: ['Goal Setting', 'Progress Tracking', 'Motivation'],
          url: 'savings-goal.html'
        },
        {
          id: 'college-savings',
          title: 'College Savings Calculator',
          subtitle: 'Education Planning',
          description: 'Calculate how much to save monthly for your child\'s college education without compromising retirement.',
          icon: '🎓',
          features: ['529 plan optimization', 'Education inflation factor', 'State tax benefits'],
          tags: ['529 Plans', 'Education Savings', 'Tax Benefits'],
          url: 'college-savings.html'
        }
      ]
    },
    investment: {
      name: 'Investment & Retirement',
      icon: '📈',
      description: 'Build wealth and plan for your golden years with compound interest and smart investment strategies',
      color: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
      calculators: [
        {
          id: 'compound-interest',
          title: 'Compound Interest Calculator',
          subtitle: 'The 8th Wonder of the World',
          description: 'Visualize the power of compound interest with detailed charts and timeline projections.',
          icon: '✨',
          features: ['Visual growth charts', 'Different compounding frequencies', 'Einstein\'s favorite formula'],
          tags: ['Einstein Quote', 'Magic of Math', 'Exponential Growth'],
          popular: true,
          url: 'compound-interest.html'
        },
        {
          id: 'retirement',
          title: 'Retirement Calculator',
          subtitle: 'Retirement Planning Tool',
          description: 'Determine how much you need to save monthly to reach your retirement goals and live comfortably.',
          icon: '🏖️',
          features: ['401k match optimization', 'Social Security planning', 'Withdrawal strategies'],
          tags: ['401k Planning', 'Nest Egg', 'Social Security'],
          url: 'retirement.html'
        },
        {
          id: 'investment',
          title: 'Investment Calculator',
          subtitle: 'Compound Interest Power',
          description: 'Calculate how your investments can grow with compound interest using historically proven return rates.',
          icon: '📊',
          features: ['Historical market returns', 'Regular contribution tracking', 'Inflation adjustment'],
          tags: ['Popular', 'Compound Interest', 'Long-term Growth'],
          url: 'investment.html'
        },
        {
          id: '401k',
          title: '401k Calculator',
          subtitle: 'Employer Match Maximizer',
          description: 'Optimize your 401k contributions to maximize employer matching and tax benefits.',
          icon: '💼',
          features: ['Employer match calculator', 'Tax savings analysis', 'Contribution limits tracking'],
          tags: ['Employer Match', 'Tax Benefits', 'Free Money'],
          url: '401k-calculator.html'
        },
        {
          id: 'roth-ira',
          title: 'Roth IRA Calculator',
          subtitle: 'Tax-Free Growth',
          description: 'Calculate the tax-free growth potential of Roth IRA contributions vs. traditional IRA.',
          icon: '🪙',
          features: ['Tax-free withdrawals', 'Roth vs. Traditional comparison', 'Income limit calculator'],
          tags: ['Tax-Free', 'Roth IRA', 'Retirement'],
          url: 'roth-ira.html'
        },
        {
          id: 'net-worth',
          title: 'Net Worth Calculator',
          subtitle: 'Wealth Tracking Tool',
          description: 'Calculate your total net worth by subtracting liabilities from assets to track your financial progress.',
          icon: '💎',
          features: ['Asset categorization', 'Liability tracking', 'Progress monitoring'],
          tags: ['Wealth Tracking', 'Assets vs Debts', 'Progress'],
          url: 'net-worth.html'
        }
      ]
    },
    realestate: {
      name: 'Real Estate & Housing',
      icon: '🏠',
      description: 'Make smart decisions about your biggest investment with comprehensive property analysis tools',
      color: 'linear-gradient(135deg, #10b981, #059669)',
      calculators: [
        {
          id: 'mortgage',
          title: 'Mortgage Calculator',
          subtitle: 'Home Loan Analyzer',
          description: 'Calculate monthly mortgage payments including principal, interest, taxes, insurance (PITI) and PMI.',
          icon: '🏡',
          features: ['PITI breakdown', 'PMI calculation', 'Amortization schedule'],
          tags: ['Essential', 'PITI Calculator', 'Home Buying'],
          featured: true,
          url: 'mortgage.html'
        },
        {
          id: 'mortgage-payoff',
          title: 'Mortgage Payoff Calculator',
          subtitle: 'Early Payoff Planner',
          description: 'See how extra principal payments can save you thousands and help you own your home sooner.',
          icon: '🎯',
          features: ['Interest savings calculation', 'Time reduction analysis', 'Payment schedule optimization'],
          tags: ['Extra Payments', 'Interest Savings', 'Own Sooner'],
          url: 'mortgage-payoff.html'
        },
        {
          id: 'house-affordability',
          title: 'House Affordability Calculator',
          subtitle: 'Smart Buying Guide',
          description: 'Determine how much house you can afford based on income, debts, and down payment.',
          icon: '🧮',
          features: ['28/36 rule application', 'DTI consideration', 'Down payment impact'],
          tags: ['28/36 Rule', 'Safe Buying', 'Budget Planning'],
          url: 'house-affordability.html'
        },
        {
          id: 'rent-vs-buy',
          title: 'Rent vs Buy Calculator',
          subtitle: 'Decision Analysis Tool',
          description: 'Compare the long-term costs of renting vs. buying to make the best housing decision.',
          icon: '⚖️',
          features: ['Total cost comparison', 'Opportunity cost analysis', 'Break-even point'],
          tags: ['Total Cost', 'Opportunity Cost', 'Smart Decision'],
          url: 'rent-vs-buy.html'
        },
        {
          id: 'refinance',
          title: 'Refinance Calculator',
          subtitle: 'Refinancing Analysis',
          description: 'Determine if refinancing your mortgage makes financial sense with break-even analysis.',
          icon: '🔄',
          features: ['Break-even calculation', 'Closing cost analysis', 'Monthly savings potential'],
          tags: ['Break-even', 'Lower Rates', 'Monthly Savings'],
          url: 'refinance.html'
        }
      ]
    },
    travel: {
      name: 'Travel & Purchase Planning',
      icon: '✈️',
      description: 'Plan major purchases and dream vacations without breaking your budget or going into debt',
      color: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
      calculators: [
        {
          id: 'vacation-savings',
          title: 'Vacation Savings Calculator',
          subtitle: 'Dream Trip Planner',
          description: 'Calculate how much to save monthly for your dream vacation without using credit cards.',
          icon: '🧳',
          features: ['Trip cost breakdown', 'Monthly savings plan', 'Timeline optimization'],
          tags: ['Dream Vacation', 'No Debt', 'Travel Planning'],
          url: 'vacation-savings.html'
        },
        {
          id: 'major-purchase',
          title: 'Major Purchase Planner',
          subtitle: 'Smart Buying Strategy',
          description: 'Plan for major purchases like appliances, furniture, or electronics without financing.',
          icon: '🛒',
          features: ['Cash vs. credit analysis', 'Savings timeline', 'Opportunity cost calculation'],
          tags: ['Cash Purchase', 'No Interest', 'Smart Buying'],
          url: 'major-purchase.html'
        },
        {
          id: 'wedding-budget',
          title: 'Wedding Budget Calculator',
          subtitle: 'Special Day Planner',
          description: 'Plan your perfect wedding without starting married life in debt with smart budgeting.',
          icon: '💖',
          features: ['Category budget allocation', 'Guest count impact', 'Savings timeline'],
          tags: ['Wedding Planning', 'Debt-Free Start', 'Budget Breakdown'],
          url: 'wedding-budget.html'
        }
      ]
    },
    insurance: {
      name: 'Insurance & Protection',
      icon: '🛡️',
      description: 'Protect your family and financial future with appropriate insurance coverage planning',
      color: 'linear-gradient(135deg, #f59e0b, #d97706)',
      calculators: [
        {
          id: 'life-insurance',
          title: 'Life Insurance Calculator',
          subtitle: 'Family Protection Tool',
          description: 'Calculate how much term life insurance you need to protect your family using proven mathematical formulas.',
          icon: '👨‍👩‍👧‍👦',
          features: ['Income replacement calculation', 'Debt coverage analysis', 'Future needs planning'],
          tags: ['Essential', 'Term Life', 'Family Protection'],
          featured: true,
          url: 'life-insurance.html'
        },
        {
          id: 'disability-insurance',
          title: 'Disability Insurance Calculator',
          subtitle: 'Income Protection',
          description: 'Determine how much disability insurance you need to protect your income and lifestyle.',
          icon: '♿',
          features: ['Income replacement ratio', 'Short vs. long term', 'Employer benefit analysis'],
          tags: ['Income Protection', 'Disability Coverage', 'Risk Management'],
          url: 'disability-insurance.html'
        },
        {
          id: 'hsa-calculator',
          title: 'HSA Calculator',
          subtitle: 'Health Savings Account',
          description: 'Maximize your Health Savings Account contributions for triple tax advantages.',
          icon: '🏥',
          features: ['Triple tax advantage', 'Retirement healthcare planning', 'Investment growth potential'],
          tags: ['Triple Tax Benefit', 'Health Savings', 'Retirement Tool'],
          url: 'health-savings-account.html'
        }
      ]
    },
    utilities: {
      name: 'Financial Utilities & Tools',
      icon: '🔧',
      description: 'Handy financial tools and calculators for everyday money management tasks',
      color: 'linear-gradient(135deg, #06b6d4, #0891b2)',
      calculators: [
        {
          id: 'days-between',
          title: 'Days Between Dates Calculator',
          subtitle: 'Date Difference Tool',
          description: 'Calculate the exact number of days between two dates for financial planning and goal tracking.',
          icon: '📅',
          features: ['Exact day calculation', 'Business days option', 'Age calculator'],
          tags: ['Date Calculator', 'Planning Tool', 'Goal Tracking'],
          popular: true,
          url: 'days-between-dates.html'
        },
        {
          id: 'tax-calculator',
          title: 'Tax Calculator',
          subtitle: 'Income Tax Estimator',
          description: 'Estimate your federal and state income taxes based on your income and filing status.',
          icon: '📋',
          features: ['Federal tax calculation', 'State tax estimates', 'Deduction optimization'],
          tags: ['Tax Planning', 'Income Tax', 'Deductions'],
          url: 'tax-calculator.html'
        },
        {
          id: 'tip-calculator',
          title: 'Tip Calculator',
          subtitle: 'Quick Tip Calculator',
          description: 'Calculate tips and split bills easily for restaurants, services, and group dining.',
          icon: '🧾',
          features: ['Multiple tip percentages', 'Bill splitting', 'Service quality guide'],
          tags: ['Tip Calculator', 'Bill Splitting', 'Dining'],
          url: 'tip-calculator.html'
        }
      ]
    }
  };

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

  const BudgetCalculator = () => {
    const [income, setIncome] = useState('5000');
    const [needs, setNeeds] = useState('');
    const [wants, setWants] = useState('');
    const [debts, setDebts] = useState('');
    const [result, setResult] = useState(null);
    const [calculating, setCalculating] = useState(false);

    const calculateBudget = () => {
      setCalculating(true);
      
      setTimeout(() => {
        const monthlyIncome = parseFloat(income);
        const needsAmount = parseFloat(needs) || 0;
        const wantsAmount = parseFloat(wants) || 0;
        const debtsAmount = parseFloat(debts) || 0;
        
        if (monthlyIncome) {
          const totalExpenses = needsAmount + wantsAmount + debtsAmount;
          const leftover = monthlyIncome - totalExpenses;
          
          setResult({
            totalIncome: monthlyIncome.toFixed(2),
            totalExpenses: totalExpenses.toFixed(2),
            leftover: leftover.toFixed(2),
            needsPercent: ((needsAmount / monthlyIncome) * 100).toFixed(1),
            wantsPercent: ((wantsAmount / monthlyIncome) * 100).toFixed(1),
            debtsPercent: ((debtsAmount / monthlyIncome) * 100).toFixed(1)
          });
        }
        setCalculating(false);
      }, 1000);
    };

    return (
      <div className="calculator-container">
        <div className="calculator-header">
          <div className="calculator-icon">📊</div>
          <h2>Budget Calculator</h2>
          <p>Create your zero-based budget using proven budgeting principles</p>
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

            <div className="input-group">
              <label>Needs (Housing, Food, Utilities)</label>
              <div className="input-wrapper">
                <span className="input-prefix">$</span>
                <input
                  type="number"
                  value={needs}
                  onChange={(e) => setNeeds(e.target.value)}
                  placeholder="2,500"
                />
              </div>
            </div>

            <div className="input-group">
              <label>Wants (Entertainment, Dining Out)</label>
              <div className="input-wrapper">
                <span className="input-prefix">$</span>
                <input
                  type="number"
                  value={wants}
                  onChange={(e) => setWants(e.target.value)}
                  placeholder="1,500"
                />
              </div>
            </div>

            <div className="input-group">
              <label>Debt Payments</label>
              <div className="input-wrapper">
                <span className="input-prefix">$</span>
                <input
                  type="number"
                  value={debts}
                  onChange={(e) => setDebts(e.target.value)}
                  placeholder="500"
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
              <h3>🎯 Your Budget Analysis</h3>
              
              <div className="budget-breakdown">
                <div className="budget-category income">
                  <div className="budget-header">
                    <div className="budget-icon">💰</div>
                    <div className="budget-info">
                      <h4>Monthly Income</h4>
                      <p>Your total after-tax income</p>
                    </div>
                  </div>
                  <div className="budget-amount">${result.totalIncome}</div>
                </div>
                
                <div className="budget-category expenses">
                  <div className="budget-header">
                    <div className="budget-icon">📝</div>
                    <div className="budget-info">
                      <h4>Total Expenses</h4>
                      <p>Needs + Wants + Debt payments</p>
                    </div>
                  </div>
                  <div className="budget-amount">${result.totalExpenses}</div>
                </div>
                
                <div className={`budget-category ${parseFloat(result.leftover) >= 0 ? 'surplus' : 'deficit'}`}>
                  <div className="budget-header">
                    <div className="budget-icon">{parseFloat(result.leftover) >= 0 ? '✅' : '⚠️'}</div>
                    <div className="budget-info">
                      <h4>{parseFloat(result.leftover) >= 0 ? 'Surplus' : 'Deficit'}</h4>
                      <p>{parseFloat(result.leftover) >= 0 ? 'Money left for savings' : 'You\'re overspending'}</p>
                    </div>
                  </div>
                  <div className="budget-amount">${result.leftover}</div>
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
        <div className="stat-icon">
          <span className="stat-icon-emoji">
            {label.includes('Calculator') && '🧮'}
            {label.includes('Users') && '👥'}
            {label.includes('Saved') && '💰'}
            {label.includes('Free') && '❤️'}
          </span>
        </div>
        <div className="stat-number">{formatNumber(count)}{suffix}</div>
        <div className="stat-label">{label}</div>
        <div className="stat-description">
          {label.includes('Calculator') && 'Comprehensive tools for every financial decision'}
          {label.includes('Users') && 'Growing community of smart money managers'}
          {label.includes('Saved') && 'Total savings achieved by our users'}
          {label.includes('Free') && 'No hidden fees, ever'}
        </div>
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
          <h2>Money Plan Lab</h2>
          <p>Loading your financial tools...</p>
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
        <style jsx>{`
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
            animation: loading 1.5s ease-in-out infinite;
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
        `}</style>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <nav className="nav-container">
          <a href="#" className="logo">
            <span className="logo-icon">🧮</span>
            Money Plan Lab
          </a>
          <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
            <li className="nav-item"><a href="#calculators">Calculators</a></li>
            <li className="nav-item"><a href="#features">Features</a></li>
            <li className="nav-item"><a href="#about">About</a></li>
            <li className="nav-item"><a href="#contact">Contact</a></li>
          </ul>
          <div 
            className="mobile-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="floating-elements"></div>
        <div className="hero-content">
          <h1>Take Control of Your Financial Future</h1>
          <p>Free, powerful financial calculators based on proven mathematical principles. Build wealth, eliminate debt, and achieve your money goals faster with our comprehensive suite of tools.</p>
          <div className="cta-buttons">
            <a href="#calculators" className="btn-primary">
              <span className="btn-icon">🧮</span>
              Start Calculating
            </a>
            <a href="#features" className="btn-secondary">
              <span className="btn-icon">📈</span>
              See Features
            </a>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="trusted-by">
        <div className="trusted-content">
          <p className="trusted-text">Trusted by Financial Professionals Worldwide</p>
          <div className="trust-indicators">
            <div className="trust-item">
              <span className="trust-icon">🛡️</span>
              <span>100% Secure</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">👥</span>
              <span>500K+ Users</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">⭐</span>
              <span>4.9/5 Rating</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">📱</span>
              <span>Mobile Friendly</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">♾️</span>
              <span>Free Forever</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stats-container">
          <div className="stats-grid">
            <Counter target={25} label="Calculator Tools" suffix="+" />
            <Counter target={500000} label="Users Helped" />
            <Counter target={50000000} label="Dollars Saved" />
            <Counter target={100} label="% Free Forever" suffix="%" />
          </div>
        </div>
      </section>

      {/* Calculator Categories */}
      <section className="calculators" id="calculators">
        <div className="calculators-container">
          <div className="section-header">
            <h2 className="section-title">Complete Financial Calculator Suite</h2>
            <p className="section-subtitle">Choose from our comprehensive collection of professional-grade financial tools designed to help you make smarter money decisions</p>
          </div>

          {Object.entries(categories).map(([key, category]) => (
            <div key={key} className={`category-section ${key}-category`}>
              <div className="category-header" style={{ background: category.color }}>
                <div className="category-icon">{category.icon}</div>
                <div className="category-info">
                  <div className="category-title">{category.name}</div>
                  <div className="category-description">{category.description}</div>
                </div>
              </div>
              
              <div className="calculator-grid">
                {category.calculators.map((calc) => (
                  <div 
                    key={calc.id} 
                    className="calculator-card"
                    onClick={() => {
                      if (calc.url) {
                        window.open(calc.url, '_blank');
                      } else if (calc.id === 'emi') {
                        setActiveCalculator(calc.id);
                        document.getElementById('calculator-display')?.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        setActiveCalculator(calc.id);
                      }
                    }}
                  >
                    <div className="card-content">
                      <div className="card-header">
                        <div className="card-icon" style={{ background: category.color }}>
                          <span>{calc.icon}</span>
                        </div>
                        <div>
                          <h3 className="card-title">{calc.title}</h3>
                          <p className="card-subtitle">{calc.subtitle}</p>
                        </div>
                      </div>
                      <p className="card-description">{calc.description}</p>
                      <ul className="card-features">
                        {calc.features.map((feature, idx) => (
                          <li key={idx}>
                            <span className="feature-check">✓</span> {feature}
                          </li>
                        ))}
                      </ul>
                      <div className="card-action">
                        <span className="card-link">
                          Try Calculator
                          <span className="arrow">→</span>
                        </span>
                      </div>
                      <div className="card-tags">
                        {calc.tags.map((tag, idx) => (
                          <span 
                            key={idx} 
                            className={`tag ${calc.featured ? 'featured' : ''} ${calc.popular ? 'popular' : ''}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pro-tip">
                <div className="pro-tip-header">
                  <span className="tip-icon">💡</span>
                  <span className="pro-tip-title">Pro Tip</span>
                </div>
                <div className="pro-tip-content">
                  {key === 'debt' && 'Focus on paying off high-interest debt first (debt avalanche) to save the most money, or use the debt snowball method if you need psychological wins to stay motivated. Both methods work - choose the one you\'ll stick with!'}
                  {key === 'budget' && 'Start with zero-based budgeting for maximum control. Always build your emergency fund before aggressive debt payoff or investing!'}
                  {key === 'investment' && 'Start investing early, even with small amounts. A 25-year-old investing $200/month will have more at retirement than a 35-year-old investing $400/month - that\'s the power of compound interest and time!'}
                  {key === 'realestate' && 'Follow the 28/36 rule: spend no more than 28% of gross income on housing and 36% on total debt payments. Remember, being "house poor" can derail your other financial goals!'}
                  {key === 'travel' && 'Save for major purchases and vacations in advance. This prevents debt accumulation and often allows you to take advantage of cash discounts or better deals!'}
                  {key === 'insurance' && 'Buy term life insurance and invest the difference. Whole life insurance is a poor investment - separate your insurance needs from your investment strategy for better results!'}
                  {key === 'utilities' && 'Use these handy tools to complement your main financial planning. The days calculator is especially useful for tracking savings goals and debt payoff timelines!'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="features-container">
          <div className="section-header">
            <h2 className="section-title">Why Choose Money Plan Lab?</h2>
            <p className="section-subtitle">Built with proven financial principles and designed for real results</p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <span>📱</span>
              </div>
              <h3 className="feature-title">Mobile Responsive</h3>
              <p className="feature-description">Works perfectly on all devices - mobile, tablet, and desktop for calculating on the go</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <span>🔒</span>
              </div>
              <h3 className="feature-title">Privacy First</h3>
              <p className="feature-description">All calculations happen in your browser - your financial data never leaves your device</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <span>⚡</span>
              </div>
              <h3 className="feature-title">Instant Results</h3>
              <p className="feature-description">Get immediate calculations and see real-time updates as you adjust your numbers</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <span>🏆</span>
              </div>
              <h3 className="feature-title">Proven Formulas</h3>
              <p className="feature-description">Built on mathematically sound financial principles used by professionals worldwide</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <span>📊</span>
              </div>
              <h3 className="feature-title">Visual Analytics</h3>
              <p className="feature-description">Interactive charts and graphs help you visualize your financial progress and goals</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <span>❤️</span>
              </div>
              <h3 className="feature-title">Completely Free</h3>
              <p className="feature-description">No hidden fees, no sign-ups required - access all calculators immediately and forever</p>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Calculator Display */}
      {activeCalculator && (
        <section className="calculator-display" id="calculator-display">
          <div className="calculator-display-container">
            {renderCalculator()}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="footer" id="contact">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo">
                <span className="footer-logo-icon">🧮</span>
                Money Plan Lab
              </div>
              <p className="footer-description">
                Take charge of your money, career and life goals with powerful financial planning tools based on proven mathematical principles. Start your journey to financial freedom today.
              </p>
              <div className="social-links">
                <a href="#" className="social-link" aria-label="Facebook">
                  <span>📘</span>
                </a>
                <a href="#" className="social-link" aria-label="Twitter">
                  <span>🐦</span>
                </a>
                <a href="#" className="social-link" aria-label="LinkedIn">
                  <span>💼</span>
                </a>
                <a href="#" className="social-link" aria-label="YouTube">
                  <span>📺</span>
                </a>
              </div>
            </div>

            <div className="footer-section">
              <h3>Debt Calculators</h3>
              <ul className="footer-links">
                <li><a href="debt-payoff.html" target="_blank">General Debt Payoff</a></li>
                <li><a href="credit-card-debt.html" target="_blank">Credit Card Debt</a></li>
                <li><a href="student-loan.html" target="_blank">Student Loan Payoff</a></li>
                <li><a href="car-loan.html" target="_blank">Car Loan</a></li>
                <li><a href="medical_debt_calculator.html" target="_blank">Medical Debt</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>Investment & Planning</h3>
              <ul className="footer-links">
                <li><a href="budget_calculator.html" target="_blank">Budget Calculator</a></li>
                <li><a href="emergency-fund.html" target="_blank">Emergency Fund</a></li>
                <li><a href="investment.html" target="_blank">Investment Calculator</a></li>
                <li><a href="retirement.html" target="_blank">Retirement Planning</a></li>
                <li><a href="401k-calculator.html" target="_blank">401k Calculator</a></li>
                <li><a href="net-worth.html" target="_blank">Net Worth Calculator</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>Real Estate & Tools</h3>
              <ul className="footer-links">
                <li><a href="mortgage.html" target="_blank">Mortgage Calculator</a></li>
                <li><a href="house-affordability.html" target="_blank">House Affordability</a></li>
                <li><a href="life-insurance.html" target="_blank">Life Insurance</a></li>
                <li><a href="vacation-savings.html" target="_blank">Vacation Savings</a></li>
                <li><a href="days-between-dates.html" target="_blank">Days Between Dates</a></li>
                <li><a href="tax-calculator.html" target="_blank">Tax Calculator</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2025 Money Plan Lab. All rights reserved. | Part of <a href="https://moneyplanlab.com/" target="_blank" style={{color: 'var(--primary)'}}>MoneyPlanLab.com</a> - Your complete financial education resource</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        :root {
          --primary: #2563eb;
          --primary-dark: #1d4ed8;
          --secondary: #10b981;
          --accent: #f59e0b;
          --accent-dark: #d97706;
          --danger: #dc2626;
          --danger-dark: #b91c1c;
          --success: #059669;
          --gray-50: #f9fafb;
          --gray-100: #f3f4f6;
          --gray-200: #e5e7eb;
          --gray-300: #d1d5db;
          --gray-400: #9ca3af;
          --gray-500: #6b7280;
          --gray-600: #4b5563;
          --gray-700: #374151;
          --gray-800: #1f2937;
          --gray-900: #111827;
          --white: #ffffff;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .app {
          min-height: 100vh;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color: var(--gray-800);
          background: var(--white);
          overflow-x: hidden;
        }

        /* Header */
        .header {
          position: sticky;
          top: 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--gray-200);
          z-index: 1000;
          transition: all 0.3s ease;
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 70px;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--primary);
          text-decoration: none;
        }

        .logo-icon {
          font-size: 2rem;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .nav-menu {
          display: flex;
          list-style: none;
          gap: 32px;
        }

        .nav-item a {
          color: var(--gray-700);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
          position: relative;
        }

        .nav-item a:hover {
          color: var(--primary);
        }

        .nav-item a::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -5px;
          left: 0;
          background: var(--primary);
          transition: width 0.3s ease;
        }

        .nav-item a:hover::after {
          width: 100%;
        }

        .mobile-toggle {
          display: none;
          flex-direction: column;
          cursor: pointer;
          gap: 4px;
        }

        .mobile-toggle span {
          width: 25px;
          height: 3px;
          background: var(--gray-700);
          transition: all 0.3s ease;
        }

        /* Hero Section */
        .hero {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 120px 20px 80px;
          text-align: center;
          color: white;
          position: relative;
          overflow: hidden;
        }

        .floating-elements {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 1;
        }

        .floating-elements::before,
        .floating-elements::after {
          content: '';
          position: absolute;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          animation: float 6s ease-in-out infinite;
        }

        .floating-elements::before {
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .floating-elements::after {
          top: 60%;
          right: 10%;
          animation-delay: 3s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .hero-content {
          max-width: 800px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .hero h1 {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          margin-bottom: 24px;
          line-height: 1.1;
        }

        .hero p {
          font-size: 1.25rem;
          margin-bottom: 40px;
          opacity: 0.95;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-primary, .btn-secondary {
          padding: 16px 32px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 1.1rem;
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .btn-primary {
          background: var(--white);
          color: var(--primary);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s;
        }

        .btn-primary:hover::before {
          left: 100%;
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-3px);
        }

        /* Trusted By Section */
        .trusted-by {
          padding: 60px 20px;
          background: var(--white);
          border-bottom: 1px solid var(--gray-200);
        }

        .trusted-content {
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
        }

        .trusted-text {
          color: var(--gray-600);
          font-size: 0.9rem;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 30px;
        }

        .trust-indicators {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 40px;
          flex-wrap: wrap;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--gray-600);
          font-size: 0.9rem;
        }

        .trust-icon {
          color: var(--success);
          font-size: 1.2rem;
        }

        /* Stats Section */
        .stats {
          padding: 80px 20px;
          background: var(--gray-50);
        }

        .stats-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 40px;
          text-align: center;
        }

        .stat-item {
          background: white;
          padding: 40px 30px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          border: 1px solid var(--gray-200);
          position: relative;
          overflow: hidden;
        }

        .stat-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
        }

        .stat-item:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
        }

        .stat-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
        }

        .stat-icon-emoji {
          font-size: 1.5rem;
          color: white;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--primary);
          display: block;
          margin-bottom: 8px;
        }

        .stat-label {
          color: var(--gray-600);
          font-weight: 500;
          font-size: 1rem;
        }

        .stat-description {
          color: var(--gray-500);
          font-size: 0.9rem;
          margin-top: 8px;
        }

        /* Calculator Categories */
        .calculators {
          padding: 100px 20px;
          background: var(--white);
        }

        .calculators-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .section-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .section-title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          color: var(--gray-900);
          margin-bottom: 16px;
        }

        .section-subtitle {
          font-size: 1.25rem;
          color: var(--gray-600);
          max-width: 600px;
          margin: 0 auto;
        }

        .category-section {
          margin-bottom: 80px;
        }

        .category-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 40px;
          padding: 30px;
          color: white;
          border-radius: 20px;
          box-shadow: 0 15px 40px rgba(37, 99, 235, 0.2);
          position: relative;
          overflow: hidden;
        }

        .category-icon {
          font-size: 3rem;
          opacity: 0.9;
          min-width: 60px;
        }

        .category-info {
          flex: 1;
        }

        .category-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .category-description {
          font-size: 1.1rem;
          opacity: 0.9;
          line-height: 1.5;
        }

        .calculator-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
          gap: 30px;
        }

        .calculator-card {
          background: white;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: all 0.3s ease;
          cursor: pointer;
          border: 1px solid var(--gray-200);
          position: relative;
        }

        .calculator-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          transition: all 0.3s ease;
        }

        .calculator-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.15);
        }

        .calculator-card:hover::before {
          height: 6px;
        }

        .card-content {
          padding: 35px;
        }

        .card-header {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          margin-bottom: 24px;
        }

        .card-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 1.5rem;
          color: white;
        }

        .card-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--gray-900);
          margin-bottom: 8px;
          line-height: 1.3;
        }

        .card-subtitle {
          color: var(--primary);
          font-weight: 600;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .card-description {
          color: var(--gray-600);
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .card-features {
          list-style: none;
          margin-bottom: 24px;
        }

        .card-features li {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
          color: var(--gray-600);
          font-size: 0.9rem;
        }

        .feature-check {
          color: var(--success);
          font-weight: bold;
          font-size: 0.8rem;
        }

        .card-action {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 20px;
        }

        .try-calculator-btn {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          color: white !important;
          border: none;
          padding: 14px 28px;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex !important;
          align-items: center;
          justify-content: center;
          gap: 10px;
          box-shadow: 0 6px 20px rgba(37, 99, 235, 0.3);
          position: relative;
          overflow: hidden;
          width: 100%;
          min-height: 48px;
          margin-top: 16px;
          text-decoration: none;
          z-index: 10;
        }

        .try-calculator-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }

        .try-calculator-btn:hover::before {
          left: 100%;
        }

        .try-calculator-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(37, 99, 235, 0.5);
        }

        .try-calculator-btn:hover .arrow {
          transform: translateX(5px);
        }

        .try-calculator-btn:active {
          transform: translateY(-1px);
        }

        .btn-text {
          font-weight: 600;
          color: white;
        }

        .arrow {
          transition: transform 0.3s ease;
          font-size: 1.2rem;
          color: white;
          font-weight: bold;
        }

        .card-link {
          color: var(--primary);
          font-weight: 600;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
        }

        .card-link:hover {
          gap: 12px;
        }

        .arrow {
          transition: transform 0.3s ease;
        }

        .card-link:hover .arrow {
          transform: translateX(4px);
        }

        .card-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: 16px;
        }

        .tag {
          background: var(--gray-100);
          color: var(--gray-600);
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .tag.featured {
          background: var(--primary);
          color: white;
        }

        .tag.popular {
          background: var(--accent);
          color: white;
        }

        /* Category-specific colors */
        .debt-category .calculator-card::before {
          background: linear-gradient(135deg, var(--danger), var(--danger-dark));
        }

        .debt-category .card-icon {
          background: linear-gradient(135deg, var(--danger), var(--danger-dark));
        }

        .budget-category .calculator-card::before {
          background: linear-gradient(135deg, var(--accent), var(--accent-dark));
        }

        .budget-category .card-icon {
          background: linear-gradient(135deg, var(--accent), var(--accent-dark));
        }

        .realestate-category .calculator-card::before {
          background: linear-gradient(135deg, var(--success), var(--secondary));
        }

        .realestate-category .card-icon {
          background: linear-gradient(135deg, var(--success), var(--secondary));
        }

        .travel-category .calculator-card::before {
          background: linear-gradient(135deg, #8b5cf6, #7c3aed);
        }

        .travel-category .card-icon {
          background: linear-gradient(135deg, #8b5cf6, #7c3aed);
        }

        .insurance-category .calculator-card::before {
          background: linear-gradient(135deg, #f59e0b, #d97706);
        }

        .insurance-category .card-icon {
          background: linear-gradient(135deg, #f59e0b, #d97706);
        }

        .utilities-category .calculator-card::before {
          background: linear-gradient(135deg, #06b6d4, #0891b2);
        }

        .utilities-category .card-icon {
          background: linear-gradient(135deg, #06b6d4, #0891b2);
        }

        /* Pro Tip Section */
        .pro-tip {
          background: linear-gradient(135deg, var(--gray-50), var(--gray-100));
          border-left: 4px solid var(--accent);
          padding: 20px;
          margin: 20px 0;
          border-radius: 10px;
        }

        .pro-tip-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }

        .tip-icon {
          color: var(--accent);
          font-size: 1.2rem;
        }

        .pro-tip-title {
          font-weight: 600;
          color: var(--gray-800);
        }

        .pro-tip-content {
          color: var(--gray-600);
          font-size: 0.95rem;
          line-height: 1.5;
        }

        /* Features Section */
        .features {
          padding: 100px 20px;
          background: var(--gray-50);
        }

        .features-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 40px;
        }

        .feature-card {
          background: white;
          padding: 45px 35px;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          border: 1px solid var(--gray-200);
          position: relative;
        }

        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          border-radius: 20px 20px 0 0;
        }

        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
        }

        .feature-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
          position: relative;
          font-size: 2rem;
          color: white;
        }

        .feature-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--gray-900);
          margin-bottom: 16px;
        }

        .feature-description {
          color: var(--gray-600);
          line-height: 1.6;
        }

        /* Calculator Display */
        .calculator-display {
          padding: 60px 20px;
          background: var(--gray-50);
        }

        .calculator-display-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Calculator Container */
        .calculator-container {
          background: white;
          border-radius: 24px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          border: 1px solid var(--gray-200);
          overflow: hidden;
          position: relative;
        }

        .calculator-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
        }

        .calculator-header {
          text-align: center;
          padding: 3rem 3rem 2rem;
        }

        .calculator-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
          animation: float 3s ease-in-out infinite;
        }

        .calculator-header h2 {
          font-size: 2.2rem;
          font-weight: 800;
          color: var(--gray-900);
          margin-bottom: 0.75rem;
        }

        .calculator-header p {
          color: var(--gray-600);
          font-size: 1.1rem;
        }

        .calculator-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          padding: 0 3rem 3rem;
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
          color: var(--gray-700);
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
          color: var(--gray-500);
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
          border: 2px solid var(--gray-200);
          border-radius: 16px;
          font-size: 1.1rem;
          font-weight: 500;
          transition: all 0.3s ease;
          background: white;
          color: var(--gray-700);
        }

        .input-group input:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
          transform: translateY(-2px);
        }

        /* Calculate Button */
        .calculate-btn {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          color: white;
          border: none;
          padding: 1.25rem 2rem;
          border-radius: 16px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(37, 99, 235, 0.4);
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
          box-shadow: 0 20px 40px rgba(37, 99, 235, 0.5);
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

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
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
          color: var(--gray-700);
          text-align: center;
          margin-bottom: 1rem;
        }

        .result-cards {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .result-card {
          background: var(--gray-50);
          border: 2px solid var(--gray-200);
          border-radius: 16px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .result-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .result-card.primary {
          background: linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(16, 185, 129, 0.1));
          border-color: var(--primary);
        }

        .result-card.danger {
          background: rgba(220, 38, 38, 0.1);
          border-color: var(--danger);
        }

        .result-icon {
          font-size: 2rem;
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3);
        }

        .result-card.danger .result-icon {
          background: linear-gradient(135deg, var(--danger), var(--danger-dark));
          box-shadow: 0 8px 20px rgba(220, 38, 38, 0.3);
        }

        .result-info {
          flex: 1;
        }

        .result-label {
          font-weight: 600;
          color: var(--gray-500);
          font-size: 0.9rem;
          margin-bottom: 0.25rem;
        }

        .result-value {
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--gray-700);
        }

        .result-card.primary .result-value {
          color: var(--primary);
        }

        .result-card.danger .result-value {
          color: var(--danger);
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

        .budget-category.income {
          border-left-color: #059669;
        }

        .budget-category.expenses {
          border-left-color: #f59e0b;
        }

        .budget-category.surplus {
          border-left-color: #10b981;
        }

        .budget-category.deficit {
          border-left-color: #dc2626;
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

        .budget-category.income .budget-icon {
          background: linear-gradient(135deg, #059669, #047857);
        }

        .budget-category.expenses .budget-icon {
          background: linear-gradient(135deg, #f59e0b, #d97706);
        }

        .budget-category.surplus .budget-icon {
          background: linear-gradient(135deg, #10b981, #059669);
        }

        .budget-category.deficit .budget-icon {
          background: linear-gradient(135deg, #dc2626, #b91c1c);
        }

        .budget-info h4 {
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .budget-info p {
          font-size: 0.9rem;
          color: var(--gray-600);
        }

        .budget-amount {
          font-size: 2rem;
          font-weight: 800;
          text-align: right;
        }

        .budget-category.income .budget-amount {
          color: #059669;
        }

        .budget-category.expenses .budget-amount {
          color: #f59e0b;
        }

        .budget-category.surplus .budget-amount {
          color: #10b981;
        }

        .budget-category.deficit .budget-amount {
          color: #dc2626;
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
          color: var(--gray-700);
          margin-bottom: 1rem;
        }

        .coming-soon p {
          color: var(--gray-600);
          font-size: 1.1rem;
          margin-bottom: 2rem;
        }

        .progress-bar {
          width: 200px;
          height: 8px;
          background: var(--gray-200);
          border-radius: 4px;
          margin: 0 auto;
          overflow: hidden;
        }

        .progress-fill {
          width: 0;
          height: 100%;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          border-radius: 4px;
          animation: progress 3s ease-in-out infinite;
        }

        @keyframes progress {
          0% { width: 0; }
          50% { width: 75%; }
          100% { width: 0; }
        }

        /* Footer */
        .footer {
          background: var(--gray-900);
          color: var(--gray-300);
          padding: 60px 20px 30px;
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 60px;
          margin-bottom: 40px;
        }

        .footer-brand {
          color: white;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 16px;
        }

        .footer-logo-icon {
          color: var(--primary);
          font-size: 2rem;
        }

        .footer-description {
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .social-links {
          display: flex;
          gap: 16px;
        }

        .social-link {
          width: 40px;
          height: 40px;
          background: var(--gray-800);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--gray-400);
          text-decoration: none;
          transition: all 0.3s ease;
          font-size: 1.2rem;
        }

        .social-link:hover {
          background: var(--primary);
          color: white;
          transform: translateY(-2px);
        }

        .footer-section h3 {
          color: white;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .footer-links {
          list-style: none;
        }

        .footer-links li {
          margin-bottom: 12px;
        }

        .footer-links a {
          color: var(--gray-400);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-links a:hover {
          color: var(--primary);
        }

        .footer-bottom {
          border-top: 1px solid var(--gray-800);
          padding-top: 30px;
          text-align: center;
          color: var(--gray-500);
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .calculator-grid {
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .nav-menu {
            position: fixed;
            top: 70px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: white;
            flex-direction: column;
            justify-content: flex-start;
            padding: 40px 20px;
            transition: left 0.3s ease;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
          }

          .nav-menu.active {
            left: 0;
          }

          .mobile-toggle {
            display: flex;
          }

          .hero {
            padding: 80px 20px 60px;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }

          .btn-primary, .btn-secondary {
            width: 100%;
            max-width: 300px;
            justify-content: center;
          }

          .stats {
            padding: 60px 20px;
          }

          .stats-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          }

          .calculators {
            padding: 80px 20px;
          }

          .calculator-grid {
            grid-template-columns: 1fr;
          }

          .category-header {
            flex-direction: column;
            text-align: center;
            gap: 16px;
            padding: 25px;
          }

          .category-icon {
            font-size: 2.5rem;
          }

          .category-title {
            font-size: 1.6rem;
          }

          .card-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }

          .trust-indicators {
            gap: 20px;
          }

          .calculator-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .calculator-header {
            padding: 2rem 2rem 1rem;
          }

          .calculator-content {
            padding: 0 2rem 2rem;
          }

          .footer-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
      `}</style>
    </div>
  );
};

export default FinancialCalculatorApp;