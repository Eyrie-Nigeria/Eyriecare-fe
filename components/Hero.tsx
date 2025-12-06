"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const scrollToWaitlist = () =>
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="pt-28 pb-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT: Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="inline-block bg-clinical-teal/10 text-clinical-teal text-sm font-medium px-3 py-1 rounded-full">
            AI for Clinical Reasoning
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            AI that helps clinicians think, document, and decide — in seconds.
          </h1>

          <p className="text-lg text-gray-600 max-w-xl">
            EyrieCare captures patient history, structures clinical notes, and suggests differential diagnoses to save time and improve accuracy.
          </p>

          <div className="flex gap-4">
            <Button
              className="rounded-full bg-eyrie-blue px-6 py-5 text-white hover:bg-eyrie-blue/90"
              onClick={scrollToWaitlist}
            >
              Join the waitlist
            </Button>

            <Button
              variant="outline"
              className="rounded-full px-6 py-5"
              onClick={() => window.location.href = "/tools"}
            >
              Try free tools
            </Button>
          </div>

          <div className="text-sm text-gray-500">
            Built for clinicians • Trusted by medical students
          </div>
        </motion.div>

        {/* RIGHT: Demo Video */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gray-50 border rounded-xl overflow-hidden shadow-sm aspect-video"
        >
          <video
            src="/demo.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
