"use client";

import Link from "next/link";
import { Stethoscope, Brain, BookOpen } from "lucide-react";

export default function StudentDashboard() {
  const actions = [
    {
      title: "Clerk a Patient",
      description:
        "Practice full patient encounters: history taking, examination findings, & case summary generation.",
      href: "/student/clerk/departments", // <-- Create this page next
      icon: Stethoscope,
    },
    {
      title: "Test Your Knowledge",
      description:
        "Get a presenting complaint and try to determine the differential diagnosis before seeing the AI reasoning.",
      href: "/student/quiz", // <-- Create this page next
      icon: Brain,
    },
    {
      title: "Review Saved Cases",
      description:
        "View and learn from past cases, history stories, differential lists, and investigation plans.",
      href: "/dashboard/student/stories",
      icon: BookOpen,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-deep-navy">Student Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Choose an activity to continue your clinical reasoning journey.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {actions.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="group bg-white border rounded-xl p-6 shadow-sm hover:shadow-lg transition-all"
            >
              <div className="w-14 h-14 rounded-lg bg-eyrie-blue/10 text-eyrie-blue flex items-center justify-center mb-4">
                <item.icon className="w-7 h-7" />
              </div>

              <h3 className="text-xl font-semibold text-deep-navy group-hover:text-eyrie-blue transition-colors">
                {item.title}
              </h3>

              <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                {item.description}
              </p>

              <p className="text-eyrie-blue font-medium text-sm mt-4">
                Start →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
