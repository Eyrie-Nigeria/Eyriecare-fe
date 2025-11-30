"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Save, ArrowLeft, ExternalLink, ArrowRight } from "lucide-react";

interface Differential {
  id: string;
  name: string;
  probability: number;
  supportingSymptoms: string[];
  missingSymptoms: string[];
  investigations: string[];
  guidelines: string;
  isRedFlag?: boolean;
}

const differentials: Differential[] = [
  {
    id: "1",
    name: "Community-Acquired Pneumonia",
    probability: 71,
    supportingSymptoms: [
      "Fever and productive cough",
      "Chest pain on inspiration",
      "Shortness of breath",
      "Yellow sputum",
    ],
    missingSymptoms: ["Pleuritic chest pain", "Hemoptysis"],
    investigations: ["Chest X-Ray", "FBC", "CRP", "Sputum culture"],
    guidelines: "NICE CG191 - Pneumonia in adults",
  },
  {
    id: "2",
    name: "Viral Upper Respiratory Infection",
    probability: 55,
    supportingSymptoms: ["Fever", "Cough", "Fatigue"],
    missingSymptoms: ["Productive sputum", "Chest pain"],
    investigations: ["FBC", "CRP"],
    guidelines: "WHO - Acute respiratory infections",
  },
  {
    id: "3",
    name: "Pulmonary Embolism",
    probability: 33,
    supportingSymptoms: ["Chest pain", "Shortness of breath"],
    missingSymptoms: ["Hemoptysis", "Unilateral leg swelling"],
    investigations: ["D-dimer", "CT Pulmonary Angiogram"],
    guidelines: "ESC Guidelines - Acute PE",
    isRedFlag: true,
  },
];

export default function DiagnosisPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-warm-white">
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-deep-navy">Differential Diagnosis</h2>
            <span className="text-sm text-gray-600">Step 4 of 4</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-eyrie-blue h-2 rounded-full" style={{ width: "100%" }} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-deep-navy mb-2">
            Ranked Differential Diagnoses
          </h3>
          <p className="text-gray-600">
            AI-generated differentials based on patient presentation and clinical reasoning
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {differentials.map((diff, index) => (
            <motion.div
              key={diff.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={`${
                  diff.isRedFlag ? "border-2 border-error-red/50" : ""
                } hover:shadow-lg transition-all`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-eyrie-blue text-white flex items-center justify-center font-bold text-lg">
                        {index + 1}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{diff.name}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-clinical-teal h-2 rounded-full"
                              style={{ width: `${diff.probability}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-deep-navy">
                            {diff.probability}%
                          </span>
                        </div>
                      </div>
                    </div>
                    {diff.isRedFlag && (
                      <span className="px-3 py-1 bg-error-red/10 text-error-red rounded-full text-sm font-medium">
                        Red Flag
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-sm mb-2 text-green-700">
                        ✓ Supporting Symptoms
                      </h4>
                      <ul className="space-y-1">
                        {diff.supportingSymptoms.map((symptom, i) => (
                          <li key={i} className="text-sm text-gray-700 flex items-start">
                            <span className="mr-2">•</span>
                            <span>{symptom}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-2 text-orange-700">
                        ⚠ Missing Symptoms
                      </h4>
                      <ul className="space-y-1">
                        {diff.missingSymptoms.map((symptom, i) => (
                          <li key={i} className="text-sm text-gray-700 flex items-start">
                            <span className="mr-2">•</span>
                            <span>{symptom}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div>
                        <span className="font-semibold">Recommended Investigations:</span>
                        <span className="text-gray-600 ml-2">
                          {diff.investigations.join(", ")}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="font-semibold text-sm">Guidelines:</span>
                      <a
                        href="#"
                        className="text-eyrie-blue hover:underline ml-2 text-sm flex items-center gap-1"
                      >
                        {diff.guidelines}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button
            onClick={() => router.push("/assessment/story")}
            className="bg-eyrie-blue hover:bg-eyrie-blue/90"
          >
            <FileText className="w-4 h-4 mr-2" />
            Generate Clinical History & Examination
          </Button>
          <Button variant="outline">
            <Save className="w-4 h-4 mr-2" />
            Save to Patient EHR
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export to PDF
          </Button>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => router.push("/assessment/investigations")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button
            onClick={() => router.push("/ehr")}
            className="bg-clinical-teal hover:bg-clinical-teal/90"
          >
            View Complete EHR
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}

