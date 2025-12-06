// components/student/Header.tsx
"use client";

export default function Header() {
  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">EyrieCare — Student Dashboard</h1>
          <p className="text-sm text-gray-500">Practice clinical cases, generate histories and differentials</p>
        </div>
        <div className="text-sm text-gray-600">Signed in as <strong>student@example.com</strong></div>
      </div>
    </header>
  );
}
