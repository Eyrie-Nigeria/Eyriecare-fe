import NewAssessmentPage from "./newAssessmentPage";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewAssessmentPage />
    </Suspense>
  );
}
