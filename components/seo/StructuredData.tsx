export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ReligiousOrganization",

    name: "Juliuswadi Cha Raja Ganpati",

    alternateName: "Juliuswadi Sarvajanik Ganeshotsav",

    url: "https://juliuswadi-cha-raja.vercel.app",

    logo:
      "https://juliuswadi-cha-raja.vercel.app/logo/logo.png",

    image:
      "https://juliuswadi-cha-raja.vercel.app/logo/logo.png",

    telephone: "+91-9137435654",

    email: "info.juliuswadicharaja@gmail.com",

    address: {
      "@type": "PostalAddress",
      streetAddress: "Gate No. 6, Juliuswadi, Malwani",
      addressLocality: "Malad",
      addressRegion: "Maharashtra",
      postalCode: "400095",
      addressCountry: "IN",
    },

    sameAs: [
      "https://www.instagram.com/juliuswadicharaja",
    ],

    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-9137435654",
      contactType: "Customer Support",
      availableLanguage: [
        "English",
        "Hindi",
        "Marathi",
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}