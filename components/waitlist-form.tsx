"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, CheckCircle2 } from "lucide-react";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, role  }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Something went wrong");
      }

      setIsSuccess(true);
      setEmail("");
      setRole("");
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to join waitlist");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex flex-col  gap-6 flex-1">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 rounded-full h-12 px-6   border border-gray-300 focus:outline-none focus:ring-2 focus:ring-eyrie-blue/50 transition-all"
          disabled={isLoading || isSuccess}
        />
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          className="flex-1 rounded-full h-12 px-4 bg-white border border-gray-300 text-gray-700 
                    focus:outline-none focus:ring-2 focus:ring-eyrie-blue/50 transition-all"
          disabled={isLoading || isSuccess}
        >
          <option value="" disabled>
            Select your role
          </option>
          <option value="student">Student</option>
          <option value="doctor">Doctor</option>
          <option value="other">Other</option>
          </select>
        </div>

       
        <Button
          type="submit"
          disabled={isLoading || isSuccess}
          className="rounded-full h-12 px-8 bg-eyrie-blue hover:bg-eyrie-blue/90"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Joining...
            </>
          ) : isSuccess ? (
            <>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Joined!
            </>
          ) : (
            "Join Waitlist"
          )}
        </Button>
      </div>
      {error && (
        <p className="mt-2 text-sm text-error-red text-center">{error}</p>
      )}
      {isSuccess && (
        <p className="mt-2 text-sm text-success-mint text-center">
          Thanks! We&apos;ll be in touch soon.
        </p>
      )}
    </form>
  );
}


