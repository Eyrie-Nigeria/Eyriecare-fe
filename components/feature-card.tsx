import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({ icon: Icon, title, description, className }: FeatureCardProps) {
  return (
    <Card className={`hover:shadow-lg transition-all duration-300 ${className}`} style={{ borderColor: 'var(--color-soft-grey)' }}>
      <CardHeader>
        <div className="w-12 h-12 rounded-lg bg-sky-mist flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-clinical-teal" />
        </div>
        <CardTitle className="text-xl font-heading">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}

