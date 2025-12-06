// components/student/StoriesList.tsx
"use client";

export default function StoriesList({ stories = [], onLoad = (s:any) => {} }: { stories: { id: string; title: string; history: string; exam: string }[]; onLoad?: (s:any)=>void }) {
  if (stories.length === 0) return <p className="text-sm text-gray-500">No stories saved yet.</p>;

  return (
    <div className="grid md:grid-cols-3 gap-3">
      {stories.map((s) => (
        <div key={s.id} className="border rounded p-3 bg-gray-50">
          <div className="flex items-center justify-between">
            <strong>{s.title}</strong>
            <button onClick={() => navigator.clipboard?.writeText(`${s.history}\n\n${s.exam}`)} className="text-xs text-eyrie-blue">Copy</button>
          </div>
          <p className="text-xs text-gray-600 mt-2 line-clamp-4">{s.history}</p>
          <p className="text-xs text-gray-500 mt-2">{s.exam}</p>
          <div className="mt-2 flex gap-2">
            <button onClick={() => onLoad(s)} className="text-sm px-2 py-1 rounded-full border">Load</button>
            <a href={`data:text/plain;charset=utf-8,${encodeURIComponent(`${s.title}\n\nHistory:\n${s.history}\n\nExam:\n${s.exam}`)}`} download={`${s.title}.txt`} className="text-sm px-2 py-1 rounded-full border">Download</a>
          </div>
        </div>
      ))}
    </div>
  );
}
