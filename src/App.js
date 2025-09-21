// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import ScrollToTop from './components/ui/ScrollToTop';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ComingSoon from './components/ui/ComingSoon';

// Pages
import HomePage from './pages/HomePage';

// Category Pages
import DebtCategory from './pages/categories/DebtCategory';
import BudgetCategory from './pages/categories/BudgetCategory';

// Essential Pages
import About from './pages/About';
import Contact from './pages/Contact';
import AllCalculators from './pages/AllCalculators';
import Disclaimer from './pages/Disclaimer';
import PrivacyPolicy from './pages/PrivacyPolicy';

// Debt Calculators - ALL WORKING
import EMICalculator from './pages/calculators/debt/EMICalculator';
import UniversalDebtPayoff from './pages/calculators/debt/UniversalDebtPayoff';
import CreditCardDebtCalculator from './pages/calculators/debt/CreditCardDebtCalculator';
import StudentLoanCalculator from './pages/calculators/debt/StudentLoanCalculator';
import CarLoanCalculator from './pages/calculators/debt/CarLoanCalculator';
import MedicalDebtCalculator from './pages/calculators/debt/MedicalDebtCalculator';

// Budget Calculators - ALL WORKING  
import BudgetCalculator from './pages/calculators/budget/BudgetCalculator';
import EmergencyFundCalculator from './pages/calculators/budget/EmergencyFundCalculator';
import SavingsGoalCalculator from './pages/calculators/budget/SavingsGoalCalculator';
import CollegeSavingsCalculator from './pages/calculators/budget/CollegeSavingsCalculator';

