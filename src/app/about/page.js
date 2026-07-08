import Link from 'next/link';
import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';

export default function AboutPage() {
  return (
    <main className="pt-24 pb-16">
      <Container>
        <SectionHeading eyebrow="About" title={<>About <span className="gradient-text">EduNova</span></>} subtitle="We build learning experiences that are practical, immersive, and designed for real progress." align="left" />
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-6 text-lg text-gray-600">
            <p>
              EduNova is a modern platform that combines expert-led lessons, interactive content, and career-focused projects.
            </p>
            <p>
              Our mission is to make high-quality education accessible, engaging, and easy to follow for every learner.
            </p>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-primary-50 to-secondary-50 p-8 border border-primary-100/60 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Why learners choose us</h3>
            <ul className="space-y-3 text-gray-700">
              <li>• Flexible learning paths that fit your schedule</li>
              <li>• Expert guidance with practical assignments</li>
              <li>• Certificates that support career growth</li>
            </ul>
            <Link href="/courses" className="btn-gradient inline-flex mt-6">
              Explore Courses
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
