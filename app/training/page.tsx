"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Trophy,
  TrendingUp,
  Award,
  Play,
  Heart,
  Wind,
  Baby,
  Activity,
} from "lucide-react";

const modules = [
  { id: "cardio", name: "Cardiology", icon: Heart, cases: 12, completed: 8, color: "bg-red-500" },
  {
    id: "respiratory",
    name: "Respiratory",
    icon: Wind,
    cases: 15,
    completed: 10,
    color: "bg-blue-500",
  },
  { id: "obgyn", name: "OBGYN", icon: Baby, cases: 10, completed: 5, color: "bg-pink-500" },
  {
    id: "surgery",
    name: "Surgery",
    icon: Activity,
    cases: 18,
    completed: 12,
    color: "bg-green-500",
  },
];

export default function TrainingPage() {
  return (
    <div className="min-h-screen bg-warm-white">
      {/* Navbar */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-eyrie-blue flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="font-heading font-semibold text-xl text-deep-navy">
                EyrieCare
              </span>
            </Link>
            <Link href="/dashboard">
              <Button variant="ghost">Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-deep-navy mb-2">
            Training Mode
          </h1>
          <p className="text-gray-600">Practice clinical reasoning with simulated cases</p>
        </div>

        {/* Progress Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Cases</p>
                  <p className="text-3xl font-bold text-deep-navy">45</p>
                </div>
                <BookOpen className="w-12 h-12 text-eyrie-blue opacity-20" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">XP Points</p>
                  <p className="text-3xl font-bold text-clinical-teal">1,240</p>
                </div>
                <Trophy className="w-12 h-12 text-clinical-teal opacity-20" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Average Score</p>
                  <p className="text-3xl font-bold text-success-mint">82%</p>
                </div>
                <TrendingUp className="w-12 h-12 text-success-mint opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Modules */}
        <div className="mb-8">
          <h2 className="text-2xl font-heading font-semibold text-deep-navy mb-4">Modules</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {modules.map((module, index) => {
              const Icon = module.icon;
              const progress = (module.completed / module.cases) * 100;
              return (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-all cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 rounded-lg ${module.color} flex items-center justify-center`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <CardTitle>{module.name}</CardTitle>
                            <p className="text-sm text-gray-600">
                              {module.completed} of {module.cases} cases completed
                            </p>
                          </div>
                        </div>
                        <Link href={`/training/${module.id}`}>
                          <Button>
                            <Play className="w-4 h-4 mr-2" />
                            Start
                          </Button>
                        </Link>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span className="font-semibold">{Math.round(progress)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`${module.color} h-2 rounded-full transition-all`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { rank: 1, name: "You", xp: 1240, badge: "🥇" },
                { rank: 2, name: "Dr. Sarah Chen", xp: 1180, badge: "🥈" },
                { rank: 3, name: "Dr. Michael Park", xp: 1120, badge: "🥉" },
                { rank: 4, name: "Dr. Emily Johnson", xp: 980 },
                { rank: 5, name: "Dr. James Wilson", xp: 920 },
              ].map((entry) => (
                <div
                  key={entry.rank}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    entry.rank === 1 ? "bg-clinical-teal/10 border-2 border-clinical-teal" : "bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg font-bold w-8">{entry.badge || entry.rank}</span>
                    <span className="font-semibold">{entry.name}</span>
                  </div>
                  <span className="text-sm text-gray-600">{entry.xp} XP</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

