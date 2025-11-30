import { Card, CardContent } from "@/components/ui/card";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  organization?: string;
  className?: string;
}

export function TestimonialCard({
  quote,
  author,
  role,
  organization,
  className,
}: TestimonialCardProps) {
  return (
    <Card className={className} style={{ borderColor: 'var(--color-soft-grey)' }}>
      <CardContent className="pt-6">
        <p className="text-gray-700 mb-4 leading-relaxed italic">&ldquo;{quote}&rdquo;</p>
        <div>
          <p className="font-semibold text-deep-navy">{author}</p>
          <p className="text-sm text-gray-600">
            {role}
            {organization && `, ${organization}`}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

