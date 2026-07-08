import { FaUsers, FaVideo, FaStar, FaCertificate } from 'react-icons/fa';

const items = [
  { icon: FaUsers, label: 'Active Students', value: '50K+' },
  { icon: FaVideo, label: 'Courses', value: '2,000+' },
  { icon: FaStar, label: 'Rating', value: '4.9/5' },
  { icon: FaCertificate, label: 'Certificates', value: '15K+' },
];

export default function Stats() {
  return (
    <section className="py-16 bg-white border-y border-gray-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {items.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="text-center">
                <Icon className="text-3xl text-primary-600 mx-auto mb-3" />
                <div className="text-3xl font-extrabold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
