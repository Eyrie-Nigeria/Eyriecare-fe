// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t py-8 mt-20">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between text-sm text-gray-600">
        <p>© {new Date().getFullYear()} EyrieCare</p>
        <div className="flex items-center space-x-4">
          <Link href="/" className="hover:text-eyrie-blue">Terms</Link>
          <Link href="/" className="hover:text-eyrie-blue">Privacy</Link>
          <Link href="https://linkedin.com/company/eyrie" target="_blank" className="hover:text-eyrie-blue">LinkedIn</Link>
        </div>
      </div>
    </footer>
  );
}