// Styles
import './styles/globals.css';

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Header />
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<HomePage />} />
          
          {/* Essential Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/calculators" element={<AllCalculators />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          
          {/* Category Pages */}
          <Route path="/debt-calculators" element={<DebtCategory />} />
          <Route path="/budget-calculators" element={<BudgetCategory />} />
          
          {/* =================================== */}
          {/* WORKING DEBT CALCULATORS */}
          {/* =================================== */}
          <Route path="/debt-calculators/emi-calculator" element={<EMICalculator />} />
          <Route path="/debt-calculators/universal-debt-payoff" element={<UniversalDebtPayoff />} />
          <Route path="/debt-calculators/credit-card-debt" element={<CreditCardDebtCalculator />} />
          <Route path="/debt-calculators/student-loan-payoff" element={<StudentLoanCalculator />} />
          <Route path="/debt-calculators/car-loan-calculator" element={<CarLoanCalculator />} />
          <Route path="/debt-calculators/medical-debt-calculator" element={<MedicalDebtCalculator />} />
          
          {/* =================================== */}
          {/* WORKING BUDGET CALCULATORS */}
          {/* =================================== */}
          <Route path="/budget-calculators/budget-calculator" element={<BudgetCalculator />} />
          <Route path="/budget-calculators/emergency-fund" element={<EmergencyFundCalculator />} />
          <Route path="/budget-calculators/savings-goal" element={<SavingsGoalCalculator />} />
          <Route path="/budget-calculators/college-savings" element={<CollegeSavingsCalculator />} />
          
          {/* =================================== */}
          {/* COMING SOON - Investment Calculators */}
          {/* =================================== */}
          <Route path="/investment-calculators/compound-interest" element={
            <ComingSoon 
              title="Compound Interest Calculator"
              description="Witness the 8th wonder of the world! Visualize how your investments can grow exponentially with the power of compound interest and time."
              category="Investment & Retirement"
              categoryColor="#2563eb"
              categoryBgColor="#eff6ff"
              icon="✨"
              features={[
                "Visual growth charts and projections",
                "Different compounding frequencies",
                "Inflation adjustment calculations",
                "Historical market return analysis",
                "Interactive timeline visualization"
              ]}
              relatedCalculators={[
                {
                  name: "Budget Calculator",
                  description: "Start with smart budgeting",
                  url: "/budget-calculators/budget-calculator",
                  icon: "📋",
                  color: "#f59e0b",
                  bgColor: "#fffbeb"
                },
                {
                  name: "Emergency Fund",
                  description: "Build your safety net first",
                  url: "/budget-calculators/emergency-fund",
                  icon: "🛡️",
                  color: "#10b981",
                  bgColor: "#f0fdf4"
                }
              ]}
            />
          } />
          
          <Route path="/investment-calculators/retirement" element={
            <ComingSoon 
              title="Retirement Calculator"
              description="Plan your golden years with confidence. Calculate how much you need to save monthly to retire comfortably with our comprehensive retirement planning tool."
              category="Investment & Retirement"
              categoryColor="#2563eb"
              categoryBgColor="#eff6ff"
              icon="🏖️"
              features={[
                "401k match optimization strategies",
                "Social Security benefit planning",
                "Multiple retirement account tracking",
                "Withdrawal strategy analysis",
                "Healthcare cost projections"
              ]}
              relatedCalculators={[
                {
                  name: "Savings Goal Calculator",
                  description: "Set and track your savings goals",
                  url: "/budget-calculators/savings-goal",
                  icon: "🎯",
                  color: "#f59e0b",
                  bgColor: "#fffbeb"
                }
              ]}
            />
          } />

          <Route path="/investment-calculators/investment" element={
            <ComingSoon 
              title="Investment Calculator"
              description="Calculate investment growth with historical market returns. See how regular contributions and compound interest can build substantial wealth over time."
              category="Investment & Retirement"
              categoryColor="#2563eb"
              categoryBgColor="#eff6ff"
              icon="📊"
              features={[
                "Historical market return analysis",
                "Regular contribution tracking",
                "Risk tolerance assessment",
                "Diversification recommendations",
                "Tax-efficient investing strategies"
              ]}
            />
          } />

          <Route path="/investment-calculators/401k-calculator" element={
            <ComingSoon 
              title="401k Calculator"
              description="Maximize your employer's 401k matching and optimize your retirement contributions for maximum tax benefits and long-term growth."
              category="Investment & Retirement"
              categoryColor="#2563eb"
              categoryBgColor="#eff6ff"
              icon="💼"
              features={[
                "Employer match maximization",
                "Tax savings calculation",
                "Contribution limit tracking",
                "Vesting schedule analysis",
                "Rollover planning guidance"
              ]}
            />
          } />

          <Route path="/investment-calculators/roth-ira" element={
            <ComingSoon 
              title="Roth IRA Calculator"
              description="Compare tax-free growth potential of Roth IRA vs Traditional IRA. Understand which retirement account strategy works best for your situation."
              category="Investment & Retirement"
              categoryColor="#2563eb"
              categoryBgColor="#eff6ff"
              icon="🪙"
              features={[
                "Roth vs Traditional IRA comparison",
                "Tax-free withdrawal planning",
                "Income limit calculations",
                "Backdoor Roth strategies",
                "Estate planning benefits"
              ]}
            />
          } />

          <Route path="/investment-calculators/net-worth" element={
            <ComingSoon 
              title="Net Worth Calculator"
              description="Track your wealth progress with comprehensive asset and liability analysis. Monitor your financial growth and identify areas for improvement."
              category="Investment & Retirement"
              categoryColor="#2563eb"
              categoryBgColor="#eff6ff"
              icon="💎"
              features={[
                "Asset categorization and tracking",
                "Liability management analysis",
                "Net worth trend visualization",
                "Financial milestone tracking",
                "Wealth building recommendations"
              ]}
            />
          } />
          
          {/* =================================== */}
          {/* COMING SOON - Real Estate Calculators */}
          {/* =================================== */}
          <Route path="/real-estate-calculators/mortgage" element={
            <ComingSoon 
              title="Mortgage Calculator"
              description="Complete home loan analysis with PITI breakdown, amortization schedule, and payment optimization strategies for smart home buying."
              category="Real Estate & Housing"
              categoryColor="#10b981"
              categoryBgColor="#f0fdf4"
              icon="🏡"
              features={[
                "PITI payment breakdown (Principal, Interest, Taxes, Insurance)",
                "PMI calculation and removal timeline",
                "Full amortization schedule",
                "Extra payment impact analysis",
                "Refinancing opportunity alerts"
              ]}
              relatedCalculators={[
                {
                  name: "EMI Calculator",
                  description: "Calculate any loan payments",
                  url: "/debt-calculators/emi-calculator",
                  icon: "💰",
                  color: "#dc2626",
                  bgColor: "#fef2f2"
                }
              ]}
            />
          } />

          <Route path="/real-estate-calculators/mortgage-payoff" element={
            <ComingSoon 
              title="Mortgage Payoff Calculator"
              description="See how extra principal payments can save you thousands in interest and help you own your home years sooner with smart payoff strategies."
              category="Real Estate & Housing"
              categoryColor="#10b981"
              categoryBgColor="#f0fdf4"
              icon="🎯"
              features={[
                "Interest savings calculations",
                "Time reduction analysis",
                "Bi-weekly payment strategies",
                "Lump sum payment impact",
                "Break-even analysis for investments vs. payoff"
              ]}
            />
          } />

          <Route path="/real-estate-calculators/house-affordability" element={
            <ComingSoon 
              title="House Affordability Calculator"
              description="Smart home buying guide using the 28/36 rule and comprehensive debt-to-income analysis to determine your safe buying range."
              category="Real Estate & Housing"
              categoryColor="#10b981"
              categoryBgColor="#f0fdf4"
              icon="🧮"
              features={[
                "28/36 rule application (housing and total debt ratios)",
                "Down payment impact analysis",
                "Property tax and insurance estimates",
                "HOA and maintenance cost factors",
                "Pre-approval guidance"
              ]}
            />
          } />

          <Route path="/real-estate-calculators/rent-vs-buy" element={
            <ComingSoon 
              title="Rent vs Buy Calculator"
              description="Make the best housing decision with total cost comparison, opportunity cost analysis, and break-even point calculations."
              category="Real Estate & Housing"
              categoryColor="#10b981"
              categoryBgColor="#f0fdf4"
              icon="⚖️"
              features={[
                "Total cost of ownership analysis",
                "Opportunity cost calculations",
                "Break-even timeline",
                "Market appreciation factors",
                "Lifestyle and mobility considerations"
              ]}
            />
          } />

          <Route path="/real-estate-calculators/refinance" element={
            <ComingSoon 
              title="Refinance Calculator"
              description="Determine if refinancing makes financial sense with comprehensive break-even analysis and long-term savings projections."
              category="Real Estate & Housing"
              categoryColor="#10b981"
              categoryBgColor="#f0fdf4"
              icon="🔄"
              features={[
                "Break-even point calculation",
                "Closing cost analysis",
                "Monthly payment comparison",
                "Total interest savings",
                "Cash-out refinancing options"
              ]}
            />
          } />
          
          {/* =================================== */}
          {/* COMING SOON - Travel & Purchase Calculators */}
          {/* =================================== */}
          <Route path="/travel-calculators/vacation-savings" element={
            <ComingSoon 
              title="Vacation Savings Calculator"
              description="Plan your dream trip without credit card debt using smart savings strategies. Calculate monthly savings needed for stress-free travel."
              category="Travel & Purchase Planning"
              categoryColor="#8b5cf6"
              categoryBgColor="#f3f4f6"
              icon="🧳"
              features={[
                "Trip cost breakdown and budgeting",
                "Monthly savings timeline",
                "Travel reward optimization",
                "Currency exchange planning",
                "Emergency travel fund recommendations"
              ]}
            />
          } />

          <Route path="/travel-calculators/major-purchase" element={
            <ComingSoon 
              title="Major Purchase Planner"
              description="Buy appliances, furniture, and electronics without financing using smart cash purchasing strategies and timing optimization."
              category="Travel & Purchase Planning"
              categoryColor="#8b5cf6"
              categoryBgColor="#f3f4f6"
              icon="🛒"
              features={[
                "Cash vs. credit analysis",
                "Savings timeline optimization",
                "Seasonal purchase timing",
                "Opportunity cost calculations",
                "Warranty and insurance considerations"
              ]}
            />
          } />

          <Route path="/travel-calculators/wedding-budget" element={
            <ComingSoon 
              title="Wedding Budget Calculator"
              description="Plan your perfect wedding without starting married life in debt. Smart budgeting for your special day with vendor cost analysis."
              category="Travel & Purchase Planning"
              categoryColor="#8b5cf6"
              categoryBgColor="#f3f4f6"
              icon="💖"
              features={[
                "Category budget allocation",
                "Guest count impact analysis",
                "Vendor cost comparison",
                "Savings timeline planning",
                "Honeymoon budgeting integration"
              ]}
            />
          } />
          
          {/* =================================== */}
          {/* COMING SOON - Insurance Calculators */}
          {/* =================================== */}
          <Route path="/insurance-calculators/life-insurance" element={
            <ComingSoon 
              title="Life Insurance Calculator"
              description="Calculate term life insurance needs for complete family protection using proven mathematical formulas and income replacement strategies."
              category="Insurance & Protection"
              categoryColor="#f59e0b"
              categoryBgColor="#fffbeb"
              icon="👨‍👩‍👧‍👦"
              features={[
                "Income replacement calculations",
                "Debt coverage analysis",
                "Education funding planning",
                "Term vs. whole life comparison",
                "Beneficiary payout strategies"
              ]}
            />
          } />

          <Route path="/insurance-calculators/disability-insurance" element={
            <ComingSoon 
              title="Disability Insurance Calculator"
              description="Protect your income with proper disability coverage analysis. Calculate how much coverage you need to maintain your lifestyle."
              category="Insurance & Protection"
              categoryColor="#f59e0b"
              categoryBgColor="#fffbeb"
              icon="♿"
              features={[
                "Income replacement ratio analysis",
                "Short vs. long term coverage",
                "Employer benefit gap analysis",
                "Cost of living adjustments",
                "Occupation risk assessment"
              ]}
            />
          } />

          <Route path="/insurance-calculators/hsa-calculator" element={
            <ComingSoon 
              title="HSA Calculator"
              description="Maximize Health Savings Account benefits with triple tax advantages. Plan for current and future healthcare costs strategically."
              category="Insurance & Protection"
              categoryColor="#f59e0b"
              categoryBgColor="#fffbeb"
              icon="🏥"
              features={[
                "Triple tax advantage calculations",
                "Retirement healthcare planning",
                "Investment growth potential",
                "Current vs. future healthcare costs",
                "HSA vs. FSA comparison"
              ]}
            />
          } />
          
          {/* =================================== */}
          {/* COMING SOON - Utilities */}
          {/* =================================== */}
          <Route path="/utilities/days-between-dates" element={
            <ComingSoon 
              title="Days Between Dates Calculator"
              description="Calculate exact days between dates for financial planning, goal tracking, and timeline analysis with business day options."
              category="Financial Utilities"
              categoryColor="#06b6d4"
              categoryBgColor="#f0f9ff"
              icon="📅"
              features={[
                "Exact day calculations",
                "Business days vs. calendar days",
                "Age and anniversary calculations",
                "Financial goal timeline tracking",
                "Interest accrual period calculations"
              ]}
            />
          } />

          <Route path="/utilities/tax-calculator" element={
            <ComingSoon 
              title="Tax Calculator"
              description="Estimate federal and state income taxes with deduction optimization and tax planning strategies for smart financial decisions."
              category="Financial Utilities"
              categoryColor="#06b6d4"
              categoryBgColor="#f0f9ff"
              icon="📋"
              features={[
                "Federal and state tax calculations",
                "Standard vs. itemized deductions",
                "Tax bracket optimization",
                "Withholding adjustment recommendations",
                "Quarterly payment planning"
              ]}
            />
          } />

          <Route path="/utilities/tip-calculator" element={
            <ComingSoon 
              title="Tip Calculator"
              description="Quick tip calculator with bill splitting for dining and services. Calculate fair tips and split bills easily for group dining."
              category="Financial Utilities"
              categoryColor="#06b6d4"
              categoryBgColor="#f0f9ff"
              icon="🧾"
              features={[
                "Multiple tip percentage options",
                "Bill splitting for groups",
                "Service quality guidelines",
                "Tax calculation on tips",
                "International tipping customs"
              ]}
            />
          } />
          
          {/* Catch-all route for undefined pages */}
          <Route path="*" element={
            <ComingSoon 
              title="Page Coming Soon" 
              description="This page is under development. We're constantly adding new calculators and features to help you make better financial decisions."
              category="Money Plan Lab"
              categoryColor="#2563eb"
              categoryBgColor="#eff6ff"
              icon="🚀"
              features={[
                "Advanced financial planning tools",
                "Personalized recommendations",
                "Expert-verified calculations",
                "Mobile-optimized experience"
              ]}
            />
          } />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;