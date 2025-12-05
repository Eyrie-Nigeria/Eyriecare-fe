// components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button"; // adjust path if your button is elsewhere

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${isScrolled ? "bg-white/90 backdrop-blur-sm shadow-sm" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-eyrie-blue flex items-center justify-center">
            <span className="text-white font-bold">E</span>
          </div>
          <span className="font-semibold text-lg text-deep-navy">EyrieCare</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link href="/tools" className="text-gray-700 hover:text-eyrie-blue text-sm">Tools</Link>
          <Link href="#features" className="text-gray-700 hover:text-eyrie-blue text-sm">Features</Link>

          <Button
            className="rounded-full bg-eyrie-blue text-white"
            onClick={() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })}
          >
            Join Waitlist
          </Button>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Open menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-3 space-y-3">
            <Link href="/tools" className="block text-sm" onClick={() => setOpen(false)}>Tools</Link>
            <Link href="#features" className="block text-sm" onClick={() => setOpen(false)}>Features</Link>

            <Button
              className="w-full rounded-full bg-eyrie-blue text-white"
              onClick={() => { setOpen(false); document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" }); }}
            >
              Join Waitlist
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
