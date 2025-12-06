"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const departments = [
  {
    id: "pediatrics",
    title: "Pediatrics",
    desc: "Clerk a child: age-specific history, milestones, immunization, birth history.",
    color: "bg-blue-100 text-blue-700"
  },
  {
    id: "obgyn",
    title: "Obstetrics & Gynecology",
    desc: "Clerk an antenatal, postnatal or gynecology patient.",
    color: "bg-pink-100 text-pink-700"
  }
];

export default function ChooseDepartmentPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 p-6 max-w-3xl mx-auto">
      <motion.h1 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-navy mb-6"
      >
        Choose Department
      </motion.h1>

      <div className="grid gap-4">
        {departments.map((dept) => (
          <motion.div
            key={dept.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className={`p-6 rounded-xl shadow cursor-pointer border hover:shadow-lg transition-all ${dept.color}`}
            onClick={() => router.push(`/student/clerk/${dept.id}`)}
          >
            <p className="text-xl font-semibold">{dept.title}</p>
            <p className="text-sm opacity-80 mt-1">{dept.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
