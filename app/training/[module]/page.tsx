"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, CheckCircle2 } from "lucide-react";

const cases = [
  {
    id: 1,
    title: "Case 1: Acute Chest Pain",
    difficulty: "Beginner",
    description: "A 55-year-old male presents with sudden onset chest pain.",
    completed: true,
  },
  {
    id: 2,
    title: "Case 2: Shortness of Breath",
    difficulty: "Intermediate",
    description: "A 42-year-old female with progressive dyspnea over 2 weeks.",
    completed: true,
  },
  {
    id: 3,
    title: "Case 3: Palpitations",
    difficulty: "Advanced",
    description: "A 35-year-old athlete with recurrent palpitations during exercise.",
    completed: false,
  },
];

export default function TrainingModulePage() {
  const params = useParams();
  const router = useRouter();
  const moduleName = params.module as string;

  return (
    <div className="min-h-screen bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => router.push("/training")} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Training
          </Button>
          <h1 className="text-3xl font-heading font-bold text-deep-navy mb-2 capitalize">
            {moduleName} Cases
          </h1>
          <p className="text-gray-600">Practice clinical reasoning with simulated patients</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((caseItem, index) => (
            <motion.div
              key={caseItem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-all h-full">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-lg">{caseItem.title}</CardTitle>
                    {caseItem.completed && (
                      <CheckCircle2 className="w-5 h-5 text-success-mint" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{caseItem.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        caseItem.difficulty === "Beginner"
                          ? "bg-green-100 text-green-700"
                          : caseItem.difficulty === "Intermediate"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {caseItem.difficulty}
                    </span>
                    <Button size="sm">
                      <Play className="w-4 h-4 mr-2" />
                      Start
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

