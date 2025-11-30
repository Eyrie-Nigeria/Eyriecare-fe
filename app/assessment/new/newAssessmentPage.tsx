"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  ArrowLeft,
  User,
  Thermometer,
  Activity,
  Wind,
  Heart,
  Mic,
} from "lucide-react";
import {
  PC_5C_QUESTIONS,
  flattenPCsToQueue,
  isMultiAnswer,
  DEFAULT_PCS,
  QuestionDef,
  AnswersShape,
} from "@/app/patient-history/patientHistoryHelpers";

export default function NewAssessmentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const department = searchParams.get("department") || "general";

  const [basicInfo, setBasicInfo] = useState({
    name: "",
    age: "",
    sex: "",
    temp: "",
    bp: "",
    rr: "",
    spo2: "",
    hr: "",
  });

  const [selectedPCs, setSelectedPCs] = useState<string[]>([]);
  const [customPC, setCustomPC] = useState("");
  const [queue, setQueue] = useState<QuestionDef[] | null>(null);
  const [index, setIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<AnswersShape>({});
  const [tempInput, setTempInput] = useState("");
  const [multiTemp, setMultiTemp] = useState<Record<string, string[]>>({});
  const [showBasicInfo, setShowBasicInfo] = useState(true);

  // Get department-specific PCs or use defaults
  const availablePCs = useMemo(() => {
    if (department === "pediatric") {
      return ["Fever", "Cough", "Vomiting", "Diarrhea", "Rash", "Seizure"];
    } else if (department === "obstetrics-gynecology") {
      return ["Abdominal pain", "Vaginal bleeding", "Discharge", "Amenorrhea", "Pelvic pain"];
    }
    return DEFAULT_PCS;
  }, [department]);

  const createQueueAndStart = (pcs: string[]) => {
    const q = flattenPCsToQueue(pcs);
    setQueue(q);
    setIndex(0);
    setAnswers({});
    setTempInput("");
    setMultiTemp({});
    setShowBasicInfo(false);
  };

  const handleOptionChoose = (option: string, q: QuestionDef) => {
    if (isMultiAnswer(q)) {
      setMultiTemp((prev) => {
        const arr = prev[q.key] ?? [];
        const exists = arr.includes(option);
        const nextArr = exists ? arr.filter((a) => a !== option) : [...arr, option];
        return { ...prev, [q.key]: nextArr };
      });
      return;
    }
    setAnswers((prev) => ({ ...prev, [q.key]: option }));
    setTimeout(() => goNext(), 200);
  };

  const handleSubmitFreeText = (q: QuestionDef) => {
    const val = tempInput.trim();
    if (!val) return;
    if (isMultiAnswer(q)) {
      setMultiTemp((prev) => {
        const arr = prev[q.key] ?? [];
        return { ...prev, [q.key]: [...arr, val] };
      });
      setTempInput("");
      return;
    }
    setAnswers((prev) => ({ ...prev, [q.key]: val }));
    setTempInput("");
    setTimeout(() => goNext(), 150);
  };

  const goNext = () => {
    if (!queue) return;
    const currentQ = queue[index];
    if (currentQ && isMultiAnswer(currentQ)) {
      const multiVals = multiTemp[currentQ.key] ?? [];
      if (multiVals.length) setAnswers((prev) => ({ ...prev, [currentQ.key]: multiVals }));
    }
    if (index < queue.length - 1) {
      setIndex((i) => i + 1);
      setTempInput("");
    } else {
      // Finished - proceed to analysis
      proceedToAnalysis();
    }
  };

  const goBack = () => {
    if (!queue) return;
    if (index > 0) {
      setIndex((i) => i - 1);
      setTempInput("");
    } else {
      setQueue(null);
      setShowBasicInfo(true);
    }
  };

  const proceedToAnalysis = () => {
    // Construct structured data from answers grouped by PC
    const structured: Record<string, Record<string, string | string[]>> = {};
    
    if (queue && queue.length > 0) {
      queue.forEach((q) => {
        if (q.key.startsWith("__pc_header__")) {
          const pc = q.question.replace("Presenting Complaint: ", "").split(" — ")[0];
          structured[pc] = structured[pc] || {};
          if (answers[q.key]) {
            structured[pc]["pc_note"] = answers[q.key] as string;
          }
          return;
        }
        // Find which PC this question belongs to
        const idx = queue.indexOf(q);
        let pc = "General";
        for (let j = idx; j >= 0; j--) {
          const qq = queue[j];
          if (qq.key.startsWith("__pc_header__")) {
            pc = qq.question.replace("Presenting Complaint: ", "").split(" — ")[0];
            break;
          }
        }
        structured[pc] = structured[pc] || {};
        const val = answers[q.key] ?? multiTemp[q.key] ?? null;
        if (val !== null && val !== undefined) {
          structured[pc][q.key] = val;
        }
      });
    } else {
      // Fallback: create structure from selected PCs and answers
      if (selectedPCs && selectedPCs.length > 0) {
        selectedPCs.forEach((pc) => {
          structured[pc] = {};
          // Add any answers that might relate to this PC
          Object.keys(answers).forEach((key) => {
            if (key.toLowerCase().includes(pc.toLowerCase().replace(/\s+/g, "_"))) {
              structured[pc][key] = answers[key];
            }
          });
        });
      } else {
        structured["General"] = answers;
      }
    }

    // Ensure we have at least some data
    if (Object.keys(structured).length === 0) {
      structured["General"] = {
        note: "Patient assessment in progress",
        ...answers,
      };
    }

    // Combine all data and pass to analysis
    const assessmentData = {
      department,
      basicInfo,
      selectedPCs: selectedPCs.length > 0 ? selectedPCs : ["General"],
      answers,
      structured, // Include structured data for story generation
    };
    
    // Store in sessionStorage
    try {
      sessionStorage.setItem("assessmentData", JSON.stringify(assessmentData));
    } catch (err) {
      console.error("Failed to save assessment data:", err);
    }
    
    router.push("/assessment/analyze");
  };

  const currentQuestion = useMemo(() => {
    if (!queue) return null;
    if (index >= queue.length) return null;
    return queue[index];
  }, [queue, index]);

  // If no department selected, redirect
  useEffect(() => {
    if (!department) {
      router.push("/assessment/department");
    }
  }, [department, router]);

  return (
    <div className="min-h-screen bg-warm-white">
      {/* Progress Bar */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-deep-navy">
              Patient Assessment - {department.replace("-", " ").toUpperCase()}
            </h2>
            <span className="text-sm text-gray-600">
              {queue ? `Step ${index + 1} of ${queue.length}` : "Basic Info"}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-eyrie-blue h-2 rounded-full transition-all duration-300"
              style={{
                width: queue
                  ? `${((index + 1) / queue.length) * 100}%`
                  : showBasicInfo
                  ? "25%"
                  : "0%",
              }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Basic Info Section */}
        {showBasicInfo && !queue && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Name</label>
                    <Input
                      value={basicInfo.name}
                      onChange={(e) =>
                        setBasicInfo({ ...basicInfo, name: e.target.value })
                      }
                      placeholder="Patient name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Age</label>
                    <Input
                      type="number"
                      value={basicInfo.age}
                      onChange={(e) =>
                        setBasicInfo({ ...basicInfo, age: e.target.value })
                      }
                      placeholder="Years"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Sex</label>
                    <select
                      value={basicInfo.sex}
                      onChange={(e) =>
                        setBasicInfo({ ...basicInfo, sex: e.target.value })
                      }
                      className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-4">Vital Signs</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block flex items-center gap-1">
                        <Thermometer className="w-4 h-4" />
                        Temp
                      </label>
                      <Input
                        value={basicInfo.temp}
                        onChange={(e) =>
                          setBasicInfo({ ...basicInfo, temp: e.target.value })
                        }
                        placeholder="°C"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block flex items-center gap-1">
                        <Activity className="w-4 h-4" />
                        BP
                      </label>
                      <Input
                        value={basicInfo.bp}
                        onChange={(e) =>
                          setBasicInfo({ ...basicInfo, bp: e.target.value })
                        }
                        placeholder="mmHg"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block flex items-center gap-1">
                        <Wind className="w-4 h-4" />
                        RR
                      </label>
                      <Input
                        value={basicInfo.rr}
                        onChange={(e) =>
                          setBasicInfo({ ...basicInfo, rr: e.target.value })
                        }
                        placeholder="/min"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">SpO2</label>
                      <Input
                        value={basicInfo.spo2}
                        onChange={(e) =>
                          setBasicInfo({ ...basicInfo, spo2: e.target.value })
                        }
                        placeholder="%"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        HR
                      </label>
                      <Input
                        value={basicInfo.hr}
                        onChange={(e) =>
                          setBasicInfo({ ...basicInfo, hr: e.target.value })
                        }
                        placeholder="bpm"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Presenting Complaints Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Select Presenting Complaints</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                  {availablePCs.map((pc) => {
                    const selected = selectedPCs.includes(pc);
                    return (
                      <button
                        key={pc}
                        onClick={() => {
                          if (selected) {
                            setSelectedPCs(selectedPCs.filter((s) => s !== pc));
                          } else {
                            setSelectedPCs([...selectedPCs, pc]);
                          }
                        }}
                        className={`px-4 py-2 border rounded-md transition-all ${
                          selected
                            ? "bg-eyrie-blue text-white border-eyrie-blue"
                            : "bg-white border-gray-300 hover:border-eyrie-blue"
                        }`}
                      >
                        {pc}
                      </button>
                    );
                  })}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={customPC}
                    onChange={(e) => setCustomPC(e.target.value)}
                    placeholder="Add custom presenting complaint"
                    className="flex-1"
                  />
                  <Button
                    onClick={() => {
                      if (customPC.trim() && !selectedPCs.includes(customPC.trim())) {
                        setSelectedPCs([...selectedPCs, customPC.trim()]);
                        setCustomPC("");
                      }
                    }}
                    variant="outline"
                  >
                    Add
                  </Button>
                </div>
                <Button
                  onClick={() =>
                    createQueueAndStart(selectedPCs.length ? selectedPCs : ["General"])
                  }
                  disabled={selectedPCs.length === 0}
                  className="w-full mt-4 bg-eyrie-blue hover:bg-eyrie-blue/90"
                >
                  Start History Taking
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Question Flow */}
        {queue && currentQuestion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <Card>
              <CardContent className="pt-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQuestion.key}
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <h3 className="font-semibold text-xl text-deep-navy">
                      {currentQuestion.question}
                    </h3>

                    {currentQuestion.options && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {currentQuestion.options.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => handleOptionChoose(opt, currentQuestion)}
                            className={`px-4 py-3 border rounded-lg text-left transition-all ${
                              isMultiAnswer(currentQuestion) &&
                              multiTemp[currentQuestion.key]?.includes(opt)
                                ? "bg-eyrie-blue text-white border-eyrie-blue"
                                : answers[currentQuestion.key] === opt
                                ? "bg-eyrie-blue text-white border-eyrie-blue"
                                : "bg-white border-gray-300 hover:border-eyrie-blue hover:bg-eyrie-blue/5"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}

                    {currentQuestion.freeText && (
                      <div className="flex gap-2">
                        <Input
                          value={tempInput}
                          onChange={(e) => setTempInput(e.target.value)}
                          placeholder="Type your answer..."
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              handleSubmitFreeText(currentQuestion);
                            }
                          }}
                          className="flex-1"
                        />
                        <Button
                          onClick={() => handleSubmitFreeText(currentQuestion)}
                          className="bg-eyrie-blue hover:bg-eyrie-blue/90"
                        >
                          <Mic className="w-4 h-4 mr-2" />
                          Submit
                        </Button>
                        {isMultiAnswer(currentQuestion) && (
                          <Button onClick={goNext} variant="outline">
                            Next
                          </Button>
                        )}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                <div className="flex justify-between mt-6 pt-6 border-t">
                  <Button variant="outline" onClick={goBack}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  {index === queue.length - 1 && (
                    <Button
                      onClick={proceedToAnalysis}
                      className="bg-clinical-teal hover:bg-clinical-teal/90"
                    >
                      Complete & Analyze
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
