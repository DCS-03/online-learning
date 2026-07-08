import { FaCheckCircle } from 'react-icons/fa';
import SectionHeading from '../ui/SectionHeading';

const points = [
  'Learn through immersive 3D modules and interactive practice.',
  'Track progress with personalized learning paths and milestones.',
  'Join a community of learners and mentors from around the world.',
];

export default function About() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <SectionHeading eyebrow="About EduNova" title={<>A modern learning experience built for <span className="gradient-text">real growth</span></>} align="left" />
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            We combine expert instruction, practical projects, and immersive experiences so every lesson feels actionable and rewarding.
          </p>
          <ul className="space-y-4">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-gray-700">
                <FaCheckCircle className="text-primary-600 mt-1" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-primary-50 to-secondary-50 p-8 border border-primary-100/60 shadow-xl">
          <div className="grid gap-4">
            {[
              { title: 'Flexible schedules', value: '24/7 access' },
              { title: 'Live mentor support', value: 'Every week' },
              { title: 'Career-ready projects', value: 'Portfolio ready' },
            ].map((item) => (
              <div key={item.title} className="bg-white/70 rounded-2xl p-4">
                <div className="text-sm text-gray-500">{item.title}</div>
                <div className="text-xl font-bold text-gray-900">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
