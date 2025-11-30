"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm border-b"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-eyrie-blue flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="font-heading font-semibold text-xl text-deep-navy">
              EyrieCare
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#features"
              className="text-sm font-medium text-gray-700 hover:text-eyrie-blue transition-colors"
            >
              Features
            </Link>
            <Link
              href="#for-clinicians"
              className="text-sm font-medium text-gray-700 hover:text-eyrie-blue transition-colors"
            >
              For Clinicians
            </Link>
            <Link
              href="#for-students"
              className="text-sm font-medium text-gray-700 hover:text-eyrie-blue transition-colors"
            >
              For Students
            </Link>
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => {
                document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Join Waitlist
            </Button>
            <Link href="/login?redirect=/admin">
              <Button className="rounded-full bg-eyrie-blue hover:bg-eyrie-blue/90">
                Login
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link
              href="#features"
              className="block py-2 text-sm font-medium text-gray-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#for-clinicians"
              className="block py-2 text-sm font-medium text-gray-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              For Clinicians
            </Link>
            <Link
              href="#for-students"
              className="block py-2 text-sm font-medium text-gray-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              For Students
            </Link>
            <div className="pt-4 space-y-2">
              <Button
                variant="outline"
                className="w-full rounded-full"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Join Waitlist
              </Button>
              <Link href="/login?redirect=/admin" className="w-full">
                <Button
                  className="w-full rounded-full bg-eyrie-blue hover:bg-eyrie-blue/90"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

