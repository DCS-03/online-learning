import { FaVideo, FaUsers, FaCertificate } from 'react-icons/fa';
import SectionHeading from '../ui/SectionHeading';

const items = [
  { icon: FaVideo, title: 'Interactive 3D Content', desc: 'Immersive learning experience with 3D models and interactive simulations.' },
  { icon: FaUsers, title: 'Expert Instructors', desc: 'Learn from industry leaders with years of real-world experience.' },
  { icon: FaCertificate, title: 'Recognized Certification', desc: 'Earn certificates that are valued by top companies worldwide.' },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Why EduNova" title={<>Learn with <span className="gradient-text">Confidence</span></>} />
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="card-3d bg-gray-50/50 rounded-3xl p-8 text-center border border-gray-100/50 hover:border-primary-200/50">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-inner">
                  <Icon className="text-3xl text-primary-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
