// components/Features.tsx
import { FeatureCard } from "./FeatureCard";
import { FileText, Brain, Users } from "lucide-react";

export default function Features() {
  const features = [
    { icon: FileText, title: "Automated Notes", description: "Generate structured SOAP notes from patient encounters in one click." },
    { icon: Brain, title: "Trusted Reasoning", description: "Ranked differential diagnoses with short evidence-backed explanations." },
    { icon: Users, title: "Student Training", description: "Simulated cases and instant feedback to accelerate clinical learning." },
  ];

  return (
    <section id="features" className="py-12">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-heading font-bold mb-4">Do three things extremely well</h2>
        <p className="text-gray-600 mb-8">Fast intake, reliable reasoning, and instant documentation.</p>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f) => (
            <FeatureCard key={f.title} icon={f.icon} title={f.title} description={f.description} />
          ))}
        </div>
      </div>
    </section>
  );
}
