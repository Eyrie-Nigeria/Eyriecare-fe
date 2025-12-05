import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t py-8 mt-20">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between text-sm text-gray-600">
        <p>© {new Date().getFullYear()} EyrieCare</p>

        <Link
          href="https://linkedin.com/company/eyriecare"
          className="hover:text-eyrie-blue"
          target="_blank"
        >
          LinkedIn →
        </Link>
      </div>
    </footer>
  );
}
