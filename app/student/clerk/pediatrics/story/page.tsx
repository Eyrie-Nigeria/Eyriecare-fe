"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";

export default function PediatricsStoryPage() {
  const router = useRouter();
  const [story] = useState<string | null>(() => {
    // Initialize state from sessionStorage
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("pediatric_story");
    }
    return null;
  });

  useEffect(() => {
    // Redirect if no story found
    if (!story) {
      router.push("/student/clerk/pediatrics");
    }
  }, [story, router]);

  // ✅ Derive loading state from story instead of separate state
  const loading = story === null;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-xl p-8">
          <h1 className="text-3xl font-bold mb-6 text-blue-700 border-b pb-4">
            Pediatric Clinical Story
          </h1>

          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading story...</p>
            </div>
          )}

          {!loading && story && (
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-2xl font-bold text-blue-700 mt-6 mb-3">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-xl font-semibold text-gray-800 mt-5 mb-2">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-2">{children}</h3>
                  ),
                  p: ({ children }) => (
                    <p className="mb-3 leading-relaxed text-gray-800">{children}</p>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-blue-700">{children}</strong>
                  ),
                }}
              >
                {story}
              </ReactMarkdown>
            </div>
          )}

          {!loading && story && (
            <div className="mt-8 pt-6 border-t flex gap-3 justify-end">
              <button
                onClick={() => {
                  if (story) {
                    navigator.clipboard.writeText(story);
                    alert("Story copied to clipboard!");
                  }
                }}
                className="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                📋 Copy
              </button>

              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                🖨️ Print
              </button>

              <button
                onClick={() => router.push("/student/clerk/pediatrics")}
                className="px-5 py-2.5 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                ← New Case
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
