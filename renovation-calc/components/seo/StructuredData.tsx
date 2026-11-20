"use client";

import React from "react";

/**
 * Organization + WebApplication structured data.
 * Only accurate properties are included — no fake ratings, reviews, or prices.
 */

interface StructuredDataProps {
  name?: string;
  url?: string;
  logo?: string;
}

export default function StructuredData({
  name = "Home Calculator Hub",
  url = "https://homecalchub.online",
  logo = "https://homecalchub.online/logo.png",
}: StructuredDataProps) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo,
    sameAs: [],
  };

  const webApplication = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    applicationCategory: "Calculator",
    url,
    description:
      "Straightforward home-improvement calculators that help you estimate project quantities and plan material purchases.",
    operatingSystem: "Web Browser",
    browserRequirements: "JavaScript enabled",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplication) }}
      />
    </>
  );
}
