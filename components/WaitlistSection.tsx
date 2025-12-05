// components/WaitlistSection.tsx
import WaitlistForm from "@/components/WaitlistForm";

export default function WaitlistSection() {
  return (
    <section id="waitlist" className="py-16">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-heading font-bold mb-3">Join early access</h2>
        <p className="text-gray-600 mb-6">Sign up for pilot invites, demo slots, and early-launch updates.</p>
        <WaitlistForm />
      </div>
    </section>
  );
}
