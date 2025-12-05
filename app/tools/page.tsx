"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Calculator } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { WHO, Sex } from "@/data/who";


// --- Utility Functions (GA & EDD) ---
const calculateEDD = (lmp: string) => {
  const date = new Date(lmp);
  date.setDate(date.getDate() + 280); // 40 weeks
  return date.toISOString().split("T")[0];
};

const calculateGA = (lmp: string) => {
  const lmpDate = new Date(lmp);
  const today = new Date();
  const diffMs = today.getTime() - lmpDate.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(diffDays / 7);
  const days = diffDays % 7;
  return `${weeks} weeks, ${days} days`;
};


const zScore = (L: number, M: number, S: number, x: number) => {
  if (L === 0) return Math.log(x / M) / S;
  return (Math.pow(x / M, L) - 1) / (L * S);
};

const erf = (x: number) => {
  const sign = x >= 0 ? 1 : -1;
  x = Math.abs(x);
  const a1 = 0.254829592,
    a2 = -0.284496736,
    a3 = 1.421413741,
    a4 = -1.453152027,
    a5 = 1.061405429,
    p = 0.3275911;
  const t = 1 / (1 + p * x);
  const y =
    1 -
    ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) *
      t *
      Math.exp(-x * x);
  return sign * y;
};

const zToPercentile = (z: number) =>
  Math.round((0.5 * (1 + erf(z / Math.sqrt(2)))) * 100);

// --- UI COMPONENT ---
export default function ToolsPage() {
  const [open, setOpen] = useState<number | null>(null);


  // GA/EDD
  const [lmp, setLmp] = useState("");
  const [edd, setEdd] = useState("");
  const [ga, setGa] = useState("");

  // Growth
  const [age, setAge] = useState("");
  const [sex, setSex] = useState<Sex>("male");
  const [weight, setWeight] = useState("");
  const [percentile, setPercentile] = useState<number | null>(null);

  const runEDD = () => lmp && setEdd(calculateEDD(lmp));
  const runGA = () => lmp && setGa(calculateGA(lmp));

 const runGrowth = () => {
  const ref = WHO[sex].weightForAge[Number(age)];

  if (!ref) {
    alert("Age not available in demo — WHO full data can be added.");
    return;
  }

  const z = zScore(ref.L, ref.M, ref.S, Number(weight));
  setPercentile(zToPercentile(z));
};


  return (
    <div className="min-h-screen bg-white pb-20">
      {/* HERO */}
      <section className="pt-20 pb-12 text-center px-4">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Free Medical Calculators
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Trusted clinical tools for parents, clinicians, and students —
          powered by EyrieCare.
        </p>
      </section>

      <div className="max-w-3xl mx-auto space-y-6 px-4">
        {/* CARD TEMPLATE */}
        {[
          {
            title: "Gestational Age (GA) Calculator (Enter LMP)",
            content: (
              <>
                <Input
                  type="date"
                  value={lmp}
                  onChange={(e) => setLmp(e.target.value)}
                  className="mt-3"
                />
                
                <div className="flex gap-4 mt-4">
                  <Button onClick={runGA}>Calculate GA</Button>
                </div>

                {ga && (
                  <p className="mt-4 text-gray-700 font-medium">
                    Gestational Age: {ga}
                  </p>
                )}
              </>
            )
          },
          {
            title: "Estimated Due Date (EDD) Calculator",
            content: (
              <>
                <Input
                  type="date"
                  value={lmp}
                  onChange={(e) => setLmp(e.target.value)}
                  className="mt-3"
                />
                <Button onClick={runEDD} className="mt-4">
                  Calculate EDD
                </Button>

                {edd && (
                  <p className="mt-4 text-gray-700 font-medium">
                    Estimated Due Date: {edd}
                  </p>
                )}
              </>
            )
          },
          {
            title: "Pediatric Growth Chart (WHO Percentile)",
            content: (
//               <>
//                 <Input
//                   type="number"
//                   placeholder="Age (months)"
//                   value={age}
//                   onChange={(e) => setAge(e.target.value)}
//                   className="mt-3"
//                 />

//                 <select
//                   value={sex}
//                   onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
//   setSex(e.target.value as Sex)
// }

//                   className="w-full mt-3 p-2 border rounded-lg"
//                 >
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
//                 </select>

//                 <Input
//                   type="number"
//                   placeholder="Weight (kg)"
//                   value={weight}
//                   onChange={(e) => setWeight(e.target.value)}
//                   className="mt-3"
//                 />

//                 <Button onClick={runGrowth} className="mt-4">
//                   Calculate Percentile
//                 </Button>

//                 {percentile !== null && (
//                   <p className="mt-4 text-gray-700 font-medium">
//                     Weight-for-Age Percentile: {percentile}th %
//                   </p>
//                 )}
              //               </>
              <p className="text-gray-600">Pediatric Growth Chart tool coming soon!</p>
            )
          }
        ].map((item, index) => (
          <motion.div
            key={index}
            className="border rounded-xl p-6 shadow-sm bg-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <button
              className="w-full flex justify-between items-center text-left"
              onClick={() => setOpen(open === index ? null : index)}
            >
              <span className="text-lg font-semibold">{item.title}</span>
              <ChevronDown
                className={`transition-transform ${
                  open === index ? "rotate-180" : ""
                }`}
              />
            </button>

            {open === index && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4"
              >
                {item.content}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
