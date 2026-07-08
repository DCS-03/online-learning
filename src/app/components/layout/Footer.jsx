import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <p>© 2026 EduNova. All rights reserved.</p>
        <div className="flex flex-wrap gap-6">
          <Link href="/about" className="hover:text-white transition-colors">About</Link>
          <Link href="/courses" className="hover:text-white transition-colors">Courses</Link>
          <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
