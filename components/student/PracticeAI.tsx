// components/student/PracticeAI.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import StoriesList from "./StoriesList";
import SuggestionsPanel from "./SuggestionsPanel";

/**
 * PracticeAI
 * - chat-like UI
 * - suggestions that the user can click to append to the current input
 * - generate history story & examination story from collected data
 * - show differential suggestions & recommended investigations (demo logic)
 *
 * IMPORTANT: This file uses a mock "AI engine" implemented below.
 * Replace mock functions with real LLM/clinical-model API calls in production.
 */

type Message = { id: string; role: "student" | "ai"; text: string; time?: string };

export default function PracticeAI() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "m1", role: "ai", text: "Welcome — start by asking the patient about their main complaint or tap a suggestion.", time: new Date().toISOString() },
  ]);
  const [input, setInput] = useState("");
  const [historyData, setHistoryData] = useState<string[]>([]); // structured collected questions/answers
  const [examFindings, setExamFindings] = useState<string[]>([]);
  const [savedStories, setSavedStories] = useState<{ id: string; title: string; history: string; exam: string }[]>([]);
  const [differentials, setDifferentials] = useState<string[]>([]);
  const [investigations, setInvestigations] = useState<string[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // --- Mock AI helpers (replace with real API calls)
  const mockGenerateHistoryStory = async (collected: string[]) => {
    // Simple join + a template — replace with an LLM prompt that synthesizes history.
    await delay(400);
    return `HISTORY: ${collected.join(" · ")}`;
  };

  const mockGenerateExamStory = async (exam: string[]) => {
    await delay(300);
    return `EXAM: ${exam.join(" · ") || "No abnormal findings recorded."}`;
  };

  const mockGetDifferentials = async (historyText: string, examText: string) => {
    // Simple keyword-based demo. Replace with model call.
    await delay(500);
    const txt = (historyText + " " + examText).toLowerCase();
    const picks: string[] = [];
    if (txt.includes("fever") || txt.includes("cough")) {
      picks.push("Pneumonia");
      picks.push("TB");
      picks.push("Upper respiratory infection");
    }
    if (txt.includes("abdominal") || txt.includes("pain")) {
      picks.push("Appendicitis");
      picks.push("Peptic ulcer disease");
      picks.push("Gastroenteritis");
    }
    if (picks.length === 0) {
      picks.push("Viral illness", "Anxiety-related somatic symptoms");
    }
    return picks;
  };

  const mockRecommendInvestigations = async (differentials: string[]) => {
    await delay(300);
    const mapping: Record<string, string[]> = {
      Pneumonia: ["CXR", "CBC", "Pulse oximetry"],
      TB: ["Sputum GeneXpert", "CXR"],
      Appendicitis: ["Abdominal ultrasound", "CBC", "CRP"],
      "Viral illness": ["Symptomatic care"],
      "Upper respiratory infection": ["Rapid antigen test", "Symptomatic care"],
      "Gastroenteritis": ["Stool MCS", "Electrolytes"],
    };
    const out: string[] = [];
    differentials.forEach((d) => {
      const r = mapping[d];
      if (r) out.push(...r);
    });
    // unique
    return Array.from(new Set(out)).slice(0, 6);
  };

  // small delay util
  function delay(ms = 300) {
    return new Promise((res) => setTimeout(res, ms));
  }

  // --- handlers
  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const m: Message = { id: Math.random().toString(36).slice(2), role: "student", text: text.trim(), time: new Date().toISOString() };
    setMessages((s) => [...s, m]);
    setInput("");
    setIsThinking(true);

    // Simulate AI reply (echo + guidance)
    await delay(300);
    const aiReply: Message = { id: Math.random().toString(36).slice(2), role: "ai", text: `Noted: "${text.trim()}". You can add this to history or ask follow-up.` , time: new Date().toISOString() };
    setMessages((s) => [...s, aiReply]);
    setIsThinking(false);
    inputRef.current?.focus();
  };

  // Called when user accepts a suggestion (adds to input or directly to history)
  const acceptSuggestion = (suggestion: string, opts: { appendToInput?: boolean; addToHistory?: boolean } = {}) => {
    if (opts.appendToInput) {
      setInput((i) => (i ? `${i} ${suggestion}` : suggestion));
      inputRef.current?.focus();
      return;
    }
    if (opts.addToHistory) {
      setHistoryData((h) => [...h, suggestion]);
      // add message for audit
      setMessages((s) => [...s, { id: Math.random().toString(36).slice(2), role: "student", text: suggestion, time: new Date().toISOString() }]);
    }
  };

  // Add current input to history
  const addInputToHistory = () => {
    if (!input.trim()) return;
    setHistoryData((h) => [...h, input.trim()]);
    setMessages((s) => [...s, { id: Math.random().toString(36).slice(2), role: "student", text: input.trim(), time: new Date().toISOString() }]);
    setInput("");
  };

  // Add exam finding
  const addExamFinding = (finding: string) => {
    if (!finding.trim()) return;
    setExamFindings((e) => [...e, finding.trim()]);
  };

  // Generate stories (history + exam) and populate differentials/investigations
  const synthesize = async () => {
    setIsThinking(true);
    const historyStory = await mockGenerateHistoryStory(historyData);
    const examStory = await mockGenerateExamStory(examFindings);
    // Save to stories
    const id = Math.random().toString(36).slice(2);
    setSavedStories((s) => [{ id, title: `Case ${s.length + 1}`, history: historyStory, exam: examStory }, ...s]);

    // obtain differentials
    const diffs = await mockGetDifferentials(historyStory, examStory);
    setDifferentials(diffs);
    const inv = await mockRecommendInvestigations(diffs);
    setInvestigations(inv);
    // push AI message summarizing
    setMessages((s) => [...s, { id: Math.random().toString(36).slice(2), role: "ai", text: `Generated history and exam. Suggested differentials: ${diffs.slice(0,3).join(", ")}.`, time: new Date().toISOString() }]);
    setIsThinking(false);
  };

  const clearAll = () => {
    setHistoryData([]);
    setExamFindings([]);
    setDifferentials([]);
    setInvestigations([]);
  };

  // keyboard send
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Chat & suggestions */}
        <div className="col-span-2 bg-white rounded-xl border p-4 shadow-sm">
          <h3 className="font-semibold mb-3">AI Practice — History taking</h3>

          <div className="space-y-3">
            <div className="border rounded-md h-64 overflow-y-auto p-3 bg-gray-50">
              {messages.map((m) => (
                <ChatMessage key={m.id} role={m.role} text={m.text} time={m.time} />
              ))}
              {isThinking && <div className="text-sm text-gray-400 italic">AI thinking...</div>}
            </div>

            <SuggestionsPanel onAccept={(s) => acceptSuggestion(s, { addToHistory: true })} onAppend={(s) => acceptSuggestion(s, { appendToInput: true })} />

            <div className="flex gap-3">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Type a question or observation (Enter to send)"
                className="flex-1 h-12 rounded-full border px-4"
              />
              <button onClick={() => sendMessage(input)} className="px-4 rounded-full bg-eyrie-blue text-white">Send</button>
              <button onClick={addInputToHistory} className="px-3 rounded-full border">Add to history</button>
            </div>
          </div>
        </div>

        {/* Right: Collected history/exam, synthesize button, results */}
        <aside className="col-span-1 space-y-4">
          <div className="bg-white rounded-xl border p-4 shadow-sm">
            <h4 className="font-semibold mb-2">Collected History</h4>
            {historyData.length === 0 ? <p className="text-sm text-gray-400">No history items yet.</p> : (
              <ul className="text-sm space-y-1">
                {historyData.map((h, i) => <li key={i} className="px-2 py-1 bg-gray-50 rounded">{h}</li>)}
              </ul>
            )}
            <div className="mt-3 flex gap-2">
              <button onClick={synthesize} className="flex-1 px-3 py-2 rounded-full bg-eyrie-blue text-white">Generate Story & Differentials</button>
              <button onClick={clearAll} className="px-3 py-2 rounded-full border">Clear</button>
            </div>
          </div>

          <div className="bg-white rounded-xl border p-4 shadow-sm">
            <h4 className="font-semibold mb-2">Examination</h4>
            <form onSubmit={(e)=>{ e.preventDefault(); const fd = new FormData(e.currentTarget as HTMLFormElement); const val = String(fd.get("finding")||""); addExamFinding(val); (e.currentTarget as HTMLFormElement).reset(); }}>
              <input name="finding" placeholder="Add exam finding (e.g., reduced air entry RLL)" className="w-full h-10 rounded px-3 border mb-2" />
              <div className="flex gap-2">
                <button type="submit" className="flex-1 px-3 py-2 rounded-full bg-eyrie-blue text-white">Add</button>
                <button type="button" onClick={async ()=> { const auto = "Chest: reduced air entry, crackles; Vitals: T37.9, RR24"; addExamFinding(auto);} } className="px-3 py-2 rounded-full border">Quick add</button>
              </div>
            </form>

            {examFindings.length === 0 ? <p className="text-sm text-gray-400 mt-2">No findings yet.</p> : (
              <ul className="mt-2 space-y-1 text-sm">
                {examFindings.map((f, i) => <li key={i} className="px-2 py-1 bg-gray-50 rounded">{f}</li>)}
              </ul>
            )}
          </div>

          <div className="bg-white rounded-xl border p-4 shadow-sm">
            <h4 className="font-semibold mb-2">Differentials</h4>
            {differentials.length === 0 ? <p className="text-sm text-gray-400">No differentials yet — generate a story first.</p> : (
              <ol className="list-decimal ml-4 text-sm space-y-1">
                {differentials.map((d,i)=> <li key={i}>{d}</li>)}
              </ol>
            )}

            <h5 className="font-semibold mt-3">Recommended investigations</h5>
            {investigations.length === 0 ? <p className="text-sm text-gray-400">—</p> : (
              <ul className="text-sm mt-1 space-y-1">
                {investigations.map((inv,i)=> <li key={i} className="px-2 py-1 bg-gray-50 rounded">{inv}</li>)}
              </ul>
            )}
          </div>
        </aside>
      </div>

      {/* Bottom: Saved stories */}
      <div className="bg-white rounded-xl border p-4 shadow-sm">
        <h3 className="font-semibold mb-3">Saved Stories</h3>
        <StoriesList stories={savedStories} onLoad={(s) => {
          // when a story is loaded, populate UI
          setHistoryData([s.history]);
          setExamFindings([s.exam]);
        }} />
      </div>
    </div>
  );
}
