"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, FileText } from "lucide-react";

const patients = [
  {
    id: 1,
    name: "John Doe",
    age: 45,
    lastVisit: "2024-11-30",
    complaint: "Chest pain",
    diagnosis: "Community-Acquired Pneumonia",
    status: "completed",
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 32,
    lastVisit: "2024-11-29",
    complaint: "Fever & cough",
    diagnosis: "Viral Upper Respiratory Infection",
    status: "completed",
  },
  {
    id: 3,
    name: "Mike Johnson",
    age: 28,
    lastVisit: "2024-11-28",
    complaint: "Abdominal pain",
    diagnosis: "Gastroenteritis",
    status: "completed",
  },
];

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-deep-navy mb-2">
            Patient History
          </h1>
          <p className="text-gray-600">View all past patient assessments</p>
        </div>

        <div className="space-y-4">
          {patients.map((patient, index) => (
            <motion.div
              key={patient.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-all cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-eyrie-blue/10 flex items-center justify-center">
                        <User className="w-6 h-6 text-eyrie-blue" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-deep-navy">{patient.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {patient.lastVisit}
                          </span>
                          <span>{patient.age} years</span>
                          <span>•</span>
                          <span>{patient.complaint}</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          <strong>Diagnosis:</strong> {patient.diagnosis}
                        </p>
                      </div>
                    </div>
                    <Link href={`/ehr?patient=${patient.id}`}>
                      <Button variant="outline">
                        View Record
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
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

