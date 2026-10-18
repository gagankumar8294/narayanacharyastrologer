import Head from 'next/head';

export default function SEO({
  title = "Narayanachary - Professional Astrologer & Vaastu Expert in Bangalore",
  description = "Consult Brahma Sri Narayanacharya for accurate Vedic Astrology, Vaastu Shastra, Jathaka horoscope matching, and numerology remedies in Bangalore. 8+ years experience.",
  keywords = "Bangalore astrologer, best astrologer in Bangalore, Vaastu Shastra expert Bangalore, horoscope prediction, Jathaka matching, Kundali milan, numerology, Brahma Sri Narayanacharya",
  canonical = "https://www.narayanacharyastrologer.com/",
  ogImage = "https://www.narayanacharyastrologer.com/homepage/c.png",
  ogType = "website",
  schema = null,
}) {
  const defaultSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://www.narayanacharyastrologer.com/#astrologer",
        "name": "Brahma Sri Narayanacharya",
        "jobTitle": "Vedic Astrologer & Vaastu Vidwan",
        "telephone": "+918549803686",
        "image": "https://www.narayanacharyastrologer.com/homepage/c.png",
        "url": "https://www.narayanacharyastrologer.com/",
        "sameAs": [
          "https://wa.me/918549803686"
        ],
        "worksFor": {
          "@type": "LocalBusiness",
          "name": "Narayanachary Astrologer",
          "telephone": "+918549803686",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Bangalore",
            "addressRegion": "Karnataka",
            "addressCountry": "IN"
          }
        }
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://www.narayanacharyastrologer.com/#business",
        "name": "Narayanachary Astrologer",
        "url": "https://www.narayanacharyastrologer.com/",
        "logo": "https://www.narayanacharyastrologer.com/logo/narayanachary.png",
        "image": "https://www.narayanacharyastrologer.com/homepage/c.png",
        "telephone": "+918549803686",
        "priceRange": "₹₹",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Bangalore",
          "addressRegion": "Karnataka",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "13.507891",
          "longitude": "78.07728"
        },
        "openingHours": "Mo-Su 09:00-21:00"
      }
    ]
  };

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />

      {/* Multilingual Alternate Hreflang Tags */}
      <link rel="alternate" hrefLang="en" href="https://www.narayanacharyastrologer.com/" />
      <link rel="alternate" hrefLang="kn" href="https://www.narayanacharyastrologer.com/" />
      <link rel="alternate" hrefLang="te" href="https://www.narayanacharyastrologer.com/" />
      <link rel="alternate" hrefLang="hi" href="https://www.narayanacharyastrologer.com/" />
      <link rel="alternate" hrefLang="x-default" href="https://www.narayanacharyastrologer.com/" />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Narayanachary Astrologer" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Schema Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema || defaultSchema),
        }}
      />
    </Head>
  );
}
