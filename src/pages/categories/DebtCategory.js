// src/data/categories.js - Debt Category Section

export const categories = {
  debt: {
    name: 'Get Out of Debt',
    icon: '🔗💥',
    description: 'Break free from the cycle of debt and reclaim your financial freedom with proven debt elimination strategies',
    color: 'linear-gradient(135deg, #dc2626, #b91c1c)',
    categoryUrl: '/debt-calculators',
    seoKeywords: 'debt payoff calculator, debt elimination, debt avalanche, debt snowball, pay off debt faster, debt freedom',
    calculators: [
      {
        id: 'emi-calculator',
        title: 'EMI Calculator',
        subtitle: 'LOAN PAYMENT CALCULATOR',
        description: 'Calculate monthly EMI payments for any loan with principal, interest rate, and tenure.',
        icon: '💰',
        features: [
          'Monthly EMI calculation',
          'Total interest payable',
          'Payment breakdown'
        ],
        tags: ['Most Popular', 'Loan Calculator', 'Monthly Payment'],
        featured: false,
        popular: true,
        url: '/debt-calculators/emi-calculator'
      },
      {
        id: 'universal-debt-payoff',
        title: 'General Debt Payoff',
        subtitle: 'ULTIMATE DEBT DESTROYER',
        description: 'Calculate the fastest way to pay off all your debts using avalanche or snowball methods with detailed payment schedules.',
        icon: '🔥',
        features: [
          'Multiple debt strategies',
          'Interest savings calculator', 
          'Payment schedule timeline'
        ],
        tags: ['Most Popular', 'Debt Avalanche', 'Debt Snowball'],
        featured: true,
        popular: true,
        url: '/debt-calculators/universal-debt-payoff'
      },
      {
        id: 'credit-card-debt',
        title: 'Credit Card Debt',
        subtitle: 'HIGH-INTEREST KILLER',
        description: 'Calculate minimum payments vs. aggressive payoff strategies for credit cards with compound interest analysis.',
        icon: '💳',
        features: [
          'APR impact analysis',
          'Balance transfer options',
          'Payment optimization'
        ],
        tags: ['High Interest', 'APR Calculator', 'Balance Transfer'],
        featured: false,
        popular: false,
        url: '/debt-calculators/credit-card-debt'
      },
      {
        id: 'student-loan-payoff',
        title: 'Student Loan Payoff',
        subtitle: 'EDUCATION DEBT FREEDOM',
        description: 'Accelerate your student loan freedom with extra payment strategies, refinancing analysis, and forgiveness programs.',
        icon: '🎓',
        features: [
          'Refinancing comparison',
          'Forgiveness program eligibility',
          'Extra payment impact'
        ],
        tags: ['Federal Loans', 'PSLF', 'Refinancing'],
        featured: false,
        popular: false,
        url: '/debt-calculators/student-loan-payoff'
      },
      {
        id: 'car-loan-calculator',
        title: 'Car Loan Calculator',
        subtitle: 'AUTO FINANCING TOOL',
        description: 'Compare auto loan terms, calculate payments, and see the impact of down payments on your car financing.',
        icon: '🚗',
        features: [
          'Payment comparison',
          'Down payment analysis',
          'Trade-in value impact'
        ],
        tags: ['Auto Loan', 'Down Payment', 'Trade-in'],
        featured: false,
        popular: false,
        url: '/debt-calculators/car-loan-calculator'
      },
      {
        id: 'medical-debt-calculator',
        title: 'Medical Debt Calculator',
        subtitle: 'HEALTHCARE BILL MANAGER',
        description: 'Handle unexpected medical bills with smart planning. Calculate payment plans, negotiate discounts, and protect your credit.',
        icon: '🏥',
        features: [
          'Payment plan options',
          'Negotiation strategies',
          'Credit protection tips'
        ],
        tags: ['Payment Plans', 'Negotiation', 'Credit Protection'],
        featured: false,
        popular: false,
        url: '/debt-calculators/medical-debt-calculator'
      }
    ]
  },
  
  // Other categories (budget, investment, etc.) will go here...
  budget: {
    name: 'Budgeting & Planning',
    icon: '📊',
    description: 'Build a solid financial foundation with smart budgeting tools and emergency planning strategies',
    color: 'linear-gradient(135deg, #f59e0b, #d97706)',
    categoryUrl: '/budget-calculators',
    seoKeywords: 'budget calculator, emergency fund, savings goal, financial planning',
    calculators: [
      // Budget calculators will be added here
    ]
  },
  
  investment: {
    name: 'Investment & Retirement',
    icon: '📈',
    description: 'Build wealth and plan for your golden years with compound interest and smart investment strategies',
    color: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
    categoryUrl: '/investment-calculators',
    seoKeywords: 'investment calculator, retirement planning, compound interest, 401k calculator',
    calculators: [
      // Investment calculators will be added here
    ]
  },
  
  realestate: {
    name: 'Real Estate & Housing',
    icon: '🏠',
    description: 'Make smart decisions about your biggest investment with comprehensive property analysis tools',
    color: 'linear-gradient(135deg, #10b981, #059669)',
    categoryUrl: '/real-estate-calculators',
    seoKeywords: 'mortgage calculator, home affordability, rent vs buy, refinance calculator',
    calculators: [
      // Real estate calculators will be added here
    ]
  },
  
  travel: {
    name: 'Travel & Purchase Planning',
    icon: '✈️',
    description: 'Plan major purchases and dream vacations without breaking your budget or going into debt',
    color: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
    categoryUrl: '/travel-calculators',
    seoKeywords: 'vacation savings, trip planner, major purchase calculator',
    calculators: [
      // Travel calculators will be added here
    ]
  },
  
  insurance: {
    name: 'Insurance & Protection',
    icon: '🛡️',
    description: 'Protect your family and financial future with appropriate insurance coverage planning',
    color: 'linear-gradient(135deg, #f59e0b, #d97706)',
    categoryUrl: '/insurance-calculators',
    seoKeywords: 'life insurance calculator, disability insurance, health savings account',
    calculators: [
      // Insurance calculators will be added here
    ]
  },
  
  utilities: {
    name: 'Financial Utilities & Tools',
    icon: '🔧',
    description: 'Handy financial tools and calculators for everyday money management tasks',
    color: 'linear-gradient(135deg, #06b6d4, #0891b2)',
    categoryUrl: '/utility-calculators',
    seoKeywords: 'currency converter, tip calculator, tax calculator, date calculator',
    calculators: [
      // Utility calculators will be added here
    ]
  }
};