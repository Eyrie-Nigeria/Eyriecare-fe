"use client";

import { useState, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

// ✅ Properly typed input components
type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Input = (props: InputProps) => (
  <input
    {...props}
    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
  />
);

const TextArea = (props: TextAreaProps) => (
  <textarea
    {...props}
    className="w-full border border-gray-300 rounded-lg px-4 py-2 min-h-[80px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
  />
);

// ✅ Define the data structure
interface PediatricData {
  child_name?: string;
  age?: string;
  gender?: string;
  caregiver?: string;
  relationship?: string;
  pcs?: string;
  pc_duration?: string;
  hpc_character?: string;
  hpc_course?: string;
  hpc_chronology?: string;
  hpc_factors?: string;
  hpc_assoc?: string;
  antenatal?: string;
  delivery?: string;
  birth_weight?: string;
  cried?: string;
  neonatal?: string;
  immunization_status?: string;
  immunization_missed?: string;
  feeding_type?: string;
  complementary?: string;
  diet?: string;
  gross_motor?: string;
  fine_motor?: string;
  language?: string;
  social?: string;
  regression?: string;
  pmh?: string;
  drugs?: string;
  surgery?: string;
  family_history?: string;
  social_history?: string;
  ros_general?: string;
  ros_resp?: string;
  ros_gi?: string;
  ros_neuro?: string;
}

type StepType = 
  | "biodata"
  | "presenting"
  | "hpc"
  | "birth"
  | "immunization"
  | "nutrition"
  | "development"
  | "pmh"
  | "family"
  | "ros"
  | "summary";

export default function PediatricsClerkPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const steps: StepType[] = [
    "biodata",
    "presenting",
    "hpc",
    "birth",
    "immunization",
    "nutrition",
    "development",
    "pmh",
    "family",
    "ros",
    "summary",
  ];

  const [i, setI] = useState(0);
  const [data, setData] = useState<PediatricData>({});
  const step = steps[i];

  const update = (key: keyof PediatricData, v: string) =>
    setData((prev) => ({ ...prev, [key]: v }));

  const next = () => i < steps.length - 1 && setI(i + 1);
  const back = () => i > 0 && setI(i - 1);

  const finish = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/genStory/peds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ structured: data }),
      });

      if (!res.ok) {
        throw new Error("Failed to generate story");
      }

      const resData = await res.json() as { story: string };
      
      // Store in sessionStorage
      sessionStorage.setItem("pediatric_story", resData.story);
      
      // Navigate without data in URL
      router.push("/student/clerk/pediatrics/story");
    } catch (err) {
      console.error("Error generating story:", err);
      alert("Failed to generate story. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">
          Pediatrics Clerkship
        </h1>

        {/* Progress bar */}
        <div className="w-full h-2 bg-gray-200 rounded mb-8">
          <div
            className="h-full bg-blue-600 rounded"
            style={{ width: `${((i + 1) / steps.length) * 100}%` }}
          ></div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {step === "biodata" && (
              <>
                <h2 className="font-semibold text-xl mb-2">Bio-data</h2>
                <Input 
                  placeholder="Child's Name" 
                  onChange={(e: ChangeEvent<HTMLInputElement>) => update("child_name", e.target.value)} 
                />
                <Input 
                  placeholder="Age (e.g. 4 months, 6 years)" 
                  onChange={(e: ChangeEvent<HTMLInputElement>) => update("age", e.target.value)} 
                />
                <Input 
                  placeholder="Gender" 
                  onChange={(e: ChangeEvent<HTMLInputElement>) => update("gender", e.target.value)} 
                />
                <Input 
                  placeholder="Caregiver Name" 
                  onChange={(e: ChangeEvent<HTMLInputElement>) => update("caregiver", e.target.value)} 
                />
                <Input 
                  placeholder="Relationship to Child" 
                  onChange={(e: ChangeEvent<HTMLInputElement>) => update("relationship", e.target.value)} 
                />
              </>
            )}

            {step === "presenting" && (
              <>
                <h2 className="font-semibold text-xl mb-2">Presenting Complaint(s)</h2>
                <Input 
                  placeholder="E.g. Fever, Fast breathing…" 
                  onChange={(e: ChangeEvent<HTMLInputElement>) => update("pcs", e.target.value)} 
                />
                <TextArea 
                  placeholder="Duration of symptoms" 
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => update("pc_duration", e.target.value)} 
                />
              </>
            )}

            {step === "hpc" && (
              <>
                <h2 className="font-semibold text-xl mb-2">History of Presenting Complaint</h2>
                <TextArea 
                  placeholder="Character" 
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => update("hpc_character", e.target.value)} 
                />
                <TextArea 
                  placeholder="Course" 
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => update("hpc_course", e.target.value)} 
                />
                <TextArea 
                  placeholder="Chronology / Onset" 
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => update("hpc_chronology", e.target.value)} 
                />
                <TextArea 
                  placeholder="Contributing / Relieving factors" 
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => update("hpc_factors", e.target.value)} 
                />
                <TextArea 
                  placeholder="Associated symptoms (Consequences)" 
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => update("hpc_assoc", e.target.value)} 
                />
              </>
            )}

            {step === "birth" && (
              <>
                <h2 className="font-semibold text-xl mb-2">Birth History</h2>
                <Input 
                  placeholder="Antenatal complications?" 
                  onChange={(e: ChangeEvent<HTMLInputElement>) => update("antenatal", e.target.value)} 
                />
                <Input 
                  placeholder="Mode of Delivery" 
                  onChange={(e: ChangeEvent<HTMLInputElement>) => update("delivery", e.target.value)} 
                />
                <Input 
                  placeholder="Birth Weight" 
                  onChange={(e: ChangeEvent<HTMLInputElement>) => update("birth_weight", e.target.value)} 
                />
                <Input 
                  placeholder="Cried immediately after birth?" 
                  onChange={(e: ChangeEvent<HTMLInputElement>) => update("cried", e.target.value)} 
                />
                <TextArea 
                  placeholder="Neonatal complications / NICU stay?" 
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => update("neonatal", e.target.value)} 
                />
              </>
            )}

            {step === "immunization" && (
              <>
                <h2 className="font-semibold text-xl mb-2">Immunization History</h2>
                <TextArea 
                  placeholder="Is immunization up-to-date?" 
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => update("immunization_status", e.target.value)} 
                />
                <TextArea 
                  placeholder="Missed vaccines?" 
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => update("immunization_missed", e.target.value)} 
                />
              </>
            )}

            {step === "nutrition" && (
              <>
                <h2 className="font-semibold text-xl mb-2">Feeding & Nutrition</h2>
                <Input 
                  placeholder="Breastfeeding status" 
                  onChange={(e: ChangeEvent<HTMLInputElement>) => update("feeding_type", e.target.value)} 
                />
                <Input 
                  placeholder="When was complementary feeding started?" 
                  onChange={(e: ChangeEvent<HTMLInputElement>) => update("complementary", e.target.value)} 
                />
                <TextArea 
                  placeholder="Current diet / appetite" 
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => update("diet", e.target.value)} 
                />
              </>
            )}

            {step === "development" && (
              <>
                <h2 className="font-semibold text-xl mb-2">Developmental Milestones</h2>
                <Input 
                  placeholder="Gross motor: sitting, crawling…" 
                  onChange={(e: ChangeEvent<HTMLInputElement>) => update("gross_motor", e.target.value)} 
                />
                <Input 
                  placeholder="Fine motor: grasp, scribbling…" 
                  onChange={(e: ChangeEvent<HTMLInputElement>) => update("fine_motor", e.target.value)} 
                />
                <Input 
                  placeholder="Language development" 
                  onChange={(e: ChangeEvent<HTMLInputElement>) => update("language", e.target.value)} 
                />
                <Input 
                  placeholder="Social milestones" 
                  onChange={(e: ChangeEvent<HTMLInputElement>) => update("social", e.target.value)} 
                />
                <TextArea 
                  placeholder="Any regression?" 
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => update("regression", e.target.value)} 
                />
              </>
            )}

            {step === "pmh" && (
              <>
                <h2 className="font-semibold text-xl mb-2">Past Medical History</h2>
                <TextArea 
                  placeholder="Chronic illness / allergies / admissions" 
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => update("pmh", e.target.value)} 
                />
                <TextArea 
                  placeholder="Medications" 
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => update("drugs", e.target.value)} 
                />
                <TextArea 
                  placeholder="Previous surgeries" 
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => update("surgery", e.target.value)} 
                />
              </>
            )}

            {step === "family" && (
              <>
                <h2 className="font-semibold text-xl mb-2">Family & Social History</h2>
                <TextArea 
                  placeholder="Family diseases: TB, asthma, sickle cell…" 
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => update("family_history", e.target.value)} 
                />
                <TextArea 
                  placeholder="Home environment, siblings, caregiver support" 
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => update("social_history", e.target.value)} 
                />
              </>
            )}

            {step === "ros" && (
              <>
                <h2 className="font-semibold text-xl mb-2">Review of Systems</h2>
                <TextArea 
                  placeholder="General symptoms" 
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => update("ros_general", e.target.value)} 
                />
                <TextArea 
                  placeholder="Respiratory" 
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => update("ros_resp", e.target.value)} 
                />
                <TextArea 
                  placeholder="GI symptoms" 
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => update("ros_gi", e.target.value)} 
                />
                <TextArea 
                  placeholder="Neurologic" 
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => update("ros_neuro", e.target.value)} 
                />
              </>
            )}

            {step === "summary" && (
              <div className="text-center space-y-4">
                <h2 className="text-xl font-semibold">
                  Ready to Generate Pediatric Clinical Story
                </h2>
                <p className="text-gray-600">
                  Click below to generate a clean, structured pediatric clerkship narrative.
                </p>
                <button
                  onClick={finish}
                  disabled={loading}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg w-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Generating..." : "Generate Story"}
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          {i > 0 ? (
            <button
              onClick={back}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            >
              Back
            </button>
          ) : (
            <div></div>
          )}

          {i < steps.length - 1 && (
            <button
              onClick={next}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
