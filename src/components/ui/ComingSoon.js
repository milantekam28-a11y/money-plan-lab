// src/components/ui/ComingSoon.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const ComingSoon = ({ 
  title, 
  description, 
  category, 
  categoryColor = '#2563eb',
  categoryBgColor = '#eff6ff',
  icon = '🚀',
  features = [],
  relatedCalculators = []
}) => {
  return (
    <>
      <Helmet>
        <title>{title} - Coming Soon | Money Plan Lab</title>
        <meta name="description" content={`${title} is coming soon to Money Plan Lab. ${description}`} />
        <meta name="keywords" content={`${title}, financial calculator, ${category}, coming soon`} />
      </Helmet>

      <div className="coming-soon-page">
        {/* Breadcrumbs */}
        <div className="breadcrumbs-container">
          <div className="breadcrumbs">
            <Link to="/" className="breadcrumb-item">
              <span className="home-icon">🏠</span>
              <span>Home</span>
            </Link>
            <span className="breadcrumb-separator">›</span>
            <Link to="/calculators" className="breadcrumb-item">All Calculators</Link>
            <span className="breadcrumb-separator">›</span>
            <span className="breadcrumb-current">{title}</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-background">
              <div className="floating-element element-1"></div>
              <div className="floating-element element-2"></div>
              <div className="floating-element element-3"></div>
            </div>
            
            <div className="hero-main">
              <div className="hero-icon" style={{ background: categoryBgColor, color: categoryColor }}>
                {icon}
              </div>
              
              <div className="coming-soon-badge">
                <span className="pulse-dot"></span>
                Coming Soon
              </div>
              
              <h1 className="hero-title">{title}</h1>
              <p className="hero-description">{description}</p>
              
              <div className="category-info">
                <span className="category-label">Category:</span>
                <span className="category-name" style={{ color: categoryColor }}>
                  {category}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        {features.length > 0 && (
          <section className="features-section">
            <div className="features-container">
              <h2 className="features-title">What to Expect</h2>
              <div className="features-grid">
                {features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <div className="feature-icon" style={{ background: categoryBgColor, color: categoryColor }}>
                      ✓
                    </div>
                    <span className="feature-text">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Notify Section */}
        <section className="notify-section">
          <div className="notify-container">
            <div className="notify-card">
              <div className="notify-icon">📧</div>
              <h3>Get Notified When It's Ready</h3>
              <p>Be the first to know when this calculator launches. We'll send you a quick notification.</p>
              <div className="notify-form">
                <input 
                  type="email" 
                  placeholder="Enter your email address"
                  className="notify-input"
                />
                <button className="notify-button" style={{ background: categoryColor }}>
                  Notify Me
                </button>
              </div>
              <p className="notify-disclaimer">
                No spam, just launch notifications. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </section>

        {/* Related Calculators */}
        {relatedCalculators.length > 0 && (
          <section className="related-section">
            <div className="related-container">
              <h2 className="related-title">Try These Available Calculators</h2>
              <div className="related-grid">
                {relatedCalculators.map((calc, index) => (
                  <Link key={index} to={calc.url} className="related-card">
                    <div className="related-icon" style={{ background: calc.bgColor, color: calc.color }}>
                      {calc.icon}
                    </div>
                    <h3 className="related-name">{calc.name}</h3>
                    <p className="related-desc">{calc.description}</p>
                    <span className="related-button">
                      Use Calculator
                      <span className="arrow">→</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-container">
            <div className="cta-content">
              <h3>Explore Other Calculators</h3>
              <p>While you wait, check out our collection of working financial calculators.</p>
              <div className="cta-buttons">
                <Link to="/calculators" className="cta-button primary">
                  View All Calculators
                </Link>
                <Link to="/contact" className="cta-button secondary">
                  Suggest Features
                </Link>
              </div>
            </div>
          </div>
        </section>

        <style jsx>{`
          .coming-soon-page {
            min-height: 100vh;
            background: linear-gradient(to bottom, #f8fafc, #ffffff);
          }

          /* Breadcrumbs */
          .breadcrumbs-container {
            background: white;
            border-bottom: 1px solid #e2e8f0;
            padding: 0 20px;
          }

          .breadcrumbs {
            max-width: 1200px;
            margin: 0 auto;
            padding: 16px 0;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
          }

          .breadcrumb-item {
            display: flex;
            align-items: center;
            gap: 6px;
            color: #64748b;
            text-decoration: none;
            transition: color 0.2s ease;
          }

          .breadcrumb-item:hover {
            color: ${categoryColor};
          }

          .home-icon {
            font-size: 16px;
          }

          .breadcrumb-separator {
            color: #cbd5e1;
            font-weight: 500;
          }

          .breadcrumb-current {
            color: #1e293b;
            font-weight: 500;
          }

          /* Hero Section */
          .hero-section {
            position: relative;
            background: linear-gradient(135deg, ${categoryColor}15 0%, ${categoryColor}08 100%);
            padding: 100px 20px;
            text-align: center;
            overflow: hidden;
          }

          .hero-background {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1;
          }

          .floating-element {
            position: absolute;
            border-radius: 50%;
            background: ${categoryColor}20;
            animation: float 6s ease-in-out infinite;
          }

          .element-1 {
            width: 100px;
            height: 100px;
            top: 20%;
            left: 10%;
            animation-delay: 0s;
          }

          .element-2 {
            width: 150px;
            height: 150px;
            top: 60%;
            right: 15%;
            animation-delay: 2s;
          }

          .element-3 {
            width: 80px;
            height: 80px;
            top: 40%;
            left: 70%;
            animation-delay: 4s;
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px) scale(1); }
            50% { transform: translateY(-20px) scale(1.05); }
          }

          .hero-content {
            max-width: 800px;
            margin: 0 auto;
            position: relative;
            z-index: 2;
          }

          .hero-icon {
            width: 120px;
            height: 120px;
            border-radius: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 3rem;
            margin: 0 auto 30px;
            box-shadow: 0 10px 30px ${categoryColor}30;
          }

          .coming-soon-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: #fff3cd;
            color: #856404;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 600;
            margin-bottom: 20px;
            border: 1px solid #ffeaa7;
          }

          .pulse-dot {
            width: 8px;
            height: 8px;
            background: #f39c12;
            border-radius: 50%;
            animation: pulse 2s infinite;
          }

          @keyframes pulse {
            0% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.2); }
            100% { opacity: 1; transform: scale(1); }
          }

          .hero-title {
            font-size: clamp(2.5rem, 5vw, 4rem);
            font-weight: 800;
            color: #1e293b;
            margin-bottom: 20px;
            line-height: 1.1;
          }

          .hero-description {
            font-size: 1.25rem;
            color: #64748b;
            margin-bottom: 30px;
            line-height: 1.6;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
          }

          .category-info {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            margin-top: 20px;
          }

          .category-label {
            color: #64748b;
            font-weight: 500;
          }

          .category-name {
            font-weight: 700;
            padding: 4px 12px;
            background: ${categoryBgColor};
            border-radius: 12px;
          }

          /* Features Section */
          .features-section {
            padding: 80px 20px;
            background: white;
          }

          .features-container {
            max-width: 1000px;
            margin: 0 auto;
          }

          .features-title {
            text-align: center;
            font-size: 2.5rem;
            font-weight: 800;
            color: #1e293b;
            margin-bottom: 50px;
          }

          .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
          }

          .feature-item {
            display: flex;
            align-items: center;
            gap: 16px;
            padding: 24px;
            background: #f8fafc;
            border-radius: 16px;
            border: 1px solid #e2e8f0;
            transition: all 0.3s ease;
          }

          .feature-item:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          }

          .feature-icon {
            width: 50px;
            height: 50px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 1.2rem;
          }

          .feature-text {
            font-size: 1.1rem;
            color: #334155;
            font-weight: 500;
          }

          /* Notify Section */
          .notify-section {
            padding: 80px 20px;
            background: linear-gradient(135deg, ${categoryBgColor} 0%, #ffffff 100%);
          }

          .notify-container {
            max-width: 600px;
            margin: 0 auto;
          }

          .notify-card {
            background: white;
            padding: 50px 40px;
            border-radius: 24px;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
            border: 1px solid #e2e8f0;
          }

          .notify-icon {
            font-size: 3rem;
            margin-bottom: 20px;
          }

          .notify-card h3 {
            font-size: 1.8rem;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 12px;
          }

          .notify-card p {
            color: #64748b;
            margin-bottom: 30px;
            font-size: 1.1rem;
            line-height: 1.6;
          }

          .notify-form {
            display: flex;
            gap: 12px;
            margin-bottom: 16px;
          }

          .notify-input {
            flex: 1;
            padding: 16px 20px;
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            font-size: 16px;
            transition: border-color 0.2s ease;
          }

          .notify-input:focus {
            outline: none;
            border-color: ${categoryColor};
          }

          .notify-button {
            padding: 16px 32px;
            border: none;
            border-radius: 12px;
            color: white;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            white-space: nowrap;
          }

          .notify-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px ${categoryColor}40;
          }

          .notify-disclaimer {
            color: #94a3b8;
            font-size: 0.9rem;
            margin: 0;
          }

          /* Related Section */
          .related-section {
            padding: 80px 20px;
            background: white;
          }

          .related-container {
            max-width: 1200px;
            margin: 0 auto;
          }

          .related-title {
            text-align: center;
            font-size: 2.5rem;
            font-weight: 800;
            color: #1e293b;
            margin-bottom: 50px;
          }

          .related-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
          }

          .related-card {
            background: white;
            padding: 30px;
            border-radius: 20px;
            border: 2px solid #e2e8f0;
            text-decoration: none;
            transition: all 0.3s ease;
            display: block;
          }

          .related-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            border-color: ${categoryColor}40;
          }

          .related-icon {
            width: 60px;
            height: 60px;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.8rem;
            margin-bottom: 20px;
          }

          .related-name {
            font-size: 1.3rem;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 8px;
          }

          .related-desc {
            color: #64748b;
            line-height: 1.5;
            margin-bottom: 20px;
          }

          .related-button {
            display: flex;
            align-items: center;
            gap: 8px;
            color: ${categoryColor};
            font-weight: 600;
            transition: gap 0.2s ease;
          }

          .related-card:hover .related-button {
            gap: 12px;
          }

          .arrow {
            transition: transform 0.2s ease;
          }

          .related-card:hover .arrow {
            transform: translateX(4px);
          }

          /* CTA Section */
          .cta-section {
            padding: 80px 20px;
            background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
            color: white;
          }

          .cta-container {
            max-width: 800px;
            margin: 0 auto;
            text-align: center;
          }

          .cta-content h3 {
            font-size: 2.5rem;
            font-weight: 800;
            margin-bottom: 16px;
          }

          .cta-content p {
            font-size: 1.2rem;
            opacity: 0.9;
            margin-bottom: 40px;
          }

          .cta-buttons {
            display: flex;
            gap: 20px;
            justify-content: center;
            flex-wrap: wrap;
          }

          .cta-button {
            padding: 16px 32px;
            border-radius: 12px;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.3s ease;
            display: inline-block;
          }

          .cta-button.primary {
            background: white;
            color: #1e293b;
          }

          .cta-button.primary:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(255, 255, 255, 0.3);
          }

          .cta-button.secondary {
            background: transparent;
            color: white;
            border: 2px solid white;
          }

          .cta-button.secondary:hover {
            background: white;
            color: #1e293b;
            transform: translateY(-3px);
          }

          /* Mobile Responsive */
          @media (max-width: 768px) {
            .hero-section {
              padding: 60px 20px;
            }

            .hero-title {
              font-size: 2.5rem;
            }

            .notify-form {
              flex-direction: column;
            }

            .cta-buttons {
              flex-direction: column;
              align-items: center;
            }

            .cta-button {
              width: 100%;
              max-width: 300px;
              text-align: center;
            }

            .features-grid {
              grid-template-columns: 1fr;
            }

            .related-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default ComingSoon;