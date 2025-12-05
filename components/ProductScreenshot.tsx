// components/ProductScreenshot.tsx
export default function ProductScreenshot({ title = "Product", description = "" }: { title?: string; description?: string }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="text-center">
        <div className="w-20 h-20 mx-auto rounded-lg bg-eyrie-blue/10 flex items-center justify-center text-4xl">📋</div>
        <h3 className="font-semibold text-lg mt-4">{title}</h3>
        <p className="text-gray-600 text-sm mt-2">{description}</p>
      </div>
    </div>
  );
}
