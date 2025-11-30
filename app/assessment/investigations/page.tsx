"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, ArrowLeft, FileText, AlertCircle, DollarSign } from "lucide-react";

interface Investigation {
  id: string;
  name: string;
  category: string;
  reason: string;
  urgency: "routine" | "urgent" | "critical";
  cost?: string;
}

const investigations: Investigation[] = [
  {
    id: "fbc",
    name: "Full Blood Count (FBC)",
    category: "Laboratory",
    reason: "Assess for infection markers, anemia",
    urgency: "urgent",
    cost: "$50-80",
  },
  {
    id: "crp",
    name: "C-Reactive Protein (CRP)",
    category: "Laboratory",
    reason: "Inflammatory marker for infection severity",
    urgency: "urgent",
    cost: "$30-50",
  },
  {
    id: "cxr",
    name: "Chest X-Ray",
    category: "Imaging",
    reason: "Evaluate for pneumonia, consolidation",
    urgency: "urgent",
    cost: "$100-200",
  },
  {
    id: "blood-culture",
    name: "Blood Culture",
    category: "Laboratory",
    reason: "Identify causative organism if bacteremia suspected",
    urgency: "critical",
    cost: "$80-120",
  },
  {
    id: "sputum",
    name: "Sputum Culture & Sensitivity",
    category: "Laboratory",
    reason: "Identify pathogen and antibiotic sensitivity",
    urgency: "urgent",
    cost: "$60-100",
  },
  {
    id: "ecg",
    name: "ECG",
    category: "Special Tests",
    reason: "Rule out cardiac involvement",
    urgency: "routine",
    cost: "$40-60",
  },
];

const categories = ["Laboratory", "Imaging", "Special Tests", "Others"];

export default function InvestigationsPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggleInvestigation = (id: string) => {
    const newSelected = new Set(selected);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelected(newSelected);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "bg-error-red text-white";
      case "urgent":
        return "bg-diagnostic-amber text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const groupedInvestigations = categories.map((category) => ({
    category,
    items: investigations.filter((inv) => inv.category === category),
  }));

  return (
    <div className="min-h-screen bg-warm-white">
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-deep-navy">Investigation Suggestions</h2>
            <span className="text-sm text-gray-600">Step 3 of 4</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-eyrie-blue h-2 rounded-full" style={{ width: "75%" }} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <p className="text-gray-600">
            AI-recommended investigations based on patient presentation. Select tests to include in
            the investigation request.
          </p>
        </div>

        <div className="space-y-6">
          {groupedInvestigations.map((group, groupIndex) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{group.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {group.items.map((investigation) => (
                      <div
                        key={investigation.id}
                        className={`p-4 border-2 rounded-lg transition-all ${
                          selected.has(investigation.id)
                            ? "border-eyrie-blue bg-eyrie-blue/5"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            checked={selected.has(investigation.id)}
                            onCheckedChange={() => toggleInvestigation(investigation.id)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold text-deep-navy">
                                {investigation.name}
                              </h3>
                              <div className="flex items-center space-x-2">
                                <span
                                  className={`text-xs px-2 py-1 rounded ${getUrgencyColor(
                                    investigation.urgency
                                  )}`}
                                >
                                  {investigation.urgency.toUpperCase()}
                                </span>
                                {investigation.cost && (
                                  <span className="text-xs text-gray-500 flex items-center gap-1">
                                    <DollarSign className="w-3 h-3" />
                                    {investigation.cost}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex items-start space-x-2 text-sm text-gray-600">
                              <AlertCircle className="w-4 h-4 mt-0.5 text-clinical-teal" />
                              <span>
                                <strong>Why:</strong> {investigation.reason}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <Button variant="outline" onClick={() => router.push("/assessment/analyze")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex space-x-3">
            <Button variant="outline" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Generate Request PDF
            </Button>
            <Button
              onClick={() => router.push("/assessment/diagnosis")}
              className="bg-eyrie-blue hover:bg-eyrie-blue/90"
            >
              Continue to Diagnosis
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

