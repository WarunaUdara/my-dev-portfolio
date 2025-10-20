import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Waruna Udara Sampath - Full Stack Software Developer",
    template: "%s | Waruna Udara Sampath"
  },
  description: "Full Stack Software Developer specializing in Java, Spring Boot, React/Next.js, and microservices architecture. BICT (Hons) undergraduate with expertise in Docker, AWS, and cloud-native applications.",
  icons: {
    icon: '/icon.ico',
    shortcut: '/icon.ico',
    apple: '/icon.ico',
  },
  keywords: [
    "Waruna",
    "Udara",
    "Sampath",
    "Waruna Udara",
    "Waruna Udara Sampath",
    "Full Stack Developer",
    "Java Developer",
    "Spring Boot",
    "React Developer",
    "Next.js",
    "Microservices",
    "Docker",
    "AWS",
    "TypeScript",
    "REST API",
    "Software Engineer Sri Lanka",
    "Kalutara",
    "TypeScript",
    "REST API",
    "Software Engineer Sri Lanka",
    "Kalutara",
    "University of Sri Jayewardenepura",
    "Java",
    "Spring Boot",
    "React.js",
    "Next.js",
    "Docker",
    "AWS",
    "TypeScript",
    "REST API",
    "Sri Lanka",
    "Software Engineer",
    "developer",
  ],
  authors: [{ name: "Waruna Udara Sampath" }],
  creator: "Waruna Udara Sampath",
  metadataBase: new URL("https://warunadev.vercel.app/"), // Replace with your actual domain
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://warunadev.vercel.app/",
    title: "Waruna Udara Sampath - Full Stack Software Developer",
    description: "Full Stack Developer specializing in Java, Spring Boot, React/Next.js, and microservices. Building scalable cloud-native applications.",
    siteName: "Waruna Udara Sampath Portfolio",
    images: [{
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Waruna Udara Sampath - Full Stack Software Developer Portfolio"
    }]
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    }
  },
  verification: {
    google: "jKjVbwKMX1zDgzTQNEPZyWizM0b77IKGp1iWmgj_Ufo",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Waruna Udara Sampath",
    "jobTitle": "Full Stack Software Developer",
    "description": "BICT (Hons) undergraduate specializing in microservices and full-stack development",
    "url": "https://warunaudara.vercel.app/",
    "email": "warunaudarasam2003@gmail.com",
    
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kalutara",
      "addressCountry": "LK"
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "University of Sri Jayewardenepura"
    },
    "knowsAbout": [
      "Java",
      "Spring Boot",
      "React.js",
      "Next.js",
      "Docker",
      "AWS",
      "Microservices",
      "TypeScript",
      "MySQL",
      "PostgreSQL"
    ],
    "sameAs": [
      "https://github.com/WarunaUdara", // Replace with your actual GitHub
      "https://linkedin.com/in/waruna-udara" // Replace with your actual LinkedIn
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${instrumentSerif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}