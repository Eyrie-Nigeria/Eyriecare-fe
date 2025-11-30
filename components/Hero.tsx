"use client";

import { motion } from "framer-motion";
import CTAButton from "./CTAButton";

export default function Hero() {
  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="pt-20 pb-12 bg-gradient-to-b from-white to-sky-mist/40">
      <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 bg-clinical-teal/10 text-clinical-teal text-sm font-medium px-3 py-1 rounded-full mb-4">
            AI Clinical Intelligence
          </div>

          <h1 className="text-4xl md:text-5xl font-heading font-bold text-deep-navy mb-4 leading-tight">
            AI-powered clinical reasoning and documentation — built for clinicians and students.
          </h1>

          <p className="text-lg text-gray-700 mb-6 max-w-xl">
            Collect patient histories, generate structured notes, and reason through investigations and differentials — in seconds, not hours.
          </p>

          <div className="flex gap-3">
            <CTAButton onClick={scrollToWaitlist} variant="primary">Join Waitlist</CTAButton>
            <CTAButton onClick={scrollToWaitlist} variant="outline">Request Demo</CTAButton>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <div className="rounded-2xl border border-soft-grey bg-white p-6 shadow">
            <div className="h-60 flex items-center justify-center text-gray-400">Hero screenshot / product mockup</div>
            <div className="mt-4 text-sm text-gray-600">Single screenshot that demonstrates the AI intake → notes flow.</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
