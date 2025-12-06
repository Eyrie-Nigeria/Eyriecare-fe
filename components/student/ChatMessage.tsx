// components/student/ChatMessage.tsx
"use client";

export default function ChatMessage({ role, text, time }: { role: "student" | "ai"; text: string; time?: string }) {
  const isAi = role === "ai";
  return (
    <div className={`mb-2 flex ${isAi ? "justify-start" : "justify-end"}`}>
      <div className={`max-w-[80%] p-2 rounded-lg ${isAi ? "bg-gray-100 text-gray-800" : "bg-eyrie-blue text-white"}`}>
        <div className="text-sm">{text}</div>
        {time && <div className="text-xs text-gray-400 mt-1">{new Date(time).toLocaleTimeString()}</div>}
      </div>
    </div>
  );
}
