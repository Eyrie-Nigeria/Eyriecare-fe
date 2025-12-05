// components/WaitlistForm.tsx
"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Loader2, CheckCircle2 } from "lucide-react";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setDone(true);
      setEmail(""); setRole("");
      setTimeout(() => setDone(false), 4000);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto space-y-3">
      <Input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} className="h-12 rounded-full" />
      <select required value={role} onChange={(e) => setRole(e.target.value)} className="h-12 rounded-full border px-4 text-gray-700">
        <option value="">Your role</option>
        <option value="doctor">Doctor</option>
        <option value="student">Student</option>
        <option value="other">Other</option>
      </select>

      {err && <p className="text-error-red text-sm">{err}</p>}

      <Button disabled={loading || done} className="w-full h-12 rounded-full bg-eyrie-blue text-white">
        {loading ? <Loader2 className="animate-spin h-4 w-4" /> : done ? <CheckCircle2 className="h-4 w-4" /> : "Join Waitlist"}
      </Button>
    </form>
  );
}
