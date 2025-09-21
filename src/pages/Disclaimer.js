// src/pages/Disclaimer.js
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const Disclaimer = () => {
  return (
    <>
      <Helmet>
        <title>Disclaimer - Financial Calculator Terms | Money Plan Lab</title>
        <meta name="description" content="Important disclaimer and terms of use for Money Plan Lab's financial calculators. Educational tools only, not financial advice." />
        <meta name="keywords" content="disclaimer, terms of use, financial calculator limitations, not financial advice" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-gray-700 to-gray-900 text-white py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold mb-4">Disclaimer</h1>
            <p className="text-xl text-gray-300">
              Important information about our financial calculators and their intended use
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
            
            {/* Educational Purpose */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="text-2xl mr-3">📚</span>
                Educational Purpose Only
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">
                  The financial calculators, tools, and information provided on Money Plan Lab are for <strong>educational and informational purposes only</strong>. These tools are designed to help you understand various financial concepts and perform basic calculations, but they are not intended to provide specific financial advice tailored to your individual circumstances.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  All calculations and results should be considered as estimates based on the information you provide. Actual results may vary depending on numerous factors not accounted for in our simplified models.
                </p>
              </div>
            </div>

            {/* Not Financial Advice */}
            <div className="border-l-4 border-red-500 pl-6 bg-red-50 p-4 rounded-r-lg">
              <h2 className="text-2xl font-bold text-red-800 mb-4 flex items-center">
                <span className="text-2xl mr-3">⚠️</span>
                Not Financial Advice
              </h2>
              <div className="prose prose-red max-w-none">
                <p className="text-red-700 leading-relaxed mb-4">
                  <strong>Money Plan Lab does not provide financial advice.</strong> We are not licensed financial advisors, investment advisors, tax professionals, or legal advisors. The information and calculations provided through our tools should not be considered as professional financial advice, investment recommendations, or tax guidance.
                </p>
                <p className="text-red-700 leading-relaxed">
                  For personalized financial advice, investment strategies, tax planning, or legal matters, please consult with qualified professionals who are licensed to provide such services in your jurisdiction.
                </p>
              </div>
            </div>

            {/* Calculator Limitations */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="text-2xl mr-3">⚙️</span>
                Calculator Limitations
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">
                  Our financial calculators are based on mathematical formulas and standard financial principles. However, they have certain limitations:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                  <li><strong>Simplified Models:</strong> Real-world financial situations are often more complex than our calculator models can account for</li>
                  <li><strong>Assumption-Based:</strong> Results depend on the accuracy of your inputs and the assumptions built into each calculator</li>
                  <li><strong>Market Variability:</strong> Investment returns, interest rates, and economic conditions can vary significantly from historical averages</li>
                  <li><strong>Individual Circumstances:</strong> Personal factors such as risk tolerance, time horizon, and financial goals are not fully considered</li>
                  <li><strong>Regulatory Changes:</strong> Tax laws, lending regulations, and financial rules may change, affecting the accuracy of calculations</li>
                </ul>
                <p className="text-gray-600 leading-relaxed">
                  Always verify important calculations with financial professionals and consider multiple scenarios when making financial decisions.
                </p>
              </div>
            </div>

            {/* Accuracy and Updates */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="text-2xl mr-3">🎯</span>
                Accuracy and Updates
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">
                  While we strive to ensure the accuracy of our calculators and regularly update them to reflect current financial standards:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                  <li>We cannot guarantee 100% accuracy of all calculations</li>
                  <li>Information may become outdated due to changing financial regulations or market conditions</li>
                  <li>Users should independently verify important calculations</li>
                  <li>We reserve the right to modify or discontinue any calculator without prior notice</li>
                </ul>
                <p className="text-gray-600 leading-relaxed">
                  If you discover any errors or inaccuracies, please <Link to="/contact" className="text-blue-600 hover:underline">contact us</Link> so we can address them promptly.
                </p>
              </div>
            </div>

            {/* Liability Limitation */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="text-2xl mr-3">🛡️</span>
                Limitation of Liability
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">
                  Money Plan Lab, its creators, and contributors shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                  <li>Use or inability to use our calculators or information</li>
                  <li>Reliance on calculations or information provided</li>
                  <li>Financial decisions made based on our tools</li>
                  <li>Errors, omissions, or inaccuracies in calculations or content</li>
                  <li>Loss of data or interruption of service</li>
                </ul>
                <p className="text-gray-600 leading-relaxed">
                  By using our calculators, you acknowledge that you do so at your own risk and that you will not hold us responsible for any financial losses or decisions made based on the information provided.
                </p>
              </div>
            </div>

            {/* Professional Consultation */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center">
                <span className="text-2xl mr-3">👥</span>
                Consult Qualified Professionals
              </h2>
              <div className="prose prose-blue max-w-none">
                <p className="text-blue-700 leading-relaxed mb-4">
                  For important financial decisions, we strongly recommend consulting with qualified professionals:
                </p>
                <ul className="list-disc list-inside text-blue-700 space-y-2 mb-4">
                  <li><strong>Financial Advisors:</strong> For comprehensive financial planning and investment strategies</li>
                  <li><strong>Tax Professionals:</strong> For tax planning and optimization strategies</li>
                  <li><strong>Real Estate Professionals:</strong> For property buying, selling, and refinancing decisions</li>
                  <li><strong>Insurance Agents:</strong> For appropriate insurance coverage and protection strategies</li>
                  <li><strong>Legal Professionals:</strong> For estate planning and legal financial matters</li>
                </ul>
                <p className="text-blue-700 leading-relaxed">
                  These professionals can provide personalized advice based on your specific situation, goals, and risk tolerance.
                </p>
              </div>
            </div>

            {/* Data Privacy */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="text-2xl mr-3">🔒</span>
                Data Privacy and Security
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">
                  We take your privacy seriously:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                  <li>All calculations are performed in your browser - no data is transmitted to our servers</li>
                  <li>We do not store, save, or have access to any financial information you enter</li>
                  <li>No personal or financial data is collected through our calculators</li>
                  <li>Your information remains completely private and secure</li>
                </ul>
                <p className="text-gray-600 leading-relaxed">
                  For complete details about our data practices, please review our <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
                </p>
              </div>
            </div>

            {/* Updates to Disclaimer */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="text-2xl mr-3">📝</span>
                Updates to This Disclaimer
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed">
                  We may update this disclaimer from time to time to reflect changes in our tools, services, or applicable laws. The current version will always be available on this page with the last updated date. Continued use of our calculators after any changes constitutes acceptance of the updated disclaimer.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Questions About This Disclaimer?</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about this disclaimer or need clarification about the limitations of our calculators, please don't hesitate to contact us.
              </p>
              <Link 
                to="/contact" 
                className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Contact Us
              </Link>
            </div>

            <div className="text-center text-sm text-gray-500 pt-8 border-t border-gray-200">
              <p>Last updated: September 20, 2025</p>
              <p className="mt-2">
                This disclaimer is part of our <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link> and 
                should be read in conjunction with our website terms of use.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Disclaimer;