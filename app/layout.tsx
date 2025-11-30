import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "EyrieCare — AI Clinical Reasoning for the Future of Care",
  description: "AI-powered clinical reasoning and documentation assistant for clinicians and medical students. Collect patient history, structure SOAP notes, suggest investigations, and rank differential diagnoses with medical-grade precision.",
  keywords: ["clinical reasoning", "medical AI", "SOAP notes", "medical documentation", "healthcare AI", "medical education"],
  openGraph: {
    title: "EyrieCare — AI Clinical Reasoning for the Future of Care",
    description: "AI-powered clinical reasoning and documentation assistant for clinicians and medical students.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${sora.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
