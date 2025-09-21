// src/pages/About.js - Professional About Page with Tailwind CSS
import React from 'react';
import { Helmet } from 'react-helmet';

const About = () => {
  const stats = [
    { number: '500,000+', label: 'Users Helped', icon: '👥' },
    { number: '25+', label: 'Calculators Available', icon: '🧮' },
    { number: '$2M+', label: 'Money Saved', icon: '💰' },
    { number: '100%', label: 'Always Free', icon: '🆓' }
  ];

  const coreValues = [
    {
      icon: '🎯',
      title: 'Accuracy First',
      description: 'Every formula is mathematically verified and based on proven financial principles used by professionals worldwide.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '🔒',
      title: 'Privacy Guaranteed',
      description: 'All calculations happen in your browser. Your financial data never leaves your device or gets stored anywhere.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: '❤️',
      title: 'Free Forever',
      description: 'No hidden fees, no premium tiers, no sign-ups. Quality financial tools should be accessible to everyone.',
      color: 'from-red-500 to-pink-500'
    }
  ];

  const teamValues = [
    {
      icon: '📚',
      title: 'Financial Education',
      description: 'We believe financial literacy is a fundamental life skill that should be accessible to everyone.'
    },
    {
      icon: '🤝',
      title: 'Democratized Access',
      description: 'Professional-grade financial tools shouldn\'t be limited to those who can afford expensive advisors.'
    },
    {
      icon: '🎯',
      title: 'Simplified Complexity',
      description: 'We make complex financial calculations simple without sacrificing accuracy or functionality.'
    },
    {
      icon: '🌟',
      title: 'Continuous Innovation',
      description: 'We constantly improve our calculators based on user feedback and emerging financial trends.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Money Plan Lab - Free Financial Calculators & Planning Tools</title>
        <meta name="description" content="Learn about Money Plan Lab's mission to democratize financial planning with 25+ free, professional-grade calculators. Trusted by 500,000+ users for debt, budget, investment planning." />
        <meta name="keywords" content="about money plan lab, financial calculators, free financial tools, financial literacy, money management, budgeting tools, debt calculator, investment planning" />
        <meta property="og:title" content="About Money Plan Lab - Free Financial Calculators" />
        <meta property="og:description" content="Democratizing financial planning with free, professional-grade calculators. Helping 500,000+ users make informed financial decisions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://money-plan-lab.vercel.app/about" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Money Plan Lab - Free Financial Tools" />
        <meta name="twitter:description" content="Professional-grade financial calculators, completely free. Join 500,000+ users in making smarter financial decisions." />
        <link rel="canonical" href="https://money-plan-lab.vercel.app/about" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Breadcrumb */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <a href="/" className="hover:text-blue-600 transition-colors flex items-center">
                <span className="mr-1">🏠</span>
                Home
              </a>
              <span>/</span>
              <span className="text-gray-900 font-medium">About</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 opacity-5"></div>
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400 rounded-full opacity-10 animate-bounce"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-purple-400 rounded-full opacity-10 animate-pulse"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 text-center">
            <div className="inline-flex items-center bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-blue-200">
              <span className="mr-2">🚀</span>
              Empowering Financial Freedom Since 2023
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                About Money Plan Lab
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              We're on a mission to democratize financial planning by providing free, professional-grade 
              calculators and tools that help everyone make informed financial decisions.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="/all-calculators"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center"
              >
                <span className="mr-2">🧮</span>
                Explore Calculators
              </a>
              <a 
                href="#our-story"
                className="bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold border-2 border-gray-200 hover:border-blue-300 hover:text-blue-600 transition-all duration-300 flex items-center"
              >
                <span className="mr-2">📖</span>
                Our Story
              </a>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white/60 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-blue-200">
                    <div className="text-3xl mb-3">{stat.icon}</div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6 text-gray-800">
                  Our Mission
                </h2>
                <div className="text-lg text-gray-600 space-y-4 leading-relaxed">
                  <p>
                    Financial literacy shouldn't be a luxury. At Money Plan Lab, we believe everyone 
                    deserves access to professional-grade financial planning tools - completely free.
                  </p>
                  <p>
                    Our comprehensive suite of calculators helps you make informed decisions about 
                    debt, budgeting, investments, real estate, and more. No hidden fees, no sign-ups 
                    required, just pure mathematical precision at your fingertips.
                  </p>
                  <p className="text-blue-600 font-semibold">
                    Every "thank you" email we receive reminds us why we do this work.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                  <div className="relative">
                    <h3 className="text-2xl font-bold mb-4">By the Numbers</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Users Helped</span>
                        <span className="font-bold">500,000+</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Calculators Available</span>
                        <span className="font-bold">25+</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Money Saved</span>
                        <span className="font-bold">$2M+</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Always Free</span>
                        <span className="font-bold">100%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 bg-white/60 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-gray-800">Our Core Values</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                The principles that guide everything we build and every decision we make
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {coreValues.map((value, index) => (
                <div key={index} className="group">
                  <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-gray-200 h-full">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${value.color} flex items-center justify-center text-2xl text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      {value.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section id="our-story" className="py-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-gray-800">Our Story</h2>
              <p className="text-xl text-gray-600">How a simple observation became a mission to democratize financial planning</p>
            </div>
            
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100">
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Money Plan Lab was born from a simple observation: financial planning tools were either too expensive, 
                  too complicated, or hidden behind paywalls. We saw families struggling with debt, young professionals 
                  confused about investments, and homebuyers making uninformed decisions.
                </p>
                <p>
                  Our team of financial experts, developers, and educators came together with one goal: democratize 
                  financial planning. We've spent countless hours perfecting each calculator, ensuring they deliver 
                  professional-grade accuracy while remaining simple enough for anyone to use.
                </p>
                <p>
                  Today, Money Plan Lab serves hundreds of thousands of users monthly, helping them save millions of 
                  dollars through better financial decisions. Every "thank you" email we receive reminds us why we do this work.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What We Stand For */}
        <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">What We Stand For</h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Our commitment to making financial planning accessible, accurate, and actionable for everyone
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamValues.map((value, index) => (
                <div key={index} className="text-center group">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 border border-white/20">
                    <div className="text-3xl mb-4">{value.icon}</div>
                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                    <p className="opacity-90 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Educational Purpose Disclaimer */}
        <section className="py-16 bg-amber-50 border-y border-amber-200">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-start space-x-4">
              <div className="text-3xl">⚠️</div>
              <div>
                <h3 className="text-2xl font-bold mb-4 text-amber-800">Educational Purpose</h3>
                <p className="text-amber-700 leading-relaxed">
                  Money Plan Lab provides educational calculators and financial tools for informational purposes only. 
                  Our calculators are not financial advice and should not replace consultation with qualified financial 
                  advisors for your specific situation. Always consider your individual circumstances and consult 
                  professionals when making important financial decisions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6 text-gray-800">
              Ready to Take Control of Your Finances?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join hundreds of thousands of users who trust Money Plan Lab for their financial calculations. 
              Start making informed financial decisions today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="/all-calculators"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center"
              >
                <span className="mr-2">🚀</span>
                Explore All Calculators
              </a>
              <a 
                href="/budget-calculators"
                className="bg-white text-gray-700 px-10 py-4 rounded-xl font-semibold border-2 border-gray-200 hover:border-blue-300 hover:text-blue-600 transition-all duration-300 flex items-center"
              >
                <span className="mr-2">💰</span>
                Start with Budget Tools
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;