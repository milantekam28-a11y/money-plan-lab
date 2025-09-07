import React, { useState } from 'react';
import { Calculator, DollarSign, TrendingUp, Home, Shield, PiggyBank, CreditCard, Calendar, Percent } from 'lucide-react';

const FinancialCalculatorApp = () => {
  const [activeCategory, setActiveCategory] = useState('budget');
  const [activeCalculator, setActiveCalculator] = useState('emi');

  const categories = {
    budget: {
      name: 'Budget & Debt',
      icon: <PiggyBank className="w-5 h-5" />,
      calculators: [
        { id: 'emi', name: 'EMI Calculator', desc: 'Monthly loan payments' },
        { id: 'budget', name: '50/30/20 Budget', desc: 'Budget allocation rule' },
        { id: 'debt-payoff', name: 'Debt Payoff', desc: 'Avalanche vs Snowball' },
        { id: 'emergency-fund', name: 'Emergency Fund', desc: 'Emergency savings goal' }
      ]
    },
    loans: {
      name: 'Loans & Credit',
      icon: <CreditCard className="w-5 h-5" />,
      calculators: [
        { id: 'credit-card', name: 'Credit Card Payoff', desc: 'Credit card debt calculator' },
        { id: 'student-loan', name: 'Student Loan', desc: 'Education loan payoff' },
        { id: 'car-loan', name: 'Car Loan', desc: 'Auto financing calculator' },
        { id: 'medical-debt', name: 'Medical Debt', desc: 'Healthcare debt planning' }
      ]
    },
    investment: {
      name: 'Investment & Retirement',
      icon: <TrendingUp className="w-5 h-5" />,
      calculators: [
        { id: 'compound-interest', name: 'Compound Interest', desc: 'Investment growth calculator' },
        { id: 'retirement', name: 'Retirement Planner', desc: 'Retirement savings goal' },
        { id: '401k', name: '401k Calculator', desc: '401k contribution planner' },
        { id: 'roth-ira', name: 'Roth IRA', desc: 'Roth IRA calculator' }
      ]
    },
    realestate: {
      name: 'Real Estate',
      icon: <Home className="w-5 h-5" />,
      calculators: [
        { id: 'mortgage', name: 'Mortgage Calculator', desc: 'Home loan calculator' },
        { id: 'mortgage-payoff', name: 'Mortgage Payoff', desc: 'Early payoff calculator' },
        { id: 'affordability', name: 'House Affordability', desc: 'Home buying budget' },
        { id: 'rent-vs-buy', name: 'Rent vs Buy', desc: 'Rent vs buy comparison' }
      ]
    },
    planning: {
      name: 'Savings & Planning',
      icon: <Calendar className="w-5 h-5" />,
      calculators: [
        { id: 'vacation', name: 'Vacation Savings', desc: 'Travel savings planner' },
        { id: 'wedding', name: 'Wedding Budget', desc: 'Wedding expense planner' },
        { id: 'major-purchase', name: 'Major Purchase', desc: 'Large purchase planner' },
        { id: 'college-savings', name: 'College Savings', desc: 'Education savings plan' }
      ]
    },
    insurance: {
      name: 'Insurance & Benefits',
      icon: <Shield className="w-5 h-5" />,
      calculators: [
        { id: 'life-insurance', name: 'Life Insurance', desc: 'Life insurance needs' },
        { id: 'disability', name: 'Disability Insurance', desc: 'Disability coverage' },
        { id: 'hsa', name: 'HSA Calculator', desc: 'Health savings account' },
        { id: 'net-worth', name: 'Net Worth', desc: 'Net worth tracker' }
      ]
    },
    tools: {
      name: 'General Tools',
      icon: <Percent className="w-5 h-5" />,
      calculators: [
        { id: 'percentage', name: 'Percentage Calculator', desc: 'Various percentage calculations' },
        { id: 'age', name: 'Age Calculator', desc: 'Calculate exact age' },
        { id: 'days', name: 'Days Calculator', desc: 'Days between dates' }
      ]
    }
  };

  // EMI Calculator Component
  const EMICalculator = () => {
    const [principal, setPrincipal] = useState('100000');
    const [rate, setRate] = useState('10');
    const [tenure, setTenure] = useState('12');
    const [result, setResult] = useState(null);

    const calculateEMI = () => {
      const P = parseFloat(principal);
      const r = parseFloat(rate) / 100 / 12; // Monthly interest rate
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
    };

    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">EMI Calculator</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Amount ($)
              </label>
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="100000"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Annual Interest Rate (%)
              </label>
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="10"
                step="0.1"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Tenure (months)
              </label>
              <input
                type="number"
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="12"
              />
            </div>
            
            <button
              onClick={calculateEMI}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
            >
              Calculate EMI
            </button>
          </div>
          
          {result && (
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Results</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Monthly EMI:</span>
                  <span className="text-xl font-bold text-blue-600">${result.emi}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Payment:</span>
                  <span className="font-semibold text-gray-800">${result.totalPayment}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Interest:</span>
                  <span className="font-semibold text-red-600">${result.totalInterest}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Budget 50/30/20 Calculator
  const BudgetCalculator = () => {
    const [income, setIncome] = useState('5000');
    const [result, setResult] = useState(null);

    const calculateBudget = () => {
      const monthlyIncome = parseFloat(income);
      if (monthlyIncome) {
        setResult({
          needs: (monthlyIncome * 0.5).toFixed(2),
          wants: (monthlyIncome * 0.3).toFixed(2),
          savings: (monthlyIncome * 0.2).toFixed(2)
        });
      }
    };

    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">50/30/20 Budget Rule</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly After-Tax Income ($)
              </label>
              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="5000"
              />
            </div>
            
            <button
              onClick={calculateBudget}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition duration-200 font-medium"
            >
              Calculate Budget
            </button>
          </div>
          
          {result && (
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800">50% Needs</h4>
                <p className="text-2xl font-bold text-blue-600">${result.needs}</p>
                <p className="text-sm text-blue-600">Rent, utilities, groceries, debt payments</p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-800">30% Wants</h4>
                <p className="text-2xl font-bold text-purple-600">${result.wants}</p>
                <p className="text-sm text-purple-600">Entertainment, dining out, hobbies</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800">20% Savings</h4>
                <p className="text-2xl font-bold text-green-600">${result.savings}</p>
                <p className="text-sm text-green-600">Emergency fund, retirement, investments</p>
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
          <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg text-center">
            <Calculator className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Calculator Coming Soon</h2>
            <p className="text-gray-600">This calculator is being developed. Check back soon!</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Calculator className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Financial Calculator Hub</h1>
            </div>
            <p className="text-gray-600 hidden md:block">Free financial planning tools for everyone</p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Calculator Categories</h2>
              
              {Object.entries(categories).map(([key, category]) => (
                <div key={key} className="mb-4">
                  <button
                    onClick={() => setActiveCategory(key)}
                    className={`w-full flex items-center p-3 rounded-lg transition duration-200 ${
                      activeCategory === key 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {category.icon}
                    <span className="ml-3 font-medium">{category.name}</span>
                  </button>
                  
                  {activeCategory === key && (
                    <div className="mt-2 ml-8 space-y-2">
                      {category.calculators.map((calc) => (
                        <button
                          key={calc.id}
                          onClick={() => setActiveCalculator(calc.id)}
                          className={`block w-full text-left p-2 rounded transition duration-200 ${
                            activeCalculator === calc.id
                              ? 'bg-blue-50 text-blue-700 font-medium'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <div className="text-sm">{calc.name}</div>
                          <div className="text-xs text-gray-500">{calc.desc}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderCalculator()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialCalculatorApp;
