"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Share2, FileText, Shield } from "lucide-react";

export default function EHRPage() {
  return (
    <div className="min-h-screen bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-deep-navy mb-2">
              Patient Electronic Health Record
            </h1>
            <p className="text-gray-600">John Doe • 45 years • Male</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">
              <Share2 className="w-4 h-4 mr-2" />
              Sync to Hospital EHR
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Safety Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card className="border-2 border-diagnostic-amber/30 bg-diagnostic-amber/5">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-diagnostic-amber mt-0.5" />
                <div>
                  <p className="font-semibold text-sm mb-1">
                    AI Not a Medical Device — Requires Clinician Oversight
                  </p>
                  <p className="text-xs text-gray-600">
                    This clinical note was generated with AI assistance. All recommendations require
                    clinical judgment and verification by a licensed healthcare provider.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Summary */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    45-year-old male presents with 3-day history of fever (38.5°C), productive
                    cough with yellow sputum, chest pain on deep inspiration, and shortness of
                    breath. No significant past medical history. Vital signs stable except for
                    elevated temperature. Clinical presentation consistent with lower respiratory
                    tract infection, most likely community-acquired pneumonia.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* HPI */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>History of Presenting Illness</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <p>
                      <strong>Onset:</strong> Symptoms began 3 days ago with gradual onset of fever
                      and cough.
                    </p>
                    <p>
                      <strong>Duration:</strong> 3 days, progressively worsening.
                    </p>
                    <p>
                      <strong>Character:</strong> Productive cough with yellow sputum, pleuritic
                      chest pain.
                    </p>
                    <p>
                      <strong>Severity:</strong> Patient rates pain as 6/10, affecting daily
                      activities.
                    </p>
                    <p>
                      <strong>Associated Symptoms:</strong> Fatigue, malaise, shortness of breath
                      on exertion.
                    </p>
                    <p>
                      <strong>Relieving Factors:</strong> Rest, paracetamol provides temporary
                      relief.
                    </p>
                    <p>
                      <strong>Aggravating Factors:</strong> Deep breathing, physical activity.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Exam Findings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Physical Examination Findings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Vital Signs:</strong> Temp 38.5°C, BP 130/80 mmHg, RR 20/min, SpO2
                      96%, HR 88 bpm
                    </p>
                    <p>
                      <strong>Respiratory:</strong> Decreased air entry in right lower lobe,
                      crepitations on auscultation.
                    </p>
                    <p>
                      <strong>Cardiovascular:</strong> Regular rhythm, no murmurs.
                    </p>
                    <p>
                      <strong>Other:</strong> No signs of respiratory distress at rest.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Investigations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Investigations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="p-3 bg-sky-mist/50 rounded-lg">
                      <p className="font-semibold text-sm mb-1">Laboratory</p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Full Blood Count (FBC) - Urgent</li>
                        <li>• C-Reactive Protein (CRP) - Urgent</li>
                        <li>• Sputum Culture & Sensitivity - Urgent</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-sky-mist/50 rounded-lg">
                      <p className="font-semibold text-sm mb-1">Imaging</p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Chest X-Ray - Urgent</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Differential Diagnoses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Differential Diagnoses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border-l-4 border-eyrie-blue bg-sky-mist/30 rounded">
                      <p className="font-semibold">
                        1. Community-Acquired Pneumonia (71% probability)
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Most likely diagnosis based on clinical presentation and symptoms.
                      </p>
                    </div>
                    <div className="p-3 border-l-4 border-clinical-teal bg-sky-mist/30 rounded">
                      <p className="font-semibold">
                        2. Viral Upper Respiratory Infection (55% probability)
                      </p>
                    </div>
                    <div className="p-3 border-l-4 border-error-red bg-sky-mist/30 rounded">
                      <p className="font-semibold">
                        3. Pulmonary Embolism (33% probability) - Red Flag
                      </p>
                      <p className="text-xs text-error-red mt-1">
                        Consider if patient has risk factors or if symptoms worsen.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div>
                      <strong>1. Investigations:</strong> Order FBC, CRP, Chest X-Ray, and sputum
                      culture as outlined above.
                    </div>
                    <div>
                      <strong>2. Treatment:</strong> Await investigation results. Consider
                      empirical antibiotic therapy if bacterial pneumonia confirmed (per local
                      guidelines).
                    </div>
                    <div>
                      <strong>3. Monitoring:</strong> Review in 48 hours or sooner if symptoms
                      worsen. Monitor oxygen saturation and respiratory status.
                    </div>
                    <div>
                      <strong>4. Patient Education:</strong> Advise rest, adequate hydration, and
                      to return if symptoms worsen or new symptoms develop.
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Explainability Mode */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Explainability Mode</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    <FileText className="w-4 h-4 mr-2" />
                    View AI Reasoning
                  </Button>
                  <p className="text-xs text-gray-500 mt-3">
                    See why the AI suggested each diagnosis and which evidence supports it.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* References */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">References</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <a href="#" className="text-eyrie-blue hover:underline block">
                      NICE CG191 - Pneumonia in adults
                    </a>
                    <a href="#" className="text-eyrie-blue hover:underline block">
                      WHO - Acute respiratory infections
                    </a>
                    <a href="#" className="text-eyrie-blue hover:underline block">
                      ESC Guidelines - Acute PE
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

