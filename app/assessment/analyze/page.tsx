"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, TrendingUp, Activity, ArrowRight, ArrowLeft } from "lucide-react";

export default function SymptomAnalysisPage() {
  const router = useRouter();
  
  // Retrieve assessment data from sessionStorage
  const assessmentData = typeof window !== "undefined" 
    ? JSON.parse(sessionStorage.getItem("assessmentData") || "{}")
    : {};

  const symptomSummary = [
    "Fever (38.5°C) for 3 days",
    "Productive cough with yellow sputum",
    "Chest pain on deep inspiration",
    "Shortness of breath on exertion",
    "Fatigue and malaise",
  ];

  const redFlags = [
    { text: "Hemoptysis reported", severity: "high" },
    { text: "Oxygen saturation < 95%", severity: "critical" },
  ];

  const systemInvolvement = [
    { system: "Respiratory", probability: 78, color: "bg-red-500" },
    { system: "Cardiovascular", probability: 44, color: "bg-orange-500" },
    { system: "Constitutional", probability: 65, color: "bg-yellow-500" },
  ];

  return (
    <div className="min-h-screen bg-warm-white">
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-deep-navy">Symptom Analysis</h2>
            <span className="text-sm text-gray-600">Step 2 of 4</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-eyrie-blue h-2 rounded-full" style={{ width: "50%" }} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Symptom Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-clinical-teal" />
                  Symptom Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Extracted automatically from patient history
                </p>
                <div className="space-y-2">
                  {symptomSummary.map((symptom, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 p-3 bg-sky-mist/50 rounded-lg"
                    >
                      <div className="w-2 h-2 rounded-full bg-clinical-teal" />
                      <span className="text-sm">{symptom}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Red Flags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="border-2 border-error-red/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-error-red">
                  <AlertTriangle className="w-5 h-5" />
                  Red Flags Detected
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {redFlags.map((flag, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg ${
                        flag.severity === "critical"
                          ? "bg-error-red/10 border border-error-red/30"
                          : "bg-diagnostic-amber/10 border border-diagnostic-amber/30"
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        <AlertTriangle
                          className={`w-4 h-4 mt-0.5 ${
                            flag.severity === "critical" ? "text-error-red" : "text-diagnostic-amber"
                          }`}
                        />
                        <span className="text-sm font-medium">{flag.text}</span>
                      </div>
                      <span
                        className={`text-xs mt-1 inline-block px-2 py-1 rounded ${
                          flag.severity === "critical"
                            ? "bg-error-red/20 text-error-red"
                            : "bg-diagnostic-amber/20 text-diagnostic-amber"
                        }`}
                      >
                        {flag.severity.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* System Involvement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-eyrie-blue" />
                  Likely System Involvement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {systemInvolvement.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{item.system}</span>
                        <span className="text-gray-600">{item.probability}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`${item.color} h-3 rounded-full transition-all`}
                          style={{ width: `${item.probability}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Pattern Matching */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <Card>
              <CardHeader>
                <CardTitle>Pattern Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-sky-mist/50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Symptoms align with:</strong> Lower respiratory tract infection
                    clusters, possible community-acquired pneumonia pattern. High correlation with
                    bacterial vs. viral differentiation needed.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={() => router.push("/assessment/new")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button
            onClick={() => router.push("/assessment/investigations")}
            className="bg-eyrie-blue hover:bg-eyrie-blue/90"
          >
            Continue to Investigations
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}

