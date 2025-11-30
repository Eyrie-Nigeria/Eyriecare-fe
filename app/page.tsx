"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { CTAButton } from "@/components/cta-button";
import { FeatureCard } from "@/components/feature-card";
import { Footer } from "@/components/footer";
import { WaitlistForm } from "@/components/waitlist-form";
import { ProductScreenshot } from "@/components/product-screenshot";
import {
  Stethoscope,
  FileText,
  Search,
  Brain,
  GraduationCap,
  Shield,
  Clock,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Users,
  BookOpen,
  Zap,
} from "lucide-react";

export default function Home() {
  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-warm-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-sky-mist/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-clinical-teal/10 text-clinical-teal text-sm font-medium mb-6"
              >
                <Sparkles className="w-4 h-4" />
                <span>AI-Powered Clinical Intelligence</span>
              </motion.div>

              <h1 className="text-5xl md:text-6xl font-heading font-bold text-deep-navy mb-6 leading-tight">
                AI Clinical Reasoning + Documentation for the Future of Care.
              </h1>

              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                EyrieCare helps clinicians and medical students collect histories, generate structured notes, and reason through investigations and differentials — with medical-grade precision.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <CTAButton onClick={scrollToWaitlist} variant="primary">
                  Join Waitlist
                </CTAButton>
                <CTAButton onClick={scrollToWaitlist} variant="secondary">
                  Request Demo
                </CTAButton>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              <ProductScreenshot
                title="Clinical Documentation Interface"
                description="AI-assisted SOAP note generation and clinical reasoning"
              />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-6 -left-6 w-24 h-24 bg-clinical-teal/20 rounded-full blur-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-deep-navy mb-4">
              The Problem We&apos;re Solving
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Clinicians and medical students face overwhelming documentation burdens and limited learning support.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: "Documentation Fatigue",
                description: "Clinicians spend 60% of their time on administrative tasks, leading to burnout and reduced patient interaction time.",
              },
              {
                icon: BookOpen,
                title: "Slow Learning Curve",
                description: "Medical students lack structured feedback and real-time guidance during clinical reasoning, slowing their development.",
              },
              {
                icon: Brain,
                title: "Cognitive Overload",
                description: "Managing patient histories, differentials, and investigations manually increases errors and delays critical decisions.",
              },
            ].map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="text-center p-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center">
                    <problem.icon className="w-8 h-8 text-red-500" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-deep-navy mb-3">
                    {problem.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-sky-mist/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-deep-navy mb-4">
              How EyrieCare Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A seamless workflow from patient interaction to structured documentation and clinical reasoning.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-6 items-center relative">
            {[
              { step: "1", title: "Collect History", icon: Users },
              { step: "2", title: "Structure Notes", icon: FileText },
              { step: "3", title: "Suggest Investigations", icon: Search },
              { step: "4", title: "Rank Differential", icon: TrendingUp },
              { step: "5", title: "Sync to EHR", icon: Shield },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center relative"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-eyrie-blue text-white flex items-center justify-center text-2xl font-bold">
                  {item.step}
                </div>
                <item.icon className="w-8 h-8 mx-auto mb-3 text-clinical-teal" />
                <h3 className="font-semibold text-deep-navy mb-2">{item.title}</h3>
                {index < 4 && (
                  <ArrowRight className="hidden md:block absolute top-10 right-0 translate-x-1/2 w-6 h-6 text-gray-400" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-deep-navy mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need for intelligent clinical documentation and reasoning.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Stethoscope,
                title: "AI-Powered History Taking",
                description: "Intelligent conversation flow that captures comprehensive patient histories with natural language understanding and medical context awareness.",
              },
              {
                icon: FileText,
                title: "Automated SOAP Notes",
                description: "Generate structured, clinically accurate SOAP notes automatically from patient interactions, saving hours of documentation time.",
              },
              {
                icon: Search,
                title: "Investigation Recommendations",
                description: "AI suggests relevant diagnostic tests and investigations based on clinical presentation, evidence-based guidelines, and differential considerations.",
              },
              {
                icon: Brain,
                title: "Differential Diagnosis Engine",
                description: "Ranked differential diagnoses with probability scores, clinical reasoning explanations, and supporting evidence for each consideration.",
              },
              {
                icon: GraduationCap,
                title: "Student Case Simulation",
                description: "Practice with simulated clinical cases, receive real-time feedback on reasoning, and learn structured clinical decision-making.",
              },
              {
                icon: Shield,
                title: "Secure EHR Sync",
                description: "Seamlessly sync structured notes and clinical data to your personal digital health record with enterprise-grade security and compliance.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Screenshots */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-sky-mist/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-deep-navy mb-4">
              See EyrieCare in Action
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of clinical documentation and reasoning.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <ProductScreenshot
              title="Clinical Documentation Dashboard"
              description="Real-time SOAP note generation with AI assistance"
            />
            <ProductScreenshot
              title="Differential Diagnosis Interface"
              description="Ranked differentials with clinical reasoning explanations"
            />
          </div>
        </div>
      </section>

      {/* For Clinicians Section */}
      <section id="for-clinicians" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-deep-navy mb-6">
                Built for Clinicians
              </h2>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Reduce administrative burden and focus on what matters most: patient care.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: Zap,
                    title: "Save 60% Admin Time",
                    description: "Automated documentation frees up hours each day, allowing you to see more patients and reduce burnout.",
                  },
                  {
                    icon: Brain,
                    title: "AI Decision Support",
                    description: "Evidence-based recommendations for investigations and differentials, enhancing your clinical judgment without replacing it.",
                  },
                  {
                    icon: Shield,
                    title: "Medical-Grade Accuracy",
                    description: "Built with clinical validation and continuous learning from medical literature to ensure precision and safety.",
                  },
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-12 h-12 rounded-lg bg-clinical-teal/10 flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-6 h-6 text-clinical-teal" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-deep-navy mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <ProductScreenshot
                title="Clinician Dashboard"
                description="Streamlined interface for efficient clinical workflows"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* For Medical Students Section */}
      <section id="for-students" className="py-20 px-4 sm:px-6 lg:px-8 bg-sky-mist/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <ProductScreenshot
                title="Student Practice Mode"
                description="Interactive case simulations with real-time feedback"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-deep-navy mb-6">
                Learn Faster, Think Deeper
              </h2>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Master clinical reasoning with AI-powered guidance and structured feedback.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: BookOpen,
                    title: "Practice Cases",
                    description: "Access a library of simulated clinical cases covering diverse specialties and complexity levels.",
                  },
                  {
                    icon: CheckCircle2,
                    title: "Real-Time Correction",
                    description: "Receive immediate feedback on your reasoning, highlighting strengths and areas for improvement.",
                  },
                  {
                    icon: Brain,
                    title: "Structured Clinical Reasoning",
                    description: "Learn evidence-based approaches to differential diagnosis, investigation selection, and treatment planning.",
                  },
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-12 h-12 rounded-lg bg-eyrie-blue/10 flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-6 h-6 text-eyrie-blue" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-deep-navy mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Roadmap / Vision Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-deep-navy mb-4">
              Our Vision
            </h2>
            <p className="text-xl text-gray-600">
              Building the future of clinical intelligence, one integration at a time.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-sky-mist/50 rounded-xl p-8 border border-soft-grey"
          >
            <ul className="space-y-4">
              {[
                "Epic, Cerner, and Allscripts EHR integrations",
                "Multi-language support for global healthcare",
                "Advanced AI models trained on latest medical literature",
                "Specialty-specific clinical reasoning modules",
                "Team collaboration and case sharing features",
                "Mobile app for on-the-go documentation",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className="flex items-start space-x-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-clinical-teal mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-sky-mist/50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-deep-navy mb-4">
              Join the Future of Clinical Care
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Be among the first to experience AI-powered clinical reasoning and documentation. Join our waitlist for early access.
            </p>
            <WaitlistForm />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
