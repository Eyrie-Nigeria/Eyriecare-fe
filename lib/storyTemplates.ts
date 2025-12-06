// lib/storyTemplates.ts
export const PEDIATRICS_TEMPLATE = `
You are an expert pediatrician writing a clinical case presentation for medical education.

Based on the following structured data, generate a comprehensive, well-formatted pediatric clinical story:

{data}

FORMAT YOUR RESPONSE EXACTLY AS FOLLOWS (without numbering):

**PATIENT IDENTIFICATION**
[Write patient demographics in a single paragraph]

**PRESENTING COMPLAINT**
[State the chief complaint and its duration in a single paragraph]

**HISTORY OF PRESENTING COMPLAINT**
[Write a narrative paragraph describing the illness using the 5C model: Character, Course, Chronology, Contributing/relieving factors, and Associated symptoms. Make it flow naturally like a clinical presentation.]

**BIRTH HISTORY**
[Describe antenatal period, mode of delivery, birth weight, immediate neonatal period, and any complications in paragraph form]

**IMMUNIZATION HISTORY**
[State vaccination status and any missed vaccines in a brief paragraph]

**FEEDING AND NUTRITIONAL HISTORY**
[Describe breastfeeding duration, introduction of complementary feeds, and current dietary pattern in paragraph form]

**DEVELOPMENTAL MILESTONES**
[Describe gross motor, fine motor, language, and social development. Note if all milestones are age-appropriate or if there are delays. Write as a flowing paragraph.]

**PAST MEDICAL HISTORY**
[List any previous illnesses, hospitalizations, surgeries, allergies, and current medications in paragraph form]

**FAMILY AND SOCIAL HISTORY**
[Describe relevant family medical history and social circumstances including home environment and caregiver support in paragraph form]

**REVIEW OF SYSTEMS**
[Systematically review: General, Respiratory, Cardiovascular, Gastrointestinal, Genitourinary, and Neurological systems. Write as a cohesive paragraph.]

**CLINICAL SUMMARY**
[Provide a brief concluding paragraph highlighting key clinical findings that will guide further evaluation and management]

Write in clear, professional medical language. Use complete sentences and organize information logically. Write everything in flowing paragraphs with clear section headings in bold. Do NOT use numbered lists or bullet points.
`;



export const OBGYN_TEMPLATE = `
You are an obstetrician/gynecologist. Convert the structured data into a proper O&G history.

Required Sections:
1. Bio-data
2. Presenting Complaint(s)
3. History of Presenting Complaint
4. Menstrual History (LMP, cycle, flow, dysmenorrhea)
5. Obstetric History (G/P, miscarriage, complications)
6. Gynecologic History (STIs, pap smear, contraception)
7. Past medical, surgical, drug history
8. Family history
9. Social history
10. Review of Systems

Structured Data:
{data}
`;

export const GENERAL_TEMPLATE = `
Convert the structured data into a standard medical history.

Structured Data:
{data}
`;
