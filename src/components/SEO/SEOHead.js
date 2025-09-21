// src/components/SEO/SEOHead.js - Enhanced Version
import React, { useEffect } from 'react';

const SEOHead = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage = "/images/financial-calculator-og.jpg",
  ogType = "website",
  structuredData,
  breadcrumbs = [],
  category,
  calculatorType,
  author = "Money Plan Lab",
  publishedTime,
  modifiedTime
}) => {
  const baseUrl = "https://moneyplanlab.com";
  const fullTitle = title ? `${title} | Money Plan Lab` : "Money Plan Lab - Free Financial Calculators";
  const fullUrl = canonicalUrl ? `${baseUrl}${canonicalUrl}` : baseUrl;
  const imageUrl = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;
    
    // Basic Meta Tags
    const updateOrCreateMeta = (selector, attributes, content) => {
      let meta = document.querySelector(selector);
      if (!meta) {
        meta = document.createElement('meta');
        Object.keys(attributes).forEach(key => {
          meta.setAttribute(key, attributes[key]);
        });
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Description
    updateOrCreateMeta('meta[name="description"]', { name: 'description' }, description);
    
    // Keywords
    if (keywords) {
      updateOrCreateMeta('meta[name="keywords"]', { name: 'keywords' }, keywords);
    }

    // Author
    updateOrCreateMeta('meta[name="author"]', { name: 'author' }, author);

    // Robots - Important for SEO
    updateOrCreateMeta(
      'meta[name="robots"]', 
      { name: 'robots' }, 
      'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );

    // Viewport (if not already set)
    if (!document.querySelector('meta[name="viewport"]')) {
      updateOrCreateMeta('meta[name="viewport"]', { name: 'viewport' }, 'width=device-width, initial-scale=1.0');
    }

    // Theme color
    updateOrCreateMeta('meta[name="theme-color"]', { name: 'theme-color' }, '#667eea');

    // Canonical URL
    if (canonicalUrl) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = fullUrl;
    }

    // Open Graph Meta Tags - Enhanced
    const ogTags = [
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:type', content: ogType },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      { property: 'og:url', content: fullUrl },
      { property: 'og:site_name', content: 'Money Plan Lab' },
      { property: 'og:image', content: imageUrl },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: fullTitle }
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

    // Twitter Card Meta Tags - Enhanced
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@moneyplanlab' },
      { name: 'twitter:creator', content: '@moneyplanlab' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: imageUrl },
      { name: 'twitter:image:alt', content: fullTitle }
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

    // Article Meta Tags (for calculator pages)
    if (category) {
      updateOrCreateMeta('meta[property="article:section"]', { property: 'article:section' }, category);
    }
    if (publishedTime) {
      updateOrCreateMeta('meta[property="article:published_time"]', { property: 'article:published_time' }, publishedTime);
    }
    if (modifiedTime) {
      updateOrCreateMeta('meta[property="article:modified_time"]', { property: 'article:modified_time' }, modifiedTime);
    }

    // Enhanced Structured Data
    const generateStructuredData = () => {
      const baseStructuredData = {
        "@context": "https://schema.org",
        "@graph": [
          // Website Schema
          {
            "@type": "WebSite",
            "@id": `${baseUrl}/#website`,
            "url": baseUrl,
            "name": "Money Plan Lab",
            "description": "Free Financial Calculators & Planning Tools",
            "potentialAction": [
              {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": `${baseUrl}/calculators?search={search_term_string}`
                },
                "query-input": "required name=search_term_string"
              }
            ]
          },
          // Organization Schema
          {
            "@type": "Organization",
            "@id": `${baseUrl}/#organization`,
            "name": "Money Plan Lab",
            "url": baseUrl,
            "logo": {
              "@type": "ImageObject",
              "url": `${baseUrl}/logo.png`,
              "width": 512,
              "height": 512
            },
            "description": "Professional financial calculators and planning tools",
            "foundingDate": "2024",
            "sameAs": [
              "https://twitter.com/moneyplanlab",
              "https://facebook.com/moneyplanlab"
            ]
          },
          // WebPage Schema
          {
            "@type": "WebPage",
            "@id": `${fullUrl}/#webpage`,
            "url": fullUrl,
            "name": fullTitle,
            "description": description,
            "isPartOf": {
              "@id": `${baseUrl}/#website`
            },
            "about": {
              "@id": `${baseUrl}/#organization`
            },
            "datePublished": publishedTime || "2024-01-01T00:00:00+00:00",
            "dateModified": modifiedTime || new Date().toISOString(),
            "inLanguage": "en-US",
            "potentialAction": [
              {
                "@type": "ReadAction",
                "target": [fullUrl]
              }
            ]
          }
        ]
      };

      // Add Calculator-specific Schema
      if (calculatorType) {
        baseStructuredData["@graph"].push({
          "@type": "WebApplication",
          "@id": `${fullUrl}/#calculator`,
          "name": fullTitle,
          "description": description,
          "url": fullUrl,
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "Web Browser",
          "browserRequirements": "Requires JavaScript. Requires HTML5.",
          "permissions": "No special permissions required",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          },
          "featureList": [
            "Free Financial Calculations",
            "No Registration Required",
            "Privacy Protected",
            "Mobile Responsive",
            "Instant Results"
          ],
          "screenshots": {
            "@type": "ImageObject",
            "url": imageUrl
          }
        });
      }

      // Add Breadcrumb Schema
      if (breadcrumbs.length > 0) {
        baseStructuredData["@graph"].push({
          "@type": "BreadcrumbList",
          "@id": `${fullUrl}/#breadcrumb`,
          "itemListElement": breadcrumbs.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`
          }))
        });
      }

      // Add FAQ Schema for calculator pages
      if (calculatorType) {
        baseStructuredData["@graph"].push({
          "@type": "FAQPage",
          "@id": `${fullUrl}/#faq`,
          "mainEntity": [
            {
              "@type": "Question",
              "name": `How to use ${calculatorType}?`,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": `Our ${calculatorType} is free and easy to use. Simply enter your values and get instant results.`
              }
            },
            {
              "@type": "Question",
              "name": "Is this calculator free?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, all our financial calculators are completely free to use with no registration required."
              }
            },
            {
              "@type": "Question",
              "name": "Is my data secure?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, all calculations are performed in your browser. We do not store or transmit any of your personal financial data."
              }
            }
          ]
        });
      }

      return structuredData || baseStructuredData;
    };

    // Remove existing structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }
    
    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(generateStructuredData());
    document.head.appendChild(script);

    // Performance Meta Tags
    if (!document.querySelector('link[rel="preconnect"][href="https://fonts.googleapis.com"]')) {
      const preconnect1 = document.createElement('link');
      preconnect1.rel = 'preconnect';
      preconnect1.href = 'https://fonts.googleapis.com';
      document.head.appendChild(preconnect1);

      const preconnect2 = document.createElement('link');
      preconnect2.rel = 'preconnect';
      preconnect2.href = 'https://fonts.gstatic.com';
      preconnect2.crossOrigin = 'anonymous';
      document.head.appendChild(preconnect2);
    }

  }, [fullTitle, description, keywords, fullUrl, imageUrl, structuredData, breadcrumbs, category, calculatorType, author, publishedTime, modifiedTime]);

  // This component doesn't render anything visually
  return null;
};

export default SEOHead;