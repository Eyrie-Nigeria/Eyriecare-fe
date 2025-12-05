// app/page.tsx
"use client";
import Hero from "@/components/Hero";
import Navbar from "@/components/navbar";
import Features from "@/components/Features";
import ToolsCallout from "@/components/ToolsCallout";
import WaitlistSection from "@/components/WaitlistSection";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-warm-white">
      <Navbar />

      <main>
        <Hero />
        <Features />
        <ToolsCallout />
        <WaitlistSection />
      </main>

      <Footer />
    </div>
  );
}
