// components/student/Sidebar.tsx
"use client";

import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
  const [selected, setSelected] = useState("practice");

  const nav = [
    { id: "practice", label: "AI Practice" },
    { id: "cases", label: "Case Library" },
    { id: "progress", label: "Progress" },
    { id: "stories", label: "Saved Stories" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <div className="sticky top-20">
      <div className="bg-white border rounded-xl p-4 shadow-sm space-y-4">
        <h3 className="font-semibold text-lg">Student</h3>
        <p className="text-sm text-gray-500">Practice clinical reasoning</p>

        <nav className="mt-4 space-y-1">
          {nav.map((n) => (
            <button
              key={n.id}
              onClick={() => setSelected(n.id)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                selected === n.id ? "bg-eyrie-blue/10 text-eyrie-blue font-medium" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {n.label}
            </button>
          ))}
        </nav>

        <div className="pt-4 border-t">
          <p className="text-xs text-gray-500">Quick actions</p>
          <Link href="/dashboard/student" className="block mt-2 text-sm text-eyrie-blue">
            Start new case
          </Link>
        </div>
      </div>
    </div>
  );
}
