"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Baby,
  Heart,
  Brain,
  Eye,
  Stethoscope,
  User,
  ArrowRight,
} from "lucide-react";

const departments = [
  {
    id: "pediatric",
    name: "Pediatric",
    icon: Baby,
    color: "bg-pink-500",
    description: "Children and adolescents (0-18 years)",
  },
  {
    id: "obstetrics-gynecology",
    name: "Obstetrics & Gynecology",
    icon: Heart,
    color: "bg-purple-500",
    description: "Women's health, pregnancy, and reproductive care",
  },
  {
    id: "internal-medicine",
    name: "Internal Medicine",
    icon: Stethoscope,
    color: "bg-blue-500",
    description: "Adult general medicine",
  },
  {
    id: "cardiology",
    name: "Cardiology",
    icon: Heart,
    color: "bg-red-500",
    description: "Heart and cardiovascular system",
  },
  {
    id: "neurology",
    name: "Neurology",
    icon: Brain,
    color: "bg-indigo-500",
    description: "Nervous system disorders",
  },
  {
    id: "ophthalmology",
    name: "Ophthalmology",
    icon: Eye,
    color: "bg-cyan-500",
    description: "Eye and vision care",
  },
  {
    id: "general",
    name: "General Practice",
    icon: User,
    color: "bg-gray-500",
    description: "General medical practice",
  },
];

export default function DepartmentSelectionPage() {
  const router = useRouter();
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  const handleContinue = () => {
    if (selectedDepartment) {
      router.push(`/assessment/new?department=${selectedDepartment}`);
    }
  };

  return (
    <div className="min-h-screen bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-heading font-bold text-deep-navy mb-4">
            Select Medical Department
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the department you&apos;re working in to customize the assessment flow
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {departments.map((dept, index) => {
            const Icon = dept.icon;
            const isSelected = selectedDepartment === dept.id;
            return (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    isSelected
                      ? "border-2 border-eyrie-blue bg-eyrie-blue/5"
                      : "hover:border-eyrie-blue/50"
                  }`}
                  onClick={() => setSelectedDepartment(dept.id)}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div
                        className={`w-12 h-12 rounded-lg ${dept.color} flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-deep-navy mb-1">
                          {dept.name}
                        </h3>
                        <p className="text-sm text-gray-600">{dept.description}</p>
                      </div>
                      {isSelected && (
                        <div className="w-6 h-6 rounded-full bg-eyrie-blue flex items-center justify-center shrink-0">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleContinue}
            disabled={!selectedDepartment}
            className="bg-eyrie-blue hover:bg-eyrie-blue/90 px-8 h-12 text-lg"
          >
            Continue to Assessment
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}

