import Link from 'next/link';

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-900 to-primary-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-secondary-400 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-400 rounded-full blur-3xl" />
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
          Ready to Start Your <br />
          Learning Journey?
        </h2>
        <p className="text-xl text-primary-200 mb-10 max-w-2xl mx-auto">
          Join thousands of students and unlock your potential with our world-class courses.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/contact" className="bg-white text-primary-700 hover:bg-gray-100 font-bold py-4 px-10 rounded-2xl transition-all shadow-2xl shadow-primary-500/30 hover:shadow-primary-600/40 hover:scale-[1.02]">
            Get Started Free
          </Link>
          <Link href="/courses" className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold py-4 px-10 rounded-2xl transition-all backdrop-blur-sm">
            View Plans
          </Link>
        </div>
      </div>
    </section>
  );
}
