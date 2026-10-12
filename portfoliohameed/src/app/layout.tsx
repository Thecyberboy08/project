import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sayed Hameed Peerzade | Innovation • Engineering • Technology",
  description:
    "Personal portfolio of Sayed Hameed Peerzade, an Electronics & Communication Engineering student at AITM Bhatkal exploring robotics, AI, automation, research, innovation and entrepreneurship.",
  keywords: [
    "Sayed Hameed Peerzade",
    "Sayed Hameed",
    "AITM Bhatkal",
    "Electronics and Communication Engineering",
    "Robotics",
    "Artificial Intelligence",
    "Truth Lens",
    "Astra Sense",
    "Accident Alert System",
    "Innovation Karnataka",
    "Smart Agriculture",
    "Entrepreneurship",
  ],
  authors: [{ name: "Sayed Hameed Peerzade" }],
  creator: "Sayed Hameed Peerzade",
  openGraph: {
    title: "Sayed Hameed Peerzade | Innovation • Engineering • Technology",
    description:
      "Personal portfolio of Sayed Hameed Peerzade, an Electronics & Communication Engineering student exploring robotics, AI, automation, research, innovation and entrepreneurship.",
    url: "https://sayedhameed.com",
    siteName: "Sayed Hameed Peerzade Innovation Lab",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sayed Hameed Peerzade | Innovation • Engineering • Technology",
    description:
      "Personal portfolio of Sayed Hameed Peerzade, an Electronics & Communication Engineering student exploring robotics, AI, automation, research, innovation and entrepreneurship.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#030712",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark scroll-smooth ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#030712] text-white antialiased font-sans overflow-x-hidden selection:bg-cyan-500 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
