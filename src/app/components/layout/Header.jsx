import Link from 'next/link';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Courses', href: '/courses' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/25">
              <span className="text-white font-extrabold text-xl">E</span>
            </div>
            <span className="text-2xl font-extrabold text-gray-900">
              Edu<span className="gradient-text">Novas</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-gray-600 font-medium">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} className="hover:text-primary-600 transition-colors">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/contact" className="btn-gradient text-sm py-2 px-5">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
