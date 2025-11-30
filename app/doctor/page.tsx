"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Stethoscope,
  FileText,
  BookOpen,
  User,
  Clock,
  TrendingUp,
  ArrowRight,
  Settings,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const recentPatients = [
    { id: 1, name: "John Doe", age: 45, lastVisit: "2 hours ago", complaint: "Chest pain" },
    { id: 2, name: "Jane Smith", age: 32, lastVisit: "1 day ago", complaint: "Fever & cough" },
    { id: 3, name: "Mike Johnson", age: 28, lastVisit: "3 days ago", complaint: "Abdominal pain" },
  ];
    
    
  useEffect(() => {
    const run = async () => {
      try {
        const response = await fetch("/api/auth/check");
        if (!response.ok) {
          router.push("/login?redirect=/doctor");
          return;
        }
        setCheckingAuth(false);
      } catch (error) {
        router.push("/login?redirect=/doctor");
      }
    };
    void run();
  }, [router]);


  return (
    <div className="min-h-screen bg-warm-white">
      {/* Top Navbar */}
      <nav className="bg-white border-b border-soft-grey sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/dashboard" className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-eyrie-blue flex items-center justify-center">
                  <span className="text-white font-bold text-lg">E</span>
                </div>
                <span className="font-heading font-semibold text-xl text-deep-navy">
                  EyrieCare
                </span>
              </Link>
              <div className="hidden md:flex items-center space-x-6">
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-eyrie-blue border-b-2 border-eyrie-blue pb-1"
                >
                  Dashboard
                </Link>
                <Link
                  href="/assessment/new"
                  className="text-sm font-medium text-gray-700 hover:text-eyrie-blue transition-colors"
                >
                  Patients
                </Link>
                <Link
                  href="/training"
                  className="text-sm font-medium text-gray-700 hover:text-eyrie-blue transition-colors"
                >
                  Training Mode
                </Link>
                <Link
                  href="/history"
                  className="text-sm font-medium text-gray-700 hover:text-eyrie-blue transition-colors"
                >
                  History
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              <div className="w-8 h-8 rounded-full bg-clinical-teal flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-deep-navy mb-2">
            Welcome back, Dr. Smith
          </h1>
          <p className="text-gray-600">Ready to start a new patient assessment?</p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Start New Assessment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-2 border-eyrie-blue hover:shadow-lg transition-all cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-12 h-12 rounded-lg bg-eyrie-blue/10 flex items-center justify-center">
                    <Stethoscope className="w-6 h-6 text-eyrie-blue" />
                  </div>
                  <CardTitle className="text-2xl">Start New Assessment</CardTitle>
                </div>
                <CardDescription>
                  Begin collecting patient history and generating clinical notes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/assessment/department">
                  <Button className="w-full bg-eyrie-blue hover:bg-eyrie-blue/90 h-12 text-lg">
                    Start Assessment
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* Continue Saved Assessment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="hover:shadow-lg transition-all h-full">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-12 h-12 rounded-lg bg-clinical-teal/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-clinical-teal" />
                  </div>
                  <CardTitle className="text-2xl">Continue Saved</CardTitle>
                </div>
                <CardDescription>
                  Resume an incomplete patient assessment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full h-12 text-lg">
                  View Saved Assessments
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Patients & Training Progress */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Recent Patients */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Recent Patients</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentPatients.map((patient) => (
                    <div
                      key={patient.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <div>
                        <p className="font-semibold text-deep-navy">{patient.name}</p>
                        <p className="text-sm text-gray-600">
                          {patient.age} years • {patient.complaint}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{patient.lastVisit}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </div>
                  ))}
                </div>
                <Link href="/history">
                  <Button variant="ghost" className="w-full mt-4">
                    View All History
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* Training Mode Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>Training Mode Progress</span>
                </CardTitle>
                <CardDescription>Your learning journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Overall Progress</span>
                      <span className="font-semibold">68%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-clinical-teal h-3 rounded-full"
                        style={{ width: "68%" }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-sky-mist/50 rounded-lg">
                      <p className="text-2xl font-bold text-eyrie-blue">12</p>
                      <p className="text-xs text-gray-600">Cases Completed</p>
                    </div>
                    <div className="p-3 bg-sky-mist/50 rounded-lg">
                      <p className="text-2xl font-bold text-clinical-teal">1,240</p>
                      <p className="text-xs text-gray-600">XP Points</p>
                    </div>
                  </div>
                  <Link href="/training">
                    <Button className="w-full bg-clinical-teal hover:bg-clinical-teal/90">
                      Go to Training Mode
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

