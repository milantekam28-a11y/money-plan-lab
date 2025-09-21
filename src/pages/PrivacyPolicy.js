// src/pages/PrivacyPolicy.js
import React from 'react';
import { Helmet } from 'react-helmet';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Money Plan Lab Data Protection & Privacy</title>
        <meta name="description" content="Money Plan Lab privacy policy. Learn how we protect your data, what information we collect, and your privacy rights when using our financial calculators." />
        <meta name="keywords" content="privacy policy, data protection, financial calculator privacy, user data, GDPR compliance" />
        <link rel="canonical" href="https://moneyplanlab.com/privacy" />
      </Helmet>

      <div className="privacy-page">
        <div className="container">
          <div className="hero-section">
            <h1>Privacy Policy</h1>
            <p>Your privacy is our priority. Learn how we protect your data and respect your privacy.</p>
            <div className="last-updated">
              <strong>Last Updated:</strong> January 2025
            </div>
          </div>

          <div className="content-section">
            <div className="privacy-card highlight">
              <div className="icon">🔒</div>
              <div className="content">
                <h2>Privacy First Approach</h2>
                <p>
                  Money Plan Lab is designed with privacy as a core principle. <strong>Your financial calculations 
                  happen entirely in your browser</strong> - we never see, store, or transmit your personal 
                  financial information.
                </p>
              </div>
            </div>

            <div className="privacy-sections">
              <div className="privacy-card">
                <h3>Information We Do NOT Collect</h3>
                <div className="privacy-content">
                  <div className="no-collect-list">
                    <div className="no-item">
                      <span className="x-icon">❌</span>
                      <div>
                        <h4>Financial Data</h4>
                        <p>Loan amounts, income, debts, or any financial information you enter into calculators</p>
                      </div>
                    </div>
                    
                    <div className="no-item">
                      <span className="x-icon">❌</span>
                      <div>
                        <h4>Personal Information</h4>
                        <p>Names, addresses, phone numbers, or social security numbers</p>
                      </div>
                    </div>
                    
                    <div className="no-item">
                      <span className="x-icon">❌</span>
                      <div>
                        <h4>Account Information</h4>
                        <p>No registration required - no usernames, passwords, or user accounts</p>
                      </div>
                    </div>
                    
                    <div className="no-item">
                      <span className="x-icon">❌</span>
                      <div>
                        <h4>Banking Details</h4>
                        <p>Bank account numbers, credit card information, or payment details</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="privacy-card">
                <h3>Information We May Collect</h3>
                <div className="privacy-content">
                  <div className="collect-section">
                    <h4>Automatically Collected Information</h4>
                    <ul>
                      <li><strong>Basic Analytics:</strong> Page views, session duration, and popular calculators (anonymized)</li>
                      <li><strong>Technical Data:</strong> Browser type, device type, and screen resolution (for optimization)</li>
                      <li><strong>Performance Data:</strong> Page load times and error reports (to improve user experience)</li>
                      <li><strong>Referral Sources:</strong> Which website or search engine brought you to our site</li>
                    </ul>
                  </div>

                  <div className="collect-section">
                    <h4>Contact Form Information</h4>
                    <p>When you contact us voluntarily:</p>
                    <ul>
                      <li>Name and email address (only if you provide them)</li>
                      <li>Message content you choose to send</li>
                      <li>We use this information solely to respond to your inquiry</li>
                    </ul>
                  </div>

                  <div className="note-box">
                    <strong>Important:</strong> All calculator inputs and financial data remain on your device. 
                    We have no access to the numbers you enter or the results you receive.
                  </div>
                </div>
              </div>

              <div className="privacy-card">
                <h3>How Your Data Stays Private</h3>
                <div className="privacy-content">
                  <div className="protection-grid">
                    <div className="protection-item">
                      <div className="protection-icon">💻</div>
                      <h4>Client-Side Processing</h4>
                      <p>All calculations happen in your browser using JavaScript. Your financial data never leaves your device.</p>
                    </div>
                    
                    <div className="protection-item">
                      <div className="protection-icon">🚫</div>
                      <h4>No Data Transmission</h4>
                      <p>Calculator inputs are not sent to our servers. We can't see what you calculate.</p>
                    </div>
                    
                    <div className="protection-item">
                      <div className="protection-icon">🗑️</div>
                      <h4>No Data Storage</h4>
                      <p>We don't store calculation results, user sessions, or financial information in any database.</p>
                    </div>
                    
                    <div className="protection-item">
                      <div className="protection-icon">🔐</div>
                      <h4>HTTPS Encryption</h4>
                      <p>All website traffic is encrypted with industry-standard SSL/TLS security.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="privacy-card">
                <h3>Cookies & Tracking</h3>
                <div className="privacy-content">
                  <div className="cookies-section">
                    <h4>Essential Cookies Only</h4>
                    <p>We use minimal cookies required for basic website functionality:</p>
                    <ul>
                      <li><strong>Session Cookies:</strong> Remember your preferences during your visit</li>
                      <li><strong>Security Cookies:</strong> Protect against malicious attacks</li>
                      <li><strong>Performance Cookies:</strong> Anonymous analytics to improve site speed</li>
                    </ul>
                    
                    <h4>What We Don't Use</h4>
                    <ul className="no-tracking">
                      <li>❌ Advertising cookies or tracking pixels</li>
                      <li>❌ Social media tracking</li>
                      <li>❌ Cross-site tracking or fingerprinting</li>
                      <li>❌ Third-party marketing cookies</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="privacy-card">
                <h3>Third-Party Services</h3>
                <div className="privacy-content">
                  <div className="third-party-section">
                    <h4>Analytics (If Enabled)</h4>
                    <p>We may use privacy-focused analytics services like:</p>
                    <ul>
                      <li>Google Analytics (anonymized IP addresses only)</li>
                      <li>Simple Analytics or similar privacy-first tools</li>
                      <li>All data is aggregated and anonymized</li>
                    </ul>
                    
                    <h4>External Calculator Links</h4>
                    <p>Some categories link to external financial calculators:</p>
                    <ul>
                      <li>These sites have their own privacy policies</li>
                      <li>We don't control their data practices</li>
                      <li>Review their policies before using external tools</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="privacy-card">
                <h3>Your Privacy Rights</h3>
                <div className="privacy-content">
                  <div className="rights-grid">
                    <div className="right-item">
                      <h4>Right to Information</h4>
                      <p>This policy explains exactly what data we collect and how we use it</p>
                    </div>
                    
                    <div className="right-item">
                      <h4>Right to Access</h4>
                      <p>Contact us to request any personal data we may have about you</p>
                    </div>
                    
                    <div className="right-item">
                      <h4>Right to Deletion</h4>
                      <p>Request deletion of any personal data (though we collect very little)</p>
                    </div>
                    
                    <div className="right-item">
                      <h4>Right to Opt-Out</h4>
                      <p>Disable cookies or analytics tracking in your browser settings</p>
                    </div>
                  </div>
                  
                  <div className="gdpr-note">
                    <h4>GDPR & Global Privacy</h4>
                    <p>
                      We respect privacy rights under GDPR, CCPA, and other global privacy laws. 
                      Since we collect minimal personal data, most requests can be fulfilled immediately.
                    </p>
                  </div>
                </div>
              </div>

              <div className="privacy-card">
                <h3>Data Security</h3>
                <div className="privacy-content">
                  <div className="security-measures">
                    <h4>Technical Safeguards</h4>
                    <ul>
                      <li>HTTPS encryption for all website traffic</li>
                      <li>Secure hosting with regular security updates</li>
                      <li>No financial data stored on our servers</li>
                      <li>Regular security audits and monitoring</li>
                    </ul>
                    
                    <h4>Data Breach Protocol</h4>
                    <p>
                      In the unlikely event of a security incident affecting any personal data 
                      (like contact form submissions), we will:
                    </p>
                    <ul>
                      <li>Notify affected users within 72 hours</li>
                      <li>Report to relevant authorities as required</li>
                      <li>Take immediate steps to secure the breach</li>
                      <li>Provide clear information about the incident</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="privacy-card">
                <h3>Children's Privacy</h3>
                <div className="privacy-content">
                  <p>
                    Money Plan Lab is designed for general financial education and planning. 
                    While we don't knowingly collect information from children under 13, our calculators 
                    may be useful for educational purposes under adult supervision.
                  </p>
                  <p>
                    If you believe a child has provided personal information through our contact form, 
                    please contact us immediately and we will delete the information.
                  </p>
                </div>
              </div>

              <div className="privacy-card">
                <h3>Policy Updates</h3>
                <div className="privacy-content">
                  <p>
                    We may update this privacy policy to reflect changes in our practices or legal requirements. 
                    When we make significant changes:
                  </p>
                  <ul>
                    <li>We'll update the "Last Updated" date</li>
                    <li>We'll highlight major changes on our website</li>
                    <li>For significant changes, we may notify users via email (if we have contact information)</li>
                  </ul>
                  <p>
                    Continued use of Money Plan Lab after policy updates constitutes acceptance of the revised policy.
                  </p>
                </div>
              </div>
            </div>

            <div className="contact-privacy">
              <h2>Privacy Questions?</h2>
              <p>
                If you have questions about this privacy policy, our data practices, or want to exercise 
                your privacy rights, please contact us:
              </p>
              <div className="contact-methods">
                <div className="contact-method">
                  <strong>Email:</strong> <a href="mailto:privacy@moneyplanlab.com">privacy@moneyplanlab.com</a>
                </div>
                <div className="contact-method">
                  <strong>Contact Form:</strong> <a href="/contact">Contact Us Page</a>
                </div>
              </div>
              <p className="response-time">
                We typically respond to privacy inquiries within 48 hours.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .privacy-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          padding: 80px 0;
        }

        .container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .hero-section {
          text-align: center;
          margin-bottom: 60px;
        }

        .hero-section h1 {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          color: #1a202c;
          margin-bottom: 20px;
          font-weight: 800;
        }

        .hero-section p {
          font-size: 1.2rem;
          color: #4a5568;
          margin-bottom: 20px;
        }

        .last-updated {
          color: #6b7280;
          font-size: 0.95rem;
          padding: 12px 24px;
          background: white;
          border-radius: 8px;
          display: inline-block;
          border: 2px solid #e5e7eb;
        }

        .content-section {
          max-width: 900px;
          margin: 0 auto;
        }

        .privacy-card {
          background: white;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          margin-bottom: 32px;
          border: 2px solid transparent;
        }

        .privacy-card.highlight {
          border-color: #10b981;
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
          display: flex;
          align-items: flex-start;
          gap: 20px;
        }

        .privacy-card.highlight .icon {
          font-size: 2.5rem;
          flex-shrink: 0;
        }

        .privacy-card.highlight h2 {
          color: #10b981;
          font-size: 1.8rem;
          margin-bottom: 16px;
          font-weight: 700;
        }

        .privacy-card.highlight p {
          color: #166534;
          font-size: 1.1rem;
          line-height: 1.7;
        }

        .privacy-card h3 {
          font-size: 1.5rem;
          color: #1a202c;
          margin-bottom: 24px;
          font-weight: 700;
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 12px;
        }

        .privacy-content h4 {
          font-size: 1.2rem;
          color: #374151;
          margin-top: 24px;
          margin-bottom: 12px;
          font-weight: 600;
        }

        .privacy-content ul {
          margin: 16px 0;
          padding-left: 24px;
        }

        .privacy-content li {
          color: #4a5568;
          margin-bottom: 8px;
          line-height: 1.6;
        }

        .privacy-content p {
          color: #4a5568;
          line-height: 1.7;
          margin-bottom: 16px;
        }

        .no-collect-list {
          display: grid;
          gap: 20px;
        }

        .no-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 20px;
          background: #fef2f2;
          border-radius: 12px;
          border-left: 4px solid #ef4444;
        }

        .x-icon {
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .no-item h4 {
          color: #dc2626;
          margin-bottom: 8px;
          font-weight: 600;
          font-size: 1.1rem;
        }

        .no-item p {
          color: #7f1d1d;
          margin: 0;
          font-size: 0.95rem;
        }

        .collect-section {
          margin-bottom: 32px;
        }

        .note-box {
          background: #f0f9ff;
          border-left: 4px solid #3b82f6;
          padding: 20px;
          border-radius: 0 8px 8px 0;
          margin: 24px 0;
          color: #1e40af;
        }

        .protection-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 24px;
          margin-top: 20px;
        }

        .protection-item {
          text-align: center;
          padding: 24px;
          border: 2px solid #f3f4f6;
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .protection-item:hover {
          border-color: #10b981;
          transform: translateY(-2px);
        }

        .protection-icon {
          font-size: 2.5rem;
          margin-bottom: 16px;
        }

        .protection-item h4 {
          color: #1a202c;
          margin-bottom: 12px;
          font-weight: 600;
          font-size: 1.1rem;
        }

        .protection-item p {
          color: #4a5568;
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .cookies-section {
          margin-bottom: 24px;
        }

        .no-tracking {
          background: #fef2f2;
          padding: 16px 20px;
          border-radius: 8px;
          border-left: 4px solid #ef4444;
        }

        .no-tracking li {
          color: #7f1d1d;
        }

        .third-party-section h4 {
          margin-top: 24px;
        }

        .rights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 24px;
          margin-bottom: 32px;
        }

        .right-item {
          padding: 20px;
          background: #f8fafc;
          border-radius: 8px;
          border-left: 4px solid #3b82f6;
        }

        .right-item h4 {
          color: #1e40af;
          margin-bottom: 8px;
          font-weight: 600;
          font-size: 1rem;
        }

        .right-item p {
          color: #475569;
          font-size: 0.9rem;
          margin: 0;
        }

        .gdpr-note {
          background: #f0f9ff;
          padding: 24px;
          border-radius: 12px;
          border: 2px solid #bfdbfe;
          margin-top: 24px;
        }

        .gdpr-note h4 {
          color: #1e40af;
          margin-bottom: 12px;
        }

        .gdpr-note p {
          color: #1e40af;
          margin: 0;
        }

        .security-measures h4 {
          margin-top: 24px;
        }

        .contact-privacy {
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          padding: 40px;
          border-radius: 20px;
          text-align: center;
          border-left: 6px solid #f59e0b;
        }

        .contact-privacy h2 {
          font-size: 1.8rem;
          color: #92400e;
          margin-bottom: 20px;
          font-weight: 700;
        }

        .contact-privacy p {
          color: #b45309;
          margin-bottom: 24px;
          line-height: 1.6;
        }

        .contact-methods {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 20px;
        }

        .contact-method {
          color: #b45309;
          font-weight: 500;
        }

        .contact-method a {
          color: #dc2626;
          text-decoration: none;
          font-weight: 600;
        }

        .contact-method a:hover {
          text-decoration: underline;
        }

        .response-time {
          color: #92400e;
          font-style: italic;
          font-size: 0.95rem;
        }

        @media (max-width: 768px) {
          .privacy-page {
            padding: 60px 0;
          }

          .privacy-card {
            padding: 30px 24px;
          }

          .privacy-card.highlight {
            flex-direction: column;
            text-align: center;
            gap: 16px;
          }

          .protection-grid {
            grid-template-columns: 1fr;
          }

          .rights-grid {
            grid-template-columns: 1fr;
          }

          .contact-methods {
            grid-template-columns: 1fr;
          }

          .contact-privacy {
            padding: 30px 24px;
          }
        }
      `}</style>
    </>
  );
};

export default PrivacyPolicy;