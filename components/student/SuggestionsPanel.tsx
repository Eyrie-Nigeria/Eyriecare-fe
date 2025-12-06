// components/student/SuggestionsPanel.tsx
"use client";

export default function SuggestionsPanel({ onAccept = (s:string)=>{}, onAppend = (s:string)=>{} }: { onAccept?: (s:string)=>void; onAppend?: (s:string)=>void }) {
  // curated suggestions oriented to history-taking
  const quick = [
    "Onset and duration of symptoms",
    "Character of pain (sharp/dull/colicky)",
    "Associated symptoms (fever, cough, vomiting)",
    "Previous similar episodes",
    "Medication history",
    "Allergies",
    "Social history (smoking, alcohol)",
    "Recent travel or TB exposure"
  ];

  return (
    <div className="bg-white border rounded p-3">
      <p className="text-xs text-gray-500 mb-2">Suggestions</p>
      <div className="flex flex-wrap gap-2">
        {quick.map((s, i) => (
          <div key={i} className="flex gap-1">
            <button onClick={() => onAppend(s)} className="text-xs px-2 py-1 bg-gray-100 rounded">Append</button>
            <button onClick={() => onAccept(s)} className="text-xs px-2 py-1 bg-eyrie-blue text-white rounded">{s}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
