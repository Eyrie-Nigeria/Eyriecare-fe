
// components/ToolsCallout.tsx


import { Button } from "./ui/button";

export default function ToolsCallout() {
  return (
    <section className="py-10 bg-sky-mist/30">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h3 className="text-2xl font-semibold mb-2">Free Clinical Tools</h3>
        <p className="text-gray-600 mb-4">GA/EDD calculator, pediatric growth percentiles, BMI-for-age and more — free to use.</p>
        <div>
          <Button className="rounded-full bg-eyrie-blue text-white" onClick={() => (window.location.href = "/tools")}>
            Open Clinical Tools
          </Button>
        </div>
      </div>
    </section>
  );
}
