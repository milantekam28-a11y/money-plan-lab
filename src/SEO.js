import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
  title = "Financial Calculator Hub - Free Professional Tools",
  description = "Free financial calculators for loan payments, budgeting, debt payoff, and investment planning. Professional tools for better money management.",
  keywords = "financial calculator, EMI calculator, budget calculator, debt payoff, investment calculator, loan calculator",
  calculatorName = null
}) => {
  // Generate dynamic title based on calculator
  const getTitle = () => {
    if (calculatorName) {
      return `${calculatorName} - Free Financial Calculator Tools`;
    }
    return title;
  };

  // Generate dynamic description based on calculator
  const getDescription = () => {
    if (calculatorName) {
      return `Use our free ${calculatorName.toLowerCase()} to plan your finances. Professional-grade calculations with instant results. No signup required.`;
    }
    return description;
  };

  return (
    <Helmet>
      <title>{getTitle()}</title>
      <meta name="description" content={getDescription()} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={getTitle()} />
      <meta property="og:description" content={getDescription()} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Financial Calculator Hub" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={getTitle()} />
      <meta name="twitter:description" content={getDescription()} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <link rel="canonical" href={window.location.href} />
    </Helmet>
  );
};

export default SEO;