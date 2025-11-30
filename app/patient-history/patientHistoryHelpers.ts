type PCKey = string;

export type QuestionDef = {
  key: string;
  question: string;
  options?: string[];      // clickable options
  freeText?: boolean;      // show input for custom answers
  multi?: boolean;         // allow multiple selections (don't auto-advance)
};

export type PCQuestionsMap = Record<PCKey, QuestionDef[]>;

export type AnswersShape = Record<string, string | string[]>;

/* ---------------------------
   5C questions mapping per PC
   --------------------------- */
export const PC_5C_QUESTIONS: PCQuestionsMap = {
  Fever: [
    { key: "fever_character", question: "How high is the fever? (estimate)", freeText: true },
    { key: "fever_course", question: "Is the fever improving or worsening?", options: ["Improving", "Worsening", "Unchanged"], freeText: true },
    { key: "fever_chronology", question: "When did the fever start? (onset)", freeText: true },
    { key: "fever_contributing", question: "Anything making it better or worse?", freeText: true },
    { key: "fever_consequences", question: "Any other symptoms with the fever?", options: ["Chills", "Sweating", "Cough", "Rigor"], freeText: true, multi: true },
  ],
  "Chest pain": [
    { key: "cp_character", question: "What does the chest pain feel like?", options: ["Sharp", "Dull", "Pressure", "Burning"], freeText: true },
    { key: "cp_course", question: "Is the pain improving or worsening?", options: ["Improving", "Worsening", "Unchanged"] },
    { key: "cp_chronology", question: "When did the chest pain start?", freeText: true },
    { key: "cp_contributing", question: "What triggers or relieves the pain?", freeText: true },
    { key: "cp_consequences", question: "Any associated symptoms like shortness of breath, sweating, nausea?", options: ["SOB", "Sweating", "Nausea", "Syncope"], freeText: true, multi: true },
  ],
  Cough: [
    { key: "cough_character", question: "What type of cough is it?", options: ["Dry", "Productive/Wet", "Barking", "Whooping"], freeText: true },
    { key: "cough_course", question: "Is the cough improving or worsening?", options: ["Improving", "Worsening", "Unchanged"] },
    { key: "cough_chronology", question: "When did the cough begin?", freeText: true },
    { key: "cough_contributing", question: "Anything that triggers the cough?", freeText: true },
    { key: "cough_consequences", question: "Any sputum, hemoptysis, fever or breathlessness?", options: ["Sputum", "Hemoptysis", "Fever", "Breathlessness"], freeText: true, multi: true },
  ],
  Headache: [
    { key: "headache_character", question: "What does the headache feel like?", options: ["Throbbing", "Pressure", "Sharp", "Tight"], freeText: true },
    { key: "headache_course", question: "Is the headache improving or worsening?", options: ["Improving", "Worsening", "Unchanged"] },
    { key: "headache_chronology", question: "When did the headache begin?", freeText: true },
    { key: "headache_contributing", question: "Any triggers (light, noise, stress)?", freeText: true },
    { key: "headache_consequences", question: "Any nausea, vomiting, visual changes, weakness?", options: ["Nausea", "Vomiting", "Visual changes", "Weakness"], freeText: true, multi: true },
  ],
  "Abdominal pain": [
    { key: "abdo_character", question: "What does the abdominal pain feel like?", options: ["Cramping", "Sharp", "Dull", "Colicky"], freeText: true },
    { key: "abdo_course", question: "Is the pain improving or worsening?", options: ["Improving", "Worsening", "Unchanged"] },
    { key: "abdo_chronology", question: "When did the abdominal pain begin?", freeText: true },
    { key: "abdo_contributing", question: "Anything that makes it better or worse (food, movement)?", freeText: true },
    { key: "abdo_consequences", question: "Any vomiting, diarrhea, fever, bleeding?", options: ["Vomiting", "Diarrhea", "Fever", "Bleeding"], freeText: true, multi: true },
  ],
};

/* default PC options (user can add a custom PC) */
export const DEFAULT_PCS = Object.keys(PC_5C_QUESTIONS);

/* ---------------------------
   Helper utilities
   --------------------------- */

export function flattenPCsToQueue(selectedPCs: string[]): QuestionDef[] {
  const queue: QuestionDef[] = [];
  selectedPCs.forEach((pc) => {
    const block = PC_5C_QUESTIONS[pc];
    if (block && block.length) {
      // Add a header question for this PC to capture the PC label and optionally initial duration
      queue.push({
        key: `__pc_header__${pc}`,
        question: `Presenting Complaint: ${pc} — (Confirm/Extra info)`,
        options: [pc],
        freeText: true,
      });
      // Append the 5C block
      queue.push(...block);
    } else {
      // If PC not found in mapping, add a generic 5-question flow
      queue.push({
        key: `__pc_header__${pc}`,
        question: `Presenting Complaint: ${pc} — (Confirm / Describe briefly)`,
        freeText: true,
      });
      // generic fallback 5Cs
      queue.push(
        { key: `${pc}_character`, question: `Character: Describe the ${pc}`, freeText: true },
        { key: `${pc}_course`, question: `Course: Is it improving or worsening?`, options: ["Improving", "Worsening", "Unchanged"], freeText: true },
        { key: `${pc}_chronology`, question: `When did it start?`, freeText: true },
        { key: `${pc}_contributing`, question: `Aggravating/Relieving factors?`, freeText: true },
        { key: `${pc}_consequences`, question: `Any associated symptoms?`, freeText: true, multi: true }
      );
    }
  });
  return queue;
}

export function isMultiAnswer(q: QuestionDef) {
  return !!q.multi;
}
