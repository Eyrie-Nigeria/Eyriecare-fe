"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Question = {
  key: string;
  question: string;
  options: string[];
};

const questions: Question[] = [
  { key: "pc", question: "What are the patient's main complaints?", options: ["Fever", "Cough", "Chest pain", "Headache", "Abdominal pain"] },
  { key: "hpc", question: "For each complaint, provide duration:", options: [] },
  { key: "pm", question: "Past medical history:", options: ["Diabetes", "Hypertension", "Asthma", "None"] },
  { key: "family", question: "Family history:", options: ["Diabetes", "Hypertension", "Heart disease", "None"] },
  { key: "social", question: "Social history:", options: ["Smoker", "Non-smoker", "Alcohol use", "None"] },
];

export default function StoryPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const [story, setStory] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");

  const currentQuestion = questions[currentIndex];

  const handleOptionClick = (option: string) => {
    const prev = answers[currentQuestion.key] || [];
    setAnswers({ ...answers, [currentQuestion.key]: [...prev, option] });
  };

  const handleNext = () => {
    if (inputValue.trim()) {
      const prev = answers[currentQuestion.key] || [];
      setAnswers({ ...answers, [currentQuestion.key]: [...prev, inputValue.trim()] });
      setInputValue("");
    }
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      submitStory();
    }
  };

  const submitStory = async () => {
    const response = await fetch("/api/generate-story", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ structured: answers }),
    });
    const data = await response.json();
    setStory(data.story);
  };

  if (story) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Patient Clinical Story</h1>
        <div className="whitespace-pre-wrap text-lg leading-relaxed bg-white p-4 shadow rounded">{story}</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-6 rounded shadow mb-4"
        >
          <h2 className="text-xl font-semibold mb-4">{currentQuestion.question}</h2>

          <div className="flex flex-wrap gap-2 mb-4">
            {currentQuestion.options.map((opt) => (
              <button
                key={opt}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => handleOptionClick(opt)}
              >
                {opt}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Other..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="border p-2 rounded w-full mb-4"
          />

          <button
            onClick={handleNext}
            className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            {currentIndex + 1 < questions.length ? "Next" : "Submit"}
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
