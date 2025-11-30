"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Download, Share2, ArrowLeft, FileText } from "lucide-react";

export default function StoryPage() {
  const router = useRouter();
  const [story, setStory] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    generateStory();
  }, []);

  const generateStory = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get assessment data from sessionStorage
      const assessmentDataStr = sessionStorage.getItem("assessmentData");
      if (!assessmentDataStr) {
        throw new Error("No assessment data found. Please complete an assessment first.");
      }

      const assessmentData = JSON.parse(assessmentDataStr);
      const { structured, department, basicInfo, answers, selectedPCs } = assessmentData;

      // If structured data is missing or empty, try to reconstruct it from answers
      let finalStructured = structured;
      
      if (!finalStructured || Object.keys(finalStructured).length === 0) {
        // Reconstruct structured data from answers and selectedPCs
        finalStructured = {};
        
        if (selectedPCs && selectedPCs.length > 0) {
          selectedPCs.forEach((pc: string) => {
            finalStructured[pc] = {};
            
            // Find all answers related to this PC
            if (answers) {
              Object.keys(answers).forEach((key) => {
                if (key.includes(pc.toLowerCase().replace(/\s+/g, "_")) || 
                    key.startsWith(pc.toLowerCase().charAt(0))) {
                  finalStructured[pc][key] = answers[key];
                }
              });
            }
          });
        } else {
          // Fallback: use all answers under "General"
          finalStructured = {
            General: answers || {}
          };
        }
      }

      // Validate that we have some data
      if (!finalStructured || Object.keys(finalStructured).length === 0) {
        throw new Error("No patient data available. Please complete the assessment first.");
      }

      const response = await fetch("/api/generate-story", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          structured: finalStructured,
          department: department || "general",
          basicInfo: basicInfo || {},
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to generate story");
      }

      const data = await response.json();
      setStory(data.story);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate story");
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    const blob = new Blob([story], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `patient-history-${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-warm-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-heading font-bold text-deep-navy">
            Clinical History & Examination
          </h1>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleExport} disabled={!story}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/ehr")}
              disabled={!story}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Save to EHR
            </Button>
          </div>
        </div>

        {loading && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="w-12 h-12 animate-spin text-eyrie-blue mb-4" />
                <p className="text-gray-600">Generating clinical narrative...</p>
                <p className="text-sm text-gray-500 mt-2">
                  This may take a few moments
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {error && (
          <Card className="border-error-red">
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <p className="text-error-red font-semibold mb-4">{error}</p>
                <Button onClick={generateStory} variant="outline">
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {story && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Generated Clinical Narrative
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-gray-700 bg-gray-50 p-6 rounded-lg border">
                    {story}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <div className="mt-6">
          <Button
            variant="outline"
            onClick={() => router.push("/assessment/diagnosis")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Diagnosis
          </Button>
        </div>
      </div>
    </div>
  );
}

