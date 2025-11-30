"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

// Import the 5C mapping and helper functions from previous code snippet
import { PC_5C_QUESTIONS, flattenPCsToQueue, isMultiAnswer, DEFAULT_PCS, QuestionDef, AnswersShape } from "@/app/patient-history/patientHistoryHelpers";

export default function PatientHistoryPage() {
  const router = useRouter();

  /* --------------------------- */
  /* State */
  /* --------------------------- */
  const [selectedPCs, setSelectedPCs] = useState<string[]>([]);
  const [customPC, setCustomPC] = useState("");
  const [queue, setQueue] = useState<QuestionDef[] | null>(null);
  const [index, setIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<AnswersShape>({});
  const [tempInput, setTempInput] = useState("");
  const [multiTemp, setMultiTemp] = useState<Record<string, string[]>>({});

  /* --------------------------- */
  /* Handlers */
  /* --------------------------- */
  function createQueueAndStart(pcs: string[]) {
    const q = flattenPCsToQueue(pcs);
    setQueue(q);
    setIndex(0);
    setAnswers({});
    setTempInput("");
    setMultiTemp({});
  }

  function handleOptionChoose(option: string, q: QuestionDef) {
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
  }

  function handleSubmitFreeText(q: QuestionDef) {
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
  }

  function goNext() {
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
      // finished
      setIndex(queue.length);
    }
  }

  function goBack() {
    if (!queue) return;
    if (index > 0) setIndex((i) => i - 1);
    else setQueue(null);
  }

  /* --------------------------- */
  /* Redirect to Story Page */
  /* --------------------------- */
  function generateStory() {
    if (!queue) return;
    // Construct structured object grouped by PC
    const structured: Record<string, Record<string, any>> = {};
    queue.forEach((q) => {
      if (q.key.startsWith("__pc_header__")) {
        const pc = q.question.replace("Presenting Complaint: ", "").split(" — ")[0];
        structured[pc] = structured[pc] || {};
        if (answers[q.key]) structured[pc]["pc_note"] = answers[q.key];
        return;
      }
      // assign question answer
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
      if (val !== null && val !== undefined) structured[pc][q.key] = val;
    });

    // Pass structured data to story page via state
    router.push(`/patient-history/story?data=${encodeURIComponent(JSON.stringify(structured))}`);
  }

  /* --------------------------- */
  /* Render */
  /* --------------------------- */
  const currentQuestion = useMemo(() => {
    if (!queue) return null;
    if (index >= queue.length) return null;
    return queue[index];
  }, [queue, index]);

  return (
    <div className="min-h-screen p-6 bg-slate-50 max-w-4xl mx-auto space-y-6">
      {!queue && (
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-3">Select Presenting Complaints (PCs)</h2>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {DEFAULT_PCS.map((pc) => {
              const selected = selectedPCs.includes(pc);
              return (
                <button key={pc} onClick={() => {
                  if (selectedPCs.includes(pc)) setSelectedPCs(selectedPCs.filter(s => s !== pc));
                  else setSelectedPCs([...selectedPCs, pc]);
                }} className={`px-4 py-2 border rounded-md ${selected ? "bg-indigo-600 text-white" : "bg-white border-slate-300"}`}>
                  {pc}
                </button>
              );
            })}
          </div>
          <div className="flex gap-2 mb-4">
            <input
              value={customPC}
              onChange={(e) => setCustomPC(e.target.value)}
              placeholder="Add custom PC"
              className="border rounded-md px-3 py-2 flex-1"
            />
            <button onClick={() => {
              if (customPC.trim() && !selectedPCs.includes(customPC.trim())) {
                setSelectedPCs([...selectedPCs, customPC.trim()]);
              }
              setCustomPC("");
            }} className="bg-emerald-600 text-white px-4 py-2 rounded-md">Add</button>
          </div>
          <button disabled={selectedPCs.length === 0} onClick={() => createQueueAndStart(selectedPCs.length ? selectedPCs : ["General"])} className="bg-indigo-600 text-white px-4 py-2 rounded-md">Start 5C Questions</button>
        </section>
      )}

      {queue && currentQuestion && (
        <section className="bg-white rounded-lg shadow p-6 space-y-4">
          <div className="h-2 bg-slate-100 rounded overflow-hidden">
            <div style={{ width: `${Math.round((index / queue.length) * 100)}%` }} className="h-full bg-indigo-500 rounded"></div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.key}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              <h3 className="font-semibold text-lg">{currentQuestion.question}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentQuestion.options?.map(opt => (
                  <button key={opt} onClick={() => handleOptionChoose(opt, currentQuestion)} className={`px-4 py-2 border rounded-md ${isMultiAnswer(currentQuestion) && multiTemp[currentQuestion.key]?.includes(opt) ? "bg-amber-100" : "bg-white"}`}>
                    {opt}
                  </button>
                ))}
              </div>
              {currentQuestion.freeText && (
                <div className="flex gap-2">
                  <input value={tempInput} onChange={e => setTempInput(e.target.value)} placeholder="Type custom answer" className="flex-1 border rounded-md px-3 py-2" />
                  <button onClick={() => handleSubmitFreeText(currentQuestion)} className="bg-indigo-600 text-white px-4 py-2 rounded-md">Submit</button>
                  {isMultiAnswer(currentQuestion) && <button onClick={goNext} className="px-4 py-2 rounded-md bg-slate-100">Next</button>}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-4">
            <button onClick={goBack} className="px-3 py-2 rounded-md bg-slate-100">Back</button>
            {index === queue.length -1 && <button onClick={generateStory} className="px-4 py-2 rounded-md bg-emerald-600 text-white">Generate Clinical Story</button>}
          </div>
        </section>
      )}
    </div>
  );
}
