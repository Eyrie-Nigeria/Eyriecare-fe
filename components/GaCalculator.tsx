"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function GA_EDD_Calculator() {
  const [lmp, setLmp] = useState("");
  const [ga, setGa] = useState("");
  const [edd, setEdd] = useState("");

  const calculate = () => {
    if (!lmp) return;

    const lmpDate = new Date(lmp);
    const today = new Date();

    // Gestational Age (GA)
    const diff = today.getTime() - lmpDate.getTime();
    const days = Math.floor(diff / (1000 * 3600 * 24));
    const weeks = Math.floor(days / 7);
    const remainingDays = days % 7;

    setGa(`${weeks} weeks ${remainingDays} days`);

    // Estimated Due Date (EDD) — LMP + 280 days
    const eddDate = new Date(lmpDate);
    eddDate.setDate(eddDate.getDate() + 280);
    setEdd(eddDate.toDateString());
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-xl mx-auto mt-16 bg-white p-8 rounded-2xl shadow-md"
    >
      <h3 className="text-2xl font-bold text-deep-navy mb-3 text-center">
        🎁 Free GA & EDD Calculator
      </h3>
      <p className="text-gray-600 text-center mb-6">
        Enter Last Menstrual Period (LMP) to get Gestational Age and Due Date.
      </p>

      <div className="space-y-4">
        <Input
          type="date"
          value={lmp}
          onChange={(e) => setLmp(e.target.value)}
          className="h-12 rounded-full px-6"
        />

        <Button onClick={calculate} className="w-full rounded-full h-12">
          Calculate
        </Button>

        {ga && (
          <div className="bg-sky-mist/40 p-4 rounded-xl mt-4">
            <p className="text-deep-navy font-semibold">
              Gestational Age:
            </p>
            <p className="text-gray-700">{ga}</p>
          </div>
        )}

        {edd && (
          <div className="bg-clinical-teal/20 p-4 rounded-xl mt-2">
            <p className="text-deep-navy font-semibold">
              Estimated Due Date (EDD):
            </p>
            <p className="text-gray-700">{edd}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
