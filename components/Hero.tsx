// components/Hero.tsx
"use client";

import { motion } from "framer-motion";
import ProductScreenshot from "./ProductScreenshot";
import { Button } from "./ui/button";

export default function Hero() {
  const scrollToWaitlist = () => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="pt-24 pb-12 bg-gradient-to-b from-white to-sky-mist/30">
      <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 bg-clinical-teal/10 text-clinical-teal text-sm font-medium px-3 py-1 rounded-full mb-4">
            AI Clinical Intelligence
          </div>

          <h1 className="text-4xl md:text-5xl font-heading font-bold text-deep-navy leading-tight mb-4">
            AI clinical reasoning and documentation — for clinicians and students.
          </h1>

          <p className="text-lg text-gray-700 mb-6 max-w-xl">
            EyrieCare captures histories, generates structured notes, and suggests evidence-based differentials — in seconds.
          </p>

          <div className="flex gap-3">
            <Button className="rounded-full bg-eyrie-blue text-white" onClick={scrollToWaitlist}>Join Waitlist</Button>
            <Button className="rounded-full border" onClick={() => (window.location.href = "/tools")}>Free Tools</Button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <ProductScreenshot title="Clinical Documentation Interface" description="AI-assisted SOAP note generation" />
        </motion.div>
      </div>
    </section>
  );
}
