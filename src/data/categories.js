// src/data/categories.js
export const categories = {
  debt: {
    name: 'Get Out of Debt',
    icon: '🔗💥',
    description: 'Break free from the cycle of debt and reclaim your financial freedom with proven debt elimination strategies',
    color: 'linear-gradient(135deg, #dc2626, #b91c1c)',
    categoryUrl: '/debt-calculators',
    seoKeywords: 'debt payoff calculator, debt snowball, debt avalanche, credit card payoff, loan calculator',
    calculators: [
      {
        id: 'emi-calculator',
        title: 'Universal EMI Calculator',
        subtitle: 'Loan Payment Calculator',
        description: 'Calculate monthly EMI payments for any loan with principal, interest rate, and tenure.',
        icon: '💰',
        features: ['Monthly EMI calculation', 'Total interest payable', 'Payment breakdown'],
        tags: ['Most Popular', 'Loan Calculator', 'Monthly Payment'],
        featured: true,
        url: '/debt-calculators/emi-calculator'
      },
      {
        id: 'universal-debt-payoff',
        title: 'Universal Debt Payoff Calculator',
        subtitle: 'Ultimate Debt Destroyer',
        description: 'Calculate the fastest way to pay off all your debts using avalanche or snowball methods.',
        icon: '🔥',
        features: ['Multiple debt strategies', 'Global currency support', 'Interest savings calculator'],
        tags: ['Most Popular', 'Debt Avalanche', 'Debt Snowball'],
        featured: true,
        url: '/debt-calculators/universal-debt-payoff'
      },
      {
        id: 'credit-card',
        title: 'Credit Cards Payoff Calculator',
        subtitle: 'High-Interest Killer',
        description: 'Calculate minimum payments vs. aggressive payoff strategies for credit cards with compound interest analysis.',
        icon: '💳',
        features: ['APR impact analysis', 'Balance transfer options', 'Payment optimization'],
        tags: ['High Interest', 'APR Calculator', 'Balance Transfer'],
        url: '/debt-calculators/Credit-Cards-Payoff-Calculator'
      },
      {
        id: 'student-loan',
        title: 'Student Loan Payoff',
        subtitle: 'Education Debt Freedom',
        description: 'Accelerate your student loan freedom with extra payment strategies, refinancing analysis, and forgiveness programs.',
        icon: '🎓',
        features: ['Refinancing comparison', 'Forgiveness program eligibility', 'Extra payment impact'],
        tags: ['Federal Loans', 'PSLF', 'Refinancing'],
        url: 'https://studentloanhero.com/calculators/student-loan-payoff-calculator/'
      },
      {
        id: 'car-loan',
        title: 'Car Loan Calculator',
        subtitle: 'Auto Financing Tool',
        description: 'Compare auto loan terms, calculate payments, and see the impact of down payments on your car financing.',
        icon: '🚗',
        features: ['Payment comparison', 'Down payment analysis', 'Trade-in value impact'],
        tags: ['Auto Loan', 'Down Payment', 'Trade-in'],
        url: 'https://www.bankrate.com/calculators/auto/auto-loan-calculator.aspx'
      },
      {
        id: 'medical-debt',
        title: 'Medical Debt Calculator',
        subtitle: 'Healthcare Bill Manager',
        description: 'Handle unexpected medical bills with smart planning. Calculate payment plans, negotiate discounts, and protect your credit.',
        icon: '🏥',
        features: ['Payment plan options', 'Negotiation strategies', 'Credit protection tips'],
        tags: ['Payment Plans', 'Negotiation', 'Credit Protection'],
        url: 'https://www.nerdwallet.com/article/health/medical-debt-calculator'
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
        url: 'https://www.mint.com/budget-calculator'
      },
      {
        id: 'emergency-fund',
        title: 'Emergency Fund Calculator',
        subtitle: 'Financial Safety Net',
        description: 'Calculate how much you need in your emergency fund based on your monthly expenses and family situation.',
        icon: '🛡️',
        features: ['3-6 months expenses', 'Job stability factors', 'Savings timeline'],
        tags: ['3-6 Months', 'Safety Net', 'Peace of Mind'],
        url: 'https://www.nerdwallet.com/article/banking/emergency-fund-calculator'
      },
      {
        id: 'savings-goal',
        title: 'Savings Goal Calculator',
        subtitle: 'Goal Achievement Tool',
        description: 'Set and track your savings goals with detailed timelines and monthly contribution requirements.',
        icon: '🎯',
        features: ['Multiple goal tracking', 'Timeline optimization', 'Progress visualization'],
        tags: ['Goal Setting', 'Progress Tracking', 'Motivation'],
        url: 'https://www.bankrate.com/calculators/savings/savings-goal-calculator.aspx'
      },
      {
        id: 'college-savings',
        title: 'College Savings Calculator',
        subtitle: 'Education Planning',
        description: 'Calculate how much to save monthly for your child\'s college education without compromising retirement.',
        icon: '🎓',
        features: ['529 plan optimization', 'Education inflation factor', 'State tax benefits'],
        tags: ['529 Plans', 'Education Savings', 'Tax Benefits'],
        url: 'https://www.savingforcollege.com/calculators/college-savings-calculator'
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
        url: 'https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator'
      },
      {
        id: 'retirement',
        title: 'Retirement Calculator',
        subtitle: 'Retirement Planning Tool',
        description: 'Determine how much you need to save monthly to reach your retirement goals and live comfortably.',
        icon: '🏖️',
        features: ['401k match optimization', 'Social Security planning', 'Withdrawal strategies'],
        tags: ['401k Planning', 'Nest Egg', 'Social Security'],
        url: 'https://www.fidelity.com/calculators-tools/retirement-income-planner'
      },
      {
        id: 'investment',
        title: 'Investment Calculator',
        subtitle: 'Compound Interest Power',
        description: 'Calculate how your investments can grow with compound interest using historically proven return rates.',
        icon: '📊',
        features: ['Historical market returns', 'Regular contribution tracking', 'Inflation adjustment'],
        tags: ['Popular', 'Compound Interest', 'Long-term Growth'],
        url: 'https://www.calculator.net/investment-calculator.html'
      },
      {
        id: '401k',
        title: '401k Calculator',
        subtitle: 'Employer Match Maximizer',
        description: 'Optimize your 401k contributions to maximize employer matching and tax benefits.',
        icon: '💼',
        features: ['Employer match calculator', 'Tax savings analysis', 'Contribution limits tracking'],
        tags: ['Employer Match', 'Tax Benefits', 'Free Money'],
        url: 'https://www.bankrate.com/retirement/calculators/401-k-retirement-calculator/'
      },
      {
        id: 'roth-ira',
        title: 'Roth IRA Calculator',
        subtitle: 'Tax-Free Growth',
        description: 'Calculate the tax-free growth potential of Roth IRA contributions vs. traditional IRA.',
        icon: '🪙',
        features: ['Tax-free withdrawals', 'Roth vs. Traditional comparison', 'Income limit calculator'],
        tags: ['Tax-Free', 'Roth IRA', 'Retirement'],
        url: 'https://www.schwab.com/ira/roth-ira/calculator'
      },
      {
        id: 'net-worth',
        title: 'Net Worth Calculator',
        subtitle: 'Wealth Tracking Tool',
        description: 'Calculate your total net worth by subtracting liabilities from assets to track your financial progress.',
        icon: '💎',
        features: ['Asset categorization', 'Liability tracking', 'Progress monitoring'],
        tags: ['Wealth Tracking', 'Assets vs Debts', 'Progress'],
        url: 'https://www.bankrate.com/calculators/savings/net-worth-calculator.aspx'
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
        url: 'https://www.bankrate.com/calculators/mortgages/mortgage-calculator.aspx'
      },
      {
        id: 'mortgage-payoff',
        title: 'Mortgage Payoff Calculator',
        subtitle: 'Early Payoff Planner',
        description: 'See how extra principal payments can save you thousands and help you own your home sooner.',
        icon: '🎯',
        features: ['Interest savings calculation', 'Time reduction analysis', 'Payment schedule optimization'],
        tags: ['Extra Payments', 'Interest Savings', 'Own Sooner'],
        url: 'https://www.bankrate.com/calculators/mortgages/mortgage-payoff-calculator.aspx'
      },
      {
        id: 'house-affordability',
        title: 'House Affordability Calculator',
        subtitle: 'Smart Buying Guide',
        description: 'Determine how much house you can afford based on income, debts, and down payment.',
        icon: '🧮',
        features: ['28/36 rule application', 'DTI consideration', 'Down payment impact'],
        tags: ['28/36 Rule', 'Safe Buying', 'Budget Planning'],
        url: 'https://www.zillow.com/mortgage-calculator/house-affordability-calculator/'
      },
      {
        id: 'rent-vs-buy',
        title: 'Rent vs Buy Calculator',
        subtitle: 'Decision Analysis Tool',
        description: 'Compare the long-term costs of renting vs. buying to make the best housing decision.',
        icon: '⚖️',
        features: ['Total cost comparison', 'Opportunity cost analysis', 'Break-even point'],
        tags: ['Total Cost', 'Opportunity Cost', 'Smart Decision'],
        url: 'https://www.nytimes.com/interactive/2014/upshot/buy-rent-calculator.html'
      },
      {
        id: 'refinance',
        title: 'Refinance Calculator',
        subtitle: 'Refinancing Analysis',
        description: 'Determine if refinancing your mortgage makes financial sense with break-even analysis.',
        icon: '🔄',
        features: ['Break-even calculation', 'Closing cost analysis', 'Monthly savings potential'],
        tags: ['Break-even', 'Lower Rates', 'Monthly Savings'],
        url: 'https://www.bankrate.com/calculators/mortgages/refinance-calculator.aspx'
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
        url: 'https://www.bankrate.com/calculators/savings/vacation-calculator.aspx'
      },
      {
        id: 'major-purchase',
        title: 'Major Purchase Planner',
        subtitle: 'Smart Buying Strategy',
        description: 'Plan for major purchases like appliances, furniture, or electronics without financing.',
        icon: '🛒',
        features: ['Cash vs. credit analysis', 'Savings timeline', 'Opportunity cost calculation'],
        tags: ['Cash Purchase', 'No Interest', 'Smart Buying'],
        url: 'https://www.calculator.net/savings-calculator.html'
      },
      {
        id: 'wedding-budget',
        title: 'Wedding Budget Calculator',
        subtitle: 'Special Day Planner',
        description: 'Plan your perfect wedding without starting married life in debt with smart budgeting.',
        icon: '💖',
        features: ['Category budget allocation', 'Guest count impact', 'Savings timeline'],
        tags: ['Wedding Planning', 'Debt-Free Start', 'Budget Breakdown'],
        url: 'https://www.theknot.com/wedding-budget-calculator'
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
        url: 'https://www.bankrate.com/insurance/life-insurance/life-insurance-needs-calculator/'
      },
      {
        id: 'disability-insurance',
        title: 'Disability Insurance Calculator',
        subtitle: 'Income Protection',
        description: 'Determine how much disability insurance you need to protect your income and lifestyle.',
        icon: '♿',
        features: ['Income replacement ratio', 'Short vs. long term', 'Employer benefit analysis'],
        tags: ['Income Protection', 'Disability Coverage', 'Risk Management'],
        url: 'https://www.calculator.net/disability-insurance-calculator.html'
      },
      {
        id: 'hsa-calculator',
        title: 'HSA Calculator',
        subtitle: 'Health Savings Account',
        description: 'Maximize your Health Savings Account contributions for triple tax advantages.',
        icon: '🏥',
        features: ['Triple tax advantage', 'Retirement healthcare planning', 'Investment growth potential'],
        tags: ['Triple Tax Benefit', 'Health Savings', 'Retirement Tool'],
        url: 'https://www.bankrate.com/retirement/hsa-calculator/'
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
        url: 'https://www.timeanddate.com/date/durationresult.html'
      },
      {
        id: 'tax-calculator',
        title: 'Tax Calculator',
        subtitle: 'Income Tax Estimator',
        description: 'Estimate your federal and state income taxes based on your income and filing status.',
        icon: '📋',
        features: ['Federal tax calculation', 'State tax estimates', 'Deduction optimization'],
        tags: ['Tax Planning', 'Income Tax', 'Deductions'],
        url: 'https://www.nerdwallet.com/taxes/tax-calculator'
      },
      {
        id: 'tip-calculator',
        title: 'Tip Calculator',
        subtitle: 'Quick Tip Calculator',
        description: 'Calculate tips and split bills easily for restaurants, services, and group dining.',
        icon: '🧾',
        features: ['Multiple tip percentages', 'Bill splitting', 'Service quality guide'],
        tags: ['Tip Calculator', 'Bill Splitting', 'Dining'],
        url: 'https://www.calculator.net/tip-calculator.html'
      }
    ]
  }
};