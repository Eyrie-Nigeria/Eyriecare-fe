import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "",
});

interface StoryRequest {
  structured?: Record<string, Record<string, string | string[]>>;
  department?: string;
  basicInfo?: {
    name?: string;
    age?: string;
    sex?: string;
    temp?: string;
    bp?: string;
    rr?: string;
    spo2?: string;
    hr?: string;
  };
  answers?: Record<string, string | string[]>;
}

// Department-specific prompts
const getDepartmentPrompt = (department: string) => {
  const prompts: Record<string, string> = {
    pediatric: `
Focus on:
- Age-appropriate history taking
- Developmental milestones if relevant
- Vaccination history
- Parent/guardian concerns
- Growth and feeding history
- School attendance and performance
- Pediatric vital signs interpretation
`,
    "obstetrics-gynecology": `
Focus on:
- Menstrual history (LMP, cycle regularity, flow)
- Obstetric history (gravida, para, abortions)
- Gynecological symptoms
- Contraceptive use
- Sexual history (if relevant)
- Pregnancy-related symptoms
- Pelvic examination findings
`,
    "internal-medicine": `
Focus on:
- Comprehensive systems review
- Chronic disease management
- Medication adherence
- Lifestyle factors
- Risk factor assessment
- General examination findings
`,
    cardiology: `
Focus on:
- Cardiovascular symptoms (chest pain, palpitations, dyspnea)
- Exercise tolerance
- Risk factors (hypertension, diabetes, smoking, family history)
- Cardiac examination (heart sounds, murmurs, JVP, peripheral pulses)
- ECG findings if available
`,
    neurology: `
Focus on:
- Neurological symptoms (headache, seizures, weakness, sensory changes)
- Cognitive function
- Cranial nerve examination
- Motor and sensory examination
- Reflexes and coordination
- Gait assessment
`,
    ophthalmology: `
Focus on:
- Visual symptoms (blurred vision, pain, discharge)
- Eye examination findings
- Visual acuity
- Fundoscopy findings
- Pupillary responses
`,
    general: `
Focus on:
- General medical history
- Systems review
- General examination
- Vital signs interpretation
`,
  };

  return prompts[department] || prompts.general;
};

export async function POST(request: NextRequest) {
  try {
    const body: StoryRequest = await request.json();
    let structured = body.structured;
    const department = body.department || "general";
    const basicInfo = body.basicInfo;

    // Validate structured data
    if (!structured) {
      return NextResponse.json(
        { error: "Structured data is required" },
        { status: 400 }
      );
    }

    // If structured is empty, try to use answers if provided
    if (Object.keys(structured).length === 0 && body.answers) {
      structured = {
        General: body.answers as Record<string, string | string[]>,
      };
    }

    // Final validation
    if (!structured || Object.keys(structured).length === 0) {
      return NextResponse.json(
        { error: "No patient data available. Please complete the assessment first." },
        { status: 400 }
      );
    }

    // Build biodata section
    const biodata = basicInfo
      ? `
Biodata:
- Name: ${basicInfo.name || "Not provided"}
- Age: ${basicInfo.age || "Not provided"} years
- Sex: ${basicInfo.sex || "Not provided"}
- Vital Signs: ${basicInfo.temp ? `Temp: ${basicInfo.temp}°C` : ""} ${basicInfo.bp ? `BP: ${basicInfo.bp} mmHg` : ""} ${basicInfo.rr ? `RR: ${basicInfo.rr}/min` : ""} ${basicInfo.spo2 ? `SpO2: ${basicInfo.spo2}%` : ""} ${basicInfo.hr ? `HR: ${basicInfo.hr} bpm` : ""}
`
      : "";

    const departmentContext = getDepartmentPrompt(department);

    const prompt = `You are an experienced clinician writing a professional medical history and examination narrative.

Department: ${department.charAt(0).toUpperCase() + department.slice(1).replace("-", " & ")}

${departmentContext}

Convert the following structured patient data into a comprehensive, professional medical narrative including:

1. BIODATA
${biodata}

2. PRESENTING COMPLAINT(S)
- List all presenting complaints clearly

3. HISTORY OF PRESENTING COMPLAINT (HPC)
- For each complaint, detail using the 5C framework:
  * Character: What is it like?
  * Course: Is it improving, worsening, or unchanged?
  * Chronology: When did it start? Duration?
  * Contributing factors: What makes it better or worse?
  * Consequences: Associated symptoms?

4. PAST MEDICAL HISTORY
- Previous illnesses, surgeries, hospitalizations

5. DRUG HISTORY
- Current medications, allergies

6. FAMILY HISTORY
- Relevant family medical history

7. SOCIAL HISTORY
- Occupation, lifestyle factors, travel history

8. REVIEW OF SYSTEMS
- Systematic review of body systems

9. PHYSICAL EXAMINATION
- General appearance
- Vital signs
- System-specific examination findings relevant to ${department}
- Any abnormal findings

Write the narrative in a clear, professional medical style as a clinician would document in a patient's chart. Be concise but comprehensive. Use proper medical terminology.

Structured data provided:
${JSON.stringify(structured, null, 2)}

Generate the complete history and examination narrative:`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: "You are an experienced medical clinician writing professional patient histories and examination notes.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
      max_tokens: 2000,
    });

    const story = completion.choices[0]?.message?.content || "";

    return NextResponse.json(
      {
        story,
        department,
        generatedAt: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error generating story:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to generate story",
      },
      { status: 500 }
    );
  }
}
