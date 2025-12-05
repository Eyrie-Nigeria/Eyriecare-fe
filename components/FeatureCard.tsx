// components/FeatureCard.tsx
import { LucideIcon } from "lucide-react";

export function FeatureCard({ icon: Icon, title, description }: { icon: LucideIcon; title: string; description: string }) {
  return (
    <div className="border rounded-xl p-6 hover:shadow-md transition">
      <Icon className="h-6 w-6 text-eyrie-blue mb-4" />
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}
