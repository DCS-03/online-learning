import { FaStar } from 'react-icons/fa';
import SectionHeading from '../ui/SectionHeading';

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'UI/UX Designer',
    text: 'The Web 3.0 course completely transformed my career. The 3D content made complex concepts easy to understand.',
    avatar: 'PS',
  },
  {
    name: 'Rahul Verma',
    role: 'Software Engineer',
    text: 'Best investment I made this year. The instructors are amazing and the community is incredibly supportive.',
    avatar: 'RV',
  },
  {
    name: 'Ananya Patel',
    role: 'Product Manager',
    text: 'I loved the interactive approach. The certificate helped me land my dream job at a top tech company.',
    avatar: 'AP',
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Testimonials" title={<>What Our <span className="gradient-text">Students Say</span></>} />
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="card-3d bg-white rounded-3xl p-8 border border-gray-100/50">
              <div className="flex items-center gap-1 text-amber-400 mb-4">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">"{testimonial.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
