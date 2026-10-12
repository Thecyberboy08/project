import type { Metadata, Viewport } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TRUTHLENS // CYBER FORENSICS & SYNTHETIC FORGERY DISSECTOR | SY TECH",
  description:
    "Professional cyber intelligence & forensic analysis platform by SY Tech for disassembling synthetic media and reverse-tracing digital manipulation.",
  keywords: [
    "TruthLens",
    "SY Tech",
    "Cyber Forensics",
    "Deepfake Dissector",
    "OSINT Recon",
    "Synthetic Forgery Analysis",
    "Digital Tamper Detection",
  ],
  authors: [{ name: "SY Tech" }],
  creator: "SY Tech",
  publisher: "SY Tech",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistMono.variable} h-full dark antialiased`}>
      <body className="min-h-full flex flex-col bg-[#080c14] text-[#e6edf3] font-mono selection:bg-emerald-500/25 selection:text-emerald-300">
        {children}
      </body>
    </html>
  );
}
