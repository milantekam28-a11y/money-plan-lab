// src/pages/Contact.js
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission (replace with actual submission logic)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage('Thank you for your message! We\'ll get back to you within 24 hours.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  return (
    <>
      <Helmet>
        <title>Contact Money Plan Lab - Financial Calculator Support</title>
        <meta name="description" content="Get in touch with Money Plan Lab for support, feedback, or questions about our free financial calculators. We're here to help with your financial planning needs." />
        <meta name="keywords" content="contact money plan lab, financial calculator support, customer service, feedback" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl leading-relaxed">
              Have questions, feedback, or need help with our calculators? We'd love to hear from you!
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Send us a Message</h2>
              
              {submitMessage && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                  {submitMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Select a subject...</option>
                    <option value="calculator-help">Calculator Help</option>
                    <option value="bug-report">Bug Report</option>
                    <option value="feature-request">Feature Request</option>
                    <option value="general-feedback">General Feedback</option>
                    <option value="partnership">Partnership Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical"
                    placeholder="Please describe your question or feedback in detail..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Quick Contact */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Quick Contact</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600">📧</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">General Inquiries</h4>
                      <p className="text-gray-600">contact@moneyplanlab.com</p>
                      <p className="text-sm text-gray-500">Response within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-red-600">🐛</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Bug Reports</h4>
                      <p className="text-gray-600">bugs@moneyplanlab.com</p>
                      <p className="text-sm text-gray-500">Priority response</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600">💡</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Feature Requests</h4>
                      <p className="text-gray-600">features@moneyplanlab.com</p>
                      <p className="text-sm text-gray-500">We love new ideas!</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-600">🤝</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Partnerships</h4>
                      <p className="text-gray-600">partnerships@moneyplanlab.com</p>
                      <p className="text-sm text-gray-500">Business collaborations</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Are your calculators really free?</h4>
                    <p className="text-gray-600 text-sm">Yes! All our calculators are completely free with no hidden fees, no sign-ups required, and no premium tiers.</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">How accurate are your calculations?</h4>
                    <p className="text-gray-600 text-sm">Our calculators use industry-standard financial formulas and are regularly verified by financial professionals.</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Do you store my financial data?</h4>
                    <p className="text-gray-600 text-sm">No! All calculations happen in your browser. Your data never leaves your device or gets stored anywhere.</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Can I suggest a new calculator?</h4>
                    <p className="text-gray-600 text-sm">Absolutely! We're always looking for new calculator ideas. Send us your suggestions using the form above.</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Do you provide financial advice?</h4>
                    <p className="text-gray-600 text-sm">Our calculators are educational tools only. For personalized financial advice, please consult a qualified financial advisor.</p>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Response Time</h3>
                <p className="text-blue-700 text-sm">
                  We typically respond to all inquiries within 24 hours. Bug reports and urgent issues receive priority attention and are usually addressed within a few hours.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;