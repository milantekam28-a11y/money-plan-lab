// src/components/SEO/SEOHead.js
import React, { useEffect } from 'react';

const SEOHead = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage = "/images/financial-calculator-og.jpg",
  structuredData,
  breadcrumbs,
  category,
  calculatorType
}) => {
  const baseUrl = "https://moneyplanlab.com";
  const fullTitle = title ? `${title} | Money Plan Lab` : "Money Plan Lab - Free Financial Calculators";
  const fullUrl = canonicalUrl ? `${baseUrl}${canonicalUrl}` : baseUrl;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;
    
    // Update or create meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description;

    // Update or create meta keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.name = 'keywords';
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.content = keywords;
    }

    // Update or create canonical link
    if (canonicalUrl) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = fullUrl;
    }

    // Update Open Graph meta tags
    const ogTags = [
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      { property: 'og:image', content: `${baseUrl}${ogImage}` },
      { property: 'og:url', content: fullUrl },
      { property: 'og:type', content: 'website' }
    ];

    ogTags.forEach(tag => {
      let metaOg = document.querySelector(`meta[property="${tag.property}"]`);
      if (!metaOg) {
        metaOg = document.createElement('meta');
        metaOg.setAttribute('property', tag.property);
        document.head.appendChild(metaOg);
      }
      metaOg.content = tag.content;
    });

    // Twitter Card meta tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description }
    ];

    twitterTags.forEach(tag => {
      let metaTwitter = document.querySelector(`meta[name="${tag.name}"]`);
      if (!metaTwitter) {
        metaTwitter = document.createElement('meta');
        metaTwitter.name = tag.name;
        document.head.appendChild(metaTwitter);
      }
      metaTwitter.content = tag.content;
    });

    // Add structured data if provided
    if (structuredData) {
      let existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        existingScript.remove();
      }
      
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

  }, [fullTitle, description, keywords, fullUrl, ogImage, structuredData]);

  // This component doesn't render anything visually
  return null;
};

export default SEOHead;